"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import {
  CheckmarkCircleIcon,
  ShieldIcon,
  CpuIcon,
  FlashIcon,
  RefreshIcon,
  SettingsIcon,
  FileIcon,
  SearchIcon,
  FilterIcon,
  ArrowUpIcon,
  LayersIcon,
  BotIcon,
  DatabaseIcon,
  MessageSquareIcon,
  TerminalIcon,
} from "@/components/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Production Code Snippet for Step 3 IDE ─────────────────────────── */
const codeLines = [
  '@agent.route("/pipeline/execute", methods=["POST"])',
  'async def handle_lead_event(payload: WebhookPayload):',
  '    # 1. Ingest & enrich incoming contact data',
  '    lead = await crm.enrich_contact(payload.email)',
  '    # 2. Neural intent classification & smart routing',
  '    intent = await llm.classify(lead.notes, model="gpt-4o")',
  '    # 3. Trigger autonomous multi-channel dispatch',
  '    await n8n.trigger_workflow("auto_outreach", context=intent)',
  '    return {"status": "dispatched", "latency_ms": 14}',
];

/* ─── Rotating AI Engine Nodes for Step 4 (Left: Official Vector Logos) ─── */
const aiEngineTools = [
  {
    name: "n8n Workflow",
    sub: "Trigger & Webhook",
    color: "#EA4B71",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="12" r="3" fill="#EA4B71" />
        <circle cx="18" cy="7" r="3" fill="#FF6D5A" />
        <circle cx="18" cy="17" r="3" fill="#FF9A52" />
        <path d="M8.8 10.8 L 15.2 8.2" stroke="#EA4B71" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8.8 13.2 L 15.2 15.8" stroke="#FF9A52" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "OpenAI GPT-4o",
    sub: "Neural Classifier",
    color: "#10A37F",
    icon: (
      <svg className="w-5 h-5 text-[#10A37F]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9 6.06 6.06 0 0 0-10.27 2.17 5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9 5.98 5.98 0 0 0 4.51 2.01 6.06 6.06 0 0 0 5.77-4.2 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.08zm-9.02 12.6a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .4-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.59a4.5 4.5 0 0 1-4.5 4.49zm-9.66-4.12a4.47 4.47 0 0 1-.54-3.02l.14.09 4.79 2.75a.77.77 0 0 0 .78 0l5.84-3.37v2.34a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.65zM2.34 7.9a4.48 4.48 0 0 1 2.37-1.98v5.69a.77.77 0 0 0 .38.67l5.82 3.36-2.02 1.17a.08.08 0 0 1-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.34 7.87zm16.6 3.85L13.1 8.36 15.12 7.2a.08.08 0 0 1 .07 0l4.83 2.8a4.49 4.49 0 0 1-.67 8.1v-5.68a.8.8 0 0 0-.41-.67zm2.01-3.02l-.14-.09-4.78-2.78a.78.78 0 0 0-.78 0L9.41 9.23V6.9a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zM8.3 12.86l-2.02-1.16a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08L8.7 5.46a.8.8 0 0 0-.4.68zm1.1-2.36l2.6-1.5 2.61 1.5v3l-2.6 1.5-2.61-1.5z" />
      </svg>
    ),
  },
  {
    name: "Python Core",
    sub: "Async Microservice",
    color: "#387EB8",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M11.87 2C6.88 2 7.19 4.16 7.19 4.16L7.2 6.4H12V7.12H5.2C2.4 7.12 2 8.78 2 11.66C2 14.88 3.73 14.9 3.73 14.9H5.2V12.75C5.2 10.3 7.3 10.3 7.3 10.3H12.1C14.53 10.3 14.53 7.9 14.53 7.9V4.53C14.53 2.16 11.87 2 11.87 2ZM9.34 3.42C9.75 3.42 10.08 3.75 10.08 4.16C10.08 4.57 9.75 4.9 9.34 4.9C8.93 4.9 8.6 4.57 8.6 4.16C8.6 3.75 8.93 3.42 9.34 3.42Z" fill="#387EB8" />
        <path d="M12.13 22C17.12 22 16.81 19.84 16.81 19.84L16.8 17.6H12V16.88H18.8C21.6 16.88 22 15.22 22 12.34C22 9.12 20.27 9.1 20.27 9.1H18.8V11.25C18.8 13.7 16.7 13.7 16.7 13.7H11.9C9.47 13.7 9.47 16.1 9.47 16.1V19.47C9.47 21.84 12.13 22 12.13 22ZM14.66 20.58C14.25 20.58 13.92 20.25 13.92 19.84C13.92 19.43 14.25 19.1 14.66 19.1C15.07 19.1 15.4 19.43 15.4 19.84C15.4 20.25 15.07 20.58 14.66 20.58Z" fill="#FFE052" />
      </svg>
    ),
  },
  {
    name: "Supabase DB",
    sub: "Vector & Realtime",
    color: "#3ECF8E",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M13.4 2.1C13.1 1.7 12.4 1.9 12.4 2.5L12 11.2H20.4C21.1 11.2 21.5 12.1 21 12.6L10.6 21.9C10.3 22.3 11 22.1 11 21.5L11.4 12.8H3C2.3 12.8 1.9 11.9 2.4 11.4L13.4 2.1Z" fill="#3ECF8E" />
      </svg>
    ),
  },
];

/* ─── Rotating Business Stack Nodes for Step 4 (Right: Official Vector Logos) ─── */
const businessStackTools = [
  {
    name: "HubSpot CRM",
    sub: "2-Way Lead Sync",
    color: "#FF7A59",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF7A59">
        <path d="M18.8 7.3V4.4a2 2 0 1 0-2.3 0v2.9a5.3 5.3 0 0 0-2.2 1.4L7.8 4.2a2.3 2.3 0 1 0-1.6 1.6l6.4 4.5a5.3 5.3 0 0 0 0 3.4l-6.4 4.5a2.3 2.3 0 1 0 1.6 1.6l6.5-4.5a5.3 5.3 0 1 0 4.5-8zM17.6 14.7a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z" />
      </svg>
    ),
  },
  {
    name: "Slack Ops",
    sub: "Instant Alert Feed",
    color: "#36C5F0",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M5.04 14.49a2.4 2.4 0 1 1-2.4-2.4h2.4v2.4zM6.24 14.49a2.4 2.4 0 0 1 4.8 0v6.01a2.4 2.4 0 1 1-4.8 0v-6.01z" fill="#E01E5A" />
        <path d="M9.51 5.04a2.4 2.4 0 1 1-2.4-2.4v2.4h2.4zM9.51 6.24a2.4 2.4 0 0 1 0 4.8H3.5a2.4 2.4 0 1 1 0-4.8h6.01z" fill="#36C5F0" />
        <path d="M18.96 9.51a2.4 2.4 0 1 1 2.4 2.4h-2.4v-2.4zM17.76 9.51a2.4 2.4 0 0 1-4.8 0V3.5a2.4 2.4 0 1 1 4.8 0v6.01z" fill="#2EB67D" />
        <path d="M14.49 18.96a2.4 2.4 0 1 1 2.4 2.4v-2.4h-2.4zM14.49 17.76a2.4 2.4 0 0 1 0-4.8h6.01a2.4 2.4 0 1 1 0 4.8h-6.01z" fill="#ECB22E" />
      </svg>
    ),
  },
  {
    name: "Stripe Billing",
    sub: "Verified Webhooks",
    color: "#635BFF",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#635BFF">
        <path d="M15.4 10.1c0-1.8-1.5-2.5-3.6-2.5-2.2 0-4.1.8-5.1 1.7L5.5 6.7C6.9 5.6 9.4 4.9 11.9 4.9c4.3 0 7.3 2.2 7.3 6.1 0 5.9-8.1 4.9-8.1 7.4 0 .9.8 1.4 2.2 1.4 2.2 0 4.5-.9 5.8-2l1.2 2.6c-1.6 1.4-4.4 2.2-7.1 2.2-4.5 0-7.6-2.3-7.6-6.1 0-6.1 8.1-5.1 8.1-7.4 0-.8-.7-1.3-1.9-1.3-.9 0-1.9.3-2.6.7l.8-2.3c.7-.2 1.4-.4 2.2-.4 2.1 0 3.2.7 3.2 2z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    sub: "Primary Database",
    color: "#336791",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#336791">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
];

/* ─── Dynamic 2-Line Clamped Description Component ───────────────────── */
function ClampedDescription({ text, isExpanded, onToggle }: { text: string; isExpanded: boolean; onToggle: () => void }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  // Default to true if text is more than ~115 characters (guaranteed 2+ lines)
  const [canExpand, setCanExpand] = useState(() => text.length > 115);

  useEffect(() => {
    const el = textRef.current;
    if (el && !isExpanded) {
      const isOverflowing = el.scrollHeight > el.clientHeight + 1;
      setCanExpand(isOverflowing || text.length > 115);
    }
  }, [text, isExpanded]);

  return (
    <div className="pt-2">
      <p
        ref={textRef}
        className={`text-sm sm:text-base leading-relaxed font-normal ${isExpanded ? "line-clamp-none" : "line-clamp-2"}`}
        style={{ color: "#b4e6c3d9" }}
      >
        {text}
      </p>
      {(canExpand || isExpanded) && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-2.5 text-xs font-mono font-bold text-[#D4FF00] hover:text-white transition-colors duration-200 inline-flex items-center gap-1 cursor-pointer select-none"
        >
          {isExpanded ? "See less ↑" : "See more ↓"}
        </button>
      )}
    </div>
  );
}

export function AutomationProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  /* ─── State for Expanding Line-Clamped Descriptions ─── */
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const toggleExpand = (stepId: string) => {
    setExpandedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  /* ─── State for Card 1: Auto-Checking Workflow ─── */
  const [checkedCount, setCheckedCount] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCheckedCount((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  /* ─── State for Card 3: Typing Code Effect ─── */
  const [displayedLineCount, setDisplayedLineCount] = useState(codeLines.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLineCount((prev) => {
        if (prev >= codeLines.length) return 3;
        return prev + 1;
      });
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  /* ─── State for Card 4: Rotating Logos & Live Bridge ─── */
  const [activeBridgeIndex, setActiveBridgeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBridgeIndex((prev) => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  /* ─── State for Card 5: Metrics Live Counter ─── */
  const [hoursSaved, setHoursSaved] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoursSaved((prev) => (prev >= 44 ? 36 : prev + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  /* ─── GSAP Scroll-driven Stacking Scale Animation ─── */
  useGSAP(() => {
    if (!cardsContainerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".process-stackingcard");
    if (!cards.length) return;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        const nextCard = cards[i + 1];
        gsap.to(card, {
          scale: 0.92 - (cards.length - 1 - i) * 0.012,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 65%",
            end: "top 30%",
            scrub: true,
            invalidateOnRefresh: false,
          },
        });
      }
    });
  }, { scope: sectionRef });

  const auditChecklist = [
    { label: "Lead Capture & Instant Routing", icon: ShieldIcon, detail: "Eliminate manual lead sorting" },
    { label: "Spreadsheet & Manual Data Entry", icon: RefreshIcon, detail: "Auto-sync to database in real-time" },
    { label: "Cross-Tool CRM Synchronization", icon: CpuIcon, detail: "HubSpot, Stripe & Notion unified" },
    { label: "Failure Recovery & Self-Healing", icon: FlashIcon, detail: "Zero data loss on API disconnects" },
  ];

  const steps = [
    {
      id: "step-1",
      stepNumber: "01",
      title: "01. Analyze Business",
      description:
        "We conduct a deep operational audit across your tools, identify spreadsheet bottlenecks and manual admin friction, and map out the exact high-ROI automation blueprint tailored to your company.",
    },
    {
      id: "step-2",
      stepNumber: "02",
      title: "02. Build Prototype",
      description:
        "Before writing production code, we build an interactive visual workflow prototype demonstrating the data logic, trigger flow, and AI decision routing for your team's immediate feedback.",
    },
    {
      id: "step-3",
      stepNumber: "03",
      title: "03. Build Solution",
      description:
        "Our engineers construct custom AI agents, n8n webhook pipelines, and robust Python microservices with automated retry logic, token security, and self-healing error handling.",
    },
    {
      id: "step-4",
      stepNumber: "04",
      title: "04. Implement In Your Business",
      description:
        "We deploy the automation engine seamlessly into your active tools—CRM, Slack, Stripe, databases, and staff portals—with zero downtime and 100% data integrity from day one.",
    },
    {
      id: "step-5",
      stepNumber: "05",
      title: "05. Save Time & Scale",
      description:
        "Your autonomous systems run 24/7 in the background, reclaiming 20–40+ hours per week for your team, eliminating human error, and scaling effortlessly as customer volume grows.",
    },
  ];

  return (
    <section ref={sectionRef} id="process" className="py-24 sm:py-32 bg-canvas border-t border-line scroll-mt-12 relative">
      <Container className="relative z-10">
        {/* Section Header (Without blinking dots) */}
        <AnimateOnScroll direction="up">
          <div className="max-w-3xl mb-14 sm:mb-20 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 r-pill bg-canvas-alt dark:bg-canvas-subtle border border-line text-xs font-mono font-bold text-ink mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-lime" />
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink font-heading leading-[1.15]">
              How We Automate Your Business in 5 Clear Steps
            </h2>
            <p className="text-base text-ink-muted leading-relaxed mt-3 font-normal">
              From discovering manual bottlenecks to deploying self-healing AI systems that save your team dozens of hours every week.
            </p>
          </div>
        </AnimateOnScroll>

        {/* ─── Stacking Cards Deck (Sticky Scroll Stack with r-md corners and even height) ─── */}
        <div ref={cardsContainerRef} className="process-stackingcards relative w-full space-y-16 sm:space-y-24 pb-4 sm:pb-6">
          {steps.map((step, idx) => {
            const isExpanded = !!expandedSteps[step.id];
            const topOffsetMobile = 90 + idx * 16;
            const topOffsetDesktop = 120 + idx * 24;

            return (
              <div
                key={step.id}
                className="process-stackingcard sticky w-full r-md overflow-hidden will-change-transform relative"
                style={{
                  top: `clamp(${topOffsetMobile}px, ${topOffsetDesktop}px, ${topOffsetDesktop}px)`,
                  backgroundColor: "rgba(21, 34, 20, 0.94)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  zIndex: idx + 10,
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.05), 0 25px 60px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Card Main Body: Split 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 p-6 sm:p-10 lg:p-12 items-start relative z-10">
                  
                  {/* Left Column: Title and Description directly connected with zero empty gap */}
                  <div className="lg:col-span-5 flex flex-col items-start space-y-3">
                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading leading-[1.2] text-white"
                      style={{ color: "#e5f0bec6" }}
                    >
                      {step.title}
                    </h3>

                    <ClampedDescription
                      text={step.description}
                      isExpanded={isExpanded}
                      onToggle={() => toggleExpand(step.id)}
                    />
                  </div>

                  {/* Right Column: Uniform Height Interactive Preview */}
                  <div className="lg:col-span-7">
                    
                    {/* Visual 1: Analyze Business (Diagnostic Radar & Live Checklist) */}
                    {idx === 0 && (
                      <div className="r-md bg-[#0D1811] p-5 sm:p-6 border border-white/15 shadow-xl h-[310px] sm:h-[320px] flex flex-col justify-between overflow-hidden">
                       

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-auto">
                          {/* Radar Left */}
                          <div className="sm:col-span-5 flex flex-col items-center justify-center text-center">
                            <div className="relative w-24 h-24 rounded-full border-2 border-lime/60 flex items-center justify-center bg-[#07110C] shadow-inner overflow-hidden">
                              <div className="absolute w-16 h-16 rounded-full border border-white/15" />
                              <div className="absolute w-10 h-10 rounded-full border border-white/10" />
                              <div className="absolute w-1.5 h-1.5 rounded-full bg-lime shadow-[0_0_8px_#D4FF00]" />

                              {/* Rotating Radar Sweeper */}
                              <div
                                className="absolute inset-0 origin-center animate-spin"
                                style={{
                                  animationDuration: "3s",
                                  background: "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(212,255,0,0.5) 360deg)",
                                }}
                              />
                            </div>
                            <span className="text-[11px] font-mono font-bold text-white/90 mt-2">
                              Analyzing Workflows..
                            </span>
                          </div>

                          {/* Auto Checklist Right */}
                          <div className="sm:col-span-7 space-y-1.5">
                            {auditChecklist.slice(0, 3).map((item, wIdx) => {
                              const isChecked = wIdx < checkedCount;
                              const IconComponent = item.icon;

                              return (
                                <div
                                  key={item.label}
                                  className={`p-2 r-sm border text-xs transition-all duration-300 ${
                                    isChecked
                                      ? "bg-[#14261C] text-white border-lime/60 shadow-xs"
                                      : "bg-white/[0.03] text-white/40 border-white/10"
                                  }`}
                                >
                                  <div className="flex items-center justify-between font-mono font-bold text-[11px]">
                                    <div className="flex items-center gap-1.5">
                                      <IconComponent size={13} className={isChecked ? "text-lime" : "text-white/40"} />
                                      <span className="truncate">{item.label}</span>
                                    </div>
                                    {isChecked ? (
                                      <CheckmarkCircleIcon size={14} className="text-lime shrink-0" />
                                    ) : (
                                      <span className="w-3 h-3 rounded-full border border-white/20 shrink-0" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 2: Build Prototype (n8n Design Language: Real Business Lead Qualification & Routing) */}
                    {idx === 1 && (
                      <div className="r-md bg-[#07100A]/40 p-2 sm:p-3 border border-white/15 shadow-xl h-[310px] sm:h-[320px] flex flex-col justify-center overflow-hidden relative">
                        {/* Dot Matrix Canvas Grid */}
                        <div className="absolute inset-0 pattern-matrix-dots opacity-50 pointer-events-none" />

                        {/* Interactive SVG Flow Canvas (100% Responsive - Zero Scrollbars) */}
                        <div className="relative w-full h-full flex items-center justify-center z-10 overflow-hidden">
                          <svg
                            viewBox="0 0 540 205"
                            className="w-full h-full max-h-[250px]"
                            style={{ overflow: "visible" }}
                          >
                            <defs>
                              <style>{`
                                @keyframes flowDash {
                                  0% { stroke-dashoffset: 16; }
                                  100% { stroke-dashoffset: 0; }
                                }
                                .n8n-flow {
                                  stroke-dasharray: 4, 4;
                                  animation: flowDash 1.2s linear infinite;
                                }
                                @keyframes spinSlow {
                                  0% { transform: rotate(0deg); }
                                  100% { transform: rotate(360deg); }
                                }
                                .spin-slow {
                                  animation: spinSlow 12s linear infinite;
                                }
                                @keyframes pulseGlow {
                                  0%, 100% { opacity: 0.75; transform: scale(1); }
                                  50% { opacity: 1; transform: scale(1.15); }
                                }
                                .pulse-glow {
                                  animation: pulseGlow 2.2s ease-in-out infinite;
                                }
                                @keyframes twinkleStar {
                                  0%, 100% { transform: scale(0.85) rotate(0deg); opacity: 0.7; }
                                  50% { transform: scale(1.3) rotate(90deg); opacity: 1; }
                                }
                                .twinkle-star {
                                  animation: twinkleStar 2.2s ease-in-out infinite;
                                }
                                @keyframes radarScan {
                                  0% { transform: rotate(0deg); }
                                  100% { transform: rotate(360deg); }
                                }
                                .radar-scan {
                                  animation: radarScan 4s linear infinite;
                                }
                                @keyframes filterDrop {
                                  0% { transform: translateY(-2px); opacity: 0; }
                                  50% { opacity: 1; }
                                  100% { transform: translateY(4px); opacity: 0; }
                                }
                                .filter-drop {
                                  animation: filterDrop 1.8s ease-in-out infinite;
                                }
                              `}</style>
                            </defs>

                            {/* ─── Animated Yellow/Lime Dashed Splines ─── */}
                            {/* Path 1: Trigger -> Top HubSpot DB */}
                            <path
                              d="M 56 76 C 85 76, 85 35, 115 35"
                              fill="none"
                              stroke="#d4ff0083"
                              strokeWidth="1"
                              className="n8n-flow"
                            />
                            {/* Path 2: HubSpot DB -> Enrich Node */}
                            <path
                              d="M 159 35 L 205 35"
                              fill="none"
                              stroke="#d4ff0083"
                              strokeWidth="1"
                              className="n8n-flow"
                            />
                            {/* Path 3: Enrich Node -> Filter */}
                            <path
                              d="M 249 35 C 275 35, 275 76, 295 76"
                              fill="none"
                              stroke="#d4ff0083"
                              strokeWidth="1"
                              className="n8n-flow"
                            />

                            {/* Path 4: Trigger -> Bottom Stripe DB */}
                            <path
                              d="M 56 76 C 85 76, 85 118, 115 118"
                              fill="none"
                              stroke="#d4ff0083"
                              strokeWidth="1"
                              className="n8n-flow"
                            />
                            {/* Path 5: Stripe DB -> Verify Node */}
                            <path
                              d="M 159 118 L 205 118"
                              fill="none"
                              stroke="#d4ff0083"
                              strokeWidth="1"
                              className="n8n-flow"
                            />
                            {/* Path 6: Verify Node -> Filter */}
                            <path
                              d="M 249 118 C 275 118, 275 76, 295 76"
                              fill="none"
                              stroke="#d4ff0083"
                              strokeWidth="1"
                              className="n8n-flow"
                            />

                            {/* Path 7: Filter -> AI Agent (with Kept Badge) */}
                            <path
                              d="M 339 76 L 395 76"
                              fill="none"
                              stroke="#d4ff0083"
                              strokeWidth="1"
                              className="n8n-flow"
                            />

                            {/* Path 8: AI Agent -> OpenRouter GPT-4o Model */}
                            <path
                              d="M 445 96 C 445 120, 455 120, 455 140"
                              fill="none"
                              stroke="#d4ff0083"
                              strokeWidth="1"
                              className="n8n-flow"
                            />

                            {/* ─── Node Ports (Lime Circles) ─── */}
                            <circle cx="56" cy="76" r="3" fill="#d4ff0083" />
                            <circle cx="115" cy="35" r="2.5" fill="#d4ff0083" />
                            <circle cx="159" cy="35" r="2.5" fill="#d4ff0083" />
                            <circle cx="205" cy="35" r="2.5" fill="#d4ff0083" />
                            <circle cx="249" cy="35" r="2.5" fill="#cad78983" />
                            <circle cx="115" cy="118" r="2.5" fill="#d4ff0083" />
                            <circle cx="159" cy="118" r="2.5" fill="#d4ff0083" />
                            <circle cx="205" cy="118" r="2.5" fill="#d4ff0083" />
                            <circle cx="249" cy="118" r="2.5" fill="#d4ff0083" />
                            <circle cx="295" cy="76" r="3" fill="#d4ff0083" />
                            <circle cx="339" cy="76" r="3" fill="#d4ff0083" />
                            <circle cx="395" cy="76" r="3" fill="#d4ff0083" />
                            <circle cx="445" cy="96" r="2.5" fill="#d4ff0083" />
                            <circle cx="455" cy="140" r="2.5" fill="#d4ff0083" />

                            {/* ─── 1. Trigger Node (Left Pill: Inbound Webhook with Pulse) ─── */}
                            <g transform="translate(8, 55)">
                              <rect width="48" height="42" rx="6" fill="#3447694c" stroke="#3A4858" strokeWidth="1.2" />
                              {/* Webhook Lightning Badge */}
                              <rect x="14" y="9" width="20" height="20" rx="4" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1" />
                              <g className="pulse-glow" style={{ transformOrigin: "24px 19px" }}>
                                <path d="M 25 12 L 20 20 L 24 20 L 22 26 L 29 18 L 25 18 Z" fill="#F59E0B" />
                              </g>
                              <text x="24" y="52" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
                                Inbound Webhook
                              </text>
                              <text x="24" y="60" fontSize="6" fill="#94A3B8" textAnchor="middle">
                                &apos;new_lead_event&apos;
                              </text>
                            </g>

                            {/* ─── 2. Top Branch Node 1: HubSpot CRM (Official Sprocket Logo) ─── */}
                            <g transform="translate(115, 15)">
                              <rect width="44" height="40" rx="5" fill="#3447694c" stroke="#3A4858" strokeWidth="1.2" />
                              {/* HubSpot Sprocket Badge */}
                              <rect x="13" y="9" width="18" height="18" rx="3.5" fill="#FF7A59" />
                              {/* Top Dot & Spoke */}
                              <circle cx="22" cy="13" r="1.5" fill="#FFFFFF" />
                              <line x1="22" y1="13" x2="22" y2="18" stroke="#FFFFFF" strokeWidth="1.3" />
                              {/* Top-Right Dot & Spoke */}
                              <circle cx="26.5" cy="15" r="1.5" fill="#FFFFFF" />
                              <line x1="22" y1="18" x2="26.5" y2="15" stroke="#FFFFFF" strokeWidth="1.3" />
                              {/* Center Hub with subtle pulse */}
                              <circle cx="22" cy="18" r="2.6" fill="#FFFFFF" className="pulse-glow" style={{ transformOrigin: "22px 18px" }} />
                              {/* Bottom Spoke */}
                              <circle cx="22" cy="23" r="1.2" fill="#FFFFFF" />
                              <line x1="22" y1="18" x2="22" y2="23" stroke="#FFFFFF" strokeWidth="1.3" />

                              <text x="22" y="49" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
                                HubSpot CRM
                              </text>
                              <text x="22" y="57" fontSize="6" fill="#64748B" textAnchor="middle">
                                get: contact_info
                              </text>
                            </g>

                            {/* ─── 3. Top Branch Node 2: Enrich Company (Clearbit / Entity Data with Twinkle Star) ─── */}
                            <g transform="translate(205, 15)">
                              <rect width="44" height="40" rx="5" fill="#3447694c" stroke="#3A4858" strokeWidth="1.2" />
                              {/* Blue Data Enrich Badge */}
                              <rect x="13" y="9" width="18" height="18" rx="3.5" fill="#1D4ED8" />
                              {/* Building Silhouette */}
                              <path d="M 17 24 L 17 16 L 22 13 L 27 16 L 27 24 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
                              <rect x="19" y="17" width="2" height="2" fill="#FFFFFF" />
                              <rect x="23" y="17" width="2" height="2" fill="#FFFFFF" />
                              <rect x="19" y="20.5" width="2" height="2" fill="#FFFFFF" />
                              <rect x="23" y="20.5" width="2" height="2" fill="#FFFFFF" />
                              {/* Neon Sparkle on top with Twinkle Animation */}
                              <g className="twinkle-star" style={{ transformOrigin: "26px 13px" }}>
                                <path d="M 26 10 L 27 12 L 29 13 L 27 14 L 26 16 L 25 14 L 23 13 L 25 12 Z" fill="#D4FF00" />
                              </g>
                              
                              <text x="22" y="49" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
                                Enrich Company
                              </text>
                              <text x="22" y="57" fontSize="6" fill="#64748B" textAnchor="middle">
                                clearbit / api
                              </text>
                            </g>

                            {/* ─── 4. Bottom Branch Node 1: Stripe Billing (Official Stripe S Logo) ─── */}
                            <g transform="translate(115, 98)">
                              <rect width="44" height="40" rx="5" fill="#3447694c" stroke="#3A4858" strokeWidth="1.2" />
                              {/* Stripe Purple Badge */}
                              <rect x="13" y="9" width="18" height="18" rx="3.5" fill="#6366F1" />
                              {/* Authentic Vector Stripe 'S' */}
                              <path
                                d="M 24.5 13 C 23.8 12.4 23 12.2 21.8 12.2 C 19.6 12.2 18.5 13.3 18.5 14.8 C 18.5 17.8 23.2 16.9 23.2 18.8 C 23.2 19.6 22.4 20.1 21.3 20.1 C 20.2 20.1 19.1 19.6 18.4 18.9 L 18 20.6 C 18.8 21.3 20.1 21.8 21.4 21.8 C 23.8 21.8 25 20.6 25 19 C 25 15.8 20.3 16.7 20.3 14.9 C 20.3 14.2 21 13.7 21.9 13.7 C 22.8 13.7 23.6 14.1 24.2 14.6 Z"
                                fill="#FFFFFF"
                              />
                             
                              <text x="22" y="49" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
                                Stripe Billing
                              </text>
                              <text x="22" y="57" fontSize="6" fill="#64748B" textAnchor="middle">
                                read: history
                              </text>
                            </g>

                            {/* ─── 5. Bottom Branch Node 2: Verify Domain (DNS & Radar Sweep) ─── */}
                            <g transform="translate(205, 98)">
                              <rect width="44" height="40" rx="5" fill="#3447694c" stroke="#3A4858" strokeWidth="1.2" />
                              {/* Emerald Verified Domain Badge */}
                              <rect x="13" y="9" width="18" height="18" rx="3.5" fill="#059669" />
                              {/* Globe Grid */}
                              <circle cx="22" cy="18" r="5.5" fill="none" stroke="#FFFFFF" strokeWidth="1.1" />
                              <line x1="16.5" y1="18" x2="27.5" y2="18" stroke="#FFFFFF" strokeWidth="0.9" />
                              <ellipse cx="22" cy="18" rx="2.5" ry="5.5" fill="none" stroke="#FFFFFF" strokeWidth="0.9" />
                              {/* Animated Radar Scanning Line */}
                              <g className="radar-scan" style={{ transformOrigin: "22px 18px" }}>
                                <line x1="22" y1="18" x2="27.5" y2="18" stroke="#D4FF00" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
                              </g>
                              {/* Verified Checkmark Badge */}
                              <circle cx="26" cy="22" r="2.8" fill="#10B981" stroke="#07100A" strokeWidth="0.8" />
                              <path d="M 24.8 22 L 25.6 23 L 27.2 21.2" fill="none" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                              
                              <text x="22" y="49" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
                                Verify Domain
                              </text>
                              <text x="22" y="57" fontSize="6" fill="#64748B" textAnchor="middle">
                                dns: secure
                              </text>
                            </g>

                            {/* ─── 6. Merge Node: Lead Filter (with Animated Particle Drop) ─── */}
                            <g transform="translate(295, 55)">
                              <rect width="44" height="42" rx="5" fill="#3447694c" stroke="#3A4858" strokeWidth="1.2" />
                              {/* Filter Funnel Icon */}
                              <rect x="13" y="10" width="18" height="18" rx="3.5" fill="#0284C7" fillOpacity="0.25" stroke="#0284C7" strokeWidth="1" />
                              <polygon points="17 14, 27 14, 23.5 19, 23.5 23, 20.5 22, 20.5 19" fill="#38BDF8" />
                              <line x1="17" y1="14" x2="27" y2="14" stroke="#FFFFFF" strokeWidth="1" />
                              {/* Animated Filtering Flow Dot */}
                              <circle cx="22" cy="20" r="1.2" fill="#D4FF00" className="filter-drop" />
                              
                              <text x="22" y="51" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
                                Lead Filter
                              </text>
                              <text x="22" y="59" fontSize="6" fill="#64748B" textAnchor="middle">
                                score: &gt;= 80
                              </text>
                            </g>

                            {/* Kept Badge Pill on Connector Line */}
                            <g transform="translate(352, 68)">
                              <rect width="28" height="15" rx="3" fill="#0E1726" stroke="#334155" strokeWidth="1" />
                              <text x="14" y="11" fontSize="7" fill="#D4FF00" fontWeight="bold" textAnchor="middle">
                                Kept
                              </text>
                            </g>

                            {/* ─── 7. Wide AI Agent Node (Glowing Neon Eyes) ─── */}
                            <g transform="translate(395, 48)">
                              <rect width="105" height="48" rx="6" fill="#3447694c" stroke="#3A4858" strokeWidth="1.2" />
                              {/* Vector Bot / Neural Agent Badge */}
                              <g transform="translate(11, 13)">
                                <rect x="0" y="0" width="20" height="20" rx="4" fill="#6366F1" fillOpacity="0.25" stroke="#818CF8" strokeWidth="1" />
                                <rect x="3.5" y="6" width="13" height="10" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
                                <circle cx="10" cy="3" r="1.3" fill="#D4FF00" className="pulse-glow" style={{ transformOrigin: "10px 3px" }} />
                                <line x1="10" y1="4.3" x2="10" y2="6" stroke="#FFFFFF" strokeWidth="1.1" />
                                <circle cx="7.5" cy="10.5" r="1.2" fill="#D4FF00" className="pulse-glow" style={{ transformOrigin: "7.5px 10.5px" }} />
                                <circle cx="12.5" cy="10.5" r="1.2" fill="#D4FF00" className="pulse-glow" style={{ transformOrigin: "12.5px 10.5px" }} />
                                <line x1="7.5" y1="13" x2="12.5" y2="13" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
                              </g>
                              <text x="37" y="27" fontSize="10.5" fill="#FFFFFF" fontWeight="bold">AI Agent</text>
                              <text x="18" y="43" fontSize="6" fill="#94A3B8">Chat Model*</text>
                              <text x="66" y="43" fontSize="6" fill="#94A3B8">Memory Tool</text>
                            </g>

                            {/* ─── 8. Bottom Sub-Node: OpenRouter Chat Model (Authentic Animated OpenAI Rosette) ─── */}
                            <g transform="translate(438, 140)">
                              <circle cx="17" cy="17" r="16" fill="#3447694c" stroke="#3A4858" strokeWidth="1.2" />
                              {/* Animated OpenAI Spiral Rosette Geometry */}
                              <g className="spin-slow" style={{ transformOrigin: "17px 17px" }}>
                                <circle cx="17" cy="17" r="10" fill="#10B981" fillOpacity="0.18" />
                                {[0, 60, 120, 180, 240, 300].map((deg) => (
                                  <path
                                    key={deg}
                                    d="M 17 9.5 C 18.2 9.5 19.3 10.1 19.8 11.1 L 21.2 13.5 C 21.7 14.4 21.7 15.6 21.2 16.5 L 18.2 21.6"
                                    fill="none"
                                    stroke="#10B981"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                    transform={`rotate(${deg} 17 17)`}
                                  />
                                ))}
                                <circle cx="17" cy="17" r="2.2" fill="#D4FF00" />
                              </g>
                              <text x="17" y="42" fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
                                GPT-4o Router
                              </text>
                              <text x="17" y="50" fontSize="6.5" fill="#D4FF00" textAnchor="middle">
                                deepseek / gpt-4o
                              </text>
                            </g>
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Visual 3: Build Solution (Python IDE Code Editor) */}
                    {idx === 2 && (
                      <div className="r-md bg-[#07110C] text-slate-100 border border-white/15 overflow-hidden shadow-xl h-[310px] sm:h-[320px] flex flex-col justify-between">
                        {/* IDE Titlebar */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#101C14] border-b border-white/10 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                          </div>
                          <span className="text-[11px] font-mono text-white/80 font-bold">custom_ai_engine.py</span>
                          <p>
                     
                          </p>
                        </div>

                        <div className="flex flex-1 overflow-hidden">
                          {/* Mini Sidebar */}
                          <div className="w-9 bg-[#0B140E] border-r border-white/10 flex flex-col items-center py-3 gap-3 text-white/40">
                            <FileIcon size={14} className="text-lime" />
                            <SearchIcon size={14} />
                            <SettingsIcon size={14} />
                          </div>

                          {/* Code Editor Area */}
                          <div className="p-3.5 font-mono text-[11px] leading-relaxed flex-1 overflow-x-auto">
                            {codeLines.slice(0, displayedLineCount).map((line, lIdx) => (
                              <div key={lIdx} className="flex gap-3">
                                <span className="text-white/30 select-none w-3 text-right">{lIdx + 1}</span>
                                <span className="text-white font-medium">
                                  {line.startsWith("@") ? (
                                    <span className="text-[#38BDF8] font-bold">{line}</span>
                                  ) : line.startsWith("async") || line.startsWith("return") ? (
                                    <span className="text-[#C084FC] font-bold">{line}</span>
                                  ) : line.includes("#") ? (
                                    <span className="text-white/40 italic">{line}</span>
                                  ) : line.includes('"') ? (
                                    <span className="text-[#86EFAC]">{line}</span>
                                  ) : (
                                    line
                                  )}
                                </span>
                              </div>
                            ))}
                            <span className="inline-block w-2 h-3.5 bg-lime ml-5" />
                          </div>
                        </div>

                        {/* Status Footer */}
                        <div className="px-4 py-2 bg-[#0C1710] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/60">
                          <span className="flex items-center gap-1.5 text-lime font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                            Self-Healing Triggers Active
                          </span>
                          <span>Zero-Downtime Engine</span>
                        </div>
                      </div>
                    )}

                    {/* Visual 4: Implement In Your Business (Sleek Ecosystem Bridge with Clean Authentic Logos & Smooth Streams) */}
                    {idx === 3 && (() => {
                      const currentAi = aiEngineTools[activeBridgeIndex];
                      const currentBiz = businessStackTools[activeBridgeIndex];

                      return (
                        <div className="r-md bg-[#0D1811] p-5 sm:p-6 border border-white/15 shadow-xl h-[310px] sm:h-[320px] flex flex-col justify-between overflow-hidden relative">
                          {/* Clean, Non-Harsh CSS Keyframes */}
                          <style>{`
                            @keyframes dataBeamPulse {
                              0% { transform: translateX(-100%); opacity: 0; }
                              20% { opacity: 0.8; }
                              80% { opacity: 0.8; }
                              100% { transform: translateX(280%); opacity: 0; }
                            }
                            @keyframes packetTravel {
                              0% { left: 0%; opacity: 0; }
                              15% { opacity: 0.9; }
                              85% { opacity: 0.9; }
                              100% { left: 100%; opacity: 0; }
                            }
                            @keyframes iconSwapPop {
                              0% { opacity: 0; transform: scale(0.75); }
                              100% { opacity: 1; transform: scale(1); }
                            }
                            @keyframes textFadeSlide {
                              0% { opacity: 0; transform: translateY(3px); }
                              100% { opacity: 1; transform: translateY(0); }
                            }
                          `}</style>

                          {/* Top Header */}
                          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                            <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                              <CpuIcon size={14} className="text-lime" />
                              Live Ecosystem Integration Bridge
                            </span>
                          </div>

                          {/* Neural Pipeline Visual (Clean & Eye-Friendly) */}
                          <div className="r-sm bg-[#07110C] p-4 border border-white/10 flex items-center justify-between relative overflow-hidden my-auto">
                            {/* Left Node: AI Core (Proper Brand Logo) */}
                            <div className="flex flex-col items-center gap-1.5 z-10 w-24 sm:w-28 shrink-0">
                              <div className="relative">
                                {/* Subtle Border Indicator */}
                                <div
                                  className="relative w-12 h-12 rounded-full bg-[#101F16] border flex items-center justify-center shadow-md transition-colors duration-300"
                                  style={{ borderColor: `${currentAi.color}60` }}
                                >
                                  <div
                                    key={`ai-icon-${activeBridgeIndex}`}
                                    className="flex items-center justify-center"
                                    style={{ animation: "iconSwapPop 0.35s ease-out forwards" }}
                                  >
                                    {currentAi.icon}
                                  </div>
                                </div>
                              </div>

                              <div className="text-center h-[28px] flex flex-col justify-center">
                                <span
                                  key={`ai-name-${activeBridgeIndex}`}
                                  className="text-[10px] font-mono font-extrabold text-white block truncate"
                                  style={{ animation: "textFadeSlide 0.3s ease-out forwards" }}
                                >
                                  {currentAi.name}
                                </span>
                                <span
                                  key={`ai-sub-${activeBridgeIndex}`}
                                  className="text-[8.5px] font-mono text-white/60 block truncate"
                                  style={{ animation: "textFadeSlide 0.3s ease-out forwards" }}
                                >
                                  {currentAi.sub}
                                </span>
                              </div>
                            </div>

                            {/* Middle Data Pipes (Smooth, Eye-Pleasing Fiber Streams) */}
                            <div className="flex-1 px-3 sm:px-5 flex flex-col gap-2.5 relative my-auto overflow-hidden">
                              {[
                                { delay: "0s", dur: "1.4s", packetDur: "1.4s" },
                                { delay: "0.45s", dur: "1.1s", packetDur: "1.1s" },
                                { delay: "0.9s", dur: "1.6s", packetDur: "1.6s" },
                              ].map((pipe, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="relative h-1.5 bg-[#050C07] border border-white/10 rounded-full overflow-hidden"
                                >
                                  {/* Soft Gradient Stream Beam */}
                                  <div
                                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-lime/60 to-transparent"
                                    style={{
                                      animation: `dataBeamPulse ${pipe.dur} linear infinite`,
                                      animationDelay: pipe.delay,
                                    }}
                                  />

                                  {/* Subtle Traveling Data Packet Dot */}
                                  <div
                                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-lime/90"
                                    style={{
                                      animation: `packetTravel ${pipe.packetDur} ease-in-out infinite`,
                                      animationDelay: pipe.delay,
                                    }}
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Right Node: Your Tech Stack (Proper Brand Logo) */}
                            <div className="flex flex-col items-center gap-1.5 z-10 w-24 sm:w-28 shrink-0">
                              <div className="relative">
                                {/* Subtle Border Indicator */}
                                <div
                                  className="relative w-12 h-12 rounded-full bg-[#101F16] border flex items-center justify-center shadow-md transition-colors duration-300"
                                  style={{ borderColor: `${currentBiz.color}60` }}
                                >
                                  <div
                                    key={`biz-icon-${activeBridgeIndex}`}
                                    className="flex items-center justify-center"
                                    style={{ animation: "iconSwapPop 0.35s ease-out forwards" }}
                                  >
                                    {currentBiz.icon}
                                  </div>
                                </div>
                              </div>

                              <div className="text-center h-[28px] flex flex-col justify-center">
                                <span
                                  key={`biz-name-${activeBridgeIndex}`}
                                  className="text-[10px] font-mono font-extrabold text-white block truncate"
                                  style={{ animation: "textFadeSlide 0.3s ease-out forwards" }}
                                >
                                  {currentBiz.name}
                                </span>
                                <span
                                  key={`biz-sub-${activeBridgeIndex}`}
                                  className="text-[8.5px] font-mono text-white/60 block truncate"
                                  style={{ animation: "textFadeSlide 0.3s ease-out forwards" }}
                                >
                                  {currentBiz.sub}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Live Telemetry Status Row */}
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="p-2.5 r-sm bg-[#0E1B13] border border-white/10 flex items-center justify-between">
                              <div>
                                <div className="text-[10px] font-mono text-white/50 uppercase">Deploy Status</div>
                                <div className="text-xs font-black font-mono text-lime">Zero Downtime</div>
                              </div>
                              <CheckmarkCircleIcon size={15} className="text-lime" />
                            </div>

                            <div className="p-2.5 r-sm bg-[#0E1B13] border border-white/10 flex items-center justify-between">
                              <div>
                                <div className="text-[10px] font-mono text-white/50 uppercase">API Latency</div>
                                <div className="text-xs font-black font-mono text-white">
                                  {[12, 8, 14, 6][activeBridgeIndex]}ms Average
                                </div>
                              </div>
                              <FlashIcon size={15} className="text-lime" />
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Visual 5: Save Time & Scale (Live Time-Savings & ROI Impact Dashboard) */}
                    {idx === 4 && (
                      <div className="r-md bg-[#0D1811] p-5 sm:p-6 border border-white/15 shadow-xl h-[310px] sm:h-[320px] flex flex-col justify-between overflow-hidden">
                        <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                          <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                            <ArrowUpIcon size={14} className="text-lime" />
                            ROI & Time Saved Telemetry
                          </span>
                          <span className="text-[10px] font-mono text-lime bg-lime/10 px-2 py-0.5 r-xs border border-lime/30 font-bold">
                            24/7 Autonomous
                          </span>
                        </div>

                        {/* 2 Big Stat Cards */}
                        <div className="grid grid-cols-2 gap-3 my-auto">
                          <div className="p-3.5 r-sm bg-[#08120B] border border-lime/30 flex flex-col justify-between shadow-inner">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Weekly Time Saved</span>
                            <div className="text-xl sm:text-2xl font-black font-mono text-lime my-1">
                              {hoursSaved}+ hrs
                            </div>
                            <span className="text-[10px] text-slate-400 font-sans">Automated spreadsheet & admin</span>
                          </div>

                          <div className="p-3.5 r-sm bg-[#08120B] border border-white/15 flex flex-col justify-between shadow-inner">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Monthly Added Value</span>
                            <div className="text-xl sm:text-2xl font-black font-mono text-white my-1">
                              +$18.4k
                            </div>
                            <span className="text-[10px] text-slate-400 font-sans">Eliminated human friction</span>
                          </div>
                        </div>

                        {/* Meaningful Telemetry Footer */}
                        <div className="p-2.5 r-sm bg-[#0E1B13] border border-white/10 flex items-center justify-between text-xs font-mono">
                          <span className="text-white/80 font-bold text-[11px]">Self-Healing Runtime Active</span>
                          <span className="text-lime font-bold text-[11px]">100% Zero-Loss</span>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
