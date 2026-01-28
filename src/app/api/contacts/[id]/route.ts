import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await _req.json();
    const supabase = await createClient();
    const updates: any = {};
    if ("name" in body) updates.name = body.name;
    if ("phone" in body) updates.phone = body.phone;
    if ("email" in body) updates.email = body.email ?? null;
    if ("role" in body) updates.role = body.role ?? null;
    const { data, error } = await supabase
      .from("contacts")
      .update(updates)
      .eq("id", id)
      .select("id, name, phone, email, role, created_at")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ contact: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { error } = await supabase.from("contacts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
