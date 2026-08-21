"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalTextRevealProps {
  text: string;
  className?: string;
}

export function HorizontalTextReveal({
  text = "We engineer self-healing automation systems and high-velocity web platforms that lift the daily operational drag off your business forever.",
  className,
}: HorizontalTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const words = text.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        {
          opacity: 0.15,
          y: 4,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.8,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cn("text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink leading-relaxed", className)}>
      {words.map((word, idx) => (
        <span
          key={idx}
          ref={(el) => {
            if (el) wordsRef.current[idx] = el;
          }}
          className="inline-block mr-[0.3em] transition-colors"
        >
          {word}
        </span>
      ))}
    </div>
  );
}
