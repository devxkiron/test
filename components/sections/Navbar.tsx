"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/data";
import { Menu01Icon, Cancel01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { ZenSecondaryButton } from "@/components/ui/ZenButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4">
      <Container>
        <div
          className={cn(
            "flex items-center justify-between px-5 sm:px-6 py-2.5 sm:py-3 r-pill transition-all duration-300",
            scrolled
              ? "glass-nav-cream shadow-md shadow-black/5 dark:shadow-black/30"
              : "bg-canvas/80 dark:bg-canvas-alt/60 backdrop-blur-md border border-line"
          )}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-ink text-canvas flex items-center justify-center font-bold text-sm tracking-tight transition-transform group-hover:scale-105">
              G
            </div>
            <span className="font-extrabold text-base tracking-tight text-ink font-heading">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-ink-muted hover:text-ink transition-colors tracking-tight"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button - Zen Secondary Button */}
          <div className="hidden sm:flex items-center gap-3">
            <ZenSecondaryButton href="#book" className="px-5 py-2 text-xs">
              Book a Call
            </ZenSecondaryButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-ink rounded-full hover:bg-canvas-subtle transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <Cancel01Icon className="w-5 h-5" />
              ) : (
                <Menu01Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 r-lg glass-nav-cream shadow-xl flex flex-col gap-3 animate-in fade-in duration-200">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-ink-muted hover:text-ink hover:bg-canvas-alt r transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-line">
              <ZenSecondaryButton
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-xs"
              >
                Book a Call
              </ZenSecondaryButton>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
