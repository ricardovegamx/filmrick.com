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
  const [language, setLanguageState] = useState<Language>(() => {
    // Initialize from locale prop first, then default
    if (locale && (locale === 'es' || locale === 'en')) {
      return locale as Language
    }
    return defaultLanguage
  })

  // Initialize language from Next.js locale or localStorage
  useEffect(() => {
    if (locale && (locale === 'es' || locale === 'en')) {
      setLanguageState(locale as Language)
    } else if (typeof window !== 'undefined') {
      // Detect from URL path when no locale prop is provided
      const pathname = window.location.pathname
      if (pathname.startsWith('/en')) {
        setLanguageState('en')
      } else {
        setLanguageState('es')
      }
    }
  }, [locale])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('filmrick-language', lang)

    // Navigate to the appropriate locale URL
    const currentPath = window.location.pathname
    const currentSearchParams = window.location.search

    // Special handling for stories URLs
    if (currentPath.startsWith('/stories/')) {
      if (lang === 'en') {
        // Switch to English stories
        if (!currentPath.startsWith('/stories/en/')) {
          // Convert /stories/1 → /stories/en/1
          const storyPath = currentPath.replace('/stories/', '/stories/en/')
          router.push(`${storyPath}${currentSearchParams}`)
        }
      } else {
        // Switch to Spanish stories
        if (currentPath.startsWith('/stories/en/')) {
          // Convert /stories/en/1 → /stories/1
          const storyPath = currentPath.replace('/stories/en/', '/stories/')
          router.push(`${storyPath}${currentSearchParams}`)
        }
      }
    } else {
      // Default behavior for other pages
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