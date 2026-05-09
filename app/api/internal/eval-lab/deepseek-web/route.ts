import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { getEvalQuestionById, upsertEvalAnswer } from '@/lib/db/queries/eval-lab'

// POST /api/internal/eval-lab/deepseek-web
//
// Internal Cycle-1 baseline: "DeepSeek connected/web" approximation.
// DeepSeek's public API does not expose the consumer-web "Internet Search"
// toggle as a stable chat-completions parameter. For the quality flywheel we
// make that baseline explicit: fetch search snippets, then ask
// deepseek-reasoner to answer using those snippets. This gives the founder a
// third comparison column without pretending the API has a native web_search
// switch.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 120

const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'
const MODEL_ID = 'deepseek-reasoner'
const PROMPT_VERSION = 'eval-lab-web-v1'
const SEARCH_TIMEOUT_MS = 12_000
const DEEPSEEK_TIMEOUT_MS = 90_000
const MAX_TOKENS = 2400

interface ReqBody {
  question?: string
  question_id?: string
}

interface SearchResult {
  title: string
  url: string
  snippet: string
}

export async function POST(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  let body: ReqBody
  try {
    body = (await req.json()) as ReqBody
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
  const question = (body.question ?? '').trim()
  if (!question) {
    return NextResponse.json({ error: 'missing_question' }, { status: 400 })
  }
  if (question.length > 4000) {
    return NextResponse.json({ error: 'question_too_long' }, { status: 400 })
  }
  const questionId = body.question_id?.trim() || null
  if (questionId) {
    const exists = await getEvalQuestionById(questionId)
    if (!exists) {
      return NextResponse.json(
        { error: 'unknown_question_id', question_id: questionId },
        { status: 400 },
      )
    }
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'deepseek_disabled', detail: 'DEEPSEEK_API_KEY not set' }, { status: 503 })
  }

  const startedAt = Date.now()
  let searchResults: SearchResult[] = []
  try {
    searchResults = await searchWeb(question)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/deepseek-web] search failed', message)
  }

  try {
    const text = await callDeepseekReasoner(question, searchResults, apiKey)
    const latencyMs = Date.now() - startedAt
    if (questionId) {
      await upsertEvalAnswer({
        questionId,
        answerType: 'deepseek_web',
        model: MODEL_ID,
        promptVersion: PROMPT_VERSION,
        answerText: text,
        latencyMs,
        error: null,
        rawPayloadJson: {
          search_provider: 'duckduckgo_html',
          search_results: searchResults,
          search_result_count: searchResults.length,
          timeout_ms: DEEPSEEK_TIMEOUT_MS,
        },
      })
    }
    return NextResponse.json({
      ok: true,
      text,
      search_results: searchResults,
      latency_ms: latencyMs,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/deepseek-web] failed', message)
    if (questionId) {
      try {
        await upsertEvalAnswer({
          questionId,
          answerType: 'deepseek_web',
          model: MODEL_ID,
          promptVersion: PROMPT_VERSION,
          answerText: null,
          error: classifyError(err),
          latencyMs: Date.now() - startedAt,
          rawPayloadJson: {
            search_provider: 'duckduckgo_html',
            search_results: searchResults,
            search_result_count: searchResults.length,
            detail: message.slice(0, 500),
          },
        })
      } catch (persistErr) {
        const persistMsg = persistErr instanceof Error ? persistErr.message : String(persistErr)
        console.warn('[eval-lab/deepseek-web] persist failed', persistMsg)
      }
    }
    return NextResponse.json(
      { error: 'deepseek_web_failed', detail: message },
      { status: 500 },
    )
  }
}

async function searchWeb(question: string): Promise<SearchResult[]> {
  const query = `${question} 入管 在留 出入国在留管理庁 最新`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), SEARCH_TIMEOUT_MS)
  try {
    const res = await fetch(`https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; TEBIQ-EvalLab/1.0)',
      },
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`search_http_${res.status}`)
    const html = await res.text()
    return parseDuckDuckGo(html).slice(0, 6)
  } finally {
    clearTimeout(timer)
  }
}

function parseDuckDuckGo(html: string): SearchResult[] {
  const out: SearchResult[] = []
  const re = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g
  let match: RegExpExecArray | null
  while ((match = re.exec(html)) && out.length < 8) {
    const url = normalizeDuckUrl(decodeHtml(stripTags(match[1])))
    const title = decodeHtml(stripTags(match[2])).trim()
    const snippet = decodeHtml(stripTags(match[3])).trim()
    if (!url || !title) continue
    out.push({ title, url, snippet })
  }
  return out
}

function normalizeDuckUrl(raw: string): string {
  if (raw.startsWith('//duckduckgo.com/l/?')) {
    const url = new URL('https:' + raw)
    return url.searchParams.get('uddg') ?? raw
  }
  if (raw.startsWith('/l/?')) {
    const url = new URL('https://duckduckgo.com' + raw)
    return url.searchParams.get('uddg') ?? raw
  }
  return raw
}

function stripTags(value: string): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

async function callDeepseekReasoner(
  question: string,
  searchResults: SearchResult[],
  apiKey: string,
): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), DEEPSEEK_TIMEOUT_MS)
  try {
    const res = await fetch(DEEPSEEK_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_ID,
        max_tokens: MAX_TOKENS,
        messages: [
          {
            role: 'system',
            content: [
              '你是熟悉日本在留资格与入管手续的中文回答助手。',
              '你正在作为 TEBIQ 的外部对照 baseline 回答，不使用 TEBIQ 内部事实卡。',
              '必须用中文回答，清楚、克制、实用。',
              '只能把搜索结果当作参考线索；不要承诺申请一定通过或不通过。',
              '如果搜索结果不足，明确说明仍需以入管/行政书士确认。',
            ].join('\n'),
          },
          {
            role: 'user',
            content: buildWebUserPrompt(question, searchResults),
          },
        ],
      }),
      signal: controller.signal,
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(`deepseek_http_${res.status}: ${body.slice(0, 300)}`)
    }
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const text = json.choices?.[0]?.message?.content?.trim() ?? ''
    if (!text) throw new Error('deepseek_empty')
    return text
  } finally {
    clearTimeout(timer)
  }
}

function buildWebUserPrompt(question: string, searchResults: SearchResult[]): string {
  const lines: string[] = []
  lines.push('用户问题：')
  lines.push(question)
  lines.push('')
  lines.push('搜索结果（标题 / URL / 摘要）：')
  if (searchResults.length === 0) {
    lines.push('- 未取得搜索结果。')
  } else {
    searchResults.forEach((r, i) => {
      lines.push(`${i + 1}. ${r.title}`)
      lines.push(`   URL: ${r.url}`)
      if (r.snippet) lines.push(`   摘要: ${r.snippet}`)
    })
  }
  lines.push('')
  lines.push('请回答：')
  lines.push('- 先直接回答用户这个在留问题。')
  lines.push('- 指出现在最该确认的风险点。')
  lines.push('- 给 2-4 个下一步动作。')
  lines.push('- 如果引用搜索结果，请自然写“根据入管/公开资料线索”，不要堆链接。')
  return lines.join('\n')
}

function classifyError(err: unknown): string {
  if ((err as { name?: string })?.name === 'AbortError') return 'deepseek_web_timeout'
  const message = err instanceof Error ? err.message : String(err)
  if (/deepseek_empty/.test(message)) return 'deepseek_web_empty'
  if (/deepseek_http_(\d+)/.test(message)) return message.match(/deepseek_http_\d+/)?.[0] ?? 'deepseek_web_http'
  return 'deepseek_web_exception'
}
