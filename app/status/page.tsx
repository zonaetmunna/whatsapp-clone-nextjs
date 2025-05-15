"use client"

import { StatusList } from "@/components/status/status-list"
import { StatusCreate } from "@/components/status/status-create"

export default function StatusPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900 md:block hidden">
      <div className="p-4 bg-[#f0f2f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Status</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <StatusCreate />
        <StatusList />
      </div>
    </div>
  )
}
