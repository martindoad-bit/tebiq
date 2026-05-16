// Direct RC60 fill bypassing the slow /state endpoint.
// Reads RC60 question IDs from DB via `postgres` driver, then
// hits /api/internal/eval-lab/tebiq-answer per question.
import { readFileSync, writeFileSync } from 'node:fs'
import postgres from 'postgres'

const BASE = process.env.BASE || 'http://127.0.0.1:3001'
const ADMIN_KEY = process.env.ADMIN_KEY
const CONCURRENCY = Number(process.env.CONCURRENCY || 3)
const PREFIX = process.env.PREFIX || '0.8.5-rc60-'
const PACK = process.env.PACK || 'docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json'
const OUT = process.env.OUT || 'docs/eval/TEBIQ_0_8_5_RC60_RUN_SUMMARY.json'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL required')
if (!ADMIN_KEY) throw new Error('ADMIN_KEY required')

const pack = JSON.parse(readFileSync(PACK, 'utf8'))
const tagToQ = new Map(pack.items.map(it => [it.starter_tag, it]))

const sql = postgres(process.env.DATABASE_URL, { max: 1 })
const rows = await sql`SELECT id, starter_tag FROM eval_questions WHERE starter_tag LIKE ${PREFIX + '%'} ORDER BY starter_tag`
await sql.end()
console.log(`found ${rows.length} questions for prefix=${PREFIX}`)

const tasks = rows.map(r => ({
  id: r.id,
  starter_tag: r.starter_tag,
  question: tagToQ.get(r.starter_tag)?.question_text || '',
}))

let done = 0
let idx = 0
const results = []
async function worker() {
  while (idx < tasks.length) {
    const t = tasks[idx++]
    const started = Date.now()
    try {
      const res = await fetch(`${BASE}/api/internal/eval-lab/tebiq-answer?key=${encodeURIComponent(ADMIN_KEY)}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question_id: t.id, question: t.question }),
      })
      const json = await res.json().catch(() => ({}))
      const took = Date.now() - started
      done++
      const pass = res.ok && json.ok && !json.fallback_reason && json.status === 'completed'
      const len = (json.answer_text || '').length
      const findings = (json.guardrail_findings || []).length
      const facts = (json.fact_card_audit || []).length
      const routes = (json.route_gate_ids || []).length
      console.log(
        `[${done}/${tasks.length}] ${pass ? 'OK' : 'FAIL'} ${t.starter_tag} len=${len} routes=${routes} facts=${facts} findings=${findings} took=${took}ms ${json.fallback_reason || json.error || ''}`,
      )
      results.push({
        starter_tag: t.starter_tag,
        question_id: t.id,
        ok: pass,
        http: res.status,
        status: json.status || null,
        engine_version: json.engine_version || null,
        prompt_version: json.prompt_version || null,
        fallback_reason: json.fallback_reason || null,
        error: json.error || null,
        answer_chars: len,
        fact_card_ids: (json.fact_card_audit || []).map(f => f.fact_id),
        route_gate_ids: json.route_gate_ids || [],
        guardrail_findings: json.guardrail_findings || [],
        latency_ms: took,
      })
    } catch (err) {
      done++
      console.log(`[${done}/${tasks.length}] EXCEPT ${t.starter_tag} ${err.message}`)
      results.push({ starter_tag: t.starter_tag, question_id: t.id, ok: false, error: err.message, latency_ms: Date.now() - started })
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker))

const summary = {
  generated_at: new Date().toISOString(),
  prefix: PREFIX,
  total: results.length,
  ok: results.filter(r => r.ok).length,
  failed: results.filter(r => !r.ok).length,
  with_findings: results.filter(r => (r.guardrail_findings || []).length > 0).length,
  with_routes: results.filter(r => (r.route_gate_ids || []).length > 0).length,
  with_facts: results.filter(r => (r.fact_card_ids || []).length > 0).length,
  failed_samples: results
    .filter(r => !r.ok)
    .map(r => ({ starter_tag: r.starter_tag, status: r.status, error: r.error, fallback: r.fallback_reason, chars: r.answer_chars })),
  with_findings_samples: results
    .filter(r => (r.guardrail_findings || []).length > 0)
    .map(r => ({ starter_tag: r.starter_tag, findings: r.guardrail_findings.map(f => f.id || f.kind || f.code) })),
}
writeFileSync(OUT, JSON.stringify({ summary, results }, null, 2))
console.log('SUMMARY:', JSON.stringify(summary, null, 2))
