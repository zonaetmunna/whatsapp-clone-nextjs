"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, ChevronRight, Clock, Users, ImageIcon, Check, UserPlus, MessageSquare } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PrivacySettings() {
  const router = useRouter()
  const [readReceipts, setReadReceipts] = useState(true)
  const [lastSeen, setLastSeen] = useState("everyone")
  const [profilePhoto, setProfilePhoto] = useState("everyone")
  const [about, setAbout] = useState("everyone")
  const [groups, setGroups] = useState("everyone")

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#f0f2f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 ml-4">Privacy</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Last seen</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Who can see when you were last online</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                  {lastSeen === "everyone" ? "Everyone" : lastSeen === "contacts" ? "My contacts" : "Nobody"}
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ImageIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Profile photo</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Who can see your profile photo</p>
                </div>
              </div>
              <Select value={profilePhoto} onValueChange={setProfilePhoto}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">Everyone</SelectItem>
                  <SelectItem value="contacts">My contacts</SelectItem>
                  <SelectItem value="nobody">Nobody</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">About</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Who can see your about info</p>
                </div>
              </div>
              <Select value={about} onValueChange={setAbout}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">Everyone</SelectItem>
                  <SelectItem value="contacts">My contacts</SelectItem>
                  <SelectItem value="nobody">Nobody</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Groups</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Who can add you to groups</p>
                </div>
              </div>
              <Select value={groups} onValueChange={setGroups}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">Everyone</SelectItem>
                  <SelectItem value="contacts">My contacts</SelectItem>
                  <SelectItem value="selected">Selected contacts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Read receipts</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show when you've read messages</p>
                </div>
              </div>
              <Switch checked={readReceipts} onCheckedChange={setReadReceipts} />
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserPlus className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Blocked contacts</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Manage blocked contacts</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
