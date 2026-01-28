import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import sgMail from "@sendgrid/mail";
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
    const ticket = body?.ticket ?? {};

    // Map ticket reason to recipient role
    function roleForReason(reason: string | null | undefined): "Admin" | "IT" {
      const key = (reason ?? "").toString().trim().toLowerCase();
      if (key === "it") return "IT";
      // Bank and Agent Pay In are handled by Admin
      if (key === "bank" || key === "agent pay in" || key === "agent pay-in" || key === "admin") return "Admin";
      return "Admin";
    }
    const requiredRole = roleForReason(ticket?.reason);

    const supabase = await createClient();
    const { data: recipients, error } = await supabase
      .from("notification_recipients")
      .select("name, phone, email, role, enabled")
      .eq("enabled", true)
      .eq("role", requiredRole);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const active = recipients ?? [];

    const sgKey = process.env.SENDGRID_API_KEY;
    const sgFrom = process.env.SENDGRID_FROM;
    if (sgKey) sgMail.setApiKey(sgKey);

    const twSid = process.env.TWILIO_ACCOUNT_SID;
    const twToken = process.env.TWILIO_AUTH_TOKEN;
    const twFrom = process.env.TWILIO_FROM;
    const twClient = twSid && twToken ? twilio(twSid, twToken) : null;

    const subject = `New ${requiredRole} ticket #${ticket?.ticket_no ?? ""}`.trim();
    const text = `A new ${requiredRole} ticket has been created.\n\nTicket: ${ticket?.ticket_no ?? ""}\nReason: ${ticket?.reason ?? ""}\nFrom: ${ticket?.submitted_by_name ?? ""}${ticket?.submitted_by_email ? ` (${ticket.submitted_by_email})` : ""}\n\nOpen dashboard to view details.`;

    const ops: Promise<any>[] = [];
    for (const r of active) {
      if (sgKey && sgFrom && r.email) {
        ops.push(sgMail.send({ to: r.email, from: sgFrom, subject, text }).catch(() => {}));
      }
      const phone = normalizePhone(r.phone);
      if (twClient && twFrom && phone) {
        ops.push(twClient.messages.create({ from: twFrom, to: phone, body: text }).catch(() => {}));
      }
    }
    await Promise.all(ops);
    return NextResponse.json({ sent: active.length });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
