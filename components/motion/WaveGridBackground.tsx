"use client";

import { useEffect, useRef } from "react";

export function WaveGridBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const cols = 28;
    const rows = 16;
    let time = 0;

    const isDark = () => document.documentElement.classList.contains("dark");

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      const dark = isDark();

      // Perfectly balanced contrast: clearly visible in Light Mode, fine-tuned in Dark Mode
      const strokeColor = dark
        ? "rgba(100, 145, 185, 0.20)"
        : "rgba(70, 95, 125, 0.30)";
      
      const dotColor = dark
        ? "rgba(220, 230, 245, 0.32)"
        : "rgba(60, 90, 120, 0.52)";

      const cellWidth = width / (cols - 1);
      const cellHeight = height / (rows - 1);

      // Pre-calculate grid node coordinates with gentle wave physics
      const grid: { x: number; y: number; z: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = c * cellWidth;
          const baseY = r * cellHeight;

          // Distance to mouse cursor
          const dx = baseX - mouseX;
          const dy = baseY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseEffect = Math.sin(dist * 0.02 - time * 2) * Math.max(0, 18 - dist * 0.05);

          // Wave equations
          const waveZ =
            Math.sin(c * 0.32 + time) * 11 +
            Math.cos(r * 0.38 + time * 0.85) * 11 +
            mouseEffect;

          grid[r][c] = {
            x: baseX,
            y: baseY + waveZ,
            z: waveZ,
          };
        }
      }

      ctx.lineWidth = dark ? 0.75 : 0.9;
      ctx.strokeStyle = strokeColor;

      // Draw horizontal wave lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Draw vertical wave lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = grid[r][c];
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Draw vertex dots at grid intersections
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const pt = grid[r][c];
          ctx.beginPath();
          const radius = dark ? 0.9 : 1.2;
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden [mask-image:radial-gradient(ellipse_85%_85%_at_50%_45%,#000_65%,transparent_100%)]">
      <canvas
        ref={canvasRef}
        className={className || "absolute inset-0 w-full h-full pointer-events-none opacity-95 dark:opacity-80"}
      />
    </div>
  );
}
