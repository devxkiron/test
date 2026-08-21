import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonBaseProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "ink" | "lime";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

/**
 * ZenPrimaryButton:
 * Expands fill from center (top-1/2 -> top-0) and slides right arrow in.
 */
export function ZenPrimaryButton({
  children,
  href,
  onClick,
  className,
  variant = "ink",
  type = "button",
  disabled,
}: ButtonBaseProps) {
  const isLime = variant === "lime";

  const baseClasses = cn(
    "relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden text-xs sm:text-sm font-bold r-pill group transition-colors duration-400 cursor-pointer select-none shadow-xs",
    isLime
      ? "text-lime border-2 border-lime hover:text-black"
      : "text-ink border-2 border-ink hover:text-canvas",
    className
  );

  const innerContent = (
    <>
      <span
        className={cn(
          "absolute left-0 block w-full h-0 transition-all opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease",
          isLime ? "bg-lime" : "bg-ink"
        )}
      />
      <span className="absolute right-0 flex items-center justify-start w-8 h-8 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>
      <span className="relative group-hover:pr-4 transition-all duration-400 flex items-center gap-1.5">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {innerContent}
    </button>
  );
}

/**
 * ZenSecondaryButton:
 * Slide text out to right, slide arrow + background in from left.
 */
export function ZenSecondaryButton({
  children,
  href,
  onClick,
  className,
  variant = "ink",
  type = "button",
  disabled,
}: ButtonBaseProps) {
  const isLime = variant === "lime";

  const baseClasses = cn(
    "relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden text-xs sm:text-sm font-semibold transition duration-300 ease-out border-2 r-pill shadow-xs group cursor-pointer select-none",
    isLime ? "border-lime text-lime" : "border-ink text-ink",
    className
  );

  const innerContent = (
    <>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full group-hover:translate-x-0 ease",
          isLime ? "bg-lime text-black" : "bg-ink text-canvas"
        )}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>
      <span
        className={cn(
          "absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease",
          isLime ? "text-lime" : "text-ink"
        )}
      >
        {children}
      </span>
      <span className="relative invisible px-1">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {innerContent}
    </button>
  );
}
