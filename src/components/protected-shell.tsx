"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function ProtectedShell({
  children,
  signOutAction,
}: {
  children: React.ReactNode;
  signOutAction?: (formData: FormData) => void | Promise<void>;
}) {
  const [collapsed, setCollapsed] = useState(false);

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
