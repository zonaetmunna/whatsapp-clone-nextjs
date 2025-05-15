"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Search, Archive, Users, Settings, Bell, Phone, Plus, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { ChatList } from "@/components/chat/chat-list"
import { dummyChats } from "@/lib/dummy-data"
import { UserProfile } from "@/components/user/user-profile"
import { StatusList } from "@/components/status/status-list"
import { StatusCreate } from "@/components/status/status-create"
import { CallHistory } from "@/components/calls/call-history"
import { CallTabs } from "@/components/calls/call-tabs"
import { CreateGroup } from "@/components/chat/create-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export function ChatSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [showProfile, setShowProfile] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [activeTab, setActiveTab] = useState("chats")

  // Set active tab based on pathname
  useEffect(() => {
    if (pathname.includes("/calls")) {
      setActiveTab("calls")
    } else if (pathname.includes("/status")) {
      setActiveTab("status")
    } else {
      setActiveTab("chats")
    }
  }, [pathname])

  const filteredChats = dummyChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chat.lastMessage && chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "chats") {
      router.push("/chats")
    } else if (value === "status") {
      router.push("/status")
    } else if (value === "calls") {
      router.push("/calls")
    }
  }

  const handleLogout = () => {
    document.cookie = "whatsapp_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/")
  }

  if (showProfile) {
    return <UserProfile onClose={() => setShowProfile(false)} />
  }

  return (
    <>
      <Sidebar
        variant="sidebar"
        collapsible="none"
        className="w-[380px] border-r border-gray-200 dark:border-gray-800 md:block hidden"
      >
        <SidebarHeader className="p-0">
          <div className="flex justify-between items-center p-3 bg-[#f0f2f5] dark:bg-gray-800">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowProfile(true)}>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
            <div className="flex gap-1">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/status")}>
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/calls")}>
                <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowCreateGroup(true)}>
                <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-more-vertical text-gray-600 dark:text-gray-400"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    {t("nav.settings")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowCreateGroup(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("chats.newGroup")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("auth.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="p-2 bg-white dark:bg-gray-900">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder={t("chats.search")}
                className="pl-9 bg-[#f0f2f5] dark:bg-gray-800 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <Tabs defaultValue="chats" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full bg-[#f0f2f5] dark:bg-gray-800 rounded-none border-b border-gray-200 dark:border-gray-700">
              <TabsTrigger value="chats" className="flex-1">
                {t("nav.chats")}
              </TabsTrigger>
              <TabsTrigger value="status" className="flex-1">
                {t("nav.status")}
              </TabsTrigger>
              <TabsTrigger value="calls" className="flex-1">
                {t("nav.calls")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chats" className="m-0">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="justify-between py-3 px-4 h-auto hover:bg-[#f0f2f5] dark:hover:bg-gray-800"
                  >
                    <button className="flex items-center w-full">
                      <Archive className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <span className="text-gray-800 dark:text-gray-200">{t("chats.archived")}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <ChatList chats={filteredChats} currentChatId={pathname.split("/").pop()} />
            </TabsContent>
            <TabsContent value="status" className="m-0">
              <StatusCreate />
              <StatusList />
            </TabsContent>
            <TabsContent value="calls" className="m-0">
              <CallTabs />
              <CallHistory />
            </TabsContent>
          </Tabs>
        </SidebarContent>
      </Sidebar>

      {/* Mobile sidebar */}
      <div className="md:hidden w-full h-full">
        {activeTab === "chats" && (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-3 bg-[#f0f2f5] dark:bg-gray-800">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t("app.name")}</h1>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowCreateGroup(true)}>
                  <Plus className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="justify-between py-3 px-4 h-auto hover:bg-[#f0f2f5] dark:hover:bg-gray-800"
                  >
                    <button className="flex items-center w-full">
                      <Archive className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <span className="text-gray-800 dark:text-gray-200">{t("chats.archived")}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <ChatList chats={filteredChats} currentChatId={pathname.split("/").pop()} />
            </div>
          </div>
        )}

        {activeTab === "status" && (
          <div className="flex flex-col h-full">
            <div className="p-3 bg-[#f0f2f5] dark:bg-gray-800">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t("nav.status")}</h1>
            </div>
            <div className="flex-1 overflow-y-auto">
              <StatusCreate />
              <StatusList />
            </div>
          </div>
        )}

        {activeTab === "calls" && (
          <div className="flex flex-col h-full">
            <div className="p-3 bg-[#f0f2f5] dark:bg-gray-800">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t("nav.calls")}</h1>
            </div>
            <div className="flex-1 overflow-y-auto">
              <CallTabs />
              <CallHistory />
            </div>
          </div>
        )}
      </div>

      {showCreateGroup && <CreateGroup onClose={() => setShowCreateGroup(false)} />}
    </>
  )
}
