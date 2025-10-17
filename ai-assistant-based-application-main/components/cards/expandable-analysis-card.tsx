'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExpandableAnalysisCardProps {
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function ExpandableAnalysisCard({ 
  title, 
  description, 
  children,
  className 
}: ExpandableAnalysisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6">
        <div className="space-y-1.5">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className={`${isExpanded ? 'h-auto' : 'h-[40vh]'} transition-all duration-300 overflow-hidden`}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
