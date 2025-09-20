'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { t, language } = useLanguage()

  // Helper function to get localized URL
  const getLocalizedUrl = (path: string) => {
    if (language === 'en') {
      return `/en${path}`
    }
    return path
  }
  
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-5xl mx-auto px-12 md:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Brand section */}
          <div className="space-y-6">
            <Link href={getLocalizedUrl('/')} className="text-2xl font-extralight tracking-wider text-gray-800 font-sans">
              {t.footer.brand}
            </Link>
            <p className="text-gray-600 leading-relaxed font-serif text-sm">
              {t.footer.brandDescription}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium uppercase tracking-widest text-gray-800 font-sans">{t.footer.explore}</h3>
            <nav className="space-y-3">
              <Link 
                href={getLocalizedUrl('/galleries')} 
                className="block text-gray-600 hover:text-gray-800 transition-colors font-serif text-sm"
              >
                {t.navigation.galleries}
              </Link>
              <Link 
                href={getLocalizedUrl('/stories')} 
                className="block text-gray-600 hover:text-gray-800 transition-colors font-serif text-sm"
              >
                {t.navigation.stories}
              </Link>
              <Link 
                href={getLocalizedUrl('/my-gear')} 
                className="block text-gray-600 hover:text-gray-800 transition-colors font-serif text-sm"
              >
                {t.navigation.myGear}
              </Link>
              <Link 
                href={getLocalizedUrl('/about')} 
                className="block text-gray-600 hover:text-gray-800 transition-colors font-serif text-sm"
              >
                {t.navigation.about}
              </Link>
            </nav>
          </div>

          {/* Connect section */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium uppercase tracking-widest text-gray-800 font-sans">{t.footer.connect}</h3>
            <div className="space-y-3">
              <a 
                href="https://filmrick.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 hover:text-gray-800 transition-colors font-serif text-sm"
              >
                {t.footer.newsletter}
              </a>
              <p className="text-xs text-gray-500 font-serif">
                {t.footer.newsletterDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-sans">
            © {new Date().getFullYear()} {t.footer.brand}. {t.footer.copyright}
          </p>
          <p className="text-xs text-gray-500 font-serif">
            {t.about.madeWith}
          </p>
        </div>
      </div>
    </footer>
  )
}