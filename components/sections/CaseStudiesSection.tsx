"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { caseStudies, type CaseStudyItem } from "@/lib/data";
import { 
  ArrowUpRight01Icon, 
  WorkflowSquare01Icon, 
  ComputerIcon, 
  CheckmarkCircle01Icon,
  Alert02Icon,
  FlashIcon
} from "hugeicons-react";
import { cn } from "@/lib/utils";

type CategoryFilter = "All" | "Custom Projects" | "Automation Projects";

export function CaseStudiesSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filteredStudies = caseStudies.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <section id="work" className="py-24 bg-canvas-alt/30 border-b border-line select-none">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <Badge variant="accent" size="md" className="mb-4">
            Production Outcomes & ROI
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Real systems. Measured dollar leverage.
          </h2>
          <p className="mt-3 text-ink-muted text-sm sm:text-base leading-relaxed">
            Every project represents a verified operational breakthrough that immediately reclaimed team capacity and accelerated revenue.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xs border border-line bg-canvas font-mono text-xs shadow-xs">
            {(["All", "Custom Projects", "Automation Projects"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xs font-semibold transition-all duration-150 cursor-pointer shimmer active:scale-95",
                  activeCategory === cat
                    ? "bg-accent text-canvas shadow-xs"
                    : "text-ink-muted hover:text-ink hover:bg-canvas-alt"
                )}
              >
                {cat === "All" ? "All Case Studies" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((cs) => {
            return (
              <div
                key={cs.id}
                className="rounded-xs border border-line bg-canvas p-6 transition-all duration-200 hover:border-line-strong hover:shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={cs.accent} size="sm">
                      {cs.category}
                    </Badge>
                    <span className="font-mono text-[11px] text-ink-muted font-bold">
                      {cs.client}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-ink leading-snug mb-3">
                    {cs.title}
                  </h3>

                  {/* Pain vs Solution Breakdown */}
                  <div className="space-y-3 mb-5 text-xs">
                    <div className="p-3 rounded-xs border border-line bg-canvas-alt">
                      <span className="font-mono text-[10px] uppercase font-bold text-ink-muted block mb-1 flex items-center gap-1">
                        <Alert02Icon size={12} className="text-warm" /> Before: Manual Friction
                      </span>
                      <p className="text-ink-muted leading-relaxed">
                        {cs.painPoint}
                      </p>
                    </div>

                    <div className="p-3 rounded-xs border border-success/30 bg-success-bg">
                      <span className="font-mono text-[10px] uppercase font-bold text-success block mb-1 flex items-center gap-1">
                        <FlashIcon size={12} className="text-success" /> After: Autonomous Solution
                      </span>
                      <p className="text-ink font-medium leading-relaxed">
                        {cs.solution}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Table */}
                  <div className="space-y-2 mb-6 border-t border-line pt-4 font-mono">
                    {cs.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center justify-between text-xs py-1 border-b border-line/60 last:border-0"
                      >
                        <span className="text-ink-muted">{m.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink">{m.value}</span>
                          <span className="inline-flex items-center rounded-xs border border-success-light bg-success-bg px-1.5 py-0.5 text-[10px] font-semibold text-success">
                            {m.delta}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Footer */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-line">
                  {cs.stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-xs border border-line bg-canvas-alt px-2 py-0.5 text-[10px] font-mono text-ink-muted"
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
