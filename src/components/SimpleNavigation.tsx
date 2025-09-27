'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SimpleNavigation() {
  const pathname = usePathname()

  // Helper function to check if link is active
  const isActiveLink = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24">
        <div className="flex items-center justify-between h-28">
          <Link href="/" className="text-[1.75rem] font-serif font-bold tracking-wide text-gray-800 hover:text-gray-600 transition-colors duration-300">
            FILMRICK
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-12">
              <Link
                href="/"
                className={`relative text-gray-800 hover:text-gray-600 transition-all duration-300 font-serif font-medium text-sm tracking-wider uppercase ${
                  isActiveLink('/')
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-800'
                    : ''
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/galleries"
                className={`relative text-gray-800 hover:text-gray-600 transition-all duration-300 font-serif font-medium text-sm tracking-wider uppercase ${
                  isActiveLink('/galleries')
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-800'
                    : ''
                }`}
              >
                Galerías
              </Link>
              <Link
                href="/stories"
                className={`relative text-gray-800 hover:text-gray-600 transition-all duration-300 font-serif font-medium text-sm tracking-wider uppercase ${
                  isActiveLink('/stories')
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-800'
                    : ''
                }`}
              >
                Historias
              </Link>
              <Link
                href="/my-gear"
                className={`relative text-gray-800 hover:text-gray-600 transition-all duration-300 font-serif font-medium text-sm tracking-wider uppercase ${
                  isActiveLink('/my-gear')
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-800'
                    : ''
                }`}
              >
                Mi Equipo
              </Link>
              <Link
                href="/about"
                className={`relative text-gray-800 hover:text-gray-600 transition-all duration-300 font-serif font-medium text-sm tracking-wider uppercase ${
                  isActiveLink('/about')
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gray-800'
                    : ''
                }`}
              >
                Acerca de
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}