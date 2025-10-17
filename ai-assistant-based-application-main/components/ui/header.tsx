import React from "react";
import { MobileNav } from "@/components/ui/mobile-nav";
import { CircleUser, PanelLeftClose } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";
import { useSidebarStore } from "./sidebar";

export default function Header() {
  const { toggleCollapse } = useSidebarStore();

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[68px] lg:px-6">
      <MobileNav />
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleCollapse}
        className="hidden md:flex p-3 h-[56px] w-[56px]"
      >
        <PanelLeftClose className="h-10 w-10" strokeWidth={1.5} />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="flex-1" />
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
