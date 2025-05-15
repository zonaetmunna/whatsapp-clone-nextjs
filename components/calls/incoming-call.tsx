"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, Video } from "lucide-react"

interface IncomingCallProps {
  name: string
  avatar: string
  type: "audio" | "video"
  onAccept: () => void
  onDecline: () => void
}

export function IncomingCall({ name, avatar, type, onAccept, onDecline }: IncomingCallProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center">
      <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-white mb-2">Incoming {type} call</h2>
        <Avatar className="h-24 w-24 my-6">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="text-3xl">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-2xl font-bold text-white mb-8">{name}</h3>

        <div className="flex justify-center space-x-8 w-full">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-red-600 hover:bg-red-700 text-white h-16 w-16"
            onClick={onDecline}
          >
            <Phone className="h-8 w-8 rotate-135" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-green-600 hover:bg-green-700 text-white h-16 w-16"
            onClick={onAccept}
          >
            {type === "video" ? <Video className="h-8 w-8" /> : <Phone className="h-8 w-8" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
