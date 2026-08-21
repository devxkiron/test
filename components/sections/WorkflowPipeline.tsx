"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { 
  Database01Icon, 
  WorkflowSquare01Icon, 
  CpuIcon, 
  SentIcon, 
  CheckmarkCircle01Icon, 
  Activity01Icon, 
  ArrowRight01Icon,
  PlayIcon
} from "hugeicons-react";
import { cn } from "@/lib/utils";

interface PipelineStep {
  id: string;
  title: string;
  category: string;
  role: "Automation" | "Backend" | "Frontend";
  icon: typeof Database01Icon;
  latency: string;
  throughput: string;
  description: string;
  payload: {
    event: string;
    status: string;
    schema: string;
    executionTime: string;
  };
  accent: "accent" | "success" | "gold";
}

const pipelineSteps: PipelineStep[] = [
  {
    id: "step-1",
    title: "Event Capture & Webhooks",
    category: "Ingest Layer",
    role: "Automation",
    icon: SentIcon,
    latency: "14ms",
    throughput: "4,800 req/s",
    description: "Multi-channel intake capturing webhooks, CRM triggers, customer portal events, and Stripe webhooks into an idempotent event queue.",
    payload: {
      event: "ORDER_CREATED_V2",
      status: "INGESTED_ACK",
      schema: "JSONSchema_v4.validated",
      executionTime: "12.4ms",
    },
    accent: "gold",
  },
  {
    id: "step-2",
    title: "ETL & Schema Validation",
    category: "Processing Layer",
    role: "Backend",
    icon: CpuIcon,
    latency: "28ms",
    throughput: "12,400 ops/s",
    description: "High-speed Rust/Node.js pipeline normalizing dirty inputs, deduplicating records, and enforcing strict relational data schemas.",
    payload: {
      event: "DATA_CLEANSED_NORMALIZED",
      status: "SCHEMA_VALIDATED_200",
      schema: "PostgreSQL_Strict_Type",
      executionTime: "24.1ms",
    },
    accent: "accent",
  },
  {
    id: "step-3",
    title: "AI Decision & Routing",
    category: "Autonomous Mesh",
    role: "Automation",
    icon: WorkflowSquare01Icon,
    latency: "85ms",
    throughput: "950 ops/s",
    description: "Contextual agentic evaluation determining custom dispatch routes, automatic invoice reconciliation, and smart alert triggers.",
    payload: {
      event: "ROUTING_DETERMINED_AUTO",
      status: "BRANCH_RECONCILED",
      schema: "AgentPolicy_v3.1",
      executionTime: "78.9ms",
    },
    accent: "gold",
  },
  {
    id: "step-4",
    title: "Distributed Cache & State",
    category: "Storage Layer",
    role: "Backend",
    icon: Database01Icon,
    latency: "4ms",
    throughput: "38,000 read/s",
    description: "Redis caching layer and transactional PostgreSQL partition with sub-millisecond query indices and auto-sync replication.",
    payload: {
      event: "STATE_PERSISTED_REPLICATED",
      status: "DB_COMMITTED_WRITE",
      schema: "WAL_Replica_01",
      executionTime: "3.8ms",
    },
    accent: "success",
  },
  {
    id: "step-5",
    title: "Real-Time WebSocket UI",
    category: "Presentation Layer",
    role: "Frontend",
    icon: Activity01Icon,
    latency: "< 2ms",
    throughput: "60 FPS Render",
    description: "Optimistic UI state dispatch delivering sub-second client dashboard updates with zero browser jank or blocking frames.",
    payload: {
      event: "UI_HYDRATION_COMPLETED",
      status: "ZERO_FRAME_DROP",
      schema: "React19_Optimistic_Sync",
      executionTime: "1.2ms",
    },
    accent: "accent",
  },
];

export function WorkflowPipeline() {
  const [activeStep, setActiveStep] = useState<string>("step-1");
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [simCounter, setSimCounter] = useState<number>(1420);

  const current = pipelineSteps.find((s) => s.id === activeStep) || pipelineSteps[0];

  const handleSimulate = () => {
    setIsLiveSimulating(!isLiveSimulating);
    if (!isLiveSimulating) {
      setSimCounter((prev) => prev + 12);
    }
  };

  return (
    <section id="pipeline" className="py-24 bg-canvas border-b border-line overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Badge variant="accent" size="md" className="mb-4">
              Architecture & React-Flow Pipeline
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              End-to-end autonomous flow.
            </h2>
            <p className="mt-3 text-ink-muted max-w-xl text-sm sm:text-base leading-relaxed">
              Explore how events travel from raw trigger to verified database state and reactive frontend dashboards without human intervention.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSimulate}
              className="shimmer"
            >
              {isLiveSimulating ? (
                <>
                  <Activity01Icon size={14} className="text-success mr-1.5 animate-pulse" />
                  Live Flow (Active)
                </>
              ) : (
                <>
                  <PlayIcon size={14} className="text-accent mr-1.5" />
                  Resume Simulation
                </>
              )}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const currentIndex = pipelineSteps.findIndex((s) => s.id === activeStep);
                const nextIndex = (currentIndex + 1) % pipelineSteps.length;
                setActiveStep(pipelineSteps[nextIndex].id);
              }}
              className="shimmer"
            >
              Step Forward
              <ArrowRight01Icon size={14} className="ml-1" />
            </Button>
          </div>
        </div>

        {/* SVG Path Interactive Flow Ribbon */}
        <div className="relative rounded-xs border border-line bg-canvas-alt/60 p-6 sm:p-8 mb-8 overflow-hidden">
          <div className="relative hidden lg:block mb-8">
            <svg className="w-full h-14" viewBox="0 0 1000 60" fill="none" preserveAspectRatio="none">
              <path
                d="M 50 30 C 250 30, 250 30, 450 30 C 650 30, 650 30, 950 30"
                stroke="var(--line-strong)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {isLiveSimulating && (
                <>
                  <path
                    d="M 50 30 C 250 30, 250 30, 450 30 C 650 30, 650 30, 950 30"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeDasharray="120 400"
                    className="opacity-70 animate-pulse"
                  />
                  <circle cx="280" cy="30" r="4" fill="var(--accent)">
                    <animate attributeName="cx" from="50" to="950" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="580" cy="30" r="3.5" fill="var(--success)">
                    <animate attributeName="cx" from="50" to="950" dur="4.2s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
            </svg>
          </div>

          {/* Flow Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10">
            {pipelineSteps.map((step, idx) => {
              const isSelected = activeStep === step.id;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={cn(
                    "text-left p-4 rounded-xs border transition-all duration-150 relative group flex flex-col justify-between min-h-[140px] cursor-pointer",
                    isSelected
                      ? "border-accent bg-canvas shadow-xs ring-1 ring-accent"
                      : "border-line bg-canvas/80 hover:border-line-strong hover:bg-canvas"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-xs font-mono font-bold text-ink-muted">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-xs border border-line text-ink-muted bg-canvas-alt">
                      {step.role}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} className={cn(
                        "transition-colors",
                        isSelected ? "text-accent" : "text-ink-muted group-hover:text-ink"
                      )} />
                      <span className="text-xs font-semibold text-ink line-clamp-1">
                        {step.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-ink-muted font-mono">
                      {step.latency} · {step.throughput}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Telemetry Inspector */}
        <AnimateOnScroll direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-xs border border-line bg-canvas p-6 sm:p-8">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant={current.accent} size="sm">
                    {current.category}
                  </Badge>
                  <span className="text-xs font-mono text-ink-muted">
                    Telemetry Node ID: {current.id}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-ink mb-3">
                  {current.title}
                </h3>

                <p className="text-sm text-ink-muted leading-relaxed mb-6">
                  {current.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-line font-mono">
                <div>
                  <span className="text-[11px] text-ink-muted block uppercase tracking-wider">P99 Latency</span>
                  <span className="text-lg font-bold text-ink">{current.latency}</span>
                </div>
                <div>
                  <span className="text-[11px] text-ink-muted block uppercase tracking-wider">Throughput</span>
                  <span className="text-lg font-bold text-ink">{current.throughput}</span>
                </div>
                <div>
                  <span className="text-[11px] text-ink-muted block uppercase tracking-wider">Total Packets</span>
                  <span className="text-lg font-bold text-success">{(simCounter * (pipelineSteps.findIndex(s=>s.id === current.id) + 1)).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Live Terminal Payload Inspector */}
            <div className="lg:col-span-5 rounded-xs border border-line bg-canvas-alt p-4 font-mono text-xs text-ink-muted">
              <div className="flex items-center justify-between border-b border-line pb-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-xs bg-line-strong" />
                  <span className="h-2 w-2 rounded-xs bg-line-strong" />
                  <span className="h-2 w-2 rounded-xs bg-line-strong" />
                </div>
                <span className="text-[10px] text-ink-ghost uppercase">live_payload_stream.json</span>
              </div>

              <pre className="overflow-x-auto text-[11px] leading-relaxed text-ink-muted">
                <code>{JSON.stringify(current.payload, null, 2)}</code>
              </pre>

              <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-[11px] text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <CheckmarkCircle01Icon size={14} className="text-success" />
                  Zero Manual Touchpoints
                </span>
                <span className="text-ink-ghost">200 OK</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
