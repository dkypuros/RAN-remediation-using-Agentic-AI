'use client';

import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { withAuth } from '@/lib/withAuth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Ticket, 
  Search,
  ArrowRight,
  Sparkles,
  Brain,
  MessageSquare,
  ShieldCheck,
  PanelLeft,
  Clock
} from "lucide-react";
import Link from "next/link";

function WelcomePage() {
  const { signOut } = useAuth();
  const handleAskAI = () => {
    const aiButton = document.querySelector('[data-ai-trigger]') as HTMLButtonElement;
    if (aiButton) {
      aiButton.click();
    }
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome to AI Ticket Assistant</h2>
          <Button 
            variant="outline" 
            onClick={() => signOut()}
            className="ml-4"
          >
            Sign Out
          </Button>
        </div>
        <p className="text-lg text-muted-foreground">
          Intelligent JIRA Ticket Management with AI-Powered Insights
        </p>
      </div>

      {/* Getting Started Section */}
      <div className="space-y-6">
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-2xl font-semibold tracking-tight text-blue-600">Getting Started</h3>
          <p className="text-muted-foreground mt-1">Follow these steps to enhance your ticket management with AI assistance</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-500" strokeWidth={1.5} />
                Step 1: Connect to JIRA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Log in with your JIRA credentials to access your organization's ticket database.</p>
              <div className="flex gap-2">
                <Button variant="default" className="bg-blue-500 hover:bg-blue-600" asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    Connect JIRA <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50" asChild>
                  <Link href="/offline" className="flex items-center gap-2">
                    Use Demo Mode
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <Ticket className="h-5 w-5 text-green-500" strokeWidth={1.5} />
                  <div className="absolute inset-0 rounded-full animate-pulse bg-green-500/20" />
                  <div className="absolute -inset-1 rounded-full animate-pulse bg-green-500/10" />
                </div>
                Step 2: Create New Tickets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Start creating new tickets with AI assistance to identify similar past issues.</p>
              <div className="text-sm text-muted-foreground space-y-2 pl-4 border-l-2 border-green-200">
                <p>• Enter ticket details in the standard form</p>
                <p>• AI automatically analyzes your ticket content</p>
                <p>• View suggested similar tickets in real-time</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-500" strokeWidth={1.5} />
                Step 3: Review Similar Tickets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Our AI analyzes your ticket and presents similar past tickets with valuable insights:</p>
              
              <div className="bg-blue-500/10 dark:bg-blue-500/5 p-4 rounded-lg border border-blue-200/20 dark:border-blue-500/20 space-y-2 backdrop-blur-sm">
                <h4 className="font-medium text-blue-900 dark:text-blue-200 flex items-center gap-2">
                  <PanelLeft className="h-4 w-4" /> Similar Ticket Features
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200/90">
                  Leverage historical knowledge to resolve issues faster:
                </p>
                <ul className="text-sm text-blue-800 dark:text-blue-200/80 space-y-1 pl-4">
                  <li>• View tickets with similar descriptions and root causes</li>
                  <li>• Access resolution steps from previous similar tickets</li>
                  <li>• See average resolution time and complexity metrics</li>
                  <li>• Identify subject matter experts who resolved similar issues</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button variant="default" className="bg-blue-500 hover:bg-blue-600" asChild>
                  <Link href="/admin/analytics" className="flex items-center gap-2">
                    View Ticket Analytics <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <Sparkles className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
                  <div className="absolute inset-0 rounded-full animate-pulse bg-amber-500/20" />
                  <div className="absolute -inset-1 rounded-full animate-pulse bg-amber-500/10" />
                </div>
                Step 4: Apply AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Leverage AI-powered recommendations to resolve tickets faster and more effectively.</p>
              
              <div className="bg-amber-500/10 dark:bg-amber-500/5 p-4 rounded-lg border border-amber-200/20 dark:border-amber-500/20 space-y-2 backdrop-blur-sm">
                <h4 className="font-medium text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  <Brain className="h-4 w-4" /> AI Assistant Capabilities
                </h4>
                <p className="text-sm text-amber-800 dark:text-amber-200/90">
                  Our AI assistant analyzes historical ticket data to provide actionable insights:
                </p>
                <ul className="text-sm text-amber-800 dark:text-amber-200/80 space-y-1 pl-4">
                  <li>• Suggested resolution steps based on similar tickets</li>
                  <li>• Estimated time to resolution predictions</li>
                  <li>• Automated categorization and priority recommendations</li>
                  <li>• Knowledge base article suggestions</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button variant="default" className="bg-amber-500 hover:bg-amber-600" asChild>
                  <Link href="/admin/ai-workflows" className="flex items-center gap-2">
                    View AI Insights <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-amber-200/30 hover:bg-amber-500/10 dark:border-amber-400/30 dark:hover:bg-amber-500/10 group"
                  onClick={handleAskAI}
                >
                  <span className="flex items-center gap-2">
                    <div className="relative">
                      <MessageSquare className="h-4 w-4 text-amber-500" strokeWidth={1.5} />
                      <div className="absolute inset-0 rounded-full animate-pulse bg-amber-500/20" />
                      <div className="absolute -inset-1 rounded-full animate-pulse bg-amber-500/10" />
                    </div>
                    Ask AI Assistant
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default withAuth(WelcomePage);
