import { getTranslations } from '@/lib/i18n'

export default function MyGear() {
  const t = getTranslations('es')
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 xl:px-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 tracking-tight">
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
              <h2 className="text-3xl font-bold text-gray-800 tracking-ultra-wide">{t.myGear.cameras}</h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Main Camera */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-bold">Leica IIIF</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500 font-bold">Cámara Principal</span>
                    <h3 className="text-lg font-bold text-gray-800 tracking-ultra-wide">Leica IIIF</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    La icónica telemétrica alemana de 35mm. Construcción impecable y ópticas legendarias para fotografía callejera clásica.
                  </p>
                </div>

                {/* Point and Shoot */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-bold">Olympus XA2</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">Point & Shoot</span>
                    <h3 className="text-lg font-bold text-gray-800">Olympus XA2</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Compacta ultraportátil perfecta para momentos espontáneos. Tamaño de bolsillo con resultados sorprendentemente nítidos.
                  </p>
                </div>

                {/* Medium Format Square */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Yashica Mat LM</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">Medio Formato Cuadrado</span>
                    <h3 className="text-lg font-bold text-gray-800">Yashica Mat LM</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Reflex de dos lentes 6x6. La composición cuadrada cambia completamente la perspectiva y narrativa visual.
                  </p>
                </div>

                {/* Medium Format Wide */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Agfa Billy I</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">Medio Formato Ancho</span>
                    <h3 className="text-lg font-bold text-gray-800">Agfa Billy I</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Cámara plegable alemana vintage 6x9. Formato panorámico ideal para paisajes y arquitectura con carácter nostálgico.
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
                    La última SLR manual profesional de Nikon. Robusta, confiable y con un sistema de lentes incomparable.
                  </p>
                </div>
              </div>
            </div>

            {/* Lenses Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Lentes</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">50mm f/1.8</h3>
                  <p className="text-gray-600">El lente clásico de fotografía callejera - perfecto para perspectiva natural y situaciones de poca luz.</p>
                </div>
                
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">28mm f/2.8</h3>
                  <p className="text-gray-600">Lente gran angular para fotografía arquitectónica y capturar escenas más amplias.</p>
                </div>
                
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">85mm f/2.0</h3>
                  <p className="text-gray-600">Lente de retrato con hermoso bokeh y compresión para fotografía íntima.</p>
                </div>
              </div>
            </div>

            {/* Favorite Film Rolls Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Rollos Favoritos</h2>

              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Kodak Tri-X 400</h3>
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">35mm B&W</span>
                  </div>
                  <p className="text-gray-600">La película icónica en blanco y negro. Grano clásico, latitud generosa y resultados consistentes desde 1954.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Fuji Pro 400H</h3>
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">120 Color</span>
                  </div>
                  <p className="text-gray-600">Tonos de piel suaves y colores naturales. Perfecta para retratos en medio formato con luz natural.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Ilford HP5 Plus</h3>
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">35mm B&W</span>
                  </div>
                  <p className="text-gray-600">Versátil y confiable para cualquier situación. Excelente para fotografía callejera y poca luz.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Kodak Portra 400</h3>
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">35mm Color</span>
                  </div>
                  <p className="text-gray-600">El estándar dorado para retratos en color. Tonos cálidos y naturaleza forgiving para diferentes condiciones de luz.</p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Cinestill 800T</h3>
                    <span className="text-xs uppercase tracking-ultra-wide text-gray-500">35mm Color</span>
                  </div>
                  <p className="text-gray-600">Película cinematográfica adaptada para fotografía. Halos únicos y excelente rendimiento nocturno.</p>
                </div>
              </div>
            </div>

            {/* Scanner Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Escáner</h2>

              <div className="space-y-4">
                <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Escáner de Película</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Detalles sobre el escáner que utilizas para digitalizar tus negativos y mantener la calidad analógica en el mundo digital.
                </p>
              </div>
            </div>

            {/* Accessories Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">Accesorios Esenciales</h2>

              <div className="prose prose-gray max-w-none text-gray-600">
                <ul className="space-y-3">
                  <li><strong>Fotómetro:</strong> Fotómetro externo para lecturas precisas de exposición</li>
                  <li><strong>Trípode:</strong> Trípode de fibra de carbono para exposiciones largas y estabilidad</li>
                  <li><strong>Filtros:</strong> Filtros UV y polarizadores para protección y control creativo</li>
                  <li><strong>Bolsa de Cámara:</strong> Bolsa resistente al clima para transportar equipo de forma segura</li>
                  <li><strong>Kit de Limpieza:</strong> Mantener las ópticas limpias y libres de polvo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}