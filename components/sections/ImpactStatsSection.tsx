"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { impactStats } from "@/lib/data";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { ZenSecondaryButton } from "@/components/ui/ZenButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ImpactStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  // Parallax tilt on scroll for the stat cards container
  useGSAP(() => {
    if (!sectionRef.current || !countersRef.current) return;

    const cards = countersRef.current.querySelectorAll(".stat-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40 + i * 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-canvas border-t border-line pattern-hatch">
      <Container>
        {/* Top Header & CTA */}
        <AnimateOnScroll direction="up">
          <div className="max-w-3xl mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink mb-6 leading-tight">
              You stop talking about AI. <br />
              We start shipping it.
            </h2>
            <p className="text-base sm:text-lg text-ink font-normal leading-relaxed mb-8 max-w-2xl">
              We work best with ambitious companies ready to turn technology into an unfair operational advantage. No endless slides, just production software.
            </p>

            <ZenSecondaryButton href="#book" className="px-6 py-3 text-xs font-bold">
              Book a 15-Min Call
            </ZenSecondaryButton>
          </div>
        </AnimateOnScroll>

        {/* 3 Large Stat Cards */}
        <div ref={countersRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {impactStats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-card p-8 sm:p-10 r-lg bg-canvas-alt/80 dark:bg-canvas-subtle/60 border border-line flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-ink font-heading mb-4">
                {stat.value}
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink mb-1 font-heading">{stat.label}</h3>
                <p className="text-xs text-ink-muted leading-relaxed font-medium">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
