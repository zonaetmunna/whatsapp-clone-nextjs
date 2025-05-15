import { Button } from "@/components/ui/button"
import { Users, Plus } from "lucide-react"

export default function CommunitiesPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-4 bg-[#f0f2f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Communities</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
          <Users className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Introducing Communities</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
          Easily organize your related groups and send announcements. Now, your communities, like neighborhoods or
          schools, can have their own space.
        </p>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Start your community
        </Button>
      </div>
    </div>
  )
}
