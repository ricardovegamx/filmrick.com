import { getTranslations } from '@/lib/i18n'

export default function MyGear() {
  const t = getTranslations('en')
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 tracking-[-0.02em]">
            {t.myGear.title}
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {t.myGear.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24">
          <div className="grid gap-12 md:gap-16">
            
            {/* Cameras Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">{t.myGear.cameras}</h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Main Camera */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Leica IIIF</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">Primary Camera</span>
                    <h3 className="text-lg font-bold text-gray-800">Leica IIIF</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The iconic German 35mm rangefinder. Impeccable build quality and legendary optics for classic street photography.
                  </p>
                </div>

                {/* Point and Shoot */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Olympus XA2</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">Point & Shoot</span>
                    <h3 className="text-lg font-bold text-gray-800">Olympus XA2</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Ultra-portable compact perfect for spontaneous moments. Pocket-sized with surprisingly sharp results.
                  </p>
                </div>

                {/* Medium Format Square */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Yashica Mat LM</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">Medium Format Square</span>
                    <h3 className="text-lg font-bold text-gray-800">Yashica Mat LM</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Twin-lens reflex 6x6. Square composition completely changes perspective and visual storytelling.
                  </p>
                </div>

                {/* Medium Format Wide */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Agfa Billy I</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">Medium Format Wide</span>
                    <h3 className="text-lg font-bold text-gray-800">Agfa Billy I</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Vintage German folding camera 6x9. Panoramic format ideal for landscapes and architecture with nostalgic character.
                  </p>
                </div>

                {/* SLR */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Nikon F3</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">SLR</span>
                    <h3 className="text-lg font-bold text-gray-800">Nikon F3</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nikon&apos;s last professional manual SLR. Robust, reliable, and with an unmatched lens system.
                  </p>
                </div>
              </div>
            </div>

            {/* Lenses Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Lenses</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">50mm f/1.8</h3>
                  <p className="text-gray-600">The classic street photography lens - perfect for natural perspective and low light situations.</p>
                </div>
                
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">28mm f/2.8</h3>
                  <p className="text-gray-600">Wide-angle lens for architectural photography and capturing broader scenes.</p>
                </div>
                
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">85mm f/2.0</h3>
                  <p className="text-gray-600">Portrait lens with beautiful bokeh and compression for intimate photography.</p>
                </div>
              </div>
            </div>

            {/* Favorite Film Rolls Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Favorite Film Rolls</h2>

              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Kodak Tri-X 400</h3>
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">35mm B&W</span>
                  </div>
                  <p className="text-gray-600">The iconic black and white film. Classic grain, generous latitude, and consistent results since 1954.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Fuji Pro 400H</h3>
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">120 Color</span>
                  </div>
                  <p className="text-gray-600">Smooth skin tones and natural colors. Perfect for medium format portraits in natural light.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Ilford HP5 Plus</h3>
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">35mm B&W</span>
                  </div>
                  <p className="text-gray-600">Versatile and reliable for any situation. Excellent for street photography and low light.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Kodak Portra 400</h3>
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">35mm Color</span>
                  </div>
                  <p className="text-gray-600">The gold standard for color portraits. Warm tones and forgiving nature across different lighting conditions.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Cinestill 800T</h3>
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">35mm Color</span>
                  </div>
                  <p className="text-gray-600">Cinema film adapted for photography. Unique halation and excellent night performance.</p>
                </div>
              </div>
            </div>

            {/* Scanner Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Scanner</h2>

              <div className="space-y-4">
                <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Film Scanner</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Details about the scanner you use to digitize your negatives and maintain analog quality in the digital world.
                </p>
              </div>
            </div>

            {/* Accessories Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Essential Accessories</h2>

              <div className="prose prose-gray max-w-none text-gray-600">
                <ul className="space-y-3">
                  <li><strong>Light Meter:</strong> External light meter for precise exposure readings</li>
                  <li><strong>Tripod:</strong> Carbon fiber tripod for long exposures and stability</li>
                  <li><strong>Filters:</strong> UV and polarizing filters for protection and creative control</li>
                  <li><strong>Camera Bag:</strong> Weather-resistant bag for carrying gear safely</li>
                  <li><strong>Lens Cleaning Kit:</strong> Keeping optics clean and dust-free</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}