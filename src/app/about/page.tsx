import { getPostBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Gallery, GalleryImage } from '@/components/Gallery'
import { Quote } from '@/components/Quote'
import Link from 'next/link'

const components = {
  Gallery,
  GalleryImage,
  Quote,
}

export default function About() {
  const bio = getPostBySlug('about', 'bio')

  if (!bio) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 tracking-tight">
              Acerca de FILMRICK
            </h1>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed text-center max-w-2xl mx-auto">
            Film photographer based in Mexico City, exploring the poetry between moments through analog photography
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extralight text-gray-800 mb-8 tracking-[-0.02em] font-sans">
            Acerca de FILMRICK
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          
          {/* Portrait placeholder */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-12 rounded-full bg-gray-100 border border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center rounded-full">
              <span className="text-gray-400 text-sm uppercase tracking-ultra-wide font-bold">Foto de Retrato</span>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {bio.metadata.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24">
          <article className="
            text-lg md:text-xl
            leading-relaxed text-gray-700
            space-y-6
            [&>p]:mb-6
            [&>p]:leading-relaxed
            [&>em]:italic
            [&>strong]:font-bold
            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-gray-800 [&>h2]:tracking-wide
            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-gray-800 [&>h3]:tracking-wide
            [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:my-8
            [&>ul]:space-y-2 [&>ul]:my-6 [&>ul]:pl-6
            [&>ol]:space-y-2 [&>ol]:my-6 [&>ol]:pl-6
            [&_li]:leading-relaxed
          ">
            <MDXRemote source={bio.content} components={components} />
          </article>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 tracking-wide">
            Conectemos
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Me encantaría escuchar de otros fotógrafos, colaboradores potenciales o cualquier persona interesada en el arte de la fotografía analógica.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="https://filmrick.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block px-8 py-4 
                bg-gray-800 text-white 
                text-sm uppercase tracking-ultra-wide font-bold
                hover:bg-gray-700
                transition-all duration-300 ease-out
                border border-gray-800
               
              "
            >
              Leer en Substack
            </a>
            <Link 
              href="/galleries"
              className="
                inline-block px-8 py-4 
                bg-transparent text-gray-800 
                text-sm uppercase tracking-ultra-wide font-bold
                hover:bg-gray-800 hover:text-white
                transition-all duration-300 ease-out
                border border-gray-800
               
              "
            >
              Ver Galerías
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}