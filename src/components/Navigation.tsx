'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { useState, useEffect } from 'react'

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/galleries', label: 'Galleries' },
  { href: '/stories', label: 'Stories' },
  { href: '/about', label: 'About' }
]

export function Navigation() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-[var(--color-bg-primary)] backdrop-blur shadow-[var(--shadow-soft)]' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="container">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link 
            href="/"
            className="text-display font-light tracking-tight hover:opacity-70 transition-opacity duration-200"
          >
            FILMRICK
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || 
                             (item.href !== '/' && pathname?.startsWith(item.href))
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative text-label py-2 transition-all duration-200
                    ${isActive 
                      ? 'text-[var(--color-accent)]' 
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }
                  `}
                >
                  {item.label}
                  {isActive && (
                    <span 
                      className="
                        absolute bottom-0 left-0 w-full h-[1px] 
                        bg-[var(--color-accent)] 
                        animate-scale-in
                      "
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="
                w-10 h-10 
                flex items-center justify-center 
                rounded-full 
                border border-[var(--color-border-subtle)]
                bg-[var(--color-bg-elevated)]
                transition-all duration-200
                hover:border-[var(--color-border-default)]
                hover:transform hover:-translate-y-0.5
                focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]
              "
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-10 h-10 
          flex flex-col items-center justify-center 
          space-y-1
          transition-all duration-200
        "
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <span 
          className={`
            w-5 h-[1px] bg-[var(--color-text-primary)] transition-all duration-200
            ${isOpen ? 'rotate-45 translate-y-[3px]' : ''}
          `} 
        />
        <span 
          className={`
            w-5 h-[1px] bg-[var(--color-text-primary)] transition-all duration-200
            ${isOpen ? 'opacity-0' : ''}
          `} 
        />
        <span 
          className={`
            w-5 h-[1px] bg-[var(--color-text-primary)] transition-all duration-200
            ${isOpen ? '-rotate-45 -translate-y-[3px]' : ''}
          `} 
        />
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 top-[84px] z-40
          bg-[var(--color-bg-primary)]
          backdrop-blur
          transition-all duration-300
          ${isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
          }
        `}
      >
        <div className="container py-8">
          <div className="flex flex-col space-y-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || 
                             (item.href !== '/' && pathname?.startsWith(item.href))
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-title py-4 border-b border-[var(--color-border-subtle)]
                    transition-all duration-200
                    ${isActive 
                      ? 'text-[var(--color-accent)]' 
                      : 'text-[var(--color-text-secondary)]'
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}