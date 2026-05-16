// Direct AQL export bypassing /state. Reads RC questions + their tebiq_current
// answers from DB, joins with route gates + validators, writes private JSON.
import { writeFileSync } from 'node:fs'
import postgres from 'postgres'
import { matchRouteGates, getRouteGateIds } from '@/lib/consultation/route-gates'
import { validateAnswer } from '@/lib/consultation/guardrail-validator'

const PREFIX = process.env.PREFIX || '0.8.5-rc60-'
const OUT = process.env.OUT || `/tmp/tebiq-${PREFIX.replace(/-$/, '')}-aql.json`

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL required')

  const sql = postgres(process.env.DATABASE_URL, { max: 1 })
  const qs = await sql<Array<{
    id: string
    question_text: string
    scenario: string | null
    source: string
    starter_tag: string | null
    metadata_json: Record<string, unknown> | null
  }>>`
    SELECT id, question_text, scenario, source, starter_tag, metadata_json
    FROM eval_questions
    WHERE starter_tag LIKE ${PREFIX + '%'}
    ORDER BY starter_tag
  `
  const ids = qs.map(q => q.id)
  const ans = ids.length === 0 ? [] : await sql<Array<{
    question_id: string
    answer_type: string
    answer_text: string | null
    status: string | null
    fallback_reason: string | null
    error: string | null
    engine_version: string | null
    prompt_version: string | null
    latency_ms: number | null
    raw_payload_json: Record<string, unknown> | null
  }>>`
    SELECT question_id, answer_type, answer_text, status, fallback_reason, error,
           engine_version, prompt_version, latency_ms, raw_payload_json
    FROM eval_answers
    WHERE question_id IN ${sql(ids)}
      AND answer_type = 'tebiq_current'
  `
  await sql.end()

  const ansByQ = new Map(ans.map(a => [a.question_id, a]))

  const cases = qs.map(q => {
    const a = ansByQ.get(q.id) || null
    const md = (q.metadata_json || {}) as { expected_route_gate?: string[] }
    const expectedRoutes = Array.isArray(md.expected_route_gate) ? md.expected_route_gate : []
    const matches = matchRouteGates(q.question_text)
    const actualRoutes = getRouteGateIds(matches)
    const findings = a?.answer_text
      ? validateAnswer({ question: q.question_text, answer: a.answer_text, routeGateMatches: matches })
      : []
    const raw = (a?.raw_payload_json || {}) as Record<string, unknown>
    const factAudit = Array.isArray(raw.fact_card_audit) ? (raw.fact_card_audit as Array<{ fact_id: string }>) : []
    const factIds = Array.isArray(raw.fact_card_ids)
      ? (raw.fact_card_ids as string[])
      : factAudit.map(f => f.fact_id)
    return {
      starter_tag: q.starter_tag,
      scenario: q.scenario,
      source: q.source,
      question_id: q.id,
      question_text: q.question_text,
      metadata_json: q.metadata_json,
      tebiq_answer_text: a?.answer_text ?? null,
      answer_chars: (a?.answer_text || '').length,
      status: a?.status ?? null,
      fallback_reason: a?.fallback_reason ?? null,
      error: a?.error ?? null,
      engine_version: a?.engine_version ?? null,
      prompt_version: a?.prompt_version ?? null,
      latency_ms: a?.latency_ms ?? null,
      fact_card_ids: factIds,
      route_gate_ids: actualRoutes,
      expected_route_gate_ids: expectedRoutes,
      route_gate_misses: expectedRoutes.filter(id => !actualRoutes.includes(id)),
      guardrail_findings: findings,
    }
  })

  const summary = {
    exported_at: new Date().toISOString(),
    prefix: PREFIX,
    total: cases.length,
    answers_present: cases.filter(c => c.tebiq_answer_text).length,
    completed: cases.filter(c => c.status === 'completed').length,
    with_findings: cases.filter(c => c.guardrail_findings.length > 0).length,
    with_route_misses: cases.filter(c => c.route_gate_misses.length > 0).length,
    with_fallback: cases.filter(c => c.fallback_reason).length,
    with_facts: cases.filter(c => c.fact_card_ids.length > 0).length,
  }
  writeFileSync(OUT, JSON.stringify({ summary, cases }, null, 2))
  console.log(JSON.stringify({ ...summary, output: OUT }, null, 2))
}

main().catch(err => {
  console.error(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
