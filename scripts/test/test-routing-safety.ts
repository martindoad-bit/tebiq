/**
 * Routing Safety Gate v1 — regression test (Issue #18, R01–R05).
 *
 * Acceptance criteria (from EVAL_ROUTING_SAFETY_GATE_PACK.md §验收标准):
 *   - 7/7 TEBIQ status ≠ out_of_scope
 *   - J03/J04/J08/I08: status = clarification_needed | preliminary
 *   - D05/D06: domain 推断为家族/身份变更
 *   - 0 new regression on previously-passing questions
 *
 * Implementation note: status is decided by the projector based on
 *   `domain` + `source.kind` + the legacy answer-type. The OOS pathway
 *   triggers ONLY when domain==='unknown' (see lib/answer/core/intake.ts
 *   line ~125). So this test asserts at the routing layer: domain
 *   resolution for the 7 regression-set questions must NOT return
 *   'unknown'. That necessary condition is also sufficient for the
 *   acceptance criteria above, given the projector logic at
 *   lib/answer/core/projector.ts:78-106:
 *     - admin_general → preliminary | clarification_needed (cap)
 *     - long_term_resident / family_stay / business_manager with no
 *       source match → clarification_needed
 *
 * This test runs synchronously without DB / DeepSeek — it exercises
 * detectDomain() directly. End-to-end pipeline behavior is verified
 * separately on the Vercel preview by QA.
 */
import { strict as assert } from 'node:assert'

import { STARTER_QUESTIONS } from '@/lib/eval-lab/starter-questions'
import { detectDomain } from '@/lib/answer/core/domain'
import type { AnswerIntent } from '@/lib/answer/intent-router'

// Minimal stub intent — detectDomain falls through to text-based matching
// when intent fields are empty/undefined, which is what we want here:
// we're isolating the regex-driven path of the router, NOT the LLM-driven
// intent extraction. In production the intent fields would often be
// populated by the LLM and could route via target/current_status before
// hitting text matching, so a domain other than this test's expectation
// is also fine in production for some inputs.
const NO_INTENT: AnswerIntent = {
  intent_type: 'risk_assessment',
  subject: 'individual',
  domain: 'visa',
  confidence: 1,
  extracted_entities: {},
  preferred_template: 'risk_template',
  should_answer: true,
  understood_as: '',
}

interface ExpectedRouting {
  starter_tag: string
  expected_domain_oneof: ReadonlyArray<string>
  rule: string
}

/**
 * Per Work Packet, all 7 must NOT be 'unknown'. Domain expectations
 * follow R01–R05 routing intent:
 *   - R02 (D05/D06)  → family/身份变更 → 'long_term_resident' or 'family_stay'
 *   - R02 (D09)       → 家人 → 'family_stay'
 *   - R03/R05 (I08)   → 公司+清算+回国 → 'business_manager'
 *   - R01 (J03)       → 时间敏感+在留 → 'admin_general'
 *   - R04 (J04/J08)   → 解雇 / 工作不一致 → 'admin_general'
 *
 * `expected_domain_oneof` accepts a small set: the regex order is
 * tunable as long as the result is in this set per the Work Packet.
 */
const EXPECTED: ExpectedRouting[] = [
  { starter_tag: 'eval-lab-v1-J04', expected_domain_oneof: ['admin_general'], rule: 'R04 解雇' },
  { starter_tag: 'eval-lab-v1-J08', expected_domain_oneof: ['admin_general'], rule: 'R04 在留+工作不一致' },
  { starter_tag: 'eval-lab-v1-J03', expected_domain_oneof: ['admin_general'], rule: 'R01 时间敏感' },
  { starter_tag: 'eval-lab-v1-I08', expected_domain_oneof: ['business_manager'], rule: 'R03/R05 公司清算回国' },
  { starter_tag: 'eval-lab-v1-D05', expected_domain_oneof: ['long_term_resident', 'family_stay'], rule: 'R02 配偶离婚' },
  { starter_tag: 'eval-lab-v1-D06', expected_domain_oneof: ['long_term_resident', 'family_stay'], rule: 'R02 配偶离婚' },
  { starter_tag: 'eval-lab-v1-D09', expected_domain_oneof: ['family_stay', 'long_term_resident'], rule: 'R02 家人' },
]

/**
 * Spot-check a sampling of questions that ALREADY routed correctly
 * (i.e. matched a specific or admin_general domain via the V1.1 patterns)
 * to make sure the new R01–R05 rules don't accidentally re-classify them.
 *
 * Picked from existing 100Q starter pack:
 *   - A01 经营管理签 (business_manager)
 *   - A05 家族滞在 (family_stay)
 *   - A09 配偶签离婚 (long_term_resident — exercises R02 path; was OOS, now LTR)
 *   - A10 定住者 (long_term_resident)
 *   - E01 永住 (permanent_resident)
 *   - F01 入管补材料 (admin_general)
 *   - C01 人文签 (gijinkoku)
 *   - B07 经管放弃回国 (business_manager — already had 经管 keyword;
 *                       new R03/R05 should not change result)
 */
const NO_REGRESSION_SPOTCHECK: Array<{ starter_tag: string; expected_domain: string; note?: string }> = [
  // A01 contains BOTH 经管 and 技人国 keywords. Regex-only order picks the
  // first hit (business_manager). In production the LLM-extracted intent
  // would set target_status='技人国' so detectDomain would prefer
  // gijinkoku via targetMatch. This test exercises the regex-only fallback.
  { starter_tag: 'eval-lab-v1-A01', expected_domain: 'business_manager', note: 'regex-only fallback; LLM intent would route to gijinkoku' },
  { starter_tag: 'eval-lab-v1-A05', expected_domain: 'family_stay' }, // 家族滞在→工作签
  { starter_tag: 'eval-lab-v1-A09', expected_domain: 'long_term_resident' }, // 配偶签离婚→定住
  { starter_tag: 'eval-lab-v1-A10', expected_domain: 'permanent_resident' }, // 定住→永住 (永 wins)
  { starter_tag: 'eval-lab-v1-E01', expected_domain: 'permanent_resident' }, // 永住申请
  { starter_tag: 'eval-lab-v1-F01', expected_domain: 'admin_general' }, // 入管补材料
  { starter_tag: 'eval-lab-v1-C01', expected_domain: 'gijinkoku' }, // 人文签换工作
  { starter_tag: 'eval-lab-v1-B07', expected_domain: 'business_manager' }, // 经管放弃回国
]

async function main() {
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

  // Build a tag → questionText lookup from the seed pack so the test
  // exercises the exact text we'd generate against in production.
  const byTag = new Map<string, string>()
  for (const s of STARTER_QUESTIONS) byTag.set(s.starter_tag, s.question)

  // ---- 1. seed pack contains all 7 regression tags ----
  check('1a. seed pack contains all 7 regression starter_tags', () => {
    for (const e of EXPECTED) {
      assert.ok(byTag.has(e.starter_tag), `seed missing ${e.starter_tag}`)
    }
  })

  // ---- 2. 7/7 regression tags: domain ≠ 'unknown' ----
  for (const e of EXPECTED) {
    check(`2.${e.starter_tag}: domain ≠ 'unknown' (rule ${e.rule})`, () => {
      const text = byTag.get(e.starter_tag)
      assert.ok(text, `seed missing question for ${e.starter_tag}`)
      const domain = detectDomain({ questionText: text!, intent: NO_INTENT })
      assert.notEqual(domain, 'unknown', `${e.starter_tag} → '${domain}' (expected non-unknown). text="${text}"`)
    })
  }

  // ---- 3. 7/7 regression tags: domain in expected set ----
  for (const e of EXPECTED) {
    check(`3.${e.starter_tag}: domain ∈ {${e.expected_domain_oneof.join(',')}}`, () => {
      const text = byTag.get(e.starter_tag)!
      const domain = detectDomain({ questionText: text, intent: NO_INTENT })
      assert.ok(
        e.expected_domain_oneof.includes(domain),
        `${e.starter_tag} → '${domain}', expected one of ${e.expected_domain_oneof.join(',')}. text="${text}"`,
      )
    })
  }

  // ---- 4. no regression on previously-passing questions ----
  for (const s of NO_REGRESSION_SPOTCHECK) {
    check(`4.${s.starter_tag}: still routes to '${s.expected_domain}'`, () => {
      const text = byTag.get(s.starter_tag)
      assert.ok(text, `seed missing question for ${s.starter_tag}`)
      const domain = detectDomain({ questionText: text!, intent: NO_INTENT })
      assert.equal(
        domain,
        s.expected_domain,
        `${s.starter_tag} → '${domain}', expected '${s.expected_domain}'. text="${text}"`,
      )
    })
  }

  // ---- 5. obviously off-topic still falls to 'unknown' (don't widen scope) ----
  check('5a. "怎么减肥效果最好？" → unknown (sanity: scope not widened)', () => {
    assert.equal(detectDomain({ questionText: '怎么减肥效果最好？', intent: NO_INTENT }), 'unknown')
  })
  check('5b. "今天东京天气怎么样？" → unknown', () => {
    assert.equal(detectDomain({ questionText: '今天东京天气怎么样？', intent: NO_INTENT }), 'unknown')
  })
  check('5c. "推荐一只日本股票" → unknown', () => {
    assert.equal(detectDomain({ questionText: '推荐一只日本股票', intent: NO_INTENT }), 'unknown')
  })

  console.log(`\nRouting Safety Gate v1 regression: ${passes}/${total} pass`)
  if (fails.length > 0) {
    console.log('Failures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }

  // Per Work Packet "回归测试结果：X/7 pass" report — also emit a
  // condensed line to grep for in CI logs.
  const sevenOf = EXPECTED.filter(e => {
    const text = byTag.get(e.starter_tag)
    if (!text) return false
    return detectDomain({ questionText: text, intent: NO_INTENT }) !== 'unknown'
  }).length
  console.log(`\n[ROUTING-SAFETY-GATE] regression set: ${sevenOf}/7 not out_of_scope`)
}

main().catch(e => {
  console.error('fatal', e)
  process.exit(1)
})
