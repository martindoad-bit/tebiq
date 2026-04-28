import { NextRequest, NextResponse } from 'next/server'
import {
  isDevLoginLinksEnabled,
  listUnconsumedDevLoginLinks,
} from '@/lib/db/queries/devLoginLinks'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function isAdmin(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey) return true
  return req.nextUrl.searchParams.get('key') === adminKey
}

export async function GET(req: NextRequest) {
  if (!isDevLoginLinksEnabled() || !isAdmin(req)) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const links = await listUnconsumedDevLoginLinks()
  return NextResponse.json({
    links: links.map(link => ({
      id: link.id,
      email: link.email,
      link: link.link,
      createdAt: link.createdAt.toISOString(),
    })),
  })
}
