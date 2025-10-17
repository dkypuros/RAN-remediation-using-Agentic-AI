'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for visualizations
const tokenLatencyData = {
  newTokens: {
    mean: 42.35,
    median: 40.12,
    p95: 58.76,
    p99: 65.23,
    min: 35.67,
    max: 72.45
  },
  continuationTokens: {
    mean: 38.21,
    median: 36.54,
    p95: 52.32,
    p99: 60.87,
    min: 32.18,
    max: 65.91
  }
};

const packetAnalysisData = {
  totalPackets: 15243,
  meanLatency: 12.45,
  statusDistribution: {
    "SUCCESS": 14532,
    "ERROR": 456,
    "TIMEOUT": 255
  },
  protocols: ["TCP", "UDP", "HTTP", "HTTPS", "DNS"],
  packetLengthStats: {
    mean: 1245,
    min: 64,
    max: 8192
  }
};

export default function AILaptopPerformancePage() {
  const [activeTab, setActiveTab] = useState("token-latency");
  const [batchSize, setBatchSize] = useState(5);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-3xl font-bold tracking-tight">Intel AI Laptop Performance</h2>
      </div>

      <Tabs defaultValue="ai-inference" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="token-latency">Token Latency</TabsTrigger>
          <TabsTrigger value="packet-analysis">Packet Analysis</TabsTrigger>
          <TabsTrigger value="ai-inference">AI Inference</TabsTrigger>
        </TabsList>

        <TabsContent value="token-latency" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Token Generation Latency</CardTitle>
                <CardDescription>Performance metrics for LLM token generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">New Tokens</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mean:</span>
                        <span className="font-medium">{tokenLatencyData.newTokens.mean} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Median:</span>
                        <span className="font-medium">{tokenLatencyData.newTokens.median} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">P95:</span>
                        <span className="font-medium">{tokenLatencyData.newTokens.p95} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">P99:</span>
                        <span className="font-medium">{tokenLatencyData.newTokens.p99} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Min/Max:</span>
                        <span className="font-medium">{tokenLatencyData.newTokens.min}/{tokenLatencyData.newTokens.max} ms</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Continuation Tokens</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mean:</span>
                        <span className="font-medium">{tokenLatencyData.continuationTokens.mean} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Median:</span>
                        <span className="font-medium">{tokenLatencyData.continuationTokens.median} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">P95:</span>
                        <span className="font-medium">{tokenLatencyData.continuationTokens.p95} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">P99:</span>
                        <span className="font-medium">{tokenLatencyData.continuationTokens.p99} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Min/Max:</span>
                        <span className="font-medium">{tokenLatencyData.continuationTokens.min}/{tokenLatencyData.continuationTokens.max} ms</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="h-64 w-full bg-muted rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground">Token Latency Distribution Chart</p>
                      <p className="text-xs text-muted-foreground mt-2">Visualization will appear here</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full">Run Performance Test</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Memory Usage</CardTitle>
                <CardDescription>Memory consumption during inference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">Memory Usage Chart</p>
                    <p className="text-xs text-muted-foreground mt-2">Visualization will appear here</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Peak Memory</p>
                      <p className="text-2xl font-bold">4.2 GB</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Average Memory</p>
                      <p className="text-2xl font-bold">3.8 GB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Model Information</CardTitle>
              <CardDescription>Details about the tested model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Model Name</p>
                  <p className="text-lg font-medium">Gemma-2B-IT</p>
                  <p className="text-sm text-muted-foreground">2B parameters</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Quantization</p>
                  <p className="text-lg font-medium">4-bit</p>
                  <p className="text-sm text-muted-foreground">GPTQ quantization</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Hardware</p>
                  <p className="text-lg font-medium">Intel Arc GPU</p>
                  <p className="text-sm text-muted-foreground">XPU acceleration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packet-analysis" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Packet Latency Distribution</CardTitle>
                <CardDescription>Inter-packet latency analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">Packet Latency Chart</p>
                    <p className="text-xs text-muted-foreground mt-2">Visualization will appear here</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Mean Latency</p>
                      <p className="text-2xl font-bold">{packetAnalysisData.meanLatency} ms</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Packets</p>
                      <p className="text-2xl font-bold">{packetAnalysisData.totalPackets}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Protocol Distribution</CardTitle>
                <CardDescription>Breakdown of network protocols</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">Protocol Distribution Chart</p>
                    <p className="text-xs text-muted-foreground mt-2">Visualization will appear here</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Protocols</h3>
                  <div className="flex flex-wrap gap-2">
                    {packetAnalysisData.protocols.map((protocol) => (
                      <div key={protocol} className="px-3 py-1 bg-secondary rounded-full text-sm">
                        {protocol}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
              <CardDescription>Packet status analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(packetAnalysisData.statusDistribution).map(([status, count]) => (
                  <div key={status} className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{status}</p>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-muted-foreground">
                      {((count / packetAnalysisData.totalPackets) * 100).toFixed(2)}% of total
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Run Packet Analysis</Button>
          </div>
        </TabsContent>

        <TabsContent value="ai-inference" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Inference Performance Test</CardTitle>
              <CardDescription>Intel XPU acceleration for AI model inference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  This performance test measures how Intel's XPU acceleration enables efficient AI inference.
                  Click the button below to run a benchmark test on the Gemma-2B model.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Model</p>
                      <p className="text-lg font-medium">Gemma-2B-IT</p>
                      <p className="text-sm text-muted-foreground">4-bit quantized</p>
                      <Button size="lg" className="mt-2">
                        Start Performance Test
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Acceleration</p>
                      <p className="text-lg font-medium">Intel XPU</p>
                      <p className="text-sm text-muted-foreground">Arc GPU + CPU hybrid</p>
                      <Button size="lg" className="mt-2" disabled>
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Optimization</p>
                      <p className="text-lg font-medium">Batch Processing</p>
                      <p className="text-sm text-muted-foreground">Dynamic batch sizing</p>
                      <Button size="lg" className="mt-2" disabled>
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <p className="text-center text-muted-foreground">
                    Performance results will appear here after running the test
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Test Configuration</CardTitle>
              <CardDescription>Customize performance test parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Input Token Count</label>
                    <select className="w-full p-2 border rounded-md" defaultValue="1024">
                      <option value="512">512 tokens</option>
                      <option value="1024">1024 tokens</option>
                      <option value="2048">2048 tokens</option>
                    </select>
                    <p className="text-xs text-muted-foreground">Context length for inference</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Generated Token Count</label>
                    <select className="w-full p-2 border rounded-md" defaultValue="32">
                      <option value="16">16 tokens</option>
                      <option value="32">32 tokens</option>
                      <option value="64">64 tokens</option>
                      <option value="128">128 tokens</option>
                    </select>
                    <p className="text-xs text-muted-foreground">Number of tokens to generate</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Precision</label>
                    <select className="w-full p-2 border rounded-md" defaultValue="int4">
                      <option value="fp16">FP16</option>
                      <option value="int8">INT8</option>
                      <option value="int4">INT4</option>
                    </select>
                    <p className="text-xs text-muted-foreground">Model quantization level</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Test Iterations</label>
                    <select className="w-full p-2 border rounded-md" defaultValue="3">
                      <option value="1">1 run</option>
                      <option value="3">3 runs (average)</option>
                      <option value="5">5 runs (average)</option>
                    </select>
                    <p className="text-xs text-muted-foreground">Number of test iterations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
