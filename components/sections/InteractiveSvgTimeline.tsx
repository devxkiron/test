"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { 
  CodeSquareIcon, 
  Database01Icon, 
  WorkflowSquare01Icon, 
  Activity01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon,
  FlashIcon
} from "hugeicons-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  phase: string;
  stepNumber: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  image: string;
  accent: "accent" | "success" | "gold";
  icon: typeof CodeSquareIcon;
}

const steps: TimelineStep[] = [
  {
    phase: "Phase 01",
    stepNumber: "01",
    title: "Deep Architecture Discovery & Schema Blueprint",
    duration: "Week 1",
    description: "We audit your manual bottlenecks, map out existing spreadsheet chaos, and produce an immutable database schema and DAG pipeline architecture.",
    deliverables: [
      "Entity Relationship Diagram (ERD)",
      "High-throughput DAG architecture blueprint",
      "API contract & webhook intake specifications",
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    accent: "gold",
    icon: CodeSquareIcon,
  },
  {
    phase: "Phase 02",
    stepNumber: "02",
    title: "Database Partitioning & Backend ETL Infrastructure",
    duration: "Weeks 2–3",
    description: "Engineering strict PostgreSQL relational models, Redis state caches, and idempotent worker queues with zero data loss guarantees.",
    deliverables: [
      "PostgreSQL schema with strict type validation",
      "Redis caching layer with sub-millisecond p99",
      "Dead-letter queues and automated error recovery",
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    accent: "accent",
    icon: Database01Icon,
  },
  {
    phase: "Phase 03",
    stepNumber: "03",
    title: "Autonomous Orchestration & Agentic Dispatch Mesh",
    duration: "Weeks 4–5",
    description: "Building automated n8n pipelines, AI evaluation nodes, and automated invoice/CRM webhooks to eliminate manual human touchpoints.",
    deliverables: [
      "Full n8n / custom worker mesh running 24/7",
      "Automated quote generation & Slack dispatch",
      "Real-time event ledger with live telemetry",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    accent: "gold",
    icon: WorkflowSquare01Icon,
  },
  {
    phase: "Phase 04",
    stepNumber: "04",
    title: "Next.js 16 Edge Platform & Production Rollout",
    duration: "Week 6",
    description: "Deploying high-speed web dashboards with optimistic UI mutations, WebSocket real-time streams, and 100/100 Core Web Vitals.",
    deliverables: [
      "Next.js App Router client dashboard",
      "Real-time WebSocket telemetry stream",
      "Complete handover with zero proprietary lock-in",
    ],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    accent: "success",
    icon: Activity01Icon,
  },
];

export function InteractiveSvgTimeline() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-24 bg-canvas-alt/20 border-b border-line overflow-hidden">
      <Container>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Badge variant="accent" size="md" className="mb-4">
            Interactive SVG Delivery Path
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            From friction to production in 6 weeks.
          </h2>
          <p className="mt-3 text-ink-muted text-sm sm:text-base leading-relaxed">
            Follow our battle-tested engineering sequence. Click or scroll through each milestone to inspect deliverables and real architecture snapshots.
          </p>
        </div>

        {/* Timeline Sequence Container with SVG Track */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated Vertical SVG Spine Line (Desktop) */}
          <div className="absolute left-[50%] top-12 bottom-12 -translate-x-1/2 w-8 hidden lg:block pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 32 800" fill="none" preserveAspectRatio="none">
              {/* Background Line */}
              <line
                x1="16"
                y1="0"
                x2="16"
                y2="800"
                stroke="var(--line-strong)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {/* Animated Progress Laser Line */}
              <line
                x1="16"
                y1="0"
                x2="16"
                y2="800"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeDasharray="160 400"
                className="opacity-75 animate-pulse"
              />
              {/* Floating Data Pulses */}
              <circle cx="16" cy="180" r="4" fill="var(--accent)">
                <animate attributeName="cy" from="0" to="800" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="16" cy="450" r="3" fill="var(--success)">
                <animate attributeName="cy" from="0" to="800" dur="5.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* Timeline Steps (Alternating Left / Right) */}
          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.phase}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center cursor-pointer transition-all duration-300",
                    isSelected ? "opacity-100" : "opacity-75 hover:opacity-100"
                  )}
                >
                  {/* Step Card */}
                  <div
                    className={cn(
                      "lg:col-span-6 rounded-lg border bg-canvas p-6 shadow-sm transition-all duration-300 shimmer",
                      isSelected
                        ? "border-accent ring-1 ring-accent shadow-[0_4px_24px_rgba(80,114,147,0.15)]"
                        : "border-line hover:border-line-strong",
                      !isEven && "lg:order-2"
                    )}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={cn(
                          "h-8 w-8 rounded border flex items-center justify-center font-bold text-xs font-mono",
                          step.accent === "success" && "border-success-light bg-success-bg text-success",
                          step.accent === "gold" && "border-gold-light bg-gold-bg text-gold",
                          step.accent === "accent" && "border-accent-light bg-accent-bg text-accent"
                        )}>
                          <Icon size={16} />
                        </div>
                        <Badge variant={step.accent} size="sm">
                          {step.phase} · {step.duration}
                        </Badge>
                      </div>
                      <span className="text-xs font-mono text-ink-muted">
                        Step 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-ink mb-2 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {/* Deliverables checklist */}
                    <div className="space-y-2 border-t border-line pt-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block font-semibold">
                        Core Architecture Deliverables:
                      </span>
                      {step.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-ink-muted">
                          <CheckmarkCircle01Icon size={14} className="text-success shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Image Visual Preview */}
                  <div
                    className={cn(
                      "lg:col-span-6 relative h-56 sm:h-64 rounded-lg border border-line overflow-hidden bg-canvas-alt shadow-sm group",
                      !isEven && "lg:order-1"
                    )}
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-canvas/20 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-ink z-10">
                      <span className="px-2 py-0.5 rounded border border-line/70 bg-canvas/90 backdrop-blur-sm text-[11px] font-bold">
                        {step.phase} Architecture Artifact
                      </span>
                      <span className="text-success flex items-center gap-1">
                        <FlashIcon size={12} /> Verified
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
