/**
 * smoke-production-answer.ts
 *
 * Posts five redline questions to the current production consultation stream
 * and checks that the visible answer keeps the expected domain anchors. This
 * script intentionally uses `/api/consultation/stream`; the legacy
 * `/api/questions` endpoint may return 410 on current deployments.
 *
 * Usage:
 *   PRODUCTION_URL=https://tebiq.jp npx tsx scripts/test/smoke-production-answer.ts
 */
import { parseConsultationChunk, type ConsultationEvent } from '@/lib/consultation/stream-protocol'

const BASE = process.env.PRODUCTION_URL ?? 'https://tebiq.jp'

interface Redline {
  id: string
  query: string
  reject?: RegExp
  required?: RegExp[]
}

const REDLINES: Redline[] = [
  {
    id: 'R1-management-to-humanities',
    query: '我是经管签，想转人文签。',
    reject: /(从.*技人国.*转.*经营管理|人文.*转.*经管|经营管理新规|资本金不足)/,
    required: [/(经营管理|経営管理|经管)/, /(技人国|人文|工作签|技術人文)/],
  },
  {
    id: 'R2-humanities-to-management',
    query: '我想从人文签转为经管签怎么办？',
    reject: /(从.*经营管理.*转.*人文|经营管理.*转.*技人国|换工作.*届出|14日)/,
    required: [/(经营管理|経営管理|经管)/, /(技人国|人文|工作签|技術人文)/],
  },
  {
    id: 'R3-company-dormant-pension',
    query: '公司休眠了要不要交国民年金？',
    reject: /(交不起|想申请免除|想申請免除|学生納付特例)/,
    required: [/(厚生年金|資格喪失|资格丧失|退职|退職|公司休眠)/, /(国民年金|国民健康保険|区役所|市役所|年金事务所|年金事務所)/],
  },
  {
    id: 'R4-tokutei-company-change',
    query: '特定技能1号换会社需要做什么？',
    reject: /(技能実習.*特定技能.*转换|技能实习.*特定技能|良好修了|試験免除|试验免除)/,
    required: [/特定技能/, /(雇主|雇用主|受入機関|换会社|換雇主|契約機関|新公司|新会社)/],
  },
  {
    id: 'R5-family-work-permission',
    query: '家族滞在配偶可以打工吗？',
    reject: /(滞納|公的義務|年金.*健保.*介護保険|住民税|国民年金.*免除)/,
    required: [/(家族滞在|配偶|资格外活动|资格外活動|週28|28小时|28時間)/],
  },
]

interface Outcome {
  id: string
  query: string
  http: number
  status: string
  answerChars: number
  ok: boolean
  notes: string
}

async function runOne(item: Redline): Promise<Outcome> {
  const result = await callConsultationStream(item.query)
  const problems: string[] = []

  if (result.http !== 200) problems.push(`http_${result.http}`)
  if (result.status !== 'completed') problems.push(`status_${result.status}`)
  if (result.answerText.trim().length < 120) problems.push(`answer_too_short_${result.answerText.trim().length}`)
  if (item.reject?.test(result.answerText)) problems.push(`reject:${item.reject.source}`)
  for (const req of item.required ?? []) {
    if (!req.test(result.answerText)) problems.push(`missing:${req.source}`)
  }

  return {
    id: item.id,
    query: item.query,
    http: result.http,
    status: result.status,
    answerChars: result.answerText.length,
    ok: problems.length === 0,
    notes: problems.length === 0 ? 'ok' : problems.join('; '),
  }
}

async function callConsultationStream(question: string): Promise<{
  http: number
  status: string
  answerText: string
}> {
  const res = await fetch(`${BASE}/api/consultation/stream`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ question }),
  })
  if (!res.body) {
    const text = await res.text().catch(() => '')
    return { http: res.status, status: `no_body:${text.slice(0, 80)}`, answerText: '' }
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let answerText = ''
  let terminal: ConsultationEvent['event'] | null = null

  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const parsed = parseConsultationChunk(buffer)
    buffer = parsed.remainder
    for (const event of parsed.events) {
      if (event.event === 'answer_chunk') answerText += event.chunk
      if (event.event === 'completed' || event.event === 'timeout' || event.event === 'failed') {
        terminal = event.event
      }
    }
  }
  buffer += decoder.decode()
  const parsed = parseConsultationChunk(buffer)
  for (const event of parsed.events) {
    if (event.event === 'answer_chunk') answerText += event.chunk
    if (event.event === 'completed' || event.event === 'timeout' || event.event === 'failed') {
      terminal = event.event
    }
  }

  return {
    http: res.status,
    status: terminal ?? (res.ok ? 'missing_terminal_event' : 'http_error'),
    answerText,
  }
}

async function runSmoke(): Promise<void> {
  console.log(`[smoke-production-answer] base=${BASE}`)
  try {
    const res = await fetch(`${BASE}/api/build-info`)
    if (res.ok) {
      const info = await res.json()
      console.log(`[smoke-production-answer] build-info: ${JSON.stringify(info)}`)
    } else {
      console.log(`[smoke-production-answer] build-info HTTP ${res.status}`)
    }
  } catch {
    console.log('[smoke-production-answer] build-info fetch failed')
  }

  const outcomes: Outcome[] = []
  for (const redline of REDLINES) {
    process.stdout.write(`  ${redline.id} ${redline.query} ... `)
    const out = await runOne(redline)
    outcomes.push(out)
    console.log(out.ok ? `PASS (${out.answerChars} chars)` : `FAIL ${out.notes}`)
  }

  console.log('\n=== 5 条红线汇总 ===')
  console.table(outcomes.map(out => ({
    id: out.id,
    http: out.http,
    status: out.status,
    chars: out.answerChars,
    ok: out.ok,
    notes: out.notes.slice(0, 90),
  })))

  const failed = outcomes.filter(out => !out.ok)
  console.log(`\n${outcomes.length - failed.length}/${outcomes.length} passed`)
  if (failed.length > 0) {
    console.log('FAILED:')
    for (const item of failed) console.log(`  ${item.id} - ${item.notes}`)
    process.exit(1)
  }
}

runSmoke().catch(err => {
  console.error(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
