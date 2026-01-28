"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";

export type AgentPayInRow = {
  ticket_no: number | null;
  submitted_by_name: string | null;
  submitted_by_email: string | null;
  phone: string | null;
  created_at?: string | null;
  // Balanced info
  balanced_status?: string | null;
  reason_unbalanced?: string | null;
  // Optional status for updates
  status?: string | null;
};

function val(s: string | number | null | undefined): string {
  if (s == null) return "N/A";
  const str = String(s).trim();
  return str ? str : "N/A";
}

function formatTicketNo(n: number | null): string {
  if (n == null || isNaN(n as any)) return "N/A";
  if (n < 10000) return `#${String(n).padStart(4, "0")}`;
  return `#${n}`;
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
  const raw = val((iso as any) ?? null);
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

// Statuses
export type TicketStatus = "Clip Complete" | "Unable to Balance";

function BulkStatusMenu({ disabled, onSelect, saving }: { disabled: boolean; onSelect: (s: TicketStatus) => void; saving: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const options: TicketStatus[] = ["Clip Complete", "Unable to Balance"];

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

export default function AgentPayInTable({ items }: { items: AgentPayInRow[] }) {
  const [rows, setRows] = useState<AgentPayInRow[]>(items);
  useEffect(() => setRows(items), [items]);

  const [selected, setSelected] = useState<Set<number>>(new Set());
  const selectableIds = useMemo(
    () => rows.map((r) => r.ticket_no).filter((n): n is number => typeof n === "number"),
    [rows]
  );
  const allSelected = selected.size > 0 && selectableIds.every((id) => selected.has(id));
  const someSelected = selected.size > 0 && !allSelected;

  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [pendingStatus, setPendingStatus] = useState<TicketStatus | null>(null);
  const onBulkChange = async (next: TicketStatus, customMessage?: string) => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    try {
      setSaving(true);
      const res = await fetch("/api/tickets/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketNos: ids, status: next, customMessage }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to update status");
      }
      const newBalanced = next === "Clip Complete" ? "balanced" : next === "Unable to Balance" ? "unbalanced" : undefined;
      setRows((prev) => prev.map((r) => (r.ticket_no != null && selected.has(r.ticket_no) ? { ...r, status: next, balanced_status: newBalanced ?? r.balanced_status } : r)));
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

  return (
    <div className="w-full rounded-xl border border-border bg-bg shadow-sm overflow-hidden">
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-4 shadow-lg">
            <h3 className="text-base font-semibold mb-2">Send custom message</h3>
            <p className="text-sm text-muted mb-2">This message will be sent with the "Unable to Balance" status.</p>
            <textarea className="textarea w-full" rows={6} value={modalMsg} onChange={(e) => setModalMsg(e.target.value)} placeholder="Type your message…" />
            <div className="mt-3 flex items-center justify-end gap-2">
              <button className="btn-ghost" onClick={() => { setModalOpen(false); setModalMsg(""); setPendingStatus(null); }}>Cancel</button>
              <button className="btn" onClick={() => {
                const s = pendingStatus ?? "Unable to Balance";
                onBulkChange(s, modalMsg.trim() || undefined).then(() => {
                  setModalOpen(false);
                  setModalMsg("");
                  setPendingStatus(null);
                });
              }}>Send</button>
            </div>
          </div>
        </div>
      )}
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
            onSelect={(s) => {
              if (s === "Unable to Balance") {
                // Open modal to collect custom message
                setModalOpen(true);
                setPendingStatus(s);
              } else {
                onBulkChange(s);
              }
            }}
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
                    if ((e.currentTarget as HTMLInputElement).checked) setSelected(new Set(selectableIds));
                    else setSelected(new Set());
                  }}
                />
              </th>
              <th className="px-2 py-5 text-[14px] font-semibold">Ticket Number</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Name</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Email</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Phone</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Balanced Status</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Unbalanced Reason</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Created</th>
              <th className="px-2 py-5 text-[14px] font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t, i) => {
              const idNum = typeof t.ticket_no === "number" ? t.ticket_no : null;
              const isChecked = idNum != null && selected.has(idNum);
              const stRaw = (t.status ?? "").toString().trim();
              const st = stRaw || "—";
              const badge = (() => {
                if (st === "Clip Complete") {
                  return { bg: "#F0FDF4", border: "#BBF7D0", color: "#166534", dot: "#22C55E" };
                }
                if (st === "Unable to Balance") {
                  return { bg: "#FEF2F2", border: "#FECACA", color: "#991B1B", dot: "#EF4444" };
                }
                return { bg: "#F3F4F6", border: "#E5E7EB", color: "#374151", dot: "#9CA3AF" };
              })();
              return (
                <Fragment key={`${t.ticket_no ?? i}`}>
                  <tr className="border-t border-border hover:bg-card2/40">
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
                    <td className="px-2 py-2 align-middle truncate">
                      {(() => {
                        const bs = (t.balanced_status ?? "").toString().trim();
                        const key = bs.toLowerCase();
                        const color = key === "balanced" || key === "clip complete" || key === "complete" || key === "yes"
                          ? { bg: "#F0FDF4", border: "#BBF7D0", color: "#166534", dot: "#22C55E" }
                          : key === "unbalanced" || key === "unable to balance" || key === "no"
                          ? { bg: "#FEF2F2", border: "#FECACA", color: "#991B1B", dot: "#EF4444" }
                          : { bg: "#FFFBEB", border: "#FDE68A", color: "#92400E", dot: "#F59E0B" };
                        const text = bs || "N/A";
                        return (
                          <span className="badge border" style={{ backgroundColor: color.bg, borderColor: color.border, color: color.color }}>
                            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: color.dot }} />
                            {text}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-2 py-2 align-middle text-muted truncate">{val(t.reason_unbalanced)}</td>
                    <td className="px-2 py-2 align-middle text-muted">{formatCreated(t.created_at)}</td>
                    <td className="px-2 py-2 align-middle">
                      <span className="badge border" style={{ backgroundColor: badge.bg, borderColor: badge.border, color: badge.color }}>
                        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: badge.dot }} />
                        {st}
                      </span>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
