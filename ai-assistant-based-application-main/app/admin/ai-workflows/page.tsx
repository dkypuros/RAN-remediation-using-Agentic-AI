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
import { Router, Cpu, Server, Shield, Network } from 'lucide-react';
import { cn } from "@/lib/utils";

interface CustomNodeData {
  label: string;
  icon: React.ElementType;
  sublabel?: string;
}

const CustomNode = ({ id, data }: NodeProps<CustomNodeData>) => {
  const isSecurityDashboard = id === '4';
  const isRouter = id === '0';

  return (
    <div className={cn(
      'px-4 py-2 shadow-md rounded-md bg-background border flex items-center relative',
      isSecurityDashboard && 'bg-blue-500/5 dark:bg-blue-500/10 border-blue-200/30 dark:border-blue-400/30',
      isRouter && 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-200/30 dark:border-amber-400/30'
    )}>
      <Handle type="target" position={Position.Left} className="!bg-muted-foreground" />
      <div className={cn(
        'rounded-full w-8 h-8 flex items-center justify-center',
        isSecurityDashboard && 'text-blue-500',
        isRouter && 'text-amber-500'
      )}>
        <data.icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div className="ml-2">
        <div className="text-sm font-medium whitespace-pre-line">{data.label}</div>
        {data.sublabel && (
          <div className="text-xs text-muted-foreground whitespace-pre-line">{data.sublabel}</div>
        )}
      </div>
      <Handle type="source" position={Position.Right} className="!bg-muted-foreground" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function AIWorkflowsPage() {
  const nodes = [
    {
      id: '0',
      type: 'custom',
      position: { x: 50, y: 50 },
      data: { 
        label: 'Cell Site Router\ngNodeB',
        icon: Router
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
    { 
      id: '1', 
      type: 'custom',
      position: { x: 300, y: 50 }, 
      data: { 
        label: 'Edge AI PCAP\nProcessing Layer',
        icon: Cpu
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
    { 
      id: '2', 
      type: 'custom',
      position: { x: 550, y: 50 }, 
      data: { 
        label: 'Server AI Report\nGeneration',
        icon: Server
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
    { 
      id: '3', 
      type: 'custom',
      position: { x: 800, y: 50 }, 
      data: { 
        label: 'GPU AI Threat Analytics\nIntel Gaudi',
        icon: Shield
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
    {
      id: '5',
      type: 'custom',
      position: { x: 300, y: 200 },
      data: {
        label: 'PCAP API\nInterface',
        icon: Network
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
    {
      id: '6',
      type: 'custom',
      position: { x: 550, y: 200 },
      data: {
        label: 'Report Generator\nAPI Interface',
        icon: Network
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
    {
      id: '7',
      type: 'custom',
      position: { x: 800, y: 200 },
      data: {
        label: 'Threat Analytics\nAPI Interface',
        icon: Network
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 550, y: 350 },
      data: {
        label: 'Security Dashboard\nUnified View',
        icon: Shield
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
  ];
  
  const edges = [
    {
      id: 'e0-1',
      source: '0',
      target: '1',
      type: 'smoothstep',
      animated: true,
      label: 'PCAP Serial Port',
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
      id: 'e1-5',
      source: '1',
      target: '5',
      type: 'smoothstep',
      animated: true,
      label: 'PCAP Data Stream',
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
      id: 'e2-6',
      source: '2',
      target: '6',
      type: 'smoothstep',
      animated: true,
      label: 'Report Data',
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
      id: 'e2-3',
      source: '2',
      target: '3',
      type: 'smoothstep',
      animated: true,
      label: 'Threat Patterns',
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
      id: 'e3-7',
      source: '3',
      target: '7',
      type: 'smoothstep',
      animated: true,
      label: 'Threat Data',
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
      id: 'e5-4',
      source: '5',
      target: '4',
      type: 'smoothstep',
      animated: true,
      label: 'API',
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
      id: 'e6-4',
      source: '6',
      target: '4',
      type: 'smoothstep',
      animated: true,
      label: 'API',
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
      id: 'e7-4',
      source: '7',
      target: '4',
      type: 'smoothstep',
      animated: true,
      label: 'API',
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
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">AI/ML Workflows</h2>
          <p className="text-muted-foreground">Interactive visualization of AI/ML model interactions</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Model Interaction Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ 
            width: '100%',
            height: '600px',
            position: 'relative',
            zIndex: 50
          }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              style={{
                backgroundColor: '#ffffff'
              }}
            >
              <Background gap={16} color="#e5e7eb" />
              <Controls />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
