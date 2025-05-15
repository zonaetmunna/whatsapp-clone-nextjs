"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage, type Language } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)

  const languages: { code: Language; name: string }[] = [
    { code: "en", name: t("language.en") },
    { code: "es", name: t("language.es") },
    { code: "fr", name: t("language.fr") },
    { code: "ar", name: t("language.ar") },
    { code: "hi", name: t("language.hi") },
    { code: "zh", name: t("language.zh") },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code)
              setOpen(false)
            }}
            className="flex items-center justify-between"
          >
            <span>{lang.name}</span>
            {language === lang.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
