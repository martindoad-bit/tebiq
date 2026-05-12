import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const SURFACE_ROOTS = [
  'app/ai-consultation',
  'app/c/[id]/page.tsx',
  'app/quick-reference',
  'components/ui/consultation-alpha.tsx',
  'components/ui/fact-reference.tsx',
  'components/ui/quick-reference-bridge.tsx',
  'lib/answer/prompt/consultation-alpha-v1.ts',
]

const FORBIDDEN_COPY: Array<{ label: string; pattern: RegExp }> = [
  {
    label: 'audience explanation shown to users',
    pattern: /适合已经|适合.*用户|大概方向|快速确认|常见手续，先核对/,
  },
  {
    label: 'internal implementation language',
    pattern: /模型响应|安全降级|降级回答|OCR 档案系统|系统分享|咨询方向|不是重新开一个问题/,
  },
  {
    label: 'structural purpose statement',
    pattern: /用于整理|用于核对|这个页面用于|本页用于/,
  },
  {
    label: 'visible answer scaffold labels',
    pattern: /<SectionLabel>先看|font-medium">先看|^\s*'   先看(?:这里|方向)[：']|^\s*'   先别这样做：|chips:\s*\['先看/,
  },
]

test('launch surfaces do not expose structural product copy', async () => {
  const files = (await Promise.all(SURFACE_ROOTS.map(root => listFiles(path.join(process.cwd(), root))))).flat()
  const hits: string[] = []

  for (const file of files) {
    const relative = path.relative(process.cwd(), file)
    const lines = (await readFile(file, 'utf8')).split(/\r?\n/)
    lines.forEach((line, index) => {
      for (const item of FORBIDDEN_COPY) {
        if (item.pattern.test(line)) {
          hits.push(`${relative}:${index + 1} [${item.label}] ${line.trim()}`)
        }
      }
    })
  }

  assert.deepEqual(hits, [])
})

async function listFiles(target: string): Promise<string[]> {
  if (/\.(tsx?|jsx?)$/.test(target)) return [target]
  const entries = await readdir(target, { withFileTypes: true }).catch(() => [])
  const nested = await Promise.all(entries.map(async entry => {
    const fullPath = path.join(target, entry.name)
    if (entry.isDirectory()) return listFiles(fullPath)
    if (!entry.isFile()) return []
    if (!/\.(tsx?|jsx?)$/.test(entry.name)) return []
    return [fullPath]
  }))
  return nested.flat().sort()
}
