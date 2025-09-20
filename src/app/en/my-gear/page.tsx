export default function MyGear() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-12 md:px-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extralight text-gray-800 mb-8 tracking-[-0.02em] font-sans">
            My Gear
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-serif max-w-3xl mx-auto">
            The cameras, lenses, and tools that help me capture the poetry of everyday moments on film.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-12 md:px-16">
          <div className="grid gap-12 md:gap-16">
            
            {/* Cameras Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-light text-gray-800 font-sans">Cameras</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-sans">Camera Photo</span>
                  </div>
                  <h3 className="text-xl font-light text-gray-800 font-sans">Primary Camera</h3>
                  <p className="text-gray-600 font-serif leading-relaxed">
                    Details about your main film camera, why you chose it, and what makes it special for your photography.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="aspect-[4/3] bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-sans">Camera Photo</span>
                  </div>
                  <h3 className="text-xl font-light text-gray-800 font-sans">Secondary Camera</h3>
                  <p className="text-gray-600 font-serif leading-relaxed">
                    Your backup or specialized camera for different situations and photographic approaches.
                  </p>
                </div>
              </div>
            </div>

            {/* Lenses Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-light text-gray-800 font-sans">Lenses</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-light text-gray-800 font-sans mb-2">50mm f/1.8</h3>
                  <p className="text-gray-600 font-serif">The classic street photography lens - perfect for natural perspective and low light situations.</p>
                </div>
                
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-light text-gray-800 font-sans mb-2">28mm f/2.8</h3>
                  <p className="text-gray-600 font-serif">Wide-angle lens for architectural photography and capturing broader scenes.</p>
                </div>
                
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-light text-gray-800 font-sans mb-2">85mm f/2.0</h3>
                  <p className="text-gray-600 font-serif">Portrait lens with beautiful bokeh and compression for intimate photography.</p>
                </div>
              </div>
            </div>

            {/* Film Stock Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-light text-gray-800 font-sans">Favorite Film Stocks</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 border border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-light text-gray-800 font-sans mb-2">Kodak Tri-X 400</h3>
                  <p className="text-sm text-gray-600 font-serif">Classic black and white film with beautiful grain and wide exposure latitude.</p>
                </div>
                
                <div className="p-6 border border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-light text-gray-800 font-sans mb-2">Fuji Pro 400H</h3>
                  <p className="text-sm text-gray-600 font-serif">Color negative film with smooth skin tones and natural color rendition.</p>
                </div>
                
                <div className="p-6 border border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-light text-gray-800 font-sans mb-2">Ilford HP5 Plus</h3>
                  <p className="text-sm text-gray-600 font-serif">Versatile black and white film, great for street photography and portraits.</p>
                </div>
              </div>
            </div>

            {/* Accessories Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-light text-gray-800 font-sans">Essential Accessories</h2>
              
              <div className="prose prose-gray max-w-none font-serif text-gray-600">
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