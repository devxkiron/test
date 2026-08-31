"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { clientStories } from "@/lib/data";
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  StarIcon, 
  CheckmarkCircleIcon 
} from "@/components/icons";

const AUTO_PLAY_INTERVAL = 4500; // 4.5 seconds per slide
const GAP_PX = 28;

export function ClientStoriesSection() {
  const storiesCount = clientStories.length;
  // activeIndex is strictly bounded between 0 and storiesCount - 1
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isClient, setIsClient] = useState(false);

  // Drag / Swipe Tracking
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDistance = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Handle Window Resize for responsive card width & centering
  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation handlers
  const nextStory = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % storiesCount);
  }, [storiesCount]);

  const prevStory = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? storiesCount - 1 : prev - 1));
  }, [storiesCount]);

  const goToStory = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Auto Carousel Loop with Pause on Hover / Drag
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextStory();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, nextStory]);

  // Touch Swipe Handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    isDragging.current = true;
    startX.current = e.targetTouches[0].clientX;
    dragDistance.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - startX.current;
    dragDistance.current = diff;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDistance.current < -45) {
      nextStory();
    } else if (dragDistance.current > 45) {
      prevStory();
    }
    setDragOffset(0);
    setIsPaused(false);
  };

  // Mouse Drag Handlers (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPaused(true);
    isDragging.current = true;
    startX.current = e.clientX;
    dragDistance.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current;
    dragDistance.current = diff;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDistance.current < -45) {
      nextStory();
    } else if (dragDistance.current > 45) {
      prevStory();
    }
    setDragOffset(0);
  };

  // Card Width Calculation
  const cardWidth = isClient
    ? Math.min(840, Math.max(310, windowWidth * 0.86))
    : 840;

  return (
    <section
      id="stories"
      className="relative py-24 sm:py-32 bg-[#14221A] text-white flex flex-col justify-between overflow-hidden select-none w-full"
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #D4FF00 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 r-pill bg-[#1A2C21] border border-white/15 text-xs font-mono font-bold text-[#D4FF00] mb-3 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
          Verified Client Stories
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading leading-tight">
          Client Stories & Proven ROI
        </h2>
        <p className="text-sm sm:text-base text-[#D4E0D7] max-w-xl mx-auto mt-2 font-normal">
          Real feedback from founders and engineering leaders deploying AI solutions with Goodspeed.
        </p>
      </div>

      {/* ─── Circular Reel Stage (Never Empty, Always Fully Balanced) ─── */}
      <div
        className="relative z-10 w-full overflow-hidden cursor-grab active:cursor-grabbing min-h-[380px] sm:min-h-[420px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          handleMouseUp();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="relative w-full h-full min-h-[380px] sm:min-h-[420px] flex items-center justify-center">
          {clientStories.map((story, idx) => {
            // Calculate relative slot offset (-2, -1, 0, 1, 2)
            let diff = idx - activeIndex;
            while (diff > Math.floor(storiesCount / 2)) diff -= storiesCount;
            while (diff < -Math.floor(storiesCount / 2)) diff += storiesCount;

            const isActive = diff === 0;
            const isAdjacent = Math.abs(diff) === 1;

            // Compute exact physical horizontal offset from screen center
            const slotDistance = cardWidth + GAP_PX;
            const translateX = diff * slotDistance + dragOffset;

            return (
              <div
                key={idx}
                onClick={() => {
                  if (!isActive) {
                    goToStory(idx);
                  }
                }}
                style={{
                  width: `${cardWidth}px`,
                  transform: `translate3d(calc(-50% + ${translateX}px), -50%, 0)`,
                  zIndex: isActive ? 30 : isAdjacent ? 20 : 10,
                }}
                className={`absolute left-1/2 top-1/2 will-change-transform ${
                  isDragging.current
                    ? "transition-none"
                    : "transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                } ${
                  isActive
                    ? "opacity-100 scale-100 z-30 pointer-events-auto cursor-pointer"
                    : isAdjacent
                    ? "opacity-45 hover:opacity-70 scale-[0.93] blur-[0.3px] pointer-events-auto cursor-pointer"
                    : "opacity-20 hover:opacity-40 scale-[0.86] blur-[0.8px] pointer-events-auto cursor-pointer"
                }`}
              >
                {/* Testimonial Card Container - Matching WorkSection r-xl subtle radius */}
                <div
                  className={`w-full r-xl bg-[#182C21]/95 backdrop-blur-2xl border-2 p-6 sm:p-10 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] origin-center transition-all duration-300 ease-out ${
                    isActive
                      ? "scale-100 hover:scale-105 border-white/25 hover:border-[#D4FF00]/60 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_25px_60px_-15px_rgba(0,0,0,0.7)] hover:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_35px_80px_-10px_rgba(0,0,0,0.9),0_0_35px_rgba(212,255,0,0.2)]"
                      : "border-white/10 shadow-md"
                  }`}
                >
                  {/* Top Bar: 5-Star Verified Rating & Company Pill */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 sm:mb-6">
                    <div className="flex items-center gap-1.5">
                      {[...Array(story.rating || 5)].map((_, starI) => (
                        <StarIcon
                          key={starI}
                          size={16}
                          className="text-[#FBBF24] fill-[#FBBF24]"
                        />
                      ))}
                      <span className="ml-2 font-mono text-xs font-bold text-white/80">
                        5.0 Verified
                      </span>
                    </div>

                    <span className="font-mono text-xs font-extrabold px-3 py-1 r-sm bg-white/10 text-white border border-white/15">
                      {story.company}
                    </span>
                  </div>

                  {/* Main Quote Body */}
                  <div className="flex items-start gap-4 sm:gap-6 my-auto">
                    <span className="text-5xl sm:text-6xl font-black text-[#D4FF00] leading-none font-heading select-none shrink-0 opacity-90">
                      &ldquo;
                    </span>
                    <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-white leading-relaxed tracking-tight">
                      {story.quote}
                    </blockquote>
                  </div>

                  {/* Bottom Author Row */}
                  <div className="pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between mt-4 sm:mt-6">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${story.avatarBg} flex items-center justify-center text-white font-extrabold text-sm sm:text-base font-heading shadow-md border-2 border-white/20`}
                      >
                        {story.initials}
                      </div>
                      <div>
                        <div className="font-extrabold text-sm sm:text-base text-white font-heading">
                          {story.author}
                        </div>
                        <div className="text-xs font-mono text-[#D4FF00]">
                          {story.role}, {story.company}
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/60">
                      <CheckmarkCircleIcon size={14} className="text-[#D4FF00]" />
                      <span>Production Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Bottom Navigation Action Controls & Pagination Dots ─── */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 px-4">
        {/* Previous & Next Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={prevStory}
            className="group flex items-center gap-2 px-5 py-2.5 r-pill bg-[#1A2C21] hover:bg-[#D4FF00] text-white hover:text-black border border-white/20 hover:border-[#D4FF00] font-mono text-xs font-extrabold transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95"
            aria-label="Previous client story"
          >
            <ArrowLeftIcon
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            <span>Previous</span>
          </button>

          <button
            onClick={nextStory}
            className="group flex items-center gap-2 px-5 py-2.5 r-pill bg-[#D4FF00] hover:bg-white text-black font-mono text-xs font-black transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            aria-label="Next client story"
          >
            <span>Next Story</span>
            <ArrowRightIcon
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>

        {/* Pagination Dots Indicator */}
        <div className="flex items-center gap-2">
          {clientStories.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStory(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 r-pill cursor-pointer ${
                i === activeIndex
                  ? "w-8 h-2 bg-[#D4FF00] shadow-[0_0_10px_rgba(212,255,0,0.6)]"
                  : "w-2 h-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


