/**
 * 1.0 Alpha Photo Lite contract tests (Issue #40).
 *
 * DB-free / Bedrock-free unit tests for:
 *   - formatPhotoSummaryForConsultation voice + length invariants
 *   - Forbidden-fragment parity (no "意味着" / "建议你" / etc)
 *   - Branch coverage (high-confidence / envelope / unidentifiable)
 *
 * Live image-recognition smoke testing (POST /api/consultation/upload with
 * a real image → POST /api/consultation/stream → render summary card)
 * lives as live curl GM/QA verification on the Vercel Preview.
 */
import { strict as assert } from 'node:assert'
import type { PhotoRecognitionResult } from '../../lib/photo/types'

async function main() {
  const summaryMod = await import('@/lib/consultation/photo-summary')
  const filterMod = await import('@/lib/consultation/forbidden-phrases')

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

  function r(partial: Partial<PhotoRecognitionResult>): PhotoRecognitionResult {
    return {
      docType: null,
      issuer: null,
      isEnvelope: false,
      recognitionConfidence: 'high',
      deadline: null,
      deadlineRemainingDays: null,
      amount: null,
      summary: '',
      generalActions: [],
      isUrgent: false,
      needsExpertAdvice: false,
      ...partial,
    }
  }

  // ---- 1. Voice: high-confidence input gets consultation-style summary ----
  check('1a. high-confidence 入管通知書 produces 看起来是 voice', () => {
    const out = summaryMod.formatPhotoSummaryForConsultation(
      r({
        docType: '在留資格認定証明書',
        issuer: '東京出入国在留管理局',
        recognitionConfidence: 'high',
        deadline: '2026-06-30',
      }),
    )
    assert.ok(out.includes('看起来是'), `expected 看起来是, got "${out}"`)
    assert.ok(out.includes('東京出入国在留管理局'))
    assert.ok(out.includes('在留資格認定証明書'))
    assert.ok(out.includes('2026-06-30'))
  })
  check('1b. forbidden-fragment parity: no 意味着 / 建议你 / 必须 / 应该', () => {
    const out = summaryMod.formatPhotoSummaryForConsultation(
      r({
        docType: '通知書',
        issuer: '入管',
        recognitionConfidence: 'high',
        deadline: '2026-06-30',
        amount: '120,000円',
      }),
    )
    for (const banned of summaryMod.PHOTO_SUMMARY_FORBIDDEN_FRAGMENTS) {
      assert.ok(!out.includes(banned), `summary contains forbidden fragment "${banned}": "${out}"`)
    }
  })
  check('1c. forbidden-phrase parity with stream filter (no 一定可以 / 没问题 etc)', () => {
    // Photo summary must never contain the streaming-filter forbidden
    // phrase set either, even if upstream model regresses.
    const out = summaryMod.formatPhotoSummaryForConsultation(
      r({
        docType: '通知書',
        issuer: '入管',
        recognitionConfidence: 'medium',
      }),
    )
    for (const phrase of filterMod.FORBIDDEN_PHRASES) {
      assert.ok(!out.includes(phrase), `summary contains stream-forbidden phrase "${phrase}": "${out}"`)
    }
  })

  // ---- 2. Branch: envelope-only path ----
  check('2a. envelope_only confidence → 信封外面 voice + 拆开建议', () => {
    const out = summaryMod.formatPhotoSummaryForConsultation(
      r({
        docType: '通知',
        issuer: '東京入管',
        isEnvelope: true,
        recognitionConfidence: 'envelope_only',
      }),
    )
    assert.ok(out.includes('信封外面'), `expected 信封外面 voice, got "${out}"`)
    assert.ok(out.includes('拆开'), `expected 拆开 hint, got "${out}"`)
    // Should NOT carry over "deadline" etc from accidental input.
    assert.ok(!out.includes('意味着'))
  })

  // ---- 3. Branch: unidentifiable path ----
  check('3a. null docType + null issuer → 无法可靠识别 fallback', () => {
    const out = summaryMod.formatPhotoSummaryForConsultation(
      r({
        docType: null,
        issuer: null,
        recognitionConfidence: 'low',
      }),
    )
    assert.ok(out.includes('暂时无法可靠识别'), `expected fallback voice, got "${out}"`)
    assert.ok(out.includes('文字'), `expected text-fallback prompt, got "${out}"`)
  })

  // ---- 4. ≤200 char clamp invariant ----
  check('4a. very long issuer + docType clamps at PHOTO_SUMMARY_MAX_CHARS', () => {
    const longIssuer = '日本国東京都新宿区西新宿二丁目八番地一号' + '行政機関'.repeat(20)
    const longDocType = '在留資格認定証明書交付申請に係る' + '通知書'.repeat(20)
    const out = summaryMod.formatPhotoSummaryForConsultation(
      r({
        docType: longDocType,
        issuer: longIssuer,
        recognitionConfidence: 'high',
        deadline: '2026-06-30',
        amount: '999,999円',
      }),
    )
    assert.ok(
      out.length <= summaryMod.PHOTO_SUMMARY_MAX_CHARS,
      `summary length ${out.length} exceeds ${summaryMod.PHOTO_SUMMARY_MAX_CHARS}: "${out}"`,
    )
  })

  // ---- 5. Confidence labelling on partial reads ----
  check('5a. low confidence appends "识别可信度较低" hint', () => {
    const out = summaryMod.formatPhotoSummaryForConsultation(
      r({
        docType: '通知書',
        issuer: '市役所',
        recognitionConfidence: 'low',
      }),
    )
    assert.ok(out.includes('识别可信度较低'))
  })
  check('5b. medium confidence appends "部分内容可能识别不全" hint', () => {
    const out = summaryMod.formatPhotoSummaryForConsultation(
      r({
        docType: '通知書',
        issuer: '市役所',
        recognitionConfidence: 'medium',
      }),
    )
    assert.ok(out.includes('部分内容可能识别不全'))
  })

  // ---- 6. Constants sanity ----
  check('6a. PHOTO_SUMMARY_MAX_CHARS is 200 (Pack §3)', () => {
    assert.equal(summaryMod.PHOTO_SUMMARY_MAX_CHARS, 200)
  })
  check('6b. PHOTO_SUMMARY_FORBIDDEN_FRAGMENTS includes 意味着 + 建议你', () => {
    assert.ok(summaryMod.PHOTO_SUMMARY_FORBIDDEN_FRAGMENTS.includes('意味着'))
    assert.ok(summaryMod.PHOTO_SUMMARY_FORBIDDEN_FRAGMENTS.includes('建议你'))
  })

  console.log(`\n1.0 Alpha photo lite contract: ${passes}/${total} pass`)
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
