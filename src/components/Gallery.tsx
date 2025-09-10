import Image from 'next/image'
import { ReactNode } from 'react'
import { responsiveImageSizes, shouldLoadWithPriority } from '@/lib/image-utils'

interface GalleryProps {
  children: ReactNode
  priority?: boolean
}

interface GalleryImageProps {
  src: string
  alt: string
  caption?: string
  index?: number
  priority?: boolean
  sizes?: string
}

export function Gallery({ children, priority = false }: GalleryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
      {children}
    </div>
  )
}

export function GalleryImage({ 
  src, 
  alt, 
  caption, 
  index = 0,
  priority,
  sizes = responsiveImageSizes.gallery.combined 
}: GalleryImageProps) {
  const shouldUsePriority = priority ?? shouldLoadWithPriority(index)
  
  return (
    <figure className="group cursor-pointer">
      <div className="relative aspect-square overflow-hidden bg-gray-100 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={src}
          alt={alt}
          fill
          priority={shouldUsePriority}
          loading={shouldUsePriority ? 'eager' : 'lazy'}
          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
          sizes={sizes}
          quality={80}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// For easier use in MDX
Gallery.Image = GalleryImage