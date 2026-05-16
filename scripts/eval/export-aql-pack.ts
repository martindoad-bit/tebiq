#!/usr/bin/env tsx
/**
 * Generic AQL handoff exporter for any TEBIQ eval pack
 * (e.g. 0.8.5-rc56-, 0.8.5-rc60-, future RC matrices).
 *
 * Bundles question + current TEBIQ answer + facts + routes + findings
 * for a given starter_tag prefix into a single JSON file for AQL review.
 *
 * Includes full answer text. By default refuses to write under
 * docs/eval to avoid committing private answers; use --allow-docs-output
 * to override.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/eval/export-aql-pack.ts \
 *     --starter-prefix=0.8.5-rc60- \
 *     --output=/tmp/tebiq-rc60-aql.json
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import { listEvalAnswers, listEvalQuestions } from '@/lib/db/queries/eval-lab'
import { validateAnswer } from '@/lib/consultation/guardrail-validator'
import { getRouteGateIds, matchRouteGates } from '@/lib/consultation/route-gates'

interface Args {
  starterPrefix: string
  output: string | null
  includeRawPayload: boolean
  allowDocsOutput: boolean
  summaryOnly: boolean
  failedOnly: boolean
}

interface AqlCase {
  starter_tag: string | null
  source: string
  scenario: string | null
  question_id: string
  question_text: string
  metadata_json: Record<string, unknown>
  tebiq_answer_text: string | null
  tebiq_answer_id: string | null
  tebiq_answer_link: string | null
  engine_version: string | null
  prompt_version: string | null
  status: string | null
  fallback_reason: string | null
  latency_ms: number | null
  answer_sha256: string | null
  answer_chars: number
  fact_card_ids: string[]
  route_gate_ids: string[]
  expected_route_gate_ids: string[]
  route_gate_misses: string[]
  guardrail_findings: unknown[]
  raw_payload_json?: Record<string, unknown> | null
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    starterPrefix: '',
    output: null,
    includeRawPayload: false,
    allowDocsOutput: false,
    summaryOnly: false,
    failedOnly: false,
  }
  for (const arg of argv) {
    if (arg.startsWith('--starter-prefix=')) args.starterPrefix = arg.slice('--starter-prefix='.length).trim()
    else if (arg.startsWith('--output=')) args.output = arg.slice('--output='.length).trim()
    else if (arg === '--include-raw-payload') args.includeRawPayload = true
    else if (arg === '--allow-docs-output') args.allowDocsOutput = true
    else if (arg === '--summary-only') args.summaryOnly = true
    else if (arg === '--failed-only') args.failedOnly = true
  }
  if (!args.starterPrefix) {
    throw new Error('--starter-prefix=<prefix> is required (e.g. --starter-prefix=0.8.5-rc60-)')
  }
  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const questions = await listEvalQuestions()
  const selected = questions.filter(q => (q.starterTag ?? '').startsWith(args.starterPrefix))
  if (selected.length === 0) {
    throw new Error(`no eval-lab questions match starter_prefix=${args.starterPrefix}`)
  }

  const answers = await listEvalAnswers(selected.map(q => q.id))
  const currentAnswers = new Map(
    answers.filter(a => a.answerType === 'tebiq_current').map(a => [a.questionId, a]),
  )

  const cases: AqlCase[] = selected.map(question => {
    const answer = currentAnswers.get(question.id) ?? null
    const rawPayload = answer?.rawPayloadJson ?? {}
    const answerText = answer?.answerText ?? null
    const routeGateMatches = matchRouteGates(question.questionText)
    const actualRouteIds = getRouteGateIds(routeGateMatches)
    const expectedRouteIds = stringArray((question.metadataJson as { expected_route_gate?: unknown })?.expected_route_gate)
    const guardrailFindings = answerText
      ? validateAnswer({ question: question.questionText, answer: answerText, routeGateMatches })
      : []
    return {
      starter_tag: question.starterTag,
      source: question.source,
      scenario: question.scenario,
      question_id: question.id,
      question_text: question.questionText,
      metadata_json: question.metadataJson ?? {},
      tebiq_answer_text: answerText,
      tebiq_answer_id: answer?.tebiqAnswerId ?? null,
      tebiq_answer_link: answer?.tebiqAnswerLink ?? null,
      engine_version: answer?.engineVersion ?? null,
      prompt_version: answer?.promptVersion ?? null,
      status: answer?.status ?? null,
      fallback_reason: answer?.fallbackReason ?? null,
      latency_ms: answer?.latencyMs ?? null,
      answer_sha256: answerText ? sha256(answerText) : null,
      answer_chars: answerText?.length ?? 0,
      fact_card_ids: stringArray(rawPayload.fact_card_ids),
      route_gate_ids: actualRouteIds,
      expected_route_gate_ids: expectedRouteIds,
      route_gate_misses: expectedRouteIds.filter(id => !actualRouteIds.includes(id)),
      guardrail_findings: guardrailFindings,
      ...(args.includeRawPayload ? { raw_payload_json: rawPayload } : {}),
    }
  })

  const filtered = args.failedOnly
    ? cases.filter(
        c =>
          !c.tebiq_answer_text ||
          c.status !== 'completed' ||
          c.fallback_reason ||
          c.guardrail_findings.length > 0 ||
          c.route_gate_misses.length > 0,
      )
    : cases

  filtered.sort((a, b) => String(a.starter_tag).localeCompare(String(b.starter_tag)))

  const summary = {
    starter_prefix: args.starterPrefix,
    total_questions: selected.length,
    selected_cases: filtered.length,
    answers_present: filtered.filter(c => c.tebiq_answer_text?.trim()).length,
    completed: filtered.filter(c => c.status === 'completed').length,
    with_findings: filtered.filter(c => c.guardrail_findings.length > 0).length,
    with_route_misses: filtered.filter(c => c.route_gate_misses.length > 0).length,
    fallback_present: filtered.filter(c => c.fallback_reason).length,
    missing_answers: filtered.filter(c => !c.tebiq_answer_text?.trim()).map(c => c.starter_tag),
  }

  if (args.summaryOnly) {
    console.log(JSON.stringify(summary, null, 2))
    return
  }
  if (!args.output) {
    throw new Error('Refusing to print full answer text to stdout. Pass --output=/private/path/file.json or --summary-only.')
  }

  const outputPath = resolve(args.output)
  if (!args.allowDocsOutput && outputPath.includes('/docs/eval/')) {
    throw new Error('Refusing to write full answer text under docs/eval. Pass a private output path, or --allow-docs-output if intentional.')
  }

  const payload = {
    exported_at: new Date().toISOString(),
    ...summary,
    cases: filtered,
  }
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(JSON.stringify({ ...summary, output: outputPath }, null, 2))
}

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []
}

void main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err instanceof Error ? err.message : String(err))
    process.exit(1)
  })
