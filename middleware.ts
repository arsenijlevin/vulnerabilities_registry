import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@lib/session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/admin', '/manager'];
const publicRoutes = ['/login'];

export default async function middleware(req: NextRequest) {
  console.log('"asdasddassda');

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.find((route) => path.includes(route));
  const isPublicRoute = publicRoutes.find((route) => path.includes(route));

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);
  console.log('cookie', cookie);

  console.log('session', session);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.login) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 6. Redirect to / if the user is authenticated
  if (isPublicRoute) {
    console.log('session?.login', session?.login);
    console.log('req.nextUrl.pathname', req.nextUrl.pathname);

    if (session?.login && !req.nextUrl.pathname.startsWith('/'))
      return NextResponse.redirect(new URL('/', req.nextUrl));

    if (session?.login && session.rights_id.toString() === '1' && !req.nextUrl.pathname.startsWith('/admin'))
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
