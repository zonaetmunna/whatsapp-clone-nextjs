"use client"

import { ProfileSettings } from "@/components/settings/profile-settings"

export default function ProfilePage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900">
      <ProfileSettings />
    </div>
  )
}
