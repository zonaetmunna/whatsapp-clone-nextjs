"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, Database, ImageIcon, Video, File, Trash2 } from "lucide-react"

export default function StorageSettingsPage() {
  const router = useRouter()

  // Dummy storage data
  const storageData = {
    total: 16, // GB
    used: 8.7, // GB
    photos: 4.2, // GB
    videos: 3.1, // GB
    documents: 0.8, // GB
    other: 0.6, // GB
  }

  const usedPercentage = (storageData.used / storageData.total) * 100

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#f0f2f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center md:hidden">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 ml-4">Storage and data</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto p-4 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <Database className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Storage</h3>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">
                  {storageData.used.toFixed(1)} GB of {storageData.total} GB used
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {(storageData.total - storageData.used).toFixed(1)} GB free
                </span>
              </div>
              <Progress value={usedPercentage} className="h-2" />
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ImageIcon className="h-5 w-5 text-blue-500 mr-3" />
                  <span className="text-gray-900 dark:text-gray-100">Photos</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">{storageData.photos.toFixed(1)} GB</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Video className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-900 dark:text-gray-100">Videos</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">{storageData.videos.toFixed(1)} GB</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-yellow-500 mr-3" />
                  <span className="text-gray-900 dark:text-gray-100">Documents</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">{storageData.documents.toFixed(1)} GB</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-xs text-white">?</span>
                  </div>
                  <span className="text-gray-900 dark:text-gray-100">Other</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">{storageData.other.toFixed(1)} GB</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Manage storage
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Network usage</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Sent</span>
                <span className="text-gray-900 dark:text-gray-100">128.5 MB</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Received</span>
                <span className="text-gray-900 dark:text-gray-100">256.8 MB</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total</span>
                <span className="text-gray-900 dark:text-gray-100">385.3 MB</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              Reset statistics
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Auto-download</h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Using mobile data</h4>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="mobile-photos" className="mr-2" defaultChecked />
                    <label htmlFor="mobile-photos" className="text-gray-900 dark:text-gray-100">
                      Photos
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="mobile-audio" className="mr-2" />
                    <label htmlFor="mobile-audio" className="text-gray-900 dark:text-gray-100">
                      Audio
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="mobile-videos" className="mr-2" />
                    <label htmlFor="mobile-videos" className="text-gray-900 dark:text-gray-100">
                      Videos
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="mobile-documents" className="mr-2" defaultChecked />
                    <label htmlFor="mobile-documents" className="text-gray-900 dark:text-gray-100">
                      Documents
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Using Wi-Fi</h4>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="wifi-photos" className="mr-2" defaultChecked />
                    <label htmlFor="wifi-photos" className="text-gray-900 dark:text-gray-100">
                      Photos
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="wifi-audio" className="mr-2" defaultChecked />
                    <label htmlFor="wifi-audio" className="text-gray-900 dark:text-gray-100">
                      Audio
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="wifi-videos" className="mr-2" defaultChecked />
                    <label htmlFor="wifi-videos" className="text-gray-900 dark:text-gray-100">
                      Videos
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="wifi-documents" className="mr-2" defaultChecked />
                    <label htmlFor="wifi-documents" className="text-gray-900 dark:text-gray-100">
                      Documents
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Proxy settings</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Configure proxy settings for WhatsApp.</p>
            <Button variant="outline" className="w-full">
              Configure
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
