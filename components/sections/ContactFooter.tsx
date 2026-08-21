"use client";

import { useState, useEffect } from "react";
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
  Linkedin02Icon,
  Activity01Icon
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
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <>
      {/* CTA Banner with Subtle Grid */}
      <section className="relative py-24 bg-canvas-alt/40 border-b border-line overflow-hidden select-none">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--line-strong)_1px,transparent_1px),linear-gradient(to_bottom,var(--line-strong)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-22 dark:opacity-10 pointer-events-none" />

        <Container className="relative z-10">
          <div className="relative rounded-xs border border-line bg-canvas p-8 sm:p-12 text-center overflow-hidden shadow-xs">
            <div className="relative max-w-2xl mx-auto">
              <Badge variant="accent" dot pulse size="md" className="mb-4">
                Now Scheduling Q3/Q4 Production Cohorts
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-4">
                Ready to lift the heavy work?
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-8">
                Book a 30-minute technical architecture review. We evaluate your manual bottlenecks and return a prioritized implementation roadmap with zero obligation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={() => setAuditOpen(true)}
                  className="rounded-xs text-xs font-mono w-full sm:w-auto"
                >
                  <Calendar01Icon size={16} className="mr-1.5 text-accent-light" />
                  Request Free Technical Audit
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-xs text-xs font-mono w-full sm:w-auto"
                >
                  <a href={`mailto:${siteConfig.email}`}>
                    <Mail01Icon size={16} className="mr-1.5 text-ink-muted" />
                    {siteConfig.email}
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-ink-muted">
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

      {/* Vengence UI: Animated Footer */}
      <footer className="relative bg-canvas overflow-hidden border-t border-line">
        {/* Animated ambient pulse grid layer */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-10 pointer-events-none" />

        <Container className="relative z-10">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-14 border-b border-line">
            {/* Brand & Mission Column */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xs border border-line bg-canvas-alt text-ink">
                  <CodeSquareIcon size={16} className="text-accent" />
                </div>
                <span className="font-bold text-ink text-base tracking-tight">{siteConfig.name}</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-sm mb-6">
                Intelligent automation systems, resilient backend infrastructure, and high-velocity web platforms for ambitious small and medium businesses.
              </p>

              {/* Live UTC Telemetry badge */}
              <div className="inline-flex items-center gap-2.5 rounded-xs border border-line bg-canvas-alt px-3 py-1.5 font-mono text-xs text-ink-muted mb-6">
                <div className="h-2 w-2 rounded-xs bg-success animate-pulse" />
                <span>ALL SYSTEMS OPERATIONAL</span>
                <span className="text-ink-ghost">·</span>
                <span className="text-ink font-semibold">{timeString || "LIVE"}</span>
              </div>

              {/* Newsletter Form */}
              {!submitted ? (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Engineering updates & workflows"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-xs border border-line bg-canvas-alt px-3 py-2 text-xs text-ink font-mono placeholder:text-ink-ghost focus:outline-none focus:border-accent transition-colors"
                  />
                  <Button size="sm" type="submit" className="rounded-xs text-xs font-mono px-3">
                    <ArrowRight01Icon size={14} />
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono text-success">
                  <CheckmarkCircle01Icon size={16} />
                  <span>Subscribed to engineering changelog.</span>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-mono font-bold text-ink uppercase tracking-wider mb-4">
                Architecture Index
              </h4>
              <ul className="space-y-2.5 text-xs font-mono">
                <li>
                  <a href="#capabilities" className="text-ink-muted hover:text-ink transition-colors">
                    Capabilities & Pillars
                  </a>
                </li>
                <li>
                  <a href="#showcase" className="text-ink-muted hover:text-ink transition-colors">
                    Production Showcase
                  </a>
                </li>
                <li>
                  <a href="#pipeline" className="text-ink-muted hover:text-ink transition-colors">
                    Autonomous Pipeline
                  </a>
                </li>
                <li>
                  <a href="#manual-vs-auto" className="text-ink-muted hover:text-ink transition-colors">
                    Manual vs. Auto
                  </a>
                </li>
                <li>
                  <a href="#work" className="text-ink-muted hover:text-ink transition-colors">
                    Case Outcomes
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="text-ink-muted hover:text-ink transition-colors">
                    ROI Model
                  </a>
                </li>
              </ul>
            </div>

            {/* Communication Channels */}
            <div className="md:col-span-4">
              <h4 className="text-xs font-mono font-bold text-ink uppercase tracking-wider mb-4">
                Direct Channels
              </h4>
              <ul className="space-y-3 text-xs font-mono">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors"
                  >
                    <Mail01Icon size={14} className="text-accent" />
                    <span>{siteConfig.email}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-2 text-ink-muted">
                    <Activity01Icon size={14} className="text-success" />
                    <span>P99 Telemetry: &lt; 120ms Latency</span>
                  </div>
                </li>
                <li className="flex items-center gap-2 pt-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-xs border border-line bg-canvas-alt text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={15} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-xs border border-line bg-canvas-alt text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
                    aria-label="Twitter / X"
                  >
                    <NewTwitterIcon size={15} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-xs border border-line bg-canvas-alt text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin02Icon size={15} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Guarantee */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs font-mono text-ink-muted">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. Senior Technical Trio · All Rights Reserved.
            </p>
            <p className="text-ink-ghost">
              Engineered with Next.js 16 · Tailwind CSS · React 19
            </p>
          </div>
        </Container>
      </footer>

      <AuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
