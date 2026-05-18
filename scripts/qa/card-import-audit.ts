/**
 * Card import audit.
 *
 * Read-only inventory for the card-to-product pipeline:
 * - docs/fact-cards filesystem inventory
 * - optional DB `fact_cards` comparison when DATABASE_URL is available
 * - Materials Tab `factCardIds` references
 * - route-gate `sourceAssetIds` coverage hints
 *
 * Usage:
 *   npx tsx scripts/qa/card-import-audit.ts
 *   npx tsx --env-file=.env.local scripts/qa/card-import-audit.ts
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import postgres from 'postgres'
import { QUICK_REFERENCE_TOPICS } from '@/lib/quick-reference/topics'
import { ROUTE_GATE_PATTERNS } from '@/lib/consultation/route-gates'

interface FactCardInventoryRow {
  factId: string
  file: string
  state: string
  riskLevel: string
}

interface DbFactCardRow {
  fact_id: string
  state: string
  risk_level: string
  content_hash: string
}

const FACT_CARDS_DIR = join(process.cwd(), 'docs/fact-cards')
const EXCLUDED_FACT_CARD_FILES = new Set(['README.md', 'FACT_OPS_WINDOW_TASK_PACK.md'])
const GUARDRAIL_FACT_PROGRESS_PATH = join(
  process.cwd(),
  'docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md',
)

function countBy<T extends string>(items: ReadonlyArray<T>): Record<T, number> {
  return items.reduce((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1
    return acc
  }, {} as Record<T, number>)
}

function loadFactCards(): FactCardInventoryRow[] {
  return readdirSync(FACT_CARDS_DIR)
    .filter(file => file.endsWith('.md') && !EXCLUDED_FACT_CARD_FILES.has(file))
    .map(file => {
      const raw = readFileSync(join(FACT_CARDS_DIR, file), 'utf8')
      const parsed = matter(raw)
      return {
        factId: String(parsed.data.fact_id ?? ''),
        file,
        state: String(parsed.data.state ?? ''),
        riskLevel: String(parsed.data.risk_level ?? ''),
      }
    })
    .sort((a, b) => a.factId.localeCompare(b.factId))
}

function auditMaterialsReferences(factIds: ReadonlySet<string>) {
  const refs: Array<{ topicId: string; factId: string }> = []
  for (const topic of QUICK_REFERENCE_TOPICS) {
    for (const factId of topic.factCardIds ?? []) {
      refs.push({ topicId: topic.id, factId })
    }
  }
  const missing = refs.filter(ref => !factIds.has(ref.factId))
  return {
    topics: QUICK_REFERENCE_TOPICS.length,
    references: refs.length,
    missing,
  }
}

function auditRouteGateSources(factIds: ReadonlySet<string>) {
  const sourceIds = Array.from(new Set(ROUTE_GATE_PATTERNS.flatMap(pattern => pattern.sourceAssetIds))).sort()
  const sourceFiles = new Set(
    readdirSync(join(process.cwd(), 'docs/knowledge-atlas/phase2/guardrails-p0p1'))
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, '')),
  )
  const guardrailSourceAssets = loadCompletedGuardrailSourceAssetIds()
  const resolvedAsFactCard = sourceIds.filter(id => factIds.has(id))
  const resolvedAsKnowledgeAtlasFile = sourceIds.filter(id => sourceFiles.has(id))
  const resolvedAsGuardrailSourceAsset = sourceIds.filter(
    id => !factIds.has(id) && !sourceFiles.has(id) && guardrailSourceAssets.has(id),
  )
  const unresolved = sourceIds.filter(
    id => !factIds.has(id) && !sourceFiles.has(id) && !guardrailSourceAssets.has(id),
  )

  return {
    routeGatePatterns: ROUTE_GATE_PATTERNS.length,
    sourceAssetIds: sourceIds.length,
    resolvedAsFactCard,
    resolvedAsKnowledgeAtlasFile,
    resolvedAsGuardrailSourceAsset,
    unresolved,
  }
}

function loadCompletedGuardrailSourceAssetIds(): ReadonlySet<string> {
  if (!existsSync(GUARDRAIL_FACT_PROGRESS_PATH)) {
    return new Set()
  }

  const raw = readFileSync(GUARDRAIL_FACT_PROGRESS_PATH, 'utf8')
  const completedTable = raw.match(/## Completed Cards\n([\s\S]*?)\n## In Progress/)
  if (!completedTable) {
    return new Set()
  }

  const rows = completedTable[1]
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('|') && !line.includes('|---') && !line.includes('| card_id |'))
    .map(line => line.split('|')[1]?.trim())
    .filter((id): id is string => Boolean(id))

  return new Set(rows)
}

async function auditDatabase(factIds: ReadonlySet<string>) {
  if (!process.env.DATABASE_URL) {
    return { skipped: true as const, reason: 'DATABASE_URL not set' }
  }

  const sql = postgres(process.env.DATABASE_URL, { max: 1 })
  try {
    const table = await sql`select to_regclass('public.fact_cards') as table_name`
    if (table[0]?.table_name !== 'fact_cards') {
      return { skipped: true as const, reason: 'fact_cards table not found' }
    }

    const rows = await sql<DbFactCardRow[]>`
      select fact_id, state, risk_level, content_hash
      from fact_cards
      order by fact_id
    `
    const dbIds = new Set(rows.map(row => row.fact_id))
    const missingInDb = Array.from(factIds).filter(id => !dbIds.has(id)).sort()
    const extraInDb = rows.map(row => row.fact_id).filter(id => !factIds.has(id)).sort()
    return {
      skipped: false as const,
      total: rows.length,
      byState: countBy(rows.map(row => row.state)),
      byRisk: countBy(rows.map(row => row.risk_level)),
      missingInDb,
      extraInDb,
    }
  } finally {
    await sql.end()
  }
}

async function main() {
  const cards = loadFactCards()
  const factIds = new Set(cards.map(card => card.factId))
  const duplicateIds = cards
    .map(card => card.factId)
    .filter((id, index, all) => all.indexOf(id) !== index)
    .sort()
  const materials = auditMaterialsReferences(factIds)
  const routeGateSources = auditRouteGateSources(factIds)
  const database = await auditDatabase(factIds)

  const report = {
    generatedAt: new Date().toISOString(),
    filesystem: {
      total: cards.length,
      byState: countBy(cards.map(card => card.state)),
      byRisk: countBy(cards.map(card => card.riskLevel)),
      duplicateIds,
    },
    database,
    materials,
    routeGateSources: {
      routeGatePatterns: routeGateSources.routeGatePatterns,
      sourceAssetIds: routeGateSources.sourceAssetIds,
      resolvedAsFactCardCount: routeGateSources.resolvedAsFactCard.length,
      resolvedAsKnowledgeAtlasFileCount: routeGateSources.resolvedAsKnowledgeAtlasFile.length,
      resolvedAsGuardrailSourceAssetCount: routeGateSources.resolvedAsGuardrailSourceAsset.length,
      unresolvedCount: routeGateSources.unresolved.length,
      resolvedAsGuardrailSourceAsset: routeGateSources.resolvedAsGuardrailSourceAsset,
      unresolved: routeGateSources.unresolved,
    },
  }

  console.log(JSON.stringify(report, null, 2))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
