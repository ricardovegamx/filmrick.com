import Image from 'next/image'
import { ReactNode } from 'react'

interface GalleryProps {
  children: ReactNode
}

interface GalleryImageProps {
  src: string
  alt: string
  caption?: string
}

export function Gallery({ children }: GalleryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
      {children}
    </div>
  )
}

export function GalleryImage({ src, alt, caption }: GalleryImageProps) {
  return (
    <figure className="group cursor-pointer">
      <div className="relative aspect-square overflow-hidden bg-gray-100 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
          sizes="(max-width: 768px) 50vw, 33vw"
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