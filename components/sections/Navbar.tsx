"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home01Icon, 
  CpuIcon,
  Layers01Icon,
  WorkflowSquare01Icon, 
  Activity01Icon,
  CheckmarkCircle01Icon,
  Calculator01Icon, 
  Maximize01Icon, 
  Menu01Icon, 
  Cancel01Icon,
  Sun01Icon,
  Moon02Icon
} from "hugeicons-react";
import { useTheme } from "next-themes";
import { AuditModal } from "@/components/ui/AuditModal";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [auditOpen, setAuditOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <>
      {/* Vengence UI: Continuous Seamless Notch Navbar with Liquid Glass Effect */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
        {/* Continuous Single-Shape Silhouette Background Ribbon */}
        <div className="w-full flex items-start pointer-events-auto">
          {/* 1. Left Shallow Bar */}
          <div
            className="flex-1 h-[20px] border-b border-line transition-colors duration-200"
            style={{ backgroundColor: "var(--canvas-glass)" }}
          />

          {/* 2. Left S-Curve Smooth Transition */}
          <svg
            width="40"
            height="56"
            viewBox="0 0 40 56"
            fill="none"
            className="shrink-0 -mr-[0.5px]"
          >
            {/* Seamless Liquid Glass Fill */}
            <path
              d="M 0 0 L 40 0 L 40 56 C 20 56, 20 20, 0 20 Z"
              style={{ fill: "var(--canvas-glass)" }}
            />
            {/* Smooth 1px Continuous Bottom Stroke */}
            <path
              d="M 0 20 C 20 20, 20 56, 40 56"
              style={{ stroke: "var(--line)" }}
              strokeWidth="1"
            />
          </svg>

          {/* 3. Center Notch Content Island */}
          <nav
            className="relative flex items-center h-[56px] px-3 sm:px-6 gap-3 sm:gap-4 lg:gap-5 border-b border-line text-ink transition-colors duration-200 shrink-0"
            style={{ backgroundColor: "var(--canvas-glass)" }}
          >
            {/* Specular Liquid Top Light Highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />

            {/* Desktop Nav Items - Left Group */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-ink-muted">
              <Link
                href="#services"
                className="flex items-center gap-1.5 hover:text-ink transition-colors"
              >
                <CpuIcon size={14} className="text-accent" />
                <span>Services</span>
              </Link>
              <Link
                href="#capabilities"
                className="flex items-center gap-1.5 hover:text-ink transition-colors"
              >
                <Layers01Icon size={14} className="text-accent" />
                <span>Capabilities</span>
              </Link>
              <Link
                href="#pipeline"
                className="flex items-center gap-1.5 hover:text-ink transition-colors"
              >
                <WorkflowSquare01Icon size={14} className="text-accent" />
                <span>Pipeline</span>
              </Link>
            </div>

            {/* Center Monogram Logo */}
            <Link href="/" className="flex items-center justify-center group px-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-xs bg-canvas-alt/80 border border-line group-hover:border-accent transition-all shadow-xs">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-accent"
                >
                  <path
                    d="M 3 5 L 12 21 L 21 5 L 15 5 L 12 11 L 9 5 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Link>

            {/* Desktop Nav Items - Right Group */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-ink-muted">
              <Link
                href="#showcase"
                className="flex items-center gap-1.5 hover:text-ink transition-colors"
              >
                <Activity01Icon size={14} className="text-accent" />
                <span>Showcase</span>
              </Link>
              <Link
                href="#work"
                className="flex items-center gap-1.5 hover:text-ink transition-colors"
              >
                <CheckmarkCircle01Icon size={14} className="text-success" />
                <span>Outcomes</span>
              </Link>
              <Link
                href="#calculator"
                className="flex items-center gap-1.5 hover:text-ink transition-colors"
              >
                <Calculator01Icon size={14} className="text-gold" />
                <span>ROI Model</span>
              </Link>
            </div>

            {/* Subtle Vertical Divider */}
            <div className="hidden sm:block h-4 w-px bg-line/80" />

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="text-ink-muted hover:text-ink p-1 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
              title="Toggle Light / Dark Mode"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun01Icon size={15} />
              ) : (
                <Moon02Icon size={15} />
              )}
            </button>

            {/* Free Audit Quick Link */}
            <button
              type="button"
              onClick={() => setAuditOpen(true)}
              className="hidden sm:inline-block text-xs font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
            >
              Free Audit
            </button>

            {/* Book Audit Pill Button */}
            <button
              type="button"
              onClick={() => setAuditOpen(true)}
              className="rounded-full bg-ink text-canvas font-semibold text-xs px-4 py-1.5 shadow-xs hover:opacity-90 transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              Book Audit
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-ink-muted hover:text-ink p-1 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <Cancel01Icon size={16} /> : <Menu01Icon size={16} />}
            </button>
          </nav>

          {/* 4. Right S-Curve Smooth Transition */}
          <svg
            width="40"
            height="56"
            viewBox="0 0 40 56"
            fill="none"
            className="shrink-0 -ml-[0.5px]"
          >
            {/* Seamless Liquid Glass Fill */}
            <path
              d="M 0 0 L 40 0 L 40 20 C 20 20, 20 56, 0 56 Z"
              style={{ fill: "var(--canvas-glass)" }}
            />
            {/* Smooth 1px Continuous Bottom Stroke */}
            <path
              d="M 0 56 C 20 56, 20 20, 40 20"
              style={{ stroke: "var(--line)" }}
              strokeWidth="1"
            />
          </svg>

          {/* 5. Right Shallow Bar */}
          <div
            className="flex-1 h-[20px] border-b border-line flex items-center justify-end pr-4 transition-colors duration-200"
            style={{ backgroundColor: "var(--canvas-glass)" }}
          >
            {/* Far Right Fullscreen Toggle */}
            <button
              type="button"
              onClick={toggleFullScreen}
              className="text-ink-ghost hover:text-ink transition-colors cursor-pointer -mt-1"
              aria-label="Toggle Fullscreen"
              title="Toggle Fullscreen"
            >
              <Maximize01Icon size={13} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileOpen && (
          <div className="pointer-events-auto max-w-sm w-full mx-auto mt-2 bg-canvas/90 backdrop-blur-xl border border-line rounded-xs p-4 shadow-xl text-ink font-mono text-xs z-50">
            <div className="flex flex-col gap-2">
              <Link
                href="#services"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-1.5 px-2 hover:bg-canvas-alt rounded-xs transition-colors"
              >
                <CpuIcon size={14} className="text-accent" /> <span>Services</span>
              </Link>
              <Link
                href="#capabilities"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-1.5 px-2 hover:bg-canvas-alt rounded-xs transition-colors"
              >
                <Layers01Icon size={14} className="text-accent" /> <span>Capabilities</span>
              </Link>
              <Link
                href="#pipeline"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-1.5 px-2 hover:bg-canvas-alt rounded-xs transition-colors"
              >
                <WorkflowSquare01Icon size={14} className="text-accent" /> <span>Pipeline</span>
              </Link>
              <Link
                href="#showcase"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-1.5 px-2 hover:bg-canvas-alt rounded-xs transition-colors"
              >
                <Activity01Icon size={14} className="text-accent" /> <span>Showcase</span>
              </Link>
              <Link
                href="#work"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-1.5 px-2 hover:bg-canvas-alt rounded-xs transition-colors"
              >
                <CheckmarkCircle01Icon size={14} className="text-success" /> <span>Outcomes</span>
              </Link>
              <Link
                href="#calculator"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-1.5 px-2 hover:bg-canvas-alt rounded-xs transition-colors"
              >
                <Calculator01Icon size={14} className="text-gold" /> <span>ROI Model</span>
              </Link>
              <div className="pt-2 border-t border-line">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setAuditOpen(true);
                  }}
                  className="w-full rounded-full bg-ink text-canvas font-semibold text-xs py-2 shadow-sm hover:opacity-90 transition-all cursor-pointer"
                >
                  Book Free Audit
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
