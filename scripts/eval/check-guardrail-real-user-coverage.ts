#!/usr/bin/env tsx
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { getRouteGateIds, matchRouteGates } from '@/lib/consultation/route-gates'

interface GuardrailQuestion {
  id: string
  profile: string
  question: string
  followup?: string
  expected_route_gate_ids?: string[]
}

const input = resolve(process.argv.find(arg => arg.startsWith('--input='))?.slice('--input='.length)
  ?? 'docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS.json')
const questions = JSON.parse(readFileSync(input, 'utf8')) as GuardrailQuestion[]

let passed = 0
for (const item of questions) {
  const matcherInput = [
    `用户背景：${item.profile}`,
    `问题：${item.question}`,
    item.followup ? `追问：${item.followup}` : null,
  ].filter(Boolean).join('\n')
  const actual = getRouteGateIds(matchRouteGates(matcherInput))
  const expected = item.expected_route_gate_ids ?? []
  const missing = expected.filter(id => !actual.includes(id))
  if (missing.length > 0) {
    console.error(`FAIL ${item.id}: missing ${missing.join(', ')}; actual=${actual.join(', ') || '(none)'}`)
    process.exitCode = 1
  } else {
    passed += 1
    console.log(`PASS ${item.id}: ${expected.join(', ')}`)
  }
}

console.log(`guardrail real-user coverage: ${passed}/${questions.length} passed`)
