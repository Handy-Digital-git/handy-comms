export async function POST(req: Request) {
  let body: any = {};

  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "Invalid or missing JSON body" },
      { status: 400 }
    );
  }

  console.log("🔥 COMMS SEND ROUTE HIT", body);

  return Response.json({ ok: true });
}
