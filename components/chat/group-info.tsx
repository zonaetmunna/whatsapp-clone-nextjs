"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { X, Bell, VolumeX, ThumbsDown, Trash2, Search, UserPlus, Camera, Check, Users } from "lucide-react"
import type { Chat } from "@/lib/types"

interface GroupInfoProps {
  chat: Chat
  onClose: () => void
}

export function GroupInfo({ chat, onClose }: GroupInfoProps) {
  const [muted, setMuted] = useState(chat.isMuted)
  const [groupName, setGroupName] = useState(chat.name)
  const [isEditingName, setIsEditingName] = useState(false)
  const [searchParticipants, setSearchParticipants] = useState("")

  // Dummy group participants
  const participants = [
    { id: "1", name: "You", avatar: "/placeholder.svg?height=40&width=40", isAdmin: true },
    { id: "2", name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", isAdmin: true },
    { id: "3", name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40", isAdmin: false },
    { id: "4", name: "Charlie Brown", avatar: "/placeholder.svg?height=40&width=40", isAdmin: false },
    { id: "5", name: "Diana Prince", avatar: "/placeholder.svg?height=40&width=40", isAdmin: false },
  ]

  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(searchParticipants.toLowerCase()),
  )

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-[400px] bg-white dark:bg-gray-900 h-full overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#008069] dark:bg-green-800 text-white">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <X className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold">Group Info</h2>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        <div className="p-6 bg-white dark:bg-gray-900">
          <div className="flex flex-col items-center mb-6">
            <div className="group relative">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback className="text-4xl">{chat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>

            {isEditingName ? (
              <div className="flex items-center mb-2">
                <Input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="text-center"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={() => setIsEditingName(false)} className="ml-2">
                  <Check className="h-5 w-5 text-green-600" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{groupName}</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsEditingName(true)} className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                  </svg>
                </Button>
              </div>
            )}

            <p className="text-sm text-gray-500 dark:text-gray-400">Group · {participants.length} participants</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</h4>
              <p className="text-gray-900 dark:text-gray-100">{chat.about || "Add group description"}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Media, links, and docs</h4>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
              <Button variant="ghost" className="w-full justify-start text-blue-600 dark:text-blue-400 p-0">
                View all
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {participants.length} participants
                </h4>
                <div className="flex items-center">
                  <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <UserPlus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search participants"
                  className="pl-9 bg-[#f0f2f5] dark:bg-gray-800 border-none"
                  value={searchParticipants}
                  onChange={(e) => setSearchParticipants(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                {filteredParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-gray-900 dark:text-gray-100">
                          {participant.name} {participant.id === "1" && "(You)"}
                        </p>
                        {participant.isAdmin && <p className="text-xs text-gray-500 dark:text-gray-400">Group admin</p>}
                      </div>
                    </div>
                    {participant.id !== "1" && (
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                  <span className="text-gray-900 dark:text-gray-100">Mute notifications</span>
                </div>
                <Switch checked={muted} onCheckedChange={setMuted} />
              </div>

              <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <VolumeX className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <span className="text-gray-900 dark:text-gray-100">Custom notifications</span>
              </div>
            </div>

            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 dark:text-red-400 p-4 bg-white dark:bg-gray-800 rounded-lg"
              >
                <Users className="h-5 w-5 mr-4" />
                Exit group
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 dark:text-red-400 p-4 bg-white dark:bg-gray-800 rounded-lg"
              >
                <ThumbsDown className="h-5 w-5 mr-4" />
                Report group
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 dark:text-red-400 p-4 bg-white dark:bg-gray-800 rounded-lg"
              >
                <Trash2 className="h-5 w-5 mr-4" />
                Delete group
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
