import { MDXRemote } from 'next-mdx-remote/rsc'
import { Post } from '@/lib/mdx'
import { Gallery, GalleryImage, FeaturedGalleryImage } from '@/components/Gallery'
import { Quote } from '@/components/Quote'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { Translations } from '@/lib/i18n'

interface MDXContentProps {
  post: Post
  t: Translations
}

const components = {
  Gallery,
  GalleryImage,
  FeaturedGalleryImage,
  Quote,
  img: (props: any) => (
    <CloudinaryImage
      {...props}
      width={1200}
      height={800}
      quality="best"
      className="w-full h-auto my-8"
    />
  ),
}

export function MDXContent({ post, t }: MDXContentProps) {

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight tracking-headline">
            {post.metadata.title}
          </h1>

          {post.metadata.description && (
            <p className="text-editorial text-gray-700 leading-editorial max-w-[42rem]">
              {post.metadata.description}
            </p>
          )}
        </div>

        {/* Magazine divider */}
        <div className="w-24 h-px bg-gray-300 mt-12 mb-4"></div>

        {/* Byline */}
        <div className="text-sm text-gray-600">
          <span className="font-bold">{t.common.authorName}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span>{t.common.location}</span>
        </div>
      </header>
      <div className="
        max-w-[42rem]
        text-editorial
        leading-editorial text-gray-700
        [&>p]:mb-[1.5em]
        [&>p]:leading-editorial
        [&>em]:italic
        [&>strong]:font-semibold
        [&>h2]:text-xl [&>h2]:md:text-2xl [&>h2]:font-serif [&>h2]:font-bold [&>h2]:mt-[3em] [&>h2]:mb-[1.5em] [&>h2]:text-gray-800 [&>h2]:leading-tight [&>h2]:tracking-headline
        [&>h3]:text-lg [&>h3]:md:text-xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:mt-[2.5em] [&>h3]:mb-[1em] [&>h3]:text-gray-800 [&>h3]:leading-tight [&>h3]:tracking-headline
        [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-6 [&>blockquote]:font-serif [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:my-[2em] [&>blockquote]:leading-editorial [&>blockquote]:text-lg
        [&>ul]:my-[1.5em] [&>ul]:pl-6 [&>ul]:leading-editorial
        [&>ol]:my-[1.5em] [&>ol]:pl-6 [&>ol]:leading-editorial
        [&_li]:mb-[0.5em] [&_li]:leading-editorial
      ">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  )
}