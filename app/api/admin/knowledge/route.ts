import { NextRequest, NextResponse } from 'next/server'
import {
  listArticlesForAdmin,
  upsertArticle,
  type ArticleStatus,
} from '@/lib/db/queries/articles'

export const dynamic = 'force-dynamic'

function isAdmin(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey) return true
  return req.nextUrl.searchParams.get('key') === adminKey
}

const STATUSES: ArticleStatus[] = ['draft', 'reviewing', 'published']

function parseStatus(value: unknown): ArticleStatus {
  return STATUSES.includes(value as ArticleStatus) ? (value as ArticleStatus) : 'draft'
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  const articles = await listArticlesForAdmin()
  return NextResponse.json({ articles })
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  const body = await req.json()
  const title = String(body?.title ?? '').trim()
  const bodyMarkdown = String(body?.bodyMarkdown ?? '').trim()
  const category = String(body?.category ?? '').trim()
  if (!title || !bodyMarkdown || !category) {
    return NextResponse.json({ error: '请填写标题、正文和分类' }, { status: 400 })
  }

  // autosave 模式不写 history（每 30s 触发，否则 history 会被噪音填满）
  const isAutosave = body?.autosave === true

  const article = await upsertArticle(
    {
      id: body?.id ? String(body.id) : undefined,
      title,
      slug: body?.slug ? String(body.slug) : null,
      bodyMarkdown,
      category,
      status: parseStatus(body?.status),
      requiresShoshiReview: Boolean(body?.requiresShoshiReview),
      lastReviewedAt: body?.lastReviewedAt ? String(body.lastReviewedAt) : null,
      lastReviewedBy: body?.lastReviewedBy ? String(body.lastReviewedBy) : null,
      lastReviewedByName: body?.lastReviewedByName ? String(body.lastReviewedByName) : null,
      lastReviewedByRegistration: body?.lastReviewedByRegistration
        ? String(body.lastReviewedByRegistration)
        : null,
      reviewNotes: body?.reviewNotes ? String(body.reviewNotes) : null,
    },
    { recordHistory: !isAutosave },
  )

  return NextResponse.json({ article, autosaved: isAutosave })
}
