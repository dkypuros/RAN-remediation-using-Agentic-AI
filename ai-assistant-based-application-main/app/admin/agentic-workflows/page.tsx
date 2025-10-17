'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Workflow,
  Database,
  Server,
  BarChart3,
  Activity,
  FileText,
  MessageSquare,
  Send
} from "lucide-react";

export default function AgenticWorkflows() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: 'Welcome to the AI RAN Agentic Workflow Demo. This system demonstrates how AI agents can autonomously handle RAN remediation tasks.' }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setChatMessages(prev => [...prev, { role: 'user', content: message }]);
    setMessage('');

    // Placeholder response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Agent processing your request... (Demo mode - full functionality coming soon)'
      }]);
    }, 500);
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Chat Interface (Main) */}
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-250px)] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                AI RAN Demo
              </CardTitle>
              <CardDescription>
                Interact with the agentic workflow system
              </CardDescription>
            </CardHeader>

            {/* Chat Messages */}
            <CardContent className="flex-1 overflow-auto p-4 space-y-4">
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
            </CardContent>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about RAN issues, agent tasks, or workflow status..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side - Tabs */}
        <div className="lg:col-span-1">
          <Tabs defaultValue="ran-data" className="h-[calc(100vh-250px)]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ran-data" className="text-xs">
                <Database className="h-3 w-3 mr-1" />
                RAN Data
              </TabsTrigger>
              <TabsTrigger value="ran-services" className="text-xs">
                <Server className="h-3 w-3 mr-1" />
                Services
              </TabsTrigger>
            </TabsList>
            <TabsList className="grid w-full grid-cols-2 mt-1">
              <TabsTrigger value="data-fixtures" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                Fixtures
              </TabsTrigger>
              <TabsTrigger value="reranking" className="text-xs">
                <BarChart3 className="h-3 w-3 mr-1" />
                Re-ranking
              </TabsTrigger>
            </TabsList>
            <TabsList className="grid w-full grid-cols-1 mt-1">
              <TabsTrigger value="agent-activity" className="text-xs">
                <Activity className="h-3 w-3 mr-1" />
                Agent Activity
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="ran-data" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">RAN Data</CardTitle>
                  <CardDescription>Network data and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    RAN data integration coming soon. This will display real-time network metrics,
                    cell tower status, and performance data.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ran-services" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">RAN Services</CardTitle>
                  <CardDescription>Service endpoints and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    RAN services monitoring coming soon. This will show available services,
                    health checks, and API endpoints.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data-fixtures" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Fixtures</CardTitle>
                  <CardDescription>Test data and scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Data fixtures coming soon. This will provide sample RAN scenarios,
                    test cases, and synthetic data for demonstrations.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reranking" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Re-ranking & Retrieval</CardTitle>
                  <CardDescription>RAG optimization metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Re-ranking and retrieval analytics coming soon. This will show how the RAG
                    system prioritizes and retrieves relevant information.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agent-activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Agent Activity</CardTitle>
                  <CardDescription>Live agent execution logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Agent activity monitoring coming soon. This will display active agents,
                    their tasks, decision-making process, and execution logs.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
