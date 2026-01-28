import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updates: any = {};
    if ("name" in body) updates.name = body.name;
    if ("description" in body) updates.description = body.description ?? null;
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_groups")
      .update(updates)
      .eq("id", id)
      .select("id, name, description, created_at")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ group: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  // delete members then group to satisfy FKs
  await supabase.from("contact_group_members").delete().eq("group_id", id);
  const { error } = await supabase.from("contact_groups").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
