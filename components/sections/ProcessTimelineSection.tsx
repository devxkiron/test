"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { processStages } from "@/lib/data";
import { CheckmarkCircleIcon, LayersIcon } from "@/components/icons";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ProcessTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Animate the timeline line growing as user scrolls through
  useGSAP(() => {
    if (!sectionRef.current || !lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.8,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="process" className="py-20 sm:py-28 bg-canvas border-t border-line pattern-grid">
      <Container>
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 r-pill bg-canvas-alt dark:bg-canvas-subtle border border-line text-xs font-mono font-semibold text-ink-muted mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              Our Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-4">
              From Idea to Launch <br className="hidden sm:inline" />
              Faster and Smarter
            </h2>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl mx-auto">
              A milestone-driven sprint framework with weekly staging releases, zero bloat, and total transparency.
            </p>
          </div>
        </AnimateOnScroll>

        {/* CSS Vertical Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-line">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-lime origin-top"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-0">
            {processStages.map((stage, idx) => (
              <AnimateOnScroll key={stage.number} direction="left" delay={idx * 120}>
                <div className="timeline-item">
                  {/* Content Card */}
                  <div className="r-lg bg-canvas border border-line p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-line-strong transition-all duration-300">
                    {/* Wireframe Preview Box */}
                    <div className="mb-5 r bg-canvas-alt dark:bg-canvas-subtle p-4 border border-line shadow-2xs aspect-video sm:aspect-3/1 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 border-b border-line/70">
                        <span className="text-xs font-mono font-bold text-ink">
                          Sprint {stage.number} · {stage.name}
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
                      </div>

                      {idx === 0 && (
                        <div className="space-y-2 my-auto">
                          <div className="h-2.5 bg-stone-300 dark:bg-stone-700 r-sm w-3/4" />
                          <div className="h-2 bg-stone-200 dark:bg-stone-800 r-sm w-1/2" />
                          <div className="h-7 bg-lime/25 border border-lime/60 r-sm flex items-center px-2.5 text-xs font-mono text-ink font-bold gap-1.5">
                            <LayersIcon size={14} className="text-ink shrink-0" />
                            <span>Clickable Figma Prototype</span>
                          </div>
                        </div>
                      )}

                      {idx === 1 && (
                        <div className="grid grid-cols-3 gap-2 my-auto">
                          <div className="h-10 r-sm bg-white dark:bg-black/40 border border-line flex items-center justify-center text-[10px] font-mono font-bold text-ink">UI Tokens</div>
                          <div className="h-10 r-sm bg-lime/30 border border-lime/70 flex items-center justify-center text-[10px] font-mono font-bold text-ink">Components</div>
                          <div className="h-10 r-sm bg-white dark:bg-black/40 border border-line flex items-center justify-center text-[10px] font-mono font-bold text-ink">Motion</div>
                        </div>
                      )}

                      {idx === 2 && (
                        <div className="space-y-1 my-auto font-mono text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 p-2 r-sm font-semibold">
                          <div>&gt; next build --turbo</div>
                          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                            <CheckmarkCircleIcon size={14} />
                            <span>compiled successfully in 1.4s</span>
                          </div>
                        </div>
                      )}

                      {idx === 3 && (
                        <div className="flex items-center justify-between my-auto bg-ink text-canvas p-2.5 r-sm text-xs font-mono font-bold">
                          <span>Production Handover</span>
                          <span className="text-lime flex items-center gap-1">
                            <CheckmarkCircleIcon size={14} />
                            100% Verified
                          </span>
                        </div>
                      )}

                      <div className="text-xs font-mono text-ink font-semibold text-right">
                        Phase {stage.number} of 04
                      </div>
                    </div>

                    {/* Stage Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs font-extrabold px-2.5 py-1 r-sm bg-ink text-canvas">
                        {stage.number}
                      </span>
                      <h3 className="text-xl font-bold text-ink font-heading">{stage.name}</h3>
                    </div>

                    <p className="text-sm font-bold text-emerald-800 dark:text-lime mb-3">
                      {stage.subtitle}
                    </p>

                    <p className="text-sm text-ink-muted leading-relaxed mb-5">
                      {stage.description}
                    </p>

                    {/* Deliverables Checkpoints */}
                    <div className="pt-4 border-t border-line/80 space-y-2 text-xs font-medium text-ink">
                      {stage.deliverables.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckmarkCircleIcon size={16} className="text-emerald-600 dark:text-lime shrink-0" />
                          <span className="font-semibold">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
