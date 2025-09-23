import Link from 'next/link'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { getAllPosts } from '@/lib/mdx'
import { getTranslations } from '@/lib/i18n'

export default function Home() {
  // Get English content
  const galleries = getAllPosts('galleries', 'en')
  const stories = getAllPosts('stories', 'en')
  const latestStory = stories[0] // Get the most recent story

  // Get English translations
  const t = getTranslations('en')

  // Helper function to get localized URL (English = /en prefix)
  const getLocalizedUrl = (path: string) => {
    return `/en${path}`
  }
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Magazine Editorial */}
      <section className="relative min-h-screen flex items-center bg-white" style={{ minHeight: 'calc(100vh - 7rem)' }}>

        <div className="max-w-7xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[70vh]">

            {/* Portrait - Magazine style */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">

                  {/* Rick's Portrait */}
                  <CloudinaryImage
                    src="filmrick/rick"
                    alt={t.common.filmPhotographerAlt}
                    fill
                    priority
                    quality="best"
                    sizes="100vw"
                    className="object-cover grayscale"
                  />

                  {/* Film strip edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-black opacity-5">
                    <div className="h-full flex flex-col justify-between py-4">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-full h-1 bg-white opacity-60"></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Photo credit */}
                <div className="absolute -bottom-8 right-0 text-xs text-gray-400 font-bold tracking-ultra-wide uppercase">
                  35mm / Tri-X 400
                </div>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="order-2 lg:order-1 space-y-8">

              {/* Magazine header */}
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-ultra-wide text-gray-500 font-bold">
                  {t.home.tagline}
                </div>
                <div className="w-12 h-px bg-black"></div>
              </div>

              {/* Magazine headline */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] tracking-tight">
                  {t.home.title}
                </h1>

                {/* Editorial subtitle */}
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
                  {t.home.description}
                </p>
              </div>

              {/* Magazine-style byline */}
              <div className="pt-4">
                <div className="text-sm text-gray-600">
                  <span className="font-bold">{t.common.authorName}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span>{t.common.location}</span>
                </div>
              </div>

              {/* Editorial navigation */}
              <div className="pt-8 space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={getLocalizedUrl('/galleries')}
                    className="
                      inline-flex items-center px-8 py-3
                      bg-black text-white
                      text-sm font-bold
                      hover:bg-gray-800
                      transition-all duration-300
                     
                    "
                  >
                    {t.home.viewGalleries}
                  </Link>

                  <Link
                    href={getLocalizedUrl('/stories')}
                    className="
                      inline-flex items-center px-8 py-3
                      bg-white text-black border border-black
                      text-sm font-bold
                      hover:bg-gray-50
                      transition-all duration-300
                     
                    "
                  >
                    {t.home.readStories}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Work Preview - Premium Editorial Grid */}
      <section className="max-w-7xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 py-32 md:py-40 border-t border-gray-100">
        {/* Section Header */}
        <div className="mb-24 md:mb-32">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight tracking-headline mb-6">
            {t.home.featuredWork}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            {t.home.featuredDescription}
          </p>
        </div>

        {/* Premium Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 auto-rows-[280px]">
          {galleries.slice(0, 6).map((gallery, index) => {
            const layoutClasses = [
              'lg:col-span-7 lg:row-span-2',
              'lg:col-span-5 lg:row-span-1',
              'lg:col-span-5 lg:row-span-1',
              'lg:col-span-4 lg:row-span-2',
              'lg:col-span-4 lg:row-span-1',
              'lg:col-span-4 lg:row-span-1',
            ][index] || 'lg:col-span-4'

            return (
              <article
                key={gallery.metadata.slug}
                className={`group relative ${layoutClasses}`}
                style={{
                  animation: `galleryReveal 800ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms both`
                }}
              >
                <Link href={getLocalizedUrl(`/galleries/${gallery.metadata.slug}`)} className="flex flex-col h-full">
                  <div className="relative flex-1 bg-white p-3 md:p-4 shadow-sm">

                    <div className="absolute top-6 left-6 z-20 text-[10px] font-mono tracking-wider text-white mix-blend-difference">
                      {String(index + 1).padStart(2, '0')}A
                    </div>

                    <div className="relative h-full overflow-hidden border border-gray-200/50 bg-gray-50">
                      <div className="relative h-full">
                        <CloudinaryImage
                          src="filmrick/galleries/portraits"
                          alt={gallery.metadata.title}
                          fill
                          quality="best"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover grayscale"
                        />

                        <div
                          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
                          }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="space-y-3">
                          <h3 className="text-xl md:text-2xl font-serif font-normal text-white leading-tight tracking-tight">
                            {gallery.metadata.title}
                          </h3>
                          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-white/80 font-bold">
                            <span>35MM</span>
                            <span className="w-1 h-1 rounded-full bg-white/50"></span>
                            <span>TRI-X 400</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        <div className="mt-24 md:mt-32 flex justify-center">
          <Link
            href={getLocalizedUrl('/galleries')}
            className="inline-flex items-center gap-4 px-8 py-4 border border-black bg-white text-black"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              {t.home.viewAllGalleries}
            </span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Featured Story Section */}
      {latestStory && (
        <section className="max-w-7xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 py-24 md:py-32 border-t border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 tracking-[-0.01em]">
              {t.home.featuredStory}
            </h2>
            <p className="text-base text-gray-600">
              {t.home.latestFromBlog}
            </p>
          </div>

          <article className="max-w-5xl mx-auto">
            <Link href={getLocalizedUrl(`/stories/${latestStory.metadata.slug}`)}>
              <div className="group grid md:grid-cols-2 gap-12 md:gap-16 items-center">

                {/* Story Image */}
                <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                  <CloudinaryImage
                    src="filmrick/stories/1/hero"
                    alt={latestStory.metadata.title}
                    fill
                    quality="best"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                </div>

                {/* Story Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-xs uppercase tracking-ultra-wide text-gray-500">
                      {latestStory.metadata.date && new Date(latestStory.metadata.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                      {latestStory.metadata.title}
                    </h3>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    {latestStory.metadata.description}
                  </p>

                  <div className="pt-4">
                    <span className="inline-flex items-center text-sm font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {t.home.readFullStory}
                      <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          </article>
        </section>
      )}

      {/* Philosophy Section */}
      <section className="max-w-5xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 py-32 md:py-48 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center px-0 animate-fade-in">
          <blockquote className="
            text-2xl md:text-4xl italic 
            leading-relaxed
            text-gray-700
            mb-12 md:mb-16 tracking-[-0.01em]
           
          ">
            &ldquo;{t.home.quote}&rdquo;
          </blockquote>
          <cite className="text-sm uppercase tracking-ultra-wide text-gray-500 not-italic">
            {t.home.quoteAuthor}
          </cite>
        </div>
      </section>
    </main>
  )
}