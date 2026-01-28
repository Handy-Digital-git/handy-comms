"use client";

import { useEffect, useState } from "react";

type Recipient = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  role: string | null;
  enabled: boolean | null;
};

export default function NotificationsManager() {
  const [rows, setRows] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [enabled, setEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/notifications/recipients");
    const j = await res.json();
    setRows(j.recipients ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addRecipient() {
    setSaving(true);
    try {
      const res = await fetch("/api/notifications/recipients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email: email || null, role, enabled }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      setName("");
      setPhone("");
      setEmail("");
      setRole("Admin");
      setEnabled(true);
      await load();
    } catch (e: any) {
      alert(e?.message ?? "Failed to add recipient");
    } finally {
      setSaving(false);
    }
  }

  async function removeRecipient(id: string) {
    if (!confirm("Delete this recipient?")) return;
    const res = await fetch(`/api/notifications/recipients/${id}`, { method: "DELETE" });
    if (!res.ok) alert("Failed to delete");
    else await load();
  }


  async function toggleEnabled(id: string, next: boolean) {
    const res = await fetch(`/api/notifications/recipients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: next }),
    });
    if (!res.ok) alert("Failed to update");
    else await load();
  }

  // no-op: days removed

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-muted text-sm">Choose who gets notified when a new ticket is created. Notifications are sent by SMS and email.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
        <div>
          <label className="text-sm text-muted">Name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Admin" />
        </div>
        <div>
          <label className="text-sm text-muted">Phone</label>
          <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44..." />
        </div>
        <div>
          <label className="text-sm text-muted">Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
        </div>
        <div>
          <label className="text-sm text-muted">Role</label>
          <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Admin</option>
            <option>IT</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted">Enabled</label>
          <input type="checkbox" className="h-4 w-4 accent-accent" checked={enabled} onChange={(e) => setEnabled(e.currentTarget.checked)} />
        </div>
        <div>
          <button disabled={saving || !name || !phone} onClick={addRecipient} className="btn w-full">Add Recipient</button>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="max-h-96 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-card2 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Role</th>
                <th className="px-3 py-2 text-left">Enabled</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="px-3 py-3" colSpan={6}>Loading…</td></tr>
              ) : rows.length === 0 ? (
                <tr><td className="px-3 py-3" colSpan={6}>No recipients yet.</td></tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-3 py-2">{r.name}</td>
                    <td className="px-3 py-2 text-muted">{r.phone}</td>
                    <td className="px-3 py-2 text-muted">{r.email ?? "—"}</td>
                    <td className="px-3 py-2">{r.role ?? "—"}</td>
                    <td className="px-3 py-2">
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 accent-accent" checked={!!r.enabled} onChange={(e) => toggleEnabled(r.id, e.currentTarget.checked)} />
                        <span className="text-xs text-muted">{r.enabled ? "On" : "Off"}</span>
                      </label>
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button className="btn-ghost text-rose-600" onClick={() => removeRecipient(r.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test notification removed as requested */}
    </div>
  );
}
