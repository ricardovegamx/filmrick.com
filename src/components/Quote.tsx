import { ReactNode } from 'react'

interface QuoteProps {
  children: ReactNode
  author?: string
  source?: string
  variant?: 'default' | 'large' | 'minimal' | 'featured'
  alignment?: 'left' | 'center' | 'right'
}

export function Quote({ 
  children, 
  author, 
  source, 
  variant = 'default',
  alignment = 'left'
}: QuoteProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'large':
        return {
          container: 'py-[var(--section-spacing-md)] md:py-[var(--section-spacing-lg)]',
          quote: 'text-serif-italic text-title md:text-headline leading-relaxed',
          mark: 'text-[4rem] md:text-[6rem] opacity-20',
          spacing: 'pl-[var(--space-generous)] pr-[var(--space-lg)]'
        }
      case 'featured':
        return {
          container: 'py-[var(--section-spacing-lg)] md:py-[var(--section-spacing-xl)] border-y border-[var(--color-border-subtle)]',
          quote: 'text-serif-italic text-headline md:text-display leading-relaxed text-center',
          mark: 'text-[6rem] md:text-[8rem] opacity-15',
          spacing: 'px-[var(--space-comfortable)] md:px-[var(--space-generous)]'
        }
      case 'minimal':
        return {
          container: 'py-[var(--space-generous)]',
          quote: 'text-serif-italic text-body leading-relaxed',
          mark: 'text-[2rem] opacity-25',
          spacing: 'pl-[var(--space-comfortable)] pr-[var(--space-md)]'
        }
      default:
        return {
          container: 'py-[var(--section-spacing-sm)] md:py-[var(--section-spacing-md)]',
          quote: 'text-serif-italic text-lg md:text-xl leading-relaxed',
          mark: 'text-[3rem] md:text-[4rem] opacity-20',
          spacing: 'pl-[var(--space-generous)] pr-[var(--space-comfortable)]'
        }
    }
  }

  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'center':
        return 'text-center mx-auto reading-width'
      case 'right':
        return 'text-right ml-auto reading-width'
      default:
        return 'text-left reading-width'
    }
  }

  const classes = getVariantClasses()
  const isFeatured = variant === 'featured'
  const isCenter = alignment === 'center' || isFeatured

  return (
    <figure 
      className={`
        relative ${classes.container} 
        ${getAlignmentClasses()}
        animate-fade-in
        margin-x-auto max-w-none
      `}
      style={{ 
        animationDelay: '300ms',
        animationFillMode: 'both'
      }}
    >
      <div className="relative">
        {/* Opening Quote Mark */}
        <span 
          className={`
            ${classes.mark} 
            font-serif absolute select-none
            text-[var(--color-text-tertiary)]
            ${isCenter 
              ? 'top-[-1.5rem] md:top-[-2rem] left-1/2 transform -translate-x-1/2' 
              : 'top-[-0.75rem] md:top-[-1rem] left-[-0.75rem] md:left-[-1rem]'
            }
          `}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        
        {/* Quote Content */}
        <blockquote 
          className={`
            relative z-10 
            ${classes.quote}
            text-[var(--color-text-primary)]
            ${classes.spacing}
            transition-colors duration-300
          `}
        >
          {children}
        </blockquote>
        
        {/* Closing Quote Mark */}
        {isFeatured && (
          <span 
            className={`
              ${classes.mark} 
              font-serif absolute select-none
              text-[var(--color-text-tertiary)]
              bottom-[-2.5rem] md:bottom-[-3rem] right-0 transform rotate-180
            `}
            aria-hidden="true"
          >
            &ldquo;
          </span>
        )}
      </div>
      
      {/* Attribution */}
      {(author || source) && (
        <figcaption 
          className={`
            mt-[var(--space-comfortable)] md:mt-[var(--space-generous)] 
            text-caption 
            ${alignment === 'center' ? 'text-center' : 'text-right'}
            transition-all duration-300 hover:opacity-100 opacity-70
            hover:transform hover:translate-y-[-2px]
            px-[var(--space-lg)]
          `}
        >
          {author && (
            <cite className="not-italic font-medium text-[var(--color-text-secondary)]">
              — {author}
            </cite>
          )}
          {source && (
            <span className="ml-2 text-[var(--color-text-tertiary)] italic">
              {source}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}

// Specialized quote variants for easier use
export function FeaturedQuote(props: Omit<QuoteProps, 'variant'>) {
  return <Quote {...props} variant="featured" alignment="center" />
}

export function MinimalQuote(props: Omit<QuoteProps, 'variant'>) {
  return <Quote {...props} variant="minimal" />
}

export function LargeQuote(props: Omit<QuoteProps, 'variant'>) {
  return <Quote {...props} variant="large" />
}

// For easier use in MDX
Quote.Featured = FeaturedQuote
Quote.Minimal = MinimalQuote
Quote.Large = LargeQuote