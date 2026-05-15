import { readdir, readFile } from 'node:fs/promises'
import * as path from 'node:path'
import matter from 'gray-matter'

type Severity = 'ERROR' | 'WARN'

interface Finding {
  severity: Severity
  file: string
  message: string
}

const DEFAULT_DIR = 'docs/knowledge-atlas/phase2/batch29a'

const REQUIRED_FRONTMATTER = [
  'asset_id',
  'asset_family',
  'title',
  'state',
  'risk_level',
  'confidence',
  'source_quality',
  'last_checked_at',
  'owner',
  'official_sources',
  'unknown_fields',
  'needs_domain_flags',
]

const ALLOWED_FAMILIES = new Set([
  'document',
  'procedure_timeline',
  'life_event',
  'friction_misconception',
  'evidence_memo',
])

const ALLOWED_STATES = new Set([
  'source_registry',
  'atlas_draft',
  'ai_extracted',
  'ai_verified',
  'needs_domain',
  'conflict',
])

const ALLOWED_RISKS = new Set(['low', 'medium', 'high', 'critical'])
const ALLOWED_CONFIDENCE = new Set(['low', 'medium', 'high'])

async function main() {
  const dir = path.resolve(process.cwd(), process.argv[2] ?? DEFAULT_DIR)
  const entries = await readdir(dir, { withFileTypes: true })
  const files = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md')
    .map(entry => path.join(dir, entry.name))
    .sort()

  const findings: Finding[] = []
  for (const file of files) {
    await validateFile(file, findings)
  }

  const errors = findings.filter(f => f.severity === 'ERROR')
  const warns = findings.filter(f => f.severity === 'WARN')

  console.log(`Knowledge Atlas batch validation: ${files.length} card files`)
  for (const finding of findings) {
    console.log(`${finding.severity} ${path.relative(process.cwd(), finding.file)}: ${finding.message}`)
  }
  console.log(`Result: ${errors.length} errors, ${warns.length} warnings`)

  if (errors.length > 0) process.exit(1)
}

async function validateFile(file: string, findings: Finding[]) {
  const raw = await readFile(file, 'utf8')
  const parsed = matter(raw)
  const data = parsed.data as Record<string, unknown>
  const rel = path.relative(process.cwd(), file)
  const expectedAssetId = path.basename(file, '.md')

  for (const key of REQUIRED_FRONTMATTER) {
    if (!hasValue(data[key])) {
      findings.push({ severity: 'ERROR', file, message: `missing required frontmatter: ${key}` })
    }
  }

  if (data.asset_id !== expectedAssetId) {
    findings.push({
      severity: 'ERROR',
      file,
      message: `asset_id (${String(data.asset_id)}) does not match filename (${expectedAssetId})`,
    })
  }

  if (typeof data.asset_family === 'string' && !ALLOWED_FAMILIES.has(data.asset_family)) {
    findings.push({ severity: 'ERROR', file, message: `unknown asset_family: ${data.asset_family}` })
  }
  if (typeof data.state === 'string' && !ALLOWED_STATES.has(data.state)) {
    findings.push({ severity: 'ERROR', file, message: `unknown state: ${data.state}` })
  }
  if (data.state === 'human_reviewed' || data.state === 'runtime candidate' || data.state === 'production') {
    findings.push({ severity: 'ERROR', file, message: `FACT-produced cards must not use state: ${data.state}` })
  }
  if (typeof data.risk_level === 'string' && !ALLOWED_RISKS.has(data.risk_level)) {
    findings.push({ severity: 'ERROR', file, message: `unknown risk_level: ${data.risk_level}` })
  }
  if (typeof data.confidence === 'string' && !ALLOWED_CONFIDENCE.has(data.confidence)) {
    findings.push({ severity: 'ERROR', file, message: `unknown confidence: ${data.confidence}` })
  }

  const sources = data.official_sources
  if (!Array.isArray(sources) || sources.length === 0) {
    findings.push({ severity: 'ERROR', file, message: 'official_sources must be a non-empty array' })
  } else {
    sources.forEach((source, idx) => {
      const sourceObj = source as Record<string, unknown>
      for (const key of ['id', 'url', 'title', 'publisher', 'source_type', 'support_level']) {
        if (!hasValue(sourceObj[key])) {
          findings.push({ severity: 'ERROR', file, message: `official_sources[${idx}] missing ${key}` })
        }
      }
    })
  }

  for (const key of ['unknown_fields', 'needs_domain_flags']) {
    if (!Array.isArray(data[key])) {
      findings.push({ severity: 'ERROR', file, message: `${key} must be an array` })
    }
  }

  const family = typeof data.asset_family === 'string' ? data.asset_family : null
  const expectedFamilyBlock = familyBlock(family)
  if (expectedFamilyBlock && !hasValue(data[expectedFamilyBlock])) {
    findings.push({ severity: 'ERROR', file, message: `missing family block: ${expectedFamilyBlock}` })
  }

  for (const section of ['## must_say', '## must_not_say', '## qa_cases', '## changelog']) {
    if (!raw.includes(section)) {
      findings.push({ severity: 'WARN', file, message: `body does not include ${section}` })
    }
  }

  if (!raw.includes('needs_domain') && !raw.includes('deep_water') && data.risk_level === 'critical') {
    findings.push({ severity: 'WARN', file, message: 'critical card has no visible needs_domain/deep_water marker' })
  }

  if (parsed.content.trim().length < 800) {
    findings.push({ severity: 'WARN', file, message: `body is short (${parsed.content.trim().length} chars): ${rel}` })
  }
}

function familyBlock(family: string | null): string | null {
  if (family === 'document') return 'document'
  if (family === 'procedure_timeline') return 'timeline'
  if (family === 'life_event') return 'event'
  if (family === 'friction_misconception') return 'misconception'
  if (family === 'evidence_memo') return 'memo'
  return null
}

function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
