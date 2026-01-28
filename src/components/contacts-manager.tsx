"use client";

import { useEffect, useState } from "react";

type Contact = { id: string; name: string; phone: string; email: string | null; role: string | null };

export default function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Agent");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/contacts");
    const j = await res.json();
    setContacts(j.contacts ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addContact() {
    setSaving(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email: email || null, role }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      setName("");
      setPhone("");
      setEmail("");
      await load();
    } catch (e: any) {
      alert(e?.message ?? "Failed to add contact");
    } finally {
      setSaving(false);
    }
  }

  async function removeContact(id: string) {
    if (!confirm("Delete this contact?")) return;
    const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    if (!res.ok) alert("Failed to delete");
    else await load();
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Contacts</h2>
        <p className="text-muted text-sm">Add, edit, or remove clients and team members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
        <div>
          <label className="text-sm text-muted">Name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
        </div>
        <div>
          <label className="text-sm text-muted">Phone</label>
          <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44..." />
        </div>
        <div>
          <label className="text-sm text-muted">Email (optional)</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
        </div>
        <div>
          <label className="text-sm text-muted">Role</label>
          <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Agent</option>
            <option>Manager</option>
            <option>Company</option>
          </select>
        </div>
        <div>
          <button disabled={saving || !name || !phone} onClick={addContact} className="btn w-full">Add Contact</button>
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
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-3 py-3" colSpan={4}>Loading…</td></tr>
            ) : contacts.length === 0 ? (
              <tr><td className="px-3 py-3" colSpan={5}>No contacts yet.</td></tr>
            ) : (
              contacts.map((c) => (
                <tr key={c.id} className="border-t border-border">
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2 text-muted">{c.phone}</td>
                  <td className="px-3 py-2 text-muted">{c.email ?? "—"}</td>
                  <td className="px-3 py-2">{c.role ?? "—"}</td>
                  <td className="px-3 py-2 text-right">
                    <button className="btn-ghost text-rose-600" onClick={() => removeContact(c.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
