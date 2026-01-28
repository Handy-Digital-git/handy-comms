import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("contact_groups").select("id, name, description, created_at").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ groups: data ?? [] });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description } = body ?? {};
    if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_groups")
      .insert([{ name, description: description ?? null }])
      .select("id, name, description, created_at")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ group: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Invalid request" }, { status: 400 });
  }
}
