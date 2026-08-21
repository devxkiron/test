"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { 
  Clock01Icon, 
  TableIcon, 
  Mail01Icon, 
  Alert02Icon, 
  Layers01Icon, 
  FlashIcon, 
  Shield01Icon, 
  RepeatIcon, 
  Tick01Icon 
} from "hugeicons-react";
import { cn } from "@/lib/utils";

const beforeItems = [
  { icon: Clock01Icon, label: "18+ hours/week spent on manual copy-pasting and data entry", category: "Labor Loss" },
  { icon: TableIcon, label: "Fragile CSV downloads and disconnected Google Sheets", category: "Siloed Data" },
  { icon: Mail01Icon, label: "Manual follow-ups, delayed quote proposals, and lost leads", category: "Slow Velocity" },
  { icon: Alert02Icon, label: "Frequent human error during high-volume customer intake", category: "High Risk" },
  { icon: Layers01Icon, label: "14 disconnected SaaS tools with duplicate subscription costs", category: "Bloated Stack" },
];

const afterItems = [
  { icon: FlashIcon, label: "Sub-second automatic sync across CRM, DB, and notifications", category: "Autonomous" },
  { icon: Shield01Icon, label: "Type-safe database pipelines with automatic schema validation", category: "Idempotent" },
  { icon: RepeatIcon, label: "Instant quote generation, auto-invoicing, and Slack alerts", category: "Immediate" },
  { icon: Tick01Icon, label: "99.98% operational accuracy with self-healing retry queues", category: "Reliable" },
  { icon: Layers01Icon, label: "Unified custom platform eliminating $18k/year in redundant SaaS", category: "Cost Optimized" },
];

export function ComparisonSection() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section
      id="work"
      className="py-24 bg-canvas-alt/30 border-b border-line"
    >
      <Container>
        <div className="text-center mb-14">
          <Badge variant="gold" size="md" className="mb-4">Before vs After Shift</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            The architectural transformation.
          </h2>
          <p className="mt-3 text-ink-muted max-w-lg mx-auto text-sm sm:text-base">
            See the concrete difference between manual friction and streamlined engineering velocity.
          </p>
        </div>

        {/* Side by side comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded-xs border border-line bg-canvas overflow-hidden flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-canvas-alt/50">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-xs bg-ink-faint" />
                <span className="text-sm font-semibold text-ink">Manual Operations (Before)</span>
              </div>
              <span className="text-xs font-mono text-ink-muted uppercase">Status Quo</span>
            </div>

            <div className="p-5 space-y-3">
              {beforeItems.map((item, i) => {
                const Icon = item.icon;
                const isHovered = activeRow === i;

                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-3.5 rounded-xs border p-3.5 text-sm transition-all duration-150 cursor-pointer",
                      isHovered
                        ? "border-line-strong bg-canvas-alt"
                        : "border-line/60 bg-canvas hover:border-line"
                    )}
                    onMouseEnter={() => setActiveRow(i)}
                    onMouseLeave={() => setActiveRow(null)}
                  >
                    <div className="h-6 w-6 rounded-xs border border-line bg-canvas-alt flex items-center justify-center shrink-0 mt-0.5 text-ink-muted">
                      <Icon size={14} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider block mb-0.5">
                        {item.category}
                      </span>
                      <p className="text-xs sm:text-sm text-ink-muted leading-snug">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-line bg-canvas-alt/30 text-center text-xs text-ink-muted font-mono">
              Result: High cognitive fatigue & sluggish delivery
            </div>
          </div>

          {/* After */}
          <div className="rounded-xs border border-accent/40 bg-canvas overflow-hidden flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between px-5 py-4 border-b border-accent/20 bg-accent-bg">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-xs bg-success animate-pulse" />
                <span className="text-sm font-semibold text-ink">Autonomous Velocity (After)</span>
              </div>
              <span className="text-xs font-mono text-accent font-semibold uppercase">Engineered</span>
            </div>

            <div className="p-5 space-y-3">
              {afterItems.map((item, i) => {
                const Icon = item.icon;
                const isHovered = activeRow === i;

                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-3.5 rounded-xs border p-3.5 text-sm transition-all duration-150 cursor-pointer",
                      isHovered
                        ? "border-accent bg-accent-bg"
                        : "border-line bg-canvas hover:border-accent/40"
                    )}
                    onMouseEnter={() => setActiveRow(i)}
                    onMouseLeave={() => setActiveRow(null)}
                  >
                    <div className="h-6 w-6 rounded-xs border border-success/30 bg-success-bg flex items-center justify-center shrink-0 mt-0.5 text-success">
                      <Icon size={14} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-mono text-accent uppercase tracking-wider block mb-0.5">
                        {item.category}
                      </span>
                      <p className="text-xs sm:text-sm text-ink font-medium leading-snug">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-line bg-canvas-alt/30 text-center text-xs text-success font-mono font-medium">
              Result: Zero manual friction & instantaneous response
            </div>
          </div>
        </div>

        {/* Bottom aggregate metrics */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Weekly hours reclaimed", before: "38+ hrs", after: "< 1.5 hrs", change: "96% automated" },
            { label: "Data sync latency", before: "Hours / Days", after: "< 120 ms", change: "Real-time" },
            { label: "Human exception rate", before: "~6.8%", after: "0.02%", change: "99.7% reduction" },
          ].map((m) => (
            <div key={m.label} className="rounded-xs border border-line bg-canvas p-4 text-center shadow-xs">
              <div className="text-xs text-ink-muted mb-2 font-mono">{m.label}</div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-ink-ghost line-through font-mono">{m.before}</span>
                <span className="text-ink-muted">→</span>
                <span className="font-bold text-ink font-mono">{m.after}</span>
              </div>
              <div className="text-[11px] text-accent mt-1 font-medium font-mono">{m.change}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
