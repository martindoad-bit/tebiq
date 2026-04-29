import { config as loadEnv } from 'dotenv'
import { eq } from 'drizzle-orm'
import {
  asStringList,
  readCheckDimensionDocs,
  validateCheckDimensionDoc,
  type CheckDimensionDoc,
} from './check-dimension-content'

loadEnv({ path: '.env.local', quiet: true })
loadEnv({ quiet: true })

interface ImportReport {
  total: number
  created: number
  updated: number
  skipped: number
  failed: number
  skippedFiles: string[]
}

function numberOrNull(value: number | undefined): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function titleOrNull(value: string | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

async function main() {
  const docs = await readCheckDimensionDocs()
  const issues = docs.flatMap(validateCheckDimensionDoc)
  const errors = issues.filter(issue => issue.level === 'error')
  const warnings = issues.filter(issue => issue.level === 'warning')

  if (warnings.length > 0) {
    console.log(`check dimension warnings: ${warnings.length}`)
    for (const issue of warnings.slice(0, 20)) {
      console.log(`- [warning] ${issue.file} ${issue.field}: ${issue.message}`)
    }
    if (warnings.length > 20) console.log(`- ... ${warnings.length - 20} more warnings`)
  }

  if (errors.length > 0) {
    console.error(`check dimension validation failed: ${errors.length} errors`)
    for (const issue of errors) {
      console.error(`- [error] ${issue.file} ${issue.field}: ${issue.message}`)
    }
    process.exitCode = 1
    return
  }

  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not configured. Set it before importing check dimensions.')
    process.exitCode = 1
    return
  }

  const { db } = await import('@/lib/db')
  const { articles } = await import('@/lib/db/schema')

  const report: ImportReport = {
    total: docs.length,
    created: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
    skippedFiles: [],
  }

  for (const doc of docs) {
    const result = await upsertDoc(doc, db, articles).catch(error => {
      report.failed += 1
      console.error(`failed: ${doc.relativePath}`)
      console.error(error)
      return 'failed' as const
    })
    if (result === 'created') report.created += 1
    if (result === 'updated') report.updated += 1
    if (result === 'skipped') {
      report.skipped += 1
      report.skippedFiles.push(doc.relativePath)
    }
  }

  console.log(
    `check dimensions import complete: total ${report.total} / created ${report.created} / updated ${report.updated} / skipped ${report.skipped} / failed ${report.failed}`,
  )
  if (report.skippedFiles.length > 0) {
    console.log(`skipped files: ${report.skippedFiles.join(', ')}`)
  }
  if (report.failed > 0) process.exitCode = 1
}

async function upsertDoc(
  doc: CheckDimensionDoc,
  db: Awaited<typeof import('@/lib/db')>['db'],
  articles: typeof import('@/lib/db/schema')['articles'],
): Promise<'created' | 'updated' | 'skipped'> {
  const fm = doc.frontmatter
  const title = titleOrNull(fm.title)
  const slug = titleOrNull(fm.slug)
  const visaType = titleOrNull(fm.visa_type)
  const dimensionKey = titleOrNull(fm.dimension_key)
  if (!title || !slug || !visaType || !dimensionKey || !doc.body.trim()) return 'skipped'

  const existing = await db
    .select({ id: articles.id })
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1)

  const values = {
    title,
    slug,
    bodyMarkdown: doc.body.trim(),
    category: 'check_dimension',
    status: 'published' as const,
    visibility: 'private' as const,
    requiresShoshiReview: true,
    scenarioTags: asStringList(fm.scenario_tags),
    appliesTo: asStringList(fm.applies_to),
    urgencyLevel: titleOrNull(fm.urgency_level),
    estimatedReadTime: numberOrNull(fm.estimated_read_time_minutes ?? fm.estimated_read_time),
    visaType,
    dimensionKey,
    dimensionVersion: numberOrNull(fm.dimension_version),
    priority: titleOrNull(fm.priority),
    expiryDays: numberOrNull(fm.expiry_days),
    questions: fm.questions ? fm.questions.map(question => ({ ...question })) : null,
    resultLogic: fm.result_logic ? { ...fm.result_logic } : null,
    resultActions: fm.result_actions ? { ...fm.result_actions } : null,
    reviewNotes: `source: docs/knowledge-seed/check-dimensions/${doc.relativePath}`,
    updatedAt: new Date(),
  }

  if (existing[0]) {
    await db.update(articles).set(values).where(eq(articles.id, existing[0].id))
    return 'updated'
  }

  await db.insert(articles).values(values)
  return 'created'
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
