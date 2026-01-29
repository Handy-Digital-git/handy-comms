export async function POST(req: Request) {
  console.log("🔥 COMMS SEND ROUTE HIT");

  return new Response(
    JSON.stringify({ ok: true, stage: "route-hit" }),
    { status: 200 }
  );
}
