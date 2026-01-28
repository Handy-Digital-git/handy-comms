"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { createClient } from "@/lib/supabase/client";

export function ProtectedShell({
  children,
  signOutAction,
}: {
  children: React.ReactNode;
  signOutAction?: (formData: FormData) => void | Promise<void>;
}) {
  const [collapsed, setCollapsed] = useState(false);

  // Realtime: dispatch notifications on new tickets
  useEffect(() => {
    const supa = createClient();
    const channel = supa
      .channel("public:contact_requests")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "contact_requests" }, (payload) => {
        try {
          fetch("/api/notifications/dispatch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ticket: payload.new }),
          });
        } catch {}
      })
      .subscribe();
    return () => {
      supa.removeChannel(channel);
    };
  }, []);

  return (
    <div className="grid min-h-screen bg-bg" style={{ gridTemplateColumns: "auto 1fr" }}>
      <Sidebar signOutAction={signOutAction} collapsed={collapsed} />
      <div className="flex min-w-0 flex-col">
        <Topbar signOutAction={signOutAction} onToggleSidebarAction={() => setCollapsed((v) => !v)} collapsed={collapsed} />
        <main className="w-full px-5 py-6">{children}</main>
      </div>
    </div>
  );
}
