import { getPostBySlug } from '@/lib/mdx'
import { MDXContent } from '@/components/MDXContent'

export default function About() {
  const bio = getPostBySlug('about', 'bio')

  if (!bio) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-black mb-8">About</h1>
          <p className="text-gray-600">About FILMRICK and photography work.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <MDXContent post={bio} />
      </div>
    </main>
  )
}