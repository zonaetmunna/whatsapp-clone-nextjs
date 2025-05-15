"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CircleHelp, FileText, Info, MessageSquare } from "lucide-react"

export function HelpSettings() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#f0f2f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 ml-4">Help</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center">
              <CircleHelp className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
              <span className="text-gray-900 dark:text-gray-100">Help Center</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
              <span className="text-gray-900 dark:text-gray-100">Contact us</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
              <span className="text-gray-900 dark:text-gray-100">Terms and Privacy Policy</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4" />
              <span className="text-gray-900 dark:text-gray-100">App info</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">WhatsApp Clone</h2>
          <p className="text-gray-500 dark:text-gray-400">Version 1.0.0</p>
          <p className="text-gray-500 dark:text-gray-400 mt-4">© 2023 WhatsApp Clone Inc.</p>
        </div>
      </div>
    </div>
  )
}
