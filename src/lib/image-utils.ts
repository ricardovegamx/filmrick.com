// Image optimization utilities

export interface ImageConfig {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
}

// Generate optimized image URL for external sources
export function getOptimizedImageUrl(
  src: string,
  config: ImageConfig = {}
): string {
  const { width, height, quality = 80, format = 'webp' } = config
  
  // For Unsplash images, use their optimization parameters
  if (src.includes('images.unsplash.com')) {
    const url = new URL(src)
    
    if (width) url.searchParams.set('w', width.toString())
    if (height) url.searchParams.set('h', height.toString())
    url.searchParams.set('q', quality.toString())
    url.searchParams.set('fm', format)
    url.searchParams.set('fit', 'crop')
    url.searchParams.set('auto', 'format')
    
    return url.toString()
  }
  
  return src
}

// Generate srcSet for responsive images
export function generateSrcSet(
  src: string,
  sizes: number[] = [400, 800, 1200, 1600]
): string {
  return sizes
    .map(size => {
      const optimizedUrl = getOptimizedImageUrl(src, { width: size })
      return `${optimizedUrl} ${size}w`
    })
    .join(', ')
}

// Calculate target file size (aim for ~200-300kb as specified)
export function getOptimalQuality(originalWidth: number): number {
  // Higher quality for smaller images, lower for larger
  if (originalWidth <= 800) return 85
  if (originalWidth <= 1200) return 80
  if (originalWidth <= 1600) return 75
  return 70
}

// Common responsive image sizes for the photography portfolio
export const responsiveImageSizes = {
  gallery: {
    mobile: '(max-width: 768px) 50vw',
    desktop: '(min-width: 769px) 33vw',
    combined: '(max-width: 768px) 50vw, 33vw'
  },
  hero: {
    mobile: '(max-width: 768px) 100vw',
    desktop: '(min-width: 769px) 80vw',
    combined: '(max-width: 768px) 100vw, 80vw'
  },
  thumbnail: {
    combined: '(max-width: 768px) 25vw, 15vw'
  }
}

// Priority loading for above-the-fold images
export function shouldLoadWithPriority(index: number, isHero = false): boolean {
  if (isHero) return true
  // Load first 3 gallery images with priority
  return index < 3
}