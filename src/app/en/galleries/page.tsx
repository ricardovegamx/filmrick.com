import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function Galleries() {
  const galleries = getAllPosts('galleries')

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-12 md:px-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extralight text-gray-800 mb-8 tracking-[-0.02em] font-sans">
            Galleries
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-serif max-w-3xl mx-auto">
            Collections of moments captured on film, each telling a story through light, shadow, and emotion.
          </p>
        </div>
      </section>

      {/* Galleries Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-12 md:px-16">
          {galleries.length > 0 ? (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {galleries.map((gallery) => (
                <article key={gallery.metadata.slug} className="group">
                  <Link href={`/galleries/${gallery.metadata.slug}`} className="block">
                    {/* Featured Image Placeholder */}
                    <div className="relative aspect-[4/5] mb-6 bg-gray-100 border border-gray-200 overflow-hidden group-hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-400 text-sm uppercase tracking-wide font-sans">Featured Image</span>
                      </div>
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Gallery Info */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-light text-gray-800 group-hover:text-gray-600 transition-colors font-sans">
                        {gallery.metadata.title}
                      </h2>
                      
                      {gallery.metadata.description && (
                        <p className="text-gray-600 leading-relaxed font-serif">
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
              <p className="text-xl text-gray-600 font-serif mb-8">No galleries available yet.</p>
              <p className="text-gray-500 font-serif">Check back soon for new collections of film photography.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}