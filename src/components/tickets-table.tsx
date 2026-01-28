"use client";

import { useEffect, useMemo, useRef, useState, Fragment } from "react";
import { createClient } from "@/lib/supabase/client";

// Keep this in sync with server-side select in the page
export type ContactRequestRow = {
  ticket_no: number | null;
  submitted_by_name: string | null;
  submitted_by_email: string | null;
  phone: string | null;
  app: string | null;
  page: string | null;
  // Company prefix from contact_requests.prefix
  prefix?: string | null;
  // Status straight from DB
  status?: string | null;
  priority: string | null;
  created_at: string | null;
  reason: string | null;
  description?: string | null;
  screenshot_urls?: string | null;
};

function val(s: string | null | undefined): string {
  return s && String(s).trim() ? String(s) : "N/A";
}

function formatTicketNo(n: number | null): string {
  if (n == null || isNaN(n as any)) return "N/A";
  if (n < 10000) return `#${String(n).padStart(4, "0")}`;
  return `#${n}`;
}

function formatCompany(prefix: string | null | undefined): string {
  const raw = val(prefix);
  if (raw === "N/A") return raw;
  const key = String(prefix).trim().toUpperCase();
  const map: Record<string, string> = {
    HCF: "Handy Cash",
    PLF: "Paul Lee Mark Finance",
    SLL: "Splash Loans",
    RB: "Raymond Barker",
    JJ: "JJ Home Credit",
    AB: "Able Loans",
    IL: "Ideal Loans",
    CPC: "Careys Personal Credit",
  };
  return map[key] ?? raw;
}

function computeStatus(r: ContactRequestRow): string {
  const s = r.status ? String(r.status).trim() : "";
  return s.length ? s : "Open";
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
    collections_app: "Collections App",
    lending_app: "Lending App",
  };
  return map[key] ?? toTitle(String(app!));
}

function formatLocation(page: string | null | undefined): string {
  const raw = val(page);
  if (raw === "N/A") return raw;
  const key = String(page).trim().toLowerCase();
  const map: Record<string, string> = {
    customer_details: "Customer Details",
    loans: "Loans",
  };
  return map[key] ?? toTitle(String(page!));
}

function formatPhone(phone: string | null | undefined): string {
  const raw = val(phone);
  if (raw === "N/A") return raw;
  let p = String(phone!).replace(/[^\d+]/g, "");
  if (p.startsWith("+44")) return p;
  if (p.startsWith("44")) return "+" + p;
  if (p.startsWith("0")) return "+44" + p.slice(1);
  if (p.startsWith("+")) return p;
  return "+44" + p;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}
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

function Pill({ label, tone = "muted" }: { label: string; tone?: "muted" | "green" | "amber" | "sky" | "red" | "orange" | "yellow" }) {
  const tones = {
    muted: { bg: "bg-card2", text: "text-muted", border: "border-border" },
    green: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    sky: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
    red: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
    orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
    yellow: { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-200" },
  } as const;
  const t = tones[tone];
  return <span className={["tag", "border", t.border, t.bg, t.text].join(" ")}>{label}</span>;
}

// Allowed statuses for tickets
export type TicketStatus = "Open" | "Resolved" | "Closed" | "In Progress";

function StatusBadge({ status }: { status: string | null }) {
  const label = (status ?? "Open").trim();
  // Map of fallback hex colors (background, border, text, dot)
  const colors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
    "In Progress": { bg: "#FFFBEB", border: "#FDE68A", text: "#92400E", dot: "#F59E0B" },
    Resolved: { bg: "#F0FDF4", border: "#BBF7D0", text: "#166534", dot: "#22C55E" },
    Closed: { bg: "#ECFDF5", border: "#A7F3D0", text: "#065F46", dot: "#10B981" },
    "On Hold": { bg: "#FFF1F2", border: "#FECDD3", text: "#9F1239", dot: "#F43F5E" },
    Open: { bg: "#ECFEFF", border: "#A5F3FC", text: "#0E7490", dot: "#06B6D4" },
  };
  const c = colors[label] ?? colors.Open;
  return (
    <span
      className="badge"
      style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text }}
    >
      <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: c.dot }} />
      {label}
    </span>
  );
}

export default function TicketsTable({ items }: { items: ContactRequestRow[] }) {
  // Local rows so we can reflect updates immediately
  const [rows, setRows] = useState<ContactRequestRow[]>(items);
  useEffect(() => setRows(items), [items]);

  // Selection state (only rows with a ticket_no can be updated)
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const selectableIds = useMemo(
    () => rows.map((r) => r.ticket_no).filter((n): n is number => typeof n === "number"),
    [rows]
  );
  const allSelected = selected.size > 0 && selectableIds.every((id) => selected.has(id));
  const someSelected = selected.size > 0 && !allSelected;

  // Expand/collapse
  const [openRow, setOpenRow] = useState<string | null>(null);
  const toggle = (id: string) => setOpenRow((prev) => (prev === id ? null : id));

  // Bulk status change
  const [saving, setSaving] = useState(false);
  const supabase = useMemo(() => createClient(), []); // still used elsewhere if needed
  const onBulkChange = async (next: TicketStatus) => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    try {
      setSaving(true);
      const res = await fetch("/api/tickets/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketNos: ids, status: next }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to update status");
      }
      setRows((prev) => prev.map((r) => (r.ticket_no != null && selected.has(r.ticket_no) ? { ...r, status: next } : r)));
      setSelected(new Set());
    } catch (e: any) {
      console.error(e);
      alert(e?.message ?? "Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  // Bulk delete
  const [deleting, setDeleting] = useState(false);
  const onBulkDelete = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    const ok = confirm(`Delete ${ids.length} ticket${ids.length > 1 ? "s" : ""}? This cannot be undone.`);
    if (!ok) return;
    try {
      setDeleting(true);
      const res = await fetch("/api/tickets/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketNos: ids }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to delete tickets");
      }
      setRows((prev) => prev.filter((r) => !(r.ticket_no != null && selected.has(r.ticket_no))));
      setSelected(new Set());
    } catch (e: any) {
      console.error(e);
      alert(e?.message ?? "Failed to delete tickets");
    } finally {
      setDeleting(false);
    }
  };

  const colCount = 12; // checkbox + 10 columns + toggle column

  return (
    <div className="w-full rounded-xl border border-border bg-bg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="text-sm text-muted">{selected.size} selected</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={selected.size === 0 || deleting}
            onClick={onBulkDelete}
            className={[
              "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
              selected.size === 0 || deleting ? "border-border bg-card text-muted opacity-60" : "border-border bg-card hover:bg-card2 text-rose-600",
            ].join(" ")}
            title="Delete selected"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            </svg>
            {deleting ? "Deleting…" : "Delete"}
          </button>
          <BulkStatusMenu
            disabled={selected.size === 0 || saving}
            saving={saving}
            onSelect={onBulkChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left text-[13px]">
          <thead className="bg-(--accent)/10 text-accent">
            <tr className="border-b border-(--accent)/20">
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-accent"
                  aria-label="Select all"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setSelected(new Set(selectableIds));
                    } else {
                      setSelected(new Set());
                    }
                  }}
                />
              </th>
              <th className="px-2 py-5 text-[14px] font-semibold">Ticket Number</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Name</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Email</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Phone</th>
              <th className="px-2 py-5 text-[14px] font-semibold">App</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Location of Problem</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Company</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Status</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Priority</th>
              <th className="px-4 py-5 text-[14px] font-semibold">Created</th>
              <th className="text-[14px] font-semibold">More Info</th>
              <th className="px-2 py-5 text-[14px] font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t, i) => {
              const rowId = `${t.ticket_no ?? i}-${t.created_at ?? ""}`;
              const isOpen = openRow === rowId;
              const idNum = typeof t.ticket_no === "number" ? t.ticket_no : null;
              const isChecked = idNum != null && selected.has(idNum);
              return (
                <Fragment key={rowId}>
                  <tr key={rowId} className="border-t border-border hover:bg-card2/40">
                    <td className="px-4 py-2 align-middle">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-accent"
                        aria-label={`Select ${t.ticket_no ?? i}`}
                        checked={isChecked}
                        disabled={idNum == null}
                        onChange={(e) => {
                          if (idNum == null) return;
                          const checked = (e.currentTarget as HTMLInputElement).checked;
                          setSelected((prev) => {
                            const next = new Set(prev);
                            if (checked) next.add(idNum);
                            else next.delete(idNum);
                            return next;
                          });
                        }}
                      />
                    </td>
                    <td className="px-2 py-2 align-middle">{formatTicketNo(t.ticket_no)}</td>
                    <td className="px-2 py-2 align-middle truncate">{val(t.submitted_by_name)}</td>
                    <td className="px-2 py-2 align-middle text-muted truncate">{val(t.submitted_by_email)}</td>
                    <td className="px-2 py-2 align-middle text-muted truncate">{formatPhone(t.phone)}</td>
                    <td className="px-2 py-2 align-middle text-muted truncate">{formatApp(t.app)}</td>
                    <td className="px-2 py-2 align-middle text-muted truncate">{formatLocation(t.page)}</td>
                    <td className="px-2 py-2 align-middle text-muted truncate">{formatCompany(t.prefix)}</td>
                    <td className="px-2 py-2 align-middle"><StatusBadge status={computeStatus(t)} /></td>
                    <td className="px-2 py-2 align-middle">
                      {val(t.priority) === "High" && <Pill label="High" tone="red" />}
                      {val(t.priority) === "Medium" && <Pill label="Medium" tone="orange" />}
                      {val(t.priority) === "Low" && <Pill label="Low" tone="yellow" />}
                      {!["High", "Medium", "Low"].includes(val(t.priority)) && <Pill label={val(t.priority)} />}
                    </td>
                    <td className="px-4 py-2 align-middle text-muted">{formatCreated(t.created_at)}</td>
                    <td className="px-2 py-2 align-middle">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`row-${rowId}`}
                        onClick={() => toggle(rowId)}
                        className="grid h-6 w-6 place-items-center rounded-md border border-border bg-card hover:bg-card2"
                        title={isOpen ? "Collapse" : "Expand"}
                      >
                        <span className={`transition-transform ${isOpen ? "rotate-90" : ""}`}>▶</span>
                      </button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr id={`row-${rowId}`}>
                      <td colSpan={colCount} className="px-4 py-4 bg-card2/30">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <div className="text-sm font-medium mb-2">Description</div>
                            <div className="rounded-lg border border-border bg-bg p-3 text-sm text-muted whitespace-pre-wrap">
                              {val(t.description)}
                            </div>
                          </div>
                          <div className="w-full md:justify-self-stretch">
                            <div className="text-sm font-medium mb-2">Screenshot</div>
                            <ScreenshotPreview url={t.screenshot_urls ?? null} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BulkStatusMenu({ disabled, onSelect, saving }: { disabled: boolean; onSelect: (s: TicketStatus) => void; saving: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const options: TicketStatus[] = ["Open", "Resolved", "Closed", "In Progress"];

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={[
          "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
          disabled ? "border-border bg-card text-muted opacity-60" : "border-border bg-card hover:bg-card2",
        ].join(" ")}
      >
        <span>Change status</span>
        {saving ? <span className="animate-pulse text-muted">…</span> : <span>▾</span>}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-border bg-bg shadow-lg">
          <ul className="py-1">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2.5 text-sm hover:bg-card2"
                  onClick={() => {
                    onSelect(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ScreenshotPreview({ url }: { url: string | null }) {
  const [broken, setBroken] = useState(false);
  const hasUrl = !!url && String(url).trim().length > 0;

  if (!hasUrl || broken) {
    return (
      <div className="h-40 w-full grid place-items-center rounded-lg border border-dashed border-border bg-bg text-sm text-muted">
        No image provided
      </div>
    );
  }

  return (
    <a href={url!} target="_blank" rel="noreferrer">
      <img
        alt="Ticket screenshot"
        src={url!}
        loading="lazy"
        onError={() => setBroken(true)}
        className="max-h-64 w-full h-auto rounded-lg border border-border object-contain bg-bg"
      />
    </a>
  );
}
