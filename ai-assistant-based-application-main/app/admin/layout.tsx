'use client';

import "../globals.css";

import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { RightSidebar } from "@/components/right-sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex">
          <div className="flex-1 overflow-y-auto pr-[60px]">
            {children}
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
