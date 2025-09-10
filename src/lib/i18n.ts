export type Locale = 'en' | 'es'

export const locales: Locale[] = ['en', 'es']
export const defaultLocale: Locale = 'en'

export interface LocaleConfig {
  locale: Locale
  label: string
  flag: string
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  en: {
    locale: 'en',
    label: 'English',
    flag: '🇺🇸',
  },
  es: {
    locale: 'es', 
    label: 'Español',
    flag: '🇪🇸',
  },
}

// Detect locale from browser or headers
export function detectLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return defaultLocale
  
  // Parse Accept-Language header or navigator.language
  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase())
  
  // Check for exact matches first
  for (const lang of languages) {
    if (locales.includes(lang as Locale)) {
      return lang as Locale
    }
  }
  
  // Check for language prefix matches (e.g., 'es-ES' -> 'es')
  for (const lang of languages) {
    const prefix = lang.split('-')[0]
    if (locales.includes(prefix as Locale)) {
      return prefix as Locale
    }
  }
  
  return defaultLocale
}

// Translation dictionary
export const translations = {
  en: {
    // Navigation
    home: 'Home',
    galleries: 'Galleries',
    stories: 'Stories',
    about: 'About',
    
    // Common
    readMore: 'Read More',
    backToGalleries: 'Back to Galleries',
    backToStories: 'Back to Stories',
    
    // Homepage
    photographyPortfolio: 'Photography Portfolio',
    comingSoon: 'Coming Soon',
    
    // Gallery
    galleryCollection: 'Gallery Collection',
    noGalleriesAvailable: 'No galleries available yet.',
    
    // Stories
    noStoriesAvailable: 'No stories available yet.',
    
    // About
    aboutFilmrick: 'About FILMRICK',
    
    // Meta
    siteTitle: 'FILMRICK - Photography Portfolio',
    siteDescription: 'Urban landscapes and street photography by FILMRICK. Capturing the intersection of architecture, light, and human presence in modern cities.',
  },
  es: {
    // Navigation
    home: 'Inicio',
    galleries: 'Galerías',
    stories: 'Historias',
    about: 'Acerca',
    
    // Common
    readMore: 'Leer Más',
    backToGalleries: 'Volver a Galerías',
    backToStories: 'Volver a Historias',
    
    // Homepage
    photographyPortfolio: 'Portafolio de Fotografía',
    comingSoon: 'Próximamente',
    
    // Gallery
    galleryCollection: 'Colección de Galería',
    noGalleriesAvailable: 'No hay galerías disponibles aún.',
    
    // Stories
    noStoriesAvailable: 'No hay historias disponibles aún.',
    
    // About
    aboutFilmrick: 'Acerca de FILMRICK',
    
    // Meta
    siteTitle: 'FILMRICK - Portafolio de Fotografía',
    siteDescription: 'Paisajes urbanos y fotografía callejera por FILMRICK. Capturando la intersección de arquitectura, luz y presencia humana en ciudades modernas.',
  },
} as const

export type TranslationKey = keyof typeof translations.en

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations[defaultLocale][key]
}

// Get locale from URL or browser
export function getLocaleFromUrl(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }
  
  return defaultLocale
}

// Remove locale prefix from pathname
export function removeLocaleFromPath(pathname: string, locale: Locale): string {
  if (locale === defaultLocale) return pathname
  
  const withoutLocale = pathname.replace(`/${locale}`, '') || '/'
  return withoutLocale
}

// Add locale prefix to pathname
export function addLocaleToPath(pathname: string, locale: Locale): string {
  if (locale === defaultLocale) return pathname
  
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `/${locale}${cleanPath}`
}