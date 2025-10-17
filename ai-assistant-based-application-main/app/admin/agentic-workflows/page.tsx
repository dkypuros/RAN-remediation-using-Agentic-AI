'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Workflow,
  Database,
  Server,
  BarChart3,
  Activity,
  FileText,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AgentStep {
  type: string;
  action: string;
  observation?: string;
  step_number: number;
}

export default function AgenticWorkflows() {
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Welcome to the AI RAN Agentic Workflow Demo. Ask me about network issues, alarms, or site performance!' }
  ]);
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([]);
  const [retrievedData, setRetrievedData] = useState<any>({});

  const handleSendMessage = async () => {
    if (!message.trim() || isProcessing) return;

    const userMessage = message;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setMessage('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/ran-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      if (data.success) {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: data.answer || 'Analysis complete. Check the tabs for details.'
        }]);

        if (data.steps) setAgentSteps(data.steps);
        if (data.retrieved_data) setRetrievedData(data.retrieved_data);
      } else {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Error processing request. Please try again.'
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error connecting to agent service.'
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI RAN Agentic Workflow Demo</h2>
          <p className="text-muted-foreground mt-1">
            Autonomous AI agents for RAN remediation and management
          </p>
        </div>
        <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
          <Activity className="h-3 w-3 mr-1" />
          Active
        </Badge>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side - Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-250px)] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                AI RAN Demo
              </CardTitle>
              <CardDescription>
                Ask about network issues: "What's wrong with SITE-002?" or "Show me all critical alarms"
              </CardDescription>
            </CardHeader>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Agent is analyzing...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about RAN issues, alarms, or site performance..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isProcessing}
                />
                <Button onClick={handleSendMessage} disabled={isProcessing}>
                  {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setMessage('What is wrong with SITE-002?')}
                  disabled={isProcessing}
                >
                  Check SITE-002
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setMessage('Show me all critical alarms')}
                  disabled={isProcessing}
                >
                  Critical alarms
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="agent-activity" className="h-[calc(100vh-250px)]">
            <TabsList className="grid w-full grid-cols-3 gap-1">
              <TabsTrigger value="agent-activity" className="text-xs">
                <Activity className="h-3 w-3 mr-1" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="ran-data" className="text-xs">
                <Database className="h-3 w-3 mr-1" />
                Data
              </TabsTrigger>
              <TabsTrigger value="ran-services" className="text-xs">
                <Server className="h-3 w-3 mr-1" />
                Services
              </TabsTrigger>
            </TabsList>
            <TabsList className="grid w-full grid-cols-2 gap-1 mt-1">
              <TabsTrigger value="data-fixtures" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                Fixtures
              </TabsTrigger>
              <TabsTrigger value="reranking" className="text-xs">
                <BarChart3 className="h-3 w-3 mr-1" />
                Retrieval
              </TabsTrigger>
            </TabsList>

            {/* Agent Activity Tab */}
            <TabsContent value="agent-activity" className="mt-4 h-[calc(100%-80px)]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Agent Activity</CardTitle>
                  <CardDescription>Live agent reasoning and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-450px)]">
                    {agentSteps.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No activity yet. Send a message to see the agent work!
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {agentSteps.map((step, index) => (
                          <div key={index} className="border-l-2 border-blue-500 pl-3 py-2">
                            <div className="flex items-center gap-2 mb-1">
                              {step.type === 'FINAL_ANSWER' ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Activity className="h-4 w-4 text-blue-500" />
                              )}
                              <span className="font-semibold text-sm">{step.type}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Step {step.step_number}: {step.action}
                            </p>
                            {step.observation && (
                              <p className="text-xs bg-muted p-2 rounded mt-1">
                                {step.observation.substring(0, 200)}...
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* RAN Data Tab */}
            <TabsContent value="ran-data" className="mt-4 h-[calc(100%-80px)]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">RAN Data</CardTitle>
                  <CardDescription>Network sites and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-450px)]">
                    <div className="space-y-3">
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">SITE-001</span>
                          <Badge className="bg-green-500">HEALTHY</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Downtown Tower Alpha</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                          <div>Cells: 3</div>
                          <div>Users: 337</div>
                        </div>
                      </div>
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">SITE-002</span>
                          <Badge className="bg-red-500">DEGRADED</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Industrial Park Beta</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                          <div>Cells: 3 (1 down)</div>
                          <div>Users: 96</div>
                        </div>
                      </div>
                      <div className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">SITE-003</span>
                          <Badge className="bg-green-500">HEALTHY</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Residential Zone Gamma</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                          <div>Cells: 2</div>
                          <div>Users: 167</div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* RAN Services Tab */}
            <TabsContent value="ran-services" className="mt-4 h-[calc(100%-80px)]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">RAN Services</CardTitle>
                  <CardDescription>Available service endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-450px)]">
                    <div className="space-y-3 text-xs">
                      <div className="border rounded p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Server className="h-4 w-4 text-green-500" />
                          <span className="font-mono font-semibold">/api/ran/alarms</span>
                        </div>
                        <p className="text-muted-foreground">Get active alarms from the network</p>
                      </div>
                      <div className="border rounded p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Server className="h-4 w-4 text-green-500" />
                          <span className="font-mono font-semibold">/api/ran/kpis</span>
                        </div>
                        <p className="text-muted-foreground">Get KPI reports for all sites</p>
                      </div>
                      <div className="border rounded p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Server className="h-4 w-4 text-green-500" />
                          <span className="font-mono font-semibold">/api/ran/cell-details/:id</span>
                        </div>
                        <p className="text-muted-foreground">Get detailed cell-level RF metrics</p>
                      </div>
                      <div className="border rounded p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Server className="h-4 w-4 text-green-500" />
                          <span className="font-mono font-semibold">/api/ran/remediation</span>
                        </div>
                        <p className="text-muted-foreground">Search remediation playbooks</p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Fixtures Tab */}
            <TabsContent value="data-fixtures" className="mt-4 h-[calc(100%-80px)]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Data Fixtures</CardTitle>
                  <CardDescription>Sample data powering the demo</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-450px)]">
                    <div className="space-y-3 text-xs">
                      <div>
                        <h4 className="font-semibold mb-2">Active Alarms (alarms.json)</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• ALM-983451: S1 link failure (CRITICAL)</li>
                          <li>• ALM-983452: Cell down (MAJOR)</li>
                          <li>• ALM-982109: High VSWR (MINOR)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 mt-3">KPI Reports (kpis.json)</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• SITE-001: 99.8% RRC success, 0.2% drop rate</li>
                          <li>• SITE-002: 92.1% RRC success, 45.7% drop rate</li>
                          <li>• SITE-003: 99.6% RRC success, 0.5% drop rate</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 mt-3">Cell Details (cell_details.json)</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• CELL-2B: SINR -2.1 dB (offline)</li>
                          <li>• CELL-3A: SINR 20.2 dB (VSWR warning)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 mt-3">Remediation Playbooks</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• RMD-001: S1 Link Failure</li>
                          <li>• RMD-002: High VSWR</li>
                          <li>• RMD-003: Poor Cell Performance</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Re-ranking & Retrieval Tab */}
            <TabsContent value="reranking" className="mt-4 h-[calc(100%-80px)]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Retrieval Process</CardTitle>
                  <CardDescription>Data retrieved during agent execution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-450px)]">
                    {Object.keys(retrievedData).length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No data retrieved yet. Agent will populate this during query processing.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(retrievedData).map(([key, value]) => (
                          <div key={key} className="border rounded p-3">
                            <h4 className="font-semibold text-sm mb-2">{key}</h4>
                            <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                              {JSON.stringify(value, null, 2).substring(0, 500)}
                            </pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
