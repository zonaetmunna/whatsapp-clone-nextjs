"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceMessageProps {
  duration: number
  sender: "me" | "them"
}

export function VoiceMessage({ duration, sender }: VoiceMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [waveform] = useState(() => Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 5))
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            clearInterval(intervalRef.current as NodeJS.Timeout)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = (currentTime / duration) * 100

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 rounded-full", sender === "me" ? "bg-green-600/20" : "bg-gray-200 dark:bg-gray-700")}
        onClick={togglePlayback}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        ) : (
          <Play className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        )}
      </Button>

      <div className="flex-1">
        <div className="flex items-center h-6 space-x-[2px]">
          {waveform.map((height, index) => (
            <div
              key={index}
              className={cn(
                "w-1 rounded-full",
                (index / waveform.length) * 100 <= progress
                  ? sender === "me"
                    ? "bg-green-600"
                    : "bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-600",
              )}
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 min-w-[40px]">
        {isPlaying ? formatTime(currentTime) : formatTime(duration)}
      </div>
    </div>
  )
}
