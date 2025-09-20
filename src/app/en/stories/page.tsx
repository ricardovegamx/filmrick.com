import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function Stories() {
  const stories = getAllPosts('stories')

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-12 md:px-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extralight text-gray-800 mb-8 tracking-[-0.02em] font-sans">
            Stories
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-serif max-w-3xl mx-auto">
            Tales from the analog world: camera reviews, darkroom adventures, and reflections on the art of film photography.
          </p>
        </div>
      </section>

      {/* Stories List */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-12 md:px-16">
          {stories.length > 0 ? (
            <div className="space-y-12">
              {stories.map((story, index) => (
                <article key={story.metadata.slug} className={`
                  group pb-12
                  ${index < stories.length - 1 ? 'border-b border-gray-100' : ''}
                `}>
                  <Link href={`/stories/${story.metadata.slug}`} className="block">
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-4xl font-light text-gray-800 group-hover:text-gray-600 transition-colors font-sans leading-tight">
                        {story.metadata.title}
                      </h2>
                      
                      {story.metadata.description && (
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-serif max-w-3xl">
                          {story.metadata.description}
                        </p>
                      )}
                      
                      {story.metadata.date && (
                        <time className="block text-sm text-gray-500 font-sans uppercase tracking-wider">
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
              <p className="text-xl text-gray-600 font-serif mb-8">No stories available yet.</p>
              <p className="text-gray-500 font-serif">Check back soon for tales from the analog world.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}