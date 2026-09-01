"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig, clientLogos } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ZenPrimaryButton, ZenSecondaryButton } from "@/components/ui/ZenButton";
import { StarIcon } from "@/components/icons";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
      .fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.3"
      )
      .fromTo(
        subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        statsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative pt-32 sm:pt-40 pb-0 overflow-hidden bg-canvas pattern-dots">
      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto pb-16 sm:pb-24">

          {/* Trust Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 r-pill bg-canvas-alt border border-line text-xs font-mono font-bold text-ink-muted mb-6 sm:mb-8 opacity-0"
          >
            <span className="text-ink font-extrabold">AI Development Agency</span>
            <span className="w-1 h-1 rounded-full bg-ink-muted" />
            <span className="flex items-center gap-1">
              <StarIcon size={12} className="text-[#FBBF24] fill-[#FBBF24]" />
              {siteConfig.clutchRating} Clutch
            </span>
            <span className="w-1 h-1 rounded-full bg-ink-muted" />
            <span>{siteConfig.clutchReviewsCount} Reviews</span>
          </div>

          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink mb-6 sm:mb-8 leading-[1.06] opacity-0"
          >
            We Build Software That Runs Your Business{" "}
            <span className="font-accent text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-lime to-[#B8E000] inline-block -rotate-1">
              on Autopilot
            </span>
          </h1>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg md:text-xl text-ink-muted leading-relaxed mb-8 sm:mb-10 max-w-2xl opacity-0"
          >
            From AI-powered tools to custom automation — we help ambitious companies
            save thousands of hours, cut costs, and scale faster.
            No buzzwords, just production software.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-12 sm:mb-14 opacity-0">
            <ZenPrimaryButton href="#book" className="px-8 py-3.5 text-sm">
              Book a Free Strategy Call
            </ZenPrimaryButton>

            <ZenSecondaryButton href="#work" className="px-7 py-3.5 text-sm font-bold">
              See Our Work
            </ZenSecondaryButton>
          </div>

          {/* Social Proof Stats Row */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full max-w-2xl opacity-0"
          >
            {siteConfig.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-ink font-heading tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-ink-muted uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Dark Forest Green Client Logo Bar */}
      <div className="bg-[#14221A] py-4 border-y border-[#243B2E] text-[#9CAD9F]">
        <div className="relative overflow-hidden w-full">
          <div className="flex gap-12 whitespace-nowrap marquee-track items-center">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="flex items-center gap-3 font-mono font-bold text-xs tracking-widest uppercase opacity-80 hover:opacity-100 hover:text-lime transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                <span>{client.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

