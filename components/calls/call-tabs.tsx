"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function CallTabs() {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center px-4 py-2">
        <Tabs defaultValue="calls" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
          </TabsList>
          <TabsContent value="calls" className="mt-0">
            {/* Content is rendered in CallHistory component */}
          </TabsContent>
          <TabsContent value="links" className="mt-0 p-4">
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Create call link</h3>
              <p className="text-center text-gray-600 dark:text-gray-400">Share a link for your WhatsApp call</p>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create call link
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
