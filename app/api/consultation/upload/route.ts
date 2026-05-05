import { recognizePhotoDocument, PhotoRecognitionError } from '@/lib/photo/bedrock'
import { formatPhotoSummaryForConsultation } from '@/lib/consultation/photo-summary'

// POST /api/consultation/upload
//
// 1.0 Alpha Photo Lite endpoint (Issue #40 / Work Packet
// WORKSTREAM_1_0_PHOTO_LITE_PACK §1.2 / §1.3).
//
// User uploads / takes a photo of a Japanese government / immigration /
// employer / pension / tax document. We:
//   1. Pass it to the Bedrock Claude vision recognizer (lib/photo/bedrock.ts)
//      — same building block already in production for the legacy
//      /api/photo/recognize route.
//   2. Convert the structured result into consultation voice via
//      formatPhotoSummaryForConsultation (≤ 200 chars, no "意味着" /
//      "建议你" / etc — Pack §5.F).
//   3. Return { image_summary, image_storage_ref } so the client can:
//        - Display the summary card above the answer
//        - POST it to /api/consultation/stream as part of the request body
//          → ai_consultations row records has_image=true + image_summary
//          + image_storage_ref + the full streaming consultation runs
//
// PII / storage discipline (Pack §5.E + §6 + §7):
//   - We do NOT persist the raw image bytes anywhere — no S3, no Vercel
//     Blob, no public URL.
//   - image_storage_ref is a synthetic 'bedrock://<sha256-prefix>' marker
//     so two uploads of the same image yield the same ref (dedup signal)
//     but the bytes themselves are unrecoverable.
//   - Charter / Pack explicitly say no OCR text storage / no document
//     classification system / no multi-image workflow.
//
// We do NOT route through the legacy `documents` / timeline / quota tables
// — those belong to a different product surface. Photo Lite for 1.0 Alpha
// flows ONLY into ai_consultations.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Single-shot recognition; 60s is plenty (Bedrock Claude vision typically
// returns in 4-12s). Even on Hobby Vercel this fits comfortably.
export const maxDuration = 60

export async function POST(req: Request) {
  const ctype = req.headers.get('content-type') ?? ''
  if (!ctype.includes('multipart/form-data')) {
    return jsonError('expect_multipart', '请用 multipart/form-data 上传图片', 400)
  }

  let bytes: Buffer
  let mediaType: string
  let filename: string | undefined
  try {
    const form = await req.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return jsonError('missing_file', '请选择一张图片再上传', 400)
    }
    bytes = Buffer.from(await file.arrayBuffer())
    mediaType = file.type || 'application/octet-stream'
    filename = file.name
  } catch (err) {
    return jsonError(
      'bad_form',
      '上传内容解析失败，请重试',
      400,
      err instanceof Error ? err.message : String(err),
    )
  }

  try {
    const out = await recognizePhotoDocument({
      bytes,
      mediaType,
      filename,
      // No userContext in Alpha — no auth, no per-user history.
      userContext: null,
    })
    const summary = formatPhotoSummaryForConsultation(out.result)
    return new Response(
      JSON.stringify({
        image_summary: summary,
        image_storage_ref: `bedrock://${out.imageHash.slice(0, 24)}`,
        recognition: {
          model: out.modelId,
          media_type: out.mediaType,
          confidence: out.result.recognitionConfidence,
          is_envelope: out.result.isEnvelope,
        },
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      },
    )
  } catch (err) {
    if (err instanceof PhotoRecognitionError) {
      const status =
        err.code === 'too_large' ? 413 :
        err.code === 'unsupported_type' || err.code === 'bad_image' ? 400 :
        503
      return jsonError(err.code, err.message, status)
    }
    console.warn('[consultation/upload] unexpected error', err)
    return jsonError(
      'recognition_failed',
      '图片识别暂时不可用，请稍后再试，或直接用文字描述。',
      503,
    )
  }
}

function jsonError(code: string, detail: string, status: number, extra?: string): Response {
  return new Response(
    JSON.stringify({ error: code, detail, ...(extra ? { extra } : {}) }),
    { status, headers: { 'content-type': 'application/json' } },
  )
}
