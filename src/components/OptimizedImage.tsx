import Image from 'next/image'
import { ComponentProps } from 'react'

interface OptimizedImageProps extends ComponentProps<typeof Image> {
  // Disable download context menu and right-click saving
  disableDownload?: boolean
  // Strip metadata automatically (handled by Next.js optimization)
  stripMetadata?: boolean
  // Target file size optimization
  targetKb?: number
}

export function OptimizedImage({ 
  disableDownload = true,
  stripMetadata = true,
  targetKb = 250,
  quality = 80,
  loading = 'lazy',
  ...props 
}: OptimizedImageProps) {
  
  // Calculate quality based on target file size
  const calculateQuality = (targetSize: number) => {
    if (targetSize <= 200) return 75
    if (targetSize <= 300) return 80
    return 85
  }

  const optimizedQuality = quality || calculateQuality(targetKb)

  const imageProps = {
    ...props,
    quality: optimizedQuality,
    loading,
    style: {
      ...props.style,
      // Disable right-click and drag
      ...(disableDownload && {
        userSelect: 'none' as const,
        pointerEvents: 'auto' as const,
        WebkitUserDrag: 'none' as const,
      })
    },
    onContextMenu: disableDownload ? (e: React.MouseEvent) => e.preventDefault() : undefined,
    onDragStart: disableDownload ? (e: React.DragEvent) => e.preventDefault() : undefined,
  }

  return <Image {...imageProps} alt={props.alt || ""} />
}

// Pre-configured variants for common use cases
export const GalleryOptimizedImage = (props: OptimizedImageProps) => (
  <OptimizedImage 
    {...props}
    targetKb={200}
    quality={80}
    sizes="(max-width: 768px) 50vw, 33vw"
  />
)

export const HeroOptimizedImage = (props: OptimizedImageProps) => (
  <OptimizedImage 
    {...props}
    targetKb={300}
    quality={85}
    priority
    sizes="(max-width: 768px) 100vw, 80vw"
  />
)

export const ThumbnailOptimizedImage = (props: OptimizedImageProps) => (
  <OptimizedImage 
    {...props}
    targetKb={100}
    quality={75}
    sizes="(max-width: 768px) 25vw, 15vw"
  />
)