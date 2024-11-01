import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard)
  const path = request.nextUrl.pathname;
  const isAuthPath = path === '/signin';
  const token = request.cookies.get('auth_token')?.value;

  // If the user is on the signin page and is already authenticated,
  // redirect them to the dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user is not authenticated and trying to access a protected route,
  // redirect them to the signin page
  if (!token && path.startsWith('/dashboard') && !isAuthPath) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

// Configure matcher to only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
