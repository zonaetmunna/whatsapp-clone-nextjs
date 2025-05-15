"use client"

import { useEffect, useRef, useState } from "react"
import { Check, CheckCheck, Clock, File } from "lucide-react"
import { cn, formatMessageTime } from "@/lib/utils"
import type { Message } from "@/lib/types"
import { VoiceMessage } from "@/components/chat/voice-message"
import { LocationMessage } from "@/components/chat/location-message"
import { ContactMessage } from "@/components/chat/contact-message"

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(Math.random() > 0.7)
    }, 3000)

    return () => clearTimeout(typingTimeout)
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#e5ded8] dark:bg-gray-900">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[70%] rounded-lg p-3",
                message.sender === "me" ? "bg-[#d9fdd3] dark:bg-green-800" : "bg-white dark:bg-gray-800",
              )}
            >
              {message.type === "text" && <p className="text-gray-800 dark:text-gray-200">{message.content}</p>}

              {message.type === "image" && (
                <div className="space-y-2">
                  <img
                    src={message.content || "/placeholder.svg"}
                    alt="Shared image"
                    className="rounded-md max-w-full"
                  />
                  {message.caption && <p className="text-gray-800 dark:text-gray-200">{message.caption}</p>}
                </div>
              )}

              {message.type === "file" && (
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <File className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{message.fileName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{message.fileSize}</p>
                  </div>
                </div>
              )}

              {message.type === "voice" && <VoiceMessage duration={message.duration || 0} sender={message.sender} />}

              {message.type === "location" && message.location && (
                <LocationMessage location={message.location} sender={message.sender} />
              )}

              {message.type === "contact" && message.contact && (
                <ContactMessage contact={message.contact} sender={message.sender} />
              )}

              <div className="flex items-center justify-end mt-1 space-x-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatMessageTime(new Date(message.timestamp))}
                </span>

                {message.sender === "me" && (
                  <span>
                    {message.status === "sending" && <Clock className="h-3 w-3 text-gray-400" />}
                    {message.status === "sent" && <Check className="h-3 w-3 text-gray-400" />}
                    {message.status === "delivered" && <CheckCheck className="h-3 w-3 text-gray-400" />}
                    {message.status === "read" && <CheckCheck className="h-3 w-3 text-blue-500" />}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="flex space-x-1">
                <span
                  className="animate-bounce h-2 w-2 bg-gray-400 rounded-full"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="animate-bounce h-2 w-2 bg-gray-400 rounded-full"
                  style={{ animationDelay: "300ms" }}
                ></span>
                <span
                  className="animate-bounce h-2 w-2 bg-gray-400 rounded-full"
                  style={{ animationDelay: "600ms" }}
                ></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
