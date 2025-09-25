'use client'

import { CldImage } from 'next-cloudinary'

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
  ...props
}: CloudinaryImageProps) {
  const cloudinaryQuality = quality === 'best' ? 'auto:best' : quality

  return (
    <CldImage
      {...props}
      quality={cloudinaryQuality}
      sizes={sizes}
      format={format || "auto"}
      loading={priority ? "eager" : (loading || "lazy")}
    />
  )
}