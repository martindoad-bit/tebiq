import { readdir, readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import {
  fallbackDimensionTitle,
  type CanonicalCheckVisa,
  type CheckDimensionDefinition,
} from '@/lib/check/dimensions'
import { plainTextFromMarkdown } from '@/lib/knowledge/markdown'
import { sanitizePublicKnowledgeText } from '@/lib/knowledge/public-text'

const CHECK_DIMENSION_DIRS = [
  'check-dimensions',
  'dimensions-visa-specific',
] as const

export interface StaticCheckDimensionContent {
  id: null
  title: string
  bodyMarkdown: string
  priority: string | null
  expiryDays: number | null
  estimatedReadTime: number | null
  visaType: CanonicalCheckVisa
  dimensionKey: string
  questions: StaticCheckDimensionQuestion[]
  resultLogic: Record<string, string>
  resultActions: Record<string, string[]>
}

export interface StaticCheckDimensionQuestion {
  id?: string
  text?: string
  type?: string
  show_if?: string
  options?: string[]
  choices?: string[]
}

interface StaticCheckDimensionFrontmatter {
  title?: string
  visa_type?: string
  dimension_key?: string
  priority?: string
  expiry_days?: number
  estimated_read_time_minutes?: number
  estimated_read_time?: number
  questions?: Array<Record<string, unknown>>
  result_logic?: Record<string, unknown>
  result_actions?: Record<string, unknown>
}

let cachedDocs: Promise<StaticCheckDimensionContent[]> | null = null

export async function getStaticCheckDimensionContent(
  visaType: CanonicalCheckVisa,
  dimensionKey: string,
): Promise<StaticCheckDimensionContent | null> {
  const docs = await readStaticCheckDimensionDocs()
  return docs.find(doc => doc.visaType === visaType && doc.dimensionKey === dimensionKey) ?? null
}

export async function listStaticCheckDimensionDefinitions(
  visaType: CanonicalCheckVisa,
): Promise<CheckDimensionDefinition[]> {
  const docs = await readStaticCheckDimensionDocs()
  const rows = docs
    .filter(doc => doc.visaType === visaType)
    .sort((a, b) => {
      const priority = priorityRank(a.priority) - priorityRank(b.priority)
      if (priority !== 0) return priority
      return (a.expiryDays ?? 9999) - (b.expiryDays ?? 9999)
    })

  const seen = new Set<string>()
  const definitions: CheckDimensionDefinition[] = []
  for (const row of rows) {
    if (seen.has(row.dimensionKey)) continue
    seen.add(row.dimensionKey)
    definitions.push({
      key: row.dimensionKey,
      title: row.title || fallbackDimensionTitle(row.dimensionKey),
      description: summaryFromBody(row.bodyMarkdown),
      riskFlag: row.priority === 'must_see' ? 'recommended' : null,
      linkedQuestionIds: [],
    })
  }
  return definitions
}

async function readStaticCheckDimensionDocs(): Promise<StaticCheckDimensionContent[]> {
  cachedDocs ??= loadStaticCheckDimensionDocs()
  return cachedDocs
}

async function loadStaticCheckDimensionDocs(): Promise<StaticCheckDimensionContent[]> {
  const docs: StaticCheckDimensionContent[] = []
  for (const dirName of CHECK_DIMENSION_DIRS) {
    const root = path.join(process.cwd(), 'docs/knowledge-seed', dirName)
    const files = await listMarkdownFiles(root).catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return []
      throw error
    })

    for (const filePath of files) {
      const raw = await readFile(filePath, 'utf8')
      const parsed = matter(raw)
      const fm = parsed.data as StaticCheckDimensionFrontmatter
      const doc = normalizeStaticDoc(fm, parsed.content)
      if (doc) docs.push(doc)
    }
  }
  return docs
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

function normalizeStaticDoc(
  fm: StaticCheckDimensionFrontmatter,
  bodyMarkdown: string,
): StaticCheckDimensionContent | null {
  const title = titleOrNull(fm.title)
  const visaType = titleOrNull(fm.visa_type) as CanonicalCheckVisa | null
  const dimensionKey = titleOrNull(fm.dimension_key)
  const resultLogic = normalizeResultLogic(fm.result_logic)
  const resultActions = normalizeResultActions(fm.result_actions)
  if (!title || !visaType || !dimensionKey || resultLogic === null || resultActions === null) return null
  if (!Array.isArray(fm.questions) || fm.questions.length === 0) return null
  const questions = fm.questions.map(normalizeQuestion).filter(Boolean) as StaticCheckDimensionQuestion[]
  if (questions.length === 0) return null

  return {
    id: null,
    title,
    bodyMarkdown: bodyMarkdown.trim(),
    priority: titleOrNull(fm.priority),
    expiryDays: numberOrNull(fm.expiry_days),
    estimatedReadTime: numberOrNull(fm.estimated_read_time_minutes ?? fm.estimated_read_time),
    visaType,
    dimensionKey,
    questions,
    resultLogic,
    resultActions,
  }
}

function normalizeQuestion(question: Record<string, unknown>): StaticCheckDimensionQuestion | null {
  const id = typeof question.id === 'string' ? question.id : undefined
  const text = typeof question.text === 'string' ? question.text : undefined
  if (!id || !text) return null
  return {
    id,
    text,
    type: typeof question.type === 'string' ? question.type : undefined,
    show_if: typeof question.show_if === 'string' ? question.show_if : undefined,
    options: stringArrayOrUndefined(question.options),
    choices: stringArrayOrUndefined(question.choices),
  }
}

function stringArrayOrUndefined(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const rows = value.filter(row => typeof row === 'string' && row.trim()) as string[]
  return rows.length > 0 ? rows : undefined
}

function normalizeResultLogic(value: Record<string, unknown> | undefined): Record<string, string> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const rows = Object.entries(value)
    .filter(([, item]) => typeof item === 'string' && item.trim())
    .map(([key, item]) => [key, item as string] as const)
  return rows.length > 0 ? Object.fromEntries(rows) : null
}

function normalizeResultActions(value: Record<string, unknown> | undefined): Record<string, string[]> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const rows = Object.entries(value).flatMap(([key, item]) => {
    if (!Array.isArray(item)) return []
    const actions = item.filter(row => typeof row === 'string' && row.trim()) as string[]
    return actions.length > 0 ? [[key, actions] as const] : []
  })
  return rows.length > 0 ? Object.fromEntries(rows) : null
}

function titleOrNull(value: string | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

function numberOrNull(value: number | undefined): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function priorityRank(value: string | null): number {
  if (value === 'must_see') return 0
  if (value === 'should_see') return 1
  return 2
}

function summaryFromBody(markdown: string | null): string {
  const text = sanitizePublicKnowledgeText(plainTextFromMarkdown(markdown ?? ''))
  const withoutTitle = text.replace(/^.+?这是什么\s*/, '')
  const summary = (withoutTitle || text).slice(0, 72).trim()
  return summary || '按该项确认递交前材料和记录。'
}
