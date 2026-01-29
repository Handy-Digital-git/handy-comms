import { NextResponse } from "next/server";
export const runtime = "nodejs";
import { createClient } from "@/lib/supabase/server";
import twilio from "twilio";



function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let p = String(raw).replace(/[^\d+]/g, "");
  if (!p) return null;
  if (p.startsWith("+")) return p;
  if (p.startsWith("44")) return "+" + p;
  if (p.startsWith("0")) return "+44" + p.slice(1);
  if (/^\d+$/.test(p)) return "+44" + p;
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, contactIds = [], groupIds = [] } = body ?? {};
    if (!message || (contactIds.length === 0 && groupIds.length === 0)) {
      return NextResponse.json({ error: "message and at least one recipient are required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Collect contacts directly
    const directContacts: any[] = [];
    if (Array.isArray(contactIds) && contactIds.length > 0) {
      const { data, error } = await supabase
        .from("contacts")
        .select("id, name, phone")
        .in("id", contactIds);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      directContacts.push(...(data ?? []));
    }

    // Collect from groups
    const groupContacts: any[] = [];
    if (Array.isArray(groupIds) && groupIds.length > 0) {
      const { data, error } = await supabase
        .from("contact_group_members")
        .select("contact:contacts(id, name, phone), group_id")
        .in("group_id", groupIds);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      groupContacts.push(...((data ?? []).map((r: any) => r.contact)));
    }

    // Deduplicate by id
    const all = [...directContacts, ...groupContacts];
    const seen = new Set<string>();
    const recipients = all.filter((c) => {
      if (!c?.id) return false;
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });

    // Send via Twilio SMS
    const twSid = process.env.TWILIO_ACCOUNT_SID;
    const twToken = process.env.TWILIO_AUTH_TOKEN;
    const twFrom = process.env.TWILIO_FROM;
    const twClient = twSid && twToken ? twilio(twSid, twToken) : null;
    if (!twClient || !twFrom) {
      return NextResponse.json({ error: "Twilio not configured" }, { status: 500 });
    }

    let sent = 0;
    let failed = 0;

    await Promise.all(
      recipients.map(async (r) => {
        const to = normalizePhone(r.phone);
        if (!to) {
          failed++;
          return;
        }
        try {
          await twClient.messages.create({ from: twFrom!, to, body: message });
          sent++;
        } catch (e) {
          failed++;
        }
      })
    );

    return NextResponse.json({ recipients: recipients.length, sent, failed });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Invalid request" }, { status: 400 });
  }
}
