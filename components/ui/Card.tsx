import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  shimmer?: boolean;
}

export function Card({ children, className, hover, shimmer: enableShimmer }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-canvas p-6 transition-all duration-300",
        hover && "cursor-pointer hover:border-line-strong hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_2px_16px_rgba(255,255,255,0.02)]",
        enableShimmer && "shimmer",
        className
      )}
    >
      {children}
    </div>
  );
}
