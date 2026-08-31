"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { caseStudies } from "@/lib/data";
import { 
  PlaneIcon, 
  StarIcon, 
  TerminalIcon, 
  LayersIcon, 
  MessageSquareIcon, 
  ActivityIcon, 
  FlashIcon, 
  ArrowUpRightIcon,
  ArrowRightIcon
} from "@/components/icons";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { ZenSecondaryButton } from "@/components/ui/ZenButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // GSAP Scroll-driven Stacking Scale Animation
  useGSAP(() => {
    if (!cardsContainerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".stackingcard");
    if (!cards.length) return;

    cards.forEach((card, i) => {
      // Scale previous cards as next cards stack over them
      if (i < cards.length - 1) {
        const nextCard = cards[i + 1];
        gsap.to(card, {
          scale: 0.94 - (cards.length - 1 - i) * 0.012,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 65%",
            end: "top 30%",
            scrub: true,
            invalidateOnRefresh: false,
          },
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="work" className="py-24 sm:py-32 bg-canvas scroll-mt-12">
      <Container>
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="max-w-2xl mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 r-pill bg-canvas-alt dark:bg-canvas-subtle border border-line text-xs font-mono font-bold text-ink mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              Selected Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink font-heading leading-tight">
              Featured work & live deployments
            </h2>
            <p className="text-base text-ink-muted leading-relaxed mt-3 font-normal">
              Explore how we design, engineer, and deploy high-impact AI agents and automation systems.
            </p>
          </div>
        </AnimateOnScroll>

        {/* ─── Stacking Cards Deck (Positioned ~60px Lower for Balanced Viewport Centering) ─── */}
        <div ref={cardsContainerRef} className="stackingcards relative w-full space-y-16 sm:space-y-24 pb-4 sm:pb-6">
          {caseStudies.map((study, idx) => {
            const indexStr = `0${idx + 1}`;
            const totalStr = `0${caseStudies.length}`;
            // Starting 60px lower from top (~150px on desktop) for centered screen presence
            const topOffsetMobile = 110 + idx * 14;
            const topOffsetDesktop = 150 + idx * 22;

            return (
              <div
                key={study.id}
                className="stackingcard sticky w-full r-xl overflow-hidden will-change-transform"
                style={{
                  top: `clamp(${topOffsetMobile}px, ${topOffsetDesktop}px, ${topOffsetDesktop}px)`,
                  backgroundColor: "rgba(21, 34, 20, 0.91)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  zIndex: idx + 10,
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.05), 0 25px 60px -12px rgba(0, 0, 0, 0.08)",
                }}
              >
                {/* Card Top Header Bar */}
                <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/15 bg-[#182B21]/10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-white px-2.5 py-0.5 r-xs bg-white/2 border border-white/5" style={{ color: "#b7ca9dc9" }}>
                      {indexStr} / {totalStr}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-white  text-lg font-mono font-bold" style={{ color: "#b7ca9dc9" }}>
                      <span className={`w-2 h-2 rounded-full ${study.badgeColor}`} />
                      {study.tag}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 r-sm bg-[#D4FF00]/60 text-black text-xs font-mono font-black shadow-md">
                    {study.stat}
                  </span>
                </div>

                {/* Card Main Body: Split 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 p-6 sm:p-10 items-center">
                  
                  {/* Left Column: Explicit Bright Pure White Typography */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider mb-2.5" style={{ color: "#82e14884" }}>
                        Client: <span className="font-black text-white" style={{ color: "#ffffff98" }}>{study.client}</span>
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading leading-[1.2] mb-4 text-white"
                        style={{ color: "#e5f0bec6" }}
                      >
                        {study.title}
                      </h3>

                      <p
                        className="text-sm sm:text-base leading-relaxed font-normal"
                        style={{ color: "#b4e6c38b" }}
                      >
                        {study.summary}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider" style={{ color: "#ffffff98" }}>
                          {study.statLabel}
                        </div>
                        <div
                          className="text-2xl sm:text-3xl font-black font-mono mt-0.5"
                          style={{ color: "#d4ff00ce" }}
                        >
                          {study.stat}
                        </div>
                      </div>

                      <a
                        href="#book"
                        className="group/btn relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#D4FF00] text-black font-mono text-xs font-black overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_0_28px_rgba(212,255,0,0.5)] hover:scale-[1.03] active:scale-95 cursor-pointer"
                      >
                        {/* Shimmer sweep reflection on hover */}
                        <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                        <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-0.5">
                          Explore Project
                        </span>

                        <span className="relative z-10 w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-black group-hover/btn:text-[#D4FF00] group-hover/btn:translate-x-1 group-hover/btn:rotate-45">
                          <ArrowUpRightIcon size={12} className="transition-transform duration-300 group-hover/btn:scale-110" />
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Illustrated Mockup Visual Preview */}
                  <div className="lg:col-span-6">
                    <div className={`p-6 sm:p-8 ${study.accentBg} r-lg min-h-[220px] sm:min-h-[260px] flex flex-col justify-between relative overflow-hidden border border-white/20 shadow-xl`}>
                      <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
                        <span className="text-xs font-mono font-extrabold text-slate-900 dark:text-white">
                          Live Architecture Telemetry
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>

                      {/* Dynamic Mockup Centerpiece */}
                      <div className="my-auto py-5">
                        {study.previewType === "airplane" && (
                          <div className="bg-white text-slate-900 r p-4 shadow-xl border border-black/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                                <PlaneIcon size={18} />
                              </div>
                              <div>
                                <div className="text-xs font-mono font-extrabold text-slate-950">Flight Ops Telemetry #892</div>
                                <div className="text-[11px] font-medium text-slate-600">Autonomous route dispatch active</div>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 r-sm border border-emerald-200">
                              On-Time: 99.4%
                            </span>
                          </div>
                        )}

                        {study.previewType === "person" && (
                          <div className="bg-white text-slate-900 r p-4 shadow-xl border border-black/10 space-y-2.5">
                            <div className="flex items-center justify-between text-xs font-extrabold text-slate-950">
                              <div className="flex items-center gap-2">
                                <MessageSquareIcon size={16} className="text-emerald-600" />
                                <span>AI Knowledge Copilot v2.4</span>
                              </div>
                              <span className="text-emerald-700 font-mono text-[11px] font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                100k+ Queries
                              </span>
                            </div>
                            <div className="h-2.5 bg-emerald-100 r-sm overflow-hidden border border-emerald-200">
                              <div className="h-full bg-emerald-500 r-sm w-[94%]" />
                            </div>
                          </div>
                        )}

                        {study.previewType === "dashboard-green" && (
                          <div className="bg-white text-slate-900 r p-4 shadow-xl border border-black/10">
                            <div className="flex justify-between items-center pb-2 border-b border-black/10 text-xs font-extrabold text-slate-950">
                              <div className="flex items-center gap-2">
                                <LayersIcon size={16} className="text-teal-700" />
                                <span>Reconciliation Ledger</span>
                              </div>
                              <span className="font-mono text-teal-700 font-extrabold">$18.4M Synced</span>
                            </div>
                            <div className="pt-2.5 flex justify-between text-[11px] text-slate-600 font-medium">
                              <span>Plaid + Stripe + QuickBooks</span>
                              <span className="text-emerald-700 font-bold">100% Audited</span>
                            </div>
                          </div>
                        )}

                        {study.previewType === "quote-pink" && (
                          <div className="bg-white text-slate-900 r p-4 shadow-xl border border-black/10">
                            <div className="flex items-center gap-2 text-xs font-extrabold text-pink-700 mb-1">
                              <FlashIcon size={16} />
                              <span>DTC Creative Engine</span>
                            </div>
                            <div className="text-xs font-semibold text-slate-800">500+ Multi-modal creative variants generated daily</div>
                          </div>
                        )}

                        {study.previewType === "terminal-dark" && (
                          <div className="bg-white text-slate-900 r p-4 font-mono text-xs border border-black/10 shadow-xl space-y-1.5">
                            <div className="flex items-center gap-2 text-emerald-700 font-bold">
                              <TerminalIcon size={16} />
                              <span>RAG Legal Analyzer v2.4</span>
                            </div>
                            <div className="text-slate-600 font-medium pl-6">&gt; 54 contract clauses verified in 45s</div>
                          </div>
                        )}

                        {study.previewType === "analytics-purple" && (
                          <div className="bg-white text-slate-900 r p-4 font-mono text-xs border border-black/10 shadow-xl flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700">
                                <ActivityIcon size={18} />
                              </div>
                              <div>
                                <span className="block font-bold text-slate-950">Edge Commerce Platform</span>
                                <span className="text-[10px] text-slate-600 font-medium">Global P99 Latency</span>
                              </div>
                            </div>
                            <span className="text-2xl font-black text-indigo-700">38ms</span>
                          </div>
                        )}
                      </div>

                      <div className="text-[11px] font-mono text-slate-800 dark:text-slate-200 font-medium">
                        Production Status: <span className="text-emerald-800 dark:text-[#D4FF00] font-black" style={{ color: "#D4FF00" }}>Active & Audited</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Bottom CTA & Impact Stats (Positioned Below Cards) ─── */}
        <div className="mt-8 sm:mt-10">
          {/* View All Case Studies Button */}
          <AnimateOnScroll direction="up">
            <div className="text-center mb-8 sm:mb-10">
              <ZenSecondaryButton href="#book" className="px-8 py-3.5 text-xs font-bold shadow-md hover:shadow-lg">
                View all case studies <ArrowRightIcon size={14} className="ml-1 inline" />
              </ZenSecondaryButton>
            </div>
          </AnimateOnScroll>

          {/* Social Proof Stats Bar */}
          <div className="pt-8 sm:pt-10 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "14,750+", label: "Hours Automated" },
              { val: "2.4x", label: "Average Client ROI" },
              { val: "< 15 min", label: "Direct Support SLA" },
              { val: "5.0", label: "Clutch Verified Rating", star: true },
            ].map((item, i) => (
              <AnimateOnScroll key={i} direction="up" delay={i * 100}>
                <div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-ink font-heading">{item.val}</span>
                    {item.star && (
                      <StarIcon size={18} className="text-amber-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-ink-muted font-medium mt-1">{item.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
