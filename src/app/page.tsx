import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container py-[var(--space-5xl)] md:py-[calc(var(--space-5xl)*2)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="
              text-display md:text-[5rem] lg:text-[6rem] 
              font-light tracking-tight
              text-[var(--color-text-primary)]
              mb-[var(--space-2xl)]
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
              mb-[var(--space-4xl)]
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
              flex flex-col sm:flex-row gap-[var(--space-lg)] 
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

      {/* Featured Work Preview */}
      <section className="container py-[var(--space-4xl)]">
        <div className="text-center mb-[var(--space-3xl)]">
          <h2 
            className="
              text-headline font-light 
              text-[var(--color-text-primary)]
              mb-[var(--space-lg)]
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
            gap-[var(--grid-column-gap)]
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
            text-center mt-[var(--space-3xl)]
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

      {/* Philosophy Section */}
      <section 
        className="
          container py-[var(--space-5xl)]
          border-t border-[var(--color-border-subtle)]
        "
      >
        <div 
          className="
            max-w-3xl mx-auto text-center
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
              mb-[var(--space-xl)]
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