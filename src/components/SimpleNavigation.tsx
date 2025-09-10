import Link from 'next/link'

export function SimpleNavigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-xl font-bold text-black">
            FILMRICK
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-black hover:text-gray-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/galleries" 
              className="text-black hover:text-gray-600 transition-colors font-medium"
            >
              Galleries
            </Link>
            <Link 
              href="/stories" 
              className="text-black hover:text-gray-600 transition-colors font-medium"
            >
              Stories
            </Link>
            <Link 
              href="/about" 
              className="text-black hover:text-gray-600 transition-colors font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}