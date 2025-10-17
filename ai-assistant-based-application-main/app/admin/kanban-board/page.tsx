'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plus,
  AlertCircle,
  Clock,
  CheckCircle2,
  User,
  MessageSquare,
  Filter,
  ArrowUpDown,
  MoreHorizontal
} from "lucide-react";

export default function KanbanBoard() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kanban Board</h2>
          <p className="text-muted-foreground mt-1">
            Visualize and manage your team's workflow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Ticket
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-220px)]">
        {/* To Do Column */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">To Do</h3>
              <Badge variant="outline">4</Badge>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-muted/40 rounded-lg p-2 flex-1 overflow-auto space-y-2">
            <Card className="shadow-sm">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-500">High</Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <h4 className="font-medium text-sm">TICKET-1045</h4>
                <p className="text-xs text-muted-foreground">Update user authentication flow</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white">JS</div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span className="text-xs">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-500">Medium</Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <h4 className="font-medium text-sm">TICKET-1047</h4>
                <p className="text-xs text-muted-foreground">Optimize database queries for dashboard</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white">MT</div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span className="text-xs">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* In Progress Column */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">In Progress</h3>
              <Badge variant="outline">3</Badge>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-muted/40 rounded-lg p-2 flex-1 overflow-auto space-y-2">
            <Card className="shadow-sm">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-500">High</Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <h4 className="font-medium text-sm">TICKET-1042</h4>
                <p className="text-xs text-muted-foreground">API authentication failure in production</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white">SJ</div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span className="text-xs">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-500">Medium</Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <h4 className="font-medium text-sm">TICKET-1039</h4>
                <p className="text-xs text-muted-foreground">Dashboard loading slowly for some users</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white">AW</div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span className="text-xs">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review Column */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Review</h3>
              <Badge variant="outline">2</Badge>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-muted/40 rounded-lg p-2 flex-1 overflow-auto space-y-2">
            <Card className="shadow-sm">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-emerald-500">Low</Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <h4 className="font-medium text-sm">TICKET-1038</h4>
                <p className="text-xs text-muted-foreground">Update user profile settings</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white">KL</div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span className="text-xs">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-500">Medium</Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <h4 className="font-medium text-sm">TICKET-1037</h4>
                <p className="text-xs text-muted-foreground">Fix pagination in search results</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white">MT</div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span className="text-xs">4</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Done Column */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Done</h3>
              <Badge variant="outline">3</Badge>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-muted/40 rounded-lg p-2 flex-1 overflow-auto space-y-2">
            <Card className="shadow-sm bg-muted/50">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-emerald-500">Low</Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <h4 className="font-medium text-sm">TICKET-1036</h4>
                <p className="text-xs text-muted-foreground">Update documentation for new API endpoints</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white">MT</div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">4h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm bg-muted/50">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-500">High</Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <h4 className="font-medium text-sm">TICKET-1032</h4>
                <p className="text-xs text-muted-foreground">Login service outage affecting users</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white">SJ</div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">1h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
