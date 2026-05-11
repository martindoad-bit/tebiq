/**
 * 0.6 Sprint Workstream C — Fact Layer foundation contract tests
 * (ENGINE Pack 2.1).
 *
 * Covers:
 *   - sync script: section extraction, trigger derivation, validation,
 *     URL whitelist enforcement, hash stability
 *   - matcher: gateDecision over the full state × risk_level matrix,
 *     scoreCardAgainst threshold + high-risk bypass
 *   - end-to-end: each committed fact card parses successfully, has
 *     non-empty triggers, and earns expected gate decisions for the
 *     QA-reference questions
 *
 * DB-free. The matcher's loadCandidateCards path is exercised in
 * Pack 2.2 integration tests via the dry-run endpoint (which tests
 * THIS file in turn — that's what `_matcherInternals` are for here).
 *
 * Usage: npx tsx scripts/test/test-fact-layer.ts
 */
import { strict as assert } from 'node:assert'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

async function main() {
  const syncMod = await import('@/scripts/fact-layer-sync')
  const matcherMod = await import('@/lib/answer/fact-layer/matcher')

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

  const internals = syncMod._internals
  const matcherInternals = matcherMod._matcherInternals

  // -----------------------------------------------------------------------
  // 1. URL whitelist
  // -----------------------------------------------------------------------
  check('1a. government source domains are whitelisted', () => {
    assert.equal(internals.validateUrlAgainstWhitelist('https://www.moj.go.jp/isa/applications/x.html'), true)
    assert.equal(internals.validateUrlAgainstWhitelist('https://isa.go.jp/policy.pdf'), true)
    assert.equal(internals.validateUrlAgainstWhitelist('https://www.mhlw.go.jp/content/y.pdf'), true)
    assert.equal(internals.validateUrlAgainstWhitelist('https://elaws.e-gov.go.jp/document?lawid=z'), true)
    assert.equal(internals.validateUrlAgainstWhitelist('https://laws.e-gov.go.jp/document?lawid=326CO0000000319'), true)
    assert.equal(internals.validateUrlAgainstWhitelist('https://www.nta.go.jp/taxes/x.htm'), true)
  })
  check('1b. blog / 中文中介 sources are NOT whitelisted', () => {
    assert.equal(internals.validateUrlAgainstWhitelist('https://gyousei-blog.example.com/visa'), false)
    assert.equal(internals.validateUrlAgainstWhitelist('https://www.xiaohongshu.com/note/1'), false)
    assert.equal(internals.validateUrlAgainstWhitelist('https://twitter.com/visa-tips'), false)
  })
  check('1c. malformed URL returns false (does not throw)', () => {
    assert.equal(internals.validateUrlAgainstWhitelist('not a url'), false)
    assert.equal(internals.validateUrlAgainstWhitelist(''), false)
  })

  // -----------------------------------------------------------------------
  // 2. Trigger keyword derivation
  // -----------------------------------------------------------------------
  check('2a. simple bullet list yields each bullet as a trigger', () => {
    const out = internals.deriveTriggerKeywords([
      '我离婚了，签证怎么办',
      '配偶者签离婚后多久失效',
      '丈夫去世签证还能用吗',
    ])
    assert.equal(out.length, 3)
    assert.ok(out.includes('我离婚了，签证怎么办'))
    assert.ok(out.includes('丈夫去世签证还能用吗'))
  })
  check('2b. slash-separated list expands into multiple triggers', () => {
    const out = internals.deriveTriggerKeywords([
      '経営管理 / 经营管理 / 经管 / 經管',
    ])
    assert.equal(out.length, 4)
    assert.ok(out.includes('経営管理'))
    assert.ok(out.includes('经营管理'))
    assert.ok(out.includes('经管'))
    assert.ok(out.includes('經管'))
  })
  check('2c. duplicates across bullets dedupe', () => {
    const out = internals.deriveTriggerKeywords([
      '永住 / 年金',
      '年金 / 厚生年金',
    ])
    // 永住, 年金, 厚生年金 — 年金 dedup'd
    assert.equal(out.length, 3)
  })
  check('2d. trailing parenthetical comments are stripped', () => {
    const out = internals.deriveTriggerKeywords([
      '投資経営 (旧名称、誤用検出用)',
    ])
    assert.equal(out.length, 1)
    assert.equal(out[0], '投資経営')
  })

  // -----------------------------------------------------------------------
  // 3. Section extraction (markdown body)
  // -----------------------------------------------------------------------
  check('3a. extractSections pulls common_user_phrases bullets', () => {
    const body = [
      '## somewhere else',
      'noise',
      '',
      '## common_user_phrases',
      '',
      '主要トリガー：',
      '',
      '- 我离婚了，签证怎么办',
      '- 配偶者签离婚会被驱逐出境吗',
      '',
      '副次トリガー：',
      '- 离婚后能申请永住吗',
      '',
      '## scenarios',
      'shouldnotappear',
    ].join('\n')
    const out = internals.extractSections(body)
    assert.deepEqual(out.commonUserPhraseBullets, [
      '我离婚了，签证怎么办',
      '配偶者签离婚会被驱逐出境吗',
      '离婚后能申请永住吗',
    ])
  })
  check('3b. extractSections pulls fenced certain_block from injection_format', () => {
    const body = [
      '## injection_format',
      '',
      'description',
      '',
      '### injection_certain_block',
      '',
      '```text',
      'BLOCK LINE 1',
      'BLOCK LINE 2',
      '```',
      '',
      '### injection_needs_review_addendum (NOT injected as facts; hint-only)',
      '',
      '```text',
      'addendum text',
      '```',
    ].join('\n')
    const out = internals.extractSections(body)
    assert.equal(out.certainBlock, 'BLOCK LINE 1\nBLOCK LINE 2')
    assert.equal(out.needsReviewAddendum, 'addendum text')
  })
  check('3c. ❌ bullets (must_not_have) are excluded from triggers', () => {
    const body = [
      '## common_user_phrases',
      '',
      '- 真トリガー1',
      '- 真トリガー2',
      '',
      '回答時に避ける表現：',
      '- ❌ 「離婚しても問題ありません」',
      '- ❌ 「絶対に大丈夫」',
    ].join('\n')
    const out = internals.extractSections(body)
    assert.deepEqual(out.commonUserPhraseBullets, ['真トリガー1', '真トリガー2'])
  })

  // -----------------------------------------------------------------------
  // 4. Per-card normalize — committed cards should all parse
  // -----------------------------------------------------------------------
  const FACT_CARD_DIR = join(process.cwd(), 'docs/fact-cards')
  const CARD_FILES = readdirSync(FACT_CARD_DIR).filter(
    f => f.endsWith('.md') && f !== 'README.md' && f !== 'FACT_OPS_WINDOW_TASK_PACK.md',
  )
  check('4a. all 5 committed fact cards parse without error', () => {
    assert.ok(CARD_FILES.length >= 5, `expected ≥5 cards, found ${CARD_FILES.length}`)
    for (const f of CARD_FILES) {
      const raw = readFileSync(join(FACT_CARD_DIR, f), 'utf8')
      const card = internals.normalize(join(FACT_CARD_DIR, f), raw)
      assert.ok(card.factId.length > 0, `${f} factId empty`)
      assert.ok(card.title.length > 0, `${f} title empty`)
      assert.ok(card.triggerKeywords.length > 0, `${f} trigger_keywords empty`)
    }
  })
  check('4b. content_hash is stable across runs (same input → same hash)', () => {
    const file = join(FACT_CARD_DIR, CARD_FILES[0])
    const raw = readFileSync(file, 'utf8')
    const a = internals.normalize(file, raw)
    const b = internals.normalize(file, raw)
    assert.equal(a.contentHash, b.contentHash)
    assert.equal(a.contentHash.length, 64) // sha256 hex
  })
  check('4c. content_hash differs when body differs by 1 char', () => {
    const file = join(FACT_CARD_DIR, CARD_FILES[0])
    const raw = readFileSync(file, 'utf8')
    const a = internals.normalize(file, raw)
    const b = internals.normalize(file, raw + ' ')
    assert.notEqual(a.contentHash, b.contentHash)
  })
  check('4d. ai_verified / human_reviewed cards have non-empty injection_certain_block', () => {
    for (const f of CARD_FILES) {
      const raw = readFileSync(join(FACT_CARD_DIR, f), 'utf8')
      const card = internals.normalize(join(FACT_CARD_DIR, f), raw)
      if (card.state === 'ai_verified' || card.state === 'human_reviewed') {
        assert.ok(
          card.injectionCertainBlock.length > 0,
          `${f} state=${card.state} but certain_block empty`,
        )
      }
    }
  })
  check('4e. all source URLs are whitelisted', () => {
    for (const f of CARD_FILES) {
      const raw = readFileSync(join(FACT_CARD_DIR, f), 'utf8')
      const card = internals.normalize(join(FACT_CARD_DIR, f), raw)
      for (const url of card.sourceUrls ?? []) {
        assert.ok(
          internals.validateUrlAgainstWhitelist(url),
          `${f} source URL not whitelisted: ${url}`,
        )
      }
    }
  })

  // -----------------------------------------------------------------------
  // 5. Sync hard-fail surface
  // -----------------------------------------------------------------------
  check('5a. card with non-whitelisted source URL hard-fails', () => {
    const fakeCard = [
      '---',
      'fact_id: bad-source',
      'title: bad source test',
      'state: ai_verified',
      'risk_level: low',
      'confidence: high',
      'source_quality: secondary',
      'controlled_alpha_eligible: false',
      'last_verified_at: 2026-05-07',
      'applies_to: [test]',
      'official_sources:',
      '  - id: bad',
      '    url: https://random-blog.example.com/post',
      '---',
      '',
      '## common_user_phrases',
      '',
      '- 测试关键词',
      '',
      '## injection_format',
      '',
      '### injection_certain_block',
      '',
      '```text',
      'fake block',
      '```',
    ].join('\n')
    assert.throws(
      () => internals.normalize('/tmp/bad-source.md', fakeCard),
      /outside the source whitelist/,
    )
  })
  check('5b. ai_verified card with empty injection_certain_block hard-fails', () => {
    const noBlock = [
      '---',
      'fact_id: empty-block',
      'title: empty block',
      'state: ai_verified',
      'risk_level: low',
      'confidence: high',
      'source_quality: official',
      'last_verified_at: 2026-05-07',
      'applies_to: [test]',
      'official_sources:',
      '  - id: a',
      '    url: https://www.moj.go.jp/x',
      '---',
      '',
      '## common_user_phrases',
      '- 测试',
      '',
      '## something_else',
      'no injection_certain_block here',
    ].join('\n')
    assert.throws(
      () => internals.normalize('/tmp/empty-block.md', noBlock),
      /injection_certain_block/,
    )
  })
  check('5c. card with no derivable trigger_keywords hard-fails', () => {
    const noTriggers = [
      '---',
      'fact_id: no-triggers',
      'title: no triggers',
      'state: draft',
      'risk_level: low',
      'confidence: high',
      'source_quality: official',
      'last_verified_at: 2026-05-07',
      'applies_to: [test]',
      'official_sources:',
      '  - id: a',
      '    url: https://www.moj.go.jp/x',
      '---',
      '',
      '## something',
      'no common_user_phrases section',
    ].join('\n')
    assert.throws(
      () => internals.normalize('/tmp/no-triggers.md', noTriggers),
      /trigger_keywords/,
    )
  })
  check('5d. unknown state value hard-fails', () => {
    const badState = [
      '---',
      'fact_id: bad-state',
      'title: bad state',
      'state: WAT_IS_THIS',
      'risk_level: low',
      'confidence: high',
      'source_quality: official',
      'last_verified_at: 2026-05-07',
      'applies_to: [test]',
      'official_sources:',
      '  - id: a',
      '    url: https://www.moj.go.jp/x',
      '---',
      '',
      '## common_user_phrases',
      '- 测试',
    ].join('\n')
    assert.throws(
      () => internals.normalize('/tmp/bad.md', badState),
      /unknown state/,
    )
  })

  // -----------------------------------------------------------------------
  // 6. Matcher gateDecision (state × risk × controlled_alpha_eligible)
  // -----------------------------------------------------------------------
  function fakeCard(o: { state: string; riskLevel: string; controlledAlphaEligible?: boolean; factId?: string }) {
    return {
      factId: o.factId ?? 'test-card',
      title: 't',
      state: o.state,
      riskLevel: o.riskLevel,
      confidence: 'high',
      sourceQuality: 'official',
      controlledAlphaEligible: o.controlledAlphaEligible ?? false,
      appliesTo: [],
      triggerKeywords: [],
      injectionCertainBlock: 'block',
      injectionNeedsReviewAddendum: null,
      needsReviewFlags: [],
      sourceUrls: [],
      evidencePoints: [],
      relatedLinks: [],
      reviewer: null,
      lastVerifiedAt: new Date(),
      approvedAt: null,
      approvedBy: null,
      filesystemPath: '',
      contentHash: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Parameters<typeof matcherInternals.gateDecision>[0]
  }
  check('6a. draft / conflict / disabled → drop', () => {
    assert.equal(matcherInternals.gateDecision(fakeCard({ state: 'draft', riskLevel: 'low' })), 'drop')
    assert.equal(matcherInternals.gateDecision(fakeCard({ state: 'conflict', riskLevel: 'high' })), 'drop')
    assert.equal(matcherInternals.gateDecision(fakeCard({ state: 'disabled', riskLevel: 'critical' })), 'drop')
  })
  check('6b. ai_extracted → drop (in production candidate set)', () => {
    assert.equal(matcherInternals.gateDecision(fakeCard({ state: 'ai_extracted', riskLevel: 'low' })), 'drop')
  })
  check('6c. needs_review → hint_only', () => {
    assert.equal(matcherInternals.gateDecision(fakeCard({ state: 'needs_review', riskLevel: 'low' })), 'hint_only')
    assert.equal(matcherInternals.gateDecision(fakeCard({ state: 'needs_review', riskLevel: 'critical' })), 'hint_only')
  })
  check('6d. human_reviewed → inject regardless of risk', () => {
    for (const r of ['low', 'medium', 'high', 'critical']) {
      assert.equal(matcherInternals.gateDecision(fakeCard({ state: 'human_reviewed', riskLevel: r })), 'inject')
    }
  })
  check('6e. ai_verified low/medium/high → inject', () => {
    assert.equal(matcherInternals.gateDecision(fakeCard({ state: 'ai_verified', riskLevel: 'low' })), 'inject')
    assert.equal(matcherInternals.gateDecision(fakeCard({ state: 'ai_verified', riskLevel: 'medium' })), 'inject')
    assert.equal(matcherInternals.gateDecision(fakeCard({ state: 'ai_verified', riskLevel: 'high' })), 'inject')
  })
  check('6f. ai_verified critical without controlled_alpha_eligible → hint_only', () => {
    assert.equal(
      matcherInternals.gateDecision(fakeCard({ state: 'ai_verified', riskLevel: 'critical', controlledAlphaEligible: false })),
      'hint_only',
    )
  })
  check('6g. ai_verified critical WITH controlled_alpha_eligible → inject', () => {
    assert.equal(
      matcherInternals.gateDecision(fakeCard({ state: 'ai_verified', riskLevel: 'critical', controlledAlphaEligible: true })),
      'inject',
    )
  })

  // -----------------------------------------------------------------------
  // 7. Matcher scoreCardAgainst
  // -----------------------------------------------------------------------
  function scoreCard(o: { triggerKeywords: string[]; riskLevel: string; factId?: string }, q: string) {
    const card = fakeCard({ state: 'ai_verified', riskLevel: o.riskLevel, factId: o.factId })
    card.triggerKeywords = o.triggerKeywords
    return matcherInternals.scoreCardAgainst(card, q.toLowerCase())
  }
  check('7a. zero matches returns null', () => {
    const r = scoreCard({ triggerKeywords: ['永住', '年金'], riskLevel: 'medium' }, '完全不沾边')
    assert.equal(r, null)
  })
  check('7b. medium-risk card below threshold (0.15) returns null', () => {
    // 1 match out of 10 = 0.10 < 0.15 → drop
    const triggers = ['永住', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    const r = scoreCard({ triggerKeywords: triggers, riskLevel: 'medium' }, '永住申请')
    assert.equal(r, null)
  })
  check('7c. high-risk card with 1 match BYPASSES threshold', () => {
    const triggers = ['永住', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    const r = scoreCard({ triggerKeywords: triggers, riskLevel: 'high' }, '永住申请')
    assert.notEqual(r, null)
    assert.equal(r!.matchedKeywords.length, 1)
  })
  check('7d. critical-risk card with 1 match BYPASSES threshold', () => {
    const triggers = ['永住', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    const r = scoreCard({ triggerKeywords: triggers, riskLevel: 'critical' }, '永住申请')
    assert.notEqual(r, null)
  })
  check('7e. medium-risk card above threshold returns match', () => {
    const triggers = ['永住', '年金', '住民税', '健保']
    const r = scoreCard({ triggerKeywords: triggers, riskLevel: 'medium' }, '永住申请年金')
    assert.notEqual(r, null)
    assert.equal(r!.matchedKeywords.length, 2)
    assert.equal(r!.score, 0.5)
  })
  check('7f. duplicate keyword in trigger list dedup\'d in score numerator', () => {
    // 永住 appears twice; question contains it once. Should count as 1 match,
    // and the denominator dedups too so score is 1/2 = 0.5 (not 1/1 or 2/2).
    const r = scoreCard({ triggerKeywords: ['永住', '永住', '年金'], riskLevel: 'medium' }, '永住申请')
    assert.notEqual(r, null)
    assert.equal(r!.matchedKeywords.length, 1)
  })
  check('7g. spouse-divorce card ignores generic cancellation hits without spouse/divorce context', () => {
    const r = scoreCard({
      factId: 'spouse-divorce-separation',
      triggerKeywords: ['取消', '14日届出', '離婚'],
      riskLevel: 'critical',
    }, '技人国离职超过3个月会取消吗，我还没做14日届出')
    assert.equal(r, null)
  })
  check('7h. spouse-divorce card still matches with spouse/divorce context', () => {
    const r = scoreCard({
      factId: 'spouse-divorce-separation',
      triggerKeywords: ['取消', '14日届出', '離婚'],
      riskLevel: 'critical',
    }, '配偶签离婚后会被取消吗')
    assert.notEqual(r, null)
  })
  check('7i. family-stay card ignores generic study/work hits without dependent-family context', () => {
    const r = scoreCard({
      factId: 'kazoku-taizai-yoken',
      triggerKeywords: ['留学', 'アルバイト', '就労'],
      riskLevel: 'high',
    }, '留学转工作签，アルバイト超28小时会影响吗')
    assert.equal(r, null)
  })
  check('7j. family-stay card still matches with dependent-family context', () => {
    const r = scoreCard({
      factId: 'kazoku-taizai-yoken',
      triggerKeywords: ['家族滞在', 'アルバイト', '就労'],
      riskLevel: 'high',
    }, '家族滞在アルバイト可以做吗')
    assert.notEqual(r, null)
  })
  check('7k. business-manager existing-holder card ignores generic update without keiei context', () => {
    const r = scoreCard({
      factId: 'keiei-kanri-existing-holder-update',
      triggerKeywords: ['更新', '续签', '2028'],
      riskLevel: 'high',
    }, '家族滞在打工超过28小时，更新马上到了')
    assert.equal(r, null)
  })
  check('7l. business-manager existing-holder card still matches with keiei context', () => {
    const r = scoreCard({
      factId: 'keiei-kanri-existing-holder-update',
      triggerKeywords: ['更新', '续签', '2028'],
      riskLevel: 'high',
    }, '经管签明年更新，新规则怎么处理')
    assert.notEqual(r, null)
  })
  check('7m. study-to-gijinkoku card ignores current-gijinkoku questions without study context', () => {
    const r = scoreCard({
      factId: 'ryugaku-gijinkoku-henko',
      triggerKeywords: ['技人国', '在留資格変更'],
      riskLevel: 'high',
    }, '我现在技人国，公司让我在店里收银点餐，更新时怎么写')
    assert.equal(r, null)
  })
  check('7n. study-to-gijinkoku card still matches with study context', () => {
    const r = scoreCard({
      factId: 'ryugaku-gijinkoku-henko',
      triggerKeywords: ['技人国', '在留資格変更'],
      riskLevel: 'high',
    }, '专门学校毕业，想从留学转技人国')
    assert.notEqual(r, null)
  })

  // -----------------------------------------------------------------------
  // 8. Constants sanity
  // -----------------------------------------------------------------------
  check('8a. SCORE_THRESHOLD_LOW_MEDIUM = 0.15', () => {
    assert.equal(matcherInternals.SCORE_THRESHOLD_LOW_MEDIUM, 0.15)
  })
  check('8b. MAX_INJECTED = 2', () => {
    assert.equal(matcherInternals.MAX_INJECTED, 2)
  })
  check('8c. RISK_RANK has all 4 levels', () => {
    assert.equal(matcherInternals.RISK_RANK.critical, 4)
    assert.equal(matcherInternals.RISK_RANK.high, 3)
    assert.equal(matcherInternals.RISK_RANK.medium, 2)
    assert.equal(matcherInternals.RISK_RANK.low, 1)
  })
  check('8d. PRODUCTION_CANDIDATE_STATES does NOT include ai_extracted', () => {
    assert.ok(!matcherInternals.PRODUCTION_CANDIDATE_STATES.includes('ai_extracted' as never))
  })
  check('8e. DRY_RUN_CANDIDATE_STATES DOES include ai_extracted', () => {
    assert.ok(matcherInternals.DRY_RUN_CANDIDATE_STATES.includes('ai_extracted' as never))
  })

  console.log(`\n0.6 Pack 2.1 fact-layer foundation contract: ${passes}/${total} pass`)
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
