import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notification_recipients")
    .select("id, name, phone, email, role, enabled, created_at")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ recipients: data ?? [] });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, role, enabled } = body ?? {};
    if (!name || !phone) return NextResponse.json({ error: "name and phone are required" }, { status: 400 });
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("notification_recipients")
      .insert([{ name, phone, email: email ?? null, role: role ?? null, enabled: !!enabled }])
      .select("id, name, phone, email, role, enabled, created_at")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ recipient: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Invalid request" }, { status: 400 });
  }
}
