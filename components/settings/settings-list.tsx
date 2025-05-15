"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Key, Bell, Database, CircleHelp, Moon, Users, ChevronRight } from "lucide-react"

export function SettingsList() {
  const router = useRouter()

  const settingsItems = [
    {
      icon: <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
      title: "Profile",
      description: "Edit your profile information",
      path: "/settings/profile",
    },
    {
      icon: <Key className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
      title: "Privacy",
      description: "Manage your privacy settings",
      path: "/settings/privacy",
    },
    {
      icon: <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
      title: "Notifications",
      description: "Configure notification preferences",
      path: "/settings/notifications",
    },
    {
      icon: <Database className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
      title: "Storage and data",
      description: "Manage storage and network usage",
      path: "/settings/storage",
    },
    {
      icon: <CircleHelp className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
      title: "Help",
      description: "Help center, contact us, privacy policy",
      path: "/settings/help",
    },
    {
      icon: <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
      title: "Theme",
      description: "Change app appearance",
      toggle: true,
    },
    {
      icon: <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
      title: "Invite a friend",
      description: "Share WhatsApp with friends",
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Your profile" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">John Doe</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Hey there! I am using WhatsApp.</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {settingsItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => item.path && router.push(item.path)}
          >
            <div className="mr-4">{item.icon}</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
            </div>
            {item.path && <ChevronRight className="h-5 w-5 text-gray-400" />}
          </div>
        ))}
      </div>

      <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">WhatsApp Clone v1.0.0</div>
    </div>
  )
}
