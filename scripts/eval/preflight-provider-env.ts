#!/usr/bin/env tsx
/**
 * TEBIQ 0.8 provider/eval preflight.
 *
 * This script checks the environment needed before running provider-backed
 * answer regression. It never prints secrets.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/eval/preflight-provider-env.ts
 *   npx tsx --env-file=.env.local scripts/eval/preflight-provider-env.ts --live
 *   npx tsx --env-file=.env.local scripts/eval/preflight-provider-env.ts --live --base-url=http://127.0.0.1:3000
 */

const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'
const MODEL_ID = 'deepseek-v4-pro'

interface Args {
  live: boolean
  baseUrl: string | null
  timeoutMs: number
}

interface Check {
  id: string
  ok: boolean
  detail: string
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    live: false,
    baseUrl: null,
    timeoutMs: 20_000,
  }

  for (const arg of argv) {
    if (arg === '--live') args.live = true
    else if (arg.startsWith('--base-url=')) args.baseUrl = arg.slice('--base-url='.length).replace(/\/$/, '')
    else if (arg.startsWith('--timeout-ms=')) {
      const n = Number(arg.slice('--timeout-ms='.length))
      if (Number.isFinite(n) && n >= 1000) args.timeoutMs = Math.trunc(n)
    }
  }
  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const checks: Check[] = []

  checks.push(envCheck('DATABASE_URL', Boolean(process.env.DATABASE_URL), 'required for Eval Lab question/answer persistence'))
  checks.push(envCheck('DEEPSEEK_API_KEY', Boolean(process.env.DEEPSEEK_API_KEY), 'required for provider-backed answer generation'))
  checks.push(envCheck('EVAL_LAB_ENABLED', process.env.EVAL_LAB_ENABLED === '1', "required as '1' for local Eval Lab routes"))

  if (args.baseUrl) {
    checks.push(await checkEvalLabRoute(args.baseUrl))
  }

  if (args.live) {
    checks.push(await checkDeepseekLive(args.timeoutMs))
  }

  for (const check of checks) {
    console.log(`${check.ok ? 'PASS' : 'FAIL'} ${check.id}: ${check.detail}`)
  }

  const failed = checks.filter(check => !check.ok)
  if (failed.length > 0) {
    console.log(`preflight_result=FAIL failed=${failed.map(check => check.id).join(',')}`)
    process.exit(1)
  }

  console.log('preflight_result=PASS')
}

function envCheck(id: string, ok: boolean, purpose: string): Check {
  return {
    id,
    ok,
    detail: ok ? `${purpose}; present` : `${purpose}; missing or invalid`,
  }
}

async function checkEvalLabRoute(baseUrl: string): Promise<Check> {
  try {
    const res = await fetch(`${baseUrl}/api/internal/eval-lab/state`, { method: 'GET' })
    if (res.status === 404) {
      return {
        id: 'EVAL_LAB_ROUTE',
        ok: false,
        detail: `HTTP 404 at ${baseUrl}; start server with EVAL_LAB_ENABLED=1`,
      }
    }
    return {
      id: 'EVAL_LAB_ROUTE',
      ok: res.ok,
      detail: `HTTP ${res.status} at ${baseUrl}`,
    }
  } catch (err) {
    return {
      id: 'EVAL_LAB_ROUTE',
      ok: false,
      detail: err instanceof Error ? err.message : String(err),
    }
  }
}

async function checkDeepseekLive(timeoutMs: number): Promise<Check> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return {
      id: 'DEEPSEEK_LIVE',
      ok: false,
      detail: 'skipped because DEEPSEEK_API_KEY is missing',
    }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const started = Date.now()
    const res = await fetch(DEEPSEEK_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_ID,
        temperature: 0,
        max_tokens: 24,
        messages: [
          { role: 'system', content: 'Return a short Chinese health-check sentence.' },
          { role: 'user', content: '请只回答：测试通过。' },
        ],
      }),
      signal: controller.signal,
    })
    const latency = Date.now() - started
    if (!res.ok) {
      return {
        id: 'DEEPSEEK_LIVE',
        ok: false,
        detail: `HTTP ${res.status}; latency_ms=${latency}`,
      }
    }
    const json = await res.json().catch(() => null) as {
      choices?: Array<{ message?: { content?: string } }>
    } | null
    const text = json?.choices?.[0]?.message?.content?.trim() ?? ''
    return {
      id: 'DEEPSEEK_LIVE',
      ok: text.length > 0,
      detail: `HTTP ${res.status}; latency_ms=${latency}; response_chars=${text.length}`,
    }
  } catch (err) {
    const name = (err as { name?: string }).name
    return {
      id: 'DEEPSEEK_LIVE',
      ok: false,
      detail: name === 'AbortError' ? `timeout after ${timeoutMs}ms` : err instanceof Error ? err.message : String(err),
    }
  } finally {
    clearTimeout(timer)
  }
}

void main().catch(err => {
  console.error(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
