/**
 * LLM Answer Engine v0 acceptance test (LLM-disabled mode).
 *
 * With ANSWER_GENERATION_DISABLE_AI=1 the generator returns null, so the
 * pipeline takes the legacy-fallback path. This script verifies:
 *   1. Every in-scope question gets a renderable envelope.
 *   2. Out-of-scope questions take the out_of_scope branch.
 *   3. P0 redlines never reverse direction (e.g. "经管→人文" stays
 *      経管→人文 in the envelope's understood_question).
 *
 * Live LLM correctness (assumptions, key_missing_info, etc.) is verified
 * separately via /api/questions smoke against production once Bedrock
 * keys are in place.
 */
import 'dotenv/config'
import { classifyAnswerIntent } from '@/lib/answer/intent-router'
import { detectScope } from '@/lib/answer/answer-scope'
import { buildAnswer } from '@/lib/answer/match-answer'
import { fallbackEnvelopeFromLegacy, outOfScopeEnvelope } from '@/lib/answer/llm-answer-fallback'
import { generateLlmAnswer } from '@/lib/answer/llm-answer-generator'
import { isLegacyAnswerCompatibleWithScope } from '@/lib/answer/fallback-safety-gate'
import { deterministicSafeAnswer, genericSafeFallbackEnvelope } from '@/lib/answer/deterministic-safe-answers'
import type { LlmAnswerEnvelope } from '@/lib/answer/types'

process.env.ANSWER_GENERATION_DISABLE_AI = '1'
process.env.ANSWER_INTENT_DISABLE_AI = '1'
process.env.LLM_INTENT_DISABLE_AI = '1'

interface TestCase {
  id: string
  question: string
  redlines?: Array<RegExp | { not: RegExp }>
  expectInScope: boolean
  expectAtLeastOneAssumption?: boolean
}

const TESTS: TestCase[] = [
  {
    id: 'P0-mgr-to-humanities',
    question: '我是经管签，想转人文签',
    expectInScope: true,
    redlines: [
      /经营管理|経営管理|经管/,
      /(技人国|人文)/,
      { not: /资格外活动|28\s*小时|14\s*日/ },
    ],
  },
  {
    id: 'P0-humanities-to-mgr',
    question: '我想从人文签转为经管签怎么办',
    expectInScope: true,
    redlines: [
      /(技人国|人文)/,
      /(经营管理|経営管理|经管)/,
      { not: /资格外活动|28\s*小时|14\s*日/ },
    ],
  },
  {
    id: 'P0-family-stay-to-work',
    question: '家族滞在想转工作签',
    expectInScope: true,
    redlines: [
      /家族滞在/,
      { not: /28\s*小时|資格外活動許可|14\s*日内/ },
    ],
  },
  {
    id: 'P0-family-stay-work-permission',
    question: '家族滞在配偶可以打工吗',
    expectInScope: true,
    redlines: [
      /(资格外活动|资格外活動|28)/,
      { not: /(税金|住民税|滞納)/ },
    ],
  },
  {
    id: 'P0-spouse-divorce-to-teiju',
    question: '配偶签离婚后想转定住',
    expectInScope: true,
    redlines: [
      /定住/,
      // The wrong framing: treat divorce-to-teiju AS a job-change 14-day
      // report. Mentioning the legally-required 14-day SPOUSE 届出 is OK;
      // mentioning it as if the question were about 転職 / 所属機関 is not.
      { not: /(换工作.*14|転職.*14|所属機関.*14|14\s*日内.*(?:换工作|転職|所属機関))/ },
      // v0.1 hardening: this exact production P0 must not recur. The
      // legacy seed swallow that caused the rollback dumped 経営管理
      // 常勤職員 / 役員 / 代表取締役 / 資本金 content into this question.
      { not: /(常勤職員|役員報酬|資本金|代表取締役|事業計画|会社設立|事業所要件|経営・管理\s*常勤)/ },
      // Direction must not be reversed into 転職 / 所属機関 框架.
      { not: /(転職|所属機関に関する届出)/ },
    ],
  },
  {
    id: 'P0-mgr-renewal-materials',
    question: '经管续签材料有哪些',
    expectInScope: true,
    redlines: [/(经管|経営管理|经营管理)/],
  },
  {
    id: 'P0-permanent-resident-pension',
    question: '永住申请年金没交怎么办',
    expectInScope: true,
    redlines: [/永住/],
  },
  {
    id: 'P0-immigration-deadline',
    question: '入管让补材料，期限赶不上怎么办',
    expectInScope: true,
  },
  {
    id: 'P0-denial-notice',
    question: '不许可通知书怎么办',
    expectInScope: true,
  },
  {
    id: 'P0-representative-change',
    question: '代表取締役换人要通知入管吗',
    expectInScope: true,
    redlines: [
      /(代表|役員|登記)/,
      // v0.1 hardening: must not be misclassified as office relocation.
      { not: /(本店移転|事務所移転|办公室搬迁|地址変更|地址变更)/ },
    ],
  },
  // Additional 10 high-error-prone cases
  {
    id: 'P1-tokutei-change-employer',
    question: '特定技能换会社要做什么',
    expectInScope: false, // 特定技能 not in 5-domain v0 scope
  },
  {
    id: 'P1-mgr-capital-shortage',
    question: '经管签资本金 500 万够吗',
    expectInScope: true,
  },
  {
    id: 'P1-pure-tax',
    question: '日本年终如何报税最划算',
    expectInScope: false,
  },
  {
    id: 'P1-restaurant',
    question: '在新宿开个中餐厅怎么选址',
    expectInScope: false,
  },
  {
    id: 'P1-permanent-tax-record',
    question: '永住申请税金证明几年的',
    expectInScope: true,
    redlines: [/永住/],
  },
  {
    id: 'P1-mgr-office',
    question: '经营管理签办公室能用住宅吗',
    expectInScope: true,
    redlines: [/(经营管理|経営管理|经管|办公|事務所)/],
  },
  {
    id: 'P1-family-stay-school',
    question: '家族滞在小孩上小学要办什么',
    expectInScope: true,
    redlines: [/家族滞在/],
  },
  {
    id: 'P1-teijusha-extension',
    question: '定住者签证更新要多久',
    expectInScope: true,
    redlines: [/定住/],
  },
  {
    id: 'P1-jinbun-jobchange',
    question: '人文签换工作 14 日内届出怎么交',
    expectInScope: true,
    redlines: [/(人文|技人国|技術)/],
  },
  {
    id: 'P1-permanent-criminal',
    question: '永住申请有交通罚款记录会被拒吗',
    expectInScope: true,
    redlines: [/永住/],
  },
]

interface Result {
  id: string
  pass: boolean
  severity: 'P0' | 'P1' | 'P2' | 'P3'
  reason: string
  envelope: LlmAnswerEnvelope
}

async function runOne(test: TestCase): Promise<Result> {
  const intent = await classifyAnswerIntent({ question_text: test.question })
  const scope = detectScope({ questionText: test.question, intent })
  const legacy = await buildAnswer({ questionText: test.question })

  let envelope: LlmAnswerEnvelope
  if (!scope.in_scope) {
    envelope = outOfScopeEnvelope({ questionText: test.question, intent })
  } else {
    const llmResult = await generateLlmAnswer({
      questionText: test.question,
      intent,
      scope,
      legacyAnswer: legacy,
    })
    if (llmResult.envelope) {
      envelope = llmResult.envelope
    } else {
      // Mirror submit-question.ts v0.1 logic: deterministic safe →
      // safety gate → legacy fallback.
      const det = deterministicSafeAnswer({ questionText: test.question, intent, scope })
      if (det) {
        envelope = det.envelope
      } else {
        const compat = isLegacyAnswerCompatibleWithScope({
          questionText: test.question,
          intent,
          scope,
          legacyAnswer: legacy,
        })
        envelope = compat.compatible
          ? fallbackEnvelopeFromLegacy({ questionText: test.question, legacyAnswer: legacy, intent, scope })
          : genericSafeFallbackEnvelope({
            questionText: test.question,
            intent,
            scope,
            reason: 'cross_domain_seed_swallow',
          })
      }
    }
  }

  const severity: Result['severity'] = test.id.startsWith('P0') ? 'P0' : 'P1'

  // 1. Scope expectation
  if (test.expectInScope && envelope.answer_mode === 'out_of_scope') {
    return { id: test.id, pass: false, severity, reason: `expected in-scope, got out_of_scope`, envelope }
  }
  if (!test.expectInScope && envelope.answer_mode !== 'out_of_scope') {
    return { id: test.id, pass: false, severity, reason: `expected out_of_scope, got ${envelope.answer_mode}`, envelope }
  }

  // 2. Redline checks against envelope content
  const haystack = [
    envelope.understood_question,
    envelope.short_answer,
    envelope.copy_text,
    ...envelope.assumptions,
    ...envelope.next_actions.map(a => `${a.title} ${a.detail}`),
    envelope.deadline,
    envelope.where_to_go,
    ...envelope.materials,
    ...envelope.risks,
    ...envelope.expert_checkpoints,
  ].join(' ')

  for (const redline of test.redlines ?? []) {
    if (redline instanceof RegExp) {
      if (!redline.test(haystack)) {
        return { id: test.id, pass: false, severity, reason: `expected pattern ${redline} not in envelope`, envelope }
      }
    } else if (redline.not.test(haystack)) {
      return { id: test.id, pass: false, severity, reason: `forbidden pattern ${redline.not} present in envelope`, envelope }
    }
  }

  // 3. Sanity: envelope is renderable (something non-empty per mode)
  if (envelope.answer_mode === 'direct_answer' || envelope.answer_mode === 'answer_with_assumptions') {
    if (!envelope.short_answer) {
      return { id: test.id, pass: false, severity, reason: 'short_answer empty', envelope }
    }
  }
  if (envelope.answer_mode === 'clarification_needed' && envelope.key_missing_info.length === 0) {
    return { id: test.id, pass: false, severity, reason: 'clarification has no key_missing_info', envelope }
  }

  return { id: test.id, pass: true, severity, reason: 'ok', envelope }
}

async function main() {
  const results: Result[] = []
  for (const test of TESTS) {
    try {
      results.push(await runOne(test))
    } catch (error) {
      results.push({
        id: test.id,
        pass: false,
        severity: test.id.startsWith('P0') ? 'P0' : 'P1',
        reason: `threw: ${error instanceof Error ? error.message : String(error)}`,
        envelope: { engine_version: 'legacy-fallback', answer_mode: 'out_of_scope' } as never,
      })
    }
  }

  let passes = 0
  for (const r of results) {
    const tag = r.pass ? 'PASS' : `${r.severity}-FAIL`
    console.log(`${tag.padEnd(8)} ${r.id.padEnd(34)} mode=${r.envelope.answer_mode.padEnd(24)} engine=${r.envelope.engine_version}`)
    if (!r.pass) console.log(`  reason: ${r.reason}`)
    if (r.pass) passes += 1
  }

  const p0Fails = results.filter(r => !r.pass && r.severity === 'P0')
  console.log(`\nResult: ${passes}/${results.length} pass; P0 failures: ${p0Fails.length}`)
  if (p0Fails.length > 0) process.exit(1)
}

main().catch(error => {
  console.error('fatal', error)
  process.exit(1)
})
