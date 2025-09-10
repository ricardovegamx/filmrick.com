import { NextRequest, NextResponse } from 'next/server'
import { detectLocale, defaultLocale, locales, addLocaleToPath } from './lib/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  // Skip if already has locale or is an asset/api route
  if (
    pathnameHasLocale ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || ''
  const detectedLocale = detectLocale(acceptLanguage)
  
  // Only redirect if detected locale is not the default
  if (detectedLocale !== defaultLocale) {
    const newUrl = new URL(addLocaleToPath(pathname, detectedLocale), request.url)
    return NextResponse.redirect(newUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}