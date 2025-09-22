'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ImageModalProps {
  src: string
  alt: string
  caption?: string
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
  currentIndex?: number
  totalImages?: number
}

export function ImageModal({
  src,
  alt,
  caption,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  currentIndex = 0,
  totalImages = 1
}: ImageModalProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Transition handlers with Japanese Ma timing
  const handleNext = () => {
    if (!onNext || currentIndex >= totalImages - 1 || isTransitioning) return
    setIsTransitioning(true)
    setIsLoaded(false)
    // 150ms delay creates subtle pause - Ma (間) between moments
    setTimeout(() => onNext(), 150)
  }

  const handlePrevious = () => {
    if (!onPrevious || currentIndex <= 0 || isTransitioning) return
    setIsTransitioning(true)
    setIsLoaded(false)
    // 150ms delay creates subtle pause - Ma (間) between moments
    setTimeout(() => onPrevious(), 150)
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowRight':
          if (onNext && currentIndex < totalImages - 1) {
            handleNext()
          }
          break
        case 'ArrowLeft':
          if (onPrevious && currentIndex > 0) {
            handlePrevious()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden' // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, handleNext, handlePrevious, currentIndex, totalImages])

  // Reset loaded state when image changes
  useEffect(() => {
    setIsLoaded(false)
    setIsTransitioning(true)
    // Brief pause to let the fade begin, then reset transitioning
    const timer = setTimeout(() => setIsTransitioning(false), 50)
    return () => clearTimeout(timer)
  }, [src])


  if (!isOpen) return null

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] 
        bg-black/90
        backdrop-blur-md
        flex items-center justify-center
        animate-fade-in
        px-4 md:px-8 lg:px-16
      `}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className={`
          absolute top-8 right-8 z-10
          w-12 h-12 rounded-full
          bg-white/10 hover:bg-white/20
          border border-white/20 hover:border-white/40
          text-white hover:text-white
          flex items-center justify-center
          transition-all duration-300 ease-out
          font-sans text-lg
        `}
        aria-label="Close modal"
      >
        ×
      </button>

      {/* Navigation arrows */}
      {totalImages > 1 && (
        <>
          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrevious()
            }}
            disabled={currentIndex === 0}
            className={`
              absolute left-8 top-1/2 -translate-y-1/2 z-10
              w-12 h-12 rounded-full
              bg-white/10 hover:bg-white/20
              border border-white/20 hover:border-white/40
              text-white hover:text-white
              flex items-center justify-center
              transition-all duration-300 ease-out
              disabled:opacity-30 disabled:cursor-not-allowed
              font-sans text-xl
            `}
            aria-label="Previous image"
          >
            ←
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            disabled={currentIndex === totalImages - 1}
            className={`
              absolute right-8 top-1/2 -translate-y-1/2 z-10
              w-12 h-12 rounded-full
              bg-white/10 hover:bg-white/20
              border border-white/20 hover:border-white/40
              text-white hover:text-white
              flex items-center justify-center
              transition-all duration-300 ease-out
              disabled:opacity-30 disabled:cursor-not-allowed
              font-sans text-xl
            `}
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      {/* Main content area */}
      <div 
        className="
          relative max-w-[90vw] max-h-[90vh] 
          flex flex-col items-center justify-center
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div className="relative max-w-full max-h-[80vh] mb-8">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className={`
              max-w-full max-h-full w-auto h-auto
              object-contain
              transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${isLoaded && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-98'}
            `}
            quality={95}
            priority
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* Caption and metadata */}
        <div className="text-center max-w-2xl px-4">
          {caption && (
            <p className={`
              text-lg md:text-xl font-serif
              text-white/90 leading-relaxed
              mb-4
            `}>
              {caption}
            </p>
          )}
          
          {/* Image counter */}
          {totalImages > 1 && (
            <p className={`
              text-sm font-sans uppercase tracking-widest
              text-white/60
              mb-2
            `}>
              {currentIndex + 1} of {totalImages}
            </p>
          )}

          {/* Navigation hint */}
          <p className={`
            text-xs font-sans uppercase tracking-wide
            text-white/40
          `}>
            Use arrow keys to navigate • ESC to close
          </p>
        </div>
      </div>
    </div>
  )
}