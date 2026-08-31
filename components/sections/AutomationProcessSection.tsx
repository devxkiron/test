"use client";

import { useState, useEffect } from "react";
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
} from "@/components/icons";

/* ─── Code Snippet for Step 2 Typing Effect ─────────────────────────── */
const codeLines = [
  'if value > self.threshold:',
  '    self.status = "active"',
  '    return "Automation triggered!"',
  'else:',
  '    return "No action taken."',
  'def get_status(self):',
  '    return f"Status: {self.status}"',
];

export function AutomationProcessSection() {
  /* ─── State for Card 1: Auto-Checking Workflow ─── */
  const [checkedCount, setCheckedCount] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCheckedCount((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  /* ─── State for Card 2: Typing Code Effect ─── */
  const [displayedLineCount, setDisplayedLineCount] = useState(codeLines.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLineCount((prev) => {
        if (prev >= codeLines.length) return 2;
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ─── State for Card 4: Metrics Live Counter ─── */
  const [efficiency, setEfficiency] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setEfficiency((prev) => (prev >= 35 ? 18 : prev + 2));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const workflowItems = [
    { label: "System check", icon: ShieldIcon },
    { label: "Process check", icon: CpuIcon },
    { label: "Speed check", icon: FlashIcon },
    { label: "Manual work", icon: RefreshIcon },
    { label: "Repetitive task", icon: RefreshIcon },
  ];

  return (
    <section id="process" className="py-24 sm:py-32 bg-canvas border-t border-line pattern-dots">
      <Container>
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 r-pill bg-canvas-alt dark:bg-canvas-subtle border border-line text-xs font-mono font-bold text-ink mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              Automation Framework
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink font-heading leading-[1.15]">
              We design, develop, and implement automation tools that help you work smarter, not harder
            </h2>
          </div>
        </AnimateOnScroll>

        {/* 2x2 Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

          {/* ─── Card 1: Step 1 - Smart Analyzing ─── */}
          <AnimateOnScroll direction="left" delay={0}>
            <div className="skewElem r-lg bg-white dark:bg-canvas-alt/70 border-2 border-line hover:border-ink transition-all duration-300 p-7 sm:p-9 shadow-sm flex flex-col justify-between h-full">
              <div>
                <span className="inline-block px-3 py-1 r-sm bg-canvas-alt dark:bg-canvas-subtle text-xs font-mono font-bold text-ink mb-3 border border-line">
                  Step 1
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink font-heading mb-3">
                  Smart Analyzing
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-6 font-normal">
                  We assess your needs and identify AI solutions to streamline workflows and improve efficiency.
                </p>
              </div>

              {/* Visual Box: Radar + Auto Checklist */}
              <div className="r-md bg-canvas-alt/70 dark:bg-canvas-subtle/50 p-5 border border-line grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Radar Left */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 text-center">
                  <div className="relative w-28 h-28 rounded-full border-2 border-lime/60 flex items-center justify-center bg-canvas shadow-inner overflow-hidden">
                    {/* Concentric rings */}
                    <div className="absolute w-20 h-20 rounded-full border border-line" />
                    <div className="absolute w-12 h-12 rounded-full border border-line" />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-lime" />

                    {/* Rotating Radar Sweeper */}
                    <div
                      className="absolute inset-0 origin-center animate-spin"
                      style={{
                        animationDuration: "3s",
                        background: "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(212,255,0,0.5) 360deg)",
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-ink mt-3">
                    Analyzing workflow..
                  </span>
                </div>

                {/* Auto Checklist Right */}
                <div className="sm:col-span-7 space-y-2">
                  {workflowItems.map((item, idx) => {
                    const isChecked = idx < checkedCount;
                    const IconComponent = item.icon;

                    return (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between px-3 py-2 r-sm border text-xs font-mono font-bold transition-all duration-300 ${
                          isChecked
                            ? "bg-white dark:bg-canvas text-ink border-lime shadow-xs scale-102"
                            : "bg-canvas/50 text-ink-muted/60 border-line/60"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent size={14} className="text-ink shrink-0" />
                          <span>{item.label}</span>
                        </div>

                        {isChecked ? (
                          <CheckmarkCircleIcon size={16} className="text-emerald-600 dark:text-lime shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-line shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ─── Card 2: Step 2 - AI Development ─── */}
          <AnimateOnScroll direction="right" delay={100}>
            <div className="skewElem r-lg bg-white dark:bg-canvas-alt/70 border-2 border-line hover:border-ink transition-all duration-300 p-7 sm:p-9 shadow-sm flex flex-col justify-between h-full">
              <div>
                <span className="inline-block px-3 py-1 r-sm bg-canvas-alt dark:bg-canvas-subtle text-xs font-mono font-bold text-ink mb-3 border border-line">
                  Step 2
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink font-heading mb-3">
                  AI Development
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-6 font-normal">
                  Our team builds intelligent automation systems tailored to your business processes.
                </p>
              </div>

              {/* Visual Box: Code IDE Window */}
              <div className="r-md bg-[#0D140F] text-slate-100 border-2 border-line/40 overflow-hidden shadow-md">
                {/* IDE Titlebar */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-[#14221A] border-b border-white/10 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-[11px] font-mono text-white/70">automation_engine.py</span>
                  <span className="text-[10px] font-mono text-lime">Python 3.12</span>
                </div>

                <div className="flex">
                  {/* Mini Sidebar */}
                  <div className="w-9 bg-[#111813] border-r border-white/10 flex flex-col items-center py-3 gap-3 text-white/50">
                    <FileIcon size={14} className="text-lime" />
                    <SearchIcon size={14} />
                    <SettingsIcon size={14} />
                  </div>

                  {/* Code Editor Area */}
                  <div className="p-4 font-mono text-[11px] leading-relaxed flex-1 overflow-x-auto min-h-[190px] h-[190px]">
                    {codeLines.slice(0, displayedLineCount).map((line, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-white/30 select-none w-3 text-right">{i + 1}</span>
                        <span className="text-white font-medium">
                          {line.startsWith("if") || line.startsWith("else") || line.startsWith("def") ? (
                            <span className="text-[#C084FC] font-bold">{line}</span>
                          ) : line.includes('"') ? (
                            <span className="text-[#86EFAC]">{line}</span>
                          ) : (
                            line
                          )}
                        </span>
                      </div>
                    ))}
                    <span className="inline-block w-2 h-3.5 bg-lime ml-5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ─── Card 3: Step 3 - Seamless Integration ─── */}
          <AnimateOnScroll direction="left" delay={200}>
            <div className="skewElem r-lg bg-white dark:bg-canvas-alt/70 border-2 border-line hover:border-ink transition-all duration-300 p-7 sm:p-9 shadow-sm flex flex-col justify-between h-full">
              <div>
                <span className="inline-block px-3 py-1 r-sm bg-canvas-alt dark:bg-canvas-subtle text-xs font-mono font-bold text-ink mb-3 border border-line">
                  Step 3
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink font-heading mb-3">
                  Seamless Integration
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-6 font-normal">
                  We smoothly integrate AI solutions into your existing infrastructure with minimal disruption.
                </p>
              </div>

              {/* Visual Box: Neural Pipeline Flow */}
              <div className="r-md bg-canvas-alt/70 dark:bg-canvas-subtle/50 p-6 border border-line flex items-center justify-between relative overflow-hidden">
                {/* Left Node: Our Solution */}
                <div className="flex flex-col items-center gap-2 z-10">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#14221A] to-[#243B2E] border-2 border-lime flex items-center justify-center shadow-lg animate-float">
                    <FlashIcon className="w-8 h-8 text-lime" />
                  </div>
                  <span className="text-xs font-mono font-extrabold text-ink">Our solution</span>
                </div>

                {/* Animated Connecting Pipes */}
                <div className="flex-1 px-4 flex flex-col gap-2.5 relative">
                  {[1, 2, 3].map((pipe) => (
                    <div key={pipe} className="relative h-1 bg-line rounded-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-lime to-transparent w-1/2 animate-marquee"
                        style={{ animationDuration: `${1.2 + pipe * 0.4}s` }}
                      />
                    </div>
                  ))}
                  <div className="text-[10px] font-mono font-bold text-center text-emerald-700 dark:text-lime mt-1 flex items-center justify-center gap-1.5">
                    <FlashIcon className="w-3.5 h-3.5 text-lime shrink-0" />
                    <span>Live 14ms API Bridge</span>
                  </div>
                </div>

                {/* Right Node: Your Stack */}
                <div className="flex flex-col items-center gap-2 z-10">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-black border-2 border-ink flex items-center justify-center shadow-lg">
                    <CpuIcon className="w-8 h-8 text-ink" />
                  </div>
                  <span className="text-xs font-mono font-extrabold text-ink">Your stack</span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ─── Card 4: Step 4 - Continuous Optimization ─── */}
          <AnimateOnScroll direction="right" delay={300}>
            <div className="skewElem r-lg bg-white dark:bg-canvas-alt/70 border-2 border-line hover:border-ink transition-all duration-300 p-7 sm:p-9 shadow-sm flex flex-col justify-between h-full">
              <div>
                <span className="inline-block px-3 py-1 r-sm bg-canvas-alt dark:bg-canvas-subtle text-xs font-mono font-bold text-ink mb-3 border border-line">
                  Step 4
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink font-heading mb-3">
                  Continuous Optimization
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-6 font-normal">
                  We refine performance, analyze insights, and enhance automation for long-term growth.
                </p>
              </div>

              {/* Visual Box: Live Status Monitors */}
              <div className="r-md bg-canvas-alt/70 dark:bg-canvas-subtle/50 p-4 border border-line space-y-2.5">
                {/* Monitor 1: Chatbot */}
                <div className="flex items-center justify-between p-3 r-sm bg-white dark:bg-canvas border border-line shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 r-sm bg-canvas-alt flex items-center justify-center text-ink">
                      <CpuIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-ink font-heading">Chatbot system</div>
                      <div className="text-[11px] text-ink-muted font-medium">
                        Efficiency will increase by <span className="text-emerald-700 dark:text-lime font-bold">+{efficiency}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-5 h-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin shrink-0" />
                </div>

                {/* Monitor 2: Workflow */}
                <div className="flex items-center justify-between p-3 r-sm bg-white dark:bg-canvas border border-line shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 r-sm bg-canvas-alt flex items-center justify-center text-ink">
                      <SettingsIcon size={16} className="text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-ink font-heading">Workflow system</div>
                      <div className="text-[11px] text-ink-muted font-medium">Update available..</div>
                    </div>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 animate-bounce">
                    <ArrowUpIcon size={14} />
                  </div>
                </div>

                {/* Monitor 3: Sales */}
                <div className="flex items-center justify-between p-3 r-sm bg-white dark:bg-canvas border border-line shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 r-sm bg-canvas-alt flex items-center justify-center text-ink">
                      <FilterIcon size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-ink font-heading">Sales system</div>
                      <div className="text-[11px] text-emerald-700 dark:text-lime font-bold">Up to date</div>
                    </div>
                  </div>

                  <CheckmarkCircleIcon size={18} className="text-emerald-600 dark:text-lime shrink-0" />
                </div>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </Container>
    </section>
  );
}
