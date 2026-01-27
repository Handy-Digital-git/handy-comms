import { createClient } from "@/lib/supabase/server";
import TicketsTable from "@/components/tickets-table";
import { classifyPriority } from "@/lib/priority";

type ContactRequest = {
  ticket_no: number | null;
  submitted_by_name: string | null;
  submitted_by_email: string | null;
  phone: string | null;
  app: string | null;
  page: string | null;
  // Company prefix from contact_requests.prefix
  prefix?: string | null;
  // Status from DB
  status?: string | null;
  priority: string | null;
  created_at: string | null;
  reason: string | null;
  description?: string | null;
  screenshot_urls?: string | null;
};

function StatusBadge({ status }: { status: string | null }) {
  const map = {
    "In Progress": { bg: "bg-amber-50 border text-amber-700 border-amber-200", dot: "bg-amber-500" },
    Closed: { bg: "bg-emerald-50 border text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    "On Hold": { bg: "bg-rose-50 border text-rose-700 border-rose-200", dot: "bg-rose-500" },
    Open: { bg: "bg-cyan-50 border text-cyan-700 border-cyan-200", dot: "bg-cyan-500" },
  } as const;
  const key = (status ?? "Open") as keyof typeof map;
  const cfg = map[key] ?? map.Open;
  return (
    <span className={["badge", cfg.bg].join(" ")}> 
      <span className={["h-2 w-2 rounded-full", cfg.dot].join(" ")} />
      {status ?? "N/A"}
    </span>
  );
}

function Pill({ label, tone = "muted" }: { label: string; tone?: "muted" | "green" | "amber" | "sky" }) {
  const tones = {
    muted: "bg-card2 text-muted",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    sky: "bg-sky-50 text-sky-700",
  } as const;
  return <span className={["tag border border-border", tones[tone]].join(" ")}>{label}</span>;
}

function formatTicketNo(n: number | null): string {
  if (n == null || isNaN(n as any)) return "N/A";
  if (n < 10000) return `#${String(n).padStart(4, "0")}`;
  return `#${n}`;
}

function val(s: string | null | undefined): string {
  return s && String(s).trim() ? String(s) : "N/A";
}

// Temporary front-end category until AI classification is added
function computeCategory(_r: ContactRequest): string {
  // Placeholder logic; always show N/A for now
  return "N/A";
}

// Temporary front-end status until AI / workflow is added
function computeStatus(_r: ContactRequest): string {
  return "Open"; // default
}

// Humanization helpers
function toTitle(str: string): string {
  return str
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatApp(app: string | null | undefined): string {
  const raw = val(app);
  if (raw === "N/A") return raw;
  const key = String(app).trim().toLowerCase();
  const map: Record<string, string> = {
    "collections_app": "Collections App",
    "lending_app": "Lending App",
  };
  return map[key] ?? toTitle(String(app!));
}

function formatLocation(page: string | null | undefined): string {
  const raw = val(page);
  if (raw === "N/A") return raw;
  const key = String(page).trim().toLowerCase();
  const map: Record<string, string> = {
    "customer_details": "Customer Details",
    "loans": "Loans",
  };
  return map[key] ?? toTitle(String(page!));
}

function formatPhone(phone: string | null | undefined): string {
  const raw = val(phone);
  if (raw === "N/A") return raw;
  let p = String(phone!).replace(/[^\d+]/g, "");
  if (p.startsWith("+44")) return p;
  if (p.startsWith("44")) return "+" + p; // add leading +
  if (p.startsWith("0")) return "+44" + p.slice(1);
  if (p.startsWith("+")) return p; // some other E.164 already
  return "+44" + p; // default prefix
}

function pad(n: number) { return n.toString().padStart(2, "0"); }
function formatCreated(iso: string | null | undefined): string {
  const raw = val(iso);
  if (raw === "N/A") return raw;
  const d = new Date(String(iso!));
  if (isNaN(d.getTime())) return raw;

  const now = new Date();
  const dd = pad(d.getDate());
  const mm = pad(d.getMonth() + 1);
  const yyyy = d.getFullYear();
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());

  const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (sameDay(d, now)) return `Today ${hh}:${min}`;
  if (sameDay(d, yesterday)) return `Yesterday ${hh}:${min}`;
  return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
}

export default async function TicketsPage() {
  const supabase = await createClient();
  const selectCols = "ticket_no, submitted_by_name, submitted_by_email, phone, app, page, prefix, status, priority, created_at, reason, description, screenshot_urls";
  const { data, error } = await supabase
    .from("contact_requests")
    .select(selectCols)
    .eq("reason", "IT")
    .order("created_at", { ascending: false })
    .limit(200);

  const items: ContactRequest[] = data ?? [];

  // AI-prioritize rows missing priority (capped to first 25 to avoid excessive calls)
  const out: ContactRequest[] = items.map((r) => ({ ...r }));
  const missingIdx = out
    .map((r, i) => (!r.priority || !r.priority.toString().trim() ? i : -1))
    .filter((i) => i >= 0)
    .slice(0, 25);

  await Promise.all(
    missingIdx.map(async (i) => {
      const r = out[i];
      const ai = await classifyPriority({ description: r.description, page: r.page, app: r.app });
      out[i].priority = ai;
      // Persist to DB so we don't reclassify next time
      if (r.ticket_no != null) {
        try {
          await supabase
            .from("contact_requests")
            .update({ priority: ai })
            .eq("ticket_no", r.ticket_no)
            .is("priority", null);
        } catch (e) {
          // best-effort; ignore errors to not block page render
        }
      }
    })
  );
  // Debug info to diagnose empty results
  const { count: totalTickets } = (await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })) as any;
  const { count: totalIT } = (await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })
    .eq("reason", "IT")) as any;
  const { data: sampleReasons } = await supabase
    .from("contact_requests")
    .select("reason")
    .limit(5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">IT Tickets</h1>
      </div>

      {items.length === 0 && (
        <div className="card-muted px-4 py-3 text-sm text-muted">
          <div>No IT tickets found.</div>
          <div className="mt-1">Debug — total: {totalTickets ?? 0}, IT exact: {totalIT ?? 0}{error ? `, error: ${error.message}` : ""}</div>
          {sampleReasons && (
            <div className="mt-1">Reason samples: {(sampleReasons as any[]).map((r) => r.reason ?? "null").join(", ")}</div>
          )}
        </div>
      )}

      <TicketsTable items={out as any} />
    </div>
  );
}

