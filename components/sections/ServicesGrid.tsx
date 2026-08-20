"use client";

import { useState } from "react";
import { FlashIcon, ComputerIcon, ServerStack01Icon, CheckmarkCircle01Icon, ArrowRight01Icon } from "hugeicons-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";

const IconMap = {
  Zap: FlashIcon,
  Monitor: ComputerIcon,
  Server: ServerStack01Icon,
};

export function ServicesGrid() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 bg-canvas border-b border-line">
      <Container>
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <Badge variant="accent" size="md" className="mb-4">Services & Capabilities</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Three focused pillars.{" "}
            <span className="text-ink-muted">Zero bloat.</span>
          </h2>
          <p className="mt-4 text-ink-muted text-sm sm:text-base leading-relaxed">
            We do not dilute focus with endless service lists. We execute three foundational disciplines that compound into exponential velocity.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = IconMap[service.icon as keyof typeof IconMap] || FlashIcon;
            const isHovered = hovered === service.id;

            return (
              <div
                key={service.id}
                className={cn(
                  "relative rounded-lg border bg-canvas p-6 transition-all duration-300 flex flex-col justify-between shimmer",
                  isHovered
                    ? "border-line-strong shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(255,255,255,0.03)]"
                    : "border-line"
                )}
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div>
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-line bg-canvas-alt text-ink mb-5">
                    <Icon size={20} className="text-accent" />
                  </div>

                  {/* Subtitle badge */}
                  <div className="mb-3">
                    <Badge variant={service.accent} size="sm">
                      {service.subtitle}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-ink mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-ink-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 border-t border-line pt-4">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-muted">
                        <CheckmarkCircle01Icon size={16} className="shrink-0 mt-0.5 text-success" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metric Callout */}
                <div className="rounded-md border border-line bg-canvas-alt p-3.5 mt-2">
                  <div className="text-xl font-bold font-mono text-ink tracking-tight">
                    {service.metrics.value}
                  </div>
                  <div className="text-xs text-ink-muted mt-0.5">{service.metrics.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
