'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Placeholder components until the real components are implemented
const AIPacketQuestionsBadge = ({ type }: { type: string }) => (
  <span className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
    {type}
  </span>
);

const AIPacketQuestionsProcessor = ({ batchSize }: { batchSize: number }) => (
  <Card>
    <CardHeader>
      <CardTitle>AI Packet Questions Processor</CardTitle>
      <CardDescription>This is a placeholder for the AI Packet Questions Processor component</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Processing batch size: {batchSize}</p>
    </CardContent>
  </Card>
);

export default function AIPacketQuestionsPage() {
  const batchSize = 5;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-3xl font-bold tracking-tight">AI Packet Questions</h2>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <AIPacketQuestionsProcessor batchSize={batchSize} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Packet Analysis</CardTitle>
          <CardDescription>Ask questions about network packets and get AI-powered insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              This tool allows you to analyze network packets using AI. You can ask questions about:
            </p>
            
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <div className="flex items-center space-x-2">
                  <AIPacketQuestionsBadge type="ticket-search" />
                  Find similar tickets and past resolutions
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-2">
                  <AIPacketQuestionsBadge type="ticket-creation" />
                  Create optimized tickets with AI suggestions
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-2">
                  <AIPacketQuestionsBadge type="ticket-analysis" />
                  Analyze ticket patterns and trends
                </div>
              </li>
              <li>Baseline expectations for different protocols</li>
              <li>Potential vulnerabilities indicated by packet headers</li>
            </ul>
            
            <p className="mt-4">
              The AI model processes batches of packets to provide comprehensive analysis of network traffic patterns, security threats, and protocol characteristics.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">How to use</p>
                <p className="text-sm">
                  1. Click "Ask Question" to generate a random question<br />
                  2. The AI will analyze a sample of network packets<br />
                  3. View the AI's response in the analysis section
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Sample questions</p>
                <p className="text-sm">
                  • What ICS protocols are showing critical status?<br />
                  • Are there any malformed CIP packets?<br />
                  • Are there any high severity traffic anomalies?
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
