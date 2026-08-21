"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  PlayIcon, 
  PauseIcon, 
  VolumeHighIcon, 
  VolumeMute01Icon, 
  Maximize01Icon, 
  Activity01Icon,
  CheckmarkCircle01Icon
} from "hugeicons-react";
import { cn } from "@/lib/utils";

interface VintageVideoPlayerProps {
  title?: string;
  thumbnailUrl?: string;
  videoDuration?: string;
  className?: string;
}

export function VintageVideoPlayer({
  title = "Veloce Automation Architecture Walkthrough",
  thumbnailUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  videoDuration = "02:45",
  className,
}: VintageVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState("00:00");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 0.5;
          const totalSeconds = 165; // 2:45
          const currentSec = Math.floor((next / 100) * totalSeconds);
          const mins = Math.floor(currentSec / 60).toString().padStart(2, "0");
          const secs = (currentSec % 60).toString().padStart(2, "0");
          setCurrentTimeFormatted(`${mins}:${secs}`);
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div
      className={cn(
        "rounded-xs border border-line bg-canvas overflow-hidden shadow-xs select-none",
        className
      )}
    >
      {/* Top Vintage Hardware Header Bar */}
      <div className="flex items-center justify-between border-b border-line bg-canvas-alt px-4 py-2.5 font-mono text-xs text-ink-muted">
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-xs", isPlaying ? "bg-success animate-pulse" : "bg-accent")} />
          <span className="font-semibold text-ink truncate max-w-[220px] sm:max-w-none">{title}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-ink-ghost">
          <span>REC: 1080P // 60FPS</span>
          <span className="hidden sm:inline">CODEC: H.265</span>
        </div>
      </div>

      {/* Video Viewport / Canvas */}
      <div className="relative aspect-video w-full bg-canvas-alt overflow-hidden group">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className={cn(
            "object-cover transition-transform duration-700",
            isPlaying ? "scale-102 filter-none" : "filter grayscale-[30%] group-hover:scale-105"
          )}
        />

        {/* Subtle CRT / Scanline effect overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

        {/* Center Big Play Button (when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-canvas/40 backdrop-blur-[2px]">
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="flex h-16 w-16 items-center justify-center rounded-xs border border-accent bg-canvas text-accent hover:bg-accent hover:text-canvas transition-all duration-200 cursor-pointer shadow-xs"
              aria-label="Play video demo"
            >
              <PlayIcon size={28} className="ml-1" />
            </button>
          </div>
        )}

        {/* Video Telemetry Watermark */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-xs border border-line/60 bg-canvas/80 px-2.5 py-1 text-[10px] font-mono backdrop-blur-sm text-ink z-10">
          <Activity01Icon size={12} className="text-success" />
          <span>VELOCE LIVE RUNTIME DEMO</span>
        </div>
      </div>

      {/* Custom Control Scrubber & Playbar */}
      <div className="border-t border-line bg-canvas p-3 sm:p-4">
        {/* Scrubber track */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setProgress(clickPos * 100);
          }}
          className="relative w-full h-1.5 rounded-xs bg-line cursor-pointer mb-3 overflow-hidden"
        >
          <div
            className="h-full bg-accent transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-7 w-7 items-center justify-center rounded-xs border border-line bg-canvas-alt text-ink hover:bg-canvas-subtle transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} className="ml-0.5" />}
            </button>

            <span className="text-[11px] text-ink font-semibold">
              {currentTimeFormatted} <span className="text-ink-ghost">/ {videoDuration}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 text-ink-muted hover:text-ink transition-colors cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeMute01Icon size={16} /> : <VolumeHighIcon size={16} />}
            </button>
            <span className="text-[10px] uppercase text-ink-ghost hidden sm:inline">Stereo 48kHz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
