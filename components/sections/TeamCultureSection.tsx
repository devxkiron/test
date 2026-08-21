"use client";

import { Container } from "@/components/ui/Container";
import { teamMembers } from "@/lib/data";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { ZenSecondaryButton } from "@/components/ui/ZenButton";

export function TeamCultureSection() {
  return (
    <section className="py-20 sm:py-28 bg-canvas-alt/30 dark:bg-canvas-subtle/15 border-t border-line">
      <Container>
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 r-pill bg-canvas dark:bg-canvas-alt border border-line text-xs font-mono font-semibold text-ink-muted mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              Engineering Team
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-4">
              One team. From whiteboard <br className="hidden sm:inline" />
              to production.
            </h2>
            <p className="text-base text-ink leading-relaxed">
              Senior engineers and designers working directly with you — no account managers, no layers of bureaucracy.
            </p>
          </div>
        </AnimateOnScroll>

        {/* 6 Team / Studio Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-12">
          {teamMembers.map((member, i) => (
            <AnimateOnScroll key={i} direction="up" delay={i * 80}>
              <div
                className="r-lg p-4 bg-canvas border border-line hover:border-line-strong transition-all duration-200 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-stone-200 to-stone-400 dark:from-stone-700 dark:to-stone-900 border-2 border-line flex items-center justify-center font-mono font-black text-lg text-ink mb-3 shadow-xs">
                  {member.name.slice(0, 2)}
                </div>
                <div className="font-bold text-sm text-ink font-heading">{member.name}</div>
                <div className="text-xs text-ink-muted font-medium mt-0.5">{member.role}</div>
                <span className="mt-2 text-[10px] font-mono font-bold px-2 py-0.5 r-pill bg-lime/25 text-ink border border-lime/50">
                  {member.photoTag}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimateOnScroll direction="up" delay={400}>
          <div className="text-center">
            <ZenSecondaryButton href="#book" className="px-6 py-3 text-xs font-bold">
              Work with our team
            </ZenSecondaryButton>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
