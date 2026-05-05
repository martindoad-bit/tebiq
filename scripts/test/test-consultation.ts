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
  check('1a. CONSULTATION_ALPHA_PROMPT_VERSION is "consultation_alpha_v1"', () => {
    assert.equal(promptMod.CONSULTATION_ALPHA_PROMPT_VERSION, 'consultation_alpha_v1')
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
      protoMod.isTerminalConsultationEvent({ event: 'timeout', ts: 0, partial_answer_saved: false, fallback_text: '' }),
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
