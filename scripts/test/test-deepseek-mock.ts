/**
 * TEBIQ V1.1 — DeepSeek mock smoke.
 *
 * Exercises the DeepSeek provider's parse + validate + map paths
 * WITHOUT calling the network. Each case feeds a hand-crafted JSON
 * string through `provideLlmDeepseekSource` via the
 * `__mockRawResponse` test hook, then runs the resulting AnswerSource
 * through projector → surface safety to assert the final user-visible
 * surface is clean.
 *
 * The 4 mocked shapes cover all `status` values:
 *   - answered (full visa-category direct answer)
 *   - preliminary (admin_general hedged answer)
 *   - clarification_needed (needs more facts)
 *   - out_of_scope (truly off-topic)
 *
 * Plus error paths: timeout, exception, parse fail, validation fail.
 *
 * No network. No DeepSeek key. CI-safe.
 */
import 'dotenv/config'

process.env.ANSWER_INTENT_DISABLE_AI = '1'
process.env.LLM_INTENT_DISABLE_AI = '1'

import { provideLlmDeepseekSource } from '@/lib/answer/core/llm-deepseek-provider'
import { projectLegacyToPublicAnswer } from '@/lib/answer/core/projector'
import { judgePublicAnswerSurface } from '@/lib/answer/core/surface-safety'
import { buildDetectedIntent } from '@/lib/answer/core/domain'
import { classifyAnswerIntent } from '@/lib/answer/intent-router'
import type { DetectedIntent, FallbackReason, SupportedDomain } from '@/lib/answer/core/types'

interface MockCase {
  id: string
  question: string
  domain: SupportedDomain
  raw_response?: string
  should_throw?: 'timeout' | 'exception'
  // Expected source kind after provider runs
  expect_source_kind: 'llm_primary' | 'none'
  expect_skip_reason?: FallbackReason
  // Expected user-visible surface checks (only when source.kind='llm_primary')
  must_contain?: RegExp[]
  must_not_contain?: RegExp[]
  expected_status?: 'answered' | 'preliminary' | 'clarification_needed' | 'out_of_scope'
}

const CASES: MockCase[] = [
  {
    id: 'M1-answered-visa-direct',
    question: '配偶签离婚后想转定住怎么办',
    domain: 'long_term_resident',
    raw_response: JSON.stringify({
      status: 'preliminary', // we explicitly do not give "answered" for divorce-teiju
      domain: 'long_term_resident',
      answer_paragraph: '配偶离婚后想转「定住者」要走在留資格変更許可申請。',
      true_focus_paragraph: '真正容易漏的不是 14 日届出本身，而是婚姻持续期、子女、收入这些事实能不能撑起申请。',
      next_steps_paragraph: '现在先做这一步：把婚姻 / 离婚 / 子女 / 收入文书集中放好。',
      next_steps_bullets: ['做 14 日内配偶届出（义务）', '整理婚姻持续期 / 同居期 证据', '咨询有「離婚定住」实务经验的行政書士'],
      documents_needed: ['戸籍謄本（離婚記載）', '住民票', '直近 3 年課税証明'],
      consult_trigger: '婚姻持续 < 3 年 或 子女不归你抚养 → 行政書士',
      confidence: 'medium',
      boundary_note: 'TEBIQ 不判断申请一定通过 / 不通过；个案差异大，请咨询行政書士。',
    }),
    expect_source_kind: 'llm_primary',
    expected_status: 'preliminary',
    must_contain: [/在留資格変更/, /行政書士|行政书士/],
    must_not_contain: [/经营管理|経営管理|常勤職員|資本金/, /\bunknown\b/i, /\bnull\b/i],
  },
  {
    id: 'M2-preliminary-admin-general',
    question: '厚生年金截止日期是什么时候？',
    domain: 'admin_general',
    raw_response: JSON.stringify({
      status: 'preliminary',
      domain: 'admin_general',
      answer_paragraph: '「年金截止日期」要看是公司加入手续、个人保险料、还是离职切换 —— 这几种期限规则不同。',
      true_focus_paragraph: '比"哪天截止"更要紧的是你问的属于哪一种期限：公司加入、月度缴纳、离职切换、永住申请用纳付记录。',
      next_steps_paragraph: '先确认你的处境是哪一种，再去对应窗口确认。',
      next_steps_bullets: ['先告知是公司加入还是个人缴纳', '如属离职切换：去市役所国保年金窗口', '如属永住申请用：去年金事务所申请加入記録'],
      documents_needed: ['年金手帳 / 基礎年金番号通知書', '在留卡', '申告 / 受理记录（如已有）'],
      consult_trigger: '如已严重逾期或将影响永住 / 在留更新 → 行政書士 + 社労士',
      confidence: 'low',
      boundary_note: 'TEBIQ 不判断你的具体期限；以官方窗口书面回答为准。',
    }),
    expect_source_kind: 'llm_primary',
    expected_status: 'preliminary',
    must_contain: [/(年金|厚生年金|国民年金|社労士|行政書士|行政书士)/],
    must_not_contain: [/从「.*」转为「.*」/, /\bunknown\b/i, /\bnull\b/i, /\bundefined\b/i],
  },
  {
    id: 'M3-clarification-needed',
    question: '不许可通知书怎么办',
    domain: 'admin_general',
    raw_response: JSON.stringify({
      status: 'clarification_needed',
      domain: 'admin_general',
      answer_paragraph: '收到不许可通知书后处理路径取决于：申请类别、不许可理由、当前在留期限是否仍有效。',
      true_focus_paragraph: '',
      next_steps_paragraph: '',
      next_steps_bullets: [],
      documents_needed: [],
      consult_trigger: '收到不许可通知书后建议立刻带通知书原件咨询行政書士。',
      confidence: 'low',
      boundary_note: 'TEBIQ 不判断你的申请会重新被批；以行政書士书面意见为准。',
    }),
    expect_source_kind: 'llm_primary',
    expected_status: 'clarification_needed',
    must_not_contain: [/\bunknown\b/i, /\bnull\b/i, /\bundefined\b/i],
  },
  {
    id: 'M4-out-of-scope',
    question: '日本怎么减肥最快',
    domain: 'unknown',
    raw_response: JSON.stringify({
      status: 'out_of_scope',
      domain: 'unknown',
      answer_paragraph: '这个问题不在 TEBIQ 当前支持范围内。TEBIQ 主要支持在留 / 入管 / 区役所 / 年金 / 税务相关问题。',
      true_focus_paragraph: '',
      next_steps_paragraph: '',
      next_steps_bullets: [],
      documents_needed: [],
      consult_trigger: '',
      confidence: 'low',
      boundary_note: '',
    }),
    expect_source_kind: 'llm_primary',
    expected_status: 'out_of_scope',
    must_not_contain: [/\bunknown\b/i, /\bnull\b/i, /\bundefined\b/i],
  },
  {
    id: 'M5-error-timeout',
    question: '配偶签离婚后想转定住',
    domain: 'long_term_resident',
    should_throw: 'timeout',
    expect_source_kind: 'none',
    expect_skip_reason: 'llm_timeout',
  },
  {
    id: 'M6-error-exception',
    question: '配偶签离婚后想转定住',
    domain: 'long_term_resident',
    should_throw: 'exception',
    expect_source_kind: 'none',
    expect_skip_reason: 'llm_exception',
  },
  {
    id: 'M7-error-parse-fail',
    question: '配偶签离婚后想转定住',
    domain: 'long_term_resident',
    raw_response: 'this is not JSON',
    expect_source_kind: 'none',
    expect_skip_reason: 'llm_parse',
  },
  {
    id: 'M8-error-validation-fail',
    question: '配偶签离婚后想转定住',
    domain: 'long_term_resident',
    raw_response: JSON.stringify({
      // status invalid (not in enum)
      status: 'totally_made_up',
      domain: 'long_term_resident',
      answer_paragraph: 'x',
      true_focus_paragraph: 'x',
      next_steps_paragraph: 'x',
      next_steps_bullets: [],
      documents_needed: [],
      consult_trigger: '',
      confidence: 'medium',
      boundary_note: 'x',
    }),
    expect_source_kind: 'none',
    expect_skip_reason: 'llm_validation',
  },
]

interface ProbeResult {
  id: string
  pass: boolean
  fails: string[]
}

async function buildIntentForCase(question: string): Promise<DetectedIntent> {
  const intent = await classifyAnswerIntent({ question_text: question })
  return buildDetectedIntent({ questionText: question, intent })
}

async function runOne(c: MockCase): Promise<ProbeResult> {
  const detectedIntent = await buildIntentForCase(c.question)
  const fails: string[] = []

  const source = await provideLlmDeepseekSource({
    questionText: c.question,
    visaType: null,
    detectedDomain: c.domain,
    detectedIntent,
    redlines: [],
    __mockRawResponse: c.raw_response,
    __mockShouldThrow: c.should_throw,
  })

  if (source.kind !== c.expect_source_kind) {
    fails.push(`source.kind ${source.kind} ≠ expected ${c.expect_source_kind}`)
  }
  if (c.expect_skip_reason && source.skip_reason !== c.expect_skip_reason) {
    fails.push(`skip_reason ${source.skip_reason} ≠ expected ${c.expect_skip_reason}`)
  }

  // Only run projector + safety on success cases.
  if (source.kind === 'llm_primary') {
    const publicAnswer = projectLegacyToPublicAnswer({
      source,
      detectedIntent,
      domain: c.domain,
      questionText: c.question,
    })
    if (c.expected_status && publicAnswer.status !== c.expected_status) {
      fails.push(`PublicAnswer.status ${publicAnswer.status} ≠ expected ${c.expected_status}`)
    }
    const visible = publicAnswer.visible_text + '\n' + (detectedIntent.understood_question || '')
    for (const re of c.must_contain ?? []) {
      if (!re.test(visible)) fails.push(`must_contain ${re} missing`)
    }
    for (const re of c.must_not_contain ?? []) {
      if (re.test(visible)) fails.push(`must_not_contain ${re} hit`)
    }
    const safety = judgePublicAnswerSurface({
      query: c.question,
      detectedIntent,
      domain: c.domain,
      publicAnswer,
    })
    if (!safety.passed) {
      fails.push(`safety failed: ${safety.failed_rules.join(',')}`)
    }
  }

  return { id: c.id, pass: fails.length === 0, fails }
}

async function main() {
  const results: ProbeResult[] = []
  for (const c of CASES) {
    try {
      results.push(await runOne(c))
    } catch (e) {
      results.push({ id: c.id, pass: false, fails: [`threw: ${e instanceof Error ? e.message : String(e)}`] })
    }
  }
  let passes = 0
  for (const r of results) {
    const tag = r.pass ? 'PASS' : 'FAIL'
    console.log(`${tag.padEnd(5)} ${r.id}`)
    if (!r.pass) for (const f of r.fails) console.log(`  └ ${f}`)
    if (r.pass) passes += 1
  }
  console.log(`\nDeepSeek mock: ${passes}/${results.length} pass`)
  if (passes < results.length) process.exit(1)
}

main().catch(e => { console.error('fatal', e); process.exit(1) })
