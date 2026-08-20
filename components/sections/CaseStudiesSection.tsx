"use client";

import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { caseStudies } from "@/lib/data";
import { ArrowUpRight01Icon } from "hugeicons-react";

export function CaseStudiesSection() {
  return (
    <section className="py-24 bg-canvas-alt/30 border-b border-line">
      <Container>
        <div className="mb-14 text-center">
          <Badge variant="accent" size="md" className="mb-4">Case Outcomes</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Real production systems. Measured ROI.
          </h2>
          <p className="mt-3 text-ink-muted max-w-lg mx-auto text-sm sm:text-base">
            Every implementation represents a measured outcome delivering immediate operational and financial leverage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {caseStudies.map((cs) => {
            return (
              <div
                key={cs.id}
                className="rounded-lg border border-line bg-canvas p-6 transition-all duration-300 hover:border-line-strong flex flex-col justify-between shimmer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={cs.accent} size="sm">
                      {cs.tag}
                    </Badge>
                    <ArrowUpRight01Icon size={16} className="text-ink-muted" />
                  </div>

                  <h3 className="text-base font-bold text-ink leading-snug mb-3">
                    {cs.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
                    {cs.description}
                  </p>

                  {/* Metrics */}
                  <div className="space-y-2.5 mb-6 border-t border-line pt-4">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="flex items-center justify-between text-xs py-1 border-b border-line/60 last:border-0">
                        <span className="text-ink-muted">{m.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-mono text-ink">{m.value}</span>
                          <span className="inline-flex items-center rounded border border-success-light bg-success-bg px-1.5 py-0.5 text-[10px] font-mono font-semibold text-success">
                            {m.delta}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-line">
                  {cs.stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded border border-line bg-canvas-alt px-2 py-0.5 text-[11px] font-mono text-ink-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
