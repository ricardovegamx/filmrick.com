import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { getTranslations } from '@/lib/i18n'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Gallery, GalleryImage } from '@/components/Gallery'
import { Quote } from '@/components/Quote'

type StoryPageProps = {
  params: Promise<{ slug: string }>
}

const components = {
  Gallery,
  GalleryImage,
  Quote
}

export async function generateStaticParams() {
  const posts = getAllPosts('stories', 'en')
  return posts.map((post) => ({
    slug: post.metadata.slug,
  }))
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const post = getPostBySlug('stories', slug, 'en')
  const t = getTranslations('en')

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-5xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 py-16">

        {/* Article Header */}
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              {post.metadata.title}
            </h1>

            {post.metadata.description && (
              <p className="text-base md:text-lg text-gray-700 leading-[1.3] max-w-[42rem]">
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

        {/* Article Content */}
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
    </main>
  )
}