"use client";

import { useEffect, useMemo, useState } from "react";

type Contact = { id: string; name: string; phone: string; email: string | null };
export type Group = { id: string; name: string; description: string | null };

export default function GroupManager() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [members, setMembers] = useState<Contact[]>([]);
  const [groupQuery, setGroupQuery] = useState("");
  const [memberQuery, setMemberQuery] = useState("");
  const [addQuery, setAddQuery] = useState("");
  const [selectedToAdd, setSelectedToAdd] = useState<Set<string>>(new Set());
  const [adding, setAdding] = useState(false);

  async function loadAll() {
    setLoading(true);
    const [gRes, cRes] = await Promise.all([
      fetch("/api/groups").then((r) => r.json()),
      fetch("/api/contacts").then((r) => r.json()),
    ]);
    setGroups(gRes.groups ?? []);
    setContacts(cRes.contacts ?? []);
    setLoading(false);
  }

  useEffect(() => { loadAll(); }, []);

  useEffect(() => {
    // Clear any pending add selections when switching groups
    setSelectedToAdd(new Set());
    if (!selectedGroup) { setMembers([]); return; }
    (async () => {
      const res = await fetch(`/api/groups/${selectedGroup}/members`);
      const j = await res.json();
      setMembers(j.members ?? []);
    })();
  }, [selectedGroup]);

  const nonMembersBase = useMemo(() => {
    const memberIds = new Set(members.map((m) => m.id));
    return contacts.filter((c) => !memberIds.has(c.id));
  }, [contacts, members]);

  const filteredGroups = useMemo(() => {
    const q = groupQuery.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) => g.name.toLowerCase().includes(q) || (g.description ?? "").toLowerCase().includes(q));
  }, [groups, groupQuery]);

  const filteredMembers = useMemo(() => {
    const q = memberQuery.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      (m.phone ?? "").toLowerCase().includes(q) ||
      (m.email ?? "").toLowerCase().includes(q)
    );
  }, [members, memberQuery]);

  const nonMembers = useMemo(() => nonMembersBase, [nonMembersBase]);
  const filteredNonMembers = useMemo(() => {
    const q = addQuery.trim().toLowerCase();
    if (!q) return nonMembers;
    return nonMembers.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.phone ?? "").toLowerCase().includes(q) ||
      (c.email ?? "").toLowerCase().includes(q)
    );
  }, [nonMembers, addQuery]);

  async function addSelectedMembers() {
    if (!selectedGroup || selectedToAdd.size === 0) return;
    setAdding(true);
    try {
      const ids = Array.from(selectedToAdd);
      for (const cid of ids) {
        const res = await fetch(`/api/groups/${selectedGroup}/members`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contactId: cid }),
        });
        if (!res.ok) throw new Error((await res.json()).error || "Failed to add member");
      }
      // Refresh members and clear selection
      const r = await fetch(`/api/groups/${selectedGroup}/members`).then((x) => x.json());
      setMembers(r.members ?? []);
      setSelectedToAdd(new Set());
    } catch (e: any) {
      alert(e?.message ?? "Failed to add selected members");
    } finally {
      setAdding(false);
    }
  }

  async function createGroup() {
    const res = await fetch("/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: description || null }),
    });
    if (!res.ok) return alert((await res.json()).error || "Failed");
    setName(""); setDescription("");
    await loadAll();
  }

  async function deleteGroup(id: string) {
    if (!confirm("Delete this group?")) return;
    const res = await fetch(`/api/groups/${id}`, { method: "DELETE" });
    if (!res.ok) alert("Failed");
    else {
      if (selectedGroup === id) setSelectedGroup(null);
      await loadAll();
    }
  }

  async function addMember(contactId: string) {
    if (!selectedGroup) return;
    const res = await fetch(`/api/groups/${selectedGroup}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId }),
    });
    if (!res.ok) return alert("Failed");
    setMembers((prev) => [...prev, contacts.find((c) => c.id === contactId)!]);
  }

  async function removeMember(contactId: string) {
    if (!selectedGroup) return;
    const res = await fetch(`/api/groups/${selectedGroup}/members`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId }),
    });
    if (!res.ok) return alert("Failed");
    setMembers((prev) => prev.filter((m) => m.id !== contactId));
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Groups</h2>
        <p className="text-muted text-sm">Create groups, add or remove members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
        <div>
          <label className="text-sm text-muted">Group Name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="VIP Clients" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-muted">Description (optional)</label>
          <input className="input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Weekly updates group" />
        </div>
        <div>
          <button className="btn w-full" disabled={!name} onClick={createGroup}>Create Group</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg max-h-64 overflow-auto">
          <div className="px-3 py-2 border-b border-border font-medium bg-card2 sticky top-0 z-10">
            <div>All Groups</div>
            <div className="mt-2"><input className="input" placeholder="Search groups…" value={groupQuery} onChange={(e) => setGroupQuery(e.target.value)} /></div>
          </div>
          <ul>
            {loading ? (<li className="px-3 py-2">Loading…</li>) : filteredGroups.length === 0 ? (
              <li className="px-3 py-2">No groups yet.</li>
            ) : filteredGroups.map((g) => {
              const selected = selectedGroup === g.id;
              return (
                <li
                  key={g.id}
                  className={`flex items-center justify-between gap-2 px-3 py-2 border-t transition-colors hover:bg-card2 ${selected ? "text-accent" : "text-text"}`}
                  style={selected ? { backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)", borderColor: "color-mix(in srgb, var(--accent) 45%, var(--border))" } : { borderColor: "var(--border)" }}
                >
                  <button className="text-left flex-1 cursor-pointer hover:text-accent" onClick={() => setSelectedGroup((prev) => (prev === g.id ? null : g.id))}>
                    <div className="font-medium">{g.name}</div>
                    <div className="text-xs text-muted truncate">{g.description ?? ""}</div>
                  </button>
                  <button className="btn-ghost text-rose-600" onClick={() => deleteGroup(g.id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border border-border rounded-lg max-h-64 overflow-auto">
          <div className="px-3 py-2 border-b border-border font-medium bg-card2 sticky top-0 z-10">
            <div>Members</div>
            <div className="mt-2"><input className="input" placeholder="Search members…" value={memberQuery} onChange={(e) => setMemberQuery(e.target.value)} /></div>
          </div>
          <ul>
            {!selectedGroup ? (
              <li className="px-3 py-2">Select a group</li>
            ) : filteredMembers.length === 0 ? (
              <li className="px-3 py-2">No members</li>
            ) : (
              filteredMembers.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-2 px-3 py-2 border-t border-border">
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-xs text-muted">{m.phone} {m.email ? `· ${m.email}`: ""}</div>
                  </div>
                  <button className="btn-ghost text-rose-600" onClick={() => removeMember(m.id)}>Remove</button>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="border border-border rounded-lg max-h-64 overflow-auto">
          <div className="px-3 py-2 border-b border-border font-medium bg-card2 sticky top-0 z-10">
            <div className="flex items-center justify-between gap-2">
              <span>Add Members</span>
              <button className="btn-ghost" disabled={!selectedGroup || selectedToAdd.size===0 || adding} onClick={addSelectedMembers}>
                {adding ? "Adding…" : `Add Selected (${selectedToAdd.size})`}
              </button>
            </div>
            <div className="mt-2"><input className="input" placeholder="Search contacts to add…" value={addQuery} onChange={(e) => setAddQuery(e.target.value)} /></div>
          </div>
          <ul>
            {!selectedGroup ? (
              <li className="px-3 py-2">Select a group</li>
            ) : filteredNonMembers.length === 0 ? (
              <li className="px-3 py-2">No available contacts</li>
            ) : (
              filteredNonMembers.map((c) => {
                const checked = selectedToAdd.has(c.id);
                return (
                  <li key={c.id} className="flex items-center justify-between gap-2 px-3 py-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-accent"
                        checked={checked}
                        onChange={(e) => {
                          const isChecked = (e.currentTarget as HTMLInputElement).checked;
                          setSelectedToAdd((prev) => {
                            const next = new Set(prev);
                            if (isChecked) next.add(c.id); else next.delete(c.id);
                            return next;
                          });
                        }}
                      />
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted">{c.phone} {c.email ? `· ${c.email}`: ""}</div>
                      </div>
                    </div>
                    <button className="btn-ghost text-accent" onClick={() => addMember(c.id)}>Add</button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
