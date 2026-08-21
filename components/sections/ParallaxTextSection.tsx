"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { FlashIcon, Shield01Icon, WorkflowSquare01Icon } from "hugeicons-react";

gsap.registerPlugin(ScrollTrigger);

export function ParallaxTextSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Row 1 moves left-to-right
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          x: -120,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Row 2 moves right-to-left
      if (row2Ref.current) {
        gsap.to(row2Ref.current, {
          x: 140,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Row 3 moves left-to-right
      if (row3Ref.current) {
        gsap.to(row3Ref.current, {
          x: -100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parallax-text"
      className="relative py-28 bg-canvas border-b border-line overflow-hidden select-none"
    >
      {/* Background Subdued Line Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--line-strong)_1px,transparent_1px),linear-gradient(to_bottom,var(--line-strong)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 dark:opacity-10 pointer-events-none" />

      <Container className="relative z-10 mb-12 text-center">
        <Badge variant="accent" size="md" className="mb-4">
          Core Operating Thesis
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
          The principles behind autonomous leverage.
        </h2>
      </Container>

      {/* Parallax Stream Bands */}
      <div className="space-y-6 sm:space-y-8 overflow-hidden py-4">
        {/* Parallax Band 1 */}
        <div
          ref={row1Ref}
          className="flex whitespace-nowrap gap-6 text-4xl sm:text-6xl font-bold tracking-tight text-ink-muted/30 will-change-transform"
        >
          <span className="text-ink">Ditch the spreadsheets.</span>
          <span>·</span>
          <span>Eliminate copy-pasting.</span>
          <span>·</span>
          <span className="text-accent">Connect every tool seamlessly.</span>
          <span>·</span>
          <span>Ditch the spreadsheets.</span>
        </div>

        {/* Parallax Band 2 */}
        <div
          ref={row2Ref}
          className="flex whitespace-nowrap gap-6 text-4xl sm:text-6xl font-bold tracking-tight text-ink/80 will-change-transform -translate-x-40"
        >
          <span>Automate the busywork.</span>
          <span>·</span>
          <span className="text-success">Sub-second execution.</span>
          <span>·</span>
          <span>Zero manual errors.</span>
          <span>·</span>
          <span>Automate the busywork.</span>
        </div>

        {/* Parallax Band 3 */}
        <div
          ref={row3Ref}
          className="flex whitespace-nowrap gap-6 text-4xl sm:text-6xl font-bold tracking-tight text-ink-muted/30 will-change-transform"
        >
          <span>Scale without headcount.</span>
          <span>·</span>
          <span className="text-gold">Reclaim 30+ hours every week.</span>
          <span>·</span>
          <span>Self-healing queues.</span>
          <span>·</span>
          <span>Scale without headcount.</span>
        </div>
      </div>

      {/* 3 Crisp Architectural Metric Anchors */}
      <Container className="relative z-10 mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border border-line bg-canvas p-5 rounded-xs">
            <div className="flex items-center gap-2 mb-2">
              <WorkflowSquare01Icon size={16} className="text-gold" />
              <span className="font-mono text-xs font-semibold text-ink">Idempotent Pipelines</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Every workflow step is self-verifying. If an external API blips, our self-healing retry queues resolve it with zero lost data.
            </p>
          </div>

          <div className="border border-line bg-canvas p-5 rounded-xs">
            <div className="flex items-center gap-2 mb-2">
              <FlashIcon size={16} className="text-accent" />
              <span className="font-mono text-xs font-semibold text-ink">Instant Real-Time Sync</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Customer inquiries, invoice reconciliations, and CRM states propagate across systems in milliseconds, not hours.
            </p>
          </div>

          <div className="border border-line bg-canvas p-5 rounded-xs">
            <div className="flex items-center gap-2 mb-2">
              <Shield01Icon size={16} className="text-success" />
              <span className="font-mono text-xs font-semibold text-ink">Zero Vendor Lock-In</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              You own all source code, workflows, and database tables outright. Direct ownership with zero proprietary trapdoors.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
