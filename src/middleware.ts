import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const hasLoginCookie = request.cookies.has('id')
  const isLoginCurrentPath = request.nextUrl.pathname === '/login'

  if (!hasLoginCookie && !isLoginCurrentPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login/:path*', '/dashboard/:path*'],
}
