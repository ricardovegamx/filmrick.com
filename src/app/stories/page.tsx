import Link from 'next/link'
import { getPaginatedPosts } from '@/lib/mdx'
import { Pagination } from '@/components/Pagination'

export default function Stories() {
  const { posts: stories, totalPages, currentPage, hasNextPage, hasPreviousPage } = getPaginatedPosts('stories', 1, 6) // Default to Spanish, page 1, 6 posts

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 tracking-tight">
            Historias
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Relatos del mundo analógico: reseñas de cámaras, aventuras en el cuarto oscuro y reflexiones sobre el arte de la fotografía en película.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24">
          {stories.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-lg text-gray-600 mb-4">Aún no hay historias disponibles.</p>
              <p className="text-gray-500">Regresa pronto para nuevos relatos del mundo analógico.</p>
            </div>
          ) : (
            <div className="grid gap-16 md:gap-24">
              {stories.map((story) => (
                <article key={story.metadata.slug} className="group">
                  <Link href={`/stories/${story.metadata.slug}`}>
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

                      {/* Story Image */}
                      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                        <img
                          src={`/images/stories/${story.metadata.slug}/hero.jpg`}
                          alt={story.metadata.title}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                      </div>

                      {/* Story Content */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="text-xs uppercase tracking-ultra-wide text-gray-500 font-bold">
                            {story.metadata.date && new Date(story.metadata.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors tracking-tight">
                            {story.metadata.title}
                          </h2>
                        </div>

                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                          {story.metadata.description}
                        </p>

                        <div className="pt-4">
                          <span className="inline-flex items-center text-xs font-bold text-gray-900 group-hover:text-gray-700 transition-colors tracking-wider uppercase">
                            Leer Historia
                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                          </span>
                        </div>
                      </div>

                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/stories"
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        </div>
      </section>
    </main>
  )
}