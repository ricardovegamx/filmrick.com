'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export function SimpleNavigation() {
  const { t, language, setLanguage } = useLanguage()
  const pathname = usePathname()

  // Helper function to get localized URL
  const getLocalizedUrl = (path: string) => {
    if (language === 'en') {
      return `/en${path}`
    }
    return path
  }

  // Helper function to check if link is active
  const isActiveLink = (path: string) => {
    const localizedPath = getLocalizedUrl(path)
    if (path === '/') {
      return pathname === localizedPath
    }
    return pathname.startsWith(localizedPath)
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24">
        <div className="flex items-center justify-between h-28">
          <Link href={getLocalizedUrl('/')} className="text-[1.75rem] font-serif font-bold tracking-wide text-gray-800 hover:text-gray-600 transition-colors duration-300">
            FILMRICK
          </Link>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-12">
              <Link
                href={getLocalizedUrl('/')}
                className={`relative text-gray-800 hover:text-gray-600 transition-all duration-300 font-serif font-medium text-sm tracking-wider uppercase ${
                  isActiveLink('/')
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-800'
                    : ''
                }`}
              >
                {t.navigation.home}
              </Link>
              <Link
                href={getLocalizedUrl('/galleries')}
                className={`relative text-gray-800 hover:text-gray-600 transition-all duration-300 font-serif font-medium text-sm tracking-wider uppercase ${
                  isActiveLink('/galleries')
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-800'
                    : ''
                }`}
              >
                {t.navigation.galleries}
              </Link>
              <Link
                href={getLocalizedUrl('/stories')}
                className={`relative text-gray-800 hover:text-gray-600 transition-all duration-300 font-serif font-medium text-sm tracking-wider uppercase ${
                  isActiveLink('/stories')
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-800'
                    : ''
                }`}
              >
                {t.navigation.stories}
              </Link>
              <Link
                href={getLocalizedUrl('/my-gear')}
                className={`relative text-gray-800 hover:text-gray-600 transition-all duration-300 font-serif font-medium text-sm tracking-wider uppercase ${
                  isActiveLink('/my-gear')
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-800'
                    : ''
                }`}
              >
                {t.navigation.myGear}
              </Link>
              <Link
                href={getLocalizedUrl('/about')}
                className={`relative text-gray-800 hover:text-gray-600 transition-all duration-300 font-serif font-medium text-sm tracking-wider uppercase ${
                  isActiveLink('/about')
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-800'
                    : ''
                }`}
              >
                {t.navigation.about}
              </Link>
              
              {/* Language switcher */}
              <div className="flex items-center gap-1 ml-4">
                <button
                  onClick={() => setLanguage('en')}
                  className={`text-xs transition-colors duration-300 px-2 py-1 tracking-wider ${
                    language === 'en'
                      ? 'text-gray-800 font-bold'
                      : 'text-gray-500 hover:text-gray-700 font-normal'
                  }`}
                >
                  EN
                </button>
                <span className="text-xs text-gray-400">|</span>
                <button
                  onClick={() => setLanguage('es')}
                  className={`text-xs transition-colors duration-300 px-2 py-1 tracking-wider ${
                    language === 'es'
                      ? 'text-gray-800 font-bold'
                      : 'text-gray-500 hover:text-gray-700 font-normal'
                  }`}
                >
                  ES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}