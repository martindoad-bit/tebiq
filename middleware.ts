import { NextRequest, NextResponse } from 'next/server'
import { isAdminKeyAccepted } from '@/lib/admin/access-control'

const ADMIN_COOKIE = 'tebiq_admin_key'
const ADMIN_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8

export function middleware(req: NextRequest) {
  const providedKey = req.nextUrl.searchParams.get('key')
  const configuredKey = process.env.ADMIN_KEY
  const accepted = isAdminKeyAccepted({
    pathname: req.nextUrl.pathname,
    providedKey,
    providedCookieKey: req.cookies.get(ADMIN_COOKIE)?.value,
    configuredKey,
  })

  if (!accepted) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const response = NextResponse.next()
  if (providedKey && configuredKey && providedKey === configuredKey) {
    response.cookies.set({
      name: ADMIN_COOKIE,
      value: providedKey,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: ADMIN_COOKIE_MAX_AGE_SECONDS,
    })
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/internal/:path*', '/api/internal/:path*'],
}
