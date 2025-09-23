import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { getTranslations } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/MDXContent'

type StoryPageProps = {
  params: Promise<{ slug: string }>
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
      <div className="max-w-5xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 py-16">
        <MDXContent post={post} t={t} />
      </div>
    </main>
  )
}