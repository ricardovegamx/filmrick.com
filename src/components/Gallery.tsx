'use client'

import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { responsiveImageSizes, shouldLoadWithPriority } from '@/lib/image-utils'

interface GalleryProps {
  children: ReactNode
  priority?: boolean
  layout?: 'grid' | 'masonry' | 'featured'
  columns?: 2 | 3 | 4
}

interface GalleryImageProps {
  src: string
  alt: string
  caption?: string
  index?: number
  priority?: boolean
  sizes?: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto'
}

export function Gallery({ 
  children, 
  priority = false, 
  layout = 'grid',
  columns = 3 
}: GalleryProps) {
  const getGridClasses = () => {
    switch (layout) {
      case 'masonry':
        return 'grid-masonry'
      case 'featured':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--grid-column-gap)] auto-rows-fr'
      default:
        const colClass = {
          2: 'grid-cols-1 md:grid-cols-2',
          3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }[columns]
        return `grid ${colClass} gap-[var(--grid-column-gap)]`
    }
  }

  return (
    <section 
      className={`
        ${getGridClasses()}
        py-[var(--space-3xl)]
        animate-fade-in
      `}
      style={{ 
        animationDelay: '200ms',
        animationFillMode: 'both'
      }}
    >
      {children}
    </section>
  )
}

export function GalleryImage({ 
  src, 
  alt, 
  caption, 
  index = 0,
  priority,
  sizes = responsiveImageSizes.gallery.combined,
  aspectRatio = 'auto'
}: GalleryImageProps) {
  const shouldUsePriority = priority ?? shouldLoadWithPriority(index)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square'
      case 'portrait':
        return 'aspect-[4/5]'
      case 'landscape':
        return 'aspect-[5/4]'
      default:
        return 'aspect-[4/5]' // Default to portrait for galleries
    }
  }

  return (
    <figure 
      className="
        group relative cursor-pointer
        animate-fade-in
      "
      style={{ 
        animationDelay: `${index * 100 + 300}ms`,
        animationFillMode: 'both'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          relative ${getAspectRatioClass()} overflow-hidden 
          bg-[var(--color-bg-tertiary)]
          border border-[var(--color-border-subtle)]
          transition-all duration-500 ease-[var(--ease-in-out-circ)]
          group-hover:border-[var(--color-border-default)]
          group-hover:shadow-[var(--shadow-moderate)]
          group-hover:transform group-hover:-translate-y-1
        `}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={shouldUsePriority}
          loading={shouldUsePriority ? 'eager' : 'lazy'}
          className={`
            object-cover transition-all duration-700 ease-[var(--ease-in-out-circ)]
            ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          sizes={sizes}
          quality={85}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Subtle overlay on hover */}
        <div 
          className={`
            absolute inset-0 
            bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent
            opacity-0 transition-opacity duration-500
            ${isHovered ? 'opacity-20' : 'opacity-0'}
          `}
        />
        
        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="
                w-8 h-8 border-2 border-[var(--color-border-default)] 
                border-t-[var(--color-accent)] rounded-full animate-spin
              "
            />
          </div>
        )}
      </div>
      
      {caption && (
        <figcaption 
          className={`
            mt-[var(--space-md)] text-caption text-center
            transition-all duration-300
            ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-70 transform translate-y-1'}
          `}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// Featured Gallery Image for hero sections
export function FeaturedGalleryImage({
  src,
  alt,
  caption,
  priority = true,
  className = ""
}: {
  src: string
  alt: string
  caption?: string
  priority?: boolean
  className?: string
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  return (
    <figure className={`group relative ${className}`}>
      <div 
        className="
          relative aspect-[16/10] overflow-hidden
          bg-[var(--color-bg-tertiary)]
          border border-[var(--color-border-subtle)]
          transition-all duration-700 ease-[var(--ease-in-out-circ)]
          group-hover:border-[var(--color-border-default)]
          group-hover:shadow-[var(--shadow-deep)]
        "
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`
            object-cover transition-all duration-1000 ease-[var(--ease-in-out-circ)]
            ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            group-hover:scale-105
          `}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          quality={90}
          onLoad={() => setIsLoaded(true)}
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="
                w-12 h-12 border-2 border-[var(--color-border-default)] 
                border-t-[var(--color-accent)] rounded-full animate-spin
              "
            />
          </div>
        )}
      </div>
      
      {caption && (
        <figcaption className="mt-[var(--space-lg)] text-body text-center reading-width mx-auto">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// For easier use in MDX
Gallery.Image = GalleryImage
Gallery.Featured = FeaturedGalleryImage