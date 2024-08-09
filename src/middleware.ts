import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: Request) {
  const url = new URL(request.url);
  const isLoginPage = url.pathname === '/login';
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('authToken');

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/search', request.url));
  }

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/search/:path*'],
};
