'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  History, 
  CheckCircle2, 
  Clock,
  Calendar,
  User,
  MessageSquare,
  Download,
  Filter,
  ArrowUpDown
} from "lucide-react";

export default function TicketHistory() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ticket History</h2>
          <p className="text-muted-foreground mt-1">
            View and analyze your resolved and closed tickets
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 pb-4">
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
          <Badge variant="outline">Last 7 days</Badge>
          <Badge variant="outline">Last 30 days</Badge>
          <Badge variant="outline">Last 90 days</Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 90 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 hours</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all tickets
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.3%</div>
            <p className="text-xs text-muted-foreground mt-1">
              First-time resolution
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ticket History List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recently Resolved Tickets</h3>
        
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
                  <User className="h-3 w-3" /> Mike Taylor
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Resolved May 3, 2025
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Resolved in 4h 12m
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
                <h3 className="font-semibold">TICKET-1032</h3>
                <Badge className="bg-red-500">High</Badge>
                <Badge variant="outline">Resolved</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Login service outage affecting 30% of users</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" /> Sarah Johnson
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Resolved May 2, 2025
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Resolved in 1h 47m
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
                <h3 className="font-semibold">TICKET-1029</h3>
                <Badge className="bg-amber-500">Medium</Badge>
                <Badge variant="outline">Resolved</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Dashboard data not refreshing automatically</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" /> John Smith
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Resolved May 1, 2025
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Resolved in 5h 23m
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
                <h3 className="font-semibold">TICKET-1026</h3>
                <Badge className="bg-emerald-500">Low</Badge>
                <Badge variant="outline">Resolved</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Update user profile settings UI</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" /> Alex Wong
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Resolved April 29, 2025
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Resolved in 8h 15m
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
