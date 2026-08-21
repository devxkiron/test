"use client";

import { useState, useEffect, useRef } from "react";
import { clientStories } from "@/lib/data";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";

const GAP_PX = 32;

export function ClientStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isClient, setIsClient] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevStory = () => {
    setCurrentIndex((prev) => (prev === 0 ? clientStories.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setCurrentIndex((prev) => (prev === clientStories.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextStory();
    } else if (diff < -50) {
      prevStory();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Card dimensions based on viewport
  const cardWidth = isClient ? Math.min(780, Math.max(300, windowWidth * 0.88)) : 780;
  const trackOffset = isClient
    ? windowWidth / 2 - cardWidth / 2 - currentIndex * (cardWidth + GAP_PX)
    : 0;

  return (
    <section
      id="stories"
      className="relative py-24 sm:py-32 bg-[#14221A] text-white overflow-hidden w-full select-none"
    >
      {/* Background Dot Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #D4FF00 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Section Title */}
      <div className="text-center mb-12 sm:mb-16 px-4">
        <span className="text-xs font-mono font-bold tracking-widest text-[#D4FF00] uppercase block mb-3">
          ✦ Verified Client Stories
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading">
          Client Stories
        </h2>
      </div>

      {/* ─── Full-Width Sliding Track Carousel ─── */}
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{
            transform: `translateX(${trackOffset}px)`,
          }}
        >
          {clientStories.map((story, idx) => {
            const isActive = idx === currentIndex;

            return (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: `${cardWidth}px`,
                  marginRight: `${GAP_PX}px`,
                }}
                className={`shrink-0 transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-25 hover:opacity-45 scale-[0.92] blur-[0.5px]"
                }`}
              >
                {/* Testimonial Card Content */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 p-6 sm:p-8">
                  {/* Left Column: Portrait Avatar + Nav Buttons */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`w-36 h-48 sm:w-44 sm:h-56 r-lg overflow-hidden shadow-2xl flex flex-col items-center justify-center ${story.avatarBg} transition-transform duration-300 ${
                        isActive ? "scale-100" : "scale-95"
                      }`}
                    >
                      <span className="text-5xl sm:text-6xl font-black text-white font-heading drop-shadow-md">
                        {story.initials}
                      </span>
                      <span className="text-[9px] font-mono text-white/90 uppercase tracking-widest font-bold mt-2">
                        {story.company}
                      </span>
                    </div>

                    {/* Nav Controls Under Avatar for Active Slide */}
                    <div
                      className={`flex items-center justify-center gap-3 mt-4 transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevStory();
                        }}
                        className="w-8 h-8 rounded-full bg-[#D4FF00] text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
                        aria-label="Previous story"
                      >
                        <ArrowLeft01Icon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextStory();
                        }}
                        className="w-8 h-8 rounded-full bg-[#D4FF00] text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
                        aria-label="Next story"
                      >
                        <ArrowRight01Icon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Quote + Attribution */}
                  <div className="flex-1 text-center sm:text-left pt-2">
                    {/* Big Lime Quote Mark */}
                    <span className="text-5xl sm:text-6xl font-black text-[#D4FF00] leading-none font-heading select-none block mb-1">
                      &ldquo;
                    </span>

                    {/* Quote Text */}
                    <blockquote className="text-base sm:text-xl md:text-2xl font-medium text-white/95 leading-snug tracking-tight mb-6">
                      {story.quote}
                    </blockquote>

                    {/* Author Info */}
                    <div>
                      <div className="font-bold text-sm sm:text-base text-[#D4FF00] font-heading">
                        {story.author}
                      </div>
                      <div className="text-xs text-white/60 font-mono mt-0.5">
                        {story.role}, {story.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {clientStories.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 r-pill cursor-pointer ${
              i === currentIndex
                ? "w-8 h-2 bg-[#D4FF00]"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
