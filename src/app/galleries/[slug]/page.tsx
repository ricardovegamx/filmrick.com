import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXContent } from '@/components/MDXContent'

interface GalleryPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  const slugs = getPostSlugs('galleries')
  return slugs.map((slug) => ({ slug }))
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { slug } = await params
  const post = getPostBySlug('galleries', slug)

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