// 0.6 Sprint Workstream C — Internal fact-layer dry-run endpoint
// (ENGINE Pack 2.1 §6).
//
// QA / GM tool to preview which fact cards a question would match
// BEFORE production injects them. Lets QA validate the matcher against
// the QA case set in each `docs/fact-cards/<slug>.md` without touching
// the LLM or production user data.
//
// Scope:
//   - POST { question: string,
//            include_dry_run_states?: boolean,
//            today?: string (ISO date) }
//   - Returns { matches[], certain_blocks[],
//               needs_review_addenda[], would_inject_in_prod[],
//               gate_decisions[] }
//   - Never calls the LLM.
//   - Never reachable from the user-facing app — gated by
//     EVAL_LAB_ENABLED env var (404 when off).
//   - No side effects (no DB writes).
//
// Pack §6 source-of-truth: docs/engineering/0.6-fact-layer-design.md
//                          §"Internal dry-run endpoint".

import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { matchFactCards, type FactCardMatch } from '@/lib/answer/fact-layer/matcher'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Dry-run is bounded by DB read time, not LLM latency. Default 30s.
export const maxDuration = 30

interface DryRunRequest {
  question?: string
  include_dry_run_states?: boolean
  today?: string
}

interface DryRunResponse {
  /** All matches with full per-card audit. */
  matches: FactCardMatch[]
  /** Pre-substituted certain_blocks for cards with decision='inject'. */
  certain_blocks: Array<{ fact_id: string; text: string }>
  /** addenda for cards with decision='hint_only' that have an addendum. */
  needs_review_addenda: Array<{ fact_id: string; text: string }>
  /** fact_ids whose decision was 'inject' (i.e. production stream would
   *  inject these into the system prompt). */
  would_inject_in_prod: string[]
  /** Compact decision summary (mirrors per-match `.decision`). */
  gate_decisions: Array<{ fact_id: string; decision: string; risk_level: string; state: string }>
}

export async function POST(req: Request): Promise<Response> {
  if (!isEvalLabEnabled()) {
    return new NextResponse('Not Found', { status: 404 })
  }

  let body: DryRunRequest
  try {
    body = (await req.json()) as DryRunRequest
  } catch {
    return NextResponse.json({ error: 'bad_request', detail: 'invalid JSON body' }, { status: 400 })
  }

  const question = (body.question ?? '').trim()
  if (!question) {
    return NextResponse.json(
      { error: 'missing_question', detail: '`question` is required and must be non-empty' },
      { status: 400 },
    )
  }

  // Resolve `today` for {{TODAY_ISO}} substitution. Accept ISO date
  // (YYYY-MM-DD) or full datetime; default to server now.
  let today = new Date()
  if (body.today) {
    const parsed = new Date(body.today)
    if (!Number.isNaN(parsed.getTime())) today = parsed
  }
  const todayIso = today.toISOString().slice(0, 10)

  let matches: FactCardMatch[]
  try {
    matches = await matchFactCards(question, {
      include_dry_run_states: body.include_dry_run_states === true,
      today,
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'matcher_failed', detail: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }

  const certain_blocks: DryRunResponse['certain_blocks'] = []
  const needs_review_addenda: DryRunResponse['needs_review_addenda'] = []
  const would_inject_in_prod: string[] = []
  const gate_decisions: DryRunResponse['gate_decisions'] = []

  for (const m of matches) {
    gate_decisions.push({
      fact_id: m.fact_id,
      decision: m.decision,
      risk_level: m.risk_level,
      state: m.state,
    })
    if (m.decision === 'inject') {
      would_inject_in_prod.push(m.fact_id)
      certain_blocks.push({
        fact_id: m.fact_id,
        text: m.injection_certain_block.replaceAll('{{TODAY_ISO}}', todayIso),
      })
    } else if (m.decision === 'hint_only' && m.injection_needs_review_addendum) {
      needs_review_addenda.push({
        fact_id: m.fact_id,
        text: m.injection_needs_review_addendum,
      })
    }
  }

  const response: DryRunResponse = {
    matches,
    certain_blocks,
    needs_review_addenda,
    would_inject_in_prod,
    gate_decisions,
  }
  return NextResponse.json(response)
}
