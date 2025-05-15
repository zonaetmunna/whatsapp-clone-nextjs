"use client"

import { CallHistory } from "@/components/calls/call-history"
import { CallTabs } from "@/components/calls/call-tabs"

export default function CallsPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900 md:block hidden">
      <div className="p-4 bg-[#f0f2f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Calls</h1>
      </div>
      <CallTabs />
      <CallHistory />
    </div>
  )
}
