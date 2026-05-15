#!/usr/bin/env tsx
/**
 * Import Knowledge Atlas answer A/B JSON reports into Eval Lab.
 *
 * A/current production TEBIQ is stored as `tebiq_current`.
 * B/knowledge-context candidate is stored in the existing spare
 * `deepseek_web` answer slot and displayed by the Eval Lab UI as
 * "知识层候选答案".
 *
 * Usage:
 *   tsx --env-file=.env.local scripts/eval/import-knowledge-atlas-answer-ab-to-eval-lab.ts --batch=28
 *   tsx --env-file=.env.local scripts/eval/import-knowledge-atlas-answer-ab-to-eval-lab.ts --all
 *   tsx --env-file=.env.local scripts/eval/import-knowledge-atlas-answer-ab-to-eval-lab.ts --file=docs/eval/foo.json
 *   tsx --env-file=.env.local scripts/eval/import-knowledge-atlas-answer-ab-to-eval-lab.ts --all --dry-run
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import {
  importEvalRunItems,
  type ImportEvalRunItem,
} from '@/lib/db/queries/eval-lab'

interface Args {
  batch: number | null
  all: boolean
  file: string | null
  dryRun: boolean
}

interface Report {
  generatedAt?: string
  baseUrl?: string
  mode?: string
  caveat?: string
  rows?: ReportRow[]
}

interface ReportRow {
  id: string
  priority?: string
  family: string
  question: string
  assetIds?: string[]
  expected?: {
    mustHave?: string[]
    mustNotHave?: string[]
  }
  heuristic?: Record<string, unknown>
  a?: {
    ok?: boolean
    status?: string
    engine_version?: string
    fact_card_ids?: string[]
    visible_text?: string
    latency_ms?: number
    error?: string
    attempts?: number
  }
  b?: {
    ok?: boolean
    model?: string
    text?: string
    latency_ms?: number
    provider_status?: string
    error?: string
    attempts?: number
  }
}

interface ImportPlan {
  file: string
  batch: number
  runId: string
  items: ImportEvalRunItem[]
}

function parseArgs(argv: string[]): Args {
  const args: Args = { batch: 28, all: false, file: null, dryRun: false }
  for (const arg of argv) {
    if (arg === '--all') {
      args.all = true
      args.batch = null
    } else if (arg === '--dry-run') {
      args.dryRun = true
    } else if (arg.startsWith('--batch=')) {
      args.batch = Number(arg.slice('--batch='.length))
      args.all = false
    } else if (arg.startsWith('--file=')) {
      args.file = arg.slice('--file='.length)
      args.all = false
      args.batch = null
    }
  }
  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const plans = buildPlans(args)
  if (plans.length === 0) throw new Error('No Knowledge Atlas answer A/B files found')

  const totalItems = plans.reduce((sum, plan) => sum + plan.items.length, 0)
  console.log(`import-knowledge-atlas-answer-ab: files=${plans.length} rows=${totalItems} dryRun=${args.dryRun}`)
  for (const plan of plans) {
    console.log(`- ${plan.runId}: ${plan.items.length} rows from ${plan.file}`)
  }

  if (args.dryRun) return

  let questionsUpserted = 0
  let answersUpserted = 0
  for (const plan of plans) {
    const result = await importEvalRunItems(plan.items)
    questionsUpserted += result.questionsUpserted
    answersUpserted += result.answersUpserted
    console.log(
      `imported ${plan.runId}: questions=${result.questionsUpserted} answers=${result.answersUpserted}`,
    )
  }
  console.log(`done: questions=${questionsUpserted} answers=${answersUpserted}`)
}

function buildPlans(args: Args): ImportPlan[] {
  const files = selectFiles(args)
  return files.map(file => {
    const report = readReport(file)
    const batch = inferBatch(file)
    const runId = `knowledge-atlas-phase1-batch${batch}`
    return {
      file,
      batch,
      runId,
      items: buildItems(report, { file, batch, runId }),
    }
  })
}

function selectFiles(args: Args): string[] {
  if (args.file) return [resolve(args.file)]
  const evalDir = resolve('docs/eval')
  if (args.all) {
    return readdirSync(evalDir)
      .filter(name => /^knowledge-atlas-phase1(?:-batch\d+)?-answer-ab-results\.json$/.test(name))
      .map(name => join(evalDir, name))
      .sort((a, b) => inferBatch(a) - inferBatch(b))
  }
  const batch = args.batch ?? 28
  const name = batch === 1
    ? 'knowledge-atlas-phase1-answer-ab-results.json'
    : `knowledge-atlas-phase1-batch${batch}-answer-ab-results.json`
  return [join(evalDir, name)]
}

function readReport(file: string): Report {
  if (!existsSync(file)) throw new Error(`File not found: ${file}`)
  const parsed = JSON.parse(readFileSync(file, 'utf8')) as Report
  if (!Array.isArray(parsed.rows)) throw new Error(`Invalid report, missing rows[]: ${file}`)
  return parsed
}

function buildItems(
  report: Report,
  ctx: { file: string; batch: number; runId: string },
): ImportEvalRunItem[] {
  return (report.rows ?? []).map(row => {
    const starterTag = stableStarterTag(ctx.batch, row.id)
    const promptVersion = extractPromptVersion(row.a?.engine_version)
    return {
      questionText: row.question,
      scenario: row.family,
      starterTag,
      source: 'knowledge_debug',
      metadataJson: {
        eval_run_id: ctx.runId,
        eval_run_name: `Knowledge Atlas Phase 1 Batch ${ctx.batch}`,
        eval_run_source: 'knowledge_atlas_phase1_answer_ab',
        report_file: ctx.file,
        report_generated_at: report.generatedAt ?? null,
        report_base_url: report.baseUrl ?? null,
        case_id: row.id,
        priority: row.priority ?? null,
        family: row.family,
        asset_ids: row.assetIds ?? [],
        expected: row.expected ?? {},
        heuristic: row.heuristic ?? {},
      },
      answers: [
        {
          answerType: 'tebiq_current',
          model: extractModel(row.a?.engine_version) ?? 'tebiq-current',
          promptVersion,
          answerText: row.a?.visible_text ?? null,
          engineVersion: row.a?.engine_version ?? null,
          status: row.a?.status ?? (row.a?.ok ? 'completed' : 'error'),
          latencyMs: row.a?.latency_ms ?? null,
          error: row.a?.ok === false ? row.a.error ?? 'tebiq_answer_failed' : null,
          rawPayloadJson: {
            answer_group: 'A_current_tebiq',
            fact_card_ids: row.a?.fact_card_ids ?? [],
            attempts: row.a?.attempts ?? null,
            heuristic: row.heuristic ?? {},
          },
        },
        {
          answerType: 'deepseek_web',
          model: row.b?.model ?? 'deepseek-v4-pro',
          promptVersion: 'knowledge-atlas-context-probe',
          answerText: row.b?.text ?? null,
          engineVersion: 'knowledge-atlas-phase1-candidate',
          status: row.b?.ok ? 'completed' : 'error',
          latencyMs: row.b?.latency_ms ?? null,
          error: row.b?.ok === false ? row.b.error ?? 'knowledge_candidate_failed' : null,
          rawPayloadJson: {
            answer_group: 'B_knowledge_context_candidate',
            display_answer_type: 'knowledge_candidate',
            title: '知识层候选答案',
            asset_ids: row.assetIds ?? [],
            provider_status: row.b?.provider_status ?? null,
            attempts: row.b?.attempts ?? null,
            heuristic: row.heuristic ?? {},
            caveat: report.caveat ?? null,
          },
        },
      ],
    }
  })
}

function inferBatch(file: string): number {
  const name = basename(file)
  const match = name.match(/batch(\d+)/)
  return match ? Number(match[1]) : 1
}

function stableStarterTag(batch: number, caseId: string): string {
  return `ka-p1-b${batch}-${caseId.toLowerCase()}`.slice(0, 80)
}

function extractPromptVersion(engineVersion: string | undefined): string {
  if (!engineVersion) return 'consultation_alpha_v17'
  return engineVersion.split(':')[0] || 'consultation_alpha_v17'
}

function extractModel(engineVersion: string | undefined): string | null {
  if (!engineVersion) return null
  const parts = engineVersion.split(':')
  return parts.length > 1 ? parts.slice(1).join(':') : null
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
