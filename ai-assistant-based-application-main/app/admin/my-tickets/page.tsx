'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Filter,
  ArrowUpDown,
  Plus
} from "lucide-react";
import { useContextStore, type Ticket } from "@/lib/stores/context-store";

// My Tickets data with rich synthetic details for demonstration
const myTickets: Ticket[] = [
  {
    id: 'TICKET-1042',
    title: 'API authentication failure in production environment',
    description: 'Users are unable to authenticate to the API in the production environment. Error logs show certificate validation failures. This started after the latest deployment at 14:30. Multiple users affected across different regions.',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Sarah Johnson',
    createdAt: '2025-10-17T14:30:00Z',
    category: 'authentication',
  },
  {
    id: 'TICKET-1039',
    title: 'Dashboard loading slowly for some users',
    description: 'Dashboard performance degradation reported by users in the APAC region. Load times exceed 10 seconds. Database queries taking longer than expected. May be related to recent index changes.',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Alex Wong',
    createdAt: '2025-10-16T09:15:00Z',
    category: 'performance',
  },
  {
    id: 'TICKET-1036',
    title: 'Update documentation for new API endpoints',
    description: 'Documentation needs to be updated for the new v2 API endpoints released in sprint 23. Include authentication examples, rate limiting details, and migration guide from v1.',
    status: 'Resolved',
    priority: 'Low',
    assignee: 'Mike Taylor',
    createdAt: '2025-10-14T11:00:00Z',
    resolutionTime: '4h 12m',
    category: 'documentation',
  },
];

export default function MyTickets() {
  const { setPage, setSelectedTicket } = useContextStore();

  // Set page context on mount
  React.useEffect(() => {
    setPage('my-tickets');
  }, [setPage]);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket, { viewMode: 'my-tickets' });
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Tickets</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>

      <div className="flex items-center gap-3 pb-4">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          Sort
        </Button>
        <div className="ml-auto flex gap-2">
          <Badge className="bg-blue-500">All</Badge>
          <Badge variant="outline">Assigned to me</Badge>
          <Badge variant="outline">Created by me</Badge>
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {myTickets.map((ticket) => {
          const isResolved = ticket.status === 'Resolved';
          const IconComponent = isResolved ? CheckCircle2 : AlertCircle;
          const iconColor = ticket.priority === 'High' ? 'text-red-500' :
                           ticket.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500';

          return (
            <Card
              key={ticket.id}
              className="hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => handleTicketClick(ticket)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-shrink-0">
                  <IconComponent className={`h-8 w-8 ${iconColor}`} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{ticket.id}</h3>
                    <Badge className={
                      ticket.priority === 'High' ? 'bg-red-500' :
                      ticket.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }>
                      {ticket.priority}
                    </Badge>
                    {isResolved && <Badge variant="outline">Resolved</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{ticket.title}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> {ticket.category}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>View</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 pt-4">
        <Button variant="outline" size="sm" disabled>Previous</Button>
        <Button variant="outline" size="sm" className="bg-muted">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">3</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  );
}
