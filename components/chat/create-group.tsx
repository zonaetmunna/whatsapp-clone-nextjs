"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Search, ArrowRight, Camera, Check } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface CreateGroupProps {
  onClose: () => void
}

export function CreateGroup({ onClose }: CreateGroupProps) {
  const [step, setStep] = useState<"select" | "info">("select")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [groupName, setGroupName] = useState("")

  // Dummy contacts
  const contacts = [
    { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Charlie Brown", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "4", name: "Diana Prince", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "5", name: "Edward Norton", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "6", name: "Fiona Gallagher", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const toggleContact = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
    } else {
      setSelectedContacts([...selectedContacts, contactId])
    }
  }

  const handleNext = () => {
    if (step === "select" && selectedContacts.length > 0) {
      setStep("info")
    } else if (step === "info" && groupName.trim()) {
      // In a real app, this would create the group
      console.log("Creating group:", {
        name: groupName,
        members: selectedContacts,
      })
      onClose()
    }
  }

  const getSelectedContactsById = (ids: string[]) => {
    return contacts.filter((contact) => ids.includes(contact.id))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-[400px] bg-white dark:bg-gray-900 h-full overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#008069] dark:bg-green-800 text-white">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <X className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold">{step === "select" ? "Add group participants" : "New group"}</h2>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {step === "select" && (
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search contacts"
                className="pl-9 bg-[#f0f2f5] dark:bg-gray-800 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {selectedContacts.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {getSelectedContactsById(selectedContacts).map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full pl-1 pr-2 py-1"
                  >
                    <Avatar className="h-6 w-6 mr-1">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-900 dark:text-gray-100 mr-1">{contact.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full"
                      onClick={() => toggleContact(contact.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => toggleContact(contact.id)}
                >
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    className="mr-3"
                    onCheckedChange={() => toggleContact(contact.id)}
                  />
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-900 dark:text-gray-100">{contact.name}</span>
                </div>
              ))}
            </div>

            <div className="fixed bottom-4 right-4">
              <Button
                className="rounded-full h-14 w-14 bg-green-600 hover:bg-green-700"
                disabled={selectedContacts.length === 0}
                onClick={handleNext}
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}

        {step === "info" && (
          <div className="p-4">
            <div className="flex flex-col items-center mb-6">
              <div className="group relative">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarFallback className="text-4xl bg-green-600 text-white">
                    {selectedContacts.length > 1
                      ? getSelectedContactsById(selectedContacts)
                          .slice(0, 2)
                          .map((c) => c.name.charAt(0))
                          .join("")
                      : "G"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="w-full mb-6">
                <Input
                  placeholder="Group name (required)"
                  className="text-center border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  autoFocus
                />
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Participants:{" "}
                {getSelectedContactsById(selectedContacts)
                  .map((c) => c.name)
                  .join(", ")}
              </p>
            </div>

            <div className="fixed bottom-4 right-4">
              <Button
                className="rounded-full h-14 w-14 bg-green-600 hover:bg-green-700"
                disabled={!groupName.trim()}
                onClick={handleNext}
              >
                <Check className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
