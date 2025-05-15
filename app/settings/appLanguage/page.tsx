"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Check } from "lucide-react"
import { useLanguage, type Language } from "@/contexts/language-context"

export default function AppLanguagePage() {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  const languages: { code: Language; name: string; localName: string }[] = [
    { code: "en", name: "English", localName: "English" },
    { code: "es", name: "Spanish", localName: "Español" },
    { code: "fr", name: "French", localName: "Français" },
    { code: "ar", name: "Arabic", localName: "العربية" },
    { code: "hi", name: "Hindi", localName: "हिन्दी" },
    { code: "zh", name: "Chinese", localName: "中文" },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#f0f2f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 ml-4">{t("settings.appLanguage")}</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto p-4 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-0"
                onClick={() => setLanguage(lang.code)}
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{lang.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lang.localName}</p>
                </div>
                {language === lang.code && <Check className="h-5 w-5 text-green-600" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
