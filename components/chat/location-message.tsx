"use client"

import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LocationMessageProps {
  location: {
    latitude: number
    longitude: number
    name?: string
  }
  sender: "me" | "them"
}

export function LocationMessage({ location, sender }: LocationMessageProps) {
  const openInMaps = () => {
    window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, "_blank")
  }

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative w-full h-[150px] rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700",
          "flex items-center justify-center",
        )}
        onClick={openInMaps}
      >
        {/* This would be a real map in a production app */}
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 opacity-80"></div>
        <MapPin className="h-10 w-10 text-red-500 z-10" />

        {/* Fake map pin location */}
        <div className="absolute w-4 h-4 bg-red-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute w-8 h-8 bg-red-500 rounded-full opacity-30 animate-ping top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {location.name && <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{location.name}</p>}

      <Button variant="outline" size="sm" className="w-full text-blue-600 dark:text-blue-400" onClick={openInMaps}>
        Open in Maps
      </Button>
    </div>
  )
}
