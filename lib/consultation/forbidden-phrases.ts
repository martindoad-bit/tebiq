// 1.0 Alpha — Forbidden-phrase runtime filter (Issue #39 §G).
//
// 7 categories of promise-language MUST NOT appear in any rendered
// streaming output. The system prompt instructs the LLM not to produce
// them, but LLMs occasionally regress; this is a runtime guard.
//
// Streaming algorithm (correct against straddle-boundary):
//   1. Buffer accumulates incoming chunks.
//   2. On every push, run replace() on the FULL buffer (catches phrases
//      straddling old-buffer + new-chunk boundary).
//   3. Hold the last (MAX_PHRASE_LEN - 1) chars of the redacted buffer
//      because they MIGHT be the prefix of a phrase whose tail hasn't
//      arrived yet.
//   4. Emit everything before the hold.
// Reference: redactForbiddenPhrases() unit tests pin the
// straddle-boundary edge cases (3c / 3g / 3i in test-consultation.ts).

export const FORBIDDEN_PHRASES: ReadonlyArray<string> = Object.freeze([
  '一定可以',
  '没问题',
  '不会影响',
  '保证',
  '必ず',
  '絶対',
  '100%',
])

const MAX_PHRASE_LEN = FORBIDDEN_PHRASES.reduce((m, p) => Math.max(m, p.length), 0)
const HOLD_LEN = Math.max(0, MAX_PHRASE_LEN - 1)

export interface ForbiddenFilter {
  push(chunk: string): string
  flush(): string
  /** Phrases redacted so far (one entry per occurrence; duplicates kept). */
  redactions(): ReadonlyArray<string>
}

export function createForbiddenFilter(): ForbiddenFilter {
  let buffer = ''
  const redactions: string[] = []

  function applyReplace(s: string): string {
    if (!s) return s
    let out = s
    for (const phrase of FORBIDDEN_PHRASES) {
      if (out.includes(phrase)) {
        let idx = 0
        while ((idx = out.indexOf(phrase, idx)) !== -1) {
          redactions.push(phrase)
          idx += phrase.length
        }
        out = out.split(phrase).join('')
      }
    }
    return out
  }

  return {
    push(chunk: string): string {
      if (!chunk) return ''
      buffer += chunk
      // Always redact the FULL buffer so phrases straddling old-buffer +
      // new-chunk boundary get caught.
      const redacted = applyReplace(buffer)
      if (redacted.length <= HOLD_LEN) {
        buffer = redacted
        return ''
      }
      const emit = redacted.slice(0, redacted.length - HOLD_LEN)
      buffer = redacted.slice(redacted.length - HOLD_LEN)
      return emit
    },
    flush(): string {
      // No more chunks — the held tail is final. One last redaction in
      // case the tail itself is or contains a forbidden phrase fragment
      // that completed in this pass (shouldn't, but defensive).
      const tail = applyReplace(buffer)
      buffer = ''
      return tail
    },
    redactions(): ReadonlyArray<string> {
      return redactions.slice()
    },
  }
}

/**
 * Convenience for non-streaming inputs (e.g. final-text post-validation).
 * Same redaction rules as the streaming filter.
 */
export function redactForbiddenPhrases(text: string): {
  text: string
  redactions: ReadonlyArray<string>
} {
  const f = createForbiddenFilter()
  const out = f.push(text) + f.flush()
  return { text: out, redactions: f.redactions() }
}
