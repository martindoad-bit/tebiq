import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { articles } from '@/lib/db/schema'
import { SEED_ARTICLES } from '@/lib/knowledge/seed-articles'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type ImportResult = 'created' | 'updated' | 'skipped_reviewed'

async function upsertArticle(seed: (typeof SEED_ARTICLES)[number]): Promise<ImportResult> {
  const existing = await db
    .select({
      id: articles.id,
      lastReviewedByName: articles.lastReviewedByName,
    })
    .from(articles)
    .where(eq(articles.slug, seed.slug))
    .limit(1)

  if (existing[0]?.lastReviewedByName) return 'skipped_reviewed'

  const values = {
    title: seed.title,
    slug: seed.slug,
    bodyMarkdown: seed.body,
    category: seed.category,
    status: 'published' as const,
    requiresShoshiReview: seed.requires_shoshi_review,
    lastReviewedByName: null,
    lastReviewedByRegistration: null,
    sourcesCount: seed.sources_count,
    lastVerifiedAt: seed.last_verified_at ? new Date(seed.last_verified_at) : null,
    reviewNotes: seed.review_notes,
    updatedAt: new Date(),
  }

  if (existing[0]) {
    await db.update(articles).set(values).where(eq(articles.id, existing[0].id))
    return 'updated'
  }

  await db.insert(articles).values(values)
  return 'created'
}

export async function POST(request: Request) {
  if (request.headers.get('x-tebiq-seed-confirm') !== 'knowledge-25') {
    return NextResponse.json({ error: 'missing confirmation header' }, { status: 403 })
  }

  const report = {
    seedArticles: SEED_ARTICLES.length,
    created: 0,
    updated: 0,
    skippedReviewed: 0,
  }

  for (const seed of SEED_ARTICLES) {
    const result = await upsertArticle(seed)
    if (result === 'created') report.created += 1
    if (result === 'updated') report.updated += 1
    if (result === 'skipped_reviewed') report.skippedReviewed += 1
  }

  return NextResponse.json(report)
}
