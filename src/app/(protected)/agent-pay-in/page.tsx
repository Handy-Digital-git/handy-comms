import { createClient } from "@/lib/supabase/server";
import AgentPayInTable from "@/components/agent-pay-in-table";
import { classifyPriority } from "@/lib/priority";

type ContactRequest = {
  ticket_no: number | null;
  submitted_by_name: string | null;
  submitted_by_email: string | null;
  phone: string | null;
  app: string | null;
  page: string | null;
  prefix?: string | null;
  status?: string | null;
  priority: string | null;
  created_at: string | null;
  reason: string | null;
  description?: string | null;
  screenshot_urls?: string | null;
  bank_customer_name?: string | null;
  bank_account_number?: string | null;
  bank_sort_code?: string | null;
  bank_amount?: string | number | null;
  bank_esb_amount?: string | number | null;
  amount_to_transfer?: string | number | null;
  balanced_status?: string | null;
  reason_unbalanced?: string | null;
};

export default async function AgentPayInPage() {
  const supabase = await createClient();
  const selectCols = "ticket_no, submitted_by_name, submitted_by_email, phone, app, page, prefix, status, priority, created_at, reason, description, screenshot_urls, bank_customer_name, bank_account_number, bank_sort_code, bank_amount, bank_esb_amount, amount_to_transfer, balanced_status, reason_unbalanced";
  const { data, error } = await supabase
    .from("contact_requests")
    .select(selectCols)
    .eq("reason", "Agent Pay In")
    .order("created_at", { ascending: false })
    .limit(200);

  const items: ContactRequest[] = data ?? [];

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
      if (r.ticket_no != null) {
        try {
          await supabase
            .from("contact_requests")
            .update({ priority: ai })
            .eq("ticket_no", r.ticket_no)
            .is("priority", null);
        } catch (e) {
          // ignore
        }
      }
    })
  );

  const { count: totalTickets } = (await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })) as any;
  const { count: totalAPI } = (await supabase
    .from("contact_requests")
    .select("*", { count: "exact", head: true })
    .eq("reason", "Agent Pay In")) as any;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Agent Pay In</h1>
      </div>

      {items.length === 0 && (
        <div className="card-muted px-4 py-3 text-sm text-muted">
          <div>No Agent Pay In tickets found.</div>
          <div className="mt-1">Debug — total: {totalTickets ?? 0}, Agent Pay In: {totalAPI ?? 0}{error ? `, error: ${error.message}` : ""}</div>
        </div>
      )}

      <AgentPayInTable items={out as any} />
    </div>
  );
}
