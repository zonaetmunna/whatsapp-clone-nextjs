"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus, Send } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface PollCreatorProps {
  onClose: () => void
  onSend: (poll: {
    question: string
    options: string[]
    allowMultipleAnswers: boolean
  }) => void
}

export function PollCreator({ onClose, onSend }: PollCreatorProps) {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(false)

  const addOption = () => {
    if (options.length < 12) {
      setOptions([...options, ""])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options]
      newOptions.splice(index, 1)
      setOptions(newOptions)
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSend = () => {
    // Filter out empty options
    const validOptions = options.filter((opt) => opt.trim() !== "")

    if (question.trim() && validOptions.length >= 2) {
      onSend({
        question: question.trim(),
        options: validOptions,
        allowMultipleAnswers,
      })
    }
  }

  const isValid = question.trim() !== "" && options.filter((opt) => opt.trim() !== "").length >= 2

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create Poll</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question</label>
            <Input
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Options</label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1"
                  />
                  {options.length > 2 && (
                    <Button variant="ghost" size="icon" onClick={() => removeOption(index)} className="ml-2">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {options.length < 12 && (
              <Button variant="outline" className="w-full mt-2" onClick={addOption}>
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow multiple answers</label>
            <Switch checked={allowMultipleAnswers} onCheckedChange={setAllowMultipleAnswers} />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <Button variant="outline" className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" disabled={!isValid} onClick={handleSend}>
            <Send className="h-4 w-4 mr-2" />
            Send Poll
          </Button>
        </div>
      </div>
    </div>
  )
}
