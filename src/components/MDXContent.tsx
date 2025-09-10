import { MDXRemote } from 'next-mdx-remote/rsc'
import { Post } from '@/lib/mdx'

interface MDXContentProps {
  post: Post
}

export function MDXContent({ post }: MDXContentProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-4">
          {post.metadata.title}
        </h1>
        {post.metadata.description && (
          <p className="text-xl text-gray-600 mb-4">
            {post.metadata.description}
          </p>
        )}
        {post.metadata.date && (
          <time className="text-sm text-gray-500">
            {new Date(post.metadata.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        )}
        {post.metadata.tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}