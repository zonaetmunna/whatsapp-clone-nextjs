"use client"
import { useRouter, usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function SettingsSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const settingsItems = [
    {
      title: "Account",
      path: "/settings",
    },
    {
      title: "Privacy",
      path: "/settings/privacy",
    },
    {
      title: "Security",
      path: "/settings/security",
    },
    {
      title: "Notifications",
      path: "/settings/notifications",
    },
    {
      title: "Storage and data",
      path: "/settings/storage",
    },
    {
      title: "App language",
      path: "/settings/language",
    },
    {
      title: "Help",
      path: "/settings/help",
    },
    {
      title: "About",
      path: "/settings/about",
    },
  ]

  return (
    <Sidebar
      variant="sidebar"
      collapsible="none"
      className="w-[380px] border-r border-gray-200 dark:border-gray-800 md:block hidden"
    >
      <SidebarHeader className="p-0">
        <div className="flex items-center p-4 bg-[#f0f2f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Button variant="ghost" size="icon" onClick={() => router.push("/chats")}>
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 ml-4">Settings</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0">
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

        <SidebarMenu>
          {settingsItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.path}
                className="py-3 px-4 h-auto hover:bg-[#f0f2f5] dark:hover:bg-gray-800"
              >
                <button className="flex items-center w-full text-left" onClick={() => router.push(item.path)}>
                  <span className="text-gray-800 dark:text-gray-200">{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
