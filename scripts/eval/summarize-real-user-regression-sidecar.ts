#!/usr/bin/env tsx
/**
 * Summarize a TEBIQ real-user regression sidecar without printing answer text.
 *
 * Usage:
 *   npx tsx scripts/eval/summarize-real-user-regression-sidecar.ts \
 *     --input=docs/eval/tebiq-0.8-rur-loop1-production-answer-results.json
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface Args {
  input: string
  json: boolean
}

interface SidecarCase {
  input_id: string
  scenario?: string
  status?: string | null
  ok?: boolean
  http_status?: number
  error?: string | null
  route_gate_ids?: string[]
  guardrail_findings?: Array<{
    id?: string
    severity?: string
  }>
}

interface Sidecar {
  run_id?: string
  updated_at?: string
  cases?: SidecarCase[]
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    input: 'docs/eval/tebiq-0.8-rur-loop1-production-answer-results.json',
    json: false,
  }
  for (const arg of argv) {
    if (arg.startsWith('--input=')) args.input = arg.slice('--input='.length)
    else if (arg === '--json') args.json = true
  }
  return args
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const inputPath = resolve(args.input)
  const sidecar = JSON.parse(readFileSync(inputPath, 'utf8')) as Sidecar
  const cases = sidecar.cases ?? []

  const summary = {
    input: inputPath,
    run_id: sidecar.run_id ?? null,
    updated_at: sidecar.updated_at ?? null,
    total: cases.length,
    completed: cases.filter(item => item.ok === true && item.status === 'completed').length,
    partial_or_failed: cases.filter(item => !(item.ok === true && item.status === 'completed')).length,
    failed: cases.filter(item => item.ok === false).length,
    skipped: cases.filter(item => item.status === 'skipped').length,
    by_status: countBy(cases.map(item => item.status ?? 'unknown')),
    by_http_status: countBy(cases.map(item => item.http_status == null ? 'unknown' : String(item.http_status))),
    by_scenario: countBy(cases.map(item => item.scenario ?? 'unknown')),
    error_counts: countBy(cases
      .map(item => normalizeError(item.error))
      .filter((item): item is string => Boolean(item))),
    route_gate_counts: countBy(cases.flatMap(item => item.route_gate_ids ?? [])),
    finding_counts: countBy(cases.flatMap(item =>
      (item.guardrail_findings ?? []).map(finding =>
        `${finding.severity ?? 'unknown'}:${finding.id ?? 'unknown'}`,
      ),
    )),
    cases_with_findings: cases
      .filter(item => (item.guardrail_findings ?? []).length > 0)
      .map(item => ({
        input_id: item.input_id,
        findings: (item.guardrail_findings ?? []).map(finding =>
          `${finding.severity ?? 'unknown'}:${finding.id ?? 'unknown'}`,
        ),
      })),
  }

  if (args.json) {
    console.log(JSON.stringify(summary, null, 2))
    return
  }

  console.log(`run_id=${summary.run_id ?? 'unknown'}`)
  console.log(`total=${summary.total} completed=${summary.completed} partial_or_failed=${summary.partial_or_failed} failed=${summary.failed} skipped=${summary.skipped}`)
  console.log(`by_status=${JSON.stringify(summary.by_status)}`)
  console.log(`by_http_status=${JSON.stringify(summary.by_http_status)}`)
  console.log(`error_counts=${JSON.stringify(summary.error_counts)}`)
  console.log(`route_gate_counts=${JSON.stringify(summary.route_gate_counts)}`)
  console.log(`finding_counts=${JSON.stringify(summary.finding_counts)}`)
  if (summary.cases_with_findings.length > 0) {
    console.log(`cases_with_findings=${JSON.stringify(summary.cases_with_findings)}`)
  }
}

function normalizeError(value: string | null | undefined): string | null {
  if (!value) return null
  if (/deepseek_http_401/i.test(value)) return 'provider_auth_failed:deepseek_http_401'
  if (/fetch failed/i.test(value)) return 'provider_network_fetch_failed'
  if (/skipped_after_abort/i.test(value)) return value.slice(0, 80)
  return value.slice(0, 120)
}

function countBy(values: string[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const value of values) out[value] = (out[value] ?? 0) + 1
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)))
}

main()
