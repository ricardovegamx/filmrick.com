import './globals.css'
import { generateMetadata as generateSEOMetadata, generatePhotographyPortfolioStructuredData } from '@/lib/seo'

export const metadata = generateSEOMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generatePhotographyPortfolioStructuredData()
  
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}