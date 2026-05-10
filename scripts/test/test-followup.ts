/**
 * 0.6 Sprint Workstream D — controlled follow-up endpoint contract
 * (ENGINE Pack 2.3).
 *
 * DB-free / network-free unit tests covering:
 *   - SSE protocol: follow_up_limit_reached event shape, ConsultationSummary type
 *   - constants: MAX_FOLLOW_UP_ROUNDS = 3, FOLLOW_UP_LIMIT_MESSAGE wording
 *   - summary builder: coerce, message-array shape, fallback paths,
 *     summaryAsSystemMessage
 *   - persistence: createAiConsultation accepts parent + followUpCount;
 *     completeAiConsultation accepts consultationSummary;
 *     setConsultationSummary helper exposed; getFollowUpChain helper exposed
 *   - stream/route.ts wiring: post-completion summary build hooked
 *   - follow-up/route.ts wiring: limit check, summary injection,
 *     parent loading, fact-card union, viewer-match guard, age guard
 *
 * Usage: npx tsx scripts/test/test-followup.ts
 */
import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

async function main() {
  const protocolMod = await import('@/lib/consultation/stream-protocol')
  const summaryMod = await import('@/lib/answer/followup/summary-builder')
  const constantsMod = await import('@/lib/answer/followup/constants')

  let passes = 0
  let total = 0
  const fails: string[] = []
  async function check(name: string, fn: () => void | Promise<void>): Promise<void> {
    total += 1
    try {
      await fn()
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
  const FOLLOWUP_ROUTE_PATH = join(process.cwd(), 'app/api/consultation/follow-up/route.ts')
  const QUERIES_PATH = join(process.cwd(), 'lib/db/queries/aiConsultations.ts')
  const C_PAGE_PATH = join(process.cwd(), 'app/c/[id]/page.tsx')
  const ENTRY_CLIENT_PATH = join(process.cwd(), 'app/ai-consultation/AiConsultationEntryClient.tsx')

  // -----------------------------------------------------------------------
  // 1. SSE protocol: follow_up_limit_reached event
  // -----------------------------------------------------------------------
  await check('1a. ConsultationEventName union now includes follow_up_limit_reached', () => {
    const name: import('@/lib/consultation/stream-protocol').ConsultationEventName = 'follow_up_limit_reached'
    assert.equal(name, 'follow_up_limit_reached')
  })
  await check('1b. formatConsultationFrame round-trips follow_up_limit_reached', () => {
    const frame = protocolMod.formatConsultationFrame({
      event: 'follow_up_limit_reached',
      ts: 100,
      message: 'limit hit',
      follow_up_count: 3,
    })
    assert.ok(frame.includes('"event":"follow_up_limit_reached"'))
    assert.ok(frame.includes('"follow_up_count":3'))
    assert.ok(frame.includes('"message":"limit hit"'))
  })
  await check('1c. parseConsultationChunk preserves follow_up_limit_reached event', () => {
    const buf = `data: ${JSON.stringify({
      event: 'follow_up_limit_reached',
      ts: 5,
      message: '这个问题已经包含多轮补充',
      follow_up_count: 3,
    })}\n\n`
    const { events } = protocolMod.parseConsultationChunk(buf)
    assert.equal(events.length, 1)
    const ev = events[0]
    assert.equal(ev.event, 'follow_up_limit_reached')
    if (ev.event === 'follow_up_limit_reached') {
      assert.equal(ev.follow_up_count, 3)
      assert.ok(ev.message.length > 0)
    }
  })
  await check('1d. follow_up_limit_reached is a terminal event for parsers', () => {
    // The server still pairs limit_reached with a synthetic completed
    // frame for older clients, but parsers may stop safely on
    // follow_up_limit_reached because no DB row or LLM call follows.
    assert.equal(
      protocolMod.isTerminalConsultationEvent({
        event: 'follow_up_limit_reached',
        ts: 1,
        message: 'x',
        follow_up_count: 3,
      }),
      true,
    )
  })
  await check('1e. ConsultationSummary type accepts the canonical 4-field shape', () => {
    const s: import('@/lib/consultation/stream-protocol').ConsultationSummary = {
      user_goal: 'apply for permanent residence',
      known_facts: ['employed for 5 years', 'no missed nenkin'],
      missing_facts: ['kosei nenkin record from 2022'],
      last_answer_key_points: ['need to gather kosei nenkin record'],
    }
    assert.equal(s.user_goal.length > 0, true)
    assert.equal(Array.isArray(s.known_facts), true)
  })

  // -----------------------------------------------------------------------
  // 2. constants
  // -----------------------------------------------------------------------
  await check('2a. MAX_FOLLOW_UP_ROUNDS = 3 (Pack §4 cap)', () => {
    assert.equal(constantsMod.MAX_FOLLOW_UP_ROUNDS, 3)
  })
  await check('2b. FOLLOW_UP_LIMIT_MESSAGE matches Pack §4 voice canonical', () => {
    assert.equal(
      constantsMod.FOLLOW_UP_LIMIT_MESSAGE,
      '这个问题已经包含多轮补充，建议保存咨询、整理材料后再继续，或考虑人工确认。',
    )
  })
  await check('2c. PARENT_MAX_AGE_HOURS = 24 (Pack §7 abuse guard)', () => {
    assert.equal(constantsMod.PARENT_MAX_AGE_HOURS, 24)
  })
  await check('2d. ENFORCE_VIEWER_MATCH defaults true', () => {
    assert.equal(constantsMod.ENFORCE_VIEWER_MATCH, true)
  })

  // -----------------------------------------------------------------------
  // 3. summary builder helpers
  // -----------------------------------------------------------------------
  const internals = summaryMod._summaryInternals

  await check('3a. coerceSummary returns null on garbage input', () => {
    assert.equal(internals.coerceSummary(null), null)
    assert.equal(internals.coerceSummary({}), null)
    assert.equal(internals.coerceSummary({ user_goal: '' }), null)
    assert.equal(internals.coerceSummary('not an object'), null)
  })
  await check('3b. coerceSummary clamps list lengths', () => {
    const s = internals.coerceSummary({
      user_goal: 'goal',
      known_facts: Array.from({ length: 20 }, (_, i) => `fact ${i}`),
      missing_facts: Array.from({ length: 20 }, (_, i) => `m ${i}`),
      last_answer_key_points: Array.from({ length: 20 }, (_, i) => `kp ${i}`),
    })
    assert.ok(s !== null)
    assert.ok(s!.known_facts.length <= internals.KNOWN_FACTS_MAX)
    assert.ok(s!.missing_facts.length <= internals.MISSING_FACTS_MAX)
    assert.ok(s!.last_answer_key_points.length <= internals.KEY_POINTS_MAX)
  })
  await check('3c. coerceSummary truncates long strings', () => {
    const longGoal = 'g'.repeat(internals.GOAL_LENGTH_MAX + 200)
    const longFact = 'f'.repeat(internals.FACT_LENGTH_MAX + 200)
    const s = internals.coerceSummary({
      user_goal: longGoal,
      known_facts: [longFact],
      missing_facts: [longFact],
      last_answer_key_points: [longFact],
    })
    assert.ok(s !== null)
    assert.equal(s!.user_goal.length, internals.GOAL_LENGTH_MAX)
    assert.equal(s!.known_facts[0].length, internals.FACT_LENGTH_MAX)
  })
  await check('3d. coerceSummary drops non-string entries silently', () => {
    const s = internals.coerceSummary({
      user_goal: 'goal',
      known_facts: ['fact1', 42, null, 'fact2'],
    })
    assert.ok(s !== null)
    assert.deepEqual(s!.known_facts, ['fact1', 'fact2'])
  })
  await check('3e. buildSummaryMessages includes prior summary when present', () => {
    const msgs = summaryMod.buildSummaryMessages({
      rootQuestion: 'root',
      userMessage: 'addition',
      answerText: 'answer',
      priorSummary: {
        user_goal: 'goal',
        known_facts: ['f1'],
        missing_facts: [],
        last_answer_key_points: ['kp1'],
      },
      roundIndex: 1,
    })
    assert.equal(msgs.length, 2)
    assert.equal(msgs[0].role, 'system')
    assert.equal(msgs[1].role, 'user')
    const userBody = msgs[1].content
    assert.ok(userBody.includes('root'))
    assert.ok(userBody.includes('addition'))
    assert.ok(userBody.includes('answer'))
    assert.ok(userBody.includes('user_goal'))
    assert.ok(userBody.includes('上一轮已有的结构化摘要'))
  })
  await check('3f. buildSummaryMessages omits prior summary block when null', () => {
    const msgs = summaryMod.buildSummaryMessages({
      rootQuestion: 'root',
      userMessage: 'q',
      answerText: 'a',
      priorSummary: null,
      roundIndex: 0,
    })
    assert.equal(msgs.length, 2)
    assert.ok(!msgs[1].content.includes('上一轮已有的结构化摘要'))
  })
  await check('3g. summaryAsSystemMessage returns null on null input', () => {
    assert.equal(summaryMod.summaryAsSystemMessage(null), null)
  })
  await check('3h. summaryAsSystemMessage produces a system message with all fields', () => {
    const m = summaryMod.summaryAsSystemMessage({
      user_goal: 'apply PR',
      known_facts: ['kf1', 'kf2'],
      missing_facts: ['mf1'],
      last_answer_key_points: ['kp1', 'kp2'],
    })
    assert.ok(m !== null)
    assert.equal(m!.role, 'system')
    assert.ok(m!.content.includes('apply PR'))
    assert.ok(m!.content.includes('kf1'))
    assert.ok(m!.content.includes('mf1'))
    assert.ok(m!.content.includes('kp2'))
  })
  await check('3i. buildConsultationSummary returns prior when no API key', async () => {
    const result = await summaryMod.buildConsultationSummary({
      rootQuestion: 'r',
      userMessage: 'm',
      answerText: 'a',
      priorSummary: { user_goal: 'g', known_facts: [], missing_facts: [], last_answer_key_points: [] },
      roundIndex: 0,
    }, { apiKey: '' })
    assert.equal(result.fallback_reason, 'no_api_key')
    assert.deepEqual(result.summary, { user_goal: 'g', known_facts: [], missing_facts: [], last_answer_key_points: [] })
  })
  await check('3j. buildConsultationSummary handles HTTP error → fallback to prior', async () => {
    const stubFetch = async () => new Response('error', { status: 500 })
    const result = await summaryMod.buildConsultationSummary({
      rootQuestion: 'r',
      userMessage: 'm',
      answerText: 'a',
      priorSummary: null,
      roundIndex: 0,
    }, { apiKey: 'fake', fetchImpl: stubFetch as unknown as typeof fetch })
    assert.equal(result.fallback_reason, 'http_500')
    assert.equal(result.summary, null)
  })
  await check('3k. buildConsultationSummary handles invalid JSON content → fallback', async () => {
    const stubFetch = async () => new Response(JSON.stringify({
      choices: [{ message: { content: 'not json {' } }],
    }), { status: 200, headers: { 'content-type': 'application/json' } })
    const result = await summaryMod.buildConsultationSummary({
      rootQuestion: 'r',
      userMessage: 'm',
      answerText: 'a',
      priorSummary: null,
      roundIndex: 0,
    }, { apiKey: 'fake', fetchImpl: stubFetch as unknown as typeof fetch })
    assert.equal(result.fallback_reason, 'invalid_json')
  })
  await check('3l. buildConsultationSummary parses valid JSON → coerced summary', async () => {
    const stubFetch = async () => new Response(JSON.stringify({
      choices: [{
        message: {
          content: JSON.stringify({
            user_goal: '永住申请',
            known_facts: ['已工作 5 年'],
            missing_facts: ['年金记录'],
            last_answer_key_points: ['先核对年金缴纳明细'],
          }),
        },
      }],
    }), { status: 200, headers: { 'content-type': 'application/json' } })
    const result = await summaryMod.buildConsultationSummary({
      rootQuestion: 'r',
      userMessage: 'm',
      answerText: 'a',
      priorSummary: null,
      roundIndex: 0,
    }, { apiKey: 'fake', fetchImpl: stubFetch as unknown as typeof fetch })
    assert.equal(result.fallback_reason, undefined)
    assert.ok(result.summary !== null)
    assert.equal(result.summary!.user_goal, '永住申请')
    assert.deepEqual(result.summary!.known_facts, ['已工作 5 年'])
  })

  // -----------------------------------------------------------------------
  // 4. Persistence helpers (source-grep)
  // -----------------------------------------------------------------------
  const queriesSrc = readFileSync(QUERIES_PATH, 'utf8')

  await check('4a. CreateAiConsultationInput accepts parentConsultationId + followUpCount', () => {
    assert.ok(/CreateAiConsultationInput[\s\S]*?parentConsultationId\?:\s*string\s*\|\s*null/m.test(queriesSrc))
    assert.ok(/CreateAiConsultationInput[\s\S]*?followUpCount\?:\s*number/m.test(queriesSrc))
  })
  await check('4b. CompleteAiConsultationInput accepts consultationSummary', () => {
    assert.ok(/CompleteAiConsultationInput[\s\S]*?consultationSummary\?:\s*unknown/m.test(queriesSrc))
  })
  await check('4c. setConsultationSummary helper exported', () => {
    assert.ok(queriesSrc.includes('export async function setConsultationSummary'))
  })
  await check('4d. getFollowUpChain helper exported', () => {
    assert.ok(queriesSrc.includes('export async function getFollowUpChain'))
  })

  // -----------------------------------------------------------------------
  // 5. Stream route post-completion summary wiring
  // -----------------------------------------------------------------------
  const streamSrc = readFileSync(STREAM_ROUTE_PATH, 'utf8')

  await check('5a. stream route imports summary builder', () => {
    assert.ok(streamSrc.includes(`from '@/lib/answer/followup/summary-builder'`))
  })
  await check('5b. stream route imports setConsultationSummary', () => {
    assert.ok(streamSrc.includes('setConsultationSummary'))
  })
  await check('5c. stream route invokes buildAndPersistInitialSummary post-completion', () => {
    assert.ok(streamSrc.includes('buildAndPersistInitialSummary'))
  })
  await check('5d. stream route does NOT block stream on summary build (fire-and-forget)', () => {
    // The call site uses `void buildAndPersistInitialSummary(...)` so
    // promise rejection doesn't unhandled-error and the stream close
    // doesn't await it.
    assert.ok(/void buildAndPersistInitialSummary\(/m.test(streamSrc))
  })

  // -----------------------------------------------------------------------
  // 6. Follow-up route wiring + invariants
  // -----------------------------------------------------------------------
  const followupSrc = readFileSync(FOLLOWUP_ROUTE_PATH, 'utf8')

  await check('6a. follow-up route enforces parent_consultation_id required', () => {
    assert.ok(followupSrc.includes(`'missing_parent'`))
  })
  await check('6b. follow-up route enforces user_addition required', () => {
    assert.ok(followupSrc.includes(`'missing_user_addition'`))
  })
  await check('6c. follow-up route loads parent via getAiConsultationById', () => {
    assert.ok(followupSrc.includes('getAiConsultationById(parentId)'))
  })
  await check('6d. follow-up route checks MAX_FOLLOW_UP_ROUNDS cap before LLM call', () => {
    assert.ok(followupSrc.includes('newFollowUpCount > MAX_FOLLOW_UP_ROUNDS'))
    assert.ok(followupSrc.includes('streamLimitReached'))
  })
  await check('6e. follow-up route emits follow_up_limit_reached SSE event when capped', () => {
    assert.ok(followupSrc.includes(`event: 'follow_up_limit_reached'`))
    assert.ok(followupSrc.includes('FOLLOW_UP_LIMIT_MESSAGE'))
  })
  await check('6f. follow-up route resolves chain root (parent.parentConsultationId fallback)', () => {
    assert.ok(followupSrc.includes('parent.parentConsultationId ?? parent.id'))
  })
  await check('6g. follow-up route persists parentConsultationId on the new row', () => {
    assert.ok(followupSrc.includes('parentConsultationId: rootId'))
    assert.ok(followupSrc.includes('followUpCount: newFollowUpCount'))
  })
  await check('6h. follow-up route enforces viewer-cookie match (abuse guard)', () => {
    assert.ok(followupSrc.includes('viewer_mismatch'))
    assert.ok(followupSrc.includes('ENFORCE_VIEWER_MATCH'))
  })
  await check('6i. follow-up route enforces parent age ≤ 24h', () => {
    assert.ok(followupSrc.includes('parent_too_old'))
    assert.ok(followupSrc.includes('PARENT_MAX_AGE_HOURS'))
  })
  await check('6j. follow-up route does NOT pass full history to LLM (Pack §3 invariant)', () => {
    // The route MUST NOT iterate the full chain into messages.
    // Heuristic: there should be no use of getFollowUpChain inside
    // the follow-up route, and no loop assembling chain rows.
    assert.ok(
      !followupSrc.includes('getFollowUpChain'),
      'follow-up route MUST NOT load full chain (history-leak risk)',
    )
  })
  await check('6k. follow-up route injects ONLY summary system message + latest user msg', () => {
    assert.ok(followupSrc.includes('summaryAsSystemMessage(priorSummary)'))
  })
  await check('6l. follow-up route uses summary-aware matcher input (not raw history)', () => {
    assert.ok(followupSrc.includes('composeMatcherInput(priorSummary'))
  })
  await check('6m. follow-up route accumulates fact_card_ids across chain (union)', () => {
    assert.ok(followupSrc.includes('parentUnionIds'))
    assert.ok(followupSrc.includes('uniqueStrings'))
  })
  await check('6n. follow-up route persists rolling summary post-completion', () => {
    assert.ok(followupSrc.includes('buildAndPersistRollingSummary'))
    assert.ok(followupSrc.includes('priorSummary,'))
  })
  await check('6o. follow-up route declares maxDuration = 300 (matches stream)', () => {
    assert.ok(/export const maxDuration\s*=\s*300/m.test(followupSrc))
  })

  // -----------------------------------------------------------------------
  // 7. /c/[id] chain display
  // -----------------------------------------------------------------------
  const cPageSrc = readFileSync(C_PAGE_PATH, 'utf8')

  await check('7a. /c/[id] imports getFollowUpChain', () => {
    assert.ok(cPageSrc.includes('getFollowUpChain'))
  })
  await check('7b. /c/[id] renders ChainBlock when chain.length > 1', () => {
    assert.ok(cPageSrc.includes('ChainBlock'))
    assert.ok(cPageSrc.includes('chain.length > 1'))
  })
  await check('7c. ChainBlock highlights the current row', () => {
    assert.ok(cPageSrc.includes('当前查看'))
  })

  // -----------------------------------------------------------------------
  // 8. Frontend follow-up chain wiring
  // -----------------------------------------------------------------------
  const entryClientSrc = readFileSync(ENTRY_CLIENT_PATH, 'utf8')

  await check('8a. consultation page sends follow-ups to latest answered turn, not always root', () => {
    assert.ok(entryClientSrc.includes('getFollowUpParentConsultationId(active)'))
    assert.ok(entryClientSrc.includes('parent_consultation_id: parentConsultationId'))
    assert.ok(!entryClientSrc.includes('parent_consultation_id: active.id'))
  })
  await check('8b. latest follow-up parent helper walks turns from newest to oldest', () => {
    assert.ok(entryClientSrc.includes('function getFollowUpParentConsultationId'))
    assert.ok(entryClientSrc.includes('.reverse()'))
    assert.ok(entryClientSrc.includes("turn.phase === 'completed' || turn.phase === 'timeout'"))
    assert.ok(entryClientSrc.includes('return latestAnswerTurn?.id ?? active.id'))
  })
  await check('8c. frontend handles follow_up_limit_reached exactly in root + follow-up paths', () => {
    const occurrences = entryClientSrc.match(/case 'follow_up_limit_reached'/g) ?? []
    assert.equal(occurrences.length, 2)
    assert.ok(entryClientSrc.includes('followUpLimitReached: true'))
    assert.ok(entryClientSrc.includes("phase: 'limit_reached'"))
  })

  // -----------------------------------------------------------------------
  // 9. Migration 0027 shape
  // -----------------------------------------------------------------------
  await check('9a. migration 0027 is exactly one ALTER + one ALTER + one INDEX (additive)', () => {
    const path = join(process.cwd(), 'lib/db/migrations/0027_consultation_followup.sql')
    const sql = readFileSync(path, 'utf8')
    assert.ok(sql.includes('ADD COLUMN "parent_consultation_id"'))
    assert.ok(sql.includes('ADD COLUMN "consultation_summary"'))
    assert.ok(sql.includes('CREATE INDEX "ai_consultations_parent_idx"'))
    // No destructive ops.
    for (const banned of ['DROP', 'DELETE', 'TRUNCATE', 'CREATE TABLE']) {
      assert.ok(!sql.toUpperCase().includes(banned), `migration contains banned op: ${banned}`)
    }
  })

  console.log(`\n0.6 Pack 2.3 follow-up contract: ${passes}/${total} pass`)
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
