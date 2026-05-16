#!/usr/bin/env tsx
/**
 * Import any TEBIQ eval pack JSON (RC56 / RC60 / future) into Eval Lab
 * via /api/internal/eval-lab/import-run. Idempotent on starter_tag
 * (the import-run endpoint upserts).
 *
 * Pack shape:
 *   {
 *     "name": "...",
 *     "items": [
 *       { "starter_tag": "...", "question_text": "...",
 *         "scenario": "...", "source": "imported",
 *         "metadata_json": { ... } }
 *     ]
 *   }
 *
 * Usage:
 *   npx tsx scripts/eval/import-eval-pack.ts \
 *     --input=docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json \
 *     --base-url=http://127.0.0.1:3000 \
 *     --run-id=tebiq-0.8.5-rc60 \
 *     --import-key-env=EVAL_LAB_IMPORT_KEY
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface PackItem {
  starter_tag: string
  question_text?: string
  question?: string
  scenario?: string
  source?: string
  metadata_json?: Record<string, unknown>
}

interface Pack {
  name?: string
  items: PackItem[]
}

interface Args {
  input: string
  baseUrl: string
  runId: string
  runName: string | null
  source: string
  importKeyEnv: string
  starterPrefix: string | null
  dryRun: boolean
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    input: '',
    baseUrl: 'http://127.0.0.1:3000',
    runId: '',
    runName: null,
    source: 'imported',
    importKeyEnv: 'EVAL_LAB_IMPORT_KEY',
    starterPrefix: null,
    dryRun: false,
  }
  for (const arg of argv) {
    if (arg.startsWith('--input=')) args.input = arg.slice('--input='.length)
    else if (arg.startsWith('--base-url=')) args.baseUrl = arg.slice('--base-url='.length).replace(/\/$/, '')
    else if (arg.startsWith('--run-id=')) args.runId = arg.slice('--run-id='.length)
    else if (arg.startsWith('--run-name=')) args.runName = arg.slice('--run-name='.length)
    else if (arg.startsWith('--source=')) args.source = arg.slice('--source='.length)
    else if (arg.startsWith('--import-key-env=')) args.importKeyEnv = arg.slice('--import-key-env='.length)
    else if (arg.startsWith('--starter-prefix=')) args.starterPrefix = arg.slice('--starter-prefix='.length)
    else if (arg === '--dry-run') args.dryRun = true
  }
  if (!args.input) throw new Error('--input=<path> is required')
  if (!args.runId) throw new Error('--run-id=<id> is required')
  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const inputPath = resolve(args.input)
  const pack = JSON.parse(readFileSync(inputPath, 'utf8')) as Pack
  const items = pack.items
    .filter(it => !args.starterPrefix || it.starter_tag.startsWith(args.starterPrefix))
    .map(it => ({
      starter_tag: it.starter_tag,
      question: it.question_text ?? it.question ?? '',
      question_text: it.question_text ?? it.question ?? '',
      scenario: it.scenario ?? null,
      source: it.source ?? args.source,
      metadata_json: it.metadata_json ?? {},
    }))
  if (items.length === 0) throw new Error('no items selected from pack')

  console.log(`pack: name=${pack.name ?? '(unnamed)'} input=${inputPath}`)
  console.log(`importing run_id=${args.runId} items=${items.length} base_url=${args.baseUrl}`)
  if (args.dryRun) {
    console.log('dry-run: not posting to eval-lab')
    console.log('first three starter_tags:', items.slice(0, 3).map(i => i.starter_tag).join(', '))
    return
  }

  const headers: Record<string, string> = { 'content-type': 'application/json' }
  const importKey = process.env[args.importKeyEnv]
  if (importKey) headers['x-eval-lab-import-key'] = importKey

  const res = await fetch(`${args.baseUrl}/api/internal/eval-lab/import-run`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      run_id: args.runId,
      run_name: args.runName ?? `TEBIQ Eval Pack Import ${args.runId}`,
      source: args.source,
      items,
    }),
  })
  const body = await res.text()
  if (!res.ok) {
    console.error(`import-run failed: http=${res.status}`)
    console.error(body.slice(0, 1000))
    process.exit(2)
  }
  console.log(`import-run: http=${res.status}`)
  console.log(body.slice(0, 2000))
}

void main().catch(err => {
  console.error(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
