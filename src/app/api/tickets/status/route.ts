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

function teamForReason(reason: string | null | undefined): string {
  const key = String(reason ?? "").trim().toLowerCase();
  if (key === "it") return "IT Team";
  if (key === "admin") return "Admin Team";
  if (key === "bank") return "Admin Team"; // treat bank as admin-owned comms
  return "Support";
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
        .select("ticket_no, submitted_by_email, phone, submitted_by_name, status, reason, amount_to_transfer, bank_customer_name")
      .in("ticket_no", ticketNos);

    if (fetchErr) {
      return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    }

    // Determine derived balanced_status from status
    let balanced_status: string | undefined = undefined;
    if (status === "Clip Complete") balanced_status = "balanced";
    else if (status === "Unable to Balance") balanced_status = "unbalanced";

    // Perform update
    const updateObj: any = { status };
    if (balanced_status !== undefined) updateObj.balanced_status = balanced_status;
    const { error: updErr } = await supabase
      .from("contact_requests")
      .update(updateObj)
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
        const team = teamForReason(reason);
        let text = `Hello ${name},\n\nThe status of your ticket #${String(ticket ?? "").padStart(4, "0")} has been updated to: ${status}.\n\nIf you have any problem, please raise another ticket.\n\nThanks,\n${team}`;

        const reasonLower = (reason ?? "").toLowerCase();
        const isBank = reasonLower === "bank";
        const isAgentPayIn = reasonLower === "agent pay in";
        if (isBank && (status === "Sent" || status === "Incorrect Details")) {
          const bankNameRaw = (r as any).bank_customer_name as string | null;
          const bankName = bankNameRaw && bankNameRaw.toString().trim() ? bankNameRaw.toString().trim() : null;
          const customerRef = bankName ?? "your account";
          if (status === "Sent") {
            subject = `Bank transfer #${String(ticket ?? "").padStart(4, "0")} sent`;
            text = `Hello ${name},\n\nYour bank transfer request for ${customerRef} has been sent.${amountText ? `\n\nAmount sent: ${amountText}` : ""}\n\nThanks,\nAdmin Team`;
          } else if (status === "Incorrect Details") {
            subject = `Bank transfer request #${String(ticket ?? "").padStart(4, "0")} needs attention`;
            text = `Hello ${name},\n\nWe couldn't process your bank transfer request for ${customerRef} because some details appear incorrect.\n\nPlease check the account name, account number, sort code and amount, then submit a new request.\n\nThanks,\nAdmin Team`;
          }
        }

        // Agent Pay In custom templates
        if (isAgentPayIn && (status === "Clip Complete" || status === "Unable to Balance")) {
          if (status === "Clip Complete") {
            subject = `Clip complete for ticket #${String(ticket ?? "").padStart(4, "0")}`;
            text = `Hello ${name},\n\nYour clip is complete and balanced. You can now use it.\n\nThanks,\nAdmin Team`;
          } else if (status === "Unable to Balance") {
            const custom = (body?.customMessage ?? "").toString().trim();
            subject = `Unable to balance your clip`;
            text = custom
              ? `Hello ${name},\n\n${custom}\n\nThanks,\nAdmin Team`
              : `Hello ${name},\n\nWe were unable to balance your clip. Please review and provide any missing details so we can assist further.\n\nThanks,\nAdmin Team`;
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
