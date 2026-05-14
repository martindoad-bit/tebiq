import { NextRequest, NextResponse } from 'next/server'

import { isAdminKeyAccepted } from '@/lib/admin/access-control'

export function middleware(req: NextRequest) {
  const accepted = isAdminKeyAccepted({
    pathname: req.nextUrl.pathname,
    providedKey: req.nextUrl.searchParams.get('key'),
    configuredKey: process.env.ADMIN_KEY,
  })

  if (!accepted) {
    return new NextResponse('Not Found', { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
