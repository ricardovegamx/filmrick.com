import Link from 'next/link'
import { getPaginatedPosts, getAllPosts } from '@/lib/mdx'
import { Pagination } from '@/components/Pagination'
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 tracking-tight">
            Stories
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Tales from the analog world: camera reviews, darkroom adventures, and reflections on the art of film photography.
          </p>
          <div className="mt-8">
            <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
          </div>
        </div>
      </section>

      {/* Stories List */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24">
          {stories.length > 0 ? (
            <div className="space-y-12">
              {stories.map((story, index) => (
                <article key={story.metadata.slug} className={`
                  group pb-12
                  ${index < stories.length - 1 ? 'border-b border-gray-100' : ''}
                `}>
                  <Link href={`/stories/${story.metadata.slug}`} className="block">
                    <div className="space-y-4">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-gray-600 transition-colors leading-tight tracking-tight">
                        {story.metadata.title}
                      </h2>

                      {story.metadata.description && (
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
                          {story.metadata.description}
                        </p>
                      )}

                      {story.metadata.date && (
                        <time className="block text-sm text-gray-500 font-bold uppercase tracking-ultra-wide">
                          {new Date(story.metadata.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-8">No stories available yet.</p>
              <p className="text-gray-500">Check back soon for tales from the analog world.</p>
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