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
  // Protect with a secret header (set CRON_SECRET in env)
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const hdr = req.headers.get("x-cron-secret");
    if (hdr !== secret) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("notification_events")
    .select("id, type, payload")
    .eq("processed", false)
    .order("created_at", { ascending: true })
    .limit(25);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!events || events.length === 0) return NextResponse.json({ processed: 0 });

  const sgKey = process.env.SENDGRID_API_KEY;
  const sgFrom = process.env.SENDGRID_FROM;
  if (sgKey) sgMail.setApiKey(sgKey);

  const twSid = process.env.TWILIO_ACCOUNT_SID;
  const twToken = process.env.TWILIO_AUTH_TOKEN;
  const twFrom = process.env.TWILIO_FROM;
  const twClient = twSid && twToken ? twilio(twSid, twToken) : null;

  let okCount = 0;

  for (const ev of events) {
    try {
      const p = (ev as any).payload || {};
      const message: string = p.message || `A new ticket has been submitted. Please check the dashboard for details.`;
      const email: string | null = p.recipient_email ?? null;
      const phone: string | null = normalizePhone(p.recipient_phone);

      const jobs: Promise<any>[] = [];
      if (sgKey && sgFrom && email) {
        jobs.push(sgMail.send({ to: email, from: sgFrom, subject: "Notification", text: message }));
      }
      if (twClient && twFrom && phone) {
        jobs.push(twClient.messages.create({ from: twFrom, to: phone, body: message }));
      }
      await Promise.allSettled(jobs);

      await supabase
        .from("notification_events")
        .update({ processed: true })
        .eq("id", ev.id);
      okCount++;
    } catch {
      // leave event unprocessed for retry
    }
  }

  return NextResponse.json({ processed: okCount, total: events.length });
}
