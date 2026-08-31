"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { faqs, siteConfig } from "@/lib/data";
import { PlusIcon, MinusIcon } from "@/components/icons";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-canvas border-t border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Headline */}
          <div className="lg:col-span-5">
            <AnimateOnScroll direction="left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 r-pill bg-canvas-alt dark:bg-canvas-subtle border border-line text-xs font-mono font-semibold text-ink-muted mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-4 font-heading">
                Frequently <br className="hidden sm:inline" />
                Asked <br className="hidden sm:inline" />
                Questions
              </h2>
              <p className="text-base text-ink leading-relaxed mb-6">
                Have a question not listed here? Drop us a line directly at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-ink font-bold underline underline-offset-4 hover:text-emerald-700 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </p>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Clean Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <AnimateOnScroll key={idx} direction="right" delay={idx * 80}>
                  <div
                    className="skewElem r-lg border border-line bg-canvas-alt/70 dark:bg-canvas-subtle/40 overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-bold text-ink tracking-tight font-heading">
                        {faq.question}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-lime text-black rotate-180 shadow-xs"
                            : "bg-canvas dark:bg-canvas-subtle text-ink border border-line"
                        }`}
                      >
                        {isOpen ? (
                          <MinusIcon size={16} />
                        ) : (
                          <PlusIcon size={16} />
                        )}
                      </span>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: isOpen ? "300px" : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-0">
                        <div className="pt-3 border-t border-line/70">
                          <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-normal">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
