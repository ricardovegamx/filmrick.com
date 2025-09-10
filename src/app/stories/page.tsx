import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function Stories() {
  const stories = getAllPosts('stories')

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black mb-8">Stories</h1>
        {stories.length > 0 ? (
          <div className="space-y-8">
            {stories.map((story) => (
              <article key={story.metadata.slug} className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-black mb-2">
                  <Link 
                    href={`/stories/${story.metadata.slug}`}
                    className="hover:text-gray-600 transition-colors"
                  >
                    {story.metadata.title}
                  </Link>
                </h2>
                {story.metadata.description && (
                  <p className="text-gray-600 mb-4">{story.metadata.description}</p>
                )}
                {story.metadata.date && (
                  <time className="text-sm text-gray-500">
                    {new Date(story.metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
                {story.metadata.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {story.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No stories available yet.</p>
        )}
      </div>
    </main>
  )
}