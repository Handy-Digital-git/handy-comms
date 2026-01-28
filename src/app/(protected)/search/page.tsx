import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

function toTitle(str: string | null | undefined): string {
  if (!str) return "";
  return String(str)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function routeFor(reason: string | null | undefined): string {
  const key = (reason ?? "").toString().trim().toLowerCase();
  if (key === "bank") return "/bank-transfers";
  if (key === "agent pay in" || key === "agent pay-in") return "/agent-pay-in";
  if (key === "admin") return "/admin";
  return "/tickets";
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const sp = (await searchParams) ?? {};
  const q = (sp.q ?? "").toString().trim();
  const supabase = await createClient();

  let rows: any[] = [];
  if (q) {
    const like = `%${q}%`;
    const { data, error } = await supabase
      .from("contact_requests")
      .select("ticket_no, submitted_by_name, submitted_by_email, phone, reason, description, created_at, status, app, page")
      .or(
        [
          `ticket_no.ilike.${like}`,
          `submitted_by_name.ilike.${like}`,
          `submitted_by_email.ilike.${like}`,
          `phone.ilike.${like}`,
          `reason.ilike.${like}`,
          `description.ilike.${like}`,
          `app.ilike.${like}`,
          `page.ilike.${like}`,
        ].join(",")
      )
      .order("created_at", { ascending: false })
      .limit(100);
    if (!error && data) rows = data as any[];
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Search</h1>
      </div>

      <form action="/search" method="get" className="flex items-center gap-2">
        <input name="q" defaultValue={q} placeholder="Search tickets, contacts, groups…" className="input flex-1" />
        <button className="btn" type="submit">Search</button>
      </form>

      {!q && <div className="card-muted px-4 py-3 text-sm text-muted">Type a term and press Enter to search.</div>}

      {q && rows.length === 0 && (
        <div className="card-muted px-4 py-3 text-sm text-muted">No results for “{q}”.</div>
      )}

      {q && rows.length > 0 && (
        <div className="rounded-xl border border-border bg-bg overflow-hidden">
          <table className="w-full table-auto text-left text-[13px]">
            <thead className="bg-(--accent)/10 text-accent">
              <tr className="border-b border-(--accent)/20">
                <th className="px-3 py-2">Ticket</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Reason</th>
                <th className="px-3 py-2">App</th>
                <th className="px-3 py-2">Page</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Open</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r.ticket_no}-${r.created_at}`} className="border-t border-border hover:bg-card2/40">
                  <td className="px-3 py-2">{r.ticket_no ?? "—"}</td>
                  <td className="px-3 py-2">{r.submitted_by_name ?? "—"}</td>
                  <td className="px-3 py-2 text-muted">{r.submitted_by_email ?? "—"}</td>
                  <td className="px-3 py-2 text-muted">{r.phone ?? "—"}</td>
                  <td className="px-3 py-2">{toTitle(r.reason)}</td>
                  <td className="px-3 py-2 text-muted">{toTitle(r.app)}</td>
                  <td className="px-3 py-2 text-muted">{toTitle(r.page)}</td>
                  <td className="px-3 py-2">{r.status ?? "Open"}</td>
                  <td className="px-3 py-2">
                    <Link className="link" href={routeFor(r.reason)}>Open</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
