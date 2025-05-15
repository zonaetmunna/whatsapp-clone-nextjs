export interface Chat {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  lastMessage?: string
  lastMessageTime: string
  lastMessageSender: "me" | "them"
  lastMessageStatus?: "sending" | "sent" | "delivered" | "read"
  unreadCount: number
  isMuted: boolean
  isPinned: boolean
  isArchived: boolean
  about?: string
}

export interface Message {
  id: string
  sender: "me" | "them"
  content: string
  timestamp: string
  status?: "sending" | "sent" | "delivered" | "read"
  type: "text" | "image" | "file" | "voice" | "location" | "contact"
  caption?: string
  fileName?: string
  fileSize?: string
  duration?: number // for voice messages
  location?: {
    latitude: number
    longitude: number
    name?: string
  }
  contact?: {
    name: string
    phone: string
    avatar?: string
  }
}

export interface Call {
  id: string
  name: string
  avatar: string
  timestamp: string
  type: "audio" | "video"
  status: "missed" | "completed" | "rejected"
  direction: "incoming" | "outgoing"
  duration?: number // in seconds
}

export interface Status {
  id: string
  name: string
  avatar: string
  timestamp: string
  items: StatusItem[]
  viewed: boolean
}

export interface StatusItem {
  id: string
  type: "text" | "image" | "video"
  content: string
  timestamp: string
  backgroundColor?: string // for text status
  caption?: string // for media status
}
