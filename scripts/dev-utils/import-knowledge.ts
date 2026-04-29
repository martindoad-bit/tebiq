import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { config as loadEnv } from 'dotenv'
import { eq } from 'drizzle-orm'
import matter from 'gray-matter'
import { normalizeArticleSlug, suggestArticleSlug } from '@/lib/knowledge/slug'

loadEnv({ path: '.env.local', quiet: true })
loadEnv({ quiet: true })

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
  doc_type_tags?: string[] | string
  scenario_tags?: string[] | string
  applies_to?: string[] | string
  urgency_level?: string
  estimated_read_time?: number
  estimated_read_time_minutes?: number
  visa_type?: string
  dimension_key?: string
  dimension_version?: number
  priority?: string
  expiry_days?: number
  questions?: Array<Record<string, unknown>>
  result_logic?: Record<string, unknown>
  result_actions?: Record<string, unknown>
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

function parseFrontmatter(raw: string): ParsedDoc | null {
  if (!raw.startsWith('---')) return null
  const parsed = matter(raw)
  if (Object.keys(parsed.data).length === 0) return null
  return {
    frontmatter: parsed.data as Frontmatter,
    body: parsed.content.replace(/^\s+/, ''),
  }
}

function asDate(value: string | undefined): Date | null {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

function asStringList(value: string[] | string | undefined): string[] | null {
  if (!value) return null
  const items = Array.isArray(value) ? value : value.split(',')
  const cleaned = items.map(item => item.trim()).filter(Boolean)
  return cleaned.length > 0 ? Array.from(new Set(cleaned)) : null
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

function asQuestionList(value: unknown): Array<Record<string, unknown>> | null {
  if (!Array.isArray(value)) return null
  const rows = value.filter(item => item && typeof item === 'object' && !Array.isArray(item)) as Array<Record<string, unknown>>
  return rows.length > 0 ? rows : null
}

function articleStatusFromFrontmatter(value: string | undefined): 'draft' | 'published' {
  const status = value?.trim().toLowerCase()
  if (status === 'draft' || status === 'archived') return 'draft'
  return 'published'
}

async function upsertOne(parsed: ParsedDoc): Promise<'created' | 'updated' | 'skipped'> {
  const { db } = await import('@/lib/db')
  const { articles } = await import('@/lib/db/schema')
  const title = parsed.frontmatter.title?.trim()
  const category =
    parsed.frontmatter.category?.trim() ??
    (parsed.frontmatter.visa_type && parsed.frontmatter.dimension_key ? 'check_dimension' : null)
  const slug =
    normalizeArticleSlug(parsed.frontmatter.slug ?? '') ??
    (title ? suggestArticleSlug(title) : null)
  if (!title || !category || !slug || !parsed.body.trim()) return 'skipped'

  const status = articleStatusFromFrontmatter(parsed.frontmatter.status)
  const sourcesCount =
    typeof parsed.frontmatter.sources_count === 'number'
      ? parsed.frontmatter.sources_count
      : null
  const lastVerifiedAt = asDate(parsed.frontmatter.last_verified_at)
  const docTypeTags = asStringList(parsed.frontmatter.doc_type_tags)
  const scenarioTags = asStringList(parsed.frontmatter.scenario_tags)
  const appliesTo = asStringList(parsed.frontmatter.applies_to)
  const urgencyLevel = parsed.frontmatter.urgency_level?.trim() || null
  const estimatedReadTime =
    typeof parsed.frontmatter.estimated_read_time === 'number'
      ? parsed.frontmatter.estimated_read_time
      : typeof parsed.frontmatter.estimated_read_time_minutes === 'number'
        ? parsed.frontmatter.estimated_read_time_minutes
      : null
  const visaType = parsed.frontmatter.visa_type?.trim() || null
  const dimensionKey = parsed.frontmatter.dimension_key?.trim() || null
  const dimensionVersion =
    typeof parsed.frontmatter.dimension_version === 'number'
      ? parsed.frontmatter.dimension_version
      : null
  const priority = parsed.frontmatter.priority?.trim() || null
  const expiryDays =
    typeof parsed.frontmatter.expiry_days === 'number'
      ? parsed.frontmatter.expiry_days
      : null
  const questions = asQuestionList(parsed.frontmatter.questions)
  const resultLogic = asRecord(parsed.frontmatter.result_logic)
  const resultActions = asRecord(parsed.frontmatter.result_actions)

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
        sourcesCount,
        lastVerifiedAt,
        docTypeTags,
        scenarioTags,
        appliesTo,
        urgencyLevel,
        estimatedReadTime,
        visaType,
        dimensionKey,
        dimensionVersion,
        priority,
        expiryDays,
        questions,
        resultLogic,
        resultActions,
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
    requiresShoshiReview: true,
    sourcesCount,
    lastVerifiedAt,
    docTypeTags,
    scenarioTags,
    appliesTo,
    urgencyLevel,
    estimatedReadTime,
    visaType,
    dimensionKey,
    dimensionVersion,
    priority,
    expiryDays,
    questions,
    resultLogic,
    resultActions,
    reviewNotes: parsed.frontmatter.review_notes?.trim() || null,
  })
  return 'created'
}

async function listMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return listMarkdownFiles(fullPath)
      return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : []
    }),
  )
  return nested.flat().sort()
}

async function main() {
  const report: Report = { created: 0, updated: 0, skipped: 0, skippedFiles: [] }
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not configured. Set it before running import-knowledge.')
    process.exitCode = 1
    return
  }
  let files: string[]
  try {
    files = await listMarkdownFiles(SEED_DIR)
  } catch {
    console.log('docs/knowledge-seed/ 不存在，跳过导入。')
    return
  }

  for (const file of files) {
    const parsed = parseFrontmatter(await readFile(file, 'utf8'))
    const relativePath = path.relative(SEED_DIR, file)
    if (!parsed) {
      report.skipped += 1
      report.skippedFiles.push(relativePath)
      continue
    }
    const result = await upsertOne(parsed)
    if (result === 'created') report.created += 1
    if (result === 'updated') report.updated += 1
    if (result === 'skipped') report.skipped += 1
    if (result === 'skipped') report.skippedFiles.push(relativePath)
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
