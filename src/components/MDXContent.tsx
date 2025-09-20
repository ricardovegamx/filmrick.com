import { MDXRemote } from 'next-mdx-remote/rsc'
import { Post } from '@/lib/mdx'
import { Gallery, GalleryImage } from '@/components/Gallery'
import { Quote } from '@/components/Quote'

interface MDXContentProps {
  post: Post
}

const components = {
  Gallery,
  GalleryImage,
  Quote,
}

export function MDXContent({ post }: MDXContentProps) {
  return (
    <article className="max-w-none">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extralight text-gray-800 mb-8 tracking-[-0.01em] font-sans">
          {post.metadata.title}
        </h1>
        {post.metadata.description && (
          <p className="text-xl text-gray-600 mb-6 font-serif leading-relaxed">
            {post.metadata.description}
          </p>
        )}
        {post.metadata.date && (
          <time className="text-sm text-gray-500 font-sans uppercase tracking-wider">
            {new Date(post.metadata.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        )}
      </header>
      <div className="
        font-serif text-lg md:text-xl 
        leading-relaxed text-gray-700
        space-y-6
        [&>p]:mb-6 
        [&>p]:leading-relaxed
        [&>em]:italic 
        [&>strong]:font-semibold
        [&>h2]:text-2xl [&>h2]:font-sans [&>h2]:font-light [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-gray-800
        [&>h3]:text-xl [&>h3]:font-sans [&>h3]:font-light [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-gray-800
        [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:my-8
        [&>ul]:space-y-2 [&>ul]:my-6 [&>ul]:pl-6
        [&>ol]:space-y-2 [&>ol]:my-6 [&>ol]:pl-6
        [&_li]:leading-relaxed
      ">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  )
}