"use client"

import type React from "react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { Loader2, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to authenticate the user
      console.log("Logging in:", formData)

      // Set auth cookie
      document.cookie = "whatsapp_auth=true; path=/; max-age=2592000" // 30 days

      // Redirect to chats page
      router.push("/chats")
    }, 1500)
  }

  const handleDemoLogin = () => {
    setIsLoading(true)

    // Set auth cookie
    document.cookie = "whatsapp_auth=true; path=/; max-age=2592000" // 30 days

    // Redirect to chats page after a short delay
    setTimeout(() => {
      router.push("/chats")
    }, 1000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6 text-green-600 dark:text-green-400">{t("app.name")}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                name="email"
                type="email"
                placeholder={t("auth.email")}
                className="pl-10"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                name="password"
                type="password"
                placeholder={t("auth.password")}
                className="pl-10"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("auth.loggingIn")}
              </>
            ) : (
              t("auth.login")
            )}
          </Button>
        </form>

        <div className="mt-4">
          <Button variant="outline" className="w-full" onClick={handleDemoLogin} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("auth.loggingIn")}
              </>
            ) : (
              t("auth.demoLogin")
            )}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("auth.dontHaveAccount")}{" "}
            <Link href="/signup" className="text-green-600 hover:text-green-700 dark:text-green-400">
              {t("auth.signup")}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
