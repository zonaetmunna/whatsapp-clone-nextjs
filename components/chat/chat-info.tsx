"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { X, Bell, VolumeX, BlocksIcon as Block, ThumbsDown, Trash2 } from "lucide-react"
import type { Chat } from "@/lib/types"

interface ChatInfoProps {
  chat: Chat
  onClose: () => void
}

export function ChatInfo({ chat, onClose }: ChatInfoProps) {
  const [muted, setMuted] = useState(chat.isMuted)

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-[400px] bg-white dark:bg-gray-900 h-full overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#008069] dark:bg-green-800 text-white">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <X className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold">Contact Info</h2>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        <div className="p-6 bg-white dark:bg-gray-900">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback className="text-4xl">{chat.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{chat.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {chat.isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">About</h4>
              <p className="text-gray-900 dark:text-gray-100">{chat.about || "Hey there! I am using WhatsApp."}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Media, links, and docs</h4>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
              <Button variant="ghost" className="w-full justify-start text-blue-600 dark:text-blue-400 p-0">
                View all
              </Button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                  <span className="text-gray-900 dark:text-gray-100">Mute notifications</span>
                </div>
                <Switch checked={muted} onCheckedChange={setMuted} />
              </div>

              <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <VolumeX className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <span className="text-gray-900 dark:text-gray-100">Custom notifications</span>
              </div>

              <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="h-5 w-5 mr-4 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400 text-lg">🔍</span>
                </div>
                <span className="text-gray-900 dark:text-gray-100">Media visibility</span>
              </div>
            </div>

            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 dark:text-red-400 p-4 bg-white dark:bg-gray-800 rounded-lg"
              >
                <Block className="h-5 w-5 mr-4" />
                Block {chat.name}
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 dark:text-red-400 p-4 bg-white dark:bg-gray-800 rounded-lg"
              >
                <ThumbsDown className="h-5 w-5 mr-4" />
                Report {chat.name}
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 dark:text-red-400 p-4 bg-white dark:bg-gray-800 rounded-lg"
              >
                <Trash2 className="h-5 w-5 mr-4" />
                Delete chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
