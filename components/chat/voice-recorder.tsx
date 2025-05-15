"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Send, Pause, Play } from "lucide-react"

interface VoiceRecorderProps {
  onCancel: () => void
  onSend: () => void
}

export function VoiceRecorder({ onCancel, onSend }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(true)
  const [duration, setDuration] = useState(0)
  const [waveform, setWaveform] = useState<number[]>([])

  // Simulate recording with timer
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isRecording) {
      timer = setInterval(() => {
        setDuration((prev) => prev + 1)

        // Generate random waveform data
        if (waveform.length < 50) {
          setWaveform((prev) => [...prev, Math.random() * 40 + 10])
        } else {
          setWaveform((prev) => {
            const newWaveform = [...prev]
            newWaveform.shift()
            newWaveform.push(Math.random() * 40 + 10)
            return newWaveform
          })
        }
      }, 100)
    }

    return () => clearInterval(timer)
  }, [isRecording, waveform.length])

  const formatDuration = (totalTenthsOfSeconds: number) => {
    const totalSeconds = Math.floor(totalTenthsOfSeconds / 10)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const tenths = totalTenthsOfSeconds % 10

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${tenths}`
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div className="flex items-center space-x-4 bg-white dark:bg-gray-700 rounded-lg p-3">
      <Button variant="ghost" size="icon" onClick={onCancel} className="text-red-500">
        <X className="h-5 w-5" />
      </Button>

      <div className="flex-1 flex items-center space-x-2">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 w-16">{formatDuration(duration)}</div>

        <div className="flex-1 h-10 flex items-center">
          {waveform.map((height, index) => (
            <div key={index} className="w-1 mx-[1px] bg-green-500 rounded-full" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>

      <Button variant="ghost" size="icon" onClick={toggleRecording} className="text-gray-600 dark:text-gray-400">
        {isRecording ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </Button>

      <Button variant="ghost" size="icon" onClick={onSend} className="text-green-600">
        <Send className="h-5 w-5" />
      </Button>
    </div>
  )
}
