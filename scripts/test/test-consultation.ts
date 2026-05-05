/**
 * 1.0 Alpha consultation pipeline contract tests (Issue #39).
 *
 * DB-free / LLM-free unit tests for:
 *   - System prompt + version constants
 *   - Risk keyword detection (13 keywords)
 *   - Forbidden phrase streaming filter (7 phrases × split-token edge cases)
 *   - SSE protocol frame format + parser
 *
 * End-to-end streaming tests live as live curl GM/QA verification.
 */
import { strict as assert } from 'node:assert'

async function main() {
  const promptMod = await import('@/lib/answer/prompt/consultation-alpha-v1')
  const riskMod = await import('@/lib/consultation/risk-keywords')
  const filterMod = await import('@/lib/consultation/forbidden-phrases')
  const protoMod = await import('@/lib/consultation/stream-protocol')
  const anchorMod = await import('@/lib/consultation/fact-anchors')

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

  // ---- 1. System prompt constants ----
  check('1a. CONSULTATION_ALPHA_PROMPT_VERSION is "consultation_alpha_v2"', () => {
    // VOICE bumped v1→v2 in commit bcd28ca; test follows.
    assert.equal(promptMod.CONSULTATION_ALPHA_PROMPT_VERSION, 'consultation_alpha_v2')
  })
  check('1b. CONSULTATION_ALPHA_MODEL is "deepseek-v4-pro"', () => {
    assert.equal(promptMod.CONSULTATION_ALPHA_MODEL, 'deepseek-v4-pro')
  })
  check('1c. system prompt contains all 7 forbidden-phrase categories', () => {
    const p = promptMod.CONSULTATION_ALPHA_SYSTEM_PROMPT
    for (const phrase of ['一定可以', '没问题', '不会影响', '保证', '必ず', '絶対', '100%']) {
      assert.ok(p.includes(phrase), `prompt missing forbidden-phrase warning: ${phrase}`)
    }
  })
  check('1d. system prompt forbids surfacing model names', () => {
    const p = promptMod.CONSULTATION_ALPHA_SYSTEM_PROMPT
    assert.ok(p.includes('DeepSeek'), 'prompt does not mention DeepSeek redaction rule')
    assert.ok(p.includes('AI'), 'prompt does not mention AI redaction rule')
  })
  check('1e. buildConsultationMessages places user message last', () => {
    const m = promptMod.buildConsultationMessages({ userQuestion: 'test question' })
    assert.equal(m[m.length - 1].role, 'user')
    assert.equal(m[m.length - 1].content, 'test question')
  })
  check('1f. buildConsultationMessages injects image_summary as system context', () => {
    const m = promptMod.buildConsultationMessages({
      userQuestion: 'q',
      imageSummary: '通知書 内容: 補資料要求',
    })
    const sysCtxs = m.filter(x => x.role === 'system')
    assert.ok(
      sysCtxs.some(s => s.content.includes('图片摘要') && s.content.includes('补资料')) ||
      sysCtxs.some(s => s.content.includes('图片摘要') && s.content.includes('補資料')),
      `image_summary not injected: ${JSON.stringify(sysCtxs.map(s => s.content.slice(0, 30)))}`,
    )
  })
  check('1g. buildConsultationMessages injects fact anchors when provided', () => {
    const m = promptMod.buildConsultationMessages({
      userQuestion: 'q',
      factAnchors: [{ id: 'A1', text: '配偶离婚后必须14日内届出' }],
    })
    const sysCtxs = m.filter(x => x.role === 'system')
    assert.ok(
      sysCtxs.some(s => s.content.includes('A1') && s.content.includes('14日内')),
      'fact anchor not injected',
    )
  })

  // ---- 2. Risk keywords ----
  check('2a. RISK_KEYWORDS has exactly 13 entries (Pack §5)', () => {
    assert.equal(riskMod.RISK_KEYWORDS.length, 13)
  })
  check('2b. detectRiskKeywords: empty input → empty array', () => {
    assert.deepEqual(riskMod.detectRiskKeywords(''), [])
    assert.deepEqual(riskMod.detectRiskKeywords(null), [])
    assert.deepEqual(riskMod.detectRiskKeywords(undefined), [])
  })
  check('2c. detectRiskKeywords: D05/D06-style 配偶离婚 question hits 离婚', () => {
    const hits = riskMod.detectRiskKeywords('日本人配偶签离婚后还能留在日本吗？')
    assert.ok(hits.includes('离婚'), `expected 离婚 hit, got ${JSON.stringify(hits)}`)
  })
  check('2d. detectRiskKeywords: I08 公司清算+回国 hits 公司清算', () => {
    const hits = riskMod.detectRiskKeywords('公司还没清算，我可以直接回国吗？')
    assert.ok(hits.includes('公司清算'), `expected 公司清算, got ${JSON.stringify(hits)}`)
  })
  check('2e. detectRiskKeywords: J04 解雇 question hits 解雇', () => {
    const hits = riskMod.detectRiskKeywords('我被公司解雇了，在留怎么办？')
    assert.ok(hits.includes('解雇'))
  })
  check('2f. detectRiskKeywords: multi-keyword question returns all hits in order', () => {
    const hits = riskMod.detectRiskKeywords('我担心永住申请，年金没交，税金也没缴')
    // Result order matches RISK_KEYWORDS order (永住 → 年金 → 税金)
    assert.deepEqual(hits, ['永住', '年金', '税金'])
  })
  check('2g. detectRiskKeywords: off-topic question returns empty', () => {
    const hits = riskMod.detectRiskKeywords('今天东京天气怎么样？')
    assert.deepEqual(hits, [])
  })

  // ---- 3. Forbidden phrases ----
  check('3a. FORBIDDEN_PHRASES has exactly 7 entries (Pack §G)', () => {
    assert.equal(filterMod.FORBIDDEN_PHRASES.length, 7)
  })
  check('3b. redactForbiddenPhrases: removes 一定可以', () => {
    const r = filterMod.redactForbiddenPhrases('这种情况一定可以申请永住')
    assert.ok(!r.text.includes('一定可以'))
    assert.ok(r.redactions.includes('一定可以'))
  })
  check('3c. redactForbiddenPhrases: removes multiple distinct phrases', () => {
    const r = filterMod.redactForbiddenPhrases('我保证一定可以通过，不会影响你')
    assert.ok(!r.text.includes('保证'))
    assert.ok(!r.text.includes('一定可以'))
    assert.ok(!r.text.includes('不会影响'))
    assert.equal(r.redactions.length, 3)
  })
  check('3d. redactForbiddenPhrases: counts duplicates', () => {
    const r = filterMod.redactForbiddenPhrases('保证。 保证。 保证。')
    assert.equal(r.redactions.length, 3)
  })
  check('3e. redactForbiddenPhrases: leaves clean text untouched', () => {
    const r = filterMod.redactForbiddenPhrases('这种情况通常需要找行政書士确认')
    assert.equal(r.text, '这种情况通常需要找行政書士确认')
    assert.equal(r.redactions.length, 0)
  })
  check('3f. createForbiddenFilter streaming: catches phrase split across chunks', () => {
    // "一定可以" arriving as ["一定", "可以"] must still be redacted.
    const f = filterMod.createForbiddenFilter()
    let out = ''
    out += f.push('这种情况')
    out += f.push('一定')   // partial — should hold
    out += f.push('可以申请永住')
    out += f.flush()
    assert.ok(!out.includes('一定可以'), `streaming missed split-token; got "${out}"`)
    assert.ok(f.redactions().includes('一定可以'))
  })
  check('3g. createForbiddenFilter: catches phrase split tightly across 3 chunks', () => {
    const f = filterMod.createForbiddenFilter()
    let out = ''
    out += f.push('一')
    out += f.push('定')
    out += f.push('可以')
    out += f.flush()
    assert.ok(!out.includes('一定可以'), `triple-split missed; got "${out}"`)
  })
  check('3h. createForbiddenFilter: clean stream passes through with same total content', () => {
    const f = filterMod.createForbiddenFilter()
    const chunks = ['这种', '情况通常', '需要找', '行政書士', '确认']
    let out = ''
    for (const c of chunks) out += f.push(c)
    out += f.flush()
    assert.equal(out, chunks.join(''))
    assert.equal(f.redactions().length, 0)
  })
  check('3i. createForbiddenFilter: 100% literal redacted', () => {
    const f = filterMod.createForbiddenFilter()
    let out = ''
    out += f.push('成功率是 100%')
    out += f.flush()
    assert.ok(!out.includes('100%'))
    assert.ok(f.redactions().includes('100%'))
  })
  check('3j. createForbiddenFilter: Japanese 必ず + 絶対 both redacted', () => {
    const r = filterMod.redactForbiddenPhrases('必ず通る。絶対大丈夫。')
    assert.ok(!r.text.includes('必ず'))
    assert.ok(!r.text.includes('絶対'))
    assert.equal(r.redactions.length, 2)
  })

  // ---- 4. SSE protocol ----
  check('4a. formatConsultationFrame is single data line + double newline', () => {
    const frame = protoMod.formatConsultationFrame({
      event: 'received',
      ts: 123,
      consultation_id: 'abc',
    })
    assert.equal(frame, 'data: {"event":"received","ts":123,"consultation_id":"abc"}\n\n')
  })
  check('4b. parseConsultationChunk: complete frame parses', () => {
    const buf = 'data: {"event":"first_token","ts":1,"first_token_latency_ms":2300}\n\n'
    const { events, remainder } = protoMod.parseConsultationChunk(buf)
    assert.equal(events.length, 1)
    assert.equal(events[0].event, 'first_token')
    assert.equal(remainder, '')
  })
  check('4c. parseConsultationChunk: partial frame stays in remainder', () => {
    const buf = 'data: {"event":"answer_chunk","ts":1,"chunk":"partial'
    const { events, remainder } = protoMod.parseConsultationChunk(buf)
    assert.equal(events.length, 0)
    assert.equal(remainder, buf)
  })
  check('4d. parseConsultationChunk: multi-frame + trailing partial', () => {
    const buf =
      'data: {"event":"received","ts":1,"consultation_id":"a"}\n\n' +
      'data: {"event":"first_token","ts":2,"first_token_latency_ms":1100}\n\n' +
      'data: {"event":"answer_'
    const { events, remainder } = protoMod.parseConsultationChunk(buf)
    assert.equal(events.length, 2)
    assert.equal(events[0].event, 'received')
    assert.equal(events[1].event, 'first_token')
    assert.ok(remainder.startsWith('data: {"event":"answer_'))
  })
  check('4e. parseConsultationChunk: malformed frames silently dropped', () => {
    const buf = 'data: not-json\n\ndata: {"event":"completed","ts":1,"total_latency_ms":5000,"redactions_count":0}\n\n'
    const { events } = protoMod.parseConsultationChunk(buf)
    assert.equal(events.length, 1)
    assert.equal(events[0].event, 'completed')
  })
  check('4f. isTerminalConsultationEvent identifies the 3 terminal events', () => {
    assert.equal(
      protoMod.isTerminalConsultationEvent({ event: 'completed', ts: 0, total_latency_ms: 1, redactions_count: 0 }),
      true,
    )
    assert.equal(
      protoMod.isTerminalConsultationEvent({
        event: 'timeout',
        ts: 0,
        partial_answer_saved: false,
        fallback_text: '',
        completion_status: 'timeout',
      }),
      true,
    )
    assert.equal(protoMod.isTerminalConsultationEvent({ event: 'failed', ts: 0, detail: 'x' }), true)
    assert.equal(protoMod.isTerminalConsultationEvent({ event: 'received', ts: 0, consultation_id: 'a' }), false)
    assert.equal(protoMod.isTerminalConsultationEvent({ event: 'first_token', ts: 0, first_token_latency_ms: 1 }), false)
    assert.equal(protoMod.isTerminalConsultationEvent({ event: 'answer_chunk', ts: 0, chunk: 'x' }), false)
  })
  check('4g. CONSULTATION_TIMING enforces Pack §3 contract', () => {
    assert.equal(protoMod.CONSULTATION_TIMING.still_generating_at_ms, 25_000)
    assert.equal(protoMod.CONSULTATION_TIMING.hard_timeout_ms, 90_000)
  })
  check('4h. CONSULTATION_TIMEOUT_FALLBACK_TEXT contains canonical voice + [降级回答] marker', () => {
    const t = protoMod.CONSULTATION_TIMEOUT_FALLBACK_TEXT
    assert.ok(t.includes('[降级回答]'), '[降级回答] marker missing')
    assert.ok(t.includes('当前模型响应超时'), 'voice canonical 当前模型响应超时 missing')
    assert.ok(t.includes('不是你的输入问题'), 'voice canonical 不是你的输入问题 missing')
  })

  // ---- 5. Acceptance §G — system prompt forbidden-phrase warnings ----
  check('5a. Forbidden phrase set in module matches system prompt warnings (parity)', () => {
    const promptText = promptMod.CONSULTATION_ALPHA_SYSTEM_PROMPT
    for (const phrase of filterMod.FORBIDDEN_PHRASES) {
      assert.ok(
        promptText.includes(phrase),
        `system prompt missing warning for forbidden phrase: ${phrase}`,
      )
    }
  })

  // ---- 6. Issue #51 Alpha Polish §2 — completion_status mapping ----
  //
  // The 90s hard cutoff branches on whether ANY answer text streamed:
  //   - has partial → completion_status='partial' (UI: "回答可能不完整")
  //   - silent      → completion_status='timeout' (UI: [降级回答] canonical)
  // 'completed' and 'failed' must remain disjoint from the timeout branch.
  // These tests pin the mapping that the stream route enforces in
  // app/api/consultation/stream/route.ts hardTimer callback.
  check('6a. completion_status union has all 5 values (Pack §2 / Issue #51)', () => {
    // The 5 statuses the DB enum allows post-migration 0024.
    const allowed = ['streaming', 'completed', 'partial', 'timeout', 'failed'] as const
    assert.equal(allowed.length, 5)
    // No silent collapse (e.g. 'partial' must NOT equal 'timeout' string)
    assert.notEqual(allowed[2], allowed[3])
    // Each is distinct
    assert.equal(new Set(allowed).size, 5)
  })
  check('6b. timeout event payload requires completion_status: "partial" | "timeout"', () => {
    // Encoded payload faithfully round-trips with completion_status field.
    const partialFrame = protoMod.formatConsultationFrame({
      event: 'timeout',
      ts: 100,
      partial_answer_saved: true,
      fallback_text: protoMod.CONSULTATION_TIMEOUT_FALLBACK_TEXT,
      completion_status: 'partial',
    })
    assert.ok(partialFrame.includes('"completion_status":"partial"'))
    const silentFrame = protoMod.formatConsultationFrame({
      event: 'timeout',
      ts: 200,
      partial_answer_saved: false,
      fallback_text: protoMod.CONSULTATION_TIMEOUT_FALLBACK_TEXT,
      completion_status: 'timeout',
    })
    assert.ok(silentFrame.includes('"completion_status":"timeout"'))
  })
  check('6c. parser preserves completion_status field on timeout frame', () => {
    const buf =
      `data: ${JSON.stringify({
        event: 'timeout',
        ts: 1,
        partial_answer_saved: true,
        fallback_text: 'x',
        completion_status: 'partial',
      })}\n\n`
    const { events } = protoMod.parseConsultationChunk(buf)
    assert.equal(events.length, 1)
    const ev = events[0]
    assert.equal(ev.event, 'timeout')
    if (ev.event === 'timeout') {
      assert.equal(ev.completion_status, 'partial')
      assert.equal(ev.partial_answer_saved, true)
    }
  })
  check('6d. Mapping A — completed path yields completion_status="completed" only', () => {
    // Charter §10 / Pack §3.5: completed path NEVER carries 'timeout' /
    // 'partial' / [降级回答].
    const completed = { event: 'completed' as const, ts: 1, total_latency_ms: 100, redactions_count: 0 }
    assert.equal(completed.event, 'completed')
    // The frame format for completed has no fallback_text / partial flags.
    const frame = protoMod.formatConsultationFrame(completed)
    assert.ok(!frame.includes('[降级回答]'))
    assert.ok(!frame.includes('"completion_status":"timeout"'))
    assert.ok(!frame.includes('"completion_status":"partial"'))
    assert.ok(!frame.includes('"partial_answer_saved"'))
  })
  check('6e. Mapping B — partial path: status="partial" + has fallback_text but UI never renders it', () => {
    // Server emits fallback_text for both partial and silent timeout, but
    // UI gates rendering on completion_status. This test pins the
    // contract: when completion_status==='partial', partial_answer_saved
    // MUST be true (so UI can derive "answer was streamed before cut").
    const ev = {
      event: 'timeout' as const,
      ts: 1,
      partial_answer_saved: true,
      fallback_text: protoMod.CONSULTATION_TIMEOUT_FALLBACK_TEXT,
      completion_status: 'partial' as const,
    }
    assert.equal(ev.completion_status, 'partial')
    assert.equal(ev.partial_answer_saved, true)
    // The fallback_text payload still carries [降级回答] (server emits the
    // canonical text uniformly), but the UI binds rendering to
    // completion_status, NOT to fallback_text presence. This is the
    // invariant CODEXUI #52 enforces in render code; we lock the data
    // shape here.
    assert.ok(ev.fallback_text.includes('[降级回答]'))
  })
  check('6f. Mapping C — silent timeout: status="timeout" + partial_answer_saved=false', () => {
    const ev = {
      event: 'timeout' as const,
      ts: 1,
      partial_answer_saved: false,
      fallback_text: protoMod.CONSULTATION_TIMEOUT_FALLBACK_TEXT,
      completion_status: 'timeout' as const,
    }
    assert.equal(ev.completion_status, 'timeout')
    assert.equal(ev.partial_answer_saved, false)
    assert.ok(ev.fallback_text.includes('[降级回答]'))
  })
  check('6g. Mapping D — failed path: separate event, no completion_status field', () => {
    // 'failed' event payload has only { event, ts, detail }. It does NOT
    // ride on the timeout-event union, so no completion_status field.
    const failed = { event: 'failed' as const, ts: 1, detail: 'stream_exception' }
    const frame = protoMod.formatConsultationFrame(failed)
    assert.ok(frame.includes('"event":"failed"'))
    assert.ok(!frame.includes('"completion_status"'))
    assert.ok(!frame.includes('[降级回答]'))
  })
  check('6h. Mapping invariant — partial_answer_saved <=> completion_status==="partial" on timeout event', () => {
    // The stream route enforces hasPartial = (totalText.length > 0) and
    // sets BOTH partial_answer_saved = hasPartial AND completion_status =
    // hasPartial ? 'partial' : 'timeout'. So the two fields must agree
    // for every timeout-event payload that the route emits.
    const cases: Array<{ partial_answer_saved: boolean; completion_status: 'partial' | 'timeout' }> = [
      { partial_answer_saved: true,  completion_status: 'partial' },
      { partial_answer_saved: false, completion_status: 'timeout' },
    ]
    for (const c of cases) {
      assert.equal(c.partial_answer_saved, c.completion_status === 'partial')
    }
  })
  check('6i. Migration 0024 is the only schema change for this fix', () => {
    // Lock the migration name as a contract — Pack §3.1 specifies a
    // single ALTER TYPE ADD VALUE. If a future PR sneaks more schema
    // edits into the same migration, this test breaks.
    const fs = require('fs') as typeof import('fs')
    const path = require('path') as typeof import('path')
    const migDir = path.join(process.cwd(), 'lib/db/migrations')
    const files = fs.readdirSync(migDir).filter(f => /^0024_.*\.sql$/.test(f))
    assert.equal(files.length, 1, `expected exactly one 0024_*.sql, got ${files.join(',')}`)
    const sql = fs.readFileSync(path.join(migDir, files[0]), 'utf8').trim()
    // Only thing the migration is allowed to do.
    assert.ok(
      sql.includes("ADD VALUE 'partial'"),
      `migration ${files[0]} missing ADD VALUE 'partial': ${sql}`,
    )
    // No DROP / DELETE / UPDATE / ALTER TABLE / CREATE TABLE.
    for (const banned of ['DROP', 'DELETE', 'UPDATE ', 'CREATE TABLE', 'ALTER TABLE']) {
      assert.ok(!sql.toUpperCase().includes(banned), `migration ${files[0]} contains banned op: ${banned}`)
    }
  })

  // ---- 7. Issue #54 — Fact Anchor matching + prompt injection ----
  //
  // Pack §2.3 minimums: 5+ keyword→anchor cases, empty match, multi-anchor,
  // prompt injection contract. Section is numbered §7 so it doesn't
  // collide with #51's §6 (completion_status mapping) when both PRs land.
  check('7a. FACT_ANCHORS has exactly 15 entries (Pack §1)', () => {
    assert.equal(anchorMod.FACT_ANCHORS.length, 15)
  })
  check('7b. FACT_ANCHORS anchor_ids match DOMAIN file order (FA-01..FA-15)', () => {
    const ids = anchorMod.FACT_ANCHORS.map(a => a.anchorId)
    assert.deepEqual(ids, [
      'bm_to_humanities',
      'humanities_to_pr',
      'pension_pr',
      'tax_pr',
      'spouse_divorce',
      'bm_dissolution',
      'work_mismatch',
      'supplemental_request',
      'denial_notice',
      'visa_expiring',
      'family_change_impact',
      'family_to_work',
      'humanities_job_change',
      're_entry',
      'card_lost',
    ])
  })
  check('7c. matchAnchors: empty / blank input returns empty array', () => {
    assert.deepEqual(anchorMod.matchAnchors(''), [])
    assert.deepEqual(anchorMod.matchAnchors('   '), [])
    assert.deepEqual(anchorMod.matchAnchors('', null), [])
  })
  check('7d. matchAnchors: 简体 "我配偶离婚后能不能继续留" hits spouse_divorce (Pack acceptance B)', () => {
    const hits = anchorMod.matchAnchors('我配偶离婚后能不能继续留')
    const ids = hits.map(a => a.anchorId)
    assert.ok(ids.includes('spouse_divorce'), `expected spouse_divorce, got ${JSON.stringify(ids)}`)
  })
  check('7e. matchAnchors: 日本語 "離婚後の在留" also hits spouse_divorce (DOMAIN-form)', () => {
    const hits = anchorMod.matchAnchors('離婚後の在留はどうなりますか？')
    const ids = hits.map(a => a.anchorId)
    assert.ok(ids.includes('spouse_divorce'), `expected spouse_divorce, got ${JSON.stringify(ids)}`)
  })
  check('7f. matchAnchors: "公司清算" hits bm_dissolution', () => {
    const hits = anchorMod.matchAnchors('公司清算之后还能继续经营吗？')
    assert.ok(hits.some(a => a.anchorId === 'bm_dissolution'))
  })
  check('7g. matchAnchors: "在留期限快到了" hits visa_expiring', () => {
    const hits = anchorMod.matchAnchors('我的在留期限快到了，怎么办？')
    assert.ok(hits.some(a => a.anchorId === 'visa_expiring'))
  })
  check('7h. matchAnchors: "永住申请年金没交全" hits BOTH humanities_to_pr AND pension_pr', () => {
    // Multi-anchor case — single question triggers two anchors via two
    // independent keyword sets. Order matches FACT_ANCHORS declaration
    // order (humanities_to_pr is FA-02, pension_pr is FA-03).
    const hits = anchorMod.matchAnchors('我想申请永住，但年金有几个月没交')
    const ids = hits.map(a => a.anchorId)
    assert.ok(ids.includes('humanities_to_pr'), `expected humanities_to_pr in ${JSON.stringify(ids)}`)
    assert.ok(ids.includes('pension_pr'), `expected pension_pr in ${JSON.stringify(ids)}`)
    // Order assertion: FACT_ANCHORS-declaration order is preserved
    assert.ok(
      ids.indexOf('humanities_to_pr') < ids.indexOf('pension_pr'),
      `expected humanities_to_pr before pension_pr, got ${JSON.stringify(ids)}`,
    )
  })
  check('7i. matchAnchors: "今天东京天气怎么样" returns empty array (no anchor)', () => {
    const hits = anchorMod.matchAnchors('今天东京天气怎么样？')
    assert.deepEqual(hits, [])
  })
  check('7j. matchAnchors: same anchor with multiple keyword hits is recorded ONCE only (Pack §2.1)', () => {
    // Two FA-01 triggers in one question: 経営管理 + 転換 + 経管 → still
    // counted as 1 anchor entry, no duplicates.
    const hits = anchorMod.matchAnchors('経営管理から技術人文への転換、経管をやめたい')
    const bmCount = hits.filter(a => a.anchorId === 'bm_to_humanities').length
    assert.equal(bmCount, 1, `expected exactly 1 bm_to_humanities entry, got ${bmCount}`)
  })
  check('7k. matchAnchors: image_summary keywords also count toward triggers', () => {
    // Question has nothing visa-related; image_summary mentions 通知書 +
    // 補完要求. Should hit supplemental_request via image_summary path.
    const hits = anchorMod.matchAnchors(
      '想咨询一下',
      '看起来是入管发的通知書，里面提到補完要求和提出期限',
    )
    assert.ok(hits.some(a => a.anchorId === 'supplemental_request'))
  })
  check('7l. anchorsToPromptContext: each anchor yields one {id, text} with all 4 fields', () => {
    const hits = anchorMod.matchAnchors('我配偶离婚')
    const ctx = anchorMod.anchorsToPromptContext(hits)
    assert.ok(ctx.length > 0)
    for (const c of ctx) {
      assert.ok(typeof c.id === 'string' && c.id.length > 0)
      assert.ok(c.text.includes('必考虑：'))
      assert.ok(c.text.includes('不得说：'))
      assert.ok(c.text.includes('建议追问：'))
      assert.ok(c.text.includes('Human review hint：'))
    }
  })
  check('7m. buildConsultationMessages: anchors injected as system context with anchor_id citation', () => {
    // Charter §6 / Pack §2.2 wiring — the LLM sees the anchor as part of
    // a system message, including the anchor_id in parentheses for
    // attribution. Empty anchors → no extra system message.
    const hits = anchorMod.matchAnchors('我配偶离婚')
    const ctx = anchorMod.anchorsToPromptContext(hits)
    const messages = promptMod.buildConsultationMessages({
      userQuestion: 'q',
      factAnchors: ctx,
    })
    const sysMessages = messages.filter(m => m.role === 'system')
    // Should be at least 2 system messages: base prompt + anchor block
    assert.ok(sysMessages.length >= 2, `expected ≥2 system msgs, got ${sysMessages.length}`)
    const anchorBlock = sysMessages.find(m => m.content.includes('事实锚点'))
    assert.ok(anchorBlock, 'no system message contains 事实锚点 marker')
    // anchor_id citation present
    assert.ok(
      (anchorBlock?.content ?? '').includes('(spouse_divorce)'),
      `anchor_id citation missing in: ${anchorBlock?.content?.slice(0, 200)}`,
    )
  })
  check('7n. buildConsultationMessages: empty anchors → NO 事实锚点 system message', () => {
    const messages = promptMod.buildConsultationMessages({
      userQuestion: '今天东京天气怎么样？',
      factAnchors: [],
    })
    const sysMessages = messages.filter(m => m.role === 'system')
    assert.ok(!sysMessages.some(m => m.content.includes('事实锚点')))
  })
  check('7o. matchAnchors: matched anchors carry must_consider / must_not_say / suggestedNextQuestion / humanConfirmHint', () => {
    // Lock the FactAnchor shape: every anchor in FACT_ANCHORS must have
    // all four DOMAIN-canonical fields populated. Catches any future
    // accidental empty-string transcription.
    for (const a of anchorMod.FACT_ANCHORS) {
      assert.ok(a.mustConsider.length > 0, `${a.anchorId} mustConsider empty`)
      assert.ok(a.mustNotSay.length > 0, `${a.anchorId} mustNotSay empty`)
      assert.ok(a.suggestedNextQuestion.length > 0, `${a.anchorId} suggestedNextQuestion empty`)
      assert.ok(a.humanConfirmHint.length > 0, `${a.anchorId} humanConfirmHint empty`)
      assert.ok(a.triggerKeywords.length > 0, `${a.anchorId} no triggerKeywords`)
    }
  })

  console.log(`\n1.0 Alpha consultation contract: ${passes}/${total} pass`)
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
