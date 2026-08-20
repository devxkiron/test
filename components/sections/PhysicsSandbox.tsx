"use client";

import { useState, useCallback, useMemo } from "react";
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
  FlashIcon, 
  Activity01Icon, 
  SentIcon, 
  Database01Icon, 
  WorkflowSquare01Icon, 
  ServerStack01Icon,
  PlusSignIcon,
  RotateLeft01Icon,
  Tick01Icon
} from "hugeicons-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

// Custom Task / Pipeline Node Data extending Record<string, unknown>
interface PipelineNodeData extends Record<string, unknown> {
  label: string;
  category: string;
  status: string;
  metric: string;
  accent: "accent" | "success" | "gold";
  iconName: "Sent" | "Database" | "Workflow" | "Server" | "Flash";
}

type PipelineNode = Node<PipelineNodeData, "pipelineNode">;

const NodeIcons = {
  Sent: SentIcon,
  Database: Database01Icon,
  Workflow: WorkflowSquare01Icon,
  Server: ServerStack01Icon,
  Flash: FlashIcon,
};

function CustomPipelineNode({ data, selected }: NodeProps<PipelineNode>) {
  const Icon = NodeIcons[data.iconName] || WorkflowSquare01Icon;

  return (
    <div
      className={cn(
        "rounded-lg border bg-canvas p-3.5 shadow-md transition-all duration-200 min-w-[200px] select-none shimmer",
        selected
          ? "border-accent ring-2 ring-accent shadow-[0_4px_24px_rgba(80,114,147,0.2)]"
          : "border-line hover:border-line-strong"
      )}
    >
      {/* Top Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2.5 !w-2.5 !bg-accent !border-2 !border-canvas"
      />

      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-6 w-6 rounded border flex items-center justify-center shrink-0",
            data.accent === "success" && "border-success-light bg-success-bg text-success",
            data.accent === "gold" && "border-gold-light bg-gold-bg text-gold",
            data.accent === "accent" && "border-accent-light bg-accent-bg text-accent"
          )}>
            <Icon size={13} />
          </div>
          <span className="text-xs font-bold text-ink truncate max-w-[120px]">
            {data.label}
          </span>
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-ink-muted border-t border-line/60 pt-2">
        <span>{data.status}</span>
        <span className="font-semibold text-accent">{data.metric}</span>
      </div>

      {/* Bottom Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2.5 !w-2.5 !bg-accent !border-2 !border-canvas"
      />
    </div>
  );
}

const initialNodes: PipelineNode[] = [
  {
    id: "node-1",
    type: "pipelineNode",
    position: { x: 50, y: 40 },
    data: {
      label: "Invoice Ingest #4821",
      category: "Automation",
      status: "Webhook Ingest",
      metric: "14ms",
      accent: "gold",
      iconName: "Sent",
    },
  },
  {
    id: "node-2",
    type: "pipelineNode",
    position: { x: 320, y: 60 },
    data: {
      label: "CRM Lead Enrichment",
      category: "Automation",
      status: "HubSpot Synced",
      metric: "Auto-Routed",
      accent: "gold",
      iconName: "Workflow",
    },
  },
  {
    id: "node-3",
    type: "pipelineNode",
    position: { x: 600, y: 40 },
    data: {
      label: "PostgreSQL Replica",
      category: "Backend",
      status: "ACID Write OK",
      metric: "1.2ms p99",
      accent: "success",
      iconName: "Database",
    },
  },
  {
    id: "node-4",
    type: "pipelineNode",
    position: { x: 180, y: 190 },
    data: {
      label: "Redis State Cache",
      category: "Backend",
      status: "In-Memory Hit",
      metric: "0.4ms",
      accent: "accent",
      iconName: "Server",
    },
  },
  {
    id: "node-5",
    type: "pipelineNode",
    position: { x: 460, y: 190 },
    data: {
      label: "Slack Instant Alert",
      category: "Automation",
      status: "#ops Dispatched",
      metric: "Real-Time",
      accent: "accent",
      iconName: "Flash",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "node-1",
    target: "node-2",
    animated: true,
    style: { stroke: "var(--accent)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
  },
  {
    id: "e2-3",
    source: "node-2",
    target: "node-3",
    animated: true,
    style: { stroke: "var(--success)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--success)" },
  },
  {
    id: "e1-4",
    source: "node-1",
    target: "node-4",
    animated: true,
    style: { stroke: "var(--accent)", strokeWidth: 1.5 },
  },
  {
    id: "e4-5",
    source: "node-4",
    target: "node-5",
    animated: true,
    style: { stroke: "var(--accent)", strokeWidth: 1.5 },
  },
];

export function PhysicsSandbox() {
  const nodeTypes = useMemo(() => ({ pipelineNode: CustomPipelineNode }), []);

  const [nodes, setNodes] = useState<PipelineNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isAutoOrganized, setIsAutoOrganized] = useState(false);
  const [throughput, setThroughput] = useState(4820);

  const onNodesChange: OnNodesChange<PipelineNode> = useCallback(
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

  // Auto-Organize vs Scatter toggle
  const handleAutoAlign = () => {
    if (!isAutoOrganized) {
      setNodes((prev) =>
        prev.map((node, i) => ({
          ...node,
          position: {
            x: 40 + (i % 3) * 270,
            y: 40 + Math.floor(i / 3) * 160,
          },
        }))
      );
      setIsAutoOrganized(true);
      setThroughput(18400);
    } else {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          position: {
            x: 60 + Math.random() * 500,
            y: 30 + Math.random() * 200,
          },
        }))
      );
      setIsAutoOrganized(false);
      setThroughput(4820);
    }
  };

  // Add custom node
  const handleAddNode = () => {
    const nextId = `node-${nodes.length + 1}`;
    const customTypes: Array<{ label: string; accent: "accent" | "success" | "gold"; iconName: PipelineNodeData["iconName"] }> = [
      { label: "AI Decision Router", accent: "accent", iconName: "Workflow" },
      { label: "Stripe Webhook Sync", accent: "gold", iconName: "Flash" },
      { label: "Kafka Event Queue", accent: "success", iconName: "Server" },
      { label: "Email Auto-Dispatch", accent: "accent", iconName: "Sent" },
    ];
    const picked = customTypes[nodes.length % customTypes.length];

    const newNode: PipelineNode = {
      id: nextId,
      type: "pipelineNode",
      position: { x: 200 + Math.random() * 300, y: 100 + Math.random() * 120 },
      data: {
        label: picked.label,
        category: "Custom",
        status: "Live & Connected",
        metric: "< 2ms",
        accent: picked.accent,
        iconName: picked.iconName,
      },
    };

    setNodes((prev) => [...prev, newNode]);

    if (nodes.length > 0) {
      const prevNodeId = nodes[nodes.length - 1].id;
      setEdges((prev) => [
        ...prev,
        {
          id: `e-${prevNodeId}-${nextId}`,
          source: prevNodeId,
          target: nextId,
          animated: true,
          style: { stroke: "var(--accent)", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
        },
      ]);
    }
  };

  const handleReset = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setIsAutoOrganized(false);
    setThroughput(4820);
  };

  return (
    <section className="py-24 bg-canvas-alt/30 border-b border-line">
      <Container>
        <div className="text-center mb-10">
          <Badge variant="accent" size="md" className="mb-4">React-Flow Interactive Canvas</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Draggable & adjustable architecture.
          </h2>
          <p className="mt-3 text-ink-muted max-w-xl mx-auto text-sm sm:text-base">
            Drag any task node anywhere, connect handles to re-route data streams, or toggle automated alignment to see zero-friction ordering.
          </p>
        </div>

        {/* React Flow Workspace Container */}
        <div className="relative rounded-lg border border-line overflow-hidden bg-canvas h-[480px] sm:h-[540px] shadow-sm">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.5}
            maxZoom={1.5}
            proOptions={{ hideAttribution: true }}
            className="bg-canvas"
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1}
              color="var(--line-strong)"
              className="opacity-40"
            />
            <Controls className="!border !border-line !bg-canvas !shadow-sm [&>button]:!border-b [&>button]:!border-line [&>button]:!bg-canvas [&>button]:!fill-ink" />
          </ReactFlow>

          {/* Bottom Action Ribbon */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line px-5 py-3.5 bg-canvas/90 backdrop-blur-md z-10">
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${isAutoOrganized ? "bg-success animate-pulse" : "bg-accent"}`} />
                <span className="font-semibold text-ink">
                  {isAutoOrganized ? "Autonomous Alignment" : "Freeform Drag Mode"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-success">
                <Activity01Icon size={14} />
                <span className="font-bold">{throughput.toLocaleString()}</span>
                <span className="text-ink-muted">events/min</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAddNode}
                className="shimmer"
              >
                <PlusSignIcon size={14} className="mr-1" />
                Add Node
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="shimmer"
                title="Reset to default"
              >
                <RotateLeft01Icon size={14} />
              </Button>
              <Button
                variant={isAutoOrganized ? "outline" : "primary"}
                size="sm"
                onClick={handleAutoAlign}
                className="shimmer"
              >
                {isAutoOrganized ? (
                  <>Freeform Scatter</>
                ) : (
                  <><WorkflowSquare01Icon size={14} className="mr-1.5 text-accent-light" /> Auto-Align Pipeline</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
