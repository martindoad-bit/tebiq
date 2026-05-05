// 1.0 Alpha — Photo Lite consultation-voice summary builder (Issue #40 §1.3 / §5.F).
//
// Takes a Bedrock photo recognition result (the same recognizer used by the
// legacy /api/photo/recognize route) and emits a short consultation-voice
// summary suitable for both:
//   1) Display: shown above the streaming answer area in /ai-consultation
//   2) LLM context: injected as `image_summary` into the consultation
//      streaming pipeline (lib/answer/prompt/consultation-alpha-v1.ts
//      buildConsultationMessages → system context).
//
// Voice rules (Pack §5.F + Charter §7):
//   - Use "看起来是 / 看起来涉及 / 里面提到 / 可能涉及"
//   - NEVER use "意味着 / 必然 / 一定 / 应该 / 必须"
//   - NEVER prescribe action ("你应该…", "建议你 X 月 X 日做 Y")
//   - NEVER assert visa/residency consequence ("对你的在留有影响…")
//   - Cap at PHOTO_SUMMARY_MAX_CHARS (Pack §3 — image_summary ≤ 200 字)
//
// Note: we do NOT reuse the recognizer's `summary` field directly — that's
// "客观文书识别" voice, not consultation voice. We synthesize from the
// structured fields (docType / issuer / deadline / amount / confidence)
// so the consultation voice is consistent regardless of upstream model
// drift in summary phrasing.

import type { PhotoRecognitionResult } from '@/lib/photo/types'

/** Pack §3 — image_summary ≤ 200 字. */
export const PHOTO_SUMMARY_MAX_CHARS = 200

/**
 * Phrases that must NEVER appear in any photo summary, regardless of
 * upstream input. Tested in scripts/test/test-photo-lite.ts to lock the
 * Pack §5.F invariant.
 */
export const PHOTO_SUMMARY_FORBIDDEN_FRAGMENTS: ReadonlyArray<string> = Object.freeze([
  '意味着',
  '建议你',
  '你应该',
  '必须',
  '一定',
  '保证',
  '不会影响',
  '没问题',
])

export function formatPhotoSummaryForConsultation(r: PhotoRecognitionResult): string {
  const parts: string[] = []

  // Branch 1 — only saw the envelope. Voice: explicit, ask for re-shoot.
  if (r.recognitionConfidence === 'envelope_only' || r.isEnvelope) {
    const issuer = r.issuer ? `${r.issuer} ` : ''
    const docType = r.docType ?? '文书'
    parts.push(`图片只看到信封外面，${issuer}${docType}，里面具体内容还没拍到。`)
    parts.push(`如果可以，拆开后再拍一次正文会更好咨询。`)
    return clamp(parts.join(''))
  }

  // Branch 2 — couldn't read anything useful. Voice: ask for text fallback.
  if (!r.docType && !r.issuer) {
    parts.push(`这张图片里的关键信息暂时无法可靠识别。`)
    parts.push(`用文字简单说一下里面是什么内容，咨询会更准。`)
    return clamp(parts.join(''))
  }

  // Branch 3 — at least partial recognition. Voice: 看起来是 / 里面提到.
  const issuer = r.issuer ?? '未识别机构'
  const docType = r.docType ?? '文书'
  parts.push(`图片看起来是${issuer}发出的${docType}。`)
  if (r.deadline) {
    parts.push(`里面提到的日期是 ${r.deadline}。`)
  }
  if (r.amount) {
    parts.push(`提到金额：${r.amount}。`)
  }
  if (r.recognitionConfidence === 'low') {
    parts.push(`识别可信度较低，仅供咨询参考。`)
  } else if (r.recognitionConfidence === 'medium') {
    parts.push(`部分内容可能识别不全。`)
  }

  return clamp(parts.join(''))
}

function clamp(s: string): string {
  if (s.length <= PHOTO_SUMMARY_MAX_CHARS) return s
  return s.slice(0, PHOTO_SUMMARY_MAX_CHARS - 1) + '…'
}
