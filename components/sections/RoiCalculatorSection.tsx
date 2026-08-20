"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AuditModal } from "@/components/ui/AuditModal";
import { formatCurrency } from "@/lib/utils";
import { Calculator01Icon, AnalyticsUpIcon, ArrowRight01Icon } from "hugeicons-react";

export function RoiCalculatorSection() {
  const [hours, setHours] = useState(24);
  const [rate, setRate] = useState(45);
  const [weeks, setWeeks] = useState(50);
  const [auditOpen, setAuditOpen] = useState(false);

  const results = useMemo(() => {
    const hoursSaved = hours * 0.82; // 82% automation rate
    const weeklySavings = hoursSaved * rate;
    const annualSavings = weeklySavings * weeks;
    const implementationCost = 5200;
    const roi = ((annualSavings - implementationCost) / implementationCost) * 100;
    return { hoursSaved, weeklySavings, annualSavings, roi };
  }, [hours, rate, weeks]);

  return (
    <>
      <section id="calculator" className="py-24 bg-canvas border-b border-line">
        <Container>
          <div className="mb-14 text-center">
            <Badge variant="accent" size="md" className="mb-4">Live ROI Model</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              Quantify your automation upside.
            </h2>
            <p className="mt-3 text-ink-muted max-w-lg mx-auto text-sm sm:text-base">
              Adjust the sliders below to estimate your annual hours saved and net dollar ROI.
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-lg border border-line bg-canvas overflow-hidden shimmer">
            {/* Inputs */}
            <div className="p-6 sm:p-8 space-y-7">
              {[
                {
                  label: "Manual hours lost to operations weekly",
                  value: hours,
                  min: 5,
                  max: 80,
                  step: 1,
                  display: `${hours} hrs / week`,
                  setter: setHours,
                },
                {
                  label: "Blended team hourly cost (salary + overhead)",
                  value: rate,
                  min: 20,
                  max: 180,
                  step: 5,
                  display: formatCurrency(rate) + " / hr",
                  setter: setRate,
                },
                {
                  label: "Operational weeks per year",
                  value: weeks,
                  min: 40,
                  max: 52,
                  step: 1,
                  display: `${weeks} weeks`,
                  setter: setWeeks,
                },
              ].map((slider) => (
                <div key={slider.label}>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs sm:text-sm font-medium text-ink">
                      {slider.label}
                    </label>
                    <span className="text-xs sm:text-sm font-bold font-mono text-accent">
                      {slider.display}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      value={slider.value}
                      onChange={(e) => slider.setter(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full bg-line-strong cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-1.5 text-[11px] font-mono text-ink-ghost">
                    <span>{slider.min}</span>
                    <span>{slider.max}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Grid */}
            <div className="border-t border-line bg-canvas-alt/50 p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    label: "Hours Automated / Wk",
                    value: `${results.hoursSaved.toFixed(0)} hrs`,
                    color: "text-ink",
                  },
                  {
                    label: "Weekly Savings",
                    value: formatCurrency(results.weeklySavings),
                    color: "text-ink",
                  },
                  {
                    label: "Annual Dollar ROI",
                    value: formatCurrency(results.annualSavings),
                    color: "text-success",
                  },
                  {
                    label: "Net ROI Multiple",
                    value: `${results.roi.toFixed(0)}%`,
                    color: "text-accent",
                  },
                ].map((r) => (
                  <div key={r.label} className="text-center rounded border border-line bg-canvas p-3">
                    <div className={`text-xl sm:text-2xl font-bold font-mono tracking-tight ${r.color}`}>
                      {r.value}
                    </div>
                    <div className="text-[11px] text-ink-muted mt-1">{r.label}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-md border border-line bg-canvas p-4 mb-6 text-xs sm:text-sm text-ink-muted flex items-center justify-between">
                <span>
                  Estimated payback period: <strong className="text-ink">4–7 weeks</strong>.
                </span>
                <span className="font-mono text-xs text-success flex items-center gap-1.5">
                  <AnalyticsUpIcon size={16} /> High Leverage
                </span>
              </div>

              <Button className="w-full shimmer" size="lg" onClick={() => setAuditOpen(true)}>
                <ArrowRight01Icon size={16} className="mr-1.5 text-accent-light" />
                Validate These Numbers — Book Free Audit
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <AuditModal isOpen={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
