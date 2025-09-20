import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXContent } from '@/components/MDXContent'
import { generateMetadata as generateSEOMetadata, generateArticleStructuredData } from '@/lib/seo'

interface StoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  const slugs = getPostSlugs('stories')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params
  const post = getPostBySlug('stories', slug)
  
  if (!post) return {}
  
  return generateSEOMetadata({
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: post.metadata.tags,
    url: `https://filmrick.com/stories/${slug}`,
    type: 'article',
    publishedTime: post.metadata.date,
  })
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const post = getPostBySlug('stories', slug)

  if (!post) {
    notFound()
  }

  const structuredData = generateArticleStructuredData({
    title: post.metadata.title,
    description: post.metadata.description,
    url: `https://filmrick.com/stories/${slug}`,
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
      <div className="max-w-4xl mx-auto px-12 md:px-16 py-16">
        <MDXContent post={post} />
      </div>
    </main>
  )
}