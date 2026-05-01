import { readFile } from 'fs/promises'
import path from 'path'
import { buildAnswer } from '@/lib/answer/match-answer'

interface LiveRegressionCase {
  query: string
  must_have?: string[]
  must_not?: string[]
  allow_clarify?: boolean
}

interface Row {
  query: string
  answer_type: string
  review_status: string
  matched_seed_id: string
  p0: boolean
  p1: boolean
  p2: boolean
  notes: string
}

const FORBIDDEN = [
  '已收到',
  '提交问题',
  'summary',
  'sections',
  'next_steps',
  'answer_level',
  'review_status',
  'source_grade',
  'raw JSON',
  '原始结果',
]

async function main() {
  process.env.ANSWER_INTENT_DISABLE_AI = '1'
  process.env.LLM_INTENT_DISABLE_AI = '1'
  const fixturePath = path.join(process.cwd(), 'tests/fixtures/live-regression-qa-v2.json')
  const cases = JSON.parse(await readFile(fixturePath, 'utf8')) as LiveRegressionCase[]
  const rows: Row[] = []
  let p0 = 0
  let p1 = 0
  let p2 = 0

  for (const item of cases) {
    const answer = await buildAnswer({ questionText: item.query })
    const text = answerText(answer)
    const compactText = compactForPattern(text)
    const problems: string[] = []
    const warnings: string[] = []

    if (!['matched', 'draft', 'cannot_determine'].includes(answer.answer_type)) problems.push('invalid_answer_type')
    if (!answer.action_answer?.conclusion) problems.push('missing_conclusion')
    if (!answer.intent_guard_pass) problems.push('intent_guard_not_passed')

    const forbidden = FORBIDDEN.filter(word => text.includes(word))
    if (forbidden.length) problems.push(`forbidden_copy:${forbidden.join(',')}`)

    for (const pattern of item.must_not ?? []) {
      if (new RegExp(pattern).test(text)) problems.push(`must_not:${pattern}`)
    }
    for (const pattern of item.must_have ?? []) {
      if (!matchesPattern(pattern, text, compactText)) {
        if (item.allow_clarify && answer.answer_type === 'cannot_determine') warnings.push(`missing_but_clarified:${pattern}`)
        else problems.push(`missing:${pattern}`)
      }
    }

    if (answer.answer_type === 'cannot_determine' && item.allow_clarify === false && (item.must_have?.length ?? 0) > 0) {
      warnings.push('clarification_for_expected_answer')
    }
    if (answer.answer_type === 'draft') warnings.push('draft_answer')

    const isP0 = problems.length > 0
    const isP1 = !isP0 && warnings.some(note => note === 'clarification_for_expected_answer')
    const isP2 = !isP0 && !isP1 && warnings.length > 0
    if (isP0) p0 += 1
    if (isP1) p1 += 1
    if (isP2) p2 += 1
    rows.push({
      query: item.query,
      answer_type: answer.answer_type,
      review_status: answer.review_status,
      matched_seed_id: answer.matched_seed_id ?? '',
      p0: isP0,
      p1: isP1,
      p2: isP2,
      notes: [...problems, ...warnings].join('; ') || 'ok',
    })
  }

  console.table(rows)
  console.log(JSON.stringify({ total: cases.length, P0: p0, P1: p1, P2: p2 }, null, 2))

  if (cases.length < 100) {
    console.error(`live regression fixture too small: ${cases.length}`)
    process.exit(1)
  }
  if (p0 !== 0) process.exit(1)
  if (p1 >= 20) process.exit(1)
}

function answerText(answer: Awaited<ReturnType<typeof buildAnswer>>): string {
  const action = answer.action_answer
  return [
    answer.title,
    answer.summary,
    answer.intent_summary,
    answer.matched_seed_id,
    action?.conclusion,
    ...(action?.what_to_do ?? []),
    ...(action?.where_to_go ?? []),
    ...(action?.how_to_do ?? []),
    ...(action?.documents_needed ?? []),
    ...(action?.deadline_or_timing ?? []),
    ...(action?.consequences ?? []),
    ...(action?.expert_handoff ?? []),
  ].filter(Boolean).join('\n')
}

function matchesPattern(pattern: string, text: string, compactText: string): boolean {
  const regex = new RegExp(pattern)
  return regex.test(text) || regex.test(compactText)
}

function compactForPattern(value: string): string {
  return value.replace(/\s+/g, '')
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
