import { readdir, readFile } from 'fs/promises'
import path from 'path'

const ROOTS = ['app', 'components']
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx'])

const EXCLUDED_SEGMENTS = new Set([
  'admin',
  'api',
  'node_modules',
  '.next',
  '__tests__',
])

const BLOCKED_VISIBLE_TERMS = [
  'raw JSON',
  '原始结果',
  'source: document',
  'deadline: null',
  'amount: null',
  'policy_match',
]

const BLOCKED_LABEL_PATTERNS = [
  /\bsummary\b/i,
  /\bsections\b/i,
  /\bnext_steps\b/i,
  /\banswer_level\b/i,
  /\breview_status\b/i,
  /\bsource_grade\b/i,
  /\bmatched\b/i,
  /\bdraft\b/i,
  /\bcannot_determine\b/i,
]

interface Hit {
  file: string
  line: number
  term: string
  text: string
}

async function main() {
  const files = (await Promise.all(ROOTS.map(root => listFiles(path.join(process.cwd(), root))))).flat()
  const hits: Hit[] = []

  for (const file of files) {
    const relative = path.relative(process.cwd(), file)
    const text = await readFile(file, 'utf8')
    const lines = text.split(/\r?\n/)
    lines.forEach((line, index) => {
      const lineHits = blockedTermsInLine(line)
      for (const term of lineHits) {
        hits.push({
          file: relative,
          line: index + 1,
          term,
          text: line.trim().slice(0, 220),
        })
      }
    })
  }

  if (hits.length > 0) {
    console.error(`user-facing copy audit failed: ${hits.length} hit(s)`)
    for (const hit of hits) {
      console.error(`- ${hit.file}:${hit.line} [${hit.term}] ${hit.text}`)
    }
    process.exitCode = 1
    return
  }

  console.log(`user-facing copy audit passed: scanned ${files.length} files`)
}

function blockedTermsInLine(line: string): string[] {
  const hits: string[] = []
  const visibleLabel = extractLikelyVisibleText(line)
  for (const term of BLOCKED_VISIBLE_TERMS) {
    if (visibleLabel.includes(term)) hits.push(term)
  }
  if (visibleLabel) {
    for (const pattern of BLOCKED_LABEL_PATTERNS) {
      if (pattern.test(visibleLabel)) hits.push(pattern.source)
    }
  }
  return hits
}

function extractLikelyVisibleText(line: string): string {
  const snippets: string[] = []
  const jsxText = line.match(/>([^<>{}]+)</)
  if (jsxText?.[1]) snippets.push(jsxText[1])

  const propText = line.match(/\b(?:title|label|placeholder|aria-label|children)\s*=\s*["']([^"']+)["']/)
  if (propText?.[1]) snippets.push(propText[1])

  const objectLabel = line.match(/\b(?:title|label|heading|text)\s*:\s*["']([^"']+)["']/)
  if (objectLabel?.[1]) snippets.push(objectLabel[1])

  return snippets.join('\n')
}

async function listFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => [])
  const nested = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (EXCLUDED_SEGMENTS.has(entry.name)) return []
        return listFiles(fullPath)
      }
      if (!entry.isFile()) return []
      if (!EXTENSIONS.has(path.extname(entry.name))) return []
      if (fullPath.split(path.sep).some(segment => EXCLUDED_SEGMENTS.has(segment))) return []
      return [fullPath]
    }),
  )
  return nested.flat().sort()
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
