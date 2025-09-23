'use client'

import { ReactNode, useState, useEffect, Children, cloneElement, isValidElement, createContext, useContext } from 'react'
import { responsiveImageSizes, shouldLoadWithPriority } from '@/lib/image-utils'
import { ImageModal } from './ImageModal'
import { CloudinaryImage } from '@/components/CloudinaryImage'

interface GalleryProps {
  children: ReactNode
  priority?: boolean
  layout?: 'grid' | 'masonry' | 'featured'
  columns?: 2 | 3 | 4
}

interface GalleryContextType {
  openModal: (index: number) => void
  images: Array<{ src: string; alt: string; caption?: string }>
}

const GalleryContext = createContext<GalleryContextType | null>(null)

const useGalleryContext = () => {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error('GalleryImage must be used within a Gallery')
  }
  return context
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
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [images, setImages] = useState<Array<{ src: string; alt: string; caption?: string }>>([])

  // Extract image data from children using useEffect
  useEffect(() => {
    const childrenArray = Children.toArray(children)
    
    const imageData = childrenArray
      .filter(child => {
        if (!isValidElement(child)) return false
        // Check if it's a GalleryImage by checking props structure
        return child.props && typeof child.props === 'object' && child.props !== null && 'src' in child.props && 'alt' in child.props
      })
      .map(child => {
        const props = (child as React.ReactElement).props as GalleryImageProps
        return {
          src: props.src,
          alt: props.alt,
          caption: props.caption
        }
      })
    
    setImages(imageData)
  }, [children])

  const openModal = (index: number) => {
    setModalIndex(index)
  }

  const closeModal = () => {
    setModalIndex(null)
  }

  const nextImage = () => {
    if (modalIndex !== null && modalIndex < images.length - 1) {
      setModalIndex(modalIndex + 1)
    }
  }

  const previousImage = () => {
    if (modalIndex !== null && modalIndex > 0) {
      setModalIndex(modalIndex - 1)
    }
  }
  const getGridClasses = () => {
    switch (layout) {
      case 'masonry':
        return 'grid-masonry'
      case 'featured':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 auto-rows-fr'
      default:
        const colClass = {
          2: 'grid-cols-1 md:grid-cols-2',
          3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }[columns]
        return `grid ${colClass} gap-4 md:gap-6 lg:gap-8`
    }
  }

  return (
    <GalleryContext.Provider value={{ openModal, images }}>
      <section 
        className={`
          ${getGridClasses()}
          py-16 md:py-20
          animate-fade-in
        `}
        style={{ 
          animationDelay: '200ms',
          animationFillMode: 'both'
        }}
      >
        {Children.map(children, (child, index) => {
          if (isValidElement(child) && child.type === GalleryImage) {
            return cloneElement(child, { ...(child.props as any), index })
          }
          return child
        })}
      </section>
      
      {/* Modal */}
      {modalIndex !== null && images[modalIndex] && (
        <ImageModal
          src={images[modalIndex].src}
          alt={images[modalIndex].alt}
          caption={images[modalIndex].caption}
          isOpen={modalIndex !== null}
          onClose={closeModal}
          onNext={nextImage}
          onPrevious={previousImage}
          currentIndex={modalIndex}
          totalImages={images.length}
        />
      )}
    </GalleryContext.Provider>
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
  const { openModal } = useGalleryContext()
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
        mb-[var(--space-lg)] last:mb-0
      "
      style={{ 
        animationDelay: `${index * 100 + 300}ms`,
        animationFillMode: 'both'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openModal(index)}
    >
      <div 
        className={`
          relative ${getAspectRatioClass()} overflow-hidden 
          bg-gray-50
          border border-gray-200
          transition-all duration-500 ease-in-out
          group-hover:border-gray-300
          group-hover:shadow-lg
          group-hover:transform group-hover:-translate-y-2
          mb-4
        `}
      >
        <CloudinaryImage
          src={src}
          alt={alt}
          fill
          priority={shouldUsePriority}
          className={`
            object-cover transition-all duration-700 ease-[var(--ease-in-out-circ)]
            ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          sizes={sizes}
          quality="best"
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Subtle overlay on hover */}
        <div 
          className={`
            absolute inset-0 
            bg-gradient-to-t from-black via-transparent to-transparent
            opacity-0 transition-opacity duration-500
            ${isHovered ? 'opacity-20' : 'opacity-0'}
          `}
        />
        
        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="
                w-8 h-8 border-2 border-gray-300 
                border-t-blue-500 rounded-full animate-spin
              "
            />
          </div>
        )}
      </div>
      
      {caption && (
        <figcaption 
          className={`
            mt-8 text-caption text-center
            px-2 reading-width mx-auto
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
    <figure className={`group relative ${className} mb-12`}>
      <div 
        className="
          relative aspect-[16/10] overflow-hidden
          bg-gray-50
          border border-gray-200
          transition-all duration-700 ease-in-out
          group-hover:border-gray-300
          group-hover:shadow-xl
          group-hover:transform group-hover:-translate-y-2
          mb-6
        "
      >
        <CloudinaryImage
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
          quality="best"
          onLoad={() => setIsLoaded(true)}
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="
                w-12 h-12 border-2 border-gray-300 
                border-t-blue-500 rounded-full animate-spin
              "
            />
          </div>
        )}
      </div>
      
      {caption && (
        <figcaption 
          className="
            mt-8 
            text-body text-center reading-width mx-auto
            px-6
            text-gray-600
            transition-colors duration-300
            group-hover:text-black
          "
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// For easier use in MDX
Gallery.Image = GalleryImage
Gallery.Featured = FeaturedGalleryImage