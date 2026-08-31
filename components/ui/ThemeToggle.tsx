"use client";

import { SunIcon, MoonIcon } from "@/components/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("h-9 w-9 rounded-md border border-line", className)} />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-canvas text-ink-faint transition-all duration-200 hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <SunIcon
        size={16}
        className={cn(
          "absolute transition-all duration-300",
          isDark ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"
        )}
      />
      <MoonIcon
        size={16}
        className={cn(
          "absolute transition-all duration-300",
          isDark ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"
        )}
      />
    </button>
  );
}
