"use client";

import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CanvasCrowd } from "@/components/motion/CanvasCrowd";
import { Activity01Icon, FlashIcon, CheckmarkCircle01Icon } from "hugeicons-react";

export function CrowdAutomationSection() {
  return (
    <section className="relative py-24 bg-canvas-alt/40 border-b border-line overflow-hidden select-none">
      {/* Skiper UI 39th Canvas Crowd Background */}
      <CanvasCrowd />

      <Container className="relative z-10">
        <div className="max-w-xl bg-canvas/90 backdrop-blur-md border border-line p-6 sm:p-8 rounded-xs shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="success" size="sm" dot pulse>
              Live Task Mesh
            </Badge>
            <span className="text-xs font-mono text-ink-muted">Distributed Network State</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-3">
            Thousands of operations running concurrently.
          </h3>

          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
            Instead of human staff manually checking inboxes, copy-pasting customer records, and preparing manual quotes, our decentralized nodes handle event ingestion, transformation, and distribution seamlessly.
          </p>

          <div className="grid grid-cols-2 gap-3 border-t border-line pt-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Activity01Icon size={16} className="text-success" />
              <span className="text-ink font-semibold">99.98% Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <FlashIcon size={16} className="text-accent" />
              <span className="text-ink font-semibold">&lt; 120ms Latency</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
