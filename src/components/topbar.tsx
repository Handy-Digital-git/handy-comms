"use client";

import { Bell, CalendarDays, Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";

export function Topbar() {
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
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-3 px-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            placeholder="Start searching here..."
            className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2 text-sm outline-none placeholder:text-muted"
          />
        </div>
        <ThemeToggle />
        <button aria-label="Notifications" className="h-9 w-9 rounded-md border border-border bg-card hover:bg-card2 grid place-items-center">
          <Bell className="h-4 w-4 text-text" />
        </button>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted border-l border-border pl-3">
          <CalendarDays className="h-4 w-4" />
          <span suppressHydrationWarning>{dateStr}</span>
        </div>
        <div className="ml-2 h-9 w-9 rounded-full bg-card2" />
      </div>
    </header>
  );
}
