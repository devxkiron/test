"use client";

import { useState } from "react";
import {
  Mail01Icon,
  Location01Icon,
  Clock01Icon,
  ArrowRight01Icon,
  Calendar01Icon,
  CodeSquareIcon,
  CheckmarkCircle01Icon,
  Shield01Icon,
  GithubIcon,
  NewTwitterIcon,
  Linkedin02Icon
} from "hugeicons-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AuditModal } from "@/components/ui/AuditModal";
import { siteConfig, navLinks } from "@/lib/data";

export function ContactFooter() {
  const [auditOpen, setAuditOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <>
      {/* CTA Banner */}
      <section className="py-24 bg-canvas-alt/40 border-b border-line">
        <Container>
          <div className="relative rounded-lg border border-line bg-canvas p-8 sm:p-12 text-center overflow-hidden shimmer">
            <div className="relative max-w-2xl mx-auto">
              <Badge variant="accent" dot pulse size="md" className="mb-4">
                Now Scheduling Q3/Q4 Production Cohorts
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-4">
                Ready to lift the heavy work?
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-8">
                Book a 30-minute technical architecture review. We analyze your bottlenecks and return a prioritized implementation roadmap with zero obligation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" onClick={() => setAuditOpen(true)} className="shimmer">
                  <Calendar01Icon size={16} className="mr-1.5 text-accent-light" />
                  Request Free Technical Audit
                </Button>
                <Button size="lg" variant="outline" asChild className="shimmer">
                  <a href={`mailto:${siteConfig.email}`}>
                    <Mail01Icon size={16} className="mr-1.5 text-ink-muted" />
                    {siteConfig.email}
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-ink-muted">
                <div className="flex items-center gap-1.5">
                  <Clock01Icon size={14} className="text-accent" />
                  <span>Response time {siteConfig.responseTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Location01Icon size={14} className="text-gold" />
                  <span>{siteConfig.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield01Icon size={14} className="text-success" />
                  <span>Direct Principal Access</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-canvas">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 border-b border-line">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-canvas-alt text-ink">
                  <CodeSquareIcon size={16} className="text-accent" />
                </div>
                <span className="font-semibold text-ink">{siteConfig.name}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-sm mb-5">
                Intelligent automation systems, resilient backend infrastructure, and high-velocity web platforms for ambitious SMBs.
              </p>

              {/* Newsletter */}
              {!submitted ? (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Engineering insights & templates"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-md border border-line bg-canvas-alt px-3 py-2 text-xs text-ink placeholder:text-ink-ghost focus:outline-none focus:border-accent transition-colors"
                  />
                  <Button size="sm" type="submit" className="shimmer">
                    <ArrowRight01Icon size={14} />
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-xs text-success">
                  <CheckmarkCircle01Icon size={16} />
                  <span>Subscribed to engineering changelog.</span>
                </div>
              )}
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-mono font-semibold text-ink uppercase tracking-wider mb-4">Index</h4>
              <ul className="space-y-2 text-xs">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-ink-muted hover:text-ink transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-mono font-semibold text-ink uppercase tracking-wider mb-4">Channels</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors"
                  >
                    <Mail01Icon size={14} />
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-2 pt-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded border border-line bg-canvas-alt text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={14} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded border border-line bg-canvas-alt text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
                    aria-label="Twitter / X"
                  >
                    <NewTwitterIcon size={14} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded border border-line bg-canvas-alt text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin02Icon size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs text-ink-muted">
            <p className="font-mono">
              © {new Date().getFullYear()} {siteConfig.name}. Senior Technical Agency.
            </p>
            <p className="font-mono text-ink-ghost">
              Engineered with Next.js 16 · Tailwind CSS · React 19
            </p>
          </div>
        </Container>
      </footer>

      <AuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
