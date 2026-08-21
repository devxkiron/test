"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className }: GridBackgroundProps) {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      el.style.setProperty("--mouse-x", `${e.clientX}px`);
      el.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} aria-hidden="true">
      {/* SVG grid with calibrated light mode and dark mode visibility */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="0.75"
              className="opacity-35 dark:opacity-15"
            />
            <circle
              cx="0"
              cy="0"
              r="1.0"
              className="fill-accent opacity-45 dark:opacity-20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Mouse-tracking spotlight */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(80,114,147,0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
