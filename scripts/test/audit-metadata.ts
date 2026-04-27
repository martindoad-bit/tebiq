/**
 * audit-metadata.ts (T14)
 *
 * 抓所有公开路由的 head，提取 title / description / og:* / canonical，
 * 写到 docs/metadata-audit.md。
 *
 * 用法：
 *   # 服务先跑起来
 *   AUDIT_BASE_URL=http://localhost:3000 npx tsx scripts/test/audit-metadata.ts
 *
 * 输出格式：Markdown 表格 + 每个缺失项的 ⚠ 标记。
 *
 * 不依赖任何爬虫库 — 用 fetch + regex，简单暴力。Server side rendering
 * (force-dynamic) 已经把 metadata 渲染到 HTML 里。
 */
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const BASE = process.env.AUDIT_BASE_URL ?? 'http://localhost:3000'

// 公开路由 — 不需要登录就能 200。带可变参数的（如 [id]）跳过，
// 单独 audit 那一类。
const ROUTES: Array<{ path: string; note?: string }> = [
  { path: '/' },
  { path: '/check' },
  { path: '/check/select' },
  { path: '/check/gijinkoku' },
  { path: '/check/keiei' },
  { path: '/check/haigusha' },
  { path: '/check/tokutei' },
  { path: '/check/teijusha' },
  { path: '/photo' },
  { path: '/knowledge' },
  { path: '/knowledge?category=visa' },
  { path: '/knowledge?category=tax' },
  { path: '/knowledge?category=pension' },
  { path: '/login' },
  { path: '/eijusha' },
  { path: '/sample-package' },
  { path: '/visa-select' },
  { path: '/subscribe' },
  { path: '/invite' },
  { path: '/consultation' },
  { path: '/terms' },
  { path: '/privacy' },
]

interface Audit {
  path: string
  status: number
  title?: string
  titleLen?: number
  description?: string
  descLen?: number
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
  jsonLd: boolean
  notes: string[]
}

function pick(html: string, regex: RegExp): string | undefined {
  const m = html.match(regex)
  return m?.[1]?.trim()
}

async function auditOne(route: string): Promise<Audit> {
  const url = `${BASE}${route}`
  const res = await fetch(url, {
    headers: { 'user-agent': 'tebiq-metadata-audit/1.0' },
  }).catch(err => {
    throw new Error(`fetch failed for ${url}: ${err}`)
  })
  const html = await res.text()
  const title = pick(html, /<title>([^<]*)<\/title>/i)
  const description = pick(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)
  const ogTitle = pick(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i)
  const ogDescription = pick(
    html,
    /<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i,
  )
  const ogImage = pick(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i)
  const canonical = pick(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)
  const jsonLd = /<script\s+type=["']application\/ld\+json["']/i.test(html)

  const notes: string[] = []
  if (!title) notes.push('缺 <title>')
  if (title && title.length > 60) notes.push(`title 长度 ${title.length} > 60`)
  if (!description) notes.push('缺 description')
  if (description && description.length > 160) notes.push(`description 长度 ${description.length} > 160`)
  if (!ogTitle) notes.push('缺 og:title')
  if (!ogDescription) notes.push('缺 og:description')
  if (!canonical) notes.push('缺 canonical')

  return {
    path: route,
    status: res.status,
    title,
    titleLen: title?.length,
    description,
    descLen: description?.length,
    ogTitle,
    ogDescription,
    ogImage,
    canonical,
    jsonLd,
    notes,
  }
}

function flagCol(ok: unknown): string {
  return ok ? '✓' : '⚠'
}

function tableRow(a: Audit): string {
  const titleCell = a.title ? `${a.title} (${a.titleLen})` : '⚠ 缺'
  const descCell = a.description ? `${a.description.slice(0, 60)}… (${a.descLen})` : '⚠ 缺'
  return `| \`${a.path}\` | ${a.status} | ${titleCell} | ${descCell} | ${flagCol(a.ogTitle)} | ${flagCol(a.canonical)} | ${flagCol(a.jsonLd)} |`
}

async function main(): Promise<void> {
  console.log(`[audit-metadata] base=${BASE}`)
  const audits: Audit[] = []
  for (const r of ROUTES) {
    process.stdout.write(`  ${r.path} … `)
    try {
      const a = await auditOne(r.path)
      audits.push(a)
      console.log(`${a.status} ${a.notes.length === 0 ? 'OK' : a.notes.length + ' 项缺失'}`)
    } catch (err) {
      console.log(`error: ${err instanceof Error ? err.message : String(err)}`)
      audits.push({
        path: r.path,
        status: 0,
        jsonLd: false,
        notes: [`fetch 失败: ${err instanceof Error ? err.message : String(err)}`],
      })
    }
  }

  // Markdown 报告
  const lines: string[] = []
  lines.push(`# Metadata audit`)
  lines.push('')
  lines.push(`生成时间：${new Date().toISOString()}`)
  lines.push(`Base：\`${BASE}\``)
  lines.push('')
  lines.push('## 摘要')
  lines.push('')
  const okCount = audits.filter(a => a.notes.length === 0).length
  lines.push(`- 总路由：${audits.length}`)
  lines.push(`- 完整：${okCount}`)
  lines.push(`- 有缺失：${audits.length - okCount}`)
  lines.push('')
  lines.push('## 详细')
  lines.push('')
  lines.push('| 路由 | HTTP | title | description | og:title | canonical | JSON-LD |')
  lines.push('| --- | --- | --- | --- | --- | --- | --- |')
  for (const a of audits) {
    lines.push(tableRow(a))
  }
  lines.push('')
  lines.push('## 待补')
  lines.push('')
  for (const a of audits) {
    if (a.notes.length === 0) continue
    lines.push(`### \`${a.path}\``)
    for (const n of a.notes) {
      lines.push(`- ⚠ ${n}`)
    }
    lines.push('')
  }

  const outPath = path.join(process.cwd(), 'docs/metadata-audit.md')
  await mkdir(path.dirname(outPath), { recursive: true })
  await writeFile(outPath, lines.join('\n'), 'utf8')
  console.log(`\n[audit-metadata] wrote ${outPath}`)

  process.exit(audits.length - okCount > 0 ? 1 : 0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
