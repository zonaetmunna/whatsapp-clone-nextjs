"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Smile, Paperclip, Mic, Send, ImageIcon as Image, MapPin, User, VoteIcon as Poll } from "lucide-react"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { VoiceRecorder } from "@/components/chat/voice-recorder"
import { PollCreator } from "@/components/chat/poll-creator"

interface ChatInputProps {
  chatId: string
  onSendMessage: (content: string, type: "text" | "image" | "file" | "voice" | "location" | "contact") => void
}

export function ChatInput({ chatId, onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showAttachments, setShowAttachments] = useState(false)
  const [showPollCreator, setShowPollCreator] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSendMessage = () => {
    if (!message.trim()) return

    onSendMessage(message, "text")
    setMessage("")
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + emoji.native)
    textareaRef.current?.focus()
  }

  const handleAttachment = (type: string) => {
    setShowAttachments(false)

    switch (type) {
      case "Document":
        // In a real app, this would open a file picker
        onSendMessage("document.pdf", "file")
        break
      case "Photo":
        // In a real app, this would open an image picker
        onSendMessage("/placeholder.svg?height=300&width=400", "image")
        break
      case "Location":
        // In a real app, this would get the current location
        onSendMessage("", "location")
        break
      case "Contact":
        // In a real app, this would open the contacts list
        onSendMessage("", "contact")
        break
      case "Poll":
        setShowPollCreator(true)
        break
      default:
        break
    }
  }

  const handleMicToggle = () => {
    setIsRecording(!isRecording)
  }

  const handleVoiceMessage = (duration: number) => {
    setIsRecording(false)
    onSendMessage("", "voice")
  }

  const handlePollSubmit = (poll: { question: string; options: string[]; allowMultipleAnswers: boolean }) => {
    setShowPollCreator(false)
    // In a real app, this would create a poll message
    onSendMessage(poll.question, "text")
  }

  return (
    <>
      <div className="p-3 bg-[#f0f2f5] dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {isRecording ? (
          <VoiceRecorder onCancel={() => setIsRecording(false)} onSend={handleVoiceMessage} />
        ) : (
          <div className="flex items-end space-x-2">
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Smile className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none" side="top">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" set="apple" />
                </PopoverContent>
              </Popover>

              <Popover open={showAttachments} onOpenChange={setShowAttachments}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" side="top">
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center p-3 h-auto space-y-1"
                      onClick={() => handleAttachment("Document")}
                    >
                      <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                        <Paperclip className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-xs">Document</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="flex flex-col items-center p-3 h-auto space-y-1"
                      onClick={() => handleAttachment("Photo")}
                    >
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <Image className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-xs">Photo</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="flex flex-col items-center p-3 h-auto space-y-1"
                      onClick={() => handleAttachment("Location")}
                    >
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-xs">Location</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="flex flex-col items-center p-3 h-auto space-y-1"
                      onClick={() => handleAttachment("Contact")}
                    >
                      <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                        <User className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <span className="text-xs">Contact</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="flex flex-col items-center p-3 h-auto space-y-1"
                      onClick={() => handleAttachment("Poll")}
                    >
                      <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                        <Poll className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-xs">Poll</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                placeholder="Type a message"
                className="min-h-[40px] max-h-[120px] resize-none border-0 focus-visible:ring-0 bg-white dark:bg-gray-700"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={message.trim() ? handleSendMessage : handleMicToggle}
            >
              {message.trim() ? (
                <Send className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Mic className={`h-5 w-5 ${isRecording ? "text-red-500" : "text-gray-600 dark:text-gray-400"}`} />
              )}
            </Button>
          </div>
        )}
      </div>

      {showPollCreator && <PollCreator onClose={() => setShowPollCreator(false)} onSend={handlePollSubmit} />}
    </>
  )
}
