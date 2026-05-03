import type { AnswerSource, DetectedIntent, FallbackReason, SupportedDomain } from './types'
import {
  DEEPSEEK_CONFIDENCE_VALUES,
  DEEPSEEK_DOMAIN_VALUES,
  DEEPSEEK_ENDPOINT,
  DEEPSEEK_MAX_TOKENS,
  DEEPSEEK_MODEL_ID,
  DEEPSEEK_RESPONSE_FORMAT,
  DEEPSEEK_STATUS_VALUES,
  DEEPSEEK_SYSTEM_PROMPT,
  DEEPSEEK_TEMPERATURE,
  DEEPSEEK_TIMEOUT_MS,
  buildUserMessage,
  deepseekOutputToAnswerSource,
  type DeepseekConfidence,
  type DeepseekStatus,
  type DeepseekValidatedOutput,
} from './deepseek-prompt'

// TEBIQ V1.1 — DeepSeek Answer Provider.
//
// Returns an AnswerSource with kind='llm_primary' on success, or
// kind='none' (with skip_reason) on any failure mode. NEVER throws —
// the orchestrator (intake.ts) reads kind/skip_reason and continues
// down the V1 fallback chain (legacy_seed → safe clarification).
//
// Failure modes (all map to FallbackReason values; all internal-only):
//   - llm_disabled    : no DEEPSEEK_API_KEY in env
//   - llm_timeout     : 18s abort
//   - llm_parse       : JSON parse failed
//   - llm_validation  : JSON parsed but schema check failed
//   - llm_exception   : network / 5xx / unexpected
//
// The provider is deliberately stateless. No retries — failure ⇒
// downstream fallback. This keeps the request budget tight and the
// failure surface monitorable via fallback_reason.

export interface ProvideLlmDeepseekInput {
  questionText: string
  visaType: string | null
  detectedDomain: SupportedDomain
  detectedIntent: DetectedIntent
  candidateSeedSnippet?: string | null
  redlines?: string[]
  // Test-only override — when provided, the provider does NOT call
  // the network and uses this raw JSON string instead. Used by
  // scripts/test/test-deepseek-mock.ts to exercise parse / validate /
  // map paths without network access.
  __mockRawResponse?: string
  __mockShouldThrow?: 'timeout' | 'exception'
}

export async function provideLlmDeepseekSource(
  input: ProvideLlmDeepseekInput,
): Promise<AnswerSource> {
  if (process.env.ANSWER_GENERATION_DISABLE_AI === '1') {
    return skipped('llm_disabled')
  }

  // Mocked path (tests only)
  if (input.__mockShouldThrow === 'timeout') return skipped('llm_timeout')
  if (input.__mockShouldThrow === 'exception') return skipped('llm_exception')

  let rawJsonText: string
  if (input.__mockRawResponse !== undefined) {
    rawJsonText = input.__mockRawResponse
  } else {
    if (!process.env.DEEPSEEK_API_KEY) return skipped('llm_disabled')
    const fetched = await callDeepseek(input)
    if (!fetched.ok) return skipped(fetched.reason)
    rawJsonText = fetched.text
  }

  const parsed = safeParse(rawJsonText)
  if (!parsed.ok) return skipped('llm_parse')

  const validated = validateOutput(parsed.value)
  if (!validated.ok) return skipped('llm_validation')

  return deepseekOutputToAnswerSource(validated.value)
}

// ---------------------------------------------------------------- network

interface FetchOK { ok: true; text: string }
interface FetchErr { ok: false; reason: FallbackReason }

async function callDeepseek(input: ProvideLlmDeepseekInput): Promise<FetchOK | FetchErr> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), DEEPSEEK_TIMEOUT_MS)
  try {
    const res = await fetch(DEEPSEEK_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL_ID,
        temperature: DEEPSEEK_TEMPERATURE,
        max_tokens: DEEPSEEK_MAX_TOKENS,
        response_format: DEEPSEEK_RESPONSE_FORMAT,
        messages: [
          { role: 'system', content: DEEPSEEK_SYSTEM_PROMPT },
          {
            role: 'user',
            content: buildUserMessage({
              questionText: input.questionText,
              visaType: input.visaType,
              detectedDomain: input.detectedDomain,
              detectedIntent: input.detectedIntent,
              candidateSeedSnippet: input.candidateSeedSnippet,
              redlines: input.redlines ?? [],
            }),
          },
        ],
      }),
      signal: controller.signal,
    })
    if (!res.ok) {
      console.warn('[llm-deepseek] HTTP', res.status)
      return { ok: false, reason: 'llm_exception' }
    }
    const json = await res.json() as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const text = json.choices?.[0]?.message?.content?.trim()
    if (!text) {
      return { ok: false, reason: 'llm_parse' }
    }
    return { ok: true, text }
  } catch (err) {
    const isAbort = (err as { name?: string })?.name === 'AbortError'
    return { ok: false, reason: isAbort ? 'llm_timeout' : 'llm_exception' }
  } finally {
    clearTimeout(timer)
  }
}

// ---------------------------------------------------------------- parse + validate

interface ParseOK { ok: true; value: Record<string, unknown> }
interface ParseErr { ok: false }

function safeParse(text: string): ParseOK | ParseErr {
  // The DeepSeek `response_format: 'json_object'` should already give
  // us a single JSON object. We strip a defensive ```json ... ```
  // fence just in case the API surface ever changes.
  const trimmed = text.trim()
    .replace(/^```(?:json)?\s*\n?/i, '')
    .replace(/\n?```\s*$/i, '')
    .trim()
  if (!trimmed.startsWith('{')) return { ok: false }
  try {
    const parsed = JSON.parse(trimmed) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { ok: false }
    return { ok: true, value: parsed as Record<string, unknown> }
  } catch {
    return { ok: false }
  }
}

interface ValidateOK { ok: true; value: DeepseekValidatedOutput }
interface ValidateErr { ok: false }

function validateOutput(raw: Record<string, unknown>): ValidateOK | ValidateErr {
  const status = enumOf(raw.status, DEEPSEEK_STATUS_VALUES) as DeepseekStatus | null
  if (!status) return { ok: false }
  const domain = enumOf(raw.domain, DEEPSEEK_DOMAIN_VALUES) as SupportedDomain | null
  if (!domain) return { ok: false }
  const confidence = enumOf(raw.confidence, DEEPSEEK_CONFIDENCE_VALUES) as DeepseekConfidence | null
  if (!confidence) return { ok: false }

  return {
    ok: true,
    value: {
      status,
      domain,
      answer_paragraph: stringOf(raw.answer_paragraph) ?? '',
      true_focus_paragraph: stringOf(raw.true_focus_paragraph) ?? '',
      next_steps_paragraph: stringOf(raw.next_steps_paragraph) ?? '',
      next_steps_bullets: stringArrayOf(raw.next_steps_bullets),
      documents_needed: stringArrayOf(raw.documents_needed),
      consult_trigger: stringOf(raw.consult_trigger) ?? '',
      confidence,
      boundary_note: stringOf(raw.boundary_note) ?? '',
    },
  }
}

function enumOf(value: unknown, allowed: readonly string[]): string | null {
  if (typeof value !== 'string') return null
  return allowed.includes(value) ? value : null
}

function stringOf(value: unknown): string | null {
  return typeof value === 'string' ? value.trim() : null
}

function stringArrayOf(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((v): v is string => typeof v === 'string')
    .map(v => v.trim())
    .filter(v => v.length > 0)
}

// ---------------------------------------------------------------- helpers

function skipped(reason: FallbackReason): AnswerSource {
  return {
    kind: 'none',
    source_confidence: 'low',
    skip_reason: reason,
  }
}
