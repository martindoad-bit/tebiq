/**
 * Internal: Consultation Stream Bottleneck Bench (PL 2026-05-07).
 *
 * Mirrors the production /api/consultation/stream lib path 1:1 (same
 * createAiConsultation, anchor matcher, forbidden filter, appendPartialAnswer,
 * completeAiConsultation) but returns JSON timing report instead of SSE.
 *
 * Captures t0..t8 per PL spec to localize whether latency comes from:
 *   - DeepSeek raw stream  (t6 - t4)
 *   - Our SSE wrap         (t7 - t5)
 *   - Per-chunk DB await   (sum of appendPartial ms)
 *   - Final DB write       (t8 - t7)
 *
 * Gated by EVAL_LAB_ENABLED. Internal only.
 *
 * Usage:
 *   curl 'https://tebiq.jp/api/internal/consultation-bench?q=<urlencoded question>'
 */

import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import {
  CONSULTATION_ALPHA_MODEL,
  CONSULTATION_ALPHA_PROMPT_VERSION,
  buildConsultationMessages,
} from '@/lib/answer/prompt/consultation-alpha-v1'
import { anchorsToPromptContext, matchAnchors } from '@/lib/consultation/fact-anchors'
import { createForbiddenFilter } from '@/lib/consultation/forbidden-phrases'
import { detectRiskKeywords } from '@/lib/consultation/risk-keywords'
import {
  appendPartialAnswer,
  completeAiConsultation,
  createAiConsultation,
  markFirstToken,
} from '@/lib/db/queries/aiConsultations'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 300

const ENDPOINT = 'https://api.deepseek.com/chat/completions'
const TEMPERATURE = 0.3
const MAX_TOKENS = 1500

const DEFAULT_QUESTION =
  '我现在是经营管理签证，公司最近半年几乎没有营业额，但是我个人账户还有钱。下次续签是不是只要公司还在就可以？'

interface ChunkTiming {
  idx: number
  ms_since_first_content: number
  chars: number
  db_append_ms: number
}

export async function GET(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'deepseek_disabled' }, { status: 503 })
  }
  const url = new URL(req.url)
  const question = (url.searchParams.get('q') || DEFAULT_QUESTION).slice(0, 4000)

  const t0_request_received = Date.now()

  // Mirror production: risk keywords + anchor match
  const riskHits = detectRiskKeywords(question)
  const matchedAnchors = matchAnchors(question, null)
  const anchorIds = matchedAnchors.map(a => a.anchorId)

  // createAiConsultation timing
  const t_db_create_start = Date.now()
  const consultation = await createAiConsultation({
    viewerId: null,
    userQuestionText: question,
    hasImage: false,
    imageSummary: null,
    imageStorageRef: null,
    riskKeywordHits: riskHits,
    factAnchorIds: anchorIds,
    promptVersion: CONSULTATION_ALPHA_PROMPT_VERSION,
    model: CONSULTATION_ALPHA_MODEL,
  })
  const db_create_ms = Date.now() - t_db_create_start

  const filter = createForbiddenFilter()
  const messages = buildConsultationMessages({
    userQuestion: question,
    imageSummary: null,
    factAnchors: anchorsToPromptContext(matchedAnchors),
  })

  const inputChars = JSON.stringify(messages).length

  const t1_deepseek_request_sent = Date.now()
  let res: Response
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: CONSULTATION_ALPHA_MODEL,
        stream: true,
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
        messages,
      }),
    })
  } catch (e) {
    return NextResponse.json({
      error: 'fetch_throw',
      detail: e instanceof Error ? e.message : String(e),
    }, { status: 502 })
  }
  const t2_deepseek_response_headers_received = Date.now()

  if (!res.ok || !res.body) {
    const body = await res.text().catch(() => '')
    return NextResponse.json({ error: 'deepseek_http', http_status: res.status, body: body.slice(0, 500) }, { status: 502 })
  }

  let t3_first_raw_sse: number | null = null
  let t4_first_content_delta: number | null = null
  let t5_first_chunk_to_client: number | null = null
  let t6_last_content_delta: number | null = null
  let t7_completed_enqueued: number | null = null

  let totalText = ''
  let rawChunks = 0
  let answerChunks = 0
  const chunkTimings: ChunkTiming[] = []
  const dbAppendDurations: number[] = []

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
  let buf = ''
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      if (t3_first_raw_sse === null) t3_first_raw_sse = Date.now()
      buf += value
      let nlIdx
      while ((nlIdx = buf.indexOf('\n\n')) !== -1) {
        const frame = buf.slice(0, nlIdx).trim()
        buf = buf.slice(nlIdx + 2)
        if (!frame || !frame.startsWith('data:')) continue
        const payload = frame.slice('data:'.length).trim()
        if (payload === '[DONE]') break
        try {
          const obj = JSON.parse(payload) as {
            choices?: Array<{ delta?: { content?: string; reasoning_content?: string } }>
          }
          rawChunks++
          const delta = obj.choices?.[0]?.delta
          if (typeof delta?.content === 'string' && delta.content.length > 0) {
            const tNow = Date.now()
            if (t4_first_content_delta === null) t4_first_content_delta = tNow
            t6_last_content_delta = tNow

            // First-token marker (mirrors production)
            if (answerChunks === 0) {
              try { await markFirstToken(consultation.id) } catch { /* ignore */ }
            }

            // Filter (mirror prod)
            const safeChunk = filter.push(delta.content)
            if (safeChunk.length > 0) {
              totalText += safeChunk
              const tEnq = Date.now()
              if (t5_first_chunk_to_client === null) t5_first_chunk_to_client = tEnq
              answerChunks++

              // Per-chunk DB append (mirror prod — this is the suspected throttle)
              const tDbAppendStart = Date.now()
              try { await appendPartialAnswer(consultation.id, safeChunk) } catch { /* ignore */ }
              const dbDur = Date.now() - tDbAppendStart
              dbAppendDurations.push(dbDur)

              chunkTimings.push({
                idx: answerChunks,
                ms_since_first_content: tEnq - (t4_first_content_delta ?? tEnq),
                chars: safeChunk.length,
                db_append_ms: dbDur,
              })
            }
          }
        } catch {
          // ignore malformed
        }
      }
    }
  } finally {
    try { reader.releaseLock() } catch { /* ignore */ }
  }

  // Flush filter tail
  const tail = filter.flush()
  if (tail.length > 0) {
    totalText += tail
    answerChunks++
    const tDb = Date.now()
    try { await appendPartialAnswer(consultation.id, tail) } catch { /* ignore */ }
    dbAppendDurations.push(Date.now() - tDb)
  }

  t7_completed_enqueued = Date.now()

  const t_db_complete_start = Date.now()
  try {
    await completeAiConsultation({
      id: consultation.id,
      finalAnswerText: totalText,
      forbiddenRedactions: filter.redactions().slice(),
    })
  } catch { /* ignore */ }
  const t8_db_write_done = Date.now()

  const sumDbAppend = dbAppendDurations.reduce((s, n) => s + n, 0)
  const dsContentDuration = t6_last_content_delta && t4_first_content_delta
    ? t6_last_content_delta - t4_first_content_delta
    : null
  const ourSseContentDuration = t7_completed_enqueued && t5_first_chunk_to_client
    ? t7_completed_enqueued - t5_first_chunk_to_client
    : null
  const totalUntilCompleted = t7_completed_enqueued - t0_request_received
  const charsPerSecRaw = dsContentDuration && totalText.length
    ? Math.round(totalText.length / (dsContentDuration / 1000))
    : null
  const charsPerSecClient = ourSseContentDuration && totalText.length
    ? Math.round(totalText.length / (ourSseContentDuration / 1000))
    : null

  return NextResponse.json({
    ok: true,
    config: {
      model: CONSULTATION_ALPHA_MODEL,
      thinking_explicit: false,  // production sends no thinking field
      prompt_version: CONSULTATION_ALPHA_PROMPT_VERSION,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
    },
    counts: {
      input_chars: inputChars,
      output_chars: totalText.length,
      raw_deepseek_chunks: rawChunks,
      answer_chunks_to_client: answerChunks,
    },
    timing_ms: {
      t0_request_received: 0,
      t1_deepseek_request_sent: t1_deepseek_request_sent - t0_request_received,
      t2_deepseek_headers: t2_deepseek_response_headers_received - t0_request_received,
      t3_first_raw_sse: t3_first_raw_sse ? t3_first_raw_sse - t0_request_received : null,
      t4_first_content_delta: t4_first_content_delta ? t4_first_content_delta - t0_request_received : null,
      t5_first_chunk_to_client: t5_first_chunk_to_client ? t5_first_chunk_to_client - t0_request_received : null,
      t6_last_content_delta: t6_last_content_delta ? t6_last_content_delta - t0_request_received : null,
      t7_completed_enqueued: t7_completed_enqueued - t0_request_received,
      t8_db_write_done: t8_db_write_done - t0_request_received,
    },
    derived: {
      first_content_ms: t4_first_content_delta ? t4_first_content_delta - t0_request_received : null,
      deepseek_content_duration_ms: dsContentDuration,
      our_sse_content_duration_ms: ourSseContentDuration,
      db_create_ms,
      db_append_total_ms: sumDbAppend,
      db_append_avg_ms: dbAppendDurations.length > 0
        ? Math.round(sumDbAppend / dbAppendDurations.length) : null,
      db_append_count: dbAppendDurations.length,
      db_complete_ms: t8_db_write_done - t_db_complete_start,
      total_until_completed_event_ms: totalUntilCompleted,
      chars_per_second_raw: charsPerSecRaw,
      chars_per_second_to_client: charsPerSecClient,
    },
    chunk_timings_sample: chunkTimings.slice(0, 30),
    consultation_id: consultation.id,
  })
}
