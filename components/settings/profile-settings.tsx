"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Camera, Check } from "lucide-react"

export function ProfileSettings() {
  const router = useRouter()
  const [name, setName] = useState("John Doe")
  const [about, setAbout] = useState("Hey there! I am using WhatsApp.")
  const [phone, setPhone] = useState("+1 234 567 8900")
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingAbout, setIsEditingAbout] = useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#f0f2f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 ml-4">Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center mb-8">
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
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsEditingName(true)}>
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
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsEditingAbout(true)}>
                <p className="text-gray-900 dark:text-gray-100">{about}</p>
                <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                  Edit
                </Button>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Phone Number</h4>
            <p className="text-gray-900 dark:text-gray-100">{phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
