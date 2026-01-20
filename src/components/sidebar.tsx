"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TicketCheck,
  Settings,
  LogOut,
  LifeBuoy,
} from "lucide-react";
import { useState } from "react";

const nav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tickets", href: "/tickets", icon: TicketCheck },
  { name: "Admin", href: "/admin", icon: Settings },
];

export function Sidebar({
  signOutAction,
}: {
  signOutAction?: (formData: FormData) => void | Promise<void>;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen sticky top-0 border-r border-border bg-card ${
        collapsed ? "w-[84px]" : "w-64"
      } transition-[width] duration-300`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-icon-bg text-icon-fg font-semibold">HC</span>
          {!collapsed && <span className="font-semibold">Handy Comms</span>}
        </Link>
        <button
          className="rounded-md p-2 hover:bg-card2"
          aria-label="Collapse"
          onClick={() => setCollapsed((c) => !c)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <nav className="px-2 py-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-card2 ${
                active ? "bg-card2" : ""
              }`}
            >
              <Icon className="h-5 w-5 text-muted" />
              {!collapsed && <span className="text-text">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-3 py-3 text-xs text-muted">
        <div className="card p-3">
          {!collapsed && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-md bg-card2 flex items-center justify-center">
                <LifeBuoy className="h-4 w-4 text-muted" />
              </div>
              <div>
                <div className="text-sm font-medium text-text">Need help?</div>
                <div className="text-muted">We’re here for you</div>
              </div>
            </div>
          )}
        </div>
        <form action={signOutAction} className="mt-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-card2" type="submit">
            <LogOut className="h-5 w-5 text-muted" />
            {!collapsed && <span>Log out</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
