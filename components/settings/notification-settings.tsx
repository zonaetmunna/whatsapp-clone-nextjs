"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, Bell, Volume2, Palette } from "lucide-react"

export function NotificationSettings() {
  const router = useRouter()
  const [conversationTones, setConversationTones] = useState(true)
  const [messageNotifications, setMessageNotifications] = useState(true)
  const [groupNotifications, setGroupNotifications] = useState(true)
  const [callNotifications, setCallNotifications] = useState(true)

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#f0f2f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 ml-4">Notifications</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Message Notifications</h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Show notifications</h3>
                </div>
              </div>
              <Switch checked={messageNotifications} onCheckedChange={setMessageNotifications} />
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Sound</h3>
                </div>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Group Notifications</h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Show notifications</h3>
                </div>
              </div>
              <Switch checked={groupNotifications} onCheckedChange={setGroupNotifications} />
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Sound</h3>
                </div>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Call Notifications</h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Show notifications</h3>
                </div>
              </div>
              <Switch checked={callNotifications} onCheckedChange={setCallNotifications} />
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Ringtone</h3>
                </div>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Other</h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Conversation tones</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Play sounds for sent and received messages</p>
                </div>
              </div>
              <Switch checked={conversationTones} onCheckedChange={setConversationTones} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
