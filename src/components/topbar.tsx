"use client";

import { CalendarDays, Search, LogOut, Settings } from "lucide-react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Topbar({
  signOutAction,
  onToggleSidebarAction,
  collapsed,
}: {
  signOutAction?: (formData: FormData) => void | Promise<void>;
  onToggleSidebarAction?: () => void;
  collapsed?: boolean;
}) {
  // Avoid hydration mismatch by computing date only on client
  const [dateStr, setDateStr] = useState<string>("");
  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }, []);
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg backdrop-blur">
      <div className="mx-auto flex h-16 items-center gap-3 px-4">
        <button
          aria-label="Toggle sidebar"
          onClick={onToggleSidebarAction}
          className="group relative grid h-9 w-9 place-items-center rounded-md border border-border bg-card hover:bg-card2"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4 text-accent" />
          ) : (
            <PanelLeftClose className="h-4 w-4 text-accent" />
          )}
          <span
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-text opacity-0 shadow transition-all duration-150 group-hover:opacity-100"
          >
            {collapsed ? "Expand sidebar" : "Collapse sidebar"}
          </span>
          <span className="pointer-events-none absolute left-1/2 top-full mt-[0.4rem] -translate-x-1/2 h-3 w-3 rotate-45 bg-card border-l border-t border-border opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
        </button>
        <div className="flex-1" />
        <ThemeToggle withTooltip tooltip="Toggle theme" />
        <Link href="/settings" aria-label="Settings" className="group relative grid h-9 w-9 place-items-center rounded-md border border-border bg-card hover:bg-card2" title="Settings">
          <Settings className="h-4 w-4 text-accent" />
          <span role="tooltip" className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-text opacity-0 shadow transition-all duration-150 group-hover:opacity-100">Settings</span>
          <span className="pointer-events-none absolute left-1/2 top-full mt-[0.4rem] -translate-x-1/2 h-3 w-3 rotate-45 bg-card border-l border-t border-border opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
        </Link>
        <div className="group relative hidden md:flex items-center gap-2 text-sm text-muted border-l border-border pl-3" title="Current date">
          <CalendarDays className="h-4 w-4 text-accent" />
          <span suppressHydrationWarning>{dateStr}</span>
          <span role="tooltip" className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-text opacity-0 shadow transition-all duration-150 group-hover:opacity-100">Current date</span>
          <span className="pointer-events-none absolute left-1/2 top-full mt-[0.4rem] -translate-x-1/2 h-3 w-3 rotate-45 bg-card border-l border-t border-border opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
        </div>
        <form action={signOutAction} className="ml-1">
          <button
            aria-label="Log out"
            type="submit"
            className="group relative grid h-9 w-9 place-items-center rounded-md border border-border bg-card hover:bg-card2"
            title="Log out"
          >
            <LogOut className="h-4 w-4 text-accent" />
            <span role="tooltip" className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-text opacity-0 shadow transition-all duration-150 group-hover:opacity-100">Log out</span>
            <span className="pointer-events-none absolute left-1/2 top-full mt-[0.4rem] -translate-x-1/2 h-3 w-3 rotate-45 bg-card border-l border-t border-border opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          </button>
        </form>
      </div>
    </header>
  );
}
