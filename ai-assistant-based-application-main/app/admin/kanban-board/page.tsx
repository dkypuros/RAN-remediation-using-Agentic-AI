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
import { useContextStore, type Ticket } from "@/lib/stores/context-store";

// Ticket data structured for context sharing
const kanbanTickets: Record<string, Ticket[]> = {
  'To Do': [
    {
      id: 'TICKET-1045',
      title: 'Update user authentication flow',
      description: 'Update user authentication flow',
      status: 'To Do',
      priority: 'High',
      assignee: 'JS',
      createdAt: '2025-10-15',
    },
    {
      id: 'TICKET-1047',
      title: 'Optimize database queries for dashboard',
      description: 'Optimize database queries for dashboard',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'MT',
      createdAt: '2025-10-15',
    },
  ],
  'In Progress': [
    {
      id: 'TICKET-1042',
      title: 'API authentication failure in production environment',
      description: 'API authentication failure in production',
      status: 'In Progress',
      priority: 'High',
      assignee: 'SJ',
      createdAt: '2025-10-14',
    },
    {
      id: 'TICKET-1039',
      title: 'Dashboard loading slowly for some users',
      description: 'Dashboard loading slowly for some users',
      status: 'In Progress',
      priority: 'Medium',
      assignee: 'AW',
      createdAt: '2025-10-14',
    },
  ],
  'Review': [
    {
      id: 'TICKET-1038',
      title: 'Update user profile settings',
      description: 'Update user profile settings',
      status: 'Review',
      priority: 'Low',
      assignee: 'KL',
      createdAt: '2025-10-13',
    },
    {
      id: 'TICKET-1037',
      title: 'Fix pagination in search results',
      description: 'Fix pagination in search results',
      status: 'Review',
      priority: 'Medium',
      assignee: 'MT',
      createdAt: '2025-10-13',
    },
  ],
  'Done': [
    {
      id: 'TICKET-1036',
      title: 'Update documentation for new API endpoints',
      description: 'Update documentation for new API endpoints',
      status: 'Done',
      priority: 'Low',
      assignee: 'MT',
      createdAt: '2025-10-12',
      resolutionTime: '4h',
    },
    {
      id: 'TICKET-1032',
      title: 'Login service outage affecting users',
      description: 'Login service outage affecting users',
      status: 'Done',
      priority: 'High',
      assignee: 'SJ',
      createdAt: '2025-10-11',
      resolutionTime: '1h',
    },
  ],
};

export default function KanbanBoard() {
  const { setPage, setSelectedTicket } = useContextStore();

  // Set page context on mount
  React.useEffect(() => {
    setPage('kanban');
  }, [setPage]);

  const handleTicketClick = (ticket: Ticket, column: string) => {
    setSelectedTicket(ticket, { kanbanColumn: column as any });
  };

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
            {kanbanTickets['To Do'].map((ticket) => (
              <Card
                key={ticket.id}
                className="shadow-sm cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleTicketClick(ticket, 'To Do')}
              >
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={ticket.priority === 'High' ? 'bg-red-500' : ticket.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}>
                      {ticket.priority}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                  <h4 className="font-medium text-sm">{ticket.id}</h4>
                  <p className="text-xs text-muted-foreground">{ticket.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white">
                        {ticket.assignee}
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span className="text-xs">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            {kanbanTickets['In Progress'].map((ticket) => (
              <Card
                key={ticket.id}
                className="shadow-sm cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleTicketClick(ticket, 'In Progress')}
              >
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={ticket.priority === 'High' ? 'bg-red-500' : ticket.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}>
                      {ticket.priority}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                  <h4 className="font-medium text-sm">{ticket.id}</h4>
                  <p className="text-xs text-muted-foreground">{ticket.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white">
                        {ticket.assignee}
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span className="text-xs">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            {kanbanTickets['Review'].map((ticket) => (
              <Card
                key={ticket.id}
                className="shadow-sm cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleTicketClick(ticket, 'Review')}
              >
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={ticket.priority === 'High' ? 'bg-red-500' : ticket.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}>
                      {ticket.priority}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                  <h4 className="font-medium text-sm">{ticket.id}</h4>
                  <p className="text-xs text-muted-foreground">{ticket.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white">
                        {ticket.assignee}
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span className="text-xs">2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            {kanbanTickets['Done'].map((ticket) => (
              <Card
                key={ticket.id}
                className="shadow-sm bg-muted/50 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleTicketClick(ticket, 'Done')}
              >
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={ticket.priority === 'High' ? 'bg-red-500' : ticket.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}>
                      {ticket.priority}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                  <h4 className="font-medium text-sm">{ticket.id}</h4>
                  <p className="text-xs text-muted-foreground">{ticket.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white">
                        {ticket.assignee}
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="text-xs">{ticket.resolutionTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
