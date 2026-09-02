"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { specializations, siteConfig } from "@/lib/data";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { ZenSecondaryButton } from "@/components/ui/ZenButton";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeTypes,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

/* ─── Exact n8n Node Data Definition ─────────────────────────────────── */
interface N8nNodeData extends Record<string, unknown> {
  title: string;
  app: string;
  operation?: string;
  desc: string;
  nodeStyle: "trigger" | "action" | "agent" | "subnode";
  typeBadge?: string;
  accentColor?: string;
  iconType: "cursor-trigger" | "notion" | "sheets" | "pencil" | "filter" | "robot" | "openrouter" | "webhook" | "crm" | "slack" | "stripe" | "database" | "x" | "facebook" | "linkedin";
}

/* ─── Exact n8n Custom Node Component ────────────────────────────────── */
function N8nAutomationNode({ data }: { data: N8nNodeData }) {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = () => {
    switch (data.iconType) {
      case "cursor-trigger":
        return (
          <div className="flex items-center gap-1">
            <span className="text-[#FF6D5A] text-xs font-black">⚡</span>
            <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3l7 18 3-7 7-3L3 3z" />
            </svg>
          </div>
        );
      case "notion":
        return (
          <div className="w-7 h-7 rounded bg-white text-black font-serif font-black flex items-center justify-center text-sm shadow-sm">
            N
          </div>
        );
      case "sheets":
        return (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" fill="#0F9D58" />
            <path d="M7 8h10M7 12h10M7 16h10M12 8v8" stroke="white" strokeWidth="1.5" />
          </svg>
        );
      case "pencil":
        return (
          <div className="w-7 h-7 rounded-lg bg-[#5865F2] flex items-center justify-center text-white shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
          </div>
        );
      case "filter":
        return (
          <svg className="w-7 h-7 text-[#0088FF]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.5 4a1 1 0 0 1 1-1h17a1 1 0 0 1 .78 1.625l-6.78 8.475v6.4a1 1 0 0 1-.45.83l-3 2A1 1 0 0 1 9.5 22.5V14.1L2.72 5.625A1 1 0 0 1 2.5 4z" />
          </svg>
        );
      case "robot":
        return (
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4M8 16h.01M16 16h.01M9 2v3M15 2v3" />
          </svg>
        );
      case "openrouter":
        return (
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 4l-6 8h4l-4 8 10-10h-4l4-6h-4z" />
          </svg>
        );
      case "webhook":
        return (
          <svg className="w-6 h-6 text-[#FF6D5A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.61.16-1.2.42-1.74L8 4.25a2 2 0 0 1 3.5 0l1.7 3.4" />
            <circle cx="18" cy="18" r="3" />
            <circle cx="9" cy="4" r="2" />
          </svg>
        );
      case "crm":
        return (
          <svg className="w-6 h-6 text-[#FF7A59]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "slack":
        return (
          <svg className="w-6 h-6 text-[#38BDF8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="4" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        );
      case "stripe":
        return (
          <svg className="w-6 h-6 text-[#635BFF]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.38.5 6.476.5 2.5 3.582 2.5 8.784c0 6.069 5.845 7.154 9.429 8.528 2.012.784 2.825 1.49 2.825 2.457 0 .973-.854 1.48-2.296 1.48-2.738 0-5.59-1.258-7.391-2.288l-.946 5.617c1.782.99 4.938 1.644 8.199 1.644 6.208 0 10.363-3.084 10.363-8.49 0-5.843-5.502-7.147-8.707-8.282z" />
          </svg>
        );
      case "database":
        return (
          <svg className="w-6 h-6 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        );
      case "x":
        return (
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-6 h-6 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-6 h-6 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        );
      default:
        return null;
    }
  };

  /* ── 1. D-Shaped n8n Trigger Node ── */
  if (data.nodeStyle === "trigger") {
    return (
      <div className="relative flex flex-col items-center group select-none">
        <div className="relative w-[66px] h-[66px] rounded-l-full rounded-r-xl bg-[#2A2B33] border-2 border-[#545560] hover:border-[#D4FF00] flex items-center justify-center shadow-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,255,0,0.3)]">
          {/* Centered Icon */}
          <div className="transition-transform group-hover:scale-110 duration-200">
            {getIcon()}
          </div>

          {/* Right Output Handle */}
          <Handle
            type="source"
            position={Position.Right}
            className="!w-3.5 !h-3.5 !-right-2 !bg-[#D4FF00] !border-2 !border-[#1E1F24] !rounded-full transition-transform group-hover:!scale-125"
          />

          {/* '!' Info Button with Shadcn Popover */}
          <div className="absolute -top-2 -right-2 z-20">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                  }}
                  className="w-4 h-4 rounded-full bg-[#1A1B20] border border-[#D4FF00] text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black flex items-center justify-center text-[10px] font-mono font-black transition-all shadow-md cursor-pointer hover:scale-115"
                  title="View step details"
                >
                  !
                </button>
              </PopoverTrigger>

              <PopoverContent
                side="top"
                sideOffset={8}
                align="center"
                collisionPadding={20}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="w-64 p-3.5 rounded-xl border border-[#D4FF00]/50 bg-[#0B140E]/95 text-white shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(212,255,0,0.2)] backdrop-blur-2xl text-left"
              >
                <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#FF6D5A] animate-pulse" />
                  <span className="text-xs font-bold text-white font-heading">{data.app}</span>
                </div>
                <p className="text-xs text-white/80 font-mono leading-relaxed mb-2">
                  {data.desc}
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#D4FF00]">
                  <span>Type: TRIGGER</span>
                  <span className="text-white/60">Autonomous</span>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Node Label Below */}
        <div className="mt-2 text-center max-w-[120px]">
          <div className="text-xs font-bold text-white font-heading leading-tight tracking-tight">
            {data.title}
          </div>
        </div>
      </div>
    );
  }

  /* ── 2. Wide n8n AI Agent Node with Sub-tool Connectors ── */
  if (data.nodeStyle === "agent") {
    return (
      <div className="relative flex flex-col items-center group select-none">
        <div className="relative min-w-[160px] h-[66px] rounded-xl bg-[#23242A] border-2 border-[#545560] hover:border-[#D4FF00] px-4 flex items-center justify-between shadow-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,255,0,0.3)]">
          {/* Left Target Handle */}
          <Handle
            type="target"
            position={Position.Left}
            className="!w-3.5 !h-3.5 !-left-2 !bg-[#23242A] !border-2 !border-[#D4FF00] !rounded-full transition-transform group-hover:!scale-125"
          />

          {/* Agent Header Inside Box */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#32333B] flex items-center justify-center text-white">
              {getIcon()}
            </div>
            <div className="text-xs font-bold text-white font-heading">
              {data.title}
            </div>
          </div>

          {/* Right Source Handle */}
          <Handle
            type="source"
            position={Position.Right}
            className="!w-3.5 !h-3.5 !-right-2 !bg-[#D4FF00] !border-2 !border-[#23242A] !rounded-full transition-transform group-hover:!scale-125"
          />

          {/* Bottom Sub-model Handles */}
          <Handle
            type="source"
            id="chat-model"
            position={Position.Bottom}
            className="!w-3 !h-3 !bg-[#D4FF00] !border-2 !border-[#23242A] !rounded-full !left-8"
          />

          {/* '!' Info Button with Shadcn Popover */}
          <div className="absolute -top-2 -right-2 z-20">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                  }}
                  className="w-4 h-4 rounded-full bg-[#1A1B20] border border-[#D4FF00] text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black flex items-center justify-center text-[10px] font-mono font-black transition-all shadow-md cursor-pointer hover:scale-115"
                  title="View step details"
                >
                  !
                </button>
              </PopoverTrigger>

              <PopoverContent
                side="top"
                sideOffset={8}
                align="center"
                collisionPadding={20}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="w-64 p-3.5 rounded-xl border border-[#D4FF00]/50 bg-[#0B140E]/95 text-white shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(212,255,0,0.2)] backdrop-blur-2xl text-left"
              >
                <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                  <span className="text-xs font-bold text-white font-heading">{data.app}</span>
                </div>
                <p className="text-xs text-white/80 font-mono leading-relaxed mb-2">
                  {data.desc}
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#D4FF00]">
                  <span>Model: Reasoning Engine</span>
                  <span className="text-white/60">Autonomous</span>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Sub-node Labels Attached Underneath */}
        <div className="w-full flex items-center justify-between px-2 mt-1.5 text-[9px] font-mono text-white/50">
          <span>Chat Model*</span>
          <span>Memory Tool</span>
        </div>
      </div>
    );
  }

  /* ── 3. Circular Sub-node (e.g. OpenRouter / Sub-LLM) ── */
  if (data.nodeStyle === "subnode") {
    return (
      <div className="relative flex flex-col items-center group select-none">
        <div className="relative w-[52px] h-[52px] rounded-full bg-[#23242A] border-2 border-[#545560] hover:border-[#D4FF00] flex items-center justify-center shadow-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,255,0,0.3)]">
          {/* Top Target Handle */}
          <Handle
            type="target"
            position={Position.Top}
            className="!w-3 !h-3 !-top-1.5 !bg-[#23242A] !border-2 !border-[#D4FF00] !rounded-full transition-transform group-hover:!scale-125"
          />

          {/* Centered Icon */}
          <div className="transition-transform group-hover:scale-110 duration-200">
            {getIcon()}
          </div>
        </div>

        {/* Text Below */}
        <div className="mt-2 text-center max-w-[110px]">
          <div className="text-xs font-bold text-white font-heading leading-tight tracking-tight">
            {data.title}
          </div>
          {data.operation && (
            <div className="text-[10px] font-mono text-[#D4FF00]/80 leading-tight mt-0.5">
              {data.operation}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── 4. Standard Squircle n8n Action Node ── */
  return (
    <div className="relative flex flex-col items-center group select-none">
      <div className="relative w-[66px] h-[66px] rounded-xl bg-[#23242A] border-2 border-[#545560] hover:border-[#D4FF00] flex items-center justify-center shadow-xl transition-all duration-200 hover:shadow-[0_0_22px_rgba(212,255,0,0.35)]">
        {/* Left Target Handle */}
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3.5 !h-3.5 !-left-2 !bg-[#23242A] !border-2 !border-[#D4FF00] !rounded-full transition-transform group-hover:!scale-125"
        />

        {/* Centered Icon */}
        <div className="transition-transform group-hover:scale-110 duration-200">
          {getIcon()}
        </div>

        {/* Right Source Handle */}
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3.5 !h-3.5 !-right-2 !bg-[#D4FF00] !border-2 !border-[#23242A] !rounded-full transition-transform group-hover:!scale-125"
        />

        {/* '!' Info Button with Shadcn Popover */}
        <div className="absolute -top-2 -right-2 z-20">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
                className="w-4 h-4 rounded-full bg-[#1A1B20] border border-[#D4FF00] text-[#D4FF00] hover:bg-[#D4FF00] hover:text-black flex items-center justify-center text-[10px] font-mono font-black transition-all shadow-md cursor-pointer hover:scale-115"
                title="View step details"
              >
                !
              </button>
            </PopoverTrigger>

            <PopoverContent
              side="top"
              sideOffset={8}
              align="center"
              collisionPadding={20}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className="w-64 p-3.5 rounded-xl border border-[#D4FF00]/50 bg-[#0B140E]/95 text-white shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(212,255,0,0.2)] backdrop-blur-2xl text-left"
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                  <span className="text-xs font-bold text-white font-heading">{data.app}</span>
                </div>
                {data.typeBadge && (
                  <span className="text-[8px] font-mono font-black px-1.5 py-0.5 rounded uppercase bg-[#D4FF00] text-black">
                    {data.typeBadge}
                  </span>
                )}
              </div>
              <p className="text-xs text-white/80 font-mono leading-relaxed mb-2">
                {data.desc}
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#D4FF00]">
                <span>Op: {data.operation || "Automated"}</span>
                <span className="text-white/60">Autonomous</span>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Node Label & Subtitle Below (Exact n8n Typography) */}
      <div className="mt-2 text-center max-w-[130px] w-full">
        <div className="text-xs font-bold text-white font-heading leading-tight tracking-tight">
          {data.title}
        </div>
        {data.operation && (
          <div className="text-[10px] font-mono text-white/50 leading-tight mt-0.5">
            {data.operation}
          </div>
        )}
      </div>
    </div>
  );
}

const nodeTypes: NodeTypes = {
  n8nNode: N8nAutomationNode,
};

/* ─── Production Business Automation Workflows (100% Matching Screenshot) ─ */
const WORKFLOW_PRESETS = [
  {
    id: "improv-festival-agent",
    label: "Festival Database & AI Agent",
    desc: "Extracts Notion & Google Sheets data, streamlines records, filters valid entries, and triggers an autonomous AI Agent with sub-LLM reasoning.",
    nodes: [
      {
        id: "1",
        type: "n8nNode",
        position: { x: 30, y: 140 },
        data: {
          app: "Manual / Webhook Trigger",
          title: "When clicking 'Execute workflow'",
          nodeStyle: "trigger" as const,
          desc: "Manual or scheduled cron trigger executing data ingestion.",
          iconType: "cursor-trigger" as const,
        },
      },
      {
        id: "2",
        type: "n8nNode",
        position: { x: 190, y: 40 },
        data: {
          app: "Notion Integration",
          title: "Get Improvbites Festival DB",
          operation: "getAll: databasePage",
          nodeStyle: "action" as const,
          typeBadge: "ACTION",
          desc: "Fetches all active festival database entries from Notion workspace.",
          iconType: "notion" as const,
        },
      },
      {
        id: "3",
        type: "n8nNode",
        position: { x: 190, y: 240 },
        data: {
          app: "Google Sheets",
          title: "Get Global Improv Festival Google Sheet",
          operation: "read: sheet",
          nodeStyle: "action" as const,
          typeBadge: "ACTION",
          desc: "Extracts live attendee submissions from Google Sheets spreadsheet.",
          iconType: "sheets" as const,
        },
      },
      {
        id: "4",
        type: "n8nNode",
        position: { x: 350, y: 40 },
        data: {
          app: "Data Transform",
          title: "Streamline Notion",
          operation: "manual",
          nodeStyle: "action" as const,
          typeBadge: "TRANSFORM",
          desc: "Normalizes dates, venue locations, and ticket availability.",
          iconType: "pencil" as const,
        },
      },
      {
        id: "5",
        type: "n8nNode",
        position: { x: 350, y: 240 },
        data: {
          app: "Data Transform",
          title: "Streamline Google Sheet",
          operation: "manual",
          nodeStyle: "action" as const,
          typeBadge: "TRANSFORM",
          desc: "Sanitizes email inputs, ticket tiers, and timezone formatting.",
          iconType: "pencil" as const,
        },
      },
      {
        id: "6",
        type: "n8nNode",
        position: { x: 500, y: 140 },
        data: {
          app: "Filter Node",
          title: "Filter",
          operation: "condition: valid",
          nodeStyle: "action" as const,
          typeBadge: "ROUTER",
          desc: "Filters approved submissions and discards duplicate entries.",
          iconType: "filter" as const,
        },
      },
      {
        id: "7",
        type: "n8nNode",
        position: { x: 670, y: 140 },
        data: {
          app: "AI Agent Copilot",
          title: "AI Agent",
          nodeStyle: "agent" as const,
          desc: "Autonomous LLM Reasoning Agent generating schedules and automated email briefs.",
          iconType: "robot" as const,
        },
      },
      {
        id: "8",
        type: "n8nNode",
        position: { x: 680, y: 270 },
        data: {
          app: "OpenRouter Chat Model",
          title: "OpenRouter Chat Model",
          operation: "deepseek / gpt-4o",
          nodeStyle: "subnode" as const,
          desc: "Sub-model provider connected directly to the AI Agent.",
          iconType: "openrouter" as const,
        },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e1-3",
        source: "1",
        target: "3",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e2-4",
        source: "2",
        target: "4",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e3-5",
        source: "3",
        target: "5",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e4-6",
        source: "4",
        target: "6",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e5-6",
        source: "5",
        target: "6",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e6-7",
        source: "6",
        target: "7",
        label: "Kept",
        labelStyle: { fill: "#D4FF00", fontWeight: 700, fontSize: 10, fontFamily: "monospace" },
        labelBgStyle: { fill: "#1E2026", fillOpacity: 0.9, stroke: "#3F404A", strokeWidth: 1, rx: 4 },
        animated: true,
        style: { stroke: "#D4FF00", strokeWidth: 2 },
      },
      {
        id: "e7-8",
        source: "7",
        sourceHandle: "chat-model",
        target: "8",
        label: "Model",
        labelStyle: { fill: "#8C8FA1", fontSize: 9, fontFamily: "monospace" },
        labelBgStyle: { fill: "#1E2026", fillOpacity: 0.8 },
        animated: false,
        style: { stroke: "#8C8FA1", strokeWidth: 1.5, strokeDasharray: "4,4" },
      },
    ],
  },
  {
    id: "lead-to-revenue",
    label: "Lead-to-Revenue Pipeline",
    desc: "Captures prospect inquiries, qualifies purchase intent via AI, auto-creates CRM deals, and dispatches instant team alerts.",
    nodes: [
      {
        id: "1",
        type: "n8nNode",
        position: { x: 40, y: 140 },
        data: {
          app: "Typeform Intake",
          title: "When Lead Submits Form",
          nodeStyle: "trigger" as const,
          desc: "Typeform / Webflow intake event received with client budget & project brief.",
          iconType: "cursor-trigger" as const,
        },
      },
      {
        id: "2",
        type: "n8nNode",
        position: { x: 240, y: 140 },
        data: {
          app: "OpenAI GPT-4o",
          title: "AI Lead Scoring",
          operation: "Reason & Score",
          nodeStyle: "action" as const,
          typeBadge: "AI",
          desc: "Enriches company domain, scores budget tier, and qualifies lead as Tier 1 VIP.",
          iconType: "robot" as const,
        },
      },
      {
        id: "3",
        type: "n8nNode",
        position: { x: 450, y: 40 },
        data: {
          app: "HubSpot CRM",
          title: "HubSpot Deal",
          operation: "Create Deal ($25k)",
          nodeStyle: "action" as const,
          typeBadge: "ACTION",
          desc: "Auto-creates pipeline deal record, attaches enriched brief & assigns account exec.",
          iconType: "crm" as const,
        },
      },
      {
        id: "4",
        type: "n8nNode",
        position: { x: 450, y: 240 },
        data: {
          app: "Slack & Email",
          title: "Slack Alert",
          operation: "Dispatch Alert",
          nodeStyle: "action" as const,
          typeBadge: "ACTION",
          desc: "Pings #closed-deals channel and sends pre-drafted personalized response.",
          iconType: "slack" as const,
        },
      },
      {
        id: "5",
        type: "n8nNode",
        position: { x: 670, y: 140 },
        data: {
          app: "PostgreSQL",
          title: "Audit Database",
          operation: "Insert Log",
          nodeStyle: "action" as const,
          typeBadge: "DATABASE",
          desc: "Stores conversion telemetry & logs end-to-end execution timestamp securely.",
          iconType: "database" as const,
        },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#D4FF00", strokeWidth: 2 },
      },
      {
        id: "e2-3",
        source: "2",
        target: "3",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e2-4",
        source: "2",
        target: "4",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e3-5",
        source: "3",
        target: "5",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e4-5",
        source: "4",
        target: "5",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
    ],
  },
  {
    id: "finance-automation",
    label: "Autonomous Financial Sync",
    desc: "Autonomous financial ledger reconciliation across Stripe, multi-currency accounts, and ERP platforms.",
    nodes: [
      {
        id: "1",
        type: "n8nNode",
        position: { x: 40, y: 140 },
        data: {
          app: "Stripe Billing",
          title: "When Payment Succeeded",
          nodeStyle: "trigger" as const,
          desc: "Customer completes enterprise payment / recurring subscription invoice checkout.",
          iconType: "cursor-trigger" as const,
        },
      },
      {
        id: "2",
        type: "n8nNode",
        position: { x: 240, y: 140 },
        data: {
          app: "AI Auditor",
          title: "Tax & FX Engine",
          operation: "Parse VAT & FX",
          nodeStyle: "action" as const,
          typeBadge: "AI",
          desc: "Extracts tax jurisdiction, computes VAT, and matches live currency exchange rates.",
          iconType: "robot" as const,
        },
      },
      {
        id: "3",
        type: "n8nNode",
        position: { x: 450, y: 50 },
        data: {
          app: "QuickBooks / Xero",
          title: "General Ledger",
          operation: "Post Journal",
          nodeStyle: "action" as const,
          typeBadge: "ACTION",
          desc: "Posts categorized journal entry with exact tax split & bank receipt link.",
          iconType: "database" as const,
        },
      },
      {
        id: "4",
        type: "n8nNode",
        position: { x: 450, y: 230 },
        data: {
          app: "Slack Finance",
          title: "Revenue Alert",
          operation: "Post Summary",
          nodeStyle: "action" as const,
          typeBadge: "ACTION",
          desc: "Dispatches real-time revenue notification to leadership channels.",
          iconType: "slack" as const,
        },
      },
      {
        id: "5",
        type: "n8nNode",
        position: { x: 670, y: 140 },
        data: {
          app: "PostgreSQL",
          title: "Audit DB Sync",
          operation: "Commit Record",
          nodeStyle: "action" as const,
          typeBadge: "DATABASE",
          desc: "Maintains immutable double-entry audit trail across banking APIs.",
          iconType: "database" as const,
        },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#D4FF00", strokeWidth: 2 },
      },
      {
        id: "e2-3",
        source: "2",
        target: "3",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e2-4",
        source: "2",
        target: "4",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e3-5",
        source: "3",
        target: "5",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
      {
        id: "e4-5",
        source: "4",
        target: "5",
        animated: true,
        style: { stroke: "#8C8FA1", strokeWidth: 2 },
      },
    ],
  },
];

/* ─── Custom Specialization SVG Icons (#222C25 color) ─── */
function AiAgentIcon({ className = "w-5 h-5 text-[#222C25]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L14 8.5C14.4 9.8 15.2 10.6 16.5 11L23 13L16.5 15C15.2 15.4 14.4 16.2 14 17.5L12 24L10 17.5C9.6 16.2 8.8 15.4 7.5 15L1 13L7.5 11C8.8 10.6 9.6 9.8 10 8.5L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="2.2" fill="currentColor" />
      <circle cx="19.5" cy="5.5" r="1.5" fill="currentColor" />
      <circle cx="4.5" cy="20.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function AutomationIcon({ className = "w-5 h-5 text-[#222C25]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="16.5" y="2" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="16.5" y="16.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7.5 7.75H11.5C13.1569 7.75 14.5 9.09315 14.5 10.75V15.5C14.5 17.1569 15.8431 18.5 17.5 18.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.5 7.75H11C12.6569 7.75 14 6.40685 14 4.75H16.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12.5 8L10 12.5H13.5L11.5 16.5L16 11.5H12.5L13.5 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SaasAppIcon({ className = "w-5 h-5 text-[#222C25]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="5" cy="5.5" r="1" fill="currentColor" />
      <circle cx="8" cy="5.5" r="1" fill="currentColor" />
      <circle cx="11" cy="5.5" r="1" fill="currentColor" />
      <path
        d="M8.5 12L6 14.5L8.5 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 12L18 14.5L15.5 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="13.2" y1="11.5" x2="10.8" y2="17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function InternalToolsIcon({ className = "w-5 h-5 text-[#222C25]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="3" width="8" height="7.5" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="13.5" y="3" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="13.5" y="10.5" width="8" height="10.5" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="2.5" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M5 6.8H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 17H8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 14.5H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 17.5H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function getSpecializationCustomIcon(index: number) {
  switch (index) {
    case 0:
      return <AiAgentIcon className="w-5 h-5 text-[#222C25]" />;
    case 1:
      return <AutomationIcon className="w-5 h-5 text-[#222C25]" />;
    case 2:
      return <SaasAppIcon className="w-5 h-5 text-[#222C25]" />;
    case 3:
      return <InternalToolsIcon className="w-5 h-5 text-[#222C25]" />;
    default:
      return <AiAgentIcon className="w-5 h-5 text-[#222C25]" />;
  }
}

export function SpecializationSection() {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const activePreset = WORKFLOW_PRESETS[activePresetIndex];

  const [nodes, setNodes, onNodesChange] = useNodesState(activePreset.nodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(activePreset.edges as Edge[]);

  // Update nodes and edges when preset changes
  useEffect(() => {
    setNodes(activePreset.nodes as Node[]);
    setEdges(activePreset.edges as Edge[]);
  }, [activePresetIndex, activePreset, setNodes, setEdges]);

  return (
    <section id="services" className="py-14 sm:py-12 bg-canvas-alt/40 dark:bg-canvas-subtle/20 border-t border-line pattern-cross">
      <Container>
        {/* ─── Section Header (Centered, Clear & Spacious) ─── */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 r-pill bg-canvas dark:bg-canvas-alt border border-line text-xs font-mono font-bold text-ink mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              Automation Architecture
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink font-heading leading-tight">
              We Build Workflows That Multiply Your Revenue
            </h2>

            <p className="text-base text-ink-muted leading-relaxed mt-3 max-w-2xl mx-auto font-normal">
              Stop losing deals to slow response times and manual busywork. We design production-grade, self-healing automation pipelines that connect your tools and run your business 24/7.
            </p>

            {/* Workflow Preset Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {WORKFLOW_PRESETS.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => setActivePresetIndex(idx)}
                  className={`px-4 py-2 r-pill text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                    activePresetIndex === idx
                      ? "bg-[#14221A] text-[#D4FF00] border border-[#243B2E] shadow-sm scale-105"
                      : "bg-canvas dark:bg-canvas-alt text-ink-muted border border-line hover:border-ink hover:text-ink"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* ─── Full-Width Interactive React Flow Canvas ─── */}
        <AnimateOnScroll direction="up" delay={150}>
          <div className="w-full r-md bg-[#08140dd9] overflow-hidden mb-6">
            {/* Canvas Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#243B2E]">
              <div className="flex items-center gap-2.5">
                
                <span className="font-mono text-xs font-bold text-white">
                  Live Architecture: <span className="text-[#D4FF00] font-extrabold">{activePreset.label}</span>
                </span>
              </div>
              <span className="text-[11px] font-mono text-white/60 hidden sm:inline-block">
                Drag or zoom canvas to inspect pipeline connections
              </span>
            </div>

            {/* Canvas Container */}
            <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[580px]">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                fitViewOptions={{ padding: 0.18 }}
                minZoom={0.5}
                maxZoom={1.5}
                preventScrolling={false}
                zoomOnScroll={false}
                panOnScroll={false}
                nodesDraggable={true}
                nodesConnectable={false}
                elementsSelectable={true}
                proOptions={{ hideAttribution: true }}
                style={{ background: "#07110c44" }}
              >
                <Background color="#9d9d07d6" gap={20} size={1} />
                <Controls
                  showInteractive={false}
                  className="!bg-[#0E1E14] !border-[#243B2E] !shadow-lg [&>button]:!bg-[#0E1E14] [&>button]:!border-[#243B2E] [&>button]:!text-white [&>button:hover]:!bg-[#D4FF00] [&>button:hover]:!text-black"
                />
              </ReactFlow>
            </div>
          </div>
        </AnimateOnScroll>

        {/* ─── 4 Core Capabilities Grid (Bottom) with Rotating Gradient Border ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {specializations.map((spec, i) => (
            <AnimateOnScroll key={i} direction="up" delay={i * 80}>
              <div className="group relative rounded-xl p-[1.5px] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-pointer h-full">
                {/* 1. Default Static Border (fades out on hover) */}
                <div className="absolute inset-0 rounded-xl border border-line group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

                {/* 2. Rotating Conic Gradient Border Animation on Hover */}
                <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,#15803D_0deg,#84CC16_90deg,#D4FF00_180deg,#84CC16_270deg,#15803D_360deg)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* 3. Main Card Surface (Preserves Exact Canvas Background + Animated Mesh Patterns + Ultra-Low Opacity Tint on Hover) */}
                <div className="relative z-10 w-full h-full p-5 sm:p-6 rounded-[calc(0.75rem-1.5px)] bg-canvas dark:bg-canvas-alt transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-2xs">
                  {/* Animated Cross/Mesh Dot Grid Pattern */}
                  <div className="absolute inset-0 pattern-cross animate-pattern-cross opacity-45 dark:opacity-30 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

                  {/* Animated Diagonal Hatch Mesh Pattern */}
                  <div className="absolute inset-0 pattern-hatch animate-pattern-hatch opacity-30 dark:opacity-20 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

                  {/* Ultra-subtle /1 Hover Tint (like bg-green-500/1) */}
                  <div className="absolute inset-0 rounded-[inherit] bg-emerald-500/[0.02] dark:bg-lime/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Custom Crafted SVG Icon Badge with Soft Gradient Background (/15) */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#15803D]/15 via-[#84CC16]/12 to-[#D4FF00]/15 border border-[#84CC16]/25 dark:border-[#D4FF00]/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:from-[#15803D]/25 group-hover:via-[#84CC16]/20 group-hover:to-[#D4FF00]/25 group-hover:border-[#D4FF00]/40 shadow-2xs">
                      {getSpecializationCustomIcon(i)}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-ink dark:text-ink font-heading transition-colors duration-200 group-hover:text-emerald-700 dark:group-hover:text-lime">
                      {spec.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-ink-muted dark:text-ink-muted group-hover:text-ink dark:group-hover:text-ink mt-2 leading-relaxed font-normal transition-colors duration-200">
                      {spec.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* ─── Bottom CTA ─── */}
        <AnimateOnScroll direction="up" delay={200}>
          <div className="flex items-center justify-center gap-4">
            <ZenSecondaryButton href="#book" className="px-6 py-2.5 text-xs font-bold">
              Book a Strategy Call
            </ZenSecondaryButton>

            <ZenSecondaryButton href={`mailto:${siteConfig.email}`} className="px-5 py-2.5 text-xs font-bold">
              Let&apos;s chat &rarr;
            </ZenSecondaryButton>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
