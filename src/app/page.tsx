import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-8">FILMRICK</h1>
          <nav className="space-x-8">
            <Link href="/" className="text-black hover:text-gray-600 font-medium">
              Home
            </Link>
            <Link href="/galleries" className="text-black hover:text-gray-600 font-medium">
              Galleries
            </Link>
            <Link href="/stories" className="text-black hover:text-gray-600 font-medium">
              Stories
            </Link>
            <Link href="/about" className="text-black hover:text-gray-600 font-medium">
              About
            </Link>
          </nav>
        </header>
        <section>
          <p className="text-gray-600">Photography Portfolio - Coming Soon</p>
        </section>
      </div>
    </main>
  )
}