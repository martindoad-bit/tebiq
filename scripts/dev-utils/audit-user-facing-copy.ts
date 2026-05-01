import { readdir, readFile } from 'fs/promises'
import path from 'path'

const ROOTS = ['app', 'components']
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx'])
const EXCLUDED_SEGMENTS = new Set(['admin', 'api', 'node_modules', '.next'])

const FORBIDDEN_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  {
    label: 'visible internal enum',
    pattern: />\s*(summary|sections|next_steps|answer_level|review_status|source_grade|matched|draft|cannot_determine|policy_match)\s*</,
  },
  {
    label: 'literal internal enum',
    pattern: /(?:title|label|children|placeholder|aria-label)\s*[:=]\s*['"`](summary|sections|next_steps|answer_level|review_status|source_grade|matched|draft|cannot_determine|policy_match)['"`]/,
  },
  {
    label: 'raw debug text',
    pattern: /raw JSON|原始结果|source:\s*document|deadline:\s*null|amount:\s*null/,
  },
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
    lines.forEach((line, idx) => {
      for (const item of FORBIDDEN_PATTERNS) {
        if (item.pattern.test(line)) {
          hits.push({
            file: relative,
            line: idx + 1,
            term: item.label,
            text: line.trim().slice(0, 220),
          })
        }
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
