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

export default function MyTickets() {
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
        <Card className="hover:bg-muted/50 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">TICKET-1042</h3>
                <Badge className="bg-red-500">High</Badge>
              </div>
              <p className="text-sm text-muted-foreground">API authentication failure in production environment</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Created 2 hours ago
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" /> 8 comments
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
              <Button variant="outline" size="sm">View</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">TICKET-1039</h3>
                <Badge className="bg-amber-500">Medium</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Dashboard loading slowly for some users</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Created 1 day ago
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" /> 3 comments
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
              <Button variant="outline" size="sm">View</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">TICKET-1036</h3>
                <Badge className="bg-emerald-500">Low</Badge>
                <Badge variant="outline">Resolved</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Update documentation for new API endpoints</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Created 3 days ago
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" /> 5 comments
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
              <Button variant="outline" size="sm">View</Button>
            </div>
          </CardContent>
        </Card>
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
