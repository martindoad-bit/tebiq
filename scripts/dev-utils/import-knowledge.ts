/**
 * 导入 docs/knowledge-seed/*.md 到 lib/knowledge/seed-articles.ts。
 *
 * 测试期采用 TS 数据文件（无 DB），便于 frontend 直接消费。
 * 等正式上线 articles 表后，可改为 upsert 到数据库。
 *
 * 用法:
 *   npm run import-knowledge
 *
 * 幂等：基于 frontmatter slug 去重；如某篇 slug 已存在且 last_reviewed_by_name
 * 非 null（书士已审过），保留既有 TS 文件中的 entry，不被 markdown 覆盖。
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, basename } from 'node:path'
import matter from 'gray-matter'

const SEED_DIR = resolve(process.cwd(), 'docs/knowledge-seed')
const OUT_FILE = resolve(process.cwd(), 'lib/knowledge/seed-articles.ts')

const VALID_CATEGORIES = [
  'visa',
  'tax',
  'social-insurance',
  'city-office',
  'immigration',
  'work',
  'family',
  'housing',
  'finance',
  'emergency',
  'policy-update',
  'decision',
] as const

type Category = (typeof VALID_CATEGORIES)[number]

interface SeedArticle {
  slug: string
  title: string
  category: Category
  body: string
  requires_shoshi_review: boolean
  last_reviewed_by_name: string | null
  last_reviewed_by_registration: string | null
  sources_count: number | null
  last_verified_at: string | null
  review_notes: string | null
}

function parseMarkdownFile(filePath: string): SeedArticle | null {
  const raw = readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  const slug = String(data.slug ?? '').trim()
  const title = String(data.title ?? '').trim()
  const category = String(data.category ?? '').trim()

  if (!slug || !title || !category) {
    console.warn(`⚠️  跳过 ${basename(filePath)}：frontmatter 缺少 slug/title/category`)
    return null
  }

  if (!VALID_CATEGORIES.includes(category as Category)) {
    console.warn(`⚠️  跳过 ${basename(filePath)}：未知 category ${category}`)
    return null
  }

  return {
    slug,
    title,
    category: category as Category,
    body: content.trim(),
    requires_shoshi_review: data.requires_shoshi_review !== false,
    last_reviewed_by_name: data.last_reviewed_by_name ?? null,
    last_reviewed_by_registration: data.last_reviewed_by_registration ?? null,
    sources_count: typeof data.sources_count === 'number' ? data.sources_count : null,
    last_verified_at: data.last_verified_at ? String(data.last_verified_at) : null,
    review_notes: data.review_notes ?? null,
  }
}

/**
 * 读取既存 seed-articles.ts，提取已审核条目（last_reviewed_by_name 非 null）。
 * 这些条目不会被 markdown 覆盖，避免书士在产品里编辑后又被 import 还原。
 *
 * 简化实现：通过正则提取 SEED_ARTICLES 数组的 JSON-like 内容并 eval。
 * 出错时返回空 Map（首次运行或文件被破坏时安全回退）。
 */
function loadExistingReviewed(): Map<string, SeedArticle> {
  const map = new Map<string, SeedArticle>()
  if (!existsSync(OUT_FILE)) return map

  try {
    const txt = readFileSync(OUT_FILE, 'utf8')
    const arrMatch = txt.match(/SEED_ARTICLES:\s*SeedArticle\[\]\s*=\s*(\[[\s\S]*?\n\])/)
    if (!arrMatch) return map

    // 用 Function 而不是 eval，作用域更干净
    const arr = new Function(`return ${arrMatch[1]}`)() as SeedArticle[]
    for (const a of arr) {
      if (a.last_reviewed_by_name) {
        map.set(a.slug, a)
      }
    }
  } catch (err) {
    console.warn('⚠️  解析既存 seed-articles.ts 失败，全部从 markdown 重新生成：', err)
  }
  return map
}

function escapeBacktick(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function articleToTs(a: SeedArticle): string {
  const fields = [
    `    slug: ${JSON.stringify(a.slug)}`,
    `    title: ${JSON.stringify(a.title)}`,
    `    category: ${JSON.stringify(a.category)}`,
    `    body: \`${escapeBacktick(a.body)}\``,
    `    requires_shoshi_review: ${a.requires_shoshi_review}`,
    `    last_reviewed_by_name: ${JSON.stringify(a.last_reviewed_by_name)}`,
    `    last_reviewed_by_registration: ${JSON.stringify(a.last_reviewed_by_registration)}`,
    `    sources_count: ${JSON.stringify(a.sources_count)}`,
    `    last_verified_at: ${JSON.stringify(a.last_verified_at)}`,
    `    review_notes: ${JSON.stringify(a.review_notes)}`,
  ].join(',\n')
  return `  {\n${fields},\n  }`
}

function main() {
  if (!existsSync(SEED_DIR)) {
    console.error(`❌ 未找到 ${SEED_DIR}`)
    process.exit(1)
  }

  const files = readdirSync(SEED_DIR)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => !f.startsWith('KNOWLEDGE_BATCH_') && !f.toUpperCase().includes('REPORT'))
    .sort()

  if (files.length === 0) {
    console.error(`❌ ${SEED_DIR} 下没有 markdown 条目`)
    process.exit(1)
  }

  const reviewed = loadExistingReviewed()
  const articles: SeedArticle[] = []
  let countNew = 0
  let countUpdated = 0
  let countSkipped = 0
  const seenSlugs = new Set<string>()

  for (const f of files) {
    const a = parseMarkdownFile(resolve(SEED_DIR, f))
    if (!a) continue

    if (seenSlugs.has(a.slug)) {
      console.warn(`⚠️  ${f}: slug ${a.slug} 重复，已用第一条`)
      continue
    }
    seenSlugs.add(a.slug)

    const existing = reviewed.get(a.slug)
    if (existing) {
      // 书士已审核 → 保留既有 TS 数据，不被 markdown 覆盖
      articles.push(existing)
      countSkipped++
      console.log(`⏭️  ${a.slug}：保留既有审核版本（${existing.last_reviewed_by_name}）`)
    } else {
      articles.push(a)
      countNew++
    }
  }

  // 既存的已审核条目里如果 markdown 没有了（被删了），仍保留 TS 中的版本，避免误删
  Array.from(reviewed.entries()).forEach(([slug, a]) => {
    if (!seenSlugs.has(slug)) {
      articles.push(a)
      countSkipped++
      console.log(`💾 ${slug}：markdown 不存在但既有审核版本保留`)
    }
  })

  // 排序：未审核在前 + 按 slug 字典序，便于书士识别待审条目
  articles.sort((x, y) => {
    const a = x.requires_shoshi_review ? 0 : 1
    const b = y.requires_shoshi_review ? 0 : 1
    if (a !== b) return a - b
    return x.slug.localeCompare(y.slug)
  })

  // 生成 TS 文件
  const header = `// 由 scripts/dev-utils/import-knowledge.ts 自动生成。
// 不要手工编辑——改 docs/knowledge-seed/ 下的 markdown，再跑 npm run import-knowledge。
// 书士审核后请在产品 admin 编辑 last_reviewed_by_name / last_reviewed_by_registration，
// 这两个字段被 import 脚本视为锁定信号，不会被 markdown 覆盖。
//
// 生成时间：${new Date().toISOString()}
import { z } from 'zod'

export const SeedArticleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.enum([
    'visa', 'tax', 'social-insurance', 'city-office', 'immigration',
    'work', 'family', 'housing', 'finance', 'emergency', 'policy-update', 'decision',
  ]),
  body: z.string().min(1),
  requires_shoshi_review: z.boolean(),
  last_reviewed_by_name: z.string().nullable(),
  last_reviewed_by_registration: z.string().nullable(),
  sources_count: z.number().nullable(),
  last_verified_at: z.string().nullable(),
  review_notes: z.string().nullable(),
})
export type SeedArticle = z.infer<typeof SeedArticleSchema>

const _data: SeedArticle[] = [
`
  const body = articles.map(articleToTs).join(',\n')
  const footer = `\n]

/** Validated at module load — throws on invalid data shape. */
export const SEED_ARTICLES: SeedArticle[] = z.array(SeedArticleSchema).parse(_data)
`

  writeFileSync(OUT_FILE, header + body + footer, 'utf8')

  console.log('')
  console.log('✅ 导入完成')
  console.log(`   新增 / 更新：${countNew}`)
  console.log(`   跳过（已审核保留 / markdown 缺失保留）：${countSkipped}`)
  console.log(`   总计：${articles.length}`)
  console.log(`   写入：${OUT_FILE}`)
}

main()
