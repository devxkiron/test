"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      // Triggers morph at 25px scroll
      setScrolled(window.scrollY > 25);

      // Section spy detection
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none select-none transition-all duration-400">
      <div className="relative flex justify-center w-full px-4 sm:px-6">
        
        {/* ─── Seamless Hardware Droop Notch Wrapper (Auto-centers and morphs smoothly) ─── */}
        <div
          className={cn(
            "relative pointer-events-auto flex items-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_16px_35px_rgba(0,0,0,0.7)]",
            // Dynamic width: Generous wide banner at top, compact dynamic island on scroll
            scrolled ? "w-auto max-w-fit" : "w-full max-w-4xl lg:max-w-5xl"
          )}
        >
          
          {/* ── Left Inverted Smooth Concave Ear (Glides smoothly with width) ── */}
          <div className="absolute -left-[19.5px] top-0 w-[20px] h-[20px] pointer-events-none z-10 transition-all duration-400">
            <svg
              className="w-[20px] h-[20px] text-[#F5F0E8]/98 dark:text-[#09140E]/95"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M0 0 H20 V20 C20 9 11 0 0 0 Z"
                fill="currentColor"
              />
              <path
                d="M0 0 C11 0 20 9 20 20"
                stroke="currentColor"
                strokeWidth="1"
                className="text-black/10 dark:text-white/[0.15]"
              />
            </svg>
          </div>

          {/* ── Right Inverted Smooth Concave Ear (Glides smoothly with width) ── */}
          <div className="absolute -right-[19.5px] top-0 w-[20px] h-[20px] pointer-events-none z-10 transition-all duration-400">
            <svg
              className="w-[20px] h-[20px] text-[#F5F0E8]/98 dark:text-[#09140E]/95"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M20 0 H0 V20 C0 9 9 0 20 0 Z"
                fill="currentColor"
              />
              <path
                d="M20 0 C9 0 0 9 0 20"
                stroke="currentColor"
                strokeWidth="1"
                className="text-black/10 dark:text-white/[0.15]"
              />
            </svg>
          </div>

          {/* ── Main Morphing Droop Notch Body (Height & Padding transition dynamically) ── */}
          <div
            className={cn(
              "relative w-full flex items-center justify-between transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
              // ONLY border-b: Left and right are open so ears connect without vertical lines
              "border-b border-black/10 dark:border-white/[0.15]",
              // Pure, seamless frosted liquid glass material
              "bg-[#F5F0E8]/98 dark:bg-[#09140E]/95",
              "backdrop-blur-2xl backdrop-saturate-180",
              // Top and inner specular highlights
              "shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_2px_rgba(0,0,0,0.5)]",
              // ── Dynamic Height, Padding & Curvature ──
              scrolled
                ? [
                    // Compact Island State on Scroll
                    "h-10 sm:h-11 py-1.5 px-3.5 sm:px-5 gap-3 sm:gap-4",
                    "rounded-b-[20px] sm:rounded-b-[22px]",
                  ]
                : [
                    // Spacious Grand State Initially at Top
                    "h-13 sm:h-14 py-2.5 px-5 sm:px-8 gap-5 sm:gap-8",
                    "rounded-b-[24px] sm:rounded-b-[28px]",
                  ]
            )}
          >
            {/* Top Ceiling Prism Light Line */}
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-lime/60 to-transparent pointer-events-none" />

            {/* ─── 1. Brand Logo & Live LED (Smoothly scales between states) ─── */}
            <Link href="/" className="relative z-10 flex items-center gap-2.5 group cursor-pointer shrink-0">
              <div className="relative flex items-center justify-center">
                <div
                  className={cn(
                    "rounded-lg bg-forest/90 dark:bg-[#112017]/90 text-white flex items-center justify-center font-heading font-extrabold border-t border-white/40 border-b border-black/30 shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:scale-105",
                    scrolled ? "w-6.5 h-6.5 text-[11px]" : "w-7.5 h-7.5 sm:w-8 sm:h-8 text-xs sm:text-sm"
                  )}
                >
                  <span className="text-lime drop-shadow-[0_0_6px_rgba(212,255,0,0.6)]">G</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#050c07] p-[1px] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)] flex items-center justify-center border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime shadow-[0_0_8px_#D4FF00] animate-pulse" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-heading font-extrabold tracking-tight text-ink transition-all duration-300 group-hover:text-lime",
                    scrolled ? "text-xs sm:text-sm" : "text-sm sm:text-base"
                  )}
                >
                  {siteConfig.name}
                </span>
                {!scrolled && (
                  <span className="hidden lg:inline-flex px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest rounded bg-black/5 dark:bg-white/10 text-ink-muted/80 border border-black/5 dark:border-white/5 animate-in fade-in duration-300">
                    Studio
                  </span>
                )}
              </div>
            </Link>

            {/* ─── 2. Inset Nav Canal (Smoothly tightens on scroll) ─── */}
            <nav
              className={cn(
                "relative z-10 hidden md:flex items-center rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.4)] transition-all duration-300",
                scrolled ? "gap-0.5 p-0.5" : "gap-1 p-1 px-1.5"
              )}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "relative rounded-full font-mono font-bold tracking-tight transition-all duration-200 cursor-pointer select-none",
                      scrolled
                        ? "px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px]"
                        : "px-3 sm:px-3.5 py-1 sm:py-1.5 text-xs",
                      isActive
                        ? [
                            "bg-white dark:bg-[#142319] text-ink dark:text-lime",
                            "border-t border-white/90 dark:border-white/25 border-b border-black/5 dark:border-black/40",
                            "shadow-[0_2px_6px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),0_0_10px_rgba(212,255,0,0.18)]",
                          ]
                        : "text-ink-muted/80 hover:text-ink dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* ─── 3. Right Controls: Theme Toggle + 3D CTA ─── */}
            <div
              className={cn(
                "relative z-10 hidden sm:flex items-center shrink-0 transition-all duration-300",
                scrolled ? "gap-2" : "gap-3"
              )}
            >
              {/* Theme Toggle Capsule */}
              <div className="p-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.4)]">
                <ThemeToggle
                  className={cn(
                    "rounded-full border-0 bg-transparent text-ink hover:text-lime transition-all duration-300",
                    scrolled ? "h-6.5 w-6.5" : "h-7.5 w-7.5"
                  )}
                />
              </div>

              {/* 3D Bevel CTA Button */}
              <Link
                href="#book"
                className={cn(
                  "group relative inline-flex items-center gap-1.5 rounded-full",
                  "bg-gradient-to-b from-[#E7FF52] to-[#BEE800] text-forest font-mono font-extrabold tracking-tight",
                  "border-t border-white/80 border-b border-[#82a300]",
                  "shadow-[0_3px_0_#89a800,0_6px_14px_rgba(212,255,0,0.35)]",
                  "hover:shadow-[0_2px_0_#89a800,0_4px_10px_rgba(212,255,0,0.45)] hover:translate-y-[1px]",
                  "active:translate-y-[3px] active:shadow-[0_0px_0_#89a800,0_1px_4px_rgba(0,0,0,0.3)]",
                  "transition-all duration-300 cursor-pointer shrink-0",
                  scrolled
                    ? "px-3.5 sm:px-4 py-1 text-[11px]"
                    : "px-4 sm:px-5 py-1.5 sm:py-2 text-xs"
                )}
              >
                <span>Book a Call</span>
                <svg
                  className={cn(
                    "transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    scrolled ? "w-3 h-3" : "w-3.5 h-3.5"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </Link>
            </div>

            {/* ─── 4. Mobile Menu Trigger ─── */}
            <div className="relative z-10 flex sm:hidden items-center gap-1.5">
              <div className="p-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05]">
                <ThemeToggle className="h-6 w-6 rounded-full border-0 bg-transparent" />
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] border border-black/5 dark:border-white/10 cursor-pointer text-ink"
                aria-label="Toggle menu"
              >
                <div className="w-3.5 h-3.5 relative flex flex-col justify-center gap-0.5">
                  <span
                    className={cn(
                      "block h-0.5 w-full bg-current rounded-full transition-all duration-300",
                      mobileMenuOpen ? "rotate-45 translate-y-1" : ""
                    )}
                  />
                  <span
                    className={cn(
                      "block h-0.5 w-full bg-current rounded-full transition-all duration-300",
                      mobileMenuOpen ? "opacity-0" : ""
                    )}
                  />
                  <span
                    className={cn(
                      "block h-0.5 w-full bg-current rounded-full transition-all duration-300",
                      mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ─── 5. Mobile Drawer ─── */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto sm:hidden absolute top-14 left-4 right-4 p-4 rounded-2xl bg-[#F5F0E8]/98 dark:bg-[#09140E]/98 backdrop-blur-3xl border border-black/10 dark:border-white/[0.12] shadow-[0_20px_45px_rgba(0,0,0,0.25)] flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-mono font-bold text-ink-muted hover:text-ink hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-ink-muted/50">↗</span>
                </a>
              ))}
            </nav>

            <div className="pt-2 border-t border-black/10 dark:border-white/10">
              <Link
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 rounded-xl bg-gradient-to-b from-[#E7FF52] to-[#BEE800] text-forest font-mono font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Book a Call</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
