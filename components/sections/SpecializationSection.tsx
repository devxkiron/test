"use client";

import { useCallback, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { specializations, siteConfig } from "@/lib/data";
import { CheckmarkCircle01Icon } from "hugeicons-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { ZenSecondaryButton } from "@/components/ui/ZenButton";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeTypes,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ─── Custom React Flow Node ─────────────────────────────────────────── */
function PipelineNode({ data }: { data: { label: string; sublabel: string; status: string; color: string } }) {
  return (
    <div
      className="px-4 py-3 bg-[#1A2B21] border-2 text-white font-mono text-xs shadow-xl"
      style={{ borderRadius: "var(--radius-lg)", borderColor: data.color }}
    >
      <Handle type="target" position={Position.Top} className="!bg-lime !w-2.5 !h-2.5 !border-0" />
      <div className="flex items-center justify-between gap-4 min-w-[200px]">
        <div>
          <div className="font-bold text-white text-xs">{data.label}</div>
          <div className="text-[11px] text-white/80 font-medium mt-0.5">{data.sublabel}</div>
        </div>
        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-black/40" style={{ color: data.color }}>
          {data.status}
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-lime !w-2.5 !h-2.5 !border-0" />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  pipeline: PipelineNode,
};

/* ─── Flow Data ──────────────────────────────────────────────────────── */
const initialNodes: Node[] = [
  {
    id: "1",
    type: "pipeline",
    position: { x: 90, y: 20 },
    data: {
      label: "Inbound Webhook",
      sublabel: "Stripe / CRM / Doc Intake",
      status: "Triggered",
      color: "#60A5FA",
    },
  },
  {
    id: "2",
    type: "pipeline",
    position: { x: 60, y: 120 },
    data: {
      label: "LLM Agent Evaluation",
      sublabel: "OCR Parse & Entity Routing",
      status: "Processing",
      color: "#D4FF00",
    },
  },
  {
    id: "3",
    type: "pipeline",
    position: { x: 120, y: 220 },
    data: {
      label: "Conditional Router",
      sublabel: "Multi-branch decision tree",
      status: "Active",
      color: "#FBBF24",
    },
  },
  {
    id: "4",
    type: "pipeline",
    position: { x: 20, y: 320 },
    data: {
      label: "Database Mutation",
      sublabel: "PostgreSQL sync & audit log",
      status: "Complete (80ms)",
      color: "#34D399",
    },
  },
  {
    id: "5",
    type: "pipeline",
    position: { x: 200, y: 320 },
    data: {
      label: "Slack & Email Alert",
      sublabel: "Instant team notification",
      status: "Sent ✓",
      color: "#34D399",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
  { id: "e3-5", source: "3", target: "5", animated: true },
];

/* ─── Component ──────────────────────────────────────────────────────── */
export function SpecializationSection() {
  const onInit = useCallback(() => {}, []);

  return (
    <section id="services" className="py-20 sm:py-28 bg-canvas-alt/40 dark:bg-canvas-subtle/20 border-t border-line pattern-cross">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 max-w-xl">
            <AnimateOnScroll direction="left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 r-pill bg-canvas dark:bg-canvas-alt border border-line text-xs font-mono font-semibold text-ink-muted mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                Capabilities
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-6">
                We Specialize In
              </h2>

              <p className="text-base text-ink-muted leading-relaxed mb-8">
                We engineer custom software systems that solve real bottlenecks. From generative AI agents to automated multi-platform syncs.
              </p>
            </AnimateOnScroll>

            {/* Checklist */}
            <div className="space-y-4 mb-10">
              {specializations.map((spec, i) => (
                <AnimateOnScroll key={i} direction="left" delay={i * 80}>
                  <div className="flex items-start gap-3 p-3.5 r bg-canvas dark:bg-canvas-alt border border-line/60 hover:border-line-strong transition-all">
                    <div className="w-6 h-6 rounded-full bg-[#14221A] text-[#D4FF00] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckmarkCircle01Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink">{spec.title}</h3>
                      <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">{spec.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* CTA */}
            <AnimateOnScroll direction="up" delay={300}>
              <div className="flex items-center gap-4">
                <ZenSecondaryButton href="#book" className="px-6 py-2.5 text-xs font-bold">
                  Book a Call
                </ZenSecondaryButton>

                <ZenSecondaryButton href={`mailto:${siteConfig.email}`} className="px-5 py-2.5 text-xs font-bold">
                  Let&apos;s chat
                </ZenSecondaryButton>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: React Flow Interactive Pipeline Canvas */}
          <div className="lg:col-span-6">
            <AnimateOnScroll direction="right" delay={200}>
              <div className="r-lg bg-[#14221A] border border-[#243B2E] shadow-xl overflow-hidden" style={{ height: 460 }}>
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#243B2E]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#D4FF00] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-white">Agent Orchestration Pipeline</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#D4FF00] bg-[#1A2B21] px-2 py-0.5 r-sm border border-[#243B2E]">
                    Autonomous
                  </span>
                </div>

                <ReactFlow
                  nodes={initialNodes}
                  edges={initialEdges}
                  nodeTypes={nodeTypes}
                  onInit={onInit}
                  fitView
                  minZoom={0.5}
                  maxZoom={1.5}
                  proOptions={{ hideAttribution: true }}
                  style={{ background: "#14221A" }}
                >
                  <Background color="#243B2E" gap={20} size={1} />
                  <Controls
                    showInteractive={false}
                    className="!bg-[#1A2B21] !border-[#243B2E] !shadow-lg [&>button]:!bg-[#1A2B21] [&>button]:!border-[#243B2E] [&>button]:!text-white [&>button:hover]:!bg-[#D4FF00] [&>button:hover]:!text-black"
                  />
                </ReactFlow>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}
