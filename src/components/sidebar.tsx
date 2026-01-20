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

const nav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tickets", href: "/tickets", icon: TicketCheck },
  { name: "Admin", href: "/admin", icon: Settings },
];

export function Sidebar({
  signOutAction,
  collapsed = false,
}: {
  signOutAction?: (formData: FormData) => void | Promise<void>;
  collapsed?: boolean;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`h-screen sticky top-0 border-r border-border bg-card ${
        collapsed ? "w-21" : "w-64"
      } transition-[width] duration-300`}
    >
      <div className={`flex h-16 items-center px-4 ${collapsed ? "justify-center" : "justify-start"}`}>
        <Link href="/dashboard" className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-icon-bg text-icon-fg font-semibold">HC</span>
          {!collapsed && <span className="font-semibold">Handy Comms</span>}
        </Link>
      </div>

      <nav className="px-2 py-2 mt-2 space-y-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.name}
              className={`group relative flex w-full items-center gap-3 rounded-lg py-2 text-sm transition-colors hover:bg-card2 ${collapsed ? "justify-center px-0" : "px-3"} ${active ? "bg-card2" : ""}`}
            >
              <Icon className="h-5 w-5 text-accent" />
              {!collapsed && <span className="text-text">{item.name}</span>}
              {collapsed && (
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-full top-1/2 z-10 -translate-y-1/2 translate-x-1 opacity-0 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-text shadow transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-2 ml-2"
                >
                  {item.name}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1.5 h-3 w-3 rotate-45 bg-card border-l border-t border-border" />
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
