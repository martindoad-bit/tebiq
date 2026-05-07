/**
 * Internal: DeepSeek V4 Mode Matrix Test endpoint (PL 2026-05-07).
 *
 * Per-config endpoint (1 of 4 modes × 3 questions per call) so each
 * invocation fits in Vercel maxDuration. Aggregate across 4 calls.
 *
 * Usage:
 *   curl https://tebiq.jp/api/internal/ds-mode-test?config=A
 *   curl https://tebiq.jp/api/internal/ds-mode-test?config=B
 *   curl https://tebiq.jp/api/internal/ds-mode-test?config=C
 *   curl https://tebiq.jp/api/internal/ds-mode-test?config=D
 *
 * Configs:
 *   A — deepseek-v4-pro   + thinking enabled (default, no override)
 *   B — deepseek-v4-pro   + thinking disabled (top-level thinking:{type:"disabled"})
 *   C — deepseek-v4-flash + thinking enabled (default)
 *   D — deepseek-v4-flash + thinking disabled
 *
 * Internal-only: gated by EVAL_LAB_ENABLED.
 */

import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 300

const ENDPOINT = 'https://api.deepseek.com/chat/completions'

const SYSTEM_PROMPT =
  '你是 TEBIQ — 面向在日外国人的在留咨询助手。回答用中文，咨询语气，不百科，结尾给下一步。'

const QUESTIONS = [
  '我现在是经营管理签证，公司最近半年几乎没有营业额，但是我个人账户还有钱。下次续签是不是只要公司还在就可以？',
  '我是技术・人文知识・国际业务签证，最近换了工作，新公司让我做一部分现场接待和店铺运营，这样会影响下次续签吗？',
  '我想申请永住，但是过去一年有两个月厚生年金晚交了，后来都补上了。这个会不会直接不许可？',
]

interface ConfigDef {
  label: string
  model: string
  thinking_enabled: boolean
  body_extra: Record<string, unknown>
}

const CONFIGS: Record<string, ConfigDef> = {
  A: {
    label: 'A. v4-pro + thinking enabled',
    model: 'deepseek-v4-pro',
    thinking_enabled: true,
    body_extra: {},
  },
  B: {
    label: 'B. v4-pro + thinking disabled',
    model: 'deepseek-v4-pro',
    thinking_enabled: false,
    body_extra: { thinking: { type: 'disabled' } },
  },
  C: {
    label: 'C. v4-flash + thinking enabled',
    model: 'deepseek-v4-flash',
    thinking_enabled: true,
    body_extra: {},
  },
  D: {
    label: 'D. v4-flash + thinking disabled',
    model: 'deepseek-v4-flash',
    thinking_enabled: false,
    body_extra: { thinking: { type: 'disabled' } },
  },
}

interface OneResult {
  question_idx: number
  http_status: number
  ok: boolean
  error_body?: string
  first_token_latency_ms?: number
  total_latency_ms?: number
  chunks: number
  output_chars: number
  reasoning_chars: number
  reasoning_observed: boolean
  content_observed: boolean
  preview: string
}

async function runOne(cfg: ConfigDef, qIdx: number, apiKey: string): Promise<OneResult> {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: QUESTIONS[qIdx] },
  ]
  const body = {
    model: cfg.model,
    stream: true,
    temperature: 0.3,
    max_tokens: 1200,
    messages,
    ...cfg.body_extra,
  }

  const startedAt = Date.now()
  let firstTokenAt: number | null = null
  let chunks = 0
  let outputChars = 0
  let reasoningChars = 0
  let preview = ''

  let res: Response
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(body),
    })
  } catch (e) {
    return {
      question_idx: qIdx,
      http_status: 0,
      ok: false,
      error_body: `fetch_throw: ${e instanceof Error ? e.message : String(e)}`,
      chunks: 0,
      output_chars: 0,
      reasoning_chars: 0,
      reasoning_observed: false,
      content_observed: false,
      preview: '',
    }
  }

  if (!res.ok || !res.body) {
    const errBody = await res.text().catch(() => '<unable to read body>')
    return {
      question_idx: qIdx,
      http_status: res.status,
      ok: false,
      error_body: errBody.slice(0, 1500),
      chunks: 0,
      output_chars: 0,
      reasoning_chars: 0,
      reasoning_observed: false,
      content_observed: false,
      preview: '',
    }
  }

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
  let buf = ''
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
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
          const delta = obj.choices?.[0]?.delta
          if (delta?.reasoning_content) {
            reasoningChars += delta.reasoning_content.length
            if (firstTokenAt === null) firstTokenAt = Date.now()
          }
          if (delta?.content) {
            outputChars += delta.content.length
            chunks++
            if (firstTokenAt === null) firstTokenAt = Date.now()
            if (preview.length < 250) preview += delta.content
          }
        } catch {
          // drop malformed
        }
      }
    }
  } finally {
    try { reader.releaseLock() } catch { /* ignore */ }
  }

  const endedAt = Date.now()
  return {
    question_idx: qIdx,
    http_status: res.status,
    ok: true,
    first_token_latency_ms: firstTokenAt ? firstTokenAt - startedAt : undefined,
    total_latency_ms: endedAt - startedAt,
    chunks,
    output_chars: outputChars,
    reasoning_chars: reasoningChars,
    reasoning_observed: reasoningChars > 0,
    content_observed: outputChars > 0,
    preview: preview.slice(0, 250),
  }
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
  const configKey = (url.searchParams.get('config') || '').toUpperCase()
  const cfg = CONFIGS[configKey]
  if (!cfg) {
    return NextResponse.json({ error: 'bad_config', allowed: Object.keys(CONFIGS) }, { status: 400 })
  }

  const results: OneResult[] = []
  for (let q = 0; q < QUESTIONS.length; q++) {
    const r = await runOne(cfg, q, apiKey)
    results.push(r)
  }

  const okRs = results.filter(r => r.ok)
  const aggregate = {
    label: cfg.label,
    model: cfg.model,
    thinking_enabled: cfg.thinking_enabled,
    pass_count: okRs.length,
    fail_count: results.length - okRs.length,
    avg_first_token_ms: okRs.length > 0
      ? Math.round(okRs.reduce((s, r) => s + (r.first_token_latency_ms ?? 0), 0) / okRs.length)
      : null,
    avg_total_ms: okRs.length > 0
      ? Math.round(okRs.reduce((s, r) => s + (r.total_latency_ms ?? 0), 0) / okRs.length)
      : null,
    avg_chunks: okRs.length > 0 ? Math.round(okRs.reduce((s, r) => s + r.chunks, 0) / okRs.length) : null,
    avg_output_chars: okRs.length > 0
      ? Math.round(okRs.reduce((s, r) => s + r.output_chars, 0) / okRs.length)
      : null,
    reasoning_observed_in_any: results.some(r => r.reasoning_observed),
  }

  return NextResponse.json({ ok: true, config: configKey, aggregate, per_question: results })
}
