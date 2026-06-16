import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];

const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const token =
    request.cookies.get('refreshToken') ||
    request.cookies.get('accessToken');

  const pathname = request.nextUrl.pathname;

  const isPrivate = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublic = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!token && isPrivate) {
    return NextResponse.redirect(
      new URL('/sign-in', request.url)
    );
  }

  if (token && isPublic) {
    return NextResponse.redirect(
      new URL('/profile', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};