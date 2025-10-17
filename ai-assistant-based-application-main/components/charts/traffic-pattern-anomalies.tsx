"use client";

import { useEffect, useState } from "react";
import ticketData from "@/data/jira-tickets.json";

interface TicketTrend {
  ticketId: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  created: string;
  labels: string[];
}

const typedTickets = ticketData.tickets as TicketTrend[];

function getRandomTicket(): TicketTrend {
  return typedTickets[Math.floor(Math.random() * typedTickets.length)];
}

export function TicketActivity() {
  const [currentTicket, setCurrentTicket] = useState<TicketTrend>(getRandomTicket());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTicket(getRandomTicket());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'text-red-500';
      case 'in progress':
        return 'text-yellow-500';
      case 'resolved':
        return 'text-green-500';
      case 'closed':
        return 'text-gray-500';
      default:
        return 'text-blue-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Ticket Activity</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Ticket ID:</span>
          <span className="font-mono text-sm">{currentTicket.ticketId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Title:</span>
          <span className="text-sm font-medium max-w-[200px] truncate">{currentTicket.title}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
          <span className={`text-sm font-medium ${getStatusColor(currentTicket.status)}`}>
            {currentTicket.status}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Priority:</span>
          <span className={`text-sm font-medium ${getPriorityColor(currentTicket.priority)}`}>
            {currentTicket.priority}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Assignee:</span>
          <span className="text-sm">{currentTicket.assignee}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Labels:</span>
          <div className="flex gap-1 flex-wrap max-w-[200px]">
            {currentTicket.labels.slice(0, 2).map((label, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
              >
                {label}
              </span>
            ))}
            {currentTicket.labels.length > 2 && (
              <span className="text-xs text-gray-500">+{currentTicket.labels.length - 2}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Keep the old export for backward compatibility during transition
export const TrafficPatternAnomalies = TicketActivity;
