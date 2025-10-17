'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  MessageSquare,
  Calendar
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchTickets() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Search Tickets</h2>
        <p className="text-muted-foreground mt-1">
          Find tickets across all projects and teams
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by keyword, ticket ID, or description..." 
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button>Search</Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Any status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Priority</label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Any priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Assignee</label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Any assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="me">Assigned to me</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="team">My team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Date Range</label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Search Results</h3>
          <div className="text-sm text-muted-foreground">Showing 15 of 42 results</div>
        </div>

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
                    <User className="h-3 w-3" /> John Smith
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> May 6, 2025
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
                    <User className="h-3 w-3" /> Sarah Johnson
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> May 5, 2025
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
                    <User className="h-3 w-3" /> Mike Taylor
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> May 3, 2025
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

        <div className="flex items-center justify-center gap-2 pt-6">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-muted">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
