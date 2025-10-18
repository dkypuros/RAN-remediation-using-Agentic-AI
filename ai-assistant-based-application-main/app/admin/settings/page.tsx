'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Save,
  RefreshCw,
  Sparkles,
  Zap,
  CheckCircle2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [useLiveAgent, setUseLiveAgent] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load setting from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('useLiveAgent');
    if (saved !== null) {
      setUseLiveAgent(saved === 'true');
    }
  }, []);

  // Save setting to localStorage
  const handleSaveAgentSettings = () => {
    localStorage.setItem('useLiveAgent', useLiveAgent.toString());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground mt-1">
            Configure your application preferences and integrations
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        {/* Settings Navigation */}
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start bg-muted" asChild>
                <a href="#integrations" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  JIRA Integration
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#appearance" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Appearance
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#ai" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Settings
                </a>
              </Button>
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="md:col-span-4 space-y-6">
          {/* JIRA Integration */}
          <Card id="integrations">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                JIRA Integration
              </CardTitle>
              <CardDescription>
                Connect your JIRA account to enable ticket synchronization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.5 18.35a3.36 3.36 0 0 0 4.75-4.74L5.77 3.13a3.36 3.36 0 0 0-4.74 4.75L11.5 18.35Z"/><path d="m11.5 18.35 5.66 5.65"/><path d="M18.35 11.5 23 17.14"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">JIRA Cloud</h4>
                    <p className="text-xs text-muted-foreground">Connected to workspace: <span className="font-medium">DevTeam</span></p>
                  </div>
                </div>
                <Badge className="bg-emerald-500">Connected</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="jira-url">JIRA URL</Label>
                  <Input id="jira-url" value="https://devteam.atlassian.net" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jira-project">Default Project</Label>
                  <Select defaultValue="DEV">
                    <SelectTrigger id="jira-project">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DEV">DEV - Development</SelectItem>
                      <SelectItem value="OPS">OPS - Operations</SelectItem>
                      <SelectItem value="SUP">SUP - Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Token</Label>
                <div className="flex gap-2">
                  <Input id="api-key" type="password" value="••••••••••••••••" />
                  <Button variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Last refreshed: May 1, 2025</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Sync Settings</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-tickets">Sync Tickets Automatically</Label>
                    <p className="text-xs text-muted-foreground">Automatically sync tickets between JIRA and AI Ticket Assistant</p>
                  </div>
                  <Switch id="sync-tickets" checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-comments">Sync Comments</Label>
                    <p className="text-xs text-muted-foreground">Keep comments in sync between platforms</p>
                  </div>
                  <Switch id="sync-comments" checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-attachments">Sync Attachments</Label>
                    <p className="text-xs text-muted-foreground">Sync file attachments between platforms</p>
                  </div>
                  <Switch id="sync-attachments" checked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-interval">Sync Interval</Label>
                    <p className="text-xs text-muted-foreground">How often to sync data with JIRA</p>
                  </div>
                  <Select defaultValue="5">
                    <SelectTrigger id="sync-interval" className="w-[180px]">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Every 1 minute</SelectItem>
                      <SelectItem value="5">Every 5 minutes</SelectItem>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                      <SelectItem value="60">Every hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline">Disconnect</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card id="ai">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                AI Settings
              </CardTitle>
              <CardDescription>
                Configure how the AI assistant works with your tickets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">AI Assistant Behavior</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-enabled">Enable AI Assistant</Label>
                    <p className="text-xs text-muted-foreground">Turn AI features on or off globally</p>
                  </div>
                  <Switch id="ai-enabled" checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-suggestions">Show Similar Ticket Suggestions</Label>
                    <p className="text-xs text-muted-foreground">AI will suggest similar tickets when creating new ones</p>
                  </div>
                  <Switch id="ai-suggestions" checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-auto-categorize">Auto-Categorize Tickets</Label>
                    <p className="text-xs text-muted-foreground">AI will suggest categories and tags for new tickets</p>
                  </div>
                  <Switch id="ai-auto-categorize" checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-priority">Auto-Suggest Priority</Label>
                    <p className="text-xs text-muted-foreground">AI will suggest priority levels for new tickets</p>
                  </div>
                  <Switch id="ai-priority" checked={true} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="similarity-threshold">Similarity Threshold</Label>
                <div className="flex gap-2 items-center">
                  <Input id="similarity-threshold" type="range" min="0" max="100" defaultValue="70" className="w-full" />
                  <span className="text-sm font-medium w-8">70%</span>
                </div>
                <p className="text-xs text-muted-foreground">Minimum similarity score required to show related tickets (higher = more strict matching)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-suggestions">Maximum Suggestions</Label>
                <Select defaultValue="3">
                  <SelectTrigger id="max-suggestions">
                    <SelectValue placeholder="Select maximum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 suggestion</SelectItem>
                    <SelectItem value="3">3 suggestions</SelectItem>
                    <SelectItem value="5">5 suggestions</SelectItem>
                    <SelectItem value="10">10 suggestions</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Maximum number of similar tickets to show</p>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* RAN Agent Settings */}
          <Card id="ran-agent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-500" />
                RAN Agentic Workflow
              </CardTitle>
              <CardDescription>
                Configure how the RAN troubleshooting agent operates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="live-agent" className="text-base font-semibold">Use Live ReAct Agent</Label>
                      {useLiveAgent ? (
                        <Badge variant="default" className="bg-green-500">Enabled</Badge>
                      ) : (
                        <Badge variant="secondary">Disabled (Demo Mode)</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {useLiveAgent ? (
                        <>
                          <strong className="text-green-600">Live Agent Mode:</strong> Uses vLLM-powered ReAct agent with dynamic reasoning.
                          Agent will think through problems and choose tools autonomously. Requires vLLM service to be running.
                        </>
                      ) : (
                        <>
                          <strong className="text-blue-600">Demo Mode:</strong> Uses pre-programmed responses optimized for demonstrations.
                          Responses are fast, reliable, and showcase all workflow features consistently.
                        </>
                      )}
                    </p>
                    <div className="mt-3 p-3 bg-background rounded border text-xs space-y-2">
                      <p className="font-semibold">
                        {useLiveAgent ? '⚠️ Live Agent Behavior:' : '✓ Demo Mode Features:'}
                      </p>
                      {useLiveAgent ? (
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Agent reasons autonomously using LLM</li>
                          <li>May call different tools each time</li>
                          <li>Responses can vary based on LLM reasoning</li>
                          <li>Slower (multiple LLM inference calls)</li>
                          <li>Requires vLLM service availability</li>
                        </ul>
                      ) : (
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Instant, predictable responses</li>
                          <li>Perfect for scripted demonstrations</li>
                          <li>Shows all data sources (alarms, KPIs, cells, playbooks)</li>
                          <li>Formatted markdown with proper structure</li>
                          <li>No external dependencies required</li>
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <Switch
                      id="live-agent"
                      checked={useLiveAgent}
                      onCheckedChange={setUseLiveAgent}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setUseLiveAgent(false)}
                >
                  Reset to Demo Mode
                </Button>
                <Button
                  onClick={handleSaveAgentSettings}
                  className="flex items-center gap-2"
                >
                  {saveSuccess ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Agent Settings
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
