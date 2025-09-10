import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXContent } from '@/components/MDXContent'
import { generateMetadata as generateSEOMetadata, generateArticleStructuredData } from '@/lib/seo'

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
      <div className="container mx-auto px-4 py-8">
        <MDXContent post={post} />
      </div>
    </main>
  )
}