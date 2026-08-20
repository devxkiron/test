import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "success" | "gold" | "rose" | "warm" | "outline";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
  pulse?: boolean;
}

const variantClasses: Record<string, string> = {
  default:
    "bg-canvas-alt text-ink-muted border-line",
  accent:
    "bg-accent-bg text-accent-dark border-accent-light",
  success:
    "bg-success-bg text-success-dark border-success-light",
  gold:
    "bg-gold-bg text-gold-dark border-gold-light",
  rose:
    "bg-rose-bg text-rose-dark border-rose-light",
  warm:
    "bg-warm-bg text-warm-dark border-warm-light",
  outline:
    "bg-transparent text-ink-muted border-line",
};

const dotColors: Record<string, string> = {
  default: "bg-ink-faint",
  accent: "bg-accent",
  success: "bg-success",
  gold: "bg-gold",
  rose: "bg-rose",
  warm: "bg-warm",
  outline: "bg-ink-faint",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
  dot,
  pulse,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border font-medium tracking-normal",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        variantClasses[variant],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {pulse && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                dotColors[variant]
              )}
            />
          )}
          <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", dotColors[variant])} />
        </span>
      )}
      {children}
    </span>
  );
}
