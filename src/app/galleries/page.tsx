import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { getTranslations } from '@/lib/i18n'

export default function Galleries() {
  const galleries = getAllPosts('galleries')
  const t = getTranslations()

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-8 leading-tight tracking-tight">
            {t.galleries.title}
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          <p className="text-sm text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {t.galleries.description}
          </p>
        </div>
      </section>

      {/* Galleries Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24">
          {galleries.length > 0 ? (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {galleries.map((gallery) => (
                <article key={gallery.metadata.slug} className="group">
                  <Link href={`/galleries/${gallery.metadata.slug}`} className="block">
                    {/* Featured Image Placeholder */}
                    <div className="relative aspect-[4/5] mb-6 bg-gray-100 border border-gray-200 overflow-hidden group-hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-400 text-sm uppercase tracking-[0.2em] font-bold">{t.common.featuredImage}</span>
                      </div>
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Gallery Info */}
                    <div className="space-y-3">
                      <h2 className="text-lg md:text-xl font-serif font-bold text-gray-800 group-hover:text-gray-600 transition-colors tracking-wide">
                        {gallery.metadata.title}
                      </h2>

                      {gallery.metadata.description && (
                        <p className="text-base text-gray-600 leading-relaxed">
                          {gallery.metadata.description}
                        </p>
                      )}
                      
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl font-serif text-gray-600 mb-8">{t.galleries.noGalleries}</p>
              <p className="text-editorial text-gray-500">{t.galleries.checkBack}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}