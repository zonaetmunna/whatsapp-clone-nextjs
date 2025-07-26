"use client";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { dummyChats, dummyMessages } from "@/lib/dummy-data";
import type { Message } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();

  const chatId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";

  const [chat, setChat] = useState(() => dummyChats.find((c) => c.id === chatId) || null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load chat and messages when chatId changes
  useEffect(() => {
    if (!chatId) return;

    const foundChat = dummyChats.find((c) => c.id === chatId);
    if (!foundChat) {
      router.push("/chats");
      return;
    }

    setChat(foundChat);
    setMessages(dummyMessages[chatId] || []);
  }, [chatId, router]);

  // Handle sending new messages
  const handleSendMessage = (
    content: string,
    type: "text" | "image" | "file" | "voice" | "location" | "contact"
  ) => {
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      sender: "me",
      content,
      timestamp: new Date().toISOString(),
      status: "sending",
      type,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate message progression
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      );

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        );

        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newMessage.id ? { ...msg, status: "read" } : msg
            )
          );
        }, 2000);
      }, 1000);
    }, 1000);
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader chat={chat} />
      <ChatMessages messages={messages} />
      <ChatInput chatId={chatId} onSendMessage={handleSendMessage} />
    </div>
  );
}
