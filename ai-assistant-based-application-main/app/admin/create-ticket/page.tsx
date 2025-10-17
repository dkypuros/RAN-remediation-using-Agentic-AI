'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Search, 
  MessageSquare,
  Clock,
  CheckCircle2,
  User,
  Tag
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateTicket() {
  const [showSimilarTickets, setShowSimilarTickets] = useState(true);

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Create Ticket Form */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Create New Ticket</h2>
            <p className="text-muted-foreground mt-1">
              Our AI will analyze your ticket and suggest similar past issues
            </p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ticket Title</label>
                <Input placeholder="Enter a descriptive title" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">Bug</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Assignee</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign to" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Myself</SelectItem>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="team">Development Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Describe the issue in detail..." 
                  className="min-h-[150px]"
                  onChange={() => setShowSimilarTickets(true)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Input placeholder="Add tags separated by commas" />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Ticket</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Similar Tickets */}
        <div className="lg:w-[380px] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Similar Tickets</h3>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500 text-xs">AI Powered</Badge>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
          </div>

          {showSimilarTickets ? (
            <div className="space-y-4">
              <Card className="border-amber-200 bg-amber-50/30 dark:bg-amber-900/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Search className="h-4 w-4 text-amber-500" />
                    AI found 3 similar tickets
                  </CardTitle>
                  <CardDescription>
                    These tickets may contain helpful information
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm">TICKET-982</h4>
                    <Badge className="bg-emerald-500 text-xs">Resolved</Badge>
                    <Badge className="bg-blue-500 text-xs">89% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">API authentication failure after certificate update</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> Sarah J.
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Resolved in 4h
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm">TICKET-876</h4>
                    <Badge className="bg-emerald-500 text-xs">Resolved</Badge>
                    <Badge className="bg-blue-500 text-xs">72% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Authentication service timeout in production</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> John S.
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Resolved in 2h
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm">TICKET-791</h4>
                    <Badge className="bg-emerald-500 text-xs">Resolved</Badge>
                    <Badge className="bg-blue-500 text-xs">65% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">OAuth token validation failing intermittently</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> Mike T.
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Resolved in 6h
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full flex items-center gap-2 mt-2">
                <MessageSquare className="h-4 w-4" />
                Ask AI Assistant
              </Button>
            </div>
          ) : (
            <Card className="border-dashed border-muted-foreground/20">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center text-muted-foreground">
                <Sparkles className="h-8 w-8 mb-4 opacity-50" />
                <h4 className="font-medium mb-2">AI-Powered Suggestions</h4>
                <p className="text-sm">
                  Start typing your ticket description and our AI will find similar tickets to help you.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
