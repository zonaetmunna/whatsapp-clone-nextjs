"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "@/lib/utils"
import { dummyStatuses } from "@/lib/dummy-data"
import { StatusView } from "@/components/status/status-view"
import { useState } from "react"

export function StatusList() {
  const [viewingStatus, setViewingStatus] = useState<string | null>(null)

  const currentStatus = viewingStatus ? dummyStatuses.find((status) => status.id === viewingStatus) : null

  return (
    <>
      <div className="p-4">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recent updates</h2>
        <div className="space-y-1">
          {dummyStatuses.map((status) => (
            <div
              key={status.id}
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => setViewingStatus(status.id)}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-2 border-green-500"></div>
                <Avatar>
                  <AvatarImage src={status.avatar} alt={status.name} />
                  <AvatarFallback>{status.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{status.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(status.timestamp))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Viewed updates</h2>
        <div className="space-y-1">
          {dummyStatuses.slice(3, 6).map((status) => (
            <div
              key={status.id}
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => setViewingStatus(status.id)}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-2 border-gray-400"></div>
                <Avatar>
                  <AvatarImage src={status.avatar} alt={status.name} />
                  <AvatarFallback>{status.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{status.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(status.timestamp))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentStatus && <StatusView status={currentStatus} onClose={() => setViewingStatus(null)} />}
    </>
  )
}
