'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Language, defaultLanguage, getTranslations, type Translations } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children, locale }: { children: React.ReactNode, locale?: string }) {
  const router = useRouter()
  const [language, setLanguageState] = useState<Language>(locale as Language || defaultLanguage)

  // Initialize language from Next.js locale or localStorage
  useEffect(() => {
    if (locale && (locale === 'es' || locale === 'en')) {
      setLanguageState(locale as Language)
    } else {
      const saved = localStorage.getItem('filmrick-language') as Language
      if (saved && (saved === 'es' || saved === 'en')) {
        setLanguageState(saved)
      }
    }
  }, [locale])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('filmrick-language', lang)

    // Navigate to the appropriate locale URL
    const currentPath = window.location.pathname
    const currentSearchParams = window.location.search

    if (lang === 'en') {
      // Switch to English - add /en prefix if not present
      if (!currentPath.startsWith('/en')) {
        const newPath = `/en${currentPath === '/' ? '' : currentPath}${currentSearchParams}`
        router.push(newPath)
      }
    } else {
      // Switch to Spanish - remove /en prefix if present
      if (currentPath.startsWith('/en')) {
        const newPath = currentPath.substring(3) || '/'
        router.push(`${newPath}${currentSearchParams}`)
      }
    }
  }

  const t = getTranslations(language)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}