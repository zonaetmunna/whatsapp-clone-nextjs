"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquare, Phone, Users, CircleUser, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { IncomingCall } from "@/components/calls/incoming-call"
import { dummyChats } from "@/lib/dummy-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export function MainNav() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useLanguage()
  const [showIncomingCall, setShowIncomingCall] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check login status
  useEffect(() => {
    const hasAuthCookie = document.cookie.includes("whatsapp_auth=true")
    setIsLoggedIn(hasAuthCookie)
  }, [pathname])

  // Simulate random incoming calls
  useEffect(() => {
    if (!isLoggedIn) return

    const timer = setTimeout(() => {
      if (Math.random() > 0.7) {
        setShowIncomingCall(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [isLoggedIn])

  const navItems = [
    {
      icon: MessageSquare,
      label: t("nav.chats"),
      path: "/chats",
    },
    {
      icon: Users,
      label: t("nav.communities"),
      path: "/communities",
    },
    {
      icon: Phone,
      label: t("nav.calls"),
      path: "/calls",
    },
    {
      icon: CircleUser,
      label: t("nav.status"),
      path: "/status",
    },
    {
      icon: Settings,
      label: t("nav.settings"),
      path: "/settings",
    },
  ]

  const handleAcceptCall = () => {
    setShowIncomingCall(false)
    // In a real app, this would accept the call
  }

  const handleDeclineCall = () => {
    setShowIncomingCall(false)
    // In a real app, this would decline the call
  }

  const handleLogout = () => {
    // Remove the auth cookie
    document.cookie = "whatsapp_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/")
  }

  if (!isLoggedIn) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden">
        <div className="flex justify-around p-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.path)
            return (
              <Button
                key={item.path}
                variant="ghost"
                className={cn(
                  "flex flex-col items-center py-2 px-3 h-auto",
                  isActive && "text-green-600 dark:text-green-500",
                )}
                onClick={() => router.push(item.path)}
              >
                <item.icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      <div className="fixed top-4 right-4 z-50 md:hidden flex space-x-2">
        <LanguageSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 dark:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/profile")}>{t("nav.profile")}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {t("auth.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showIncomingCall && (
        <IncomingCall
          name={dummyChats[0].name}
          avatar={dummyChats[0].avatar}
          type="audio"
          onAccept={handleAcceptCall}
          onDecline={handleDeclineCall}
        />
      )}
    </>
  )
}
