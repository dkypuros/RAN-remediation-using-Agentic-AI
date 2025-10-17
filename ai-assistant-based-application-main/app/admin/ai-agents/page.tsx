'use client';

import React from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MarkerType,
  Position,
  Handle,
  NodeProps
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Network, Bot } from 'lucide-react';
import { cn } from "@/lib/utils";

interface CustomNodeData {
  label: string;
  icon: React.ElementType;
  sublabel?: string;
}

const CustomNode = ({ id, data }: NodeProps<CustomNodeData>) => {
  const isClient = id === '1';
  const isServer = ['2', '3', '4'].includes(id);

  return (
    <div className={cn(
      'px-4 py-2 shadow-md rounded-md bg-background border flex items-center relative',
      isClient && 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-200 dark:border-blue-400',
      isServer && 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-200 dark:border-amber-400'
    )}>
      <Handle type="target" position={Position.Top} className="!bg-muted-foreground" />
      <div className={cn(
        'rounded-full w-8 h-8 flex items-center justify-center',
        isClient && 'text-blue-500',
        isServer && 'text-amber-500'
      )}>
        <data.icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div className="ml-2">
        <div className="text-sm font-medium whitespace-pre-line">{data.label}</div>
        {data.sublabel && (
          <div className="text-xs text-muted-foreground whitespace-pre-line">{data.sublabel}</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function AIAgentsPage() {
  const nodes = [
    {
      id: '2',
      type: 'custom',
      position: { x: 100, y: 50 },
      data: { 
        label: 'PCAP API\nInterface',
        icon: Network,
        sublabel: 'MCP Server'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '3',
      type: 'custom',
      position: { x: 400, y: 50 },
      data: { 
        label: 'Report Generator\nAPI Interface',
        icon: Network,
        sublabel: 'MCP Server'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 700, y: 50 },
      data: { 
        label: 'Threat Analytics\nAPI Interface',
        icon: Network,
        sublabel: 'MCP Server'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    },
    {
      id: '1',
      type: 'custom',
      position: { x: 400, y: 250 },
      data: { 
        label: 'Security Dashboard\nUnified View',
        icon: Shield,
        sublabel: 'MCP Client/Host'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    }
  ];
  
  const edges = [
    {
      id: 'e1-2',
      source: '2',
      target: '1',
      type: 'smoothstep',
      animated: true,
      label: 'MCP Control',
      labelBgPadding: [8, 4] as [number, number],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
      labelStyle: { fill: '#64748b', fontSize: 11 },
      style: { stroke: '#93c5fd', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#93c5fd',
        width: 15,
        height: 15,
      },
    },
    {
      id: 'e1-3',
      source: '3',
      target: '1',
      type: 'smoothstep',
      animated: true,
      label: 'MCP Control',
      labelBgPadding: [8, 4] as [number, number],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
      labelStyle: { fill: '#64748b', fontSize: 11 },
      style: { stroke: '#93c5fd', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#93c5fd',
        width: 15,
        height: 15,
      },
    },
    {
      id: 'e1-4',
      source: '4',
      target: '1',
      type: 'smoothstep',
      animated: true,
      label: 'MCP Control',
      labelBgPadding: [8, 4] as [number, number],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
      labelStyle: { fill: '#64748b', fontSize: 11 },
      style: { stroke: '#93c5fd', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#93c5fd',
        width: 15,
        height: 15,
      },
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Agent Interaction Flow</h2>
          <p className="text-muted-foreground">MCP Client-Server Control Architecture</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>5G SecOps Agentic Control Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: '600px' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              className="bg-muted/10"
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
