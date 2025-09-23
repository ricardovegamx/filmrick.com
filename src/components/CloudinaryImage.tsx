'use client'

import { CldImage } from 'next-cloudinary'

export function CloudinaryImage({ quality, ...props }: any) {
  const cloudinaryQuality = quality === 'best' ? 'auto:best' : quality
  return <CldImage {...props} quality={cloudinaryQuality} />
}