"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight01Icon, 
  CheckmarkCircle01Icon, 
  ArrowUpRight01Icon,
  Database01Icon,
  WorkflowSquare01Icon,
  FlashIcon,
  ComputerIcon,
  Activity01Icon
} from "hugeicons-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  metrics: { label: string; value: string; delta: string }[];
  stack: string[];
  accent: "accent" | "success" | "gold";
  icon: typeof WorkflowSquare01Icon;
}

const projects: ShowcaseProject[] = [
  {
    id: "omniflow",
    title: "OmniFlow Logistics Cloud",
    category: "Full-Stack Web App & Fleet Automation",
    tagline: "Autonomous dispatch mesh processing 42,000 daily route deliveries with sub-second real-time GPS synchronization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Dispatch Velocity", value: "3.2x", delta: "+220%" },
      { label: "Hours Automated / Wk", value: "28.5 hrs", delta: "Reclaimed" },
      { label: "Human Routing Error", value: "0.01%", delta: "99.9% Drop" },
    ],
    stack: ["Next.js 16", "PostgreSQL", "Kafka", "n8n", "Tailwind CSS"],
    accent: "accent",
    icon: WorkflowSquare01Icon,
  },
  {
    id: "apex-medops",
    title: "Apex MedOps Portal",
    category: "HIPAA Patient Intake & Data Mesh",
    tagline: "Zero-touch patient onboarding and automated insurance verification pipeline replacing manual paperwork.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Intake Latency", value: "1.4s", delta: "Instant" },
      { label: "Monthly Cost Saved", value: "$14.2k", delta: "Net Gain" },
      { label: "Form Abandonment", value: "3.8%", delta: "-76%" },
    ],
    stack: ["React 19", "Redis Cache", "Node.js", "Stripe API", "GSAP"],
    accent: "gold",
    icon: FlashIcon,
  },
  {
    id: "veloce-ledger",
    title: "Veloce Capital Ledger",
    category: "Autonomous Financial Reconciliation",
    tagline: "High-frequency invoice parsing and multi-bank reconciliation engine running 100% autonomously in the cloud.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Reconciliation Rate", value: "99.98%", delta: "Flawless" },
      { label: "Annual Labor Saved", value: "1,400 hrs", delta: "Leverage" },
      { label: "Sync Latency", value: "< 240ms", delta: "Real-time" },
    ],
    stack: ["Rust Engine", "PostgreSQL", "Webhooks", "Docker", "TypeScript"],
    accent: "success",
    icon: Database01Icon,
  },
  {
    id: "krypton-edge",
    title: "Krypton Edge Commerce",
    category: "Sub-Second Global Commerce Web App",
    tagline: "Ultra-high performance e-commerce platform delivering instant optimistic mutations and 100/100 Core Web Vitals.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Lighthouse Score", value: "100/100", delta: "P99 Speed" },
      { label: "Checkout Conversion", value: "+38.4%", delta: "Measured" },
      { label: "API Edge P99", value: "48ms", delta: "Global" },
    ],
    stack: ["Next.js App Router", "Server Components", "Tailwind CSS", "GSAP ScrollTrigger"],
    accent: "accent",
    icon: ComputerIcon,
  },
];

export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Calculate total horizontal scroll width
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      return -(trackWidth - viewportWidth + 120);
    };

    const ctx = gsap.context(() => {
      const scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative min-h-screen bg-canvas border-b border-line overflow-hidden flex flex-col justify-center py-16"
    >
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_1.1px,transparent_1.1px)] [background-size:28px_28px] opacity-18 dark:opacity-10 pointer-events-none" />

      {/* Top Header & Horizontal Navigation Info */}
      <Container className="relative z-10 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="accent" size="md">
                Horizontal Scroll Gallery
              </Badge>
              <span className="text-xs font-mono text-ink-muted">GSAP Pinned X-Axis Scrub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              Production engineering showcase.
            </h2>
            <p className="mt-2 text-ink-muted text-sm sm:text-base max-w-xl">
              Scroll down to glide horizontally through real platforms, mission-critical databases, and autonomous operational engines we engineered.
            </p>
          </div>

          {/* Horizontal Progress Track */}
          <div className="flex flex-col items-end gap-2 min-w-[220px]">
            <div className="flex items-center justify-between w-full text-xs font-mono text-ink-muted">
              <span>Scroll to Glide</span>
              <span className="text-accent font-bold">01 — 04</span>
            </div>
            <div className="w-full h-1 rounded-full bg-line overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-accent transition-all duration-100"
                style={{ width: "10%" }}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Horizontal Pinned Track */}
      <div className="relative w-full overflow-visible">
        <div
          ref={trackRef}
          className="flex gap-8 px-6 sm:px-12 w-max items-center will-change-transform"
        >
          {projects.map((proj, idx) => {
            const Icon = proj.icon;

            return (
              <div
                key={proj.id}
                className="w-[88vw] sm:w-[580px] lg:w-[680px] shrink-0 rounded-xs border border-line bg-canvas overflow-hidden shadow-xs transition-all duration-200 hover:border-line-strong flex flex-col justify-between"
              >
                {/* Image Showcase Banner */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-canvas-alt border-b border-line group">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 680px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    priority={idx < 2}
                  />

                  {/* Dark gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/40 to-transparent" />

                  {/* Top Bar on Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <Badge variant={proj.accent} size="sm">
                      {proj.category}
                    </Badge>
                    <span className="h-7 w-7 rounded-xs border border-line/80 bg-canvas/90 backdrop-blur-sm flex items-center justify-center text-ink text-xs font-mono font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Floating Title Over Image Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-ink drop-shadow-sm">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Metrics */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
                    {proj.tagline}
                  </p>

                  {/* Metrics 3-Column Grid */}
                  <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xs border border-line bg-canvas-alt/70 mb-6">
                    {proj.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-sm sm:text-base font-bold font-mono text-ink tracking-tight">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-ink-muted mt-0.5">{m.label}</div>
                        <div className="text-[10px] font-mono text-success font-semibold mt-1">
                          {m.delta}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack & Link */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-line">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-xs border border-line bg-canvas-alt px-2 py-0.5 text-[10px] font-mono text-ink-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-accent flex items-center gap-1 font-mono">
                      Case Study <ArrowUpRight01Icon size={14} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
