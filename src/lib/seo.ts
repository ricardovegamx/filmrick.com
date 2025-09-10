import { Metadata } from 'next'

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  locale?: string
}

const defaultSEO = {
  title: 'FILMRICK - Photography Portfolio',
  description: 'Urban landscapes and street photography by FILMRICK. Capturing the intersection of architecture, light, and human presence in modern cities.',
  image: 'https://filmrick.com/og-image.jpg', // Will be created later
  url: 'https://filmrick.com',
  type: 'website' as const,
  author: 'FILMRICK',
  keywords: [
    'photography',
    'urban landscape',
    'street photography',
    'architecture',
    'black and white',
    'Tokyo',
    'Leica',
    'minimalist',
    'portfolio'
  ]
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  locale = 'en'
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | FILMRICK` : defaultSEO.title
  const seoDescription = description || defaultSEO.description
  const seoImage = image || defaultSEO.image
  const seoUrl = url || defaultSEO.url
  const seoKeywords = [...defaultSEO.keywords, ...keywords]
  const seoAuthor = author || defaultSEO.author

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: seoAuthor }],
    creator: seoAuthor,
    publisher: seoAuthor,
    
    // Open Graph
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: 'FILMRICK',
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        }
      ],
      locale: locale,
      type: type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    
    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: '@filmrick', // Replace with actual Twitter handle
    },
    
    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Language and localization
    alternates: {
      canonical: seoUrl,
      languages: {
        'en': seoUrl,
        'es': `${seoUrl}/es`,
      },
    },
    
    // Additional tags
    category: 'Photography',
    classification: 'Photography Portfolio',
  }
}

// Structured data generators
export function generateArticleStructuredData({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author = defaultSEO.author
}: SEOProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    url: url,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FILMRICK',
      logo: {
        '@type': 'ImageObject',
        url: 'https://filmrick.com/logo.png',
      },
    },
  }
}

export function generatePhotographyPortfolioStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'FILMRICK',
    jobTitle: 'Photographer',
    description: 'Urban landscape and street photographer based in Tokyo',
    url: 'https://filmrick.com',
    sameAs: [
      'https://filmrick.substack.com',
      // Add other social media URLs
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Independent',
    },
    knowsAbout: [
      'Photography',
      'Urban Landscape Photography',
      'Street Photography',
      'Architecture Photography',
      'Black and White Photography',
    ],
  }
}