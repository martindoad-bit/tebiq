/**
 * TEBIQ Fact Layer QA Runner
 * 0.6 Sprint Workstream C — Fact Layer QA framework
 *
 * Activation condition (do NOT run until both hold):
 *   1. FACT_LAYER_ENABLED=true in production env
 *   2. At least one card with status='ai_verified' is deployed
 *
 * Usage (once activated):
 *   npx ts-node --project tsconfig.scripts.json scripts/qa/fact-layer-qa-runner.ts \
 *     --card <card_id> \
 *     [--prod | --base-url https://tebiq.jp]
 *
 * What it does:
 *   - Reads qa_cases for a given card_id from docs/fact-cards/<card_id>.md
 *     (or from a JSON fixture if present in scripts/qa/fixtures/<card_id>.json)
 *   - For each case: streams a consultation, checks that the SSE response
 *     includes the expected fact_card_id in the `fact_cards_injected` event,
 *     checks must_not_have, checks voice constraints
 *   - Outputs a per-card verdict: PASS / PARTIAL / FAIL
 *   - Rate limit: ≤5 cases per card, ≤30 cases per week (Charter §B.3)
 *
 * NOT intended for:
 *   - CI/CD automation (runs manually, QA window only)
 *   - Multi-card batch sweeps without GM sign-off
 *   - Production load testing (use scripts/bench/ for that)
 */

import * as fs from 'fs'
import * as path from 'path'
import * as http from 'http'
import * as https from 'https'
import * as readline from 'readline'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface QaCase {
  id: string
  question: string
  /** Fact card IDs expected to appear in the SSE `fact_cards_injected` event. */
  expected_card_ids: string[]
  /** Phrases that must appear in the answer (domain assertions). */
  must_include?: string[]
  /** Phrases that must NOT appear (extends global MUST_NOT_HAVE). */
  must_exclude?: string[]
  /** Informational note for the QA log. */
  note?: string
}

interface StreamResult {
  consultationId: string | null
  firstTokenMs: number | null
  totalMs: number
  outputChars: number
  status: string
  factCardIds: string[]
  answer: string
  promptVersion: string
  model: string
}

interface CaseResult {
  caseId: string
  question: string
  expectedCardIds: string[]
  got: StreamResult
  factCardMatch: boolean
  mustIncludePass: boolean
  mustExcludePass: boolean
  violations: string[]
  verdict: 'PASS' | 'PARTIAL' | 'FAIL'
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MUST_NOT_HAVE: ReadonlyArray<string> = [
  '一定可以', '没问题', '不会影响', '保证',
  '大丈夫', '应该没问题', '必ず', '絶対', '100%',
]

const DEFAULT_BASE_URL = 'https://tebiq.jp'
const STREAM_TIMEOUT_MS = 130_000
const MAX_CASES_PER_CARD = 5

// ---------------------------------------------------------------------------
// SSE stream helper
// ---------------------------------------------------------------------------

function streamConsultation(
  baseUrl: string,
  question: string,
  imageSummary?: string,
): Promise<StreamResult> {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      question,
      ...(imageSummary ? { image_summary: imageSummary } : {}),
    })

    const url = new URL('/api/consultation/stream', baseUrl)
    const isHttps = url.protocol === 'https:'
    const options: http.RequestOptions | https.RequestOptions = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }

    const tStart = Date.now()
    let tFirstToken: number | null = null
    let consultationId: string | null = null
    let status = 'unknown'
    let factCardIds: string[] = []
    let promptVersion = 'N/A'
    let model = 'N/A'
    const chunks: string[] = []

    const timer = setTimeout(() => {
      req.destroy()
      resolve({
        consultationId,
        firstTokenMs: tFirstToken,
        totalMs: Date.now() - tStart,
        outputChars: chunks.join('').length,
        status: 'runner_timeout',
        factCardIds,
        answer: chunks.join(''),
        promptVersion,
        model,
      })
    }, STREAM_TIMEOUT_MS)

    const client = isHttps ? https : http
    const req = client.request(options, (res) => {
      promptVersion = res.headers['x-tebiq-prompt-version'] as string ?? 'N/A'
      model = res.headers['x-tebiq-model'] as string ?? 'N/A'

      const rl = readline.createInterface({ input: res })
      rl.on('line', (line) => {
        if (!line.startsWith('data:')) return
        const raw = line.slice(5).trim()
        try {
          const ev = JSON.parse(raw)
          switch (ev.event) {
            case 'received':
              consultationId = ev.consultation_id ?? null
              break
            case 'first_token':
              tFirstToken = Date.now() - tStart
              break
            case 'answer_chunk':
              chunks.push(ev.chunk ?? '')
              break
            case 'fact_cards_injected':
              // Expected SSE event once FACT_LAYER_ENABLED=true.
              // Current format: { event: 'fact_cards_injected', items: [{ fact_id, ...audit }] }.
              factCardIds = Array.isArray(ev.items)
                ? ev.items
                    .map((item: { fact_id?: unknown }) => item.fact_id)
                    .filter((id: unknown): id is string => typeof id === 'string')
                : []
              break
            case 'completed':
            case 'timeout':
            case 'partial':
            case 'failed':
              status = ev.event
              clearTimeout(timer)
              rl.close()
              break
          }
        } catch {
          // unparseable line — skip
        }
      })

      rl.on('close', () => {
        clearTimeout(timer)
        resolve({
          consultationId,
          firstTokenMs: tFirstToken,
          totalMs: Date.now() - tStart,
          outputChars: chunks.join('').length,
          status,
          factCardIds,
          answer: chunks.join(''),
          promptVersion,
          model,
        })
      })
    })

    req.on('error', (err) => {
      clearTimeout(timer)
      resolve({
        consultationId,
        firstTokenMs: tFirstToken,
        totalMs: Date.now() - tStart,
        outputChars: 0,
        status: `network_error:${err.message}`,
        factCardIds,
        answer: '',
        promptVersion,
        model,
      })
    })

    req.write(body)
    req.end()
  })
}

// ---------------------------------------------------------------------------
// Case evaluation
// ---------------------------------------------------------------------------

function evaluateCase(qaCase: QaCase, got: StreamResult): CaseResult {
  const globalViolations = MUST_NOT_HAVE.filter((p) => got.answer.includes(p))
  const localViolations = (qaCase.must_exclude ?? []).filter((p) => got.answer.includes(p))
  const violations = [...globalViolations, ...localViolations]

  const mustIncludePass = (qaCase.must_include ?? []).every((p) => got.answer.includes(p))

  const factCardMatch =
    qaCase.expected_card_ids.length === 0
      ? true // no expected cards (FACT_LAYER_ENABLED=false baseline)
      : qaCase.expected_card_ids.every((id) => got.factCardIds.includes(id))

  const mustExcludePass = violations.length === 0

  let verdict: 'PASS' | 'PARTIAL' | 'FAIL'
  if (!mustExcludePass) {
    verdict = 'FAIL' // P0 — must_not_have violation
  } else if (!factCardMatch || !mustIncludePass) {
    verdict = 'PARTIAL'
  } else {
    verdict = 'PASS'
  }

  return {
    caseId: qaCase.id,
    question: qaCase.question,
    expectedCardIds: qaCase.expected_card_ids,
    got,
    factCardMatch,
    mustIncludePass,
    mustExcludePass,
    violations,
    verdict,
  }
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

function printResult(r: CaseResult): void {
  const icon = r.verdict === 'PASS' ? '✅' : r.verdict === 'PARTIAL' ? '⚠️' : '❌'
  console.log(`\n${icon} [${r.caseId}] ${r.verdict}`)
  console.log(`   Q: ${r.question.slice(0, 80)}`)
  console.log(`   consultation_id:  ${r.got.consultationId ?? 'N/A'}`)
  console.log(`   first_token_ms:   ${r.got.firstTokenMs ?? 'N/A'}`)
  console.log(`   total_ms:         ${r.got.totalMs}`)
  console.log(`   output_chars:     ${r.got.outputChars}`)
  console.log(`   status:           ${r.got.status}`)
  console.log(`   prompt_version:   ${r.got.promptVersion}`)
  console.log(`   model:            ${r.got.model}`)
  console.log(`   expected_cards:   ${JSON.stringify(r.expectedCardIds)}`)
  console.log(`   got_cards:        ${JSON.stringify(r.got.factCardIds)}`)
  console.log(`   fact_card_match:  ${r.factCardMatch ? '✅' : '❌'}`)
  console.log(`   must_include:     ${r.mustIncludePass ? '✅' : '❌'}`)
  console.log(`   must_not_have:    ${r.mustExcludePass ? 'CLEAN ✅' : '❌ VIOLATION: ' + r.violations.join(', ')}`)
}

function printSummary(cardId: string, results: CaseResult[]): void {
  const pass = results.filter((r) => r.verdict === 'PASS').length
  const partial = results.filter((r) => r.verdict === 'PARTIAL').length
  const fail = results.filter((r) => r.verdict === 'FAIL').length

  console.log('\n' + '='.repeat(60))
  console.log(`CARD: ${cardId}`)
  console.log(`VERDICT: ${fail > 0 ? 'FAIL (P0)' : partial > 0 ? 'PARTIAL' : 'PASS'}`)
  console.log(`Results: ${pass} PASS / ${partial} PARTIAL / ${fail} FAIL of ${results.length} cases`)
  console.log('='.repeat(60))

  if (fail > 0) {
    console.log('\nP0 — must_not_have violations found. Stop and notify GM.')
  }
  if (partial > 0) {
    console.log('\nP1 candidates:')
    results.filter((r) => r.verdict === 'PARTIAL').forEach((r) => {
      if (!r.factCardMatch) console.log(`  [${r.caseId}] fact_card_ids mismatch — expected ${r.expectedCardIds.join(',')} got ${r.got.factCardIds.join(',')}`)
      if (!r.mustIncludePass) console.log(`  [${r.caseId}] must_include phrases absent`)
    })
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const cardIdx = args.indexOf('--card')
  const baseUrlIdx = args.indexOf('--base-url')
  const isProd = args.includes('--prod')

  const cardId = cardIdx >= 0 ? args[cardIdx + 1] : null
  const baseUrl = isProd
    ? DEFAULT_BASE_URL
    : baseUrlIdx >= 0
      ? args[baseUrlIdx + 1]
      : DEFAULT_BASE_URL

  if (!cardId) {
    console.error('Usage: fact-layer-qa-runner.ts --card <card_id> [--prod | --base-url <url>]')
    console.error('')
    console.error('Activation condition: FACT_LAYER_ENABLED=true + at least one ai_verified card deployed.')
    console.error('Do NOT run in FACT_LAYER_ENABLED=false period (fact_card_ids will always be empty).')
    process.exit(1)
  }

  // Load qa_cases from fixture file
  const fixturePath = path.join(__dirname, 'fixtures', `${cardId}.json`)
  if (!fs.existsSync(fixturePath)) {
    console.error(`No fixture found at ${fixturePath}`)
    console.error('Create scripts/qa/fixtures/<card_id>.json with qa_cases array before running.')
    process.exit(1)
  }

  const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf-8')) as { qa_cases: QaCase[] }
  const qaCases = fixture.qa_cases.slice(0, MAX_CASES_PER_CARD)

  console.log(`\n=== TEBIQ Fact Layer QA Runner ===`)
  console.log(`Card:     ${cardId}`)
  console.log(`Base URL: ${baseUrl}`)
  console.log(`Cases:    ${qaCases.length} (max ${MAX_CASES_PER_CARD})`)
  console.log(`Time:     ${new Date().toISOString()}`)
  console.log('')

  const results: CaseResult[] = []
  for (const qaCase of qaCases) {
    console.log(`Running [${qaCase.id}]...`)
    const got = await streamConsultation(baseUrl, qaCase.question)
    const result = evaluateCase(qaCase, got)
    results.push(result)
    printResult(result)

    // Stop immediately on P0
    if (result.violations.length > 0) {
      console.log('\n🛑 P0 violation found. Stopping run. Notify GM.')
      break
    }
  }

  printSummary(cardId, results)
}

main().catch((err) => {
  console.error('Runner error:', err)
  process.exit(1)
})
