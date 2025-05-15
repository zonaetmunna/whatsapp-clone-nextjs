"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, Camera, Edit } from "lucide-react"

export function StatusCreate() {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Your status" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-2 -bottom-2 h-6 w-6 rounded-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">My Status</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Tap to add status update</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Camera className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Edit className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  )
}
