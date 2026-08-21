"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { 
  Database01Icon, 
  WorkflowSquare01Icon, 
  ComputerIcon, 
  SentIcon, 
  ArrowRight01Icon,
  CheckmarkCircle01Icon
} from "hugeicons-react";
import { cn } from "@/lib/utils";

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  badge: string;
  accent: "accent" | "success" | "gold" | "warm";
  icon: typeof WorkflowSquare01Icon;
  deliverables: string[];
  metric: string;
  metricLabel: string;
}

const capabilities: CapabilityItem[] = [
  {
    id: "auto-mesh",
    number: "01",
    title: "Self-Healing Automation Mesh",
    shortDesc: "Webhook routing, multi-CRM sync, and automated invoice reconciliation.",
    fullDesc: "We eliminate repetitive operator tasks by connecting your tools into idempotent DAG pipelines. If a third-party server crashes, dead-letter queues hold the payload and auto-retry without data loss.",
    badge: "Automation Layer",
    accent: "gold",
    icon: WorkflowSquare01Icon,
    deliverables: ["n8n & custom worker orchestration", "Zero-touch invoice reconciliation", "Instant Slack & Email alerting"],
    metric: "30+ hrs",
    metricLabel: "Reclaimed weekly per team",
  },
  {
    id: "edge-web",
    number: "02",
    title: "High-Velocity Web Platforms",
    shortDesc: "Sub-second Next.js 16 platforms with 100/100 Core Web Vitals.",
    fullDesc: "Every millisecond counts in conversion. We build bespoke client portals and web apps with optimistic mutations, Server Components, and sub-100ms global response times.",
    badge: "Frontend Architecture",
    accent: "accent",
    icon: ComputerIcon,
    deliverables: ["Next.js 16 App Router & React 19", "Perfect Lighthouse score guarantee", "GSAP & micro-interaction design"],
    metric: "0.4s",
    metricLabel: "Average First Contentful Paint",
  },
  {
    id: "distributed-backend",
    number: "03",
    title: "Resilient Backend & DB Schema",
    shortDesc: "PostgreSQL partitioning, Redis caches, and type-safe API microservices.",
    fullDesc: "Rock-solid backend engineering designed for 100× growth. ACID-compliant transactional tables, sub-millisecond query caches, and zero-downtime database migrations.",
    badge: "Backend & Storage",
    accent: "success",
    icon: Database01Icon,
    deliverables: ["Strict PostgreSQL relational schema", "Redis in-memory caching layer", "Docker containerization & CI/CD"],
    metric: "99.99%",
    metricLabel: "Guaranteed system uptime",
  },
  {
    id: "intake-dispatch",
    number: "04",
    title: "Zero-Touch Intake & Dispatch",
    shortDesc: "Instant customer onboarding, quote generation, and contract routing.",
    fullDesc: "Convert leads into paid contracts in minutes rather than days. Intake forms automatically enrich records, generate custom quotes, and request electronic signatures without manual intervention.",
    badge: "Operations Mesh",
    accent: "warm",
    icon: SentIcon,
    deliverables: ["Automated quote & invoice generation", "Instant contract signing webhook flow", "Customer portal provisioning"],
    metric: "4 mins",
    metricLabel: "Average quote-to-contract cycle",
  },
];

export function ExpandableCapabilities() {
  const [activeId, setActiveId] = useState<string>("auto-mesh");

  return (
    <section id="capabilities" className="py-24 bg-canvas border-b border-line overflow-hidden select-none">
      <Container>
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <Badge variant="accent" size="md" className="mb-4">
            Modular Architecture Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Everything your business needs to operate autonomously.
          </h2>
          <p className="mt-3 text-ink-muted text-sm sm:text-base leading-relaxed">
            Hover over any pillar to expand complete architectural deliverables, runtime guarantees, and operational metrics.
          </p>
        </div>

        {/* Hover-To-Expand Flex Deck */}
        <div className="flex flex-col lg:flex-row gap-4 min-h-[420px] transition-all duration-300">
          {capabilities.map((item) => {
            const isExpanded = activeId === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                className={cn(
                  "relative rounded-xs border p-6 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between overflow-hidden",
                  isExpanded
                    ? "lg:flex-[2.5] border-accent bg-canvas shadow-xs"
                    : "lg:flex-[1] border-line bg-canvas-alt/50 hover:bg-canvas hover:border-line-strong"
                )}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "h-8 w-8 rounded-xs border flex items-center justify-center font-bold text-xs font-mono",
                        isExpanded ? "border-accent text-accent bg-accent-bg" : "border-line text-ink-muted bg-canvas"
                      )}>
                        <Icon size={16} />
                      </div>
                      <span className="font-mono text-xs font-bold text-ink-ghost">{item.number}</span>
                    </div>

                    <Badge variant={item.accent} size="sm">
                      {item.badge}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-ink mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Short / Long Description depending on expansion */}
                  <p className="text-xs text-ink-muted leading-relaxed mb-4">
                    {isExpanded ? item.fullDesc : item.shortDesc}
                  </p>

                  {/* Expanded Deliverables List */}
                  {isExpanded && (
                    <div className="space-y-2 border-t border-line pt-4 mb-6 transition-opacity duration-300">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block font-semibold">
                        Included Deliverables:
                      </span>
                      {item.deliverables.map((del) => (
                        <div key={del} className="flex items-center gap-2 text-xs text-ink">
                          <CheckmarkCircle01Icon size={14} className="text-success shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Metric Footer */}
                <div className="border-t border-line/70 pt-3 flex items-center justify-between font-mono">
                  <div>
                    <div className="text-base sm:text-lg font-bold text-ink">{item.metric}</div>
                    <div className="text-[10px] text-ink-muted">{item.metricLabel}</div>
                  </div>
                  <ArrowRight01Icon
                    size={16}
                    className={cn(
                      "transition-transform duration-300",
                      isExpanded ? "text-accent translate-x-1" : "text-ink-ghost"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
