import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { articles } from '@/lib/db/schema'
import { normalizeArticleSlug, suggestArticleSlug } from '@/lib/knowledge/slug'

interface Frontmatter {
  title?: string
  category?: string
  slug?: string
  status?: string
  requires_shoshi_review?: boolean
  last_reviewed_by_name?: string
  last_reviewed_by_registration?: string
  sources_count?: number
  last_verified_at?: string
  review_notes?: string
}

interface ParsedDoc {
  frontmatter: Frontmatter
  body: string
}

interface Report {
  created: number
  updated: number
  skipped: number
  skippedFiles: string[]
}

const SEED_DIR = path.join(process.cwd(), 'docs/knowledge-seed')

function parseScalar(value: string): string | number | boolean | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (/^\d+$/.test(trimmed)) return Number(trimmed)
  return trimmed.replace(/^["']|["']$/g, '')
}

function parseFrontmatter(raw: string): ParsedDoc | null {
  if (!raw.startsWith('---\n')) return null
  const end = raw.indexOf('\n---', 4)
  if (end === -1) return null
  const fmRaw = raw.slice(4, end).trim()
  const body = raw.slice(end + 4).replace(/^\s+/, '')
  const frontmatter: Record<string, unknown> = {}
  for (const line of fmRaw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf(':')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    const value = parseScalar(trimmed.slice(idx + 1))
    frontmatter[key] = value
  }
  return { frontmatter: frontmatter as Frontmatter, body }
}

function asDate(value: string | undefined): Date | null {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

function articleStatusFromFrontmatter(value: string | undefined): 'draft' | 'published' {
  const status = value?.trim().toLowerCase()
  if (status === 'draft' || status === 'archived') return 'draft'
  return 'published'
}

async function upsertOne(parsed: ParsedDoc): Promise<'created' | 'updated' | 'skipped'> {
  const title = parsed.frontmatter.title?.trim()
  const category = parsed.frontmatter.category?.trim()
  const slug =
    normalizeArticleSlug(parsed.frontmatter.slug ?? '') ??
    (title ? suggestArticleSlug(title) : null)
  if (!title || !category || !slug || !parsed.body.trim()) return 'skipped'

  const requiresShoshiReview = parsed.frontmatter.requires_shoshi_review ?? true
  const status = articleStatusFromFrontmatter(parsed.frontmatter.status)
  const sourcesCount =
    typeof parsed.frontmatter.sources_count === 'number'
      ? parsed.frontmatter.sources_count
      : null
  const lastVerifiedAt = asDate(parsed.frontmatter.last_verified_at)

  const existing = await db
    .select({ id: articles.id })
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1)

  if (existing[0]) {
    await db
      .update(articles)
      .set({
        title,
        category,
        slug,
        bodyMarkdown: parsed.body.trim(),
        status,
        requiresShoshiReview,
        lastReviewedByName: parsed.frontmatter.last_reviewed_by_name?.trim() || null,
        lastReviewedByRegistration:
          parsed.frontmatter.last_reviewed_by_registration?.trim() || null,
        sourcesCount,
        lastVerifiedAt,
        reviewNotes: parsed.frontmatter.review_notes?.trim() || null,
        updatedAt: new Date(),
      })
      .where(eq(articles.id, existing[0].id))
    return 'updated'
  }

  await db.insert(articles).values({
    title,
    category,
    slug,
    bodyMarkdown: parsed.body.trim(),
    status,
    requiresShoshiReview,
    lastReviewedByName: parsed.frontmatter.last_reviewed_by_name?.trim() || null,
    lastReviewedByRegistration:
      parsed.frontmatter.last_reviewed_by_registration?.trim() || null,
    sourcesCount,
    lastVerifiedAt,
    reviewNotes: parsed.frontmatter.review_notes?.trim() || null,
  })
  return 'created'
}

async function main() {
  const report: Report = { created: 0, updated: 0, skipped: 0, skippedFiles: [] }
  let files: string[]
  try {
    files = (await readdir(SEED_DIR)).filter(f => f.endsWith('.md')).sort()
  } catch {
    console.log('docs/knowledge-seed/ 不存在，跳过导入。')
    return
  }

  for (const file of files) {
    const fullPath = path.join(SEED_DIR, file)
    const parsed = parseFrontmatter(await readFile(fullPath, 'utf8'))
    if (!parsed) {
      report.skipped += 1
      report.skippedFiles.push(file)
      continue
    }
    const result = await upsertOne(parsed)
    if (result === 'created') report.created += 1
    if (result === 'updated') report.updated += 1
    if (result === 'skipped') report.skipped += 1
    if (result === 'skipped') report.skippedFiles.push(file)
  }

  console.log(`知识库导入完成：新增 ${report.created} 篇 / 更新 ${report.updated} 篇 / 跳过 ${report.skipped} 篇`)
  if (report.skippedFiles.length > 0) {
    console.log(`跳过文件：${report.skippedFiles.join(', ')}`)
  }
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
