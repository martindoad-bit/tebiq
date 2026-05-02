/**
 * LLM Answer Engine v0.2 acceptance test (LLM-disabled mode).
 *
 * v0.2 makes the AnswerResult envelope-first: every user-visible
 * field (title, summary, action_answer, next_steps, sections) is
 * derived from the LlmAnswerEnvelope, not from the legacy `buildAnswer`
 * output. This test exercises the full submit pipeline (minus DB
 * writes) and asserts the user-visible surface — not just the
 * envelope — for each redline.
 *
 * Why local LLM-disabled?
 *   - No Bedrock keys here.
 *   - With LLM disabled we exercise the deterministic-safe-answer +
 *     cross-domain safety gate + legacy fallback chain, which is the
 *     path production hit 7-8 / 10 times.
 *
 * Live LLM (engine_version: 'llm-answer-v0') still needs production
 * smoke after deploy.
 */
import 'dotenv/config'

process.env.ANSWER_GENERATION_DISABLE_AI = '1'
process.env.ANSWER_INTENT_DISABLE_AI = '1'
process.env.LLM_INTENT_DISABLE_AI = '1'

import { classifyAnswerIntent } from '@/lib/answer/intent-router'
import { detectScope } from '@/lib/answer/answer-scope'
import { buildAnswer } from '@/lib/answer/match-answer'
import { fallbackEnvelopeFromLegacy, outOfScopeEnvelope } from '@/lib/answer/llm-answer-fallback'
import { generateLlmAnswer } from '@/lib/answer/llm-answer-generator'
import { isLegacyAnswerCompatibleWithScope } from '@/lib/answer/fallback-safety-gate'
import { deterministicSafeAnswer, genericSafeFallbackEnvelope } from '@/lib/answer/deterministic-safe-answers'
import { projectEnvelopeToPublicAnswer } from '@/lib/answer/envelope-projector'
import type { AnswerResult, LlmAnswerEnvelope } from '@/lib/answer/types'

interface TestCase {
  id: string
  question: string
  expectInScope: boolean
  // Severity: P0 ids start with "P0-".
  // Each pattern is run against the user-visible surface (title, summary,
  // action_answer fields, next_steps, sections — all flattened).
  mustContain?: RegExp[]
  mustNotContain?: RegExp[]
  // If set, the envelope's engine_version must be one of these.
  expectEngineIn?: Array<LlmAnswerEnvelope['engine_version']>
  // If set, the envelope's answer_mode must be one of these.
  expectModeIn?: Array<LlmAnswerEnvelope['answer_mode']>
  // If true, the response must NOT contain a full action template
  // (clarification / out_of_scope cases).
  forbidActionTemplate?: boolean
}

const TESTS: TestCase[] = [
  // === 15 cases per spec ===
  {
    id: 'P0-spouse-divorce-to-teiju',
    question: '配偶签离婚后想转定住',
    expectInScope: true,
    mustContain: [/定住/],
    mustNotContain: [
      // The Q5 production P0: 経営管理 / 常勤職員 / 役員 / 代表取締役 /
      // 資本金 / 事業計画 / 会社設立 / 事業所要件 must not appear in any
      // user-visible field, even at the top-level title.
      /経営管理|经营管理|経営・管理/,
      /常勤職員/,
      /役員報酬|代表取締役/,
      /資本金/,
      /事業計画|会社設立|事業所要件/,
      // Direction must not flip into 転職 / 所属機関 framing.
      /(转职|転職).*(14|十四)/,
      /所属機関に関する届出/,
    ],
    expectEngineIn: ['safe-fallback-v0-1', 'llm-answer-v0'],
  },
  {
    id: 'P0-koseinen-deadline',
    question: '厚生年金截止日期是什么时候？',
    expectInScope: false, // pension topic without visa context → out_of_scope
    mustNotContain: [
      // Spec: must NOT show full action template, must NOT show
      // visa-transfer phrasing, must NOT use literal "unknown".
      /\bunknown\b/i,
      /undefined/,
      /\bnull\b/,
      /从「.*」转为「.*」/,
      /最紧的两件/,
    ],
    expectEngineIn: ['out-of-scope-v0', 'llm-answer-v0'],
    expectModeIn: ['out_of_scope', 'clarification_needed'],
    forbidActionTemplate: true,
  },
  {
    id: 'P0-mgr-to-humanities',
    question: '我是经管签，想转人文签',
    expectInScope: true,
    mustContain: [/(经营管理|経営管理|经管)/, /(技人国|人文)/],
    mustNotContain: [
      /资格外活动|资格外活動|28\s*小时/,
      /\bunknown\b/i,
    ],
  },
  {
    id: 'P0-humanities-to-mgr',
    question: '我想从人文签转为经管签怎么办',
    expectInScope: true,
    mustContain: [/(技人国|人文)/, /(经营管理|経営管理|经管)/],
    mustNotContain: [
      /资格外活动|资格外活動|28\s*小时/,
      /\bunknown\b/i,
    ],
  },
  {
    id: 'P0-family-stay-to-work',
    question: '家族滞在想转工作签',
    expectInScope: true,
    mustContain: [/家族滞在/],
    mustNotContain: [
      // Family stay → work visa is 在留資格変更, not 28-hour 资格外活动.
      /28\s*小时|28\s*時間/,
      /\bunknown\b/i,
    ],
  },
  {
    id: 'P0-family-stay-work-permission',
    question: '家族滞在配偶可以打工吗',
    expectInScope: true,
    mustContain: [/(资格外活动|资格外活動|28)/],
    mustNotContain: [
      /(税金|住民税|滞納)/,
      /\bunknown\b/i,
    ],
  },
  {
    id: 'P0-mgr-renewal-materials',
    question: '经管续签材料有哪些',
    expectInScope: true,
    mustContain: [/(经管|経営管理|经营管理)/],
    mustNotContain: [/\bunknown\b/i],
  },
  {
    id: 'P0-permanent-resident-pension',
    question: '永住申请年金没交怎么办',
    expectInScope: true,
    mustContain: [/永住/],
    mustNotContain: [/\bunknown\b/i],
  },
  {
    id: 'P0-immigration-deadline',
    question: '入管让补材料，期限赶不上怎么办',
    expectInScope: true,
    mustNotContain: [/\bunknown\b/i],
  },
  {
    id: 'P0-denial-notice',
    question: '不许可通知书怎么办',
    expectInScope: true,
    mustNotContain: [/\bunknown\b/i],
  },
  {
    id: 'P0-representative-change',
    question: '代表取締役换人要通知入管吗',
    expectInScope: true,
    mustContain: [/(代表|役員|登記)/],
    mustNotContain: [
      /(本店移転|事務所移転|办公室搬迁|地址変更|地址变更)/,
      /\bunknown\b/i,
    ],
  },
  {
    id: 'P1-teijusha-renewal-materials',
    question: '定住者续签要准备哪些材料',
    expectInScope: true,
    mustContain: [/定住/],
    mustNotContain: [/\bunknown\b/i],
  },
  {
    id: 'P1-jinbun-late-jobchange-report',
    question: '技人国换工作了半年没去报告怎么办',
    expectInScope: true,
    mustContain: [/(技人国|人文|技術)/],
    mustNotContain: [/\bunknown\b/i],
  },
  {
    id: 'P1-permanent-years',
    question: '永住申请需要在日本住几年',
    expectInScope: true,
    mustContain: [/永住/],
    mustNotContain: [/\bunknown\b/i],
  },
  {
    id: 'P1-family-stay-to-permanent',
    question: '家族滞在能不能转永住',
    expectInScope: true,
    mustContain: [/(家族滞在|永住)/],
    mustNotContain: [/\bunknown\b/i],
  },
]

interface ProbeResult {
  id: string
  question: string
  pass: boolean
  severity: 'P0' | 'P1'
  reason: string[]
  envelope: LlmAnswerEnvelope
  publicAnswer: AnswerResult
}

async function runOne(test: TestCase): Promise<ProbeResult> {
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

  // v0.2 — project envelope to public answer surface, just like
  // submit-question.ts does.
  const publicAnswer = projectEnvelopeToPublicAnswer({
    envelope,
    legacyAnswer: legacy,
    intent,
    questionText: test.question,
  })

  const severity: ProbeResult['severity'] = test.id.startsWith('P0') ? 'P0' : 'P1'
  const fails: string[] = []

  // 1. Scope expectation (against envelope.answer_mode).
  if (test.expectInScope && envelope.answer_mode === 'out_of_scope') {
    fails.push(`expected in-scope, got out_of_scope`)
  }
  if (!test.expectInScope && envelope.answer_mode !== 'out_of_scope') {
    fails.push(`expected out_of_scope, got ${envelope.answer_mode}`)
  }

  // 2. Engine + mode constraints.
  if (test.expectEngineIn && !test.expectEngineIn.includes(envelope.engine_version)) {
    fails.push(`engine_version ${envelope.engine_version} not in ${test.expectEngineIn.join(',')}`)
  }
  if (test.expectModeIn && !test.expectModeIn.includes(envelope.answer_mode)) {
    fails.push(`answer_mode ${envelope.answer_mode} not in ${test.expectModeIn.join(',')}`)
  }

  // 3. User-visible text checks. The haystack is EVERYTHING the user
  // can see: top-level title/summary, action_answer fields, next_steps,
  // sections. Plus the envelope copy_text (used by the copy button).
  const haystack = userVisibleText(publicAnswer, envelope)

  for (const pat of test.mustContain ?? []) {
    if (!pat.test(haystack)) fails.push(`missing pattern ${pat}`)
  }
  for (const pat of test.mustNotContain ?? []) {
    if (pat.test(haystack)) fails.push(`forbidden pattern ${pat} present`)
  }

  // 4. Forbid full action template for clarification / out_of_scope.
  if (test.forbidActionTemplate) {
    const action = publicAnswer.action_answer
    if (action && (action.what_to_do.length > 0 || action.where_to_go.length > 0
      || action.documents_needed.length > 0 || action.deadline_or_timing.length > 0
      || action.consequences.length > 0 || action.expert_handoff.length > 0)) {
      fails.push(`action_answer contains template fields when forbidActionTemplate=true`)
    }
  }

  // 5. clarification / out_of_scope must not show full template.
  if (envelope.answer_mode === 'clarification_needed' || envelope.answer_mode === 'out_of_scope') {
    const action = publicAnswer.action_answer
    if (action && (action.what_to_do.length > 0 || action.documents_needed.length > 0
      || action.deadline_or_timing.length > 0 || action.where_to_go.length > 0
      || action.consequences.length > 0 || action.expert_handoff.length > 0)) {
      fails.push(`mode=${envelope.answer_mode} but action_answer leaks template fields`)
    }
  }

  // 6. Universal: never show literal 'unknown'/'undefined'/'null' to the user.
  if (/\bunknown\b/i.test(haystack)) fails.push('literal "unknown" in user-visible text')
  if (/\bundefined\b/i.test(haystack)) fails.push('literal "undefined" in user-visible text')
  if (/\bnull\b/i.test(haystack)) fails.push('literal "null" in user-visible text')

  return {
    id: test.id,
    question: test.question,
    pass: fails.length === 0,
    severity,
    reason: fails,
    envelope,
    publicAnswer,
  }
}

function userVisibleText(publicAnswer: AnswerResult, envelope: LlmAnswerEnvelope): string {
  const parts: string[] = [
    publicAnswer.title,
    publicAnswer.summary,
    publicAnswer.intent_summary ?? '', // Rendered in the "我理解你的问题是" panel.
    ...(publicAnswer.next_steps ?? []),
    ...(publicAnswer.sections ?? []).flatMap(s => [s.heading, s.body]),
  ]
  if (publicAnswer.action_answer) {
    const a = publicAnswer.action_answer
    parts.push(
      a.conclusion,
      ...a.what_to_do,
      ...a.where_to_go,
      ...a.how_to_do,
      ...a.documents_needed,
      ...a.deadline_or_timing,
      ...a.consequences,
      ...a.expert_handoff,
      a.boundary_note,
    )
  }
  // Envelope-derived copy text (visible when user clicks "复制 TEBIQ 的建议").
  parts.push(envelope.copy_text)
  return parts.filter(Boolean).join('\n')
}

async function main() {
  const results: ProbeResult[] = []
  for (const test of TESTS) {
    try {
      results.push(await runOne(test))
    } catch (error) {
      results.push({
        id: test.id,
        question: test.question,
        pass: false,
        severity: test.id.startsWith('P0') ? 'P0' : 'P1',
        reason: [`threw: ${error instanceof Error ? error.message : String(error)}`],
        envelope: { engine_version: 'legacy-fallback', answer_mode: 'out_of_scope' } as never,
        publicAnswer: {} as never,
      })
    }
  }

  let passes = 0
  for (const r of results) {
    const tag = r.pass ? 'PASS' : `${r.severity}-FAIL`
    const e = r.envelope
    console.log(`${tag.padEnd(10)} ${r.id.padEnd(34)} engine=${e.engine_version.padEnd(22)} mode=${e.answer_mode}`)
    if (!r.pass) {
      for (const reason of r.reason) console.log(`  └ ${reason}`)
    }
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
