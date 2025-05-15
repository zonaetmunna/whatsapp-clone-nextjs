"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, Video, ArrowUpRight, ArrowDownLeft, Info } from "lucide-react"
import { formatDistanceToNow } from "@/lib/utils"
import { dummyCallHistory } from "@/lib/dummy-data"

export function CallHistory() {
  const [activeTab, setActiveTab] = useState<"all" | "missed">("all")

  const filteredCalls =
    activeTab === "all" ? dummyCallHistory : dummyCallHistory.filter((call) => call.status === "missed")

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900">
        <div className="flex space-x-4">
          <Button
            variant={activeTab === "all" ? "default" : "ghost"}
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            All
          </Button>
          <Button
            variant={activeTab === "missed" ? "default" : "ghost"}
            onClick={() => setActiveTab("missed")}
            className={activeTab === "missed" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Missed
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Button>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {filteredCalls.map((call) => (
          <div key={call.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={call.avatar} alt={call.name} />
                <AvatarFallback>{call.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{call.name}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  {call.direction === "outgoing" ? (
                    <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                  ) : (
                    <ArrowDownLeft
                      className={`h-4 w-4 mr-1 ${call.status === "missed" ? "text-red-500" : "text-green-500"}`}
                    />
                  )}
                  <span>{formatDistanceToNow(new Date(call.timestamp))}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full text-green-600">
                {call.type === "video" ? <Video className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Info className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
