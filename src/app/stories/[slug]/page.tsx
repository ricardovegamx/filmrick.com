import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXContent } from '@/components/MDXContent'

interface StoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  const slugs = getPostSlugs('stories')
  return slugs.map((slug) => ({ slug }))
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const post = getPostBySlug('stories', slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <MDXContent post={post} />
      </div>
    </main>
  )
}