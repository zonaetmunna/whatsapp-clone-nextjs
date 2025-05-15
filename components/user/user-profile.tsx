"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Camera, Check } from "lucide-react"

interface UserProfileProps {
  onClose: () => void
}

export function UserProfile({ onClose }: UserProfileProps) {
  const [name, setName] = useState("John Doe")
  const [about, setAbout] = useState("Hey there! I am using WhatsApp.")
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingAbout, setIsEditingAbout] = useState(false)

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-start">
      <div className="w-[380px] bg-white dark:bg-gray-900 h-full overflow-y-auto animate-slide-in-left">
        <div className="sticky top-0 z-10 flex items-center p-4 bg-[#008069] dark:bg-green-800 text-white">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <X className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold ml-4">Profile</h2>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900">
          <div className="flex flex-col items-center mb-6 relative">
            <div className="group relative">
              <Avatar className="h-40 w-40 mb-4">
                <AvatarImage src="/placeholder.svg?height=160&width=160" alt="User" />
                <AvatarFallback className="text-6xl">J</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Your Name</h4>

              {isEditingName ? (
                <div className="flex items-center">
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="flex-1" autoFocus />
                  <Button variant="ghost" size="icon" onClick={() => setIsEditingName(false)} className="ml-2">
                    <Check className="h-5 w-5 text-green-600" />
                  </Button>
                </div>
              ) : (
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsEditingName(true)}
                >
                  <p className="text-gray-900 dark:text-gray-100">{name}</p>
                  <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                    Edit
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">About</h4>
              </div>

              {isEditingAbout ? (
                <div className="flex items-center">
                  <Textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="flex-1 resize-none"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditingAbout(false)}
                    className="ml-2 self-start mt-2"
                  >
                    <Check className="h-5 w-5 text-green-600" />
                  </Button>
                </div>
              ) : (
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsEditingAbout(true)}
                >
                  <p className="text-gray-900 dark:text-gray-100">{about}</p>
                  <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
