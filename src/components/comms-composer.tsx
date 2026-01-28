"use client";

import { useEffect, useMemo, useState } from "react";

export type Contact = { id: string; name: string; phone: string; email: string | null };
export type Group = { id: string; name: string };

export default function CommsComposer() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [contactQuery, setContactQuery] = useState("");
  const [groupQuery, setGroupQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  async function load() {
    setLoading(true);
    const [c, g] = await Promise.all([
      fetch("/api/contacts").then((r) => r.json()),
      fetch("/api/groups").then((r) => r.json()),
    ]);
    setContacts(c.contacts ?? []);
    setGroups(g.groups ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const contactArray = useMemo(() => {
    const q = contactQuery.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter((c) =>
      (c.name?.toLowerCase().includes(q)) ||
      (c.phone?.toLowerCase().includes(q)) ||
      (c.email?.toLowerCase().includes(q))
    );
  }, [contacts, contactQuery]);

  const groupArray = useMemo(() => {
    const q = groupQuery.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) => g.name.toLowerCase().includes(q));
  }, [groups, groupQuery]);

  async function send() {
    if (!message.trim()) return alert("Enter a message");
    const contactIds = Array.from(selectedContacts);
    const groupIds = Array.from(selectedGroups);
    if (contactIds.length === 0 && groupIds.length === 0) return alert("Select at least one contact or group");
    setSending(true);
    try {
      const res = await fetch("/api/comms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, contactIds, groupIds }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Failed to send");
      alert(`Sent ${j.sent} of ${j.recipients}`);
      setMessage("");
      setSelectedContacts(new Set());
      setSelectedGroups(new Set());
    } catch (e: any) {
      alert(e?.message ?? "Failed to send");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Send Group Text</h2>
        <p className="text-muted text-sm">Select contacts and/or groups and send an SMS to everyone at once.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg">
          <div className="px-3 py-2 border-b border-border font-medium bg-card2 sticky top-0 z-10">
            <div>Contacts</div>
            <div className="mt-2">
              <input className="input" placeholder="Search contacts…" value={contactQuery} onChange={(e) => setContactQuery(e.target.value)} />
            </div>
          </div>
          <div className="max-h-64 overflow-auto">
            {loading ? (
              <div className="px-3 py-2">Loading…</div>
            ) : contactArray.length === 0 ? (
              <div className="px-3 py-2">No contacts</div>
            ) : (
              <ul>
                {contactArray.map((c) => {
                  const checked = selectedContacts.has(c.id);
                  return (
                    <li key={c.id} className="flex items-center gap-2 px-3 py-2 border-t border-border">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-accent"
                        checked={checked}
                        onChange={(e) => {
                          const isChecked = (e.currentTarget as HTMLInputElement).checked;
                          setSelectedContacts((prev) => {
                            const next = new Set(prev);
                            if (isChecked) next.add(c.id); else next.delete(c.id);
                            return next;
                          });
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted">{c.phone} {c.email ? `· ${c.email}` : ""}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="border border-border rounded-lg">
          <div className="px-3 py-2 border-b border-border font-medium bg-card2 sticky top-0 z-10">
            <div>Groups</div>
            <div className="mt-2">
              <input className="input" placeholder="Search groups…" value={groupQuery} onChange={(e) => setGroupQuery(e.target.value)} />
            </div>
          </div>
          <div className="max-h-64 overflow-auto">
            {loading ? (
              <div className="px-3 py-2">Loading…</div>
            ) : groups.length === 0 ? (
              <div className="px-3 py-2">No groups</div>
            ) : (
              <ul>
                {groupArray.map((g) => {
                  const checked = selectedGroups.has(g.id);
                  return (
                    <li key={g.id} className="flex items-center gap-2 px-3 py-2 border-t border-border">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-accent"
                        checked={checked}
                        onChange={(e) => {
                          const isChecked = (e.currentTarget as HTMLInputElement).checked;
                          setSelectedGroups((prev) => {
                            const next = new Set(prev);
                            if (isChecked) next.add(g.id); else next.delete(g.id);
                            return next;
                          });
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{g.name}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="border border-border rounded-lg">
          <div className="px-3 py-2 border-b border-border font-medium bg-card2">Message</div>
          <div className="p-3">
            <textarea className="textarea mt-1" rows={8} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message…" />
            <div className="flex justify-end mt-2">
              <button className="btn" disabled={sending || (!message.trim()) || (selectedContacts.size===0 && selectedGroups.size===0)} onClick={send}>
                {sending ? "Sending…" : "Send SMS"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
