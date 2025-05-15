"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, ChevronLeft, ChevronRight, Send } from "lucide-react"
import { formatDistanceToNow } from "@/lib/utils"
import type { Status } from "@/lib/types"

interface StatusViewProps {
  status: Status
  onClose: () => void
}

export function StatusView({ status, onClose }: StatusViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [reply, setReply] = useState("")

  // Auto-progress through status items
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next status item
          if (currentIndex < status.items.length - 1) {
            setCurrentIndex((prev) => prev + 1)
            return 0
          } else {
            // Close status view when all items are viewed
            clearInterval(timer)
            setTimeout(onClose, 500)
            return 100
          }
        }
        return prev + 1
      })
    }, 50) // 5 seconds per status (100 * 50ms)

    return () => clearInterval(timer)
  }, [currentIndex, status.items.length, onClose])

  const currentItem = status.items[currentIndex]

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setProgress(0)
    }
  }

  const handleNext = () => {
    if (currentIndex < status.items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setProgress(0)
    } else {
      onClose()
    }
  }

  const handleSendReply = () => {
    if (reply.trim()) {
      // In a real app, this would send the reply
      console.log("Replying to status:", reply)
      setReply("")
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 flex space-x-1 p-2 z-10">
        {status.items.map((_, index) => (
          <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            {index === currentIndex && <div className="h-full bg-white" style={{ width: `${progress}%` }} />}
            {index < currentIndex && <div className="h-full bg-white w-full" />}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center z-10">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
          <X className="h-6 w-6" />
        </Button>
        <div className="flex items-center ml-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={status.avatar} alt={status.name} />
            <AvatarFallback>{status.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-3 text-white">
            <h3 className="font-medium">{status.name}</h3>
            <p className="text-xs opacity-80">{formatDistanceToNow(new Date(status.timestamp))}</p>
          </div>
        </div>
      </div>

      {/* Status content */}
      <div className="flex-1 flex items-center justify-center">
        {currentItem.type === "text" ? (
          <div
            className="p-6 max-w-lg text-center text-white text-xl font-medium"
            style={{ backgroundColor: currentItem.backgroundColor || "#075E54" }}
          >
            {currentItem.content}
          </div>
        ) : (
          <img
            src={currentItem.content || "/placeholder.svg"}
            alt="Status"
            className="max-h-full max-w-full object-contain"
          />
        )}
      </div>

      {/* Navigation controls */}
      <Button
        variant="ghost"
        className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-1/4 opacity-0"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-8 w-8 text-white opacity-50" />
      </Button>

      <Button
        variant="ghost"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1/4 opacity-0"
        onClick={handleNext}
      >
        <ChevronRight className="h-8 w-8 text-white opacity-50" />
      </Button>

      {/* Reply input */}
      <div className="p-4 bg-black/50">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2">
          <Input
            placeholder="Reply to status..."
            className="border-0 focus-visible:ring-0 bg-transparent"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button variant="ghost" size="icon" className="text-green-600" onClick={handleSendReply}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
