"use client"

import type React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import { ChatSidebar } from "@/components/chat/chat-sidebar"

export default function CommunitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col">
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          <ChatSidebar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  )
}
