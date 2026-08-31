"use client";

import { useState, useEffect, useRef } from "react";
import { 
  PlayIcon, 
  CheckmarkCircleIcon, 
  PlaneIcon, 
  MessageSquareIcon, 
  ArrowLeftRightIcon 
} from "@/components/icons";

type DemoScenario = "flight" | "rag" | "ledger";

interface ScenarioData {
  id: DemoScenario;
  tabLabel: string;
  badge: string;
  badgeColor: string;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  url: string;
  steps: { text: string; time: string; status: "done" | "active" | "wait" }[];
  result: string;
}

const scenarios: Record<DemoScenario, ScenarioData> = {
  flight: {
    id: "flight",
    tabLabel: "Flight Ops",
    badge: "Autonomous Dispatch",
    badgeColor: "bg-amber-400",
    title: "AI Flight Dispatch Engine",
    desc: "Autonomous re-routing & turnaround telemetry",
    metric: "-82% Delay",
    metricLabel: "Turnaround SLA",
    url: "agent-dispatch.live",
    steps: [
      { text: "Ingesting live NOAA turbulence telemetry...", time: "12ms", status: "done" },
      { text: "Re-routing Flight #892 via Northern Jetstream", time: "48ms", status: "done" },
      { text: "Crew rest rosters validated across 4 hubs", time: "89ms", status: "done" },
      { text: "Optimized route published to ATC radar", time: "114ms", status: "done" },
    ],
    result: "Route Verified · Saved 38 min flight time & 420 gal fuel",
  },
  rag: {
    id: "rag",
    tabLabel: "Support Bot",
    badge: "Sub-Second RAG",
    badgeColor: "bg-emerald-400",
    title: "Enterprise Copilot v2.4",
    desc: "Trained across Zendesk, Notion, & Jira databases",
    metric: "180ms P99",
    metricLabel: "Query Resolution",
    url: "copilot-rag.internal",
    steps: [
      { text: "Vector embedding search across 42,000 docs...", time: "18ms", status: "done" },
      { text: "Extracted 3 relevant clauses from SLA contract", time: "44ms", status: "done" },
      { text: "Drafted sub-second response with verified citations", time: "82ms", status: "done" },
      { text: "Sent resolution payload to customer portal", time: "105ms", status: "done" },
    ],
    result: "100% Citation Accuracy · Zero hallucination",
  },
  ledger: {
    id: "ledger",
    tabLabel: "Ledger Sync",
    badge: "Zero-Touch Audit",
    badgeColor: "bg-blue-400",
    title: "Stripe & Multi-Bank Sync",
    desc: "Autonomous reconciliation & ledger audit",
    metric: "$18.4M",
    metricLabel: "Monthly Audited",
    url: "ledger-mesh.finance",
    steps: [
      { text: "Webhook received: Stripe charge $4,250.00", time: "08ms", status: "done" },
      { text: "Matched Plaid bank deposit & QuickBooks invoice", time: "32ms", status: "done" },
      { text: "Calculated multi-state sales tax withholdings", time: "56ms", status: "done" },
      { text: "PostgreSQL ledger mutated & Slack alert dispatched", time: "74ms", status: "done" },
    ],
    result: "Balanced Ledger · Auto-reconciliation complete",
  },
};

const scenarioIcons: Record<DemoScenario, React.ElementType> = {
  flight: PlaneIcon,
  rag: MessageSquareIcon,
  ledger: ArrowLeftRightIcon,
};

export function HeroInteractiveDemo() {
  const [activeScenario, setActiveScenario] = useState<DemoScenario>("flight");
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(4); // default full state
  const [logCounter, setLogCounter] = useState(1420);

  const scenario = scenarios[activeScenario];

  const handleRunDemo = () => {
    setIsRunning(true);
    setCurrentStepIndex(0);
    setLogCounter((c) => c + 1);

    // Step-by-step sequential animation
    const timer1 = setTimeout(() => setCurrentStepIndex(1), 400);
    const timer2 = setTimeout(() => setCurrentStepIndex(2), 900);
    const timer3 = setTimeout(() => setCurrentStepIndex(3), 1400);
    const timer4 = setTimeout(() => {
      setCurrentStepIndex(4);
      setIsRunning(false);
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  return (
    <div className="relative w-full max-w-md r-lg overflow-hidden bg-canvas-alt dark:bg-canvas-subtle border-2 border-line shadow-2xl group transition-all duration-300">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-canvas border-b border-line">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/80 cursor-pointer hover:opacity-100" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80 cursor-pointer hover:opacity-100" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/80 cursor-pointer hover:opacity-100" />
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 r-pill bg-canvas-alt border border-line text-[11px] font-mono text-ink font-bold">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          {scenario.url}
        </div>

        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-lime bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 r-sm">
          Live
        </span>
      </div>

      {/* Scenario Tabs with Clean SVG Icons */}
      <div className="flex items-center border-b border-line bg-canvas-alt/70 px-2 py-1.5 gap-1.5 overflow-x-auto">
        {(Object.keys(scenarios) as DemoScenario[]).map((key) => {
          const s = scenarios[key];
          const isSelected = activeScenario === key;
          const TabIcon = scenarioIcons[key];
          return (
            <button
              key={key}
              onClick={() => {
                setActiveScenario(key);
                setCurrentStepIndex(4);
                setIsRunning(false);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold r-sm transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-ink text-canvas shadow-xs scale-102"
                  : "bg-transparent text-ink-muted hover:text-ink hover:bg-canvas"
              }`}
            >
              <TabIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{s.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Main Terminal Screen Area */}
      <div className="p-5 bg-linear-to-br from-[#111813] to-[#1A261E] text-white min-h-[300px] flex flex-col justify-between relative overflow-hidden font-mono">
        {/* Top Status Bar inside terminal */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${scenario.badgeColor} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${scenario.badgeColor}`} />
            </span>
            <span className="font-bold text-white text-xs font-heading">{scenario.title}</span>
          </div>

          <span className="text-[11px] font-bold text-lime bg-lime/10 px-2 py-0.5 r-sm border border-lime/30">
            {scenario.metric}
          </span>
        </div>

        {/* Dynamic Stepper / Terminal Logs */}
        <div className="py-4 space-y-2.5 my-auto text-xs">
          {scenario.steps.map((step, i) => {
            const isFinished = currentStepIndex > i;
            const isCurrent = currentStepIndex === i;

            return (
              <div
                key={i}
                className={`flex items-center justify-between gap-2 p-2 r-sm transition-all duration-300 ${
                  isFinished
                    ? "bg-white/5 border border-white/10 text-white"
                    : isCurrent
                    ? "bg-lime/20 border border-lime/50 text-lime font-bold scale-102"
                    : "opacity-25 text-white/40"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {isFinished ? (
                    <CheckmarkCircleIcon className="w-4 h-4 text-lime shrink-0" />
                  ) : isCurrent ? (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-lime border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0" />
                  )}
                  <span className="truncate text-[11px]">{step.text}</span>
                </div>

                <span className="text-[10px] text-white/60 shrink-0 font-mono">
                  {isFinished ? step.time : isCurrent ? "running..." : "queued"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Success / Live Result Banner */}
        {currentStepIndex >= 4 && (
          <div className="bg-lime text-black p-2.5 r-sm text-[11px] font-bold shadow-md flex items-center justify-between animate-in fade-in duration-300 mb-3">
            <div className="flex items-center gap-1.5 truncate">
              <CheckmarkCircleIcon className="w-3.5 h-3.5 shrink-0 text-black fill-none" />
              <span className="truncate">{scenario.result}</span>
            </div>
            <span className="text-[10px] bg-black text-lime px-1.5 py-0.5 rounded shrink-0 font-mono">
              99.8% Match
            </span>
          </div>
        )}

        {/* Interactive Action Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="text-[10px] text-white/70">
            Processed <span className="font-bold text-lime">{logCounter.toLocaleString()}</span> routes today
          </div>

          <button
            onClick={handleRunDemo}
            disabled={isRunning}
            className="px-4 py-1.5 r-pill bg-lime text-black hover:bg-lime-dark active:scale-95 transition-all text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <PlayIcon className="w-3.5 h-3.5 fill-current" />
                Run Live Agent
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
