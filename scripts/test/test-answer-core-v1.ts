/**
 * TEBIQ Answer Core V1 — QA harness.
 *
 * For each test case, runs the full intake → projection → safety
 * pipeline (no DB, no LLM) and asserts on the user-visible surface
 * of the resulting PublicAnswer. The harness is intentionally
 * surface-oriented: it does NOT inspect the AnswerSource. If the
 * gate replaces the PublicAnswer, the assertion still runs against
 * what would actually render.
 *
 * Universal redlines applied to every case:
 *   - PublicAnswer.visible_text must not contain `unknown` /
 *     `undefined` / `null`
 *   - clarification_needed and out_of_scope must not surface
 *     documents_needed / risk_warnings (full action template)
 */
import 'dotenv/config'

process.env.ANSWER_INTENT_DISABLE_AI = '1'
process.env.LLM_INTENT_DISABLE_AI = '1'

import { runAnswerIntake } from '@/lib/answer/core/intake'
import type { AnswerRun, PublicAnswerStatus } from '@/lib/answer/core/types'
import { collectVisibleText } from '@/lib/answer/core/surface-safety'

interface Case {
  id: string
  question: string
  // The PublicAnswer must contain at least one match for each pattern.
  must_contain?: RegExp[]
  // The PublicAnswer must NOT contain any match for any pattern.
  must_not_contain?: RegExp[]
  // Acceptable status set.
  allowed_status?: PublicAnswerStatus[]
}

const CASES: Case[] = [
  {
    id: 'P0-spouse-divorce-to-teiju',
    question: '配偶签离婚后想转定住',
    must_contain: [/定住/],
    must_not_contain: [
      /経営管理|经营管理|経営・管理/,
      /常勤職員/,
      /資本金/,
      /事業計画|会社設立|事業所要件/,
      /代表取締役/,
      /(转职|転職).*?(14|十四)/,
      /所属機関に関する届出/,
    ],
    allowed_status: ['answered', 'preliminary'],
  },
  {
    id: 'P0-koseinen-deadline',
    question: '厚生年金截止日期是什么时候？',
    must_not_contain: [
      /从「[^」]*」转为「[^」]*」/, // no signature transfer template
    ],
    allowed_status: ['out_of_scope', 'clarification_needed'],
  },
  {
    id: 'P0-family-stay-to-work',
    question: '家族滞在想转工作签',
    must_contain: [/家族滞在/],
    must_not_contain: [/28\s*小时|28\s*時間/],
  },
  {
    id: 'P0-mgr-to-humanities',
    question: '我是经管签，想转人文签',
    must_contain: [/(经营管理|経営管理|经管)/, /(技人国|人文)/],
    must_not_contain: [/资格外活动|资格外活動|28\s*小时/],
  },
  {
    id: 'P0-humanities-to-mgr',
    question: '人文签转经管签怎么办',
    must_contain: [/(技人国|人文)/, /(经营管理|経営管理|经管)/],
    must_not_contain: [/资格外活动|资格外活動/],
  },
  {
    id: 'P0-mgr-renewal-materials',
    question: '经管续签材料有哪些',
    must_contain: [/(经管|経営管理|经营管理)/],
  },
  {
    id: 'P0-representative-change',
    question: '代表取締役换人要通知入管吗',
    must_contain: [/(代表|役員|登記)/],
    must_not_contain: [/(本店移転|事務所移転|办公室搬迁|地址変更)/],
  },
  {
    id: 'P0-immigration-deadline',
    question: '入管让补材料，期限赶不上怎么办',
  },
  {
    id: 'P0-denial-notice',
    question: '不许可通知书怎么办',
  },
  {
    id: 'P0-permanent-resident-pension',
    question: '永住申请年金没交怎么办',
    must_contain: [/永住/],
  },
]

interface ProbeResult {
  id: string
  pass: boolean
  fails: string[]
  status: PublicAnswerStatus
  domain: AnswerRun['detected_domain']
  fallback_reason: AnswerRun['fallback_reason']
  safety_passed: boolean
}

async function runOne(c: Case): Promise<ProbeResult> {
  const run = await runAnswerIntake({ questionText: c.question })
  const p = run.public_answer
  const visible = collectVisibleText(p)

  const fails: string[] = []

  // Status constraint
  if (c.allowed_status && !c.allowed_status.includes(p.status)) {
    fails.push(`status ${p.status} not in ${c.allowed_status.join(',')}`)
  }

  // must_contain
  for (const pat of c.must_contain ?? []) {
    if (!pat.test(visible)) fails.push(`missing ${pat}`)
  }

  // must_not_contain (per-case redlines)
  for (const pat of c.must_not_contain ?? []) {
    if (pat.test(visible)) fails.push(`forbidden ${pat}`)
  }

  // Universal redlines
  if (/\bunknown\b/i.test(visible)) fails.push('literal unknown')
  if (/\bundefined\b/i.test(visible)) fails.push('literal undefined')
  if (/\bnull\b/i.test(visible)) fails.push('literal null')

  // Mode contract: clarification_needed and out_of_scope must not show
  // documents_needed / risk_warnings (full action template fields).
  if (p.status === 'clarification_needed' || p.status === 'out_of_scope') {
    if (p.documents_needed.length > 0) {
      fails.push(`${p.status} leaks documents_needed (${p.documents_needed.length} items)`)
    }
    if (p.risk_warnings.length > 0) {
      fails.push(`${p.status} leaks risk_warnings (${p.risk_warnings.length} items)`)
    }
  }

  return {
    id: c.id,
    pass: fails.length === 0,
    fails,
    status: p.status,
    domain: run.detected_domain,
    fallback_reason: run.fallback_reason,
    safety_passed: run.safety_result.passed,
  }
}

// P1-A regression — Q10 「永住申请年金没交怎么办」.
//
// In production / Vercel preview the LLM intent parser is enabled, and
// Claude can emit current_status / target_status as a long descriptive
// clause (e.g. "年金未納または納付不足がある状態"). The legacy
// `meaningfulStatus()` only filtered literal `unknown` / `null` /
// `undefined`, so these clauses leaked into the
// "从「X」转为「Y」需要满足什么条件..." template and surfaced as
// Japanese-mixed text on the page.
//
// The fix is a length cap. This regression directly invokes
// `buildDetectedIntent` with a synthetic AnswerIntent so we can
// exercise the cap without standing up the LLM intent parser.
async function p1aRegression(): Promise<{ pass: boolean; reason: string }> {
  const { buildDetectedIntent } = await import('@/lib/answer/core/domain')
  const fakeIntent = {
    intent_type: 'eligibility_check',
    subject: 'individual',
    domain: 'visa',
    confidence: 4,
    extracted_entities: {},
    preferred_template: 'eligibility_template',
    should_answer: true,
    understood_as: '',
    // The exact failure mode reported on Preview: LLM-emitted long JP
    // clauses landing in current/target_status.
    current_status: '年金未納または納付不足がある状態',
    target_status: '年金納付要件を満たして永住申請を行う状態',
  } as never
  const detected = buildDetectedIntent({
    questionText: '永住申请年金没交怎么办',
    intent: fakeIntent,
  })
  const text = detected.understood_question

  // The bad pattern: clause leaked into the 从「X」转为「Y」 template.
  if (/从「.*?(?:または|を満たして|を行う|がある|状態).*?」转为「.*?(?:または|を満たして|を行う|がある|状態)/.test(text)) {
    return { pass: false, reason: `long-clause leaked into template: ${text.slice(0, 120)}` }
  }
  // The clause itself must not appear verbatim in user-visible text.
  if (text.includes('年金未納または') || text.includes('を満たして永住申請を行う')) {
    return { pass: false, reason: `LLM clause verbatim in understood_question: ${text.slice(0, 120)}` }
  }
  return { pass: true, reason: 'long current/target clauses correctly suppressed' }
}

async function main() {
  const results: ProbeResult[] = []
  for (const c of CASES) {
    try {
      results.push(await runOne(c))
    } catch (e) {
      results.push({
        id: c.id,
        pass: false,
        fails: [`threw: ${e instanceof Error ? e.message : String(e)}`],
        status: 'out_of_scope',
        domain: 'unknown',
        fallback_reason: null,
        safety_passed: false,
      })
    }
  }

  let passes = 0
  for (const r of results) {
    const tag = r.pass ? 'PASS' : 'P0-FAIL'
    console.log(`${tag.padEnd(9)} ${r.id.padEnd(34)} status=${r.status.padEnd(22)} domain=${r.domain.padEnd(20)} safety=${r.safety_passed ? 'pass' : 'replaced'}`)
    if (!r.pass) {
      for (const f of r.fails) console.log(`  └ ${f}`)
    }
    if (r.pass) passes += 1
  }

  // P1-A regression — runs as an extra (11th) check.
  const reg = await p1aRegression()
  const regTag = reg.pass ? 'PASS' : 'P1-FAIL'
  console.log(`${regTag.padEnd(9)} ${'P1A-q10-long-jp-clause-suppression'.padEnd(34)} ${reg.reason}`)
  if (reg.pass) passes += 1

  const failures = results.filter(r => !r.pass).length + (reg.pass ? 0 : 1)
  console.log(`\nResult: ${passes}/${results.length + 1} pass; failures: ${failures}`)
  if (failures > 0) process.exit(1)
}

main().catch(e => {
  console.error('fatal', e)
  process.exit(1)
})
