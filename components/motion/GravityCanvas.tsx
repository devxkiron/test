"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  color: "accent" | "success" | "gold";
  radius: number;
  opacity: number;
  targetOpacity: number;
  phase: number;
  phaseSpeed: number;
}

interface GravityCanvasProps {
  nodes: { label: string; color: "accent" | "success" | "gold" }[];
}

/* Muted palette matching user's B&W spectrum */
const COLORS = {
  accent:  { r: 80, g: 114, b: 147 },
  success: { r: 75, g: 140, b: 94 },
  gold:    { r: 181, g: 154, b: 78 },
};

function rgba(c: { r: number; g: number; b: number }, a: number) {
  return `rgba(${c.r},${c.g},${c.b},${a})`;
}

export function GravityCanvas({ nodes: nodeDefs }: GravityCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const initNodes = useCallback((width: number, height: number) => {
    nodesRef.current = nodeDefs.map((def, i) => {
      const angle = (i / nodeDefs.length) * Math.PI * 2;
      const r = Math.min(width, height) * 0.28;
      return {
        x: width / 2 + Math.cos(angle) * r * (0.6 + Math.random() * 0.6),
        y: height / 2 + Math.sin(angle) * r * (0.5 + Math.random() * 0.5),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        label: def.label,
        color: def.color,
        radius: 34 + Math.random() * 10,
        opacity: 0,
        targetOpacity: 0.85 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.008 + Math.random() * 0.006,
      };
    });
  }, [nodeDefs]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (nodesRef.current.length === 0) {
        initNodes(canvas.width, canvas.height);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    canvas.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      const { width, height } = canvas;
      const dark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      /* Update physics */
      nodes.forEach((node) => {
        node.phase += node.phaseSpeed;
        const float = Math.sin(node.phase) * 0.3;

        /* Cursor repulsion */
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 110;
        if (d < repelRadius && d > 0) {
          const force = ((repelRadius - d) / repelRadius) * 1.8;
          node.vx += (dx / d) * force * 0.08;
          node.vy += (dy / d) * force * 0.08;
        }

        /* Center-pull */
        const cx = width / 2;
        const cy = height / 2;
        node.vx += (cx - node.x) * 0.00015;
        node.vy += (cy - node.y) * 0.00015;

        node.vy += float * 0.01;
        node.vx *= 0.96;
        node.vy *= 0.96;
        node.x += node.vx;
        node.y += node.vy;

        /* Boundary bounce */
        const margin = node.radius + 20;
        if (node.x < margin) { node.x = margin; node.vx *= -0.5; }
        if (node.x > width - margin) { node.x = width - margin; node.vx *= -0.5; }
        if (node.y < margin) { node.y = margin; node.vy *= -0.5; }
        if (node.y > height - margin) { node.y = height - margin; node.vy *= -0.5; }

        /* Fade in */
        if (node.opacity < node.targetOpacity) {
          node.opacity = Math.min(node.targetOpacity, node.opacity + 0.008);
        }
      });

      /* Connection lines */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.2 * Math.min(a.opacity, b.opacity);
            const col = COLORS[a.color];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = rgba(col, alpha);
            ctx.lineWidth = 1;
            ctx.stroke();

            /* Moving pulse dot */
            const t = (Date.now() % 3000) / 3000;
            const px = a.x + dx * t;
            const py = a.y + dy * t;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = rgba(col, alpha * 2);
            ctx.fill();
          }
        }
      }

      /* Draw nodes */
      nodes.forEach((node) => {
        const col = COLORS[node.color];
        const r = node.radius;

        /* Glow */
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 2.2);
        gradient.addColorStop(0, rgba(col, node.opacity * 0.1));
        gradient.addColorStop(1, rgba(col, 0));
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        /* Circle body */
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(26,26,26,${node.opacity * 0.92})`
          : `rgba(255,255,255,${node.opacity * 0.92})`;
        ctx.fill();

        /* Border */
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = dark
          ? rgba(col, node.opacity * 0.35)
          : rgba(col, node.opacity * 0.25);
        ctx.lineWidth = 1;
        ctx.stroke();

        /* Label */
        ctx.fillStyle = rgba(col, node.opacity);
        ctx.font = "600 11px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.x, node.y);
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
