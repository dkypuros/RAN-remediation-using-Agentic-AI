'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Plus,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  BarChart3,
  Filter
} from "lucide-react";

export default function TeamMembers() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Members</h2>
          <p className="text-muted-foreground mt-1">
            Manage your team and track individual performance
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search team members..." 
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active members
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 hours</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all team members
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tickets Resolved (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground mt-1">
              +18% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Active Team Members</h3>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-xl text-white font-medium">
                  SJ
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Senior Developer</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-emerald-500">Top Performer</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">Tickets Resolved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">1.8h</div>
                    <p className="text-xs text-muted-foreground">Avg. Resolution</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-xl text-white font-medium">
                  MT
                </div>
                <div>
                  <h4 className="font-semibold">Mike Taylor</h4>
                  <p className="text-sm text-muted-foreground">Backend Developer</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-blue-500">API Specialist</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold">36</div>
                    <p className="text-xs text-muted-foreground">Tickets Resolved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2.4h</div>
                    <p className="text-xs text-muted-foreground">Avg. Resolution</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-xl text-white font-medium">
                  JS
                </div>
                <div>
                  <h4 className="font-semibold">John Smith</h4>
                  <p className="text-sm text-muted-foreground">Frontend Developer</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-amber-500">UI Expert</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold">29</div>
                    <p className="text-xs text-muted-foreground">Tickets Resolved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">3.1h</div>
                    <p className="text-xs text-muted-foreground">Avg. Resolution</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-xl text-white font-medium">
                  KL
                </div>
                <div>
                  <h4 className="font-semibold">Kelly Lee</h4>
                  <p className="text-sm text-muted-foreground">QA Engineer</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-red-500">Bug Hunter</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold">31</div>
                    <p className="text-xs text-muted-foreground">Tickets Resolved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2.7h</div>
                    <p className="text-xs text-muted-foreground">Avg. Resolution</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-xl text-white font-medium">
                  AW
                </div>
                <div>
                  <h4 className="font-semibold">Alex Wong</h4>
                  <p className="text-sm text-muted-foreground">DevOps Engineer</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-blue-500">Infrastructure</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">Tickets Resolved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.2h</div>
                    <p className="text-xs text-muted-foreground">Avg. Resolution</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-xl text-white font-medium">
                  EM
                </div>
                <div>
                  <h4 className="font-semibold">Emma Martinez</h4>
                  <p className="text-sm text-muted-foreground">Product Manager</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-purple-500">Team Lead</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">Tickets Resolved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">3.5h</div>
                    <p className="text-xs text-muted-foreground">Avg. Resolution</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-2 pt-4">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-muted">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
