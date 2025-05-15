"use client"

import type React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import { SettingsSidebar } from "@/components/settings/settings-sidebar"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col">
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          <SettingsSidebar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  )
}
