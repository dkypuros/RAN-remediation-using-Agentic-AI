'use client';

import * as React from "react";

interface TimelineProps {
  children: React.ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="space-y-8">
      {children}
    </div>
  );
}

interface TimelineItemProps {
  title: string;
  time: string;
  description: string;
  type: 'error' | 'warning' | 'info';
}

export function TimelineItem({ title, time, description, type }: TimelineItemProps) {
  const dotColor = 
    type === 'error' ? 'bg-red-500' :
    type === 'warning' ? 'bg-yellow-500' : 
    'bg-blue-500';

  return (
    <div className="flex items-center space-x-4">
      <div className={`w-2 h-2 rounded-full ${dotColor}`} />
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium">{title}</span>
          <span className="text-sm text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
