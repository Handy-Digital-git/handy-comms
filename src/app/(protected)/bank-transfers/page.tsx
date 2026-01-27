import { createClient } from "@/lib/supabase/server";
import BankTransfersTable from "@/components/bank-transfers-table";
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
  // bank-specific fields
  bank_customer_name?: string | null;
  bank_account_number?: string | null;
  bank_sort_code?: string | null;
  bank_amount?: string | number | null;
  bank_esb_amount?: string | number | null;
  amount_to_transfer?: string | number | null;
};

function formatTicketNo(n: number | null): string {
  if (n == null || isNaN(n as any)) return "N/A";
  if (n < 10000) return `#${String(n).padStart(4, "0")}`;
  return `#${n}`;
}

function val(s: string | null | undefined): string {
  return s && String(s).trim() ? String(s) : "N/A";
}

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

export default async function BankTransfersPage() {
  const supabase = await createClient();
  const selectCols = "ticket_no, submitted_by_name, submitted_by_email, phone, app, page, prefix, status, priority, created_at, reason, description, screenshot_urls, bank_customer_name, bank_account_number, bank_sort_code, bank_amount, bank_esb_amount, amount_to_transfer";
  const { data, error } = await supabase
    .from("contact_requests")
    .select(selectCols)
    .in("reason", ["Bank", "bank", "BANK"]) // tolerant casing
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
          // ignore errors
        }
      }
    })
  );

  // Debug info
  const { count: totalTickets } = (await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })) as any;
  const { count: totalBank } = (await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })
    .in("reason", ["Bank", "bank", "BANK"])) as any;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Bank Transfers</h1>
      </div>

      {items.length === 0 && (
        <div className="card-muted px-4 py-3 text-sm text-muted">
          <div>No Bank Transfer tickets found.</div>
          <div className="mt-1">Debug — total: {totalTickets ?? 0}, Bank exact: {totalBank ?? 0}{error ? `, error: ${error.message}` : ""}</div>
        </div>
      )}

      <BankTransfersTable items={out as any} />
    </div>
  );
}
