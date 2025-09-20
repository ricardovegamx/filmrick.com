# WOVENPOP - Amigurumi E-commerce Site

## Project Overview
Create a cute amigurumi e-commerce website with patterns and physical dolls, featuring a cozy pastel aesthetic with light purple as the primary color.

## Technology Stack (Based on FILMRICK Success)
- **Next.js 15.5.2** with App Router
- **Tailwind CSS v4** with @tailwindcss/postcss
- **TypeScript** for type safety
- **MDX** for content management with gray-matter
- **Next.js Image** optimization with lazy loading
- **Static generation** for optimal performance

## Site Structure
```
/
├── / (Home)
├── /patterns
├── /patterns/[slug]
├── /physical-dolls
├── /physical-dolls/[slug]
├── /articles
├── /articles/[slug]
├── /about
└── /contract
```

## Content Management Approach
Based on FILMRICK's successful static MDX approach:

### Directory Structure
```
/content
├── /patterns
│   ├── teddy-bear.md
│   ├── bunny-rabbit.md
│   └── ...
├── /physical-dolls
│   ├── custom-teddy.md
│   └── ...
├── /articles
│   ├── beginner-tips.md
│   └── ...
└── /about
    └── bio.md
```

### MDX Metadata Structure
```yaml
---
title: "Cozy Teddy Bear Pattern"
description: "A cuddly teddy bear perfect for beginners"
price: 12.99
stripeLink: "https://buy.stripe.com/..."
difficulty: "Beginner"
estimatedTime: "4-6 hours"
materials: ["Worsted weight yarn", "Fiberfill stuffing", "Safety eyes"]
images: ["teddy-1.jpg", "teddy-2.jpg", "teddy-3.jpg"]
featured: true
category: "Bears"
date: "2024-01-15"
---
```

## Key Lessons from FILMRICK

### 1. Keep It Simple - No Theme Toggle
- **Single light theme only** - no dark mode complexity
- **Clean, readable code** without dual classes
- **Consistent color palette** throughout

### 2. Typography Hierarchy
```css
/* Primary Font: Cozy/Cute (e.g., Quicksand, Comfortaa, or Poppins) */
font-family: 'Quicksand', sans-serif;

/* Secondary Font: Readable serif for content */
font-family: 'Crimson Text', serif;
```

### 3. Component Architecture
Based on FILMRICK's successful patterns:

```typescript
// Product grid component (similar to Gallery component)
<ProductGrid>
  <ProductCard 
    title={pattern.title}
    price={pattern.price}
    image={pattern.featuredImage}
    stripeLink={pattern.stripeLink}
    difficulty={pattern.difficulty}
  />
</ProductGrid>

// Image modal for product galleries
<ImageModal 
  images={product.images}
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
/>
```

### 4. Layout Structure
```typescript
// Clean layout without theme complexity
<main className="min-h-screen bg-purple-50">
  <Navigation />
  <div className="pt-20"> {/* Account for fixed nav */}
    {children}
  </div>
  <Footer />
</main>
```

## Color Palette (Pastel Purple Theme)
```css
/* Primary Colors */
--purple-50: #faf7ff    /* Background */
--purple-100: #f3e8ff   /* Light sections */
--purple-200: #e9d5ff   /* Borders, subtle elements */
--purple-300: #d8b4fe   /* Muted text, placeholders */
--purple-400: #c084fc   /* Secondary buttons */
--purple-500: #a855f7   /* Primary buttons */
--purple-600: #9333ea   /* Hover states */

/* Supporting Pastels */
--pink-100: #fce7f3     /* Accents */
--yellow-100: #fef3c7   /* Highlights */
--green-100: #dcfce7    /* Success states */
```

## Page-Specific Requirements

### Home Page Structure
```typescript
1. Hero Section
   - Large title "WOVENPOP"
   - Subtitle about handmade amigurumi
   - Featured product showcase
   - CTA buttons

2. Patterns Grid (6 items, paginated)
   - Product cards with images
   - Price, difficulty, title
   - "Buy Pattern" button linking to Stripe

3. Physical Dolls Grid (3 items, paginated)
   - Product showcase
   - "Order Custom Doll" buttons

4. Latest Articles (3-4 items)
   - Recent blog posts/tutorials

5. Footer
   - Social links, contact info
   - Quick navigation
```

### Product Pages
```typescript
// Pattern/Physical Doll Detail Page
1. Hero with product title and price
2. Image gallery (clickable, modal view)
3. Product description (MDX content)
4. Purchase button (Stripe link)
5. Materials list / specifications
6. Related products
```

## Critical Implementation Tips from FILMRICK

### 1. Image Optimization
```typescript
// Use Next.js Image with proper sizing
<Image
  src={`/images/products/${product.slug}/${image}`}
  alt={product.title}
  width={400}
  height={400}
  className="aspect-square object-cover"
  quality={90}
  loading="lazy"
/>
```

### 2. Static Generation
```typescript
// Generate static paths for all products
export function generateStaticParams() {
  const patterns = getAllProducts('patterns')
  return patterns.map((pattern) => ({ slug: pattern.slug }))
}
```

### 3. Virtual Pagination
```typescript
// Client-side pagination for better UX
const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 6
const startIndex = (currentPage - 1) * itemsPerPage
const displayedItems = allItems.slice(startIndex, startIndex + itemsPerPage)
```

### 4. Responsive Design
```css
/* Mobile-first approach */
.product-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

.hero-section {
  @apply px-4 md:px-8 lg:px-16 py-12 md:py-24;
}
```

## SEO & Performance (From FILMRICK)
```typescript
// Proper metadata generation
export async function generateMetadata({ params }) {
  return {
    title: `${product.title} - WOVENPOP`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [`/images/products/${product.slug}/${product.featuredImage}`],
    }
  }
}
```

## Navigation Structure
```typescript
<Navigation>
  <Logo>WOVENPOP</Logo>
  <Links>
    <Link href="/">Home</Link>
    <Link href="/patterns">Patterns</Link>
    <Link href="/physical-dolls">Physical Dolls</Link>
    <Link href="/articles">Articles</Link>
    <Link href="/about">About</Link>
    <Link href="/contract">Contract</Link>
  </Links>
</Navigation>
```

## Key Differences from FILMRICK
1. **E-commerce focus** vs. portfolio
2. **Stripe integration** for payments
3. **Product categorization** (patterns vs. physical)
4. **Pagination** for product grids
5. **Cute/cozy aesthetic** vs. minimalist
6. **Pricing display** and purchase CTAs

## Development Workflow
1. **Setup**: Copy FILMRICK's clean foundation (no theme toggle)
2. **Styling**: Implement pastel purple color system
3. **Content**: Create MDX structure for products
4. **Components**: Build ProductCard, ProductGrid, ImageModal
5. **Pages**: Implement home, product detail, category pages
6. **Integration**: Add Stripe payment links
7. **Testing**: Ensure responsive design and performance

## File Structure to Create
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Home)
│   ├── patterns/
│   ├── physical-dolls/
│   ├── articles/
│   ├── about/
│   └── contract/
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ImageModal.tsx
│   └── Pagination.tsx
├── lib/
│   ├── mdx.ts
│   └── products.ts
└── content/
    ├── patterns/
    ├── physical-dolls/
    ├── articles/
    └── about/
```

## Success Metrics to Achieve
- **Fast loading** (< 3s First Contentful Paint)
- **Mobile responsive** across all devices
- **Clean codebase** without unnecessary complexity
- **SEO optimized** for product discovery
- **Smooth user experience** with pagination and modals
- **Easy content management** via MDX files

This approach leverages everything learned from FILMRICK's successful implementation while adapting it for a cute, e-commerce amigurumi site.