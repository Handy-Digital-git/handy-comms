import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_group_members")
    .select("contact:contacts(id, name, phone, email)")
    .eq("group_id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ members: (data ?? []).map((r: any) => r.contact) });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { contactId } = body ?? {};
    if (!contactId) return NextResponse.json({ error: "contactId required" }, { status: 400 });
    const supabase = await createClient();
    const { error } = await supabase
      .from("contact_group_members")
      .insert([{ group_id: id, contact_id: contactId }]);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { contactId } = body ?? {};
    if (!contactId) return NextResponse.json({ error: "contactId required" }, { status: 400 });
    const supabase = await createClient();
    const { error } = await supabase
      .from("contact_group_members")
      .delete()
      .eq("group_id", id)
      .eq("contact_id", contactId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Invalid request" }, { status: 400 });
  }
}
