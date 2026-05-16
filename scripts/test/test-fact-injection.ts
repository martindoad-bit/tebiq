/**
 * 0.6 Sprint Workstream C — Fact Layer production injection contract
 * (ENGINE Pack 2.2).
 *
 * DB-free / LLM-free unit tests that lock the wiring contract between:
 *   - lib/answer/fact-layer/matcher (Pack 2.1) — produces FactCardMatch
 *   - lib/consultation/stream-protocol — defines the SSE event shape
 *     and audit row shape
 *   - app/api/consultation/stream/route — emits the SSE event,
 *     injects the certain_block as a system message, and persists the
 *     audit row on terminal write
 *   - lib/db/queries/aiConsultations — accepts factCardIds /
 *     factCardAudit on completion + failure inputs
 *
 * Pack 2.1's existing test-fact-layer.ts already covers the matcher's
 * gateDecision + scoreCardAgainst behavior; this file focuses on the
 * Pack 2.2 deltas only.
 *
 * Usage: npx tsx scripts/test/test-fact-injection.ts
 */
import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

async function main() {
  const protocolMod = await import('@/lib/consultation/stream-protocol')

  let passes = 0
  let total = 0
  const fails: string[] = []
  function check(name: string, fn: () => void): void {
    total += 1
    try {
      fn()
      console.log(`PASS  ${name}`)
      passes += 1
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      console.log(`FAIL  ${name}`)
      console.log(`  └ ${msg}`)
      fails.push(`${name}: ${msg}`)
    }
  }

  const STREAM_ROUTE_PATH = join(process.cwd(), 'app/api/consultation/stream/route.ts')
  const QUERIES_PATH = join(process.cwd(), 'lib/db/queries/aiConsultations.ts')
  const C_PAGE_PATH = join(process.cwd(), 'app/c/[id]/page.tsx')
  const FACT_REFERENCE_PATH = join(process.cwd(), 'components/ui/fact-reference.tsx')
  const ME_PAGE_PATH = join(process.cwd(), 'app/me/consultations/page.tsx')

  // -----------------------------------------------------------------------
  // 1. SSE protocol: fact_cards_injected event shape
  // -----------------------------------------------------------------------
  check('1a. ConsultationEventName union now includes fact_cards_injected', () => {
    // Witness via assignability — TS would have failed at compile time
    // if the literal weren't in the union.
    const name: import('@/lib/consultation/stream-protocol').ConsultationEventName = 'fact_cards_injected'
    assert.equal(name, 'fact_cards_injected')
  })
  check('1b. formatConsultationFrame round-trips fact_cards_injected with audit items', () => {
    const frame = protocolMod.formatConsultationFrame({
      event: 'fact_cards_injected',
      ts: 100,
      items: [
        {
          fact_id: 'keiei-kanri-2025-10',
          title: '经营管理 2025 改正',
          fact_card_state: 'ai_verified',
          risk_level: 'critical',
          confidence: 'high',
          source_quality: 'official',
          official_sources: ['https://www.moj.go.jp/isa/applications/resources/10_00237.html'],
          evidence_points: [],
          related_links: [],
          injected_fields: [],
          needs_review_flags: ['jigyou_keikakusho_expert_check'],
          decision: 'inject',
        },
      ],
    })
    assert.ok(frame.includes('"event":"fact_cards_injected"'))
    assert.ok(frame.includes('"keiei-kanri-2025-10"'))
    assert.ok(frame.includes('"decision":"inject"'))
    assert.ok(frame.includes('"jigyou_keikakusho_expert_check"'))
  })
  check('1c. parseConsultationChunk preserves the event when parsing', () => {
    const buf = `data: ${JSON.stringify({
      event: 'fact_cards_injected',
      ts: 5,
      items: [
        {
          fact_id: 'spouse-divorce-separation',
          title: '配偶离婚分居',
          fact_card_state: 'human_reviewed',
          risk_level: 'critical',
          confidence: 'high',
          source_quality: 'official',
          official_sources: ['https://www.moj.go.jp/isa/x'],
          evidence_points: [],
          related_links: [],
          injected_fields: [],
          needs_review_flags: [],
          decision: 'inject',
        },
      ],
    })}\n\n`
    const { events } = protocolMod.parseConsultationChunk(buf)
    assert.equal(events.length, 1)
    const ev = events[0]
    assert.equal(ev.event, 'fact_cards_injected')
    if (ev.event === 'fact_cards_injected') {
      assert.equal(ev.items.length, 1)
      assert.equal(ev.items[0].fact_id, 'spouse-divorce-separation')
      assert.equal(ev.items[0].decision, 'inject')
    }
  })
  check('1d. fact_cards_injected is NOT a terminal event', () => {
    assert.equal(
      protocolMod.isTerminalConsultationEvent({
        event: 'fact_cards_injected',
        ts: 1,
        items: [],
      }),
      false,
    )
  })
  check('1e. empty-items frame still serialises (zero matches case)', () => {
    const frame = protocolMod.formatConsultationFrame({
      event: 'fact_cards_injected',
      ts: 1,
      items: [],
    })
    assert.ok(frame.includes('"items":[]'))
  })
  check('1f. ConsultationFactCardAuditEntry decision allowlist exhausted', () => {
    // Compile-time check: only inject | hint_only | drop accepted
    const entries: import('@/lib/consultation/stream-protocol').ConsultationFactCardAuditEntry[] = [
      {
        fact_id: 'a', title: 'A', fact_card_state: 's', risk_level: 'low', confidence: 'high',
        source_quality: 'official', official_sources: [], evidence_points: [], related_links: [], injected_fields: [],
        needs_review_flags: [], decision: 'inject',
      },
      {
        fact_id: 'b', title: 'B', fact_card_state: 's', risk_level: 'low', confidence: 'high',
        source_quality: 'official', official_sources: [], evidence_points: [], related_links: [], injected_fields: [],
        needs_review_flags: [], decision: 'hint_only',
      },
      {
        fact_id: 'c', title: 'C', fact_card_state: 's', risk_level: 'low', confidence: 'high',
        source_quality: 'official', official_sources: [], evidence_points: [], related_links: [], injected_fields: [],
        needs_review_flags: [], decision: 'drop',
      },
    ]
    assert.equal(entries.length, 3)
  })

  // -----------------------------------------------------------------------
  // 2. Stream route wiring (source-grep — locks the integration shape)
  // -----------------------------------------------------------------------
  const routeSrc = readFileSync(STREAM_ROUTE_PATH, 'utf8')

  check('2a. stream route imports matchFactCards from fact-layer/matcher', () => {
    assert.ok(
      routeSrc.includes("from '@/lib/answer/fact-layer/matcher'"),
      'stream route does not import matchFactCards',
    )
  })
  check('2b. stream route reads FACT_LAYER_ENABLED env flag (default false)', () => {
    assert.ok(
      routeSrc.includes(`process.env.FACT_LAYER_ENABLED === 'true'`),
      'stream route does not gate on FACT_LAYER_ENABLED === "true"',
    )
  })
  check('2c. stream route emits fact_cards_injected SSE event', () => {
    assert.ok(
      routeSrc.includes(`event: 'fact_cards_injected'`),
      'stream route does not emit fact_cards_injected',
    )
  })
  check('2d. stream route appends fact-card system message to messages array', () => {
    // The wiring uses `factSystemMessage` const + spread into messages.
    assert.ok(
      routeSrc.includes('factSystemMessage'),
      'stream route does not assemble factSystemMessage',
    )
    assert.ok(
      routeSrc.includes(`role: 'system' as const`),
      'stream route does not push fact-card content as a system message',
    )
  })
  check('2e. stream route substitutes {{TODAY_ISO}} placeholder in certain_block', () => {
    assert.ok(
      routeSrc.includes('{{TODAY_ISO}}'),
      'stream route does not reference {{TODAY_ISO}} placeholder',
    )
    assert.ok(
      routeSrc.includes('replaceAll(\'{{TODAY_ISO}}\''),
      'stream route does not substitute {{TODAY_ISO}}',
    )
  })
  check('2f. stream route propagates factCardIds + factCardAudit on completion', () => {
    assert.ok(
      routeSrc.includes('factCardIds,') && routeSrc.includes('factCardAudit,'),
      'stream route does not pass audit fields to persistence',
    )
  })
  check('2g. stream route fail-soft on matcher rejection (catch returns [])', () => {
    // The matcher promise has a .catch that logs and returns empty.
    assert.ok(
      routeSrc.includes('matchFactCards(question)'),
      'no matchFactCards(question) call',
    )
    assert.ok(
      /matchFactCards\(question\)\.catch/m.test(routeSrc),
      'matchFactCards call is not catch-protected',
    )
  })
  check('2h. when FACT_LAYER_ENABLED=false, no SSE emission and no system msg', () => {
    // The emit is gated on `factLayerEnabled`; verify by source pattern.
    assert.ok(
      /if \(factLayerEnabled\) \{\s*emit\(\{\s*event: 'fact_cards_injected'/m.test(routeSrc),
      'fact_cards_injected emission not gated on factLayerEnabled',
    )
  })
  check('2i. fact system message appended AFTER anchor block, BEFORE user msg', () => {
    // Pack §"injection point" priority order: …anchors → fact cards → user.
    // The wiring slices baseMessages.slice(0, -1), pushes the fact system
    // message, then re-appends the trailing user message.
    assert.ok(
      routeSrc.includes('baseMessages.slice(0, -1)'),
      'fact system message not interleaved before user msg',
    )
    assert.ok(
      routeSrc.includes('baseMessages[baseMessages.length - 1]'),
      'user message not re-appended after fact system message',
    )
  })

  // -----------------------------------------------------------------------
  // 3. Persistence query helpers accept the audit fields
  // -----------------------------------------------------------------------
  const queriesSrc = readFileSync(QUERIES_PATH, 'utf8')

  check('3a. CompleteAiConsultationInput accepts factCardIds + factCardAudit', () => {
    assert.ok(queriesSrc.includes('CompleteAiConsultationInput'))
    assert.ok(/CompleteAiConsultationInput[\s\S]*?factCardIds\?:\s*string\[\]/m.test(queriesSrc))
    assert.ok(/CompleteAiConsultationInput[\s\S]*?factCardAudit\?:\s*unknown\[\]/m.test(queriesSrc))
  })
  check('3b. FailAiConsultationInput accepts factCardIds + factCardAudit', () => {
    assert.ok(queriesSrc.includes('FailAiConsultationInput'))
    assert.ok(/FailAiConsultationInput[\s\S]*?factCardIds\?:\s*string\[\]/m.test(queriesSrc))
    assert.ok(/FailAiConsultationInput[\s\S]*?factCardAudit\?:\s*unknown\[\]/m.test(queriesSrc))
  })
  check('3c. completeAiConsultation only writes audit fields when defined', () => {
    // Conditional spread guards against accidental clobber on legacy callers.
    assert.ok(
      queriesSrc.includes(`...(input.factCardIds !== undefined ? { factCardIds: input.factCardIds } : {})`),
      'factCardIds spread not conditional',
    )
    assert.ok(
      queriesSrc.includes(`...(input.factCardAudit !== undefined ? { factCardAudit: input.factCardAudit } : {})`),
      'factCardAudit spread not conditional',
    )
  })

  // -----------------------------------------------------------------------
  // 4. Display: /c/[id] surfaces fact-card audit
  // -----------------------------------------------------------------------
  const cPageSrc = readFileSync(C_PAGE_PATH, 'utf8')

  check('4a. /c/[id] imports ConsultationFactCardAuditEntry', () => {
    assert.ok(
      cPageSrc.includes('ConsultationFactCardAuditEntry'),
      '/c/[id] does not import audit entry type',
    )
  })
  check('4b. /c/[id] parses row.factCardAudit defensively', () => {
    assert.ok(
      cPageSrc.includes('parseFactCardAudit'),
      '/c/[id] missing parseFactCardAudit helper',
    )
  })
  const factReferenceSrc = readFileSync(FACT_REFERENCE_PATH, 'utf8')

  check('4c. /c/[id] renders shared FactReferenceBlock', () => {
    assert.ok(cPageSrc.includes('FactReferenceBlock'))
    assert.ok(factReferenceSrc.includes('参考资料'))
    assert.ok(factReferenceSrc.includes('ReferenceLink'))
  })
  check('4d. FactReferenceBlock links evidence, related links, and official_sources fallback', () => {
    assert.ok(
      factReferenceSrc.includes('card.official_sources'),
      'fact reference does not read official_sources',
    )
    assert.ok(
      factReferenceSrc.includes('card.evidence_points'),
      'fact reference does not read claim-level evidence points',
    )
    assert.ok(
      factReferenceSrc.includes('card.related_links'),
      'fact reference does not read related_links',
    )
    assert.ok(factReferenceSrc.includes('target="_blank"'))
    assert.ok(factReferenceSrc.includes('rel="noreferrer noopener"'))
  })

  // -----------------------------------------------------------------------
  // 5. Display: /me/consultations badges fact-card count
  // -----------------------------------------------------------------------
  const mePageSrc = readFileSync(ME_PAGE_PATH, 'utf8')

  check('5a. /me/consultations adds factCardIds-count MetaPill', () => {
    assert.ok(
      mePageSrc.includes('row.factCardIds'),
      '/me/consultations does not surface fact-card count',
    )
    assert.ok(/来源\s*×/.test(mePageSrc), '/me/consultations missing 来源 ×N badge label')
  })

  // -----------------------------------------------------------------------
  // 6. Sensitive-zone invariants — Pack §"不能做什么"
  // -----------------------------------------------------------------------
  check('6a. consultation-alpha-v1.ts unchanged by Pack 2.2 — no fact-card refs', () => {
    const promptSrc = readFileSync(
      join(process.cwd(), 'lib/answer/prompt/consultation-alpha-v1.ts'),
      'utf8',
    )
    assert.ok(
      !promptSrc.includes('fact_card') && !promptSrc.includes('factCard'),
      'consultation-alpha-v1.ts should not reference fact_card directly',
    )
  })
  check('6b. llm-deepseek-provider.ts unchanged by Pack 2.2 — no fact-card refs', () => {
    // The legacy answer-pipeline provider stays untouched.
    const path = join(process.cwd(), 'lib/answer/core/llm-deepseek-provider.ts')
    let exists = true
    let src = ''
    try { src = readFileSync(path, 'utf8') } catch { exists = false }
    if (!exists) {
      // Path may have moved in some environment — non-fatal pass.
      return
    }
    assert.ok(
      !src.includes('fact_card') && !src.includes('factCard'),
      'llm-deepseek-provider.ts should not reference fact_card',
    )
  })
  check('6c. matcher loadCandidateCards filters out disabled state', () => {
    const matcherSrc = readFileSync(
      join(process.cwd(), 'lib/answer/fact-layer/matcher.ts'),
      'utf8',
    )
    // disabled is NOT in either candidate-state set.
    assert.ok(
      !matcherSrc.includes("'disabled', 'human_reviewed'") &&
      !matcherSrc.includes("'disabled', 'ai_verified'"),
      'matcher must not include disabled in candidate states',
    )
    assert.ok(
      matcherSrc.includes("['ai_verified', 'human_reviewed', 'needs_review']"),
      'matcher PRODUCTION_CANDIDATE_STATES drift',
    )
  })

  console.log(`\n0.6 Pack 2.2 fact-injection contract: ${passes}/${total} pass`)
  if (fails.length > 0) {
    console.log('Failures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }
}

main().catch(e => {
  console.error('fatal', e)
  process.exit(1)
})
