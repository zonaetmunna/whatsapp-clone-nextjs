"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  MoreVertical,
  Volume2,
  Monitor,
  RotateCcw,
  MessageSquare,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ActiveCallProps {
  name: string
  avatar: string
  type: "audio" | "video"
  onEndCall: () => void
}

export function ActiveCall({ name, avatar, type, onEndCall }: ActiveCallProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  // Timer for call duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
      {type === "video" ? (
        // Video call layout
        <div className="relative flex-1 bg-black">
          {/* Main video (other person) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isVideoOff ? (
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-4xl">{name.charAt(0)}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-full h-full bg-gray-800">
                {/* This would be the video stream in a real app */}
                <div className="flex items-center justify-center h-full">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback className="text-4xl">{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            )}
          </div>

          {/* Self view (picture-in-picture) */}
          <div className="absolute top-4 right-4 w-32 h-48 bg-gray-700 rounded-lg overflow-hidden border-2 border-white">
            {/* This would be your own video stream in a real app */}
            <div className="flex items-center justify-center h-full">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Call info overlay */}
          <div className="absolute top-4 left-4 text-white">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p>{formatDuration(callDuration)}</p>
          </div>
        </div>
      ) : (
        // Audio call layout
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-green-800 to-green-900">
          <Avatar className="h-40 w-40 mb-8">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-6xl">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold text-white mb-2">{name}</h2>
          <p className="text-white/80 mb-8">{formatDuration(callDuration)}</p>
          <p className="text-white/60 mb-4">{isMuted ? "Your microphone is muted" : "Call in progress"}</p>
        </div>
      )}

      {/* Call controls */}
      <div className="bg-gray-900 p-6 flex justify-center space-x-6">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-gray-800 hover:bg-gray-700 text-white h-14 w-14"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        {type === "video" && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-800 hover:bg-gray-700 text-white h-14 w-14"
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
          </Button>
        )}

        <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-gray-700 text-white h-14 w-14">
          <Volume2 className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-red-600 hover:bg-red-700 text-white h-14 w-14"
          onClick={onEndCall}
        >
          <Phone className="h-6 w-6 rotate-135" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-800 hover:bg-gray-700 text-white h-14 w-14"
            >
              <MoreVertical className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Monitor className="h-4 w-4 mr-2" />
              <span>Switch to desktop</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RotateCcw className="h-4 w-4 mr-2" />
              <span>Flip camera</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>Open chat</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
