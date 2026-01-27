import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import sgMail from "@sendgrid/mail";
import twilio from "twilio";

function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let p = String(raw).replace(/[^\d+]/g, "");
  if (!p) return null;
  if (p.startsWith("+")) return p; // assume E.164
  if (p.startsWith("44")) return "+" + p; // add leading +
  if (p.startsWith("0")) return "+44" + p.slice(1);
  if (/^\d+$/.test(p)) return "+44" + p; // default to GB
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ticketNos: number[] = body?.ticketNos ?? [];
    const status: string = body?.status;

    if (!Array.isArray(ticketNos) || ticketNos.length === 0 || !status) {
      return NextResponse.json({ error: "ticketNos[] and status are required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Fetch recipients before update
      const { data: rows, error: fetchErr } = await supabase
        .from("contact_requests")
        .select("ticket_no, submitted_by_email, phone, submitted_by_name, status, reason, amount_to_transfer")
      .in("ticket_no", ticketNos);

    if (fetchErr) {
      return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    }

    // Perform update
    const { error: updErr } = await supabase
      .from("contact_requests")
      .update({ status })
      .in("ticket_no", ticketNos);
    if (updErr) {
      return NextResponse.json({ error: updErr.message }, { status: 500 });
    }

    // Configure providers if keys exist
    const sgKey = process.env.SENDGRID_API_KEY;
    const sgFrom = process.env.SENDGRID_FROM; // verified sender
    if (sgKey) sgMail.setApiKey(sgKey);

    const twSid = process.env.TWILIO_ACCOUNT_SID;
    const twToken = process.env.TWILIO_AUTH_TOKEN;
    const twFrom = process.env.TWILIO_FROM; // verified Twilio number
    const twClient = twSid && twToken ? twilio(twSid, twToken) : null;

    let emailCount = 0;
    let smsCount = 0;

    const sendOps: Promise<any>[] = [];
    (rows ?? []).forEach((r) => {
      const name = r.submitted_by_name || "there";
      const toEmail = r.submitted_by_email as string | null;
      const toPhone = normalizePhone(r.phone);
      const ticket = r.ticket_no;

        const reason = (r as any).reason as string | null;
        const amount = (r as any).amount_to_transfer as any;
        const amountText = typeof amount === "number" ? `£${Number(amount).toFixed(2)}` : (typeof amount === "string" && amount ? amount : null);

        // Templates
        let subject = `Your ticket #${String(ticket ?? "").padStart(4, "0")} is now ${status}`;
        let text = `Hello ${name},\n\nThe status of your ticket #${String(ticket ?? "").padStart(4, "0")} has been updated to: ${status}.\n\nIf you have any questions, reply to this message.\n\nThanks,\nSupport`;

        const isBank = (reason ?? "").toLowerCase() === "bank";
        if (isBank && (status === "Pending" || status === "Sent")) {
          if (status === "Pending") {
            subject = `Bank transfer request #${String(ticket ?? "").padStart(4, "0")} received`;
            text = `Hello ${name},\n\nWe've received your bank transfer request (ticket #${String(ticket ?? "").padStart(4, "0")} ). Our team is processing this now. We'll notify you as soon as the transfer has been sent.${amountText ? `\n\nRequested amount: ${amountText}` : ""}\n\nThanks,\nAccounts`;
          } else if (status === "Sent") {
            subject = `Bank transfer #${String(ticket ?? "").padStart(4, "0")} sent`;
            text = `Hello ${name},\n\nYour bank transfer request (ticket #${String(ticket ?? "").padStart(4, "0")} ) has been sent.${amountText ? `\n\nAmount sent: ${amountText}` : ""}\n\nPlease allow standard banking times for funds to appear.\n\nThanks,\nAccounts`;
          }
        }

      if (sgKey && sgFrom && toEmail) {
        sendOps.push(
          sgMail
            .send({ to: toEmail, from: sgFrom, subject, text })
            .then(() => emailCount++)
            .catch(() => {})
        );
      }
      if (twClient && twFrom && toPhone) {
        sendOps.push(
          twClient.messages
            .create({ from: twFrom, to: toPhone, body: text })
            .then(() => smsCount++)
            .catch(() => {})
        );
      }
    });

    await Promise.all(sendOps);

    return NextResponse.json({ updated: ticketNos.length, emails: emailCount, sms: smsCount });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
