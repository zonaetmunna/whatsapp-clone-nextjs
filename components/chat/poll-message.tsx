"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface PollOption {
  id: string
  text: string
  votes: number
}

interface PollMessageProps {
  question: string
  options: PollOption[]
  allowMultipleAnswers: boolean
  totalVotes: number
  sender: "me" | "them"
}

export function PollMessage({ question, options, allowMultipleAnswers, totalVotes, sender }: PollMessageProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)

  const handleOptionSelect = (optionId: string) => {
    if (allowMultipleAnswers) {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId))
      } else {
        setSelectedOptions([...selectedOptions, optionId])
      }
    } else {
      setSelectedOptions([optionId])
    }
  }

  const handleVote = () => {
    if (selectedOptions.length > 0) {
      setHasVoted(true)
      // In a real app, this would send the vote to the server
      console.log("Voted for:", selectedOptions)
    }
  }

  // Calculate percentages for the progress bars
  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0
    return Math.round((votes / totalVotes) * 100)
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900 dark:text-gray-100">{question}</h3>

      <div className="space-y-2">
        {allowMultipleAnswers ? (
          // Multiple choice poll
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.id} className="relative">
                {hasVoted ? (
                  // After voting - show results
                  <div className="flex items-center p-2 rounded-md">
                    <div
                      className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-md"
                      style={{
                        width: `${getPercentage(option.votes)}%`,
                      }}
                    />
                    <div className="relative flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Checkbox checked={selectedOptions.includes(option.id)} className="mr-2" disabled />
                        <span className="text-gray-900 dark:text-gray-100">{option.text}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{getPercentage(option.votes)}%</span>
                    </div>
                  </div>
                ) : (
                  // Before voting - show options
                  <div
                    className={cn(
                      "flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700",
                      selectedOptions.includes(option.id) && "bg-gray-100 dark:bg-gray-700",
                    )}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <Checkbox
                      checked={selectedOptions.includes(option.id)}
                      onCheckedChange={() => handleOptionSelect(option.id)}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-gray-100">{option.text}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Single choice poll
          <RadioGroup value={selectedOptions[0]} disabled={hasVoted}>
            {options.map((option) => (
              <div key={option.id} className="relative">
                {hasVoted ? (
                  // After voting - show results
                  <div className="flex items-center p-2 rounded-md">
                    <div
                      className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-md"
                      style={{
                        width: `${getPercentage(option.votes)}%`,
                      }}
                    />
                    <div className="relative flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <RadioGroupItem value={option.id} id={option.id} className="mr-2" disabled />
                        <span className="text-gray-900 dark:text-gray-100">{option.text}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{getPercentage(option.votes)}%</span>
                    </div>
                  </div>
                ) : (
                  // Before voting - show options
                  <div
                    className={cn(
                      "flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700",
                      selectedOptions.includes(option.id) && "bg-gray-100 dark:bg-gray-700",
                    )}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <RadioGroupItem value={option.id} id={option.id} className="mr-2" />
                    <span className="text-gray-900 dark:text-gray-100">{option.text}</span>
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>
        )}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {hasVoted
            ? `${totalVotes} vote${totalVotes !== 1 ? "s" : ""}`
            : allowMultipleAnswers
              ? "Multiple answers allowed"
              : "Single answer only"}
        </p>

        {!hasVoted && (
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            disabled={selectedOptions.length === 0}
            onClick={handleVote}
          >
            Vote
          </Button>
        )}
      </div>
    </div>
  )
}
