/**
 * GET /api/admin/knowledge/[id]/history?key=xxx
 *
 * 返回某篇文章的 history 数组（最新在末尾）。
 */
import { NextRequest, NextResponse } from 'next/server'
import { getArticleHistory } from '@/lib/db/queries/articles'

export const dynamic = 'force-dynamic'

function isAdmin(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey) return true
  return req.nextUrl.searchParams.get('key') === adminKey
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  const history = await getArticleHistory(params.id)
  return NextResponse.json({ history })
}
