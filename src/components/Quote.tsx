import { ReactNode } from 'react'

interface QuoteProps {
  children: ReactNode
  author?: string
  source?: string
  variant?: 'default' | 'large' | 'minimal'
}

export function Quote({ 
  children, 
  author, 
  source, 
  variant = 'default' 
}: QuoteProps) {
  const baseClasses = "relative my-8 text-gray-800"
  
  const variantClasses = {
    default: "text-xl italic leading-relaxed",
    large: "text-2xl md:text-3xl font-light leading-relaxed",
    minimal: "text-lg italic leading-relaxed"
  }
  
  const quotationClasses = {
    default: "text-6xl text-gray-300 font-serif",
    large: "text-8xl text-gray-300 font-serif", 
    minimal: "text-4xl text-gray-300 font-serif"
  }

  return (
    <figure className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="relative">
        <span 
          className={`${quotationClasses[variant]} absolute -top-4 -left-2 select-none`}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote className="relative z-10 pl-8">
          {children}
        </blockquote>
      </div>
      {(author || source) && (
        <figcaption className="mt-4 text-sm text-gray-600 text-right">
          {author && <span className="font-medium">— {author}</span>}
          {source && <span className="ml-2 italic">{source}</span>}
        </figcaption>
      )}
    </figure>
  )
}