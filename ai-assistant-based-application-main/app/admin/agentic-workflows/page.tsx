'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [liveSites, setLiveSites] = useState<any[]>([]);
  const [isLoadingSites, setIsLoadingSites] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(30000); // Default 30 seconds
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [serviceHealth, setServiceHealth] = useState<{[key: string]: {status: string, data?: any, error?: string}}>({});
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);
  const [agentMode, setAgentMode] = useState<'demo' | 'live' | 'unknown'>('unknown');

  // Fetch live site data on mount and when refresh interval changes
  React.useEffect(() => {
    fetchLiveSites();
    const interval = setInterval(fetchLiveSites, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const fetchLiveSites = async () => {
    setIsLoadingSites(true);
    try {
      // Fetch all sites from simulator via proxy
      const response = await fetch('/api/ran-sites');
      const data = await response.json();
      if (data.success && data.sites) {
        setLiveSites(data.sites);
        setLastUpdate(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error('Error fetching live sites:', error);
    } finally {
      setIsLoadingSites(false);
    }
  };

  const testEndpoint = async (endpoint: string, displayName: string) => {
    setTestingEndpoint(endpoint);
    try {
      const response = await fetch(`/api/ran-health?endpoint=${encodeURIComponent(endpoint)}`);
      const result = await response.json();

      setServiceHealth(prev => ({
        ...prev,
        [endpoint]: {
          status: result.success ? 'online' : 'offline',
          data: result.data,
          error: result.error
        }
      }));
    } catch (error) {
      setServiceHealth(prev => ({
        ...prev,
        [endpoint]: {
          status: 'offline',
          error: error instanceof Error ? error.message : 'Connection failed'
        }
      }));
    } finally {
      setTestingEndpoint(null);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isProcessing) return;

    const userMessage = message;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setMessage('');
    setIsProcessing(true);

    try {
      // Check if live agent is enabled from settings
      const useLiveAgent = localStorage.getItem('useLiveAgent') === 'true';

      const response = await fetch('/api/ran-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          useLiveAgent: useLiveAgent
        })
      });

      const data = await response.json();

      if (data.success) {
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          content: data.answer || 'Analysis complete. Check the tabs for details.'
        }]);

        if (data.steps) setAgentSteps(data.steps);
        if (data.retrieved_data) setRetrievedData(data.retrieved_data);

        // Set agent mode based on response
        if (data.mode === 'live_agent') {
          setAgentMode('live');
        } else {
          setAgentMode('demo');
        }
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
        <div className="flex gap-2">
          {agentMode !== 'unknown' && (
            <Badge className={agentMode === 'live' ? 'bg-green-500' : 'bg-blue-500'}>
              {agentMode === 'live' ? '🤖 Live Agent Mode' : '📋 Demo Mode'}
            </Badge>
          )}
          <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
            <Activity className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
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
              <CardDescription className="space-y-1">
                <p className="font-medium">Try these examples to see the full agentic workflow:</p>
                <ul className="text-xs space-y-0.5 ml-3 list-disc">
                  <li><strong>Retrieval:</strong> "Show me all critical alarms"</li>
                  <li><strong>Root Cause Analysis:</strong> "What's wrong with SITE-002?"</li>
                  <li><strong>Remediation:</strong> "What are the recommended actions?"</li>
                </ul>
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
                      {msg.role === 'assistant' ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          className="prose prose-sm max-w-none dark:prose-invert"
                          components={{
                            // Customize rendering
                            h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-base font-semibold mt-2 mb-1" {...props} />,
                            p: ({node, ...props}) => <p className="mb-2 leading-relaxed" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                            code: ({node, className, children, ...props}) => {
                              const isInline = !className;
                              return isInline ? (
                                <code className="bg-muted-foreground/20 px-1 py-0.5 rounded text-xs font-mono" {...props}>
                                  {children}
                                </code>
                              ) : (
                                <code className="block bg-muted p-2 rounded text-xs font-mono overflow-x-auto" {...props}>
                                  {children}
                                </code>
                              );
                            }
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        <span>{msg.content}</span>
                      )}
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
              <div className="flex gap-2 mt-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setMessage('Show me all critical alarms')}
                  disabled={isProcessing}
                >
                  🔍 Retrieval
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setMessage('What is wrong with SITE-002?')}
                  disabled={isProcessing}
                >
                  🔬 Root Cause
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setMessage('What are the recommended actions?')}
                  disabled={isProcessing}
                >
                  💡 Remediation
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
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">RAN Data (Live)</CardTitle>
                      <CardDescription>
                        Real-time network sites from simulator
                        {isLoadingSites && <Loader2 className="inline h-3 w-3 ml-2 animate-spin" />}
                        {lastUpdate && <span className="ml-2 text-[10px]">• Updated {lastUpdate}</span>}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Update:</span>
                      <Select
                        value={refreshInterval.toString()}
                        onValueChange={(value) => setRefreshInterval(parseInt(value))}
                      >
                        <SelectTrigger className="w-[140px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1000">Every 1 sec</SelectItem>
                          <SelectItem value="3000">Every 3 sec</SelectItem>
                          <SelectItem value="5000">Every 5 sec</SelectItem>
                          <SelectItem value="10000">Every 10 sec</SelectItem>
                          <SelectItem value="30000">Every 30 sec</SelectItem>
                          <SelectItem value="60000">Every 1 min</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-450px)]">
                    {liveSites.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Loading live site data...
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {liveSites.map((site) => {
                          const statusColor =
                            site.status === 'OPERATIONAL' ? 'bg-green-500' :
                            site.status === 'DEGRADED' ? 'bg-red-500' :
                            site.status === 'WARNING' ? 'bg-yellow-500' :
                            'bg-gray-500';

                          return (
                            <div key={site.siteId} className="border rounded p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{site.siteId}</span>
                                <Badge className={statusColor}>{site.status}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{site.siteName}</p>
                              <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                                <div>
                                  <div className="text-[10px] text-muted-foreground">Users</div>
                                  <div className="font-semibold">{site.totalUes}</div>
                                </div>
                                <div>
                                  <div className="text-[10px] text-muted-foreground">Avg Load</div>
                                  <div className="font-semibold">{site.avgLoad}%</div>
                                </div>
                                <div>
                                  <div className="text-[10px] text-muted-foreground">Avg SINR</div>
                                  <div className="font-semibold">{site.avgSINR} dB</div>
                                </div>
                              </div>
                              <div className="mt-2 pt-2 border-t text-[10px]">
                                <div className="flex items-center justify-between text-muted-foreground mb-1">
                                  <span>Cells: {site.activeCells}/{site.totalCells}</span>
                                  <span>gNB: {site.gnbId}</span>
                                </div>
                                {site.cells && site.cells.length > 0 && (
                                  <div className="grid grid-cols-3 gap-1 mt-1">
                                    {site.cells.slice(0, 3).map((cell: any) => (
                                      <div key={cell.cellId} className="bg-muted rounded px-1 py-0.5">
                                        <div className="font-mono">{cell.cellId}</div>
                                        <div className="text-[9px]">
                                          {cell.state === 'ACTIVE' ? '✓' : '✗'} {cell.ues} UEs • {cell.load}%
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* RAN Services Tab */}
            <TabsContent value="ran-services" className="mt-4 h-[calc(100%-80px)]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">RAN Services</CardTitle>
                  <CardDescription>Live service endpoints - Click "Test" to verify</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-450px)]">
                    <div className="space-y-3 text-xs">
                      {[
                        { endpoint: '/health', display: 'GET /health', desc: 'Health check for RAN services' },
                        { endpoint: '/api/ran/alarms', display: 'GET /api/ran/alarms', desc: 'Get active alarms from the network' },
                        { endpoint: '/api/ran/kpis', display: 'GET /api/ran/kpis', desc: 'Get KPI reports for all sites' },
                        { endpoint: '/api/ran/live-sites', display: 'GET /api/ran/live-sites', desc: 'Get live site data from simulator' },
                        { endpoint: '/api/ran/remediation', display: 'GET /api/ran/remediation', desc: 'Get remediation playbooks' },
                        { endpoint: '/api/ran/combined-site-analysis/SITE-002', display: 'GET /api/ran/combined-site-analysis/SITE-002', desc: 'Get comprehensive site analysis' },
                      ].map((service) => {
                        const health = serviceHealth[service.endpoint];
                        const isOnline = health?.status === 'online';
                        const isOffline = health?.status === 'offline';
                        const isTesting = testingEndpoint === service.endpoint;

                        return (
                          <div key={service.endpoint} className="border rounded p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2 flex-1">
                                <Server className={`h-4 w-4 ${isOnline ? 'text-green-500' : isOffline ? 'text-red-500' : 'text-gray-400'}`} />
                                <span className="font-mono font-semibold text-[11px]">{service.display}</span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 text-[10px] px-2"
                                onClick={() => testEndpoint(service.endpoint, service.display)}
                                disabled={isTesting}
                              >
                                {isTesting ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Test'}
                              </Button>
                            </div>
                            <p className="text-muted-foreground mb-2">{service.desc}</p>

                            {health && (
                              <div className="mt-2 pt-2 border-t">
                                <div className="flex items-center gap-2 mb-1">
                                  {isOnline ? (
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <AlertCircle className="h-3 w-3 text-red-500" />
                                  )}
                                  <span className="font-semibold text-[10px]">
                                    {isOnline ? 'Online' : 'Offline'}
                                  </span>
                                </div>

                                {health.data && (
                                  <div className="bg-muted p-2 rounded mt-1 font-mono text-[9px] max-h-24 overflow-auto">
                                    {typeof health.data === 'object' ? (
                                      <pre className="whitespace-pre-wrap">
                                        {JSON.stringify(health.data, null, 2).substring(0, 300)}
                                        {JSON.stringify(health.data).length > 300 ? '...' : ''}
                                      </pre>
                                    ) : (
                                      <span>{String(health.data)}</span>
                                    )}
                                  </div>
                                )}

                                {health.error && (
                                  <p className="text-red-500 text-[10px] mt-1">{health.error}</p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
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
