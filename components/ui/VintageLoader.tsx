"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { siteConfig } from "@/lib/data";

export function VintageLoader() {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING RUNTIME");
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Progress counter simulation
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 12;
        const next = Math.min(100, prev + step);
        if (next > 30 && next < 70) {
          setStatusText("CALIBRATING AUTOMATION MESH");
        } else if (next >= 70 && next < 100) {
          setStatusText("ESTABLISHING ZERO-FRICTION PIPELINE");
        } else if (next === 100) {
          setStatusText("SYSTEMS READY");
        }
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent === 100) {
      const timer = setTimeout(() => {
        gsap.to("#vintage-loader-overlay", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            setIsMounted(false);
          },
        });
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [percent]);

  if (!isMounted) return null;

  return (
    <div
      id="vintage-loader-overlay"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-canvas p-6 sm:p-10 pointer-events-auto select-none"
    >
      {/* Top Header */}
      <div className="w-full flex items-center justify-between border-b border-line pb-3 font-mono text-xs text-ink-muted">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-xs bg-accent animate-pulse" />
          <span className="font-semibold text-ink">{siteConfig.name}</span>
        </div>
        <span className="text-ink-ghost">SYS.INIT // 2026.Q3</span>
      </div>

      {/* Center Progress Box */}
      <div className="w-full max-w-sm border border-line bg-canvas-alt p-6 rounded-xs">
        <div className="flex items-baseline justify-between mb-3 font-mono">
          <span className="text-xs text-ink-muted">{statusText}</span>
          <span className="text-2xl font-bold text-ink">{percent}%</span>
        </div>

        {/* Segmented Progress Bar */}
        <div className="w-full h-2 rounded-xs bg-line overflow-hidden p-0.5 flex gap-0.5">
          <div
            className="h-full bg-accent transition-all duration-100 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-ink-ghost border-t border-line/60 pt-3">
          <span>LATENCY: 0.8ms</span>
          <span>PIPELINE: ACTIVE</span>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full flex items-center justify-between border-t border-line pt-3 font-mono text-xs text-ink-ghost">
        <span>EST. 2021 · AUTOMATION & SOFTWARE AGENCY</span>
        <span>AUTONOMOUS SYSTEMS</span>
      </div>
    </div>
  );
}
