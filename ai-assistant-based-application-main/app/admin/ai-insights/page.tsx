'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  BarChart3, 
  Brain,
  Clock,
  AlertTriangle,
  CheckCircle2,
  User,
  MessageSquare,
  Download,
  ArrowRight,
  Lightbulb
} from "lucide-react";

export default function AIInsights() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Insights</h2>
          <p className="text-muted-foreground mt-1">
            AI-powered analysis and recommendations for your tickets
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* AI Summary Card */}
      <Card className="border-amber-200 bg-amber-50/30 dark:bg-amber-900/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              AI Summary
            </CardTitle>
            <Badge className="bg-amber-500">Updated 10 minutes ago</Badge>
          </div>
          <CardDescription>
            AI-generated insights based on your recent ticket activity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Based on the analysis of your recent tickets, our AI has identified several patterns and opportunities for improvement:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>Authentication-related issues have increased by 24% in the last week, primarily affecting the production API endpoints.</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>Average resolution time for high-priority tickets has decreased from 3.2 hours to 2.1 hours, showing a 34% improvement.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>Sarah Johnson has resolved the most tickets this month (42), with an average resolution time of 1.8 hours.</span>
            </li>
            <li className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>Implementing automated tests for the authentication service could prevent 68% of recent production issues.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Ticket Trends
            </CardTitle>
            <CardDescription>
              AI-detected patterns in ticket creation and resolution
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-16 w-16 mx-auto mb-2 opacity-50" />
              <p>Trend visualization would appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              AI Recommendations
            </CardTitle>
            <CardDescription>
              Actionable insights to improve your workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500">High Impact</Badge>
                <h4 className="font-medium text-sm">Implement Authentication Service Monitoring</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Setting up proactive monitoring for authentication services could prevent 73% of critical outages before they affect users.
              </p>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                View Details <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="border-t pt-3 space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500">Medium Impact</Badge>
                <h4 className="font-medium text-sm">Optimize Dashboard Query Performance</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on recent tickets, implementing query caching could improve dashboard load times by approximately 45%.
              </p>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                View Details <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="border-t pt-3 space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Knowledge Sharing</Badge>
                <h4 className="font-medium text-sm">Documentation Improvements</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                21% of tickets could be avoided with better API documentation. Consider updating docs for the most referenced endpoints.
              </p>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                View Details <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Similar Ticket Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Similar Ticket Patterns
          </CardTitle>
          <CardDescription>
            AI-detected groups of related tickets that might have common root causes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Authentication Issues</h4>
                <Badge variant="outline">8 tickets</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card className="shadow-sm">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-red-500">High</Badge>
                      <span className="text-xs text-muted-foreground">May 6</span>
                    </div>
                    <h5 className="font-medium text-sm">TICKET-1042</h5>
                    <p className="text-xs text-muted-foreground">API authentication failure in production</p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-red-500">High</Badge>
                      <span className="text-xs text-muted-foreground">May 2</span>
                    </div>
                    <h5 className="font-medium text-sm">TICKET-1032</h5>
                    <p className="text-xs text-muted-foreground">Login service outage affecting users</p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-amber-500">Medium</Badge>
                      <span className="text-xs text-muted-foreground">Apr 28</span>
                    </div>
                    <h5 className="font-medium text-sm">TICKET-1021</h5>
                    <p className="text-xs text-muted-foreground">OAuth token validation failing</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">AI Analysis:</span> 87% of these issues are related to the recent certificate rotation
                </p>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </div>
            
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Dashboard Performance</h4>
                <Badge variant="outline">5 tickets</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card className="shadow-sm">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-amber-500">Medium</Badge>
                      <span className="text-xs text-muted-foreground">May 5</span>
                    </div>
                    <h5 className="font-medium text-sm">TICKET-1039</h5>
                    <p className="text-xs text-muted-foreground">Dashboard loading slowly for users</p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-amber-500">Medium</Badge>
                      <span className="text-xs text-muted-foreground">May 1</span>
                    </div>
                    <h5 className="font-medium text-sm">TICKET-1029</h5>
                    <p className="text-xs text-muted-foreground">Dashboard data not refreshing</p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-emerald-500">Low</Badge>
                      <span className="text-xs text-muted-foreground">Apr 25</span>
                    </div>
                    <h5 className="font-medium text-sm">TICKET-1018</h5>
                    <p className="text-xs text-muted-foreground">Chart rendering issues on dashboard</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">AI Analysis:</span> Query optimization could resolve 92% of these issues
                </p>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
