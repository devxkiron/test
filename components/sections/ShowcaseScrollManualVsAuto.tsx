"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  TableIcon, 
  Alert02Icon, 
  Clock01Icon, 
  FlashIcon, 
  WorkflowSquare01Icon, 
  Shield01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon
} from "hugeicons-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollStep {
  stage: string;
  badge: string;
  badgeVariant: "rose" | "warm" | "gold" | "success" | "accent";
  title: string;
  subtitle: string;
  description: string;
  items: { icon: typeof TableIcon; label: string; tag: string }[];
  impactMetric: { label: string; value: string; color: string };
  isSolution: boolean;
}

const steps: ScrollStep[] = [
  {
    stage: "Stage 01",
    badge: "The Manual Status Quo",
    badgeVariant: "rose",
    title: "Spreadsheet chaos and disconnected software",
    subtitle: "How most small businesses operate before automation",
    description: "Orders arrive by email, data gets manually typed into Google Sheets, invoices are built by hand in Excel, and status updates are sent via individual Slack messages. A fragile web waiting to break.",
    items: [
      { icon: TableIcon, label: "Fragile spreadsheets with broken VLOOKUP formulas", tag: "Human Friction" },
      { icon: Clock01Icon, label: "6+ hours/day lost to repetitive copy-paste data entry", tag: "Labor Drain" },
      { icon: Alert02Icon, label: "Uncaught billing discrepancies & delayed invoice delivery", tag: "Revenue Leak" },
    ],
    impactMetric: { label: "Weekly Labor Lost", value: "32.5 hrs", color: "text-rose" },
    isSolution: false,
  },
  {
    stage: "Stage 02",
    badge: "The Breaking Point",
    badgeVariant: "warm",
    title: "Scaling leads directly to operational paralysis",
    subtitle: "When customer volume increases, manual operations collapse",
    description: "As your client list doubles, the manual overhead quadruples. Hiring more administrators only adds communication overhead, while response times degrade and errors multiply.",
    items: [
      { icon: Alert02Icon, label: "Customer intake emails sit unaddressed for 48+ hours", tag: "Slow Velocity" },
      { icon: Clock01Icon, label: "Key employees burnt out on administrative busywork", tag: "Cognitive Fatigue" },
      { icon: TableIcon, label: "Siloed data across 12 different tools with zero unified ledger", tag: "No Observability" },
    ],
    impactMetric: { label: "Manual Error Rate", value: "6.8%", color: "text-warm" },
    isSolution: false,
  },
  {
    stage: "Stage 03",
    badge: "The Veloce Engine",
    badgeVariant: "accent",
    title: "Autonomous event mesh replaces manual friction",
    subtitle: "How our engineered pipeline resolves the entire bottleneck",
    description: "Every event is captured via webhooks, validated through type-safe database schemas, and routed instantly by self-healing automation workers. Zero manual touchpoints required.",
    items: [
      { icon: WorkflowSquare01Icon, label: "Instant webhook ingestion syncing CRM, billing, and alerts", tag: "Sub-Second" },
      { icon: FlashIcon, label: "Automated quote & PDF invoice generation within 800ms", tag: "Instant ROI" },
      { icon: Shield01Icon, label: "Dead-letter retry queues with zero dropped packets", tag: "Self-Healing" },
    ],
    impactMetric: { label: "Execution Latency", value: "< 140ms", color: "text-accent" },
    isSolution: true,
  },
  {
    stage: "Stage 04",
    badge: "The Measured Outcome",
    badgeVariant: "success",
    title: "Continuous velocity with 96% operations automated",
    subtitle: "Scale your revenue without adding operational headcount",
    description: "Your business runs smoothly 24/7. New clients are onboarded in seconds, invoices reconcile autonomously, and your team is freed to focus on high-margin strategic growth.",
    items: [
      { icon: CheckmarkCircle01Icon, label: "Reclaim 30+ hours of team capacity every single week", tag: "Reclaimed Time" },
      { icon: CheckmarkCircle01Icon, label: "99.98% operational accuracy across all transactions", tag: "Zero Errors" },
      { icon: CheckmarkCircle01Icon, label: "Direct principal architecture with 100% custom code ownership", tag: "Zero Lock-In" },
    ],
    impactMetric: { label: "Operations Automated", value: "96.4%", color: "text-success" },
    isSolution: true,
  },
];

export function ShowcaseScrollManualVsAuto() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = steps[activeStepIndex];

  return (
    <section
      ref={containerRef}
      id="manual-vs-auto"
      className="py-24 bg-canvas-alt/30 border-b border-line overflow-hidden select-none"
    >
      <Container>
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <Badge variant="accent" size="md" className="mb-4">
            Skiper UI 79th · Showcase Scroll
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Manual friction vs. autonomous leverage.
          </h2>
          <p className="mt-3 text-ink-muted text-sm sm:text-base leading-relaxed">
            Follow the journey from spreadsheet chaos to automated precision. Click or scroll through the stages below to inspect the transformation.
          </p>
        </div>

        {/* Step Navigation Pill Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10">
          {steps.map((step, idx) => (
            <button
              key={step.stage}
              onClick={() => setActiveStepIndex(idx)}
              className={cn(
                "p-3 rounded-xs border text-left font-mono text-xs transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[72px]",
                activeStepIndex === idx
                  ? "border-accent bg-canvas shadow-xs ring-1 ring-accent"
                  : "border-line bg-canvas/70 hover:border-line-strong hover:bg-canvas"
              )}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] text-ink-ghost uppercase">{step.stage}</span>
                <span className={cn(
                  "h-1.5 w-1.5 rounded-xs",
                  step.isSolution ? "bg-success" : "bg-warm"
                )} />
              </div>
              <span className="font-semibold text-ink truncate">{step.badge}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Stage Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-line bg-canvas p-6 sm:p-10 rounded-xs shadow-xs">
          {/* Left Column: Narrative & Metrics */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant={current.badgeVariant} size="sm">
                  {current.badge}
                </Badge>
                <span className="text-xs font-mono text-ink-muted">{current.stage} of 04</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-ink mb-2 leading-tight">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm font-mono text-accent mb-4">
                {current.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Items List */}
              <div className="space-y-2.5 mb-6 border-t border-line pt-4">
                {current.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xs border text-xs",
                        current.isSolution ? "border-success/30 bg-success-bg" : "border-line bg-canvas-alt"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className={current.isSolution ? "text-success" : "text-ink-muted"} />
                        <span className="text-ink font-medium">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-ink-muted hidden sm:inline">{item.tag}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Nav Controller */}
            <div className="flex items-center justify-between pt-4 border-t border-line">
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="text-xs font-mono text-ink-muted hover:text-ink disabled:opacity-30 cursor-pointer"
              >
                ← Previous Stage
              </button>
              <button
                type="button"
                disabled={activeStepIndex === steps.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                className="text-xs font-mono text-accent hover:text-accent-dark font-semibold disabled:opacity-30 cursor-pointer flex items-center gap-1"
              >
                Next Stage <ArrowRight01Icon size={14} />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Telemetry Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xs border border-line bg-canvas-alt p-6 font-mono text-xs">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
                <span className="text-xs font-bold text-ink">SYSTEM IMPACT TELEMETRY</span>
                <span className={cn(
                  "px-2 py-0.5 rounded-xs text-[10px] uppercase font-bold",
                  current.isSolution ? "bg-success-bg text-success border border-success-light" : "bg-warm-bg text-warm-dark border border-warm-light"
                )}>
                  {current.isSolution ? "OPTIMIZED" : "FRICTION"}
                </span>
              </div>

              {/* Big Metric Display */}
              <div className="rounded-xs border border-line bg-canvas p-4 text-center mb-6">
                <span className="text-[11px] text-ink-muted uppercase block mb-1">
                  {current.impactMetric.label}
                </span>
                <span className={cn("text-3xl sm:text-4xl font-bold tracking-tight", current.impactMetric.color)}>
                  {current.impactMetric.value}
                </span>
              </div>

              {/* Diagnostic Checklist */}
              <div className="space-y-2 text-[11px] text-ink-muted">
                <div className="flex items-center justify-between py-1 border-b border-line/60">
                  <span>Data Ingestion:</span>
                  <span className="text-ink font-semibold">{current.isSolution ? "Automated Webhooks" : "Manual CSV Export"}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-line/60">
                  <span>Reconciliation:</span>
                  <span className="text-ink font-semibold">{current.isSolution ? "Real-Time Ledger" : "End-of-Month Excel"}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-line/60">
                  <span>Human Labor:</span>
                  <span className="text-ink font-semibold">{current.isSolution ? "Zero Touchpoints" : "High Cognitive Load"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line text-[11px] text-ink-ghost">
              ARCHITECTURE STATUS // VELOCE ENGINE V3
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
