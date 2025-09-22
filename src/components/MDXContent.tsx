import { MDXRemote } from 'next-mdx-remote/rsc'
import { Post } from '@/lib/mdx'
import { Gallery, GalleryImage, FeaturedGalleryImage } from '@/components/Gallery'
import { Quote } from '@/components/Quote'

interface MDXContentProps {
  post: Post
}

const components = {
  Gallery,
  GalleryImage,
  FeaturedGalleryImage,
  Quote,
}

export function MDXContent({ post }: MDXContentProps) {
  return (
    <article className="max-w-none">
      <header className="mb-16 md:mb-20">
        {/* Magazine metadata */}
        {post.metadata.date && (
          <div className="text-xs uppercase tracking-ultra-wide text-gray-500 font-bold mb-8">
            {new Date(post.metadata.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        )}

        {/* Magazine headline */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
            {post.metadata.title}
          </h1>

          {post.metadata.description && (
            <p className="text-lg md:text-xl text-gray-700 leading-[1.3] max-w-[42rem]">
              {post.metadata.description}
            </p>
          )}
        </div>

        {/* Magazine divider */}
        <div className="w-24 h-px bg-gray-300 mt-12 mb-4"></div>

        {/* Byline */}
        <div className="text-sm text-gray-600">
          <span className="font-bold">Rick Vega</span>
          <span className="mx-2 text-gray-400">•</span>
          <span>Mexico City</span>
        </div>
      </header>
      <div className="
        max-w-[42rem]
        text-sm md:text-base
        leading-[1.3] text-gray-700
        [&>p]:mb-[1.5em]
        [&>p]:leading-[1.3]
        [&>em]:italic
        [&>strong]:font-bold
        [&>h2]:text-lg [&>h2]:font-bold [&>h2]:mt-[3em] [&>h2]:mb-[1.5em] [&>h2]:text-gray-800 [&>h2]:leading-[1.2]
        [&>h3]:text-base [&>h3]:font-bold [&>h3]:mt-[2.5em] [&>h3]:mb-[1em] [&>h3]:text-gray-800 [&>h3]:leading-[1.2]
        [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:my-[2em] [&>blockquote]:leading-[1.4]
        [&>ul]:my-[1.5em] [&>ul]:pl-6 [&>ul]:leading-[1.3]
        [&>ol]:my-[1.5em] [&>ol]:pl-6 [&>ol]:leading-[1.3]
        [&_li]:mb-[0.5em] [&_li]:leading-[1.3]
      ">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  )
}