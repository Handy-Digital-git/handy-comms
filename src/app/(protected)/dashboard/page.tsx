import { createClient } from "@/lib/supabase/server";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function DashboardPage({ searchParams }: { searchParams?: SearchParams }) {
  const supabase = await createClient();
  // Total tickets
  const { count: totalTickets } = (await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })) as any;

  // Resolved tickets = any status EXCEPT "Open" and "Unable to Balance"
  const { count: resolvedTickets } = (await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })
    .not("status", "in", '("Open","Unable to Balance")')
    .not("status", "is", null)) as any;

  // Open tickets = status IN ("Open", "Unable to Balance")
  const { count: openTickets } = (await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })
    .in("status", ["Open", "Unable to Balance"]) 
  ) as any;

  // Static demo data for now (mix of dynamic + placeholder)
  const stats = [
    { label: "Total Tickets", value: totalTickets ?? 0, change: "+12%" },
    { label: "Resolved Tickets", value: resolvedTickets ?? 0, change: "+15%" },
    { label: "Open Tickets", value: openTickets ?? 0, change: "-9%" },
  ];

  // Ticket Volume Tracker data (hooked up)
  const rangeRaw = (searchParams?.range ?? "weekly").toString().toLowerCase();
  const range: "weekly" | "monthly" = rangeRaw === "monthly" ? "monthly" : "weekly";

  // Fetch created_at for required window and aggregate in-memory
  if (range === "weekly") {
    const now = new Date();
    const endUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)); // exclusive end (tomorrow 00:00 UTC)
    const startUtc = new Date(endUtc);
    startUtc.setUTCDate(endUtc.getUTCDate() - 7); // last 7 days

    const { data: createdRows } = await supabase
      .from("contact_requests")
      .select("created_at")
      .gte("created_at", startUtc.toISOString())
      .lt("created_at", endUtc.toISOString());

    const buckets = Array(7).fill(0) as number[]; // oldest..newest
    (createdRows ?? []).forEach((r: any) => {
      const d = new Date(r.created_at);
      const idx = Math.floor((+d - +startUtc) / (24 * 3600 * 1000));
      if (idx >= 0 && idx < 7) buckets[idx]++;
    });

    // Labels for the last 7 days (Sun..Sat abbreviations aligned to buckets)
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const labels = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startUtc);
      date.setUTCDate(startUtc.getUTCDate() + i);
      return dayNames[date.getUTCDay()];
    });

    var volume = { labels, values: buckets } as const;
  } else {
    // monthly: last 12 months including current month
    const now = new Date();
    const startMonthUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const startUtc = new Date(Date.UTC(startMonthUtc.getUTCFullYear(), startMonthUtc.getUTCMonth() - 11, 1));
    const endUtc = new Date(Date.UTC(startMonthUtc.getUTCFullYear(), startMonthUtc.getUTCMonth() + 1, 1)); // next month start

    const { data: createdRows } = await supabase
      .from("contact_requests")
      .select("created_at")
      .gte("created_at", startUtc.toISOString())
      .lt("created_at", endUtc.toISOString());

    const buckets = Array(12).fill(0) as number[]; // oldest..newest
    (createdRows ?? []).forEach((r: any) => {
      const d = new Date(r.created_at);
      const monthsDiff = (d.getUTCFullYear() - startUtc.getUTCFullYear()) * 12 + (d.getUTCMonth() - startUtc.getUTCMonth());
      if (monthsDiff >= 0 && monthsDiff < 12) buckets[monthsDiff]++;
    });

    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const labels = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(Date.UTC(startUtc.getUTCFullYear(), startUtc.getUTCMonth() + i, 1));
      return shortMonths[date.getUTCMonth()];
    });

    var volume = { labels, values: buckets } as const;
  }

  // activities built dynamically below

  // --- Helpers ---
  function toTitle(str: string | null | undefined): string {
    if (!str) return "";
    return String(str)
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function formatApp(app: string | null | undefined): string | null {
    if (!app) return null;
    const key = String(app).trim().toLowerCase();
    const map: Record<string, string> = {
      collections_app: "Collections App",
      lending_app: "Lending App",
    };
    return map[key] ?? toTitle(app);
  }

  function truncate(s: string | null | undefined, n = 120): string {
    if (!s) return "";
    const t = s.trim();
    if (t.length <= n) return t;
    return t.slice(0, n - 1).trimEnd() + "…";
  }

  function relTime(iso: string | null | undefined): string {
    if (!iso) return "";
    const d = new Date(iso);
    const now = new Date();
    const ms = now.getTime() - d.getTime();
    const sec = Math.max(1, Math.floor(ms / 1000));
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);
    if (day > 0) return `${day}d ago`;
    if (hr > 0) return `${hr}h ago`;
    if (min > 0) return `${min}m ago`;
    return `${sec}s ago`;
  }

  function shortDate(iso: string | null | undefined): string {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
  }

  // Pill badge renderer
  function Tag({ label }: { label: string }) {
    const key = label.trim().toLowerCase();
    let cls = "inline-flex items-center rounded-full border px-3 py-1 text-[11px]";
    // Priority tones
    if (key === "high") cls += " bg-rose-50 border-rose-200 text-rose-700";
    else if (key === "medium") cls += " bg-amber-50 border-amber-200 text-amber-700";
    else if (key === "low") cls += " bg-emerald-50 border-emerald-200 text-emerald-700";
    else cls += " bg-card2 border-border text-muted"; // default for location/agent
    return <span className={cls}>{label}</span>;
  }

  function routeFor(reason: string | null | undefined): string {
    const key = (reason ?? "").toString().trim().toLowerCase();
    if (key === "bank") return "/bank-transfers";
    if (key === "agent pay in" || key === "agent pay-in") return "/agent-pay-in";
    if (key === "admin") return "/admin";
    return "/tickets";
  }

  // --- Fetch recent tickets and build activity + board ---
  const { data: recentTickets } = await supabase
    .from("contact_requests")
    .select("ticket_no, submitted_by_name, status, priority, created_at, reason, description, app, page")
    .order("created_at", { ascending: false })
    .limit(30);

  const recent = (recentTickets ?? []).map((r: any) => {
    const id = `#${r.ticket_no != null ? String(r.ticket_no).padStart(4, "0") : "----"}`;
    const reasonKey = (r.reason ?? "").toString().trim().toLowerCase();
    const isAPI = reasonKey === "agent pay in" || reasonKey === "agent pay-in";
    const tags: string[] = [];
    if (r.priority) tags.push(toTitle(r.priority)); // Priority badge
    if (r.page) tags.push(toTitle(r.page)); // Location of error badge
    if (isAPI && r.submitted_by_name) tags.push(`Agent: ${r.submitted_by_name}`); // Agent name for Agent Pay In

    return {
      id,
      title: toTitle(r.reason) || toTitle(r.page) || "Support Ticket",
      status: r.status ?? "Open",
      tags,
      excerpt: truncate(r.description) || "",
      author: r.submitted_by_name || "Team",
      time: relTime(r.created_at),
      created_at: r.created_at as string | null,
      href: routeFor(r.reason),
    };
  });

  const activities = recent.slice(0, 2);

  const isOpenish = (s: string | null | undefined) => {
    const a = (s ?? "").toString();
    return a === "Open" || a === "Unable to Balance" || a === "Pending" || a === "";
  };

  const openItems = recent
    .filter((r) => isOpenish(r.status))
    .slice(0, 5)
    .map((r) => ({ title: r.title, desc: r.excerpt, tags: r.tags, date: shortDate(r.created_at), href: r.href }));

  const progressItems = recent
    .filter((r) => (r.status ?? "") === "In Progress")
    .slice(0, 5)
    .map((r) => ({ title: r.title, desc: r.excerpt, tags: r.tags, date: shortDate(r.created_at), href: r.href }));

  const archivedItems = recent
    .filter((r) => ["Resolved", "Closed"].includes(r.status ?? ""))
    .slice(0, 5)
    .map((r) => ({ title: r.title, desc: r.excerpt, tags: r.tags, date: shortDate(r.created_at), href: r.href }));

  const columns = [
    { title: `Open (${openItems.length})`, items: openItems },
    { title: `In Progress (${progressItems.length})`, items: progressItems },
    { title: `Archived (${archivedItems.length})`, items: archivedItems },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="muted mt-1">Overview of support operations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <div className="text-sm text-muted">{s.label}</div>
            <div className="mt-2 flex items-end justify-between">
              <div className="stat">{s.value}</div>
              <div className="text-xs text-accent">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">Ticket Volume Tracker</div>
            <form method="get" className="flex items-center gap-2">
              <select name="range" defaultValue={range} className="rounded-md border border-border bg-card px-2 py-1 text-xs">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <button type="submit" className="text-xs rounded-md border border-border bg-card px-2 py-1">Apply</button>
            </form>
          </div>
          <div className="mt-6">
            {/* Bar chart hooked to data (bigger) */}
            {(() => {
              const max = Math.max(1, ...volume.values);
              const chartHeight = range === "weekly" ? 320 : 240; // px
              const scale = chartHeight; // 1:1 scale to container height
              const barWidth = range === "weekly" ? 22 : 14; // px
              const cols = volume.values.length;
              return (
                <div
                  className="grid items-end gap-4"
                  style={{ height: `${chartHeight}px`, gridTemplateColumns: `repeat(${cols}, minmax(24px, 1fr))` }}
                >
                  {volume.values.map((v, i) => (
                    <div key={i} className="relative group flex flex-col items-center gap-2">
                      <div
                        className="rounded-lg w-full bg-(--accent) border border-(--accent)"
                        style={{ height: `${Math.max(2, Math.round((v / max) * scale))}px` }}
                        aria-label={`${v} tickets`}
                      />
                      {/* Tooltip */}
                      <div
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-card border border-border text-xs px-2 py-1 rounded shadow"
                        style={{ bottom: "100%", marginBottom: 8 }}
                      >
                        {v} ticket{v === 1 ? "" : "s"}
                      </div>
                      <div className="text-[12px] text-muted">{volume.labels[i]}</div>
                    </div>
                  ))}
                </div>
              );
            })()}
            
            <div className="mt-4 text-sm">
              <span className="text-accent font-medium">{(volume.values[volume.values.length - 1] ?? 0)}</span> today
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">Recent Support Activity</div>
            <a className="text-xs text-muted hover:underline" href="/tickets">See all activities</a>
          </div>
          <div className="mt-4 space-y-4">
            {activities.map((a) => (
              <a key={a.id} href={a.href} className="rounded-lg border border-border p-3 block hover:bg-card2/40">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">Ticket {a.id}</div>
                  <span className="tag">{a.status}</span>
                </div>
                <div className="mt-1 text-sm">{a.title}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
                <p className="muted mt-2">{a.excerpt}</p>
                <div className="mt-3 text-xs text-muted">{a.author} • {a.time}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket board */}
      <div className="card p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-medium">Ticket Status Board</div>
          <a className="text-xs text-muted hover:underline" href="/tickets">See all activities</a>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title} className="rounded-xl border border-border bg-bg p-3">
              <div className="mb-2 text-sm font-medium">{col.title}</div>
              <div className="space-y-3">
                {col.items.map((it, idx) => (
                  <a key={idx} href={it.href} className="card-muted p-3 block hover:bg-card2/40">
                    <div className="text-sm font-medium">{it.title}</div>
                    <p className="muted mt-1">{it.desc}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {it.tags.map((t) => (
                        <Tag key={t} label={t} />
                      ))}
                    </div>
                    <div className="mt-2 text-[11px] text-muted">Last Update: {it.date}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
