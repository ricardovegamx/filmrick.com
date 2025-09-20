import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Gallery, GalleryImage } from '@/components/Gallery'
import { Quote } from '@/components/Quote'
import { generateMetadata as generateSEOMetadata, generateArticleStructuredData } from '@/lib/seo'

const components = {
  Gallery,
  GalleryImage,
  Quote,
}

interface GalleryPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  const slugs = getPostSlugs('galleries')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: GalleryPageProps) {
  const { slug } = await params
  const post = getPostBySlug('galleries', slug)
  
  if (!post) return {}
  
  return generateSEOMetadata({
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: post.metadata.tags,
    url: `https://filmrick.com/galleries/${slug}`,
    type: 'article',
    publishedTime: post.metadata.date,
  })
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = await params
  const post = getPostBySlug('galleries', slug)

  if (!post) {
    notFound()
  }

  const structuredData = generateArticleStructuredData({
    title: post.metadata.title,
    description: post.metadata.description,
    url: `https://filmrick.com/galleries/${slug}`,
    publishedTime: post.metadata.date,
  })

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-12 md:px-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extralight text-gray-800 mb-8 tracking-[-0.02em] font-sans">
            {post.metadata.title}
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          {post.metadata.description && (
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-serif max-w-3xl mx-auto">
              {post.metadata.description}
            </p>
          )}
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-12 md:px-16">
          <article className="
            font-serif text-lg md:text-xl 
            leading-relaxed text-gray-700
            space-y-8
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
          </article>
        </div>
      </section>
    </main>
  )
}