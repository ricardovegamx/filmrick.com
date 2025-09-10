import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // For now, just pass through all requests
  // Full i18n routing will be implemented in a future enhancement
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}