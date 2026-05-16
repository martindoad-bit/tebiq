#!/usr/bin/env tsx
/**
 * Static readiness check for any TEBIQ AQL eval pack JSON
 * (e.g. RC56 / RC60 / future RC matrices).
 *
 * Catches problems that would otherwise only surface during a costly
 * provider-backed run:
 *   - duplicate / missing starter_tag
 *   - missing question_text
 *   - bucket / scenario distribution
 *   - expected_route_gate ids that do not exist in route-gates.ts
 *   - expected_route_gate ids whose patterns do not match the question text
 *   - expected_fact_hint ids that are not present in the fact-card filesystem
 *   - negative-control samples that overmatch high-risk routes
 *
 * Output:
 *   - human-readable stdout
 *   - optional JSON summary via --summary-json=<path>
 *
 * Usage:
 *   npx tsx scripts/eval/check-eval-pack-readiness.ts --input=docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json
 *   npx tsx scripts/eval/check-eval-pack-readiness.ts --input=docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json --summary-json=/tmp/rc60-readiness.json
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname, basename } from 'node:path'

import { ROUTE_GATE_PATTERNS, getRouteGateIds, matchRouteGates } from '@/lib/consultation/route-gates'

interface PackItem {
  starter_tag: string
  scenario?: string
  source?: string
  question_text: string
  metadata_json?: {
    bucket?: string
    risk_level?: string
    expected_route_gate?: string[]
    expected_fact_hint?: string[]
    must_have?: string[]
    must_not_have?: string[]
  }
}

interface Pack {
  name?: string
  version?: string
  items: PackItem[]
  coverage_summary?: Record<string, unknown>
}

interface Args {
  input: string
  starterPrefix: string | null
  summaryJson: string | null
  factCardDir: string
  negativePrefixes: string[]
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    input: 'docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json',
    starterPrefix: null,
    summaryJson: null,
    factCardDir: 'docs/fact-cards',
    negativePrefixes: ['rc60-N', 'rc56-D', 'negative-control'],
  }
  for (const arg of argv) {
    if (arg.startsWith('--input=')) args.input = arg.slice('--input='.length)
    else if (arg.startsWith('--starter-prefix=')) args.starterPrefix = arg.slice('--starter-prefix='.length)
    else if (arg.startsWith('--summary-json=')) args.summaryJson = arg.slice('--summary-json='.length)
    else if (arg.startsWith('--fact-card-dir=')) args.factCardDir = arg.slice('--fact-card-dir='.length)
    else if (arg.startsWith('--negative-prefixes=')) {
      args.negativePrefixes = arg
        .slice('--negative-prefixes='.length)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    }
  }
  return args
}

function listFactCardIds(dir: string): Set<string> {
  if (!existsSync(dir)) return new Set()
  const entries = readdirSync(dir, { withFileTypes: true })
  const ids = new Set<string>()
  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (!entry.name.endsWith('.md')) continue
    if (entry.name.toUpperCase() === 'README.md') continue
    if (entry.name.toUpperCase() === 'INDEX.md') continue
    ids.add(entry.name.replace(/\.md$/, ''))
  }
  return ids
}

function isNegativeControl(item: PackItem, negativePrefixes: string[]): boolean {
  if (item.metadata_json?.bucket === 'negative_control') return true
  for (const prefix of negativePrefixes) {
    if (item.starter_tag.includes(prefix)) return true
  }
  return false
}

interface Summary {
  pack_name: string
  pack_version: string | null
  input: string
  total_items: number
  selected_items: number
  by_bucket: Record<string, number>
  by_scenario: Record<string, number>
  duplicate_starter_tags: string[]
  missing_question_text: string[]
  unknown_expected_route_gate_ids: Array<{ starter_tag: string; ids: string[] }>
  route_gate_pattern_misses: Array<{ starter_tag: string; missing: string[]; actual: string[] }>
  unknown_expected_fact_hint_ids: Array<{ starter_tag: string; ids: string[] }>
  negative_control_overmatch: Array<{ starter_tag: string; matched_high_risk: string[] }>
  totals: {
    expected_route_cases: number
    route_passes: number
    route_failures: number
    negative_controls: number
    negative_overmatch: number
  }
  verdict: 'GREEN' | 'YELLOW' | 'RED'
}

const HIGH_RISK_ROUTES = new Set(
  ROUTE_GATE_PATTERNS.filter(gate => gate.severity === 'P0').map(gate => gate.id),
)

const args = parseArgs(process.argv.slice(2))
const input = resolve(args.input)
const pack = JSON.parse(readFileSync(input, 'utf8')) as Pack
const allItems = pack.items
const items = args.starterPrefix
  ? allItems.filter(it => it.starter_tag.startsWith(args.starterPrefix!))
  : allItems

const factIds = listFactCardIds(resolve(args.factCardDir))
const knownRouteIds = new Set(ROUTE_GATE_PATTERNS.map(g => g.id))

const summary: Summary = {
  pack_name: pack.name ?? basename(input),
  pack_version: pack.version ?? null,
  input,
  total_items: allItems.length,
  selected_items: items.length,
  by_bucket: {},
  by_scenario: {},
  duplicate_starter_tags: [],
  missing_question_text: [],
  unknown_expected_route_gate_ids: [],
  route_gate_pattern_misses: [],
  unknown_expected_fact_hint_ids: [],
  negative_control_overmatch: [],
  totals: {
    expected_route_cases: 0,
    route_passes: 0,
    route_failures: 0,
    negative_controls: 0,
    negative_overmatch: 0,
  },
  verdict: 'GREEN',
}

const seenTags = new Set<string>()
for (const item of items) {
  if (seenTags.has(item.starter_tag)) summary.duplicate_starter_tags.push(item.starter_tag)
  seenTags.add(item.starter_tag)
  if (!item.question_text || item.question_text.trim().length < 5) {
    summary.missing_question_text.push(item.starter_tag)
  }
  const bucket = item.metadata_json?.bucket ?? '(unknown)'
  const scenario = item.scenario ?? '(unknown)'
  summary.by_bucket[bucket] = (summary.by_bucket[bucket] ?? 0) + 1
  summary.by_scenario[scenario] = (summary.by_scenario[scenario] ?? 0) + 1

  const expectedRoutes = item.metadata_json?.expected_route_gate ?? []
  const unknownRoutes = expectedRoutes.filter(id => !knownRouteIds.has(id))
  if (unknownRoutes.length > 0) {
    summary.unknown_expected_route_gate_ids.push({ starter_tag: item.starter_tag, ids: unknownRoutes })
  }

  const factHints = item.metadata_json?.expected_fact_hint ?? []
  const unknownFacts = factHints.filter(id => !factIds.has(id))
  if (unknownFacts.length > 0) {
    summary.unknown_expected_fact_hint_ids.push({ starter_tag: item.starter_tag, ids: unknownFacts })
  }

  if (expectedRoutes.length > 0) {
    summary.totals.expected_route_cases += 1
    const actual = getRouteGateIds(matchRouteGates(item.question_text))
    const missing = expectedRoutes.filter(id => !actual.includes(id))
    if (missing.length > 0) {
      summary.totals.route_failures += 1
      summary.route_gate_pattern_misses.push({
        starter_tag: item.starter_tag,
        missing,
        actual,
      })
    } else {
      summary.totals.route_passes += 1
    }
  }

  if (isNegativeControl(item, args.negativePrefixes)) {
    summary.totals.negative_controls += 1
    const actual = getRouteGateIds(matchRouteGates(item.question_text))
    const dangerous = actual.filter(id => HIGH_RISK_ROUTES.has(id))
    if (dangerous.length > 0) {
      summary.totals.negative_overmatch += 1
      summary.negative_control_overmatch.push({
        starter_tag: item.starter_tag,
        matched_high_risk: dangerous,
      })
    }
  }
}

// expected_fact_hint values are advisory descriptors authored by AQL,
// not strict fact-card slugs. They are reported but do not gate the verdict.
if (
  summary.duplicate_starter_tags.length > 0 ||
  summary.missing_question_text.length > 0 ||
  summary.unknown_expected_route_gate_ids.length > 0 ||
  summary.totals.negative_overmatch > 0
) {
  summary.verdict = 'RED'
} else if (summary.totals.route_failures > 0) {
  summary.verdict = 'YELLOW'
}

const lines: string[] = []
lines.push(`pack: ${summary.pack_name} (${summary.pack_version ?? 'no-version'})`)
lines.push(`items: total=${summary.total_items} selected=${summary.selected_items}`)
lines.push(`buckets: ${JSON.stringify(summary.by_bucket)}`)
lines.push(
  `routes: pass=${summary.totals.route_passes} fail=${summary.totals.route_failures} expected_cases=${summary.totals.expected_route_cases}`,
)
lines.push(
  `negatives: total=${summary.totals.negative_controls} overmatch=${summary.totals.negative_overmatch}`,
)
if (summary.duplicate_starter_tags.length) {
  lines.push(`duplicate starter_tags: ${summary.duplicate_starter_tags.join(', ')}`)
}
if (summary.missing_question_text.length) {
  lines.push(`missing question_text: ${summary.missing_question_text.join(', ')}`)
}
for (const row of summary.unknown_expected_route_gate_ids) {
  lines.push(`UNKNOWN ROUTE ID ${row.starter_tag}: ${row.ids.join(',')}`)
}
for (const row of summary.unknown_expected_fact_hint_ids) {
  lines.push(`UNKNOWN FACT HINT ${row.starter_tag}: ${row.ids.join(',')}`)
}
for (const row of summary.route_gate_pattern_misses) {
  lines.push(
    `ROUTE PATTERN MISS ${row.starter_tag}: missing=${row.missing.join(',')} actual=${row.actual.join(',') || '(none)'}`,
  )
}
for (const row of summary.negative_control_overmatch) {
  lines.push(`NEGATIVE OVERMATCH ${row.starter_tag}: matched=${row.matched_high_risk.join(',')}`)
}
lines.push(`verdict: ${summary.verdict}`)

console.log(lines.join('\n'))

if (args.summaryJson) {
  const out = resolve(args.summaryJson)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, JSON.stringify(summary, null, 2))
  console.log(`summary written: ${out}`)
}

if (summary.verdict === 'RED') process.exit(2)
if (summary.verdict === 'YELLOW') process.exit(1)
