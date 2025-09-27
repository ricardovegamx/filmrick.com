import Link from 'next/link'
import Image from 'next/image'
import { getPaginatedPosts } from '@/lib/mdx'
import { getTranslations } from '@/lib/i18n'
import { Pagination } from '@/components/Pagination'

export default function Stories() {
  const { posts: stories, totalPages, currentPage, hasNextPage, hasPreviousPage } = getPaginatedPosts('stories', 1, 6) // Default to Spanish, page 1, 6 posts
  const t = getTranslations()

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-8 leading-tight tracking-headline">
            {t.stories.title}
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          <p className="text-editorial text-gray-700 leading-editorial max-w-3xl mx-auto">
            {t.stories.description}
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24">
          {stories.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-xl font-serif text-gray-600 mb-4">{t.stories.noStories}</p>
              <p className="text-editorial text-gray-500">{t.stories.checkBack}</p>
            </div>
          ) : (
            <div className="grid gap-16 md:gap-24">
              {stories.map((story) => (
                <article key={story.metadata.slug} className="group">
                  <Link href={`/stories/${story.metadata.slug}`}>
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

                      {/* Story Image */}
                      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                        <Image
                          src={`/images/stories/${story.metadata.slug}/hero.jpg`}
                          alt={story.metadata.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
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
                          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors tracking-tight">
                            {story.metadata.title}
                          </h2>
                        </div>

                        <p className="text-editorial text-gray-700 leading-editorial">
                          {story.metadata.description}
                        </p>

                        <div className="pt-4">
                          <span className="inline-flex items-center text-xs font-bold text-gray-900 group-hover:text-gray-700 transition-colors tracking-wider uppercase">
                            {t.stories.readStory}
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