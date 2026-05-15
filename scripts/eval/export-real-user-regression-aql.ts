#!/usr/bin/env tsx
/**
 * Export a private AQL packet for TEBIQ 0.8 real-user regression runs.
 *
 * This intentionally does not default to writing under docs/eval because
 * it includes full question and answer text. Use a local/private path:
 *
 *   npx tsx --env-file=.env.local scripts/eval/export-real-user-regression-aql.ts \
 *     --run-id=tebiq-0.8-rur-loop1 \
 *     --output=/tmp/tebiq-0.8-rur-loop1-aql.json
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import { listEvalAnswers, listEvalQuestions } from '@/lib/db/queries/eval-lab'
import { validateAnswer } from '@/lib/consultation/guardrail-validator'
import { getRouteGateIds, matchRouteGates } from '@/lib/consultation/route-gates'

interface Args {
  runId: string
  output: string | null
  includeRawPayload: boolean
  allowDocsOutput: boolean
  summaryOnly: boolean
}

interface AqlCase {
  case_id: string | null
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
  status: string | null
  latency_ms: number | null
  answer_sha256: string | null
  fact_card_ids: string[]
  route_gate_ids: string[]
  guardrail_findings: unknown[]
  raw_payload_json?: Record<string, unknown> | null
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    runId: 'tebiq-0.8-rur-loop1',
    output: null,
    includeRawPayload: false,
    allowDocsOutput: false,
    summaryOnly: false,
  }

  for (const arg of argv) {
    if (arg.startsWith('--run-id=')) args.runId = arg.slice('--run-id='.length).trim()
    else if (arg.startsWith('--output=')) args.output = arg.slice('--output='.length).trim()
    else if (arg === '--include-raw-payload') args.includeRawPayload = true
    else if (arg === '--allow-docs-output') args.allowDocsOutput = true
    else if (arg === '--summary-only') args.summaryOnly = true
  }

  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const questions = await listEvalQuestions()
  const starterTagPattern = new RegExp(`^rur-${escapeRegExp(args.runId)}-\\d{3}$`)
  const selectedQuestions = questions.filter(question => {
    if (question.source !== 'real_user_regression') return false
    const metadata = question.metadataJson ?? {}
    if (metadata.eval_run_id === args.runId) return true
    return starterTagPattern.test(question.starterTag ?? '')
  })

  const answers = await listEvalAnswers(selectedQuestions.map(question => question.id))
  const currentAnswers = new Map(
    answers
      .filter(answer => answer.answerType === 'tebiq_current')
      .map(answer => [answer.questionId, answer]),
  )

  const cases: AqlCase[] = selectedQuestions.map(question => {
    const answer = currentAnswers.get(question.id) ?? null
    const rawPayload = answer?.rawPayloadJson ?? {}
    const answerText = answer?.answerText ?? null
    const routeGateMatches = matchRouteGates(question.questionText)
    const guardrailFindings = answerText
      ? validateAnswer({
          question: question.questionText,
          answer: answerText,
          routeGateMatches,
        })
      : []
    return {
      case_id: stringOrNull(question.metadataJson?.real_user_regression_id),
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
      status: answer?.status ?? null,
      latency_ms: answer?.latencyMs ?? null,
      answer_sha256: answerText ? sha256(answerText) : null,
      fact_card_ids: stringArray(rawPayload.fact_card_ids),
      route_gate_ids: getRouteGateIds(routeGateMatches),
      guardrail_findings: guardrailFindings,
      ...(args.includeRawPayload ? { raw_payload_json: rawPayload } : {}),
    }
  })

  cases.sort((a, b) => String(a.starter_tag).localeCompare(String(b.starter_tag)))

  const summary = {
    run_id: args.runId,
    source: 'real_user_regression',
    total_questions: selectedQuestions.length,
    total_cases: cases.length,
    answers_present: cases.filter(item => item.tebiq_answer_text?.trim()).length,
    missing_answers: cases
      .filter(item => !item.tebiq_answer_text?.trim())
      .map(item => item.starter_tag),
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
    throw new Error('Refusing to write full answer text under docs/eval. Pass a private output path, or --allow-docs-output if this is intentional.')
  }

  const payload = {
    exported_at: new Date().toISOString(),
    ...summary,
    cases,
  }
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(JSON.stringify({ ...summary, output: outputPath }, null, 2))
}

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : []
}

function stringOrNull(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

void main()
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.error(err instanceof Error ? err.message : String(err))
    process.exit(1)
  })
