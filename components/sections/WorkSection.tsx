"use client";

import { Container } from "@/components/ui/Container";
import { caseStudies, siteConfig } from "@/lib/data";
import { ArrowRight01Icon, SparklesIcon, CheckmarkCircle01Icon, ArrowUpRight01Icon } from "hugeicons-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { ZenSecondaryButton } from "@/components/ui/ZenButton";

export function WorkSection() {
  return (
    <section id="work" className="py-24 sm:py-32 bg-canvas scroll-mt-12">
      <Container>
        {/* Section Header */}
        <AnimateOnScroll direction="up">
          <div className="max-w-2xl mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 r-pill bg-canvas-alt dark:bg-canvas-subtle border border-line text-xs font-mono font-bold text-ink mb-4">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              Selected Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink font-heading">
              Featured work & live deployments
            </h2>
          </div>
        </AnimateOnScroll>

        {/* 6 Case Studies Grid (2 cols x 3 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {caseStudies.map((study, studyIdx) => (
            <AnimateOnScroll
              key={study.id}
              direction={studyIdx % 2 === 0 ? "left" : "right"}
              delay={studyIdx * 80}
            >
              <div
                className="group r-lg overflow-hidden bg-canvas-alt/60 dark:bg-canvas-subtle/40 border border-line hover:border-line-strong transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg hover:-translate-y-1"
              >
                {/* Card Visual / Mockup Preview Container */}
                <div className={`p-6 sm:p-8 ${study.accentBg} min-h-[220px] sm:min-h-[260px] flex flex-col justify-between relative overflow-hidden border-b border-line/60`}>
                  {/* Top Badge & Metric */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 r-sm bg-white/95 text-slate-900 border border-black/10 text-xs font-mono font-extrabold shadow-sm">
                      <span className={`w-2 h-2 rounded-full ${study.badgeColor}`} />
                      {study.category}
                    </span>

                    <span className="inline-flex items-center gap-1 px-3 py-1 r-sm bg-lime text-black text-xs font-mono font-extrabold shadow-sm">
                      {study.stat}
                    </span>
                  </div>

                  {/* Illustrated Mockup Centerpiece */}
                  <div className="my-auto py-4">
                    {study.previewType === "airplane" && (
                      <div className="bg-white/95 text-slate-900 r p-4 shadow-md border border-black/10 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-mono font-extrabold text-slate-950">Flight Ops Telemetry #892</div>
                          <div className="text-[11px] font-medium text-slate-600">Automated route dispatch active</div>
                        </div>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 r-sm border border-emerald-200">
                          On-Time: 99.4%
                        </span>
                      </div>
                    )}

                    {study.previewType === "person" && (
                      <div className="bg-white/95 text-slate-900 r p-4 shadow-md border border-black/10 space-y-2">
                        <div className="flex items-center justify-between text-xs font-extrabold text-slate-950">
                          <span>AI Knowledge Copilot</span>
                          <span className="text-emerald-700 font-mono">● 100k+ Queries</span>
                        </div>
                        <div className="h-2.5 bg-emerald-100 r-sm overflow-hidden border border-emerald-200">
                          <div className="h-full bg-emerald-500 r-sm w-[94%]" />
                        </div>
                      </div>
                    )}

                    {study.previewType === "dashboard-green" && (
                      <div className="bg-white/95 text-slate-900 r p-4 shadow-md border border-black/10">
                        <div className="flex justify-between items-center pb-2 border-b border-black/10 text-xs font-extrabold text-slate-950">
                          <span>Reconciliation Ledger</span>
                          <span className="font-mono text-teal-700 font-extrabold">$18.4M Synced</span>
                        </div>
                        <div className="pt-2 flex justify-between text-[11px] text-slate-600 font-medium">
                          <span>Plaid + Stripe + QB</span>
                          <span className="text-emerald-700 font-bold">100% Audited</span>
                        </div>
                      </div>
                    )}

                    {study.previewType === "quote-pink" && (
                      <div className="bg-white/95 text-slate-900 r p-4 shadow-md border border-black/10">
                        <div className="text-xs font-extrabold text-pink-700 mb-1">DTC Ad Pipeline</div>
                        <div className="text-xs font-semibold text-slate-800">500+ Creative variants generated daily</div>
                      </div>
                    )}

                    {study.previewType === "terminal-dark" && (
                      <div className="bg-white/95 text-slate-900 r p-3.5 font-mono text-xs border border-black/10 shadow-md space-y-1">
                        <div className="text-emerald-700 font-bold">&gt; RAG Contract Analyzer v2.4</div>
                        <div className="text-slate-600 font-medium">&gt; 54 clauses verified in 45s</div>
                      </div>
                    )}

                    {study.previewType === "analytics-purple" && (
                      <div className="bg-white/95 text-slate-900 r p-3.5 font-mono text-xs border border-black/10 shadow-md flex justify-between items-center">
                        <div>
                          <span className="block font-bold text-slate-950">Vercel Edge Storefront</span>
                          <span className="text-[10px] text-slate-600 font-medium">P99 Global Latency</span>
                        </div>
                        <span className="text-xl font-black text-indigo-700">38ms</span>
                      </div>
                    )}
                  </div>

                  {/* Client Label */}
                  <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-200">
                    Client: <span className="text-slate-950 dark:text-white font-extrabold">{study.client}</span>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-canvas">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-3 group-hover:text-emerald-700 dark:group-hover:text-lime transition-colors font-heading">
                      {study.title}
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed mb-6 font-normal">
                      {study.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-line/70">
                    <span className="text-xs font-mono font-bold text-ink">
                      {study.statLabel}: <span className="text-emerald-700 dark:text-lime font-extrabold">{study.stat}</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-canvas-alt dark:bg-canvas-subtle border border-line flex items-center justify-center text-ink group-hover:bg-lime group-hover:text-black transition-colors">
                      <ArrowUpRight01Icon className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* View All Button */}
        <AnimateOnScroll direction="up" delay={200}>
          <div className="mt-12 text-center">
            <ZenSecondaryButton href="#book" className="px-6 py-3 text-xs font-bold">
              View all case studies
            </ZenSecondaryButton>
          </div>
        </AnimateOnScroll>

        {/* Bottom Social Proof Bar */}
        <div className="mt-16 pt-10 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "14,750+", label: "Hours Automated" },
            { val: "2.4x", label: "Average Client ROI" },
            { val: "< 15 min", label: "Direct Support SLA" },
            { val: "5.0", label: "Clutch Verified Rating", star: true },
          ].map((item, i) => (
            <AnimateOnScroll key={i} direction="up" delay={i * 100}>
              <div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-ink font-heading">{item.val}</span>
                  {item.star && <span className="text-amber-500 font-bold">★</span>}
                </div>
                <div className="text-xs text-ink-muted font-medium mt-1">{item.label}</div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
