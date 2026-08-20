"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type NodeProps,
  MarkerType,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  SentIcon,
  Database01Icon,
  WorkflowSquare01Icon,
  ServerStack01Icon,
  FlashIcon,
  Activity01Icon,
  CheckmarkCircle01Icon,
  RotateLeft01Icon,
  PlayIcon,
} from "hugeicons-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Custom Architecture Node Type
interface HeroNodeData extends Record<string, unknown> {
  title: string;
  badge: string;
  metric: string;
  status: string;
  accent: "accent" | "success" | "gold";
  iconName: "Sent" | "Database" | "Workflow" | "Server" | "Flash" | "Activity";
}

type HeroNode = Node<HeroNodeData, "heroNode">;

const NodeIcons = {
  Sent: SentIcon,
  Database: Database01Icon,
  Workflow: WorkflowSquare01Icon,
  Server: ServerStack01Icon,
  Flash: FlashIcon,
  Activity: Activity01Icon,
};

function HeroArchitectureNode({ data, selected }: NodeProps<HeroNode>) {
  const Icon = NodeIcons[data.iconName] || WorkflowSquare01Icon;

  return (
    <div
      className={cn(
        "rounded-lg border bg-canvas p-3 shadow-md transition-all duration-200 min-w-[190px] select-none shimmer",
        selected
          ? "border-accent ring-2 ring-accent shadow-[0_4px_20px_rgba(80,114,147,0.2)]"
          : "border-line hover:border-line-strong hover:shadow-sm"
      )}
    >
      {/* Left Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!h-2.5 !w-2.5 !bg-accent !border-2 !border-canvas"
      />

      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-6 w-6 rounded border flex items-center justify-center shrink-0",
              data.accent === "success" && "border-success-light bg-success-bg text-success",
              data.accent === "gold" && "border-gold-light bg-gold-bg text-gold",
              data.accent === "accent" && "border-accent-light bg-accent-bg text-accent"
            )}
          >
            <Icon size={13} />
          </div>
          <span className="text-xs font-bold text-ink truncate max-w-[110px]">
            {data.title}
          </span>
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-ink-muted border-t border-line/60 pt-1.5">
        <span className="truncate max-w-[90px]">{data.status}</span>
        <span className="font-semibold text-accent">{data.metric}</span>
      </div>

      {/* Right Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!h-2.5 !w-2.5 !bg-accent !border-2 !border-canvas"
      />
    </div>
  );
}

// Clean, Non-overlapping DAG Pipeline Layout
const initialHeroNodes: HeroNode[] = [
  // Column 1: Intake & Gateway Layer (Left)
  {
    id: "h-ingest-1",
    type: "heroNode",
    position: { x: 20, y: 30 },
    data: {
      title: "Client Webhooks",
      badge: "Intake",
      status: "Multi-Channel",
      metric: "4.8k ops/s",
      accent: "gold",
      iconName: "Sent",
    },
  },
  {
    id: "h-ingest-2",
    type: "heroNode",
    position: { x: 20, y: 170 },
    data: {
      title: "Edge Gateway API",
      badge: "Network",
      status: "Next.js 16 Route",
      metric: "0.8ms p99",
      accent: "accent",
      iconName: "Flash",
    },
  },

  // Column 2: Orchestration & AI Mesh (Center)
  {
    id: "h-orch-1",
    type: "heroNode",
    position: { x: 250, y: 30 },
    data: {
      title: "n8n Orchestrator",
      badge: "Engine",
      status: "340+ Pipelines",
      metric: "Self-Healing",
      accent: "gold",
      iconName: "Workflow",
    },
  },
  {
    id: "h-orch-2",
    type: "heroNode",
    position: { x: 250, y: 170 },
    data: {
      title: "AI Decision Router",
      badge: "Mesh",
      status: "Schema Strict",
      metric: "Autonomous",
      accent: "accent",
      iconName: "Flash",
    },
  },

  // Column 3: Storage & Realtime UI (Right)
  {
    id: "h-store-1",
    type: "heroNode",
    position: { x: 480, y: 30 },
    data: {
      title: "PostgreSQL Replica",
      badge: "Storage",
      status: "ACID Write OK",
      metric: "1.2ms read",
      accent: "success",
      iconName: "Database",
    },
  },
  {
    id: "h-store-2",
    type: "heroNode",
    position: { x: 480, y: 170 },
    data: {
      title: "Redis State Cache",
      badge: "Cache",
      status: "In-Memory Hit",
      metric: "0.4ms",
      accent: "accent",
      iconName: "Server",
    },
  },
  {
    id: "h-ui",
    type: "heroNode",
    position: { x: 480, y: 300 },
    data: {
      title: "WebSocket Stream",
      badge: "Client",
      status: "Live Hydration",
      metric: "60 FPS",
      accent: "success",
      iconName: "Activity",
    },
  },
];

const initialHeroEdges: Edge[] = [
  {
    id: "he-1",
    source: "h-ingest-1",
    target: "h-orch-1",
    animated: true,
    style: { stroke: "var(--accent)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
  },
  {
    id: "he-2",
    source: "h-ingest-2",
    target: "h-orch-2",
    animated: true,
    style: { stroke: "var(--accent)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
  },
  {
    id: "he-3",
    source: "h-orch-1",
    target: "h-store-1",
    animated: true,
    style: { stroke: "var(--success)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--success)" },
  },
  {
    id: "he-4",
    source: "h-orch-2",
    target: "h-store-2",
    animated: true,
    style: { stroke: "var(--accent)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
  },
  {
    id: "he-5",
    source: "h-orch-1",
    target: "h-orch-2",
    animated: true,
    style: { stroke: "var(--gold)", strokeWidth: 1.5 },
  },
  {
    id: "he-6",
    source: "h-store-2",
    target: "h-ui",
    animated: true,
    style: { stroke: "var(--success)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--success)" },
  },
];

export function HeroVisual() {
  const nodeTypes = useMemo(() => ({ heroNode: HeroArchitectureNode }), []);

  const [nodes, setNodes] = useState<HeroNode[]>(initialHeroNodes);
  const [edges, setEdges] = useState<Edge[]>(initialHeroEdges);
  const [throughput, setThroughput] = useState(14820);
  const [isSimulating, setIsSimulating] = useState(true);

  const onNodesChange: OnNodesChange<HeroNode> = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "var(--accent)", strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
          },
          eds
        )
      ),
    []
  );

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setThroughput((prev) => prev + Math.floor(Math.random() * 6 + 1));
    }, 900);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleReset = () => {
    setNodes(initialHeroNodes);
    setEdges(initialHeroEdges);
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[500px] rounded-lg border border-line overflow-hidden bg-canvas shadow-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.5}
        maxZoom={1.4}
        proOptions={{ hideAttribution: true }}
        className="bg-canvas select-none"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="var(--line-strong)"
          className="opacity-40"
        />
        <Controls className="!border !border-line !bg-canvas !shadow-sm [&>button]:!border-b [&>button]:!border-line [&>button]:!bg-canvas [&>button]:!fill-ink" />
      </ReactFlow>

      {/* Top Floating Status Indicator */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-md border border-line bg-canvas/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-mono shadow-sm">
        <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
        <span className="text-ink font-semibold">Live Architecture DAG</span>
        <span className="text-ink-muted">·</span>
        <span className="text-success font-bold">{throughput.toLocaleString()} req/s</span>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between rounded-md border border-line bg-canvas/90 backdrop-blur-sm px-3 py-2 text-xs font-mono shadow-sm">
        <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
          <CheckmarkCircle01Icon size={14} className="text-success" />
          <span className="hidden sm:inline">Interactive: Drag nodes or re-route paths</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-7 px-2 text-[11px] shimmer"
            title="Reset DAG Layout"
          >
            <RotateLeft01Icon size={12} className="mr-1" />
            Reset
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsSimulating(!isSimulating)}
            className="h-7 px-2.5 text-[11px] shimmer"
          >
            {isSimulating ? (
              <>
                <Activity01Icon size={12} className="mr-1 text-success animate-pulse" />
                Live Stream
              </>
            ) : (
              <>
                <PlayIcon size={12} className="mr-1 text-accent" />
                Resume
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
