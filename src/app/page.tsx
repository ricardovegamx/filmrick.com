import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Maximum breathing room */}
      <section 
        className="
          container 
          pt-[var(--section-spacing-xl)] 
          pb-[var(--section-spacing-lg)]
          md:pt-[calc(var(--section-spacing-xl)+var(--nav-height))] 
          md:pb-[var(--section-spacing-xl)]
        "
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="
              text-display md:text-[5rem] lg:text-[6rem] 
              font-light tracking-tight
              text-[var(--color-text-primary)]
              mb-[var(--space-comfortable)] md:mb-[var(--space-generous)]
              animate-fade-in
            "
            style={{ 
              animationDelay: '200ms',
              animationFillMode: 'both'
            }}
          >
            FILMRICK
          </h1>
          
          <p 
            className="
              text-body md:text-lg 
              text-[var(--color-text-secondary)] 
              reading-width mx-auto
              mb-[var(--space-generous)] md:mb-[var(--space-luxurious)]
              animate-fade-in
            "
            style={{ 
              animationDelay: '400ms',
              animationFillMode: 'both'
            }}
          >
            A curated collection of stories told through the lens. 
            Capturing moments that speak beyond words, where light meets emotion 
            and every frame holds a piece of time.
          </p>

          <div 
            className="
              flex flex-col sm:flex-row 
              gap-[var(--space-lg)] sm:gap-[var(--space-comfortable)]
              justify-center items-center
              animate-fade-in
            "
            style={{ 
              animationDelay: '600ms',
              animationFillMode: 'both'
            }}
          >
            <Link 
              href="/galleries"
              className="btn btn-primary"
            >
              View Galleries
            </Link>
            <Link 
              href="/stories"
              className="btn btn-ghost"
            >
              Read Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work Preview - Generous section spacing */}
      <section 
        className="
          container 
          py-[var(--section-spacing-lg)]
          border-t border-[var(--color-border-subtle)]
        "
      >
        <div className="text-center mb-[var(--space-generous)]">
          <h2 
            className="
              text-headline font-light 
              text-[var(--color-text-primary)]
              mb-[var(--space-comfortable)]
              animate-fade-in
            "
            style={{ 
              animationDelay: '800ms',
              animationFillMode: 'both'
            }}
          >
            Featured Work
          </h2>
          <p 
            className="
              text-body text-[var(--color-text-secondary)] 
              reading-width mx-auto
              animate-fade-in
            "
            style={{ 
              animationDelay: '900ms',
              animationFillMode: 'both'
            }}
          >
            Recent explorations in light, shadow, and human connection.
          </p>
        </div>

        {/* Placeholder for featured images */}
        <div 
          className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
            gap-[var(--gallery-gap-lg)] md:gap-[var(--space-generous)]
            animate-fade-in
          "
          style={{ 
            animationDelay: '1000ms',
            animationFillMode: 'both'
          }}
        >
          {[1, 2, 3].map((index) => (
            <div 
              key={index}
              className="
                group relative aspect-[4/5] 
                bg-[var(--color-bg-tertiary)]
                border border-[var(--color-border-subtle)]
                transition-all duration-500 ease-[var(--ease-in-out-circ)]
                hover:border-[var(--color-border-default)]
                hover:shadow-[var(--shadow-moderate)]
                hover:transform hover:-translate-y-1
                cursor-pointer
              "
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-label text-[var(--color-text-tertiary)]">
                  Gallery {index}
                </span>
              </div>
              <div 
                className="
                  absolute inset-0 
                  bg-gradient-to-t from-[var(--color-black)] via-transparent to-transparent
                  opacity-0 transition-opacity duration-500
                  group-hover:opacity-20
                "
              />
            </div>
          ))}
        </div>

        <div 
          className="
            text-center mt-[var(--space-generous)] md:mt-[var(--space-luxurious)]
            animate-fade-in
          "
          style={{ 
            animationDelay: '1200ms',
            animationFillMode: 'both'
          }}
        >
          <Link 
            href="/galleries"
            className="
              text-label text-[var(--color-text-secondary)]
              hover:text-[var(--color-text-primary)]
              transition-colors duration-200
              border-b border-transparent
              hover:border-[var(--color-border-default)]
              pb-1
            "
          >
            View All Galleries →
          </Link>
        </div>
      </section>

      {/* Philosophy Section - Maximum Ma breathing room */}
      <section 
        className="
          container 
          py-[var(--section-spacing-lg)] md:py-[var(--section-spacing-xl)]
          border-t border-[var(--color-border-subtle)]
        "
      >
        <div 
          className="
            max-w-3xl mx-auto text-center
            px-[var(--space-lg)] md:px-0
            animate-fade-in
          "
          style={{ 
            animationDelay: '1400ms',
            animationFillMode: 'both'
          }}
        >
          <blockquote 
            className="
              text-serif-italic text-title md:text-headline 
              leading-relaxed
              text-[var(--color-text-primary)]
              mb-[var(--space-comfortable)] md:mb-[var(--space-generous)]
            "
          >
            &ldquo;Photography is not just about freezing time; 
            it&rsquo;s about understanding the poetry that exists 
            in the space between moments.&rdquo;
          </blockquote>
          <cite className="text-caption text-[var(--color-text-secondary)] not-italic">
            — On the art of seeing
          </cite>
        </div>
      </section>
    </main>
  )
}