"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { team } from "@/lib/data";
import { 
  CodeIcon, 
  ServerStack01Icon, 
  WorkflowSquare01Icon, 
  CodeSquareIcon, 
  GithubIcon, 
  Linkedin02Icon, 
  LinkSquare01Icon 
} from "hugeicons-react";
import { cn } from "@/lib/utils";

const roleIcons = {
  frontend: CodeIcon,
  backend: ServerStack01Icon,
  automation: WorkflowSquare01Icon,
};

export function TeamSection() {
  const [activeMemberId, setActiveMemberId] = useState<string>("frontend");

  const activeMember = team.find((m) => m.id === activeMemberId) || team[0];

  return (
    <section id="team" className="py-24 bg-canvas border-b border-line">
      <Container>
        <div className="mb-14 text-center">
          <Badge variant="accent" size="md" className="mb-4">Principal Technical Leads</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Direct Access to Senior Specialists
          </h2>
          <p className="mt-3 text-ink-muted max-w-lg mx-auto text-sm sm:text-base">
            No junior hand-offs, no bloated account layers. You work directly with the dedicated engineers designing and building your systems.
          </p>
        </div>

        {/* 3 Core Specialist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {team.map((member) => {
            const isSelected = activeMemberId === member.id;
            const Icon = roleIcons[member.id as keyof typeof roleIcons] || CodeIcon;

            return (
              <div
                key={member.id}
                onClick={() => setActiveMemberId(member.id)}
                className={cn(
                  "relative rounded-xs border bg-canvas p-6 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-xs",
                  isSelected
                    ? "border-accent ring-1 ring-accent"
                    : "border-line hover:border-line-strong"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={member.accent} size="sm">
                      {member.role}
                    </Badge>
                    <div className="h-2 w-2 rounded-xs bg-success" />
                  </div>

                  {/* Icon Avatar */}
                  <div className="h-12 w-12 rounded-xs border border-line bg-canvas-alt flex items-center justify-center text-ink mb-4">
                    <Icon size={24} className="text-accent" />
                  </div>

                  <h3 className="text-lg font-bold text-ink">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-ink-muted mt-0.5 mb-3">
                    {member.headline}
                  </p>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {member.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xs border border-line bg-canvas-alt p-2 text-center font-mono"
                      >
                        <div className="text-xs font-bold text-ink">{m.value}</div>
                        <div className="text-[10px] text-ink-muted mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-line mb-4">
                    {member.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-xs border border-line bg-canvas-alt px-2 py-0.5 text-[11px] font-mono text-ink-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-3 pt-3 border-t border-line text-xs font-mono text-ink-muted">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-ink transition-colors"
                    >
                      <GithubIcon size={14} />
                      <span>GitHub</span>
                    </a>
                    <span>·</span>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-ink transition-colors"
                    >
                      <Linkedin02Icon size={14} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Engineer Telemetry Spec */}
        <div className="rounded-xs border border-line bg-canvas-alt/70 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <CodeSquareIcon size={18} className="text-accent" />
              <span className="text-xs font-mono font-bold text-ink uppercase">
                Active Architecture Spec — {activeMember.name} ({activeMember.role})
              </span>
            </div>
            <div className="text-[11px] font-mono text-ink-muted">
              Focus: Production Reliability & Zero Downtime
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="rounded-xs border border-line bg-canvas p-3">
              <span className="text-[10px] text-ink-muted uppercase block mb-1">Signature Stack</span>
              <span className="text-ink font-semibold">{activeMember.stack.slice(0, 3).join(" · ")}</span>
            </div>
            <div className="rounded-xs border border-line bg-canvas p-3">
              <span className="text-[10px] text-ink-muted uppercase block mb-1">Optimization Benchmark</span>
              <span className="text-success font-semibold">{activeMember.metrics[0].label}: {activeMember.metrics[0].value}</span>
            </div>
            <div className="rounded-xs border border-line bg-canvas p-3">
              <span className="text-[10px] text-ink-muted uppercase block mb-1">Architecture Guarantee</span>
              <span className="text-ink font-semibold">100% Direct Principal Review</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
