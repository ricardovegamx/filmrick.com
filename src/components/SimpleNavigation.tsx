import Link from 'next/link'

export function SimpleNavigation() {
  return (
    <nav 
      className="
        fixed top-0 left-0 right-0 z-50 
        bg-[var(--color-bg-primary)]/90 backdrop-blur-md 
        border-b border-[var(--color-border-subtle)]
        transition-all var(--duration-normal) var(--ease-in-out-sine)
      "
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="container mx-auto">
        <div 
          className="
            flex items-center justify-between 
            h-full px-[var(--nav-padding-x)]
          "
        >
          {/* Logo with breathing room */}
          <Link 
            href="/" 
            className="
              text-title font-light tracking-wide
              text-[var(--color-text-primary)]
              hover:text-[var(--color-accent-hover)]
              transition-all var(--duration-fast) var(--ease-out-sine)
              transform hover:scale-105
            "
          >
            FILMRICK
          </Link>
          
          {/* Navigation items with generous spacing */}
          <div 
            className="
              hidden md:flex items-center 
              gap-[var(--nav-item-gap)]
            "
          >
            <Link 
              href="/" 
              className="
                text-label text-[var(--color-text-secondary)]
                hover:text-[var(--color-text-primary)] 
                transition-all var(--duration-fast) var(--ease-out-sine)
                relative py-[var(--space-sm)]
                after:absolute after:bottom-0 after:left-0 after:right-0
                after:h-[1px] after:bg-[var(--color-accent)]
                after:scale-x-0 after:origin-center
                after:transition-transform var(--duration-normal) var(--ease-out-sine)
                hover:after:scale-x-100
              "
            >
              Home
            </Link>
            <Link 
              href="/galleries" 
              className="
                text-label text-[var(--color-text-secondary)]
                hover:text-[var(--color-text-primary)] 
                transition-all var(--duration-fast) var(--ease-out-sine)
                relative py-[var(--space-sm)]
                after:absolute after:bottom-0 after:left-0 after:right-0
                after:h-[1px] after:bg-[var(--color-accent)]
                after:scale-x-0 after:origin-center
                after:transition-transform var(--duration-normal) var(--ease-out-sine)
                hover:after:scale-x-100
              "
            >
              Galleries
            </Link>
            <Link 
              href="/stories" 
              className="
                text-label text-[var(--color-text-secondary)]
                hover:text-[var(--color-text-primary)] 
                transition-all var(--duration-fast) var(--ease-out-sine)
                relative py-[var(--space-sm)]
                after:absolute after:bottom-0 after:left-0 after:right-0
                after:h-[1px] after:bg-[var(--color-accent)]
                after:scale-x-0 after:origin-center
                after:transition-transform var(--duration-normal) var(--ease-out-sine)
                hover:after:scale-x-100
              "
            >
              Stories
            </Link>
            <Link 
              href="/about" 
              className="
                text-label text-[var(--color-text-secondary)]
                hover:text-[var(--color-text-primary)] 
                transition-all var(--duration-fast) var(--ease-out-sine)
                relative py-[var(--space-sm)]
                after:absolute after:bottom-0 after:left-0 after:right-0
                after:h-[1px] after:bg-[var(--color-accent)]
                after:scale-x-0 after:origin-center
                after:transition-transform var(--duration-normal) var(--ease-out-sine)
                hover:after:scale-x-100
              "
            >
              About
            </Link>
          </div>

          {/* Mobile menu button with proper spacing */}
          <button 
            className="
              md:hidden p-[var(--space-sm)]
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-text-primary)]
              transition-colors var(--duration-fast) var(--ease-out-sine)
            "
            aria-label="Toggle navigation menu"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}