"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "@/lib/utils"
import { Check, CheckCheck } from "lucide-react"
import type { Chat } from "@/lib/types"

interface ChatListProps {
  chats: Chat[]
  currentChatId?: string
}

export function ChatList({ chats, currentChatId }: ChatListProps) {
  return (
    <div className="overflow-y-auto">
      {chats.map((chat) => (
        <Link
          key={chat.id}
          href={`/chats/${chat.id}`}
          className={`flex items-center p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-[#f0f2f5] dark:hover:bg-gray-800 ${
            currentChatId === chat.id ? "bg-[#f0f2f5] dark:bg-gray-800" : ""
          }`}
        >
          <div className="relative">
            <Avatar>
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {chat.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
            )}
          </div>
          <div className="ml-3 flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{chat.name}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {formatDistanceToNow(new Date(chat.lastMessageTime))}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 truncate">
                {chat.lastMessageSender === "me" && (
                  <span className="mr-1">
                    {chat.lastMessageStatus === "sent" && <Check className="h-3 w-3 inline" />}
                    {chat.lastMessageStatus === "delivered" && <CheckCheck className="h-3 w-3 inline" />}
                    {chat.lastMessageStatus === "read" && <CheckCheck className="h-3 w-3 inline text-blue-500" />}
                  </span>
                )}
                <span className="truncate">{chat.lastMessage}</span>
              </div>
              {chat.unreadCount > 0 && (
                <Badge
                  variant="default"
                  className="bg-green-500 hover:bg-green-600 rounded-full px-[6px] py-[2px] min-w-[20px] flex items-center justify-center"
                >
                  {chat.unreadCount}
                </Badge>
              )}
              {chat.isMuted && (
                <span className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </svg>
                </span>
              )}
              {chat.isPinned && (
                <span className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="17" x2="12" y2="22"></line>
                    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
                  </svg>
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
