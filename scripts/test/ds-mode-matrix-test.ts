/**
 * DeepSeek V4 Mode Matrix Test (PL 2026-05-07)
 *
 * Isolated server script. Reads DEEPSEEK_API_KEY from env. Calls DS
 * /chat/completions directly with 4 mode combos × 3 questions, captures:
 *   - HTTP status + full error body if 400+
 *   - first_token_latency_ms
 *   - total_latency_ms
 *   - chunks count + output_chars
 *   - reasoning_content presence vs content presence
 *   - sample of first ~200 output chars for quick quality eyeball
 *
 * Per PL spec:
 *   thinking: { type: "disabled" }   ← correct shape (top-level)
 *   reasoning_effort omitted in disabled groups
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/test/ds-mode-matrix-test.ts
 *
 * Output: JSON + human-readable summary on stdout.
 */

const ENDPOINT = 'https://api.deepseek.com/chat/completions'

const SYSTEM_PROMPT =
  '你是 TEBIQ — 面向在日外国人的在留咨询助手。回答用中文，咨询语气，不百科，结尾给下一步。'

const QUESTIONS = [
  '我现在是经营管理签证，公司最近半年几乎没有营业额，但是我个人账户还有钱。下次续签是不是只要公司还在就可以？',
  '我是技术・人文知识・国际业务签证，最近换了工作，新公司让我做一部分现场接待和店铺运营，这样会影响下次续签吗？',
  '我想申请永住，但是过去一年有两个月厚生年金晚交了，后来都补上了。这个会不会直接不许可？',
]

interface Config {
  label: string
  model: string
  thinking: boolean
  body_extra: Record<string, unknown>
}

const CONFIGS: Config[] = [
  {
    label: 'A. v4-pro + thinking enabled',
    model: 'deepseek-v4-pro',
    thinking: true,
    body_extra: {}, // default — let DS decide whether reasoning_effort default
  },
  {
    label: 'B. v4-pro + thinking disabled',
    model: 'deepseek-v4-pro',
    thinking: false,
    body_extra: { thinking: { type: 'disabled' } },
  },
  {
    label: 'C. v4-flash + thinking enabled',
    model: 'deepseek-v4-flash',
    thinking: true,
    body_extra: {},
  },
  {
    label: 'D. v4-flash + thinking disabled',
    model: 'deepseek-v4-flash',
    thinking: false,
    body_extra: { thinking: { type: 'disabled' } },
  },
]

interface Result {
  config_label: string
  model: string
  thinking: boolean
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

async function runOne(cfg: Config, qIdx: number, apiKey: string): Promise<Result> {
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

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '<unable to read body>')
    return {
      config_label: cfg.label,
      model: cfg.model,
      thinking: cfg.thinking,
      question_idx: qIdx,
      http_status: res.status,
      ok: false,
      error_body: errBody.slice(0, 800),
      chunks: 0,
      output_chars: 0,
      reasoning_chars: 0,
      reasoning_observed: false,
      content_observed: false,
      preview: '',
    }
  }
  if (!res.body) {
    return {
      config_label: cfg.label,
      model: cfg.model,
      thinking: cfg.thinking,
      question_idx: qIdx,
      http_status: res.status,
      ok: false,
      error_body: '<no response body>',
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
            choices?: Array<{
              delta?: { content?: string; reasoning_content?: string }
            }>
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
    config_label: cfg.label,
    model: cfg.model,
    thinking: cfg.thinking,
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

async function main() {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    console.error('ERROR: DEEPSEEK_API_KEY not in env')
    process.exit(1)
  }

  const results: Result[] = []
  for (const cfg of CONFIGS) {
    for (let q = 0; q < QUESTIONS.length; q++) {
      console.error(`>>> running ${cfg.label} Q${q + 1}...`)
      try {
        const r = await runOne(cfg, q, apiKey)
        results.push(r)
        console.error(
          `    http=${r.http_status} ok=${r.ok} first=${r.first_token_latency_ms ?? '-'}ms total=${r.total_latency_ms ?? '-'}ms chunks=${r.chunks} chars=${r.output_chars} reasoning=${r.reasoning_observed}`,
        )
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        console.error(`    THROW: ${msg}`)
        results.push({
          config_label: cfg.label,
          model: cfg.model,
          thinking: cfg.thinking,
          question_idx: q,
          http_status: 0,
          ok: false,
          error_body: msg.slice(0, 400),
          chunks: 0,
          output_chars: 0,
          reasoning_chars: 0,
          reasoning_observed: false,
          content_observed: false,
          preview: '',
        })
      }
    }
  }

  // Aggregate per-config
  console.log('\n========== AGGREGATE PER CONFIG ==========\n')
  for (const cfg of CONFIGS) {
    const rs = results.filter(r => r.config_label === cfg.label)
    const okRs = rs.filter(r => r.ok)
    const avgFirst =
      okRs.length > 0
        ? Math.round(okRs.reduce((s, r) => s + (r.first_token_latency_ms ?? 0), 0) / okRs.length)
        : null
    const avgTotal =
      okRs.length > 0
        ? Math.round(okRs.reduce((s, r) => s + (r.total_latency_ms ?? 0), 0) / okRs.length)
        : null
    const avgChunks =
      okRs.length > 0 ? Math.round(okRs.reduce((s, r) => s + r.chunks, 0) / okRs.length) : null
    const avgChars =
      okRs.length > 0 ? Math.round(okRs.reduce((s, r) => s + r.output_chars, 0) / okRs.length) : null
    const reasoningSeen = rs.some(r => r.reasoning_observed)

    console.log(`### ${cfg.label}`)
    console.log(`  ok: ${okRs.length}/${rs.length}`)
    console.log(`  avg first_token_ms: ${avgFirst}`)
    console.log(`  avg total_ms: ${avgTotal}`)
    console.log(`  avg chunks: ${avgChunks}`)
    console.log(`  avg output_chars: ${avgChars}`)
    console.log(`  reasoning_content seen: ${reasoningSeen}`)
    for (const r of rs) {
      if (!r.ok) {
        console.log(`  Q${r.question_idx + 1} FAIL http=${r.http_status} body=${r.error_body}`)
      } else {
        console.log(
          `  Q${r.question_idx + 1} OK first=${r.first_token_latency_ms}ms total=${r.total_latency_ms}ms chunks=${r.chunks} chars=${r.output_chars} preview="${r.preview.replace(/\n/g, ' ').slice(0, 100)}..."`,
        )
      }
    }
    console.log('')
  }

  // Full JSON dump for archival
  console.log('========== FULL JSON ==========')
  console.log(JSON.stringify(results, null, 2))
}

main().catch(e => {
  console.error('FATAL:', e)
  process.exit(1)
})
