"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessages } from "@/components/chat/chat-messages"
import { dummyChats, dummyMessages } from "@/lib/dummy-data"
import type { Message } from "@/lib/types"

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [chat, setChat] = useState(dummyChats.find((c) => c.id === params.id))
  const [messages, setMessages] = useState<Message[]>([])

  // Load chat and messages
  useEffect(() => {
    const foundChat = dummyChats.find((c) => c.id === params.id)
    if (!foundChat) {
      router.push("/chats")
      return
    }

    setChat(foundChat)
    setMessages(dummyMessages[params.id] || [])
  }, [params.id, router])

  // Handle sending new messages
  const handleSendMessage = (content: string, type: "text" | "image" | "file" | "voice" | "location" | "contact") => {
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      sender: "me",
      content,
      timestamp: new Date().toISOString(),
      status: "sending",
      type,
    }

    setMessages((prev) => [...prev, newMessage])

    // Simulate message being sent
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "sent" } : msg)))

      // Simulate message being delivered
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))

        // Simulate message being read
        setTimeout(() => {
          setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "read" } : msg)))
        }, 2000)
      }, 1000)
    }, 1000)
  }

  if (!chat) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader chat={chat} />
      <ChatMessages messages={messages} />
      <ChatInput chatId={params.id} onSendMessage={handleSendMessage} />
    </div>
  )
}
