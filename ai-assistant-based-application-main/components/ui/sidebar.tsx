"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { create } from 'zustand';
import { Badge } from "@/components/ui/badge";

import {
  BarChart3,
  Ticket,
  TicketCheck,
  Search,
  Clock,
  Brain,
  Workflow,
  GitBranch,
  Home,
  Bot,
  Users,
  MessageSquare,
  History,
  Sparkles,
  Kanban,
  Settings
} from "lucide-react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SidebarStore {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  expand: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isCollapsed: false,
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  expand: () => set({ isCollapsed: false }),
}));

export const sidebarItems = [
  {
    title: "Welcome",
    href: "/admin/welcome",
    icon: <Home className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <BarChart3 className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    title: "My Tickets",
    href: "/admin/my-tickets",
    icon: <Ticket className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    title: "Create Ticket",
    href: "/admin/create-ticket",
    icon: <TicketCheck className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    title: "Search Tickets",
    href: "/admin/search-tickets",
    icon: <Search className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    title: "Ticket History",
    href: "/admin/ticket-history",
    icon: <History className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    title: "Kanban Board",
    href: "/admin/kanban-board",
    icon: <Kanban className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    title: "AI Insights",
    href: "/admin/ai-insights",
    icon: <Sparkles className="h-4 w-4" strokeWidth={1.5} />,
  }
];

export const bottomSidebarItems = [
  {
    title: "Team Members",
    href: "/admin/team-members",
    icon: <Users className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    title: "AI Assistant",
    href: "/admin/ai-assistant",
    icon: <Brain className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-4 w-4" strokeWidth={1.5} />,
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, expand } = useSidebarStore();

  return (
    <aside className={`border-r bg-muted/40 h-full transition-all duration-300 ${isCollapsed ? 'w-[60px]' : 'w-[240px]'}`}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className={`flex h-[60px] items-center ${isCollapsed ? 'justify-center' : 'px-6'} border-b`}>
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Ticket className="h-6 w-6" strokeWidth={1.5} />
            {!isCollapsed && (
              <span>AI Ticket Assistant</span>
            )}
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <nav className="grid items-start text-sm font-medium">
            {sidebarItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={expand}
                className={`flex items-center gap-3 px-4 py-4 text-muted-foreground transition-all hover:text-primary hover:bg-accent/50 ${
                  pathname === item.href ? "bg-accent text-primary" : ""
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                {item.icon && React.cloneElement(item.icon, { className: 'h-5 w-5', strokeWidth: 1.5 })}
                {!isCollapsed && item.title}
              </Link>
            ))}
          </nav>
          <div>
            <div className="mx-4 my-2 border-t border-border" />
            <nav className="grid items-start text-sm font-medium">
              {bottomSidebarItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={expand}
                  className={`flex items-center gap-3 px-4 py-4 text-muted-foreground transition-all hover:text-primary hover:bg-accent/50 ${
                    pathname === item.href ? "bg-accent text-primary" : ""
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  {item.icon && React.cloneElement(item.icon, { className: 'h-5 w-5', strokeWidth: 1.5 })}
                  {!isCollapsed && item.title}
                  {item.href === "/admin/ai-agents" && (
                    <Badge 
                      className="ml-auto text-[10px] font-medium uppercase bg-emerald-500 hover:bg-emerald-600 text-white px-1.5 py-0.5 rounded"
                    >
                      New
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
