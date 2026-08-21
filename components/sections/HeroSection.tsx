"use client";

import { useState } from "react";
import { 
  ArrowRight01Icon, 
  ArrowDown01Icon, 
  Calendar01Icon, 
  Layers01Icon, 
  Shield01Icon, 
  FlashIcon,
  CpuIcon,
  WorkflowSquare01Icon,
  CheckmarkCircle01Icon
} from "hugeicons-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroVisual } from "@/components/motion/HeroVisual";
import { WaveGridBackground } from "@/components/motion/WaveGridBackground";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { AudioStoryPlayer } from "@/components/ui/AudioStoryPlayer";
import { AuditModal } from "@/components/ui/AuditModal";
import { stats, customStack, automationStack } from "@/lib/data";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [auditOpen, setAuditOpen] = useState(false);
  const [activeStackTab, setActiveStackTab] = useState<"custom" | "automation">("custom");

  const currentStack = activeStackTab === "custom" ? customStack : automationStack;

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-canvas pt-20"
        id="hero"
      >
        {/* Vengence UI: Wave Grid Hero Background */}
        <WaveGridBackground />

        {/* Subtle Liquid Glass Ambient Blur Layer */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_75%_at_35%_45%,var(--canvas)_35%,transparent_100%)] opacity-95 dark:opacity-60 backdrop-blur-[0.08px]" />

        <Container className="relative z-10 py-12 lg:py-16 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 max-w-2xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge variant="accent" dot pulse size="md">
                  Automation & Software Agency
                </Badge>
                <span className="text-xs text-ink-muted font-mono font-medium">
                  Custom and Automation Solutions
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.12]">
                Lifting the heavy work
                <br />
                <span className="text-ink-muted font-normal">
                  off your business.
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">
                We replace fragile spreadsheets, brittle scripts, and sluggish internal software with frictionless, autonomous operational pipelines and modern web platforms.
              </p>

              {/* Action Buttons & Skiper UI 25th Audio Player */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                <MagneticElement strength={0.25}>
                  <Button
                    size="lg"
                    onClick={() => setAuditOpen(true)}
                    className="rounded-xs text-sm font-mono shadow-xs"
                  >
                    <Calendar01Icon size={16} className="mr-1.5 text-accent-light" />
                    Book Free Technical Audit
                  </Button>
                </MagneticElement>

                {/* Skiper UI 25th: Click to play our story */}
                <AudioStoryPlayer />
              </div>

              {/* Key Trust Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
                <span className="flex items-center gap-1.5 font-mono">
                  <Shield01Icon size={15} className="text-accent" /> 100% Code Ownership
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Layers01Icon size={15} className="text-gold" /> Custom Direct Architecture
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <FlashIcon size={15} className="text-success" /> Production in Weeks
                </span>
              </div>

              {/* Stats Row */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xs border border-line bg-canvas/85 backdrop-blur-md p-3.5 transition-all duration-200 hover:border-line-strong shadow-xs"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-ink tracking-tight font-mono">
                      {stat.value}
                      <span className="text-accent text-sm ml-0.5">{stat.suffix}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-ink-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 relative w-full flex items-center justify-center">
              <HeroVisual />
            </div>
          </div>
        </Container>

        {/* Interactive Stack Switcher Section */}
        <div className="relative border-y border-line bg-canvas/85 backdrop-blur-md py-4 overflow-hidden z-20 shadow-xs">
          <Container>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              {/* Stack Category Toggle Tabs */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-ink-muted uppercase mr-1 hidden sm:inline">
                  Select Stack:
                </span>
                
                {/* Custom Solutions Button */}
                <button
                  type="button"
                  onClick={() => setActiveStackTab("custom")}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-1.5 rounded-xs text-xs font-mono transition-all duration-150 cursor-pointer shimmer active:scale-95",
                    activeStackTab === "custom"
                      ? "bg-accent text-white font-semibold shadow-xs"
                      : "bg-canvas-alt text-ink-muted border border-line hover:text-ink hover:border-line-strong"
                  )}
                >
                  <CpuIcon size={14} />
                  <span>Custom Solutions</span>
                </button>

                {/* Automation Solutions Button */}
                <button
                  type="button"
                  onClick={() => setActiveStackTab("automation")}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-1.5 rounded-xs text-xs font-mono transition-all duration-150 cursor-pointer shimmer active:scale-95",
                    activeStackTab === "automation"
                      ? "bg-success text-white font-semibold shadow-xs"
                      : "bg-canvas-alt text-ink-muted border border-line hover:text-ink hover:border-line-strong"
                  )}
                >
                  <WorkflowSquare01Icon size={14} />
                  <span>Automation Solutions</span>
                </button>
              </div>

              {/* Summary descriptor */}
              <div className="text-xs font-mono text-ink-muted flex items-center gap-2">
                <CheckmarkCircle01Icon
                  size={14}
                  className={activeStackTab === "custom" ? "text-accent" : "text-success"}
                />
                <span>
                  {activeStackTab === "custom"
                    ? "Full-stack web apps, sub-second latency & clean API layers"
                    : "Zero-friction workflows (n8n, Zapier, Make, GHL, Stripe & APIs)"}
                </span>
              </div>
            </div>
          </Container>

          {/* Active Dynamic Stack Marquee Track */}
          <div className="flex w-max marquee-track gap-3 py-1 text-xs font-mono">
            {[...currentStack, ...currentStack, ...currentStack].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-xs border transition-colors",
                  activeStackTab === "custom"
                    ? "bg-canvas border-line text-ink hover:border-accent"
                    : "bg-canvas border-line text-ink hover:border-success"
                )}
              >
                <span className="font-semibold text-ink">{tech.name}</span>
                <span className="text-[10px] text-ink-muted uppercase border-l border-line pl-1.5">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="py-2.5 flex justify-center items-center gap-1 text-ink-ghost text-xs font-mono">
          <span>Scroll to explore</span>
          <ArrowDown01Icon size={14} className="animate-bounce" />
        </div>
      </section>

      <AuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
