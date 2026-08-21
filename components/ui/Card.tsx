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
        "rounded-xs border border-line bg-canvas p-6 transition-all duration-200",
        hover && "cursor-pointer hover:border-line-strong hover:shadow-xs",
        enableShimmer && "shimmer",
        className
      )}
    >
      {children}
    </div>
  );
}
