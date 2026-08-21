"use client";

import { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon, VolumeHighIcon, VolumeMute01Icon, Mic01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

export function AudioStoryPlayer({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Web Audio dummy sound synthesizer for demo audio
  const startDummyAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Gentle warm chord frequency modulation
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(isMuted ? 0 : 0.04, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  const stopDummyAudio = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch {}
      oscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopDummyAudio();
      setIsPlaying(false);
    } else {
      startDummyAudio();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(nextMute ? 0 : 0.04, audioContextRef.current.currentTime);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            stopDummyAudio();
            return 0;
          }
          return prev + 1.2;
        });
      }, 150);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      stopDummyAudio();
    };
  }, []);

  return (
    <div
      onClick={togglePlay}
      className={cn(
        "inline-flex items-center gap-3 border border-line bg-canvas-alt px-3.5 py-2 rounded-xs font-mono text-xs transition-all duration-200 hover:border-line-strong cursor-pointer shimmer select-none active:scale-[0.98]",
        isPlaying && "border-accent ring-1 ring-accent/30 bg-canvas",
        className
      )}
    >
      {/* Play/Pause Button */}
      <button
        type="button"
        className="flex h-7 w-7 items-center justify-center rounded-xs border border-line bg-canvas text-ink hover:bg-canvas-subtle transition-colors cursor-pointer shrink-0"
        aria-label={isPlaying ? "Pause story" : "Click to play our story"}
      >
        {isPlaying ? (
          <PauseIcon size={13} className="text-accent" />
        ) : (
          <PlayIcon size={13} className="text-accent ml-0.5" />
        )}
      </button>

      {/* Label and Live Audio Wave */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-ink">
            {isPlaying ? "Playing Story: The Automation Shift" : "Click to play our story"}
          </span>
          <span className="text-[10px] text-ink-ghost">0:24</span>
        </div>

        {/* Animated Equalizer Wave Bars */}
        <div className="flex items-center gap-1 h-3">
          {[40, 75, 55, 90, 45, 80, 60, 35].map((heightPercent, idx) => (
            <span
              key={idx}
              className={cn(
                "w-0.5 rounded-xs transition-all duration-200",
                isPlaying ? "bg-accent" : "bg-line-strong"
              )}
              style={{
                height: isPlaying
                  ? `${Math.max(20, (heightPercent + ((idx * 15) % 40)) * (isPlaying ? 0.9 : 0.2))}%`
                  : "30%",
                animation: isPlaying
                  ? `pulse 0.8s ease-in-out ${idx * 0.1}s infinite alternate`
                  : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Volume toggle */}
      {isPlaying && (
        <button
          type="button"
          onClick={toggleMute}
          className="ml-2 text-ink-muted hover:text-ink transition-colors cursor-pointer"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeMute01Icon size={14} /> : <VolumeHighIcon size={14} />}
        </button>
      )}
    </div>
  );
}
