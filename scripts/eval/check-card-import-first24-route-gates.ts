#!/usr/bin/env tsx
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { getRouteGateIds, matchRouteGates } from '@/lib/consultation/route-gates'

interface RouteGatePack {
  name?: string
  items: Array<{
    starter_tag: string
    question_text: string
    metadata_json?: {
      expected_route_gate?: string[]
    }
  }>
}

interface Args {
  input: string
  label: string | null
  starterPrefix: string | null
  limit: number | null
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    input: 'docs/eval/TEBIQ_0_8_5_CARD_IMPORT_FIRST24.json',
    label: null,
    starterPrefix: null,
    limit: null,
  }
  for (const arg of argv) {
    if (arg.startsWith('--input=')) args.input = arg.slice('--input='.length)
    else if (arg.startsWith('--label=')) args.label = arg.slice('--label='.length)
    else if (arg.startsWith('--starter-prefix=')) args.starterPrefix = arg.slice('--starter-prefix='.length)
    else if (arg.startsWith('--limit=')) args.limit = Number(arg.slice('--limit='.length))
  }
  if (args.limit !== null && (!Number.isInteger(args.limit) || args.limit < 1)) {
    throw new Error(`invalid --limit=${args.limit}; use a positive integer`)
  }
  return args
}

const args = parseArgs(process.argv.slice(2))
const input = resolve(args.input)
const pack = JSON.parse(readFileSync(input, 'utf8')) as RouteGatePack
const label = args.label ?? pack.name ?? input
const items = pack.items
  .filter(item => !args.starterPrefix || item.starter_tag.startsWith(args.starterPrefix))
  .slice(0, args.limit ?? undefined)

let passed = 0
let total = 0
for (const item of items) {
  const expected = item.metadata_json?.expected_route_gate ?? []
  if (expected.length === 0) continue
  total += 1
  const actual = getRouteGateIds(matchRouteGates(item.question_text))
  const missing = expected.filter(id => !actual.includes(id))
  if (missing.length > 0) {
    console.error(
      `FAIL ${item.starter_tag}: missing=${missing.join(',')} actual=${actual.join(',') || '(none)'}`,
    )
    process.exitCode = 1
  } else {
    passed += 1
    console.log(`PASS ${item.starter_tag}: ${expected.join(',')}`)
  }
}

console.log(`${label} route-gate coverage: ${passed}/${total} expected_cases=${total} selected_items=${items.length}`)
