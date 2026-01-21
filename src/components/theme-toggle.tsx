"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({
  className = "",
  withTooltip = false,
  tooltip = "Toggle theme",
}: {
  className?: string;
  withTooltip?: boolean;
  tooltip?: string;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = (theme ?? resolvedTheme) === "dark";

  return (
    <button
      aria-label="Toggle theme"
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card hover:bg-card2 ${className}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={tooltip}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-accent" />
      ) : (
        <Moon className="h-4 w-4 text-accent" />
      )}
      {withTooltip && (
        <>
          <span
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-text opacity-0 shadow transition-all duration-150 group-hover:opacity-100"
          >
            {tooltip}
          </span>
          <span className="pointer-events-none absolute left-1/2 top-full mt-[0.4rem] -translate-x-1/2 h-3 w-3 rotate-45 bg-card border-l border-t border-border opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
        </>
      )}
    </button>
  );
}
