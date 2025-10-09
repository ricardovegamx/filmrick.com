'use client'

import { CldImage } from 'next-cloudinary'
import { useState } from 'react'

interface CloudinaryImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  quality?: string
  sizes?: string
  className?: string
  fill?: boolean
  priority?: boolean
  loading?: 'lazy' | 'eager'
  crop?: string
  gravity?: string
  format?: string
  onLoad?: () => void
  [key: string]: any
}

export function CloudinaryImage({
  quality = 'auto:best',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority,
  loading,
  format,
  crop,
  gravity,
  className,
  alt,
  ...props
}: CloudinaryImageProps) {
  const [hasError, setHasError] = useState(false)
  const cloudinaryQuality = quality === 'best' ? 'auto:best' : quality

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center text-gray-400 p-4">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium">Image not found</span>
        </div>
      </div>
    )
  }

  return (
    <CldImage
      {...props}
      alt={alt}
      className={className}
      quality={cloudinaryQuality}
      sizes={sizes}
      format={format || "auto"}
      loading={priority ? "eager" : (loading || "lazy")}
      onError={() => setHasError(true)}
    />
  )
}