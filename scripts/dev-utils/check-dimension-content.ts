import { readdir, readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export const CHECK_DIMENSION_DIR = path.join(
  process.cwd(),
  'docs/knowledge-seed/check-dimensions',
)

export const CHECK_DIMENSION_VISA_TYPES = [
  'technical_humanities_international',
  'management',
  'spouse',
  'permanent_resident_preparation',
  'specified_skilled_worker',
] as const

export const CHECK_DIMENSION_URGENCY_LEVELS = ['low', 'medium', 'high'] as const
export const CHECK_DIMENSION_PRIORITIES = ['must_see', 'should_see', 'normal'] as const
export const CHECK_DIMENSION_RESULT_LEVELS = ['green', 'yellow', 'red'] as const

const FRONTMATTER_FORBIDDEN_TERMS = [
  '一定通过',
  '一定被拒',
  '拒签概率',
  '高危',
  '危险',
  '保证',
]

const BODY_WARNING_TERMS = FRONTMATTER_FORBIDDEN_TERMS

export type CheckDimensionVisaType = typeof CHECK_DIMENSION_VISA_TYPES[number]
export type CheckDimensionResultLevel = typeof CHECK_DIMENSION_RESULT_LEVELS[number]

export interface CheckDimensionQuestion {
  id?: string
  text?: string
  type?: string
  show_if?: string
  options?: unknown
}

export interface CheckDimensionFrontmatter {
  slug?: string
  title?: string
  visa_type?: string
  dimension_key?: string
  dimension_version?: number
  priority?: string
  expiry_days?: number
  estimated_read_time_minutes?: number
  estimated_read_time?: number
  scenario_tags?: string[] | string
  applies_to?: string[] | string
  urgency_level?: string
  questions?: CheckDimensionQuestion[]
  result_logic?: Partial<Record<CheckDimensionResultLevel, string>>
  result_actions?: Partial<Record<CheckDimensionResultLevel, string[]>>
}

export interface CheckDimensionDoc {
  filePath: string
  relativePath: string
  frontmatter: CheckDimensionFrontmatter
  body: string
}

export interface ValidationIssue {
  file: string
  field: string
  message: string
  level: 'error' | 'warning'
}

export async function listMarkdownFiles(dir: string): Promise<string[]> {
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

export async function readCheckDimensionDocs(): Promise<CheckDimensionDoc[]> {
  const files = await listMarkdownFiles(CHECK_DIMENSION_DIR)
  const docs: CheckDimensionDoc[] = []
  for (const filePath of files) {
    const raw = await readFile(filePath, 'utf8')
    const parsed = matter(raw)
    docs.push({
      filePath,
      relativePath: path.relative(CHECK_DIMENSION_DIR, filePath),
      frontmatter: parsed.data as CheckDimensionFrontmatter,
      body: parsed.content.replace(/^\s+/, ''),
    })
  }
  return docs
}

export function asStringList(value: string[] | string | undefined): string[] | null {
  if (!value) return null
  const items = Array.isArray(value) ? value : value.split(',')
  const cleaned = items.map(item => item.trim()).filter(Boolean)
  return cleaned.length > 0 ? Array.from(new Set(cleaned)) : null
}

export function isAllowedVisaType(value: string | undefined): value is CheckDimensionVisaType {
  return CHECK_DIMENSION_VISA_TYPES.includes(value as CheckDimensionVisaType)
}

export function validateCheckDimensionDoc(doc: CheckDimensionDoc): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const fm = doc.frontmatter

  requiredString(issues, doc.relativePath, 'slug', fm.slug)
  requiredString(issues, doc.relativePath, 'title', fm.title)
  requiredString(issues, doc.relativePath, 'visa_type', fm.visa_type)
  requiredString(issues, doc.relativePath, 'dimension_key', fm.dimension_key)

  if (fm.visa_type && !isAllowedVisaType(fm.visa_type)) {
    issues.push(error(doc.relativePath, 'visa_type', `unsupported visa_type: ${fm.visa_type}`))
  }
  if (typeof fm.dimension_version !== 'number') {
    issues.push(error(doc.relativePath, 'dimension_version', 'dimension_version must be a number'))
  }
  if (!CHECK_DIMENSION_PRIORITIES.includes(fm.priority as typeof CHECK_DIMENSION_PRIORITIES[number])) {
    issues.push(error(doc.relativePath, 'priority', 'priority must be must_see / should_see / normal'))
  }
  if (typeof fm.expiry_days !== 'number' || !Number.isFinite(fm.expiry_days)) {
    issues.push(error(doc.relativePath, 'expiry_days', 'expiry_days must be a number'))
  }
  if (!CHECK_DIMENSION_URGENCY_LEVELS.includes(fm.urgency_level as typeof CHECK_DIMENSION_URGENCY_LEVELS[number])) {
    issues.push(error(doc.relativePath, 'urgency_level', 'urgency_level must be low / medium / high'))
  }
  if (!Array.isArray(fm.questions) || fm.questions.length === 0) {
    issues.push(error(doc.relativePath, 'questions', 'questions must contain at least 1 item'))
  } else {
    fm.questions.forEach((question, idx) => {
      if (!question || typeof question !== 'object') {
        issues.push(error(doc.relativePath, `questions[${idx}]`, 'question must be an object'))
        return
      }
      requiredString(issues, doc.relativePath, `questions[${idx}].id`, question.id)
      requiredString(issues, doc.relativePath, `questions[${idx}].text`, question.text)
      requiredString(issues, doc.relativePath, `questions[${idx}].type`, question.type)
    })
  }

  for (const level of CHECK_DIMENSION_RESULT_LEVELS) {
    if (!fm.result_logic || typeof fm.result_logic[level] !== 'string' || !fm.result_logic[level]?.trim()) {
      issues.push(error(doc.relativePath, `result_logic.${level}`, 'result_logic must include green / yellow / red'))
    }
  }

  const yellowActions = fm.result_actions?.yellow
  const redActions = fm.result_actions?.red
  if (!Array.isArray(yellowActions) && !Array.isArray(redActions)) {
    issues.push(error(doc.relativePath, 'result_actions', 'result_actions must include yellow or red actions'))
  }

  const frontmatterText = JSON.stringify(fm)
  for (const term of FRONTMATTER_FORBIDDEN_TERMS) {
    if (frontmatterText.includes(term)) {
      issues.push(error(doc.relativePath, 'frontmatter', `contains high-risk visible term: ${term}`))
    }
  }
  for (const term of BODY_WARNING_TERMS) {
    if (doc.body.includes(term)) {
      issues.push(warning(doc.relativePath, 'body', `body contains review-needed term: ${term}`))
    }
  }

  return issues
}

function requiredString(
  issues: ValidationIssue[],
  file: string,
  field: string,
  value: string | undefined,
) {
  if (!value || !value.trim()) issues.push(error(file, field, 'required string is missing'))
}

function error(file: string, field: string, message: string): ValidationIssue {
  return { file, field, message, level: 'error' }
}

function warning(file: string, field: string, message: string): ValidationIssue {
  return { file, field, message, level: 'warning' }
}
