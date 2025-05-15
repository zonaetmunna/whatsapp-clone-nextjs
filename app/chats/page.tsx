"use client"

import { useRouter } from "next/navigation"

export default function ChatsPage() {
  const router = useRouter()

  return (
    <div className="flex-1 flex items-center justify-center bg-[#f0f2f5] dark:bg-gray-900 md:block hidden">
      <div className="text-center max-w-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">WhatsApp Web</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Send and receive messages without keeping your phone online.
          <br />
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </p>
      </div>
    </div>
  )
}
