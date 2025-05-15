"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Phone, Video, MoreVertical, VolumeX, Pin, Archive, Trash2 } from "lucide-react"
import type { Chat } from "@/lib/types"
import { ChatInfo } from "@/components/chat/chat-info"
import { ActiveCall } from "@/components/calls/active-call"

interface ChatHeaderProps {
  chat: Chat
}

export function ChatHeader({ chat }: ChatHeaderProps) {
  const router = useRouter()
  const [showInfo, setShowInfo] = useState(false)
  const [activeCall, setActiveCall] = useState<"audio" | "video" | null>(null)

  const handleCall = (type: "audio" | "video") => {
    setActiveCall(type)
  }

  return (
    <>
      <div className="flex justify-between items-center p-3 bg-[#f0f2f5] dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
        <div className="flex items-center cursor-pointer" onClick={() => setShowInfo(true)}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">{chat.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {chat.isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => handleCall("audio")}>
            <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => handleCall("video")}>
            <Video className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowInfo(true)}>Contact info</DropdownMenuItem>
              <DropdownMenuItem>Select messages</DropdownMenuItem>
              <DropdownMenuItem>
                <VolumeX className="h-4 w-4 mr-2" />
                Mute notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pin className="h-4 w-4 mr-2" />
                Pin chat
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Archive className="h-4 w-4 mr-2" />
                Archive chat
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showInfo && <ChatInfo chat={chat} onClose={() => setShowInfo(false)} />}

      {activeCall && (
        <ActiveCall name={chat.name} avatar={chat.avatar} type={activeCall} onEndCall={() => setActiveCall(null)} />
      )}
    </>
  )
}
