import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function Galleries() {
  const galleries = getAllPosts('galleries')

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black mb-8">Galleries</h1>
        {galleries.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {galleries.map((gallery) => (
              <article key={gallery.metadata.slug} className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-black mb-2">
                  <Link 
                    href={`/galleries/${gallery.metadata.slug}`}
                    className="hover:text-gray-600 transition-colors"
                  >
                    {gallery.metadata.title}
                  </Link>
                </h2>
                {gallery.metadata.description && (
                  <p className="text-gray-600 mb-4">{gallery.metadata.description}</p>
                )}
                {gallery.metadata.date && (
                  <time className="text-sm text-gray-500">
                    {new Date(gallery.metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
                {gallery.metadata.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {gallery.metadata.tags.map((tag) => (
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
          <p className="text-gray-600">No galleries available yet.</p>
        )}
      </div>
    </main>
  )
}