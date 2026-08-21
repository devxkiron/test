"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig, clientLogos } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ZenPrimaryButton, ZenSecondaryButton } from "@/components/ui/ZenButton";
import { HeroInteractiveDemo } from "@/components/sections/HeroInteractiveDemo";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Staggered hero entrance — immediate on load, no scroll trigger
    tl.fromTo(
      headlineRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 }
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
        previewRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

    // Parallax on scroll — preview floats up
    gsap.to(previewRef.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative pt-28 sm:pt-36 pb-0 overflow-hidden bg-canvas pattern-dots">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-16 sm:pb-20">
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink mb-6 sm:mb-8 leading-[1.08] opacity-0"
            >
              We build AI agents to future-proof your business
            </h1>

            <p
              ref={subtextRef}
              className="text-base sm:text-lg text-ink-muted leading-relaxed mb-8 sm:mb-10 max-w-xl opacity-0"
            >
              We turn AI from talked about to rolled out. Custom AI products, intelligent workflow automations, and internal tools shipped in weeks.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 sm:gap-6 opacity-0">
              <ZenPrimaryButton href="#book" className="px-8 py-3 text-sm">
                Get Started
              </ZenPrimaryButton>

              <ZenSecondaryButton href={`mailto:${siteConfig.email}`} className="px-6 py-3 text-sm font-bold">
                Let&apos;s chat
              </ZenSecondaryButton>
            </div>
          </div>

          {/* Right Column: Interactive AI Agent Live Runner */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div ref={previewRef} className="w-full max-w-md opacity-0">
              <HeroInteractiveDemo />
            </div>
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
