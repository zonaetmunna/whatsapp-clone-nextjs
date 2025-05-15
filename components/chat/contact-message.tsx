"use client"

import { User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ContactMessageProps {
  contact: {
    name: string
    phone: string
    avatar?: string
  }
  sender: "me" | "them"
}

export function ContactMessage({ contact, sender }: ContactMessageProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
        <Avatar>
          <AvatarImage src={contact.avatar || "/placeholder.svg?height=40&width=40"} alt={contact.name} />
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{contact.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{contact.phone}</p>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1 text-blue-600 dark:text-blue-400">
          <User className="h-4 w-4 mr-2" />
          View Contact
        </Button>

        <Button variant="outline" size="sm" className="flex-1 text-green-600 dark:text-green-400">
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
      </div>
    </div>
  )
}
