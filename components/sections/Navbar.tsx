"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu01Icon, Cancel01Icon, Calendar01Icon, CodeSquareIcon } from "hugeicons-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Badge } from "@/components/ui/Badge";
import { AuditModal } from "@/components/ui/AuditModal";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { navLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-line bg-canvas/90 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-canvas-alt text-ink transition-all group-hover:border-line-strong group-hover:bg-canvas-subtle">
                <CodeSquareIcon size={16} className="text-accent" />
              </div>
              <span className="font-semibold text-ink tracking-tight">
                {siteConfig.name}
              </span>
              <Badge variant="accent" size="sm" dot pulse className="hidden sm:inline-flex">
                Available for Q3/Q4
              </Badge>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-ink-muted hover:text-ink transition-colors rounded-md hover:bg-canvas-alt"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden md:block w-px h-5 bg-line" />
              <MagneticElement className="hidden md:inline-flex">
                <Button
                  size="sm"
                  onClick={() => setAuditOpen(true)}
                  className="shimmer"
                >
                  <Calendar01Icon size={14} className="mr-1 text-accent-light" />
                  Book Audit
                </Button>
              </MagneticElement>
              <button
                className="md:hidden rounded-md p-2 text-ink-muted hover:text-ink hover:bg-canvas-alt transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <Cancel01Icon size={18} /> : <Menu01Icon size={18} />}
              </button>
            </div>
          </nav>
        </Container>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden border-t border-line bg-canvas overflow-hidden transition-all duration-200",
            mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <Container>
            <div className="flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-ink-muted hover:text-ink hover:bg-canvas-alt rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <Button size="sm" className="w-full shimmer" onClick={() => { setMobileOpen(false); setAuditOpen(true); }}>
                  Book Free Audit
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <AuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
