import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const ticketNos: number[] = Array.isArray(body?.ticketNos) ? body.ticketNos : [];

    if (!ticketNos.length) {
      return NextResponse.json({ error: "ticketNos[] is required" }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("contact_requests")
      .delete()
      .in("ticket_no", ticketNos);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ deleted: ticketNos.length });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
