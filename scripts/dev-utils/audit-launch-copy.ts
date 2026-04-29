import { readdir, readFile } from 'fs/promises'
import path from 'path'

const ROOTS = ['app', 'components', 'lib']
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx'])
const EXCLUDED_SEGMENTS = new Set(['admin', 'node_modules', '.next'])

const TERMS = [
  '拒签概率',
  '一定通过',
  '一定不通过',
  '一定被拒',
  '必定拒签',
  '危险',
  '高危',
  'AI 判断',
  '自动判定',
  '秒懂',
  '太棒了',
  '限时优惠',
  '马上升级',
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
      for (const term of TERMS) {
        if (line.includes(term)) {
          hits.push({
            file: relative,
            line: idx + 1,
            term,
            text: line.trim().slice(0, 220),
          })
        }
      }
    })
  }

  if (hits.length > 0) {
    console.error(`launch copy audit failed: ${hits.length} hit(s)`)
    for (const hit of hits) {
      console.error(`- ${hit.file}:${hit.line} [${hit.term}] ${hit.text}`)
    }
    process.exitCode = 1
    return
  }

  console.log(`launch copy audit passed: scanned ${files.length} files`)
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
