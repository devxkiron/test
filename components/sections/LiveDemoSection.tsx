"use client";

import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { HeroInteractiveDemo } from "@/components/sections/HeroInteractiveDemo";
import { CheckmarkCircleIcon, ShieldIcon, FlashIcon } from "@/components/icons";

const highlights = [
  {
    icon: FlashIcon,
    text: "Sub-second AI responses in production",
  },
  {
    icon: ShieldIcon,
    text: "Enterprise-grade security & compliance",
  },
  {
    icon: CheckmarkCircleIcon,
    text: "Zero-downtime deployments, always live",
  },
];

export function LiveDemoSection() {
  return (
    <section className="py-24 sm:py-32 bg-canvas border-t border-line scroll-mt-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Context & Description */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <AnimateOnScroll direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 r-pill bg-canvas-alt border border-line text-xs font-mono font-bold text-ink-muted mb-4">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                Live Demo
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-5 leading-tight font-heading">
                See Our AI Agents <span className="font-display">in Action</span>
              </h2>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed mb-8 max-w-md">
                These aren&apos;t mockups — they&apos;re real production systems running for our clients right now.
                Click &quot;Run Live Agent&quot; to watch an AI pipeline execute in real time.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-4">
                {highlights.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 r-md bg-canvas-alt border border-line flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-ink" />
                      </div>
                      <span className="text-sm font-semibold text-ink">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Interactive Demo */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <AnimateOnScroll direction="right" delay={200}>
              <div className="w-full max-w-md">
                <HeroInteractiveDemo />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}
