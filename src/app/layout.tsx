import './globals.css'
import { generateMetadata as generateSEOMetadata, generatePhotographyPortfolioStructuredData } from '@/lib/seo'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ClientLayout } from '@/components/ClientLayout'

export const metadata = generateSEOMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generatePhotographyPortfolioStructuredData()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                             (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}