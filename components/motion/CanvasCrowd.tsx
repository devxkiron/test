"use client";

import { useEffect, useRef } from "react";

interface PersonNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  role: "automated" | "manual";
}

export function CanvasCrowd({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 450;
    };

    window.addEventListener("resize", handleResize);

    const labels = [
      "Order Intake", "Invoice Reconciliation", "CRM Lead Route", "Customer Onboard",
      "Stripe Payout", "Slack Alert", "Plaid Sync", "Inventory Ledger", "Email Auto-Reply",
      "PDF Parser", "Audit Log", "Database Sync", "Webhook Event", "Report Dispatch"
    ];

    // Generate nodes representing tasks and automated workers in the crowd
    const nodeCount = Math.min(32, Math.floor(width / 35));
    const nodes: PersonNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: i % 4 === 0 ? 3.5 : 2.5,
      label: labels[i % labels.length],
      role: i % 3 === 0 ? "automated" : "manual",
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const isDark = () => document.documentElement.classList.contains("dark");

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDark();
      const lineColor = dark ? "rgba(70, 67, 73, 0.45)" : "rgba(217, 220, 224, 0.7)";
      const accentColor = "#507293";
      const successColor = "#4B8C5E";
      const textColor = dark ? "rgba(180, 185, 195, 0.7)" : "rgba(100, 99, 103, 0.7)";

      // Draw connecting mesh lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = Math.max(0.2, (1 - dist / 110) * 0.9);
            ctx.stroke();
          }
        }
      }

      // Update & Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Mouse gentle repulsion
        const mdx = node.x - mouseX;
        const mdy = node.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 80 && mdist > 0) {
          const force = (80 - mdist) / 80;
          node.x += (mdx / mdist) * force * 1.5;
          node.y += (mdy / mdist) * force * 1.5;
        }

        // Movement
        node.x += node.vx;
        node.y += node.vy;

        // Bounce walls
        if (node.x < 10) { node.x = 10; node.vx *= -1; }
        if (node.x > width - 10) { node.x = width - 10; node.vx *= -1; }
        if (node.y < 10) { node.y = 10; node.vy *= -1; }
        if (node.y > height - 10) { node.y = height - 10; node.vy *= -1; }

        // Draw dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.role === "automated" ? successColor : accentColor;
        ctx.fill();

        // Subtle label on larger nodes
        if (node.radius > 3) {
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = textColor;
          ctx.fillText(node.label, node.x + 6, node.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className || "absolute inset-0 w-full h-full pointer-events-auto"}
    />
  );
}
