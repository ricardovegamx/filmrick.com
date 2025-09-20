'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t, language } = useLanguage()

  // Helper function to get localized URL
  const getLocalizedUrl = (path: string) => {
    if (language === 'en') {
      return `/en${path}`
    }
    return path
  }
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Full viewport height with split layout */}
      <section className="relative overflow-hidden h-screen flex items-center" style={{ height: 'calc(100vh - 7rem)' }}>
        {/* Background geometric elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border border-gray-300 rotate-45"></div>
          <div className="absolute top-40 right-20 w-20 h-20 border border-gray-300"></div>
          <div className="absolute bottom-32 left-32 w-24 h-24 border border-gray-300 rotate-12"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-12 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[60vh]">
            
            {/* Left side - Portrait */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
                {/* Portrait placeholder with film frame aesthetic */}
                <div className="w-full h-full bg-gray-100 border-4 border-white shadow-2xl relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-lg uppercase tracking-wide font-sans">Your Portrait</span>
                  </div>
                  {/* Film sprocket holes effect */}
                  <div className="absolute -left-2 top-4 bottom-4 w-4 bg-gray-200 opacity-30"></div>
                  <div className="absolute -right-2 top-4 bottom-4 w-4 bg-gray-200 opacity-30"></div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-8 order-1 lg:order-2">
              {/* Small intro line */}
              <div className="text-center lg:text-left">
                <span className="text-sm uppercase tracking-[0.3em] text-gray-500 font-light font-sans">
                  {t.home.tagline}
                </span>
                <div className="w-12 h-px bg-gray-300 mx-auto lg:mx-0 mt-4"></div>
              </div>
              
              {/* Main content */}
              <div className="text-center lg:text-left space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[-0.02em] text-gray-800 leading-tight font-sans">
                  {t.home.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-serif max-w-2xl mx-auto lg:mx-0">
                  {t.home.description}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href={getLocalizedUrl('/galleries')}
                  className="
                    inline-block px-8 py-4 
                    bg-gray-800 text-white 
                    text-sm uppercase tracking-widest font-light
                    hover:bg-gray-900 hover:shadow-lg
                    transition-all duration-300 ease-out
                    border border-gray-800
                    font-sans
                    text-center
                  "
                >
                  {t.home.viewGalleries}
                </Link>
                <Link 
                  href={getLocalizedUrl('/stories')}
                  className="
                    inline-block px-8 py-4 
                    bg-transparent text-gray-800 
                    text-sm uppercase tracking-widest font-light
                    hover:bg-gray-100 hover:border-gray-900
                    transition-all duration-300 ease-out
                    border border-gray-800
                    font-sans
                    text-center
                  "
                >
                  {t.home.readStories}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="max-w-5xl mx-auto px-12 md:px-16 py-32 md:py-40 border-t border-gray-100">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-800 mb-12 tracking-[-0.01em] font-sans">
            {t.home.featuredWork}
          </h2>
          <p className="text-lg text-gray-700 max-w-lg mx-auto leading-relaxed font-serif">
            {t.home.featuredDescription}
          </p>
        </div>

        {/* Placeholder for featured images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 animate-fade-in">
          {[1, 2, 3].map((index) => (
            <div 
              key={index}
              className="
                group relative aspect-[4/5] 
                bg-gray-50
                border border-gray-100
                transition-all duration-700 ease-out
                hover:border-gray-200
                hover:shadow-2xl hover:shadow-black/10
                hover:transform hover:-translate-y-2
                cursor-pointer
              "
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-400">
                  Gallery {index}
                </span>
              </div>
              <div className="
                absolute inset-0 
                bg-gradient-to-t from-black via-transparent to-transparent
                opacity-0 transition-opacity duration-500
                group-hover:opacity-20
              " />
            </div>
          ))}
        </div>

        <div className="text-center mt-20 md:mt-24 animate-fade-in">
          <Link 
            href={getLocalizedUrl('/galleries')}
            className="
              text-sm font-medium uppercase tracking-wide text-gray-600
              hover:text-black
              transition-colors duration-200
              border-b border-transparent
              hover:border-gray-300
              pb-1
            "
          >
            {t.home.viewAllGalleries}
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-4xl mx-auto px-12 md:px-16 py-32 md:py-48 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center px-0 animate-fade-in">
          <blockquote className="
            text-2xl md:text-4xl italic 
            leading-relaxed
            text-gray-700
            mb-12 md:mb-16 tracking-[-0.01em]
            font-serif
          ">
            &ldquo;{t.home.quote}&rdquo;
          </blockquote>
          <cite className="text-sm uppercase tracking-widest text-gray-500 not-italic font-sans">
            {t.home.quoteAuthor}
          </cite>
        </div>
      </section>
    </main>
  )
}