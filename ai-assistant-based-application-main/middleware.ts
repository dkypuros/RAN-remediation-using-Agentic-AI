import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For development, bypass authentication
  return NextResponse.next();

  /* Original authentication logic (disabled for development)
  // Skip middleware for login page and API routes
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('auth');
  if (!authCookie) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
  */
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/',
    // Add other protected routes
    // Don't add '/login' here as it would create a redirect loop
  ],
};
