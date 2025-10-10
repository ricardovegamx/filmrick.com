import Link from 'next/link'
import { getPaginatedPosts, getAllPosts } from '@/lib/mdx'
import { Pagination } from '@/components/Pagination'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const allPosts = getAllPosts('stories')
  const totalPages = Math.ceil(allPosts.length / 6)
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString()
  }))
}

interface StoriesPageProps {
  params: Promise<{
    page: string
  }>
}

export default async function StoriesPage({ params }: StoriesPageProps) {
  const resolvedParams = await params
  const pageNumber = parseInt(resolvedParams.page)

  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }

  const { posts: stories, totalPages, currentPage, hasNextPage, hasPreviousPage } = getPaginatedPosts('stories', pageNumber, 6) // Spanish stories

  if (pageNumber > totalPages) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 tracking-tight">
            Historias
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Relatos del mundo analógico: reseñas de cámaras, aventuras en el cuarto oscuro y reflexiones sobre el arte de la fotografía en película.
          </p>
          <div className="mt-8">
            <span className="text-sm text-gray-500">Página {currentPage} de {totalPages}</span>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24">
          {stories.length > 0 ? (
            <div className="grid gap-16 md:gap-24">
              {stories.map((story) => (
                <article key={story.metadata.slug} className="group">
                  <Link href={`/stories/${story.metadata.slug}`}>
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

                      {/* Story Image */}
                      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                        <CloudinaryImage
                          src={`filmrick/stories/${story.metadata.slug}/image-2`}
                          alt={story.metadata.title}
                          fill
                          quality="best"
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                      </div>

                      {/* Story Content */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                            {story.metadata.date && new Date(story.metadata.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors tracking-tight">
                            {story.metadata.title}
                          </h2>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
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
          ) : (
            <div className="text-center py-24">
              <p className="text-sm font-serif text-gray-600 mb-4">Aún no hay historias disponibles.</p>
              <p className="text-sm text-gray-500">Regresa pronto para relatos del mundo analógico.</p>
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