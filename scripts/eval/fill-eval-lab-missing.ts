export {}

type AnswerType = 'deepseek_raw' | 'deepseek_web' | 'tebiq_current'

interface QuestionRow {
  id: string
  question_text: string
  starter_tag: string | null
}

interface AnswerRow {
  question_id: string
  answer_type: AnswerType
  answer_text: string | null
  error: string | null
  prompt_version: string | null
  engine_version: string | null
  status: string | null
  fallback_reason: string | null
}

interface StateResponse {
  ok: boolean
  questions: QuestionRow[]
  answers: AnswerRow[]
  error?: string
}

type TaskKind = 'deepseek' | 'tebiq'

interface Task {
  question: QuestionRow
  kind: TaskKind
  reason: 'missing' | 'failed' | 'stale' | 'too_short' | 'forced'
}

interface Args {
  baseUrl: string
  reviewer: string
  targetRate: number
  concurrency: number
  dryRun: boolean
  forceDeepseek: boolean
  forceTebiq: boolean
}

const DEFAULT_BASE_URL = 'https://tebiq.jp'
const MIN_DEEPSEEK_ANSWER_CHARS = 180
const MIN_TEBIQ_ANSWER_CHARS = 120
const CURRENT_TEBIQ_PROMPT_VERSION = 'consultation_alpha_v10'

function parseArgs(argv: string[]): Args {
  const out: Args = {
    baseUrl: DEFAULT_BASE_URL,
    reviewer: 'default',
    targetRate: 95,
    concurrency: 3,
    dryRun: false,
    forceDeepseek: false,
    forceTebiq: false,
  }
  for (const arg of argv) {
    if (arg === '--dry-run') out.dryRun = true
    else if (arg === '--force-deepseek') out.forceDeepseek = true
    else if (arg === '--force-tebiq') out.forceTebiq = true
    else if (arg.startsWith('--base-url=')) out.baseUrl = arg.slice('--base-url='.length).replace(/\/$/, '')
    else if (arg.startsWith('--reviewer=')) out.reviewer = arg.slice('--reviewer='.length)
    else if (arg.startsWith('--target-rate=')) out.targetRate = Number(arg.slice('--target-rate='.length))
    else if (arg.startsWith('--concurrency=')) out.concurrency = Number(arg.slice('--concurrency='.length))
  }
  if (!Number.isFinite(out.targetRate) || out.targetRate < 1 || out.targetRate > 100) {
    throw new Error(`invalid --target-rate=${out.targetRate}`)
  }
  if (!Number.isInteger(out.concurrency) || out.concurrency < 1 || out.concurrency > 5) {
    throw new Error(`invalid --concurrency=${out.concurrency}; use 1..5`)
  }
  return out
}

async function readState(args: Args): Promise<StateResponse> {
  const url = `${args.baseUrl}/api/internal/eval-lab/state?reviewer=${encodeURIComponent(args.reviewer)}`
  const res = await fetch(url, { cache: 'no-store' })
  const json = (await res.json()) as StateResponse
  if (!res.ok || !json.ok) {
    throw new Error(`state_failed ${res.status}: ${json.error ?? JSON.stringify(json).slice(0, 200)}`)
  }
  return json
}

function normalizeAnswers(answers: AnswerRow[]) {
  const out: Record<string, Partial<Record<AnswerType, AnswerRow>>> = {}
  for (const answer of answers) {
    const slot = out[answer.question_id] ?? {}
    slot[answer.answer_type] = answer
    out[answer.question_id] = slot
  }
  return out
}

function answerLength(row: AnswerRow | undefined): number {
  return row?.answer_text?.trim().length ?? 0
}

function isDeepseekSuccess(row: AnswerRow | undefined): boolean {
  return !!row?.answer_text && !row.error && answerLength(row) >= MIN_DEEPSEEK_ANSWER_CHARS
}

function isTebiqReal(row: AnswerRow | undefined): boolean {
  return !!row?.answer_text
    && !row.error
    && !row.fallback_reason
    && row.engine_version !== 'answer-core-v1.1-fallback'
    && row.prompt_version === CURRENT_TEBIQ_PROMPT_VERSION
    && row.status === 'completed'
    && answerLength(row) >= MIN_TEBIQ_ANSWER_CHARS
}

function summarize(state: StateResponse) {
  const answers = normalizeAnswers(state.answers)
  let complete = 0
  let deepseekOk = 0
  let tebiqOk = 0
  let tebiqReal = 0
  let failed = 0
  for (const question of state.questions) {
    const slot = answers[question.id]
    const ds = slot?.deepseek_raw
    const tebiq = slot?.tebiq_current
    const dsOk = isDeepseekSuccess(ds)
    const tebiqOkForQuestion = isTebiqReal(tebiq)
    if (dsOk) deepseekOk += 1
    if (!!tebiq?.answer_text && !tebiq.error) tebiqOk += 1
    if (tebiqOkForQuestion) tebiqReal += 1
    if (ds?.error || tebiq?.error || tebiq?.fallback_reason) failed += 1
    if (dsOk && tebiqOkForQuestion) complete += 1
  }
  const total = state.questions.length
  return {
    total,
    complete,
    rate: total === 0 ? 0 : Math.round((complete / total) * 100),
    deepseekOk,
    tebiqOk,
    tebiqReal,
    failed,
  }
}

function taskReason(kind: TaskKind, row: AnswerRow | undefined, force: boolean): Task['reason'] {
  if (force) return 'forced'
  if (!row || !row.answer_text) return row?.error ? 'failed' : 'missing'
  if (row.error || row.fallback_reason) return 'failed'
  if (kind === 'deepseek' && answerLength(row) < MIN_DEEPSEEK_ANSWER_CHARS) return 'too_short'
  if (kind === 'tebiq') {
    if (row.prompt_version !== CURRENT_TEBIQ_PROMPT_VERSION || row.status !== 'completed') return 'stale'
    if (answerLength(row) < MIN_TEBIQ_ANSWER_CHARS) return 'too_short'
  }
  return 'missing'
}

function buildTasks(state: StateResponse, args: Args): Task[] {
  const answers = normalizeAnswers(state.answers)
  const targetComplete = Math.ceil(state.questions.length * (args.targetRate / 100))
  const tasks: Task[] = []
  const addTask = (question: QuestionRow, kind: TaskKind, row: AnswerRow | undefined, force: boolean) => {
    if (!force && (kind === 'tebiq' ? isTebiqReal(row) : isDeepseekSuccess(row))) return
    tasks.push({ question, kind, reason: taskReason(kind, row, force) })
  }

  const incomplete = state.questions.filter(question => {
    const slot = answers[question.id]
    return !isDeepseekSuccess(slot?.deepseek_raw)
      || !isTebiqReal(slot?.tebiq_current)
      || args.forceDeepseek
      || args.forceTebiq
  })

  // Complete easiest rows first: only generate the missing/fallback side.
  for (const question of incomplete) {
    const slot = answers[question.id]
    addTask(question, 'deepseek', slot?.deepseek_raw, args.forceDeepseek)
    addTask(question, 'tebiq', slot?.tebiq_current, args.forceTebiq)
  }

  if (state.questions.length - incomplete.length >= targetComplete) {
    return tasks.filter(task => task.reason === 'failed')
  }
  return tasks
}

async function runTask(args: Args, task: Task): Promise<boolean> {
  const endpoint =
    task.kind === 'deepseek'
      ? '/api/internal/eval-lab/deepseek-raw'
      : '/api/internal/eval-lab/tebiq-answer'
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), task.kind === 'tebiq' ? 320_000 : 120_000)
  try {
    const res = await fetch(`${args.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        question: task.question.question_text,
        question_id: task.question.id,
      }),
      signal: controller.signal,
    })
    const json = (await res.json().catch(() => ({}))) as {
      ok?: boolean
      text?: string
      error?: string
      detail?: string
      fallback_reason?: string | null
      engine_version?: string | null
    }
    const ok = res.ok
      && (json.ok === true || !!json.text)
      && (task.kind !== 'tebiq' || (!json.fallback_reason && json.engine_version !== 'answer-core-v1.1-fallback'))
    if (!ok) {
      console.warn(
        `[fail] ${task.kind} ${task.question.starter_tag ?? task.question.id}: ${json.error ?? json.detail ?? `HTTP ${res.status}`}`,
      )
    }
    return ok
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn(`[fail] ${task.kind} ${task.question.starter_tag ?? task.question.id}: ${message}`)
    return false
  } finally {
    clearTimeout(timeout)
  }
}

async function runPool<T>(items: T[], concurrency: number, worker: (item: T) => Promise<void>) {
  let index = 0
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) {
      const item = items[index]
      index += 1
      await worker(item)
    }
  })
  await Promise.all(workers)
}

async function runFillEvalLabMissing() {
  const args = parseArgs(process.argv.slice(2))
  const before = await readState(args)
  const beforeSummary = summarize(before)
  console.log('[before]', beforeSummary)

  if (!args.forceDeepseek && !args.forceTebiq && beforeSummary.rate >= args.targetRate) {
    console.log(`[done] target already met: ${beforeSummary.rate}% >= ${args.targetRate}%`)
    return
  }

  const tasks = buildTasks(before, args)
  console.log(`[plan] ${tasks.length} generation tasks; concurrency=${args.concurrency}; dryRun=${args.dryRun}`)
  for (const task of tasks.slice(0, 20)) {
    console.log(`- ${task.kind} ${task.reason} ${task.question.starter_tag ?? task.question.id}`)
  }
  if (tasks.length > 20) console.log(`... ${tasks.length - 20} more`)
  if (args.dryRun) return

  let done = 0
  let ok = 0
  await runPool(tasks, args.concurrency, async task => {
    const success = await runTask(args, task)
    done += 1
    if (success) ok += 1
    if (done % 5 === 0 || done === tasks.length) {
      console.log(`[progress] ${done}/${tasks.length}; task_ok=${ok}`)
    }
  })

  const after = await readState(args)
  console.log('[after]', summarize(after))
}

runFillEvalLabMissing().catch(err => {
  console.error(err)
  process.exit(1)
})
