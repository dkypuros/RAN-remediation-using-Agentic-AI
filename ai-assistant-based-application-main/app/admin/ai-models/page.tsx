'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Laptop, 
  Server, 
  Cpu, 
  Network, 
  FileJson, 
  Shield, 
  Workflow,
  Boxes,
  Binary,
  BrainCircuit,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function AIWorkflowPage() {
  const workflowSteps = [
    {
      number: 1,
      title: "Laptop AI CPU Workload",
      hardware: {
        icon: Laptop,
        label: "Intel AI CPU (Laptop)"
      },
      os: {
        icon: Boxes,
        label: "Red Hat Enterprise Linux AI"
      },
      workload: {
        icon: Network,
        label: "PCAP Processing"
      },
      useCase: {
        icon: Binary,
        label: "Network Traffic Analysis"
      },
      models: [
        { value: "default", label: "Default Edge Model" },
        { value: "optimized", label: "Edge-Optimized Model" },
        { value: "custom", label: "Custom Model" },
      ],
      description: "Optimized AI processing of network packet captures (PCAPs) running on laptop-grade Intel AI CPUs, enabling efficient analysis of networking activities at the edge."
    },
    {
      number: 2,
      title: "Server AI CPU Workload",
      hardware: {
        icon: Server,
        label: "Intel AI CPU with IPEX"
      },
      workload: {
        icon: FileJson,
        label: "Report Generation"
      },
      useCase: {
        icon: Boxes,
        label: "Red Hat OpenShift AI + Intel"
      },
      models: [
        { value: "ipex-optimized", label: "IPEX Optimized" },
        { value: "standard", label: "Standard Model" },
        { value: "experimental", label: "Experimental" },
      ],
      description: "Enhanced report generation powered by server-class Intel AI CPUs with IPEX optimization, deployed on Red Hat OpenShift AI platform for scalable enterprise performance."
    },
    {
      number: 3,
      title: "GPU Accelerated Workload",
      hardware: {
        icon: Cpu,
        label: "Intel Gaudi"
      },
      workload: {
        icon: BrainCircuit,
        label: "Llama3 & Custom Predictive AI"
      },
      useCase: {
        icon: Shield,
        label: "Advanced Threat Analytics"
      },
      platform: {
        icon: Boxes,
        label: "Red Hat OpenShift AI + Intel"
      },
      models: [
        { value: "llama3", label: "Llama3" },
        { value: "llama3-optimized", label: "Llama3 (Optimized)" },
        { value: "custom-predictive", label: "Custom Predictive" },
      ],
      description: "High-performance threat analytics using Llama3 and custom predictive models on Intel Gaudi, integrated with Red Hat OpenShift AI for PCAP annotation and threat vector analysis."
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">AI/ML Workflow</h2>
          <p className="text-muted-foreground">Distributed AI processing across multiple hardware platforms</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {workflowSteps.map((step) => (
          <Card key={step.number} className="relative">
            <div 
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg"
            >
              {step.number}
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <step.hardware.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  <span className="font-medium">{step.hardware.label}</span>
                </div>
                {step.os && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <step.os.icon className="h-4 w-4 text-red-600" strokeWidth={1.5} />
                    <span className="font-medium">{step.os.label}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <step.workload.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  <span className="font-medium">{step.workload.label}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <step.useCase.icon className={cn(
                    "h-4 w-4",
                    step.useCase.label.includes("Red Hat") ? "text-red-600" : "text-primary"
                  )} strokeWidth={1.5} />
                  <span className="font-medium">{step.useCase.label}</span>
                </div>
                {step.platform && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <step.platform.icon className="h-4 w-4 text-red-600" strokeWidth={1.5} />
                    <span className="font-medium">{step.platform.label}</span>
                  </div>
                )}
                <div className="pt-2">
                  <label className="text-sm font-medium mb-1.5 block text-muted-foreground">
                    Selected Model
                  </label>
                  <Select defaultValue={step.models[0].value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {step.models.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-sm text-muted-foreground border-t pt-3">
                {step.description}
              </p>
            </CardContent>
            <CardFooter className="pt-6">
              <Button 
                variant="outline" 
                className="w-full border-red-300/30 hover:bg-red-500/10 dark:border-red-400/30 dark:hover:bg-red-500/20 group relative"
              >
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 animate-gradient" />
                <Plus className="mr-2 h-4 w-4 text-red-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-red-600 transition-colors relative">
                  Connect Red Hat AI Service
                </span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
