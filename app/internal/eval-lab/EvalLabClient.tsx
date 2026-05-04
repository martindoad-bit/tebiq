'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { pLimit } from '@/lib/eval-lab/concurrency'

// TEBIQ Eval Lab V1 — DB-backed internal annotation tool.
//
// Issue #14 hardening:
//   - Per-question generation status: pending / running / success / failed,
//     tracked separately for DeepSeek raw and TEBIQ current
//   - Batch generation runs through a concurrency limiter (≤ 3 in flight)
//   - Failed-only rerun button (don't touch success rows)
//   - Skip-annotated toggle on batch (don't re-generate answers under a
//     reviewer's already-finalised annotation unless the user opts in).
//     Annotation rows themselves are owned by the reviewer and live in a
//     separate table — the batch path never writes eval_annotations.

// ---------- types (mirror DB row shape, snake_case from /state) ----------

type AnswerType = 'deepseek_raw' | 'tebiq_current'
type Severity = 'OK' | 'P2' | 'P1' | 'P0'
type YesNo = 'yes' | 'no' | ''
type Action =
  | 'golden_case'
  | 'prompt_rule'
  | 'fact_card_candidate'
  | 'handoff_rule'
  | 'ignore'
  | ''

interface QuestionRow {
  id: string
  question_text: string
  scenario: string | null
  source: string
  starter_tag: string | null
  active: boolean
  schema_version: string
  metadata_json: Record<string, unknown>
  created_at: string
  updated_at: string
}

interface AnswerRow {
  id: string
  question_id: string
  answer_type: AnswerType
  model: string | null
  prompt_version: string | null
  answer_text: string | null
  tebiq_answer_id: string | null
  tebiq_answer_link: string | null
  engine_version: string | null
  status: string | null
  domain: string | null
  fallback_reason: string | null
  latency_ms: number | null
  error: string | null
  raw_payload_json: Record<string, unknown> | null
  schema_version: string
  created_at: string
}

interface AnnotationRow {
  id: string
  question_id: string
  reviewer: string
  score: number | null
  severity: Severity | null
  launchable: 'yes' | 'no' | null
  direction_correct: 'yes' | 'no' | null
  answered_question: 'yes' | 'no' | null
  dangerous_claim: 'yes' | 'no' | null
  hallucination: 'yes' | 'no' | null
  should_handoff: 'yes' | 'no' | null
  must_have: string | null
  must_not_have: string | null
  missing_points: string | null
  reviewer_note: string | null
  action: Action | null
  annotation_json: Record<string, unknown>
  schema_version: string
  created_at: string
  updated_at: string
}

interface EditableAnnotation {
  score: number | null
  severity: Severity | ''
  launchable: YesNo
  direction_correct: YesNo
  answered_question: YesNo
  dangerous_claim: YesNo
  hallucination: YesNo
  should_handoff: YesNo
  must_have: string
  must_not_have: string
  missing_points: string
  reviewer_note: string
  action: Action
}

const EMPTY_EDIT: EditableAnnotation = {
  score: null,
  severity: '',
  launchable: '',
  direction_correct: '',
  answered_question: '',
  dangerous_claim: '',
  hallucination: '',
  should_handoff: '',
  must_have: '',
  must_not_have: '',
  missing_points: '',
  reviewer_note: '',
  action: '',
}

// ---------- per-question generation status (Issue #14) ----------

type GenState = 'pending' | 'running' | 'success' | 'failed'

interface QuestionGenStatus {
  deepseek: GenState
  deepseekError: string | null
  deepseekAttempts: number | null
  tebiq: GenState
  tebiqError: string | null
  tebiqAttempts: number | null
}

const EMPTY_GEN_STATUS: QuestionGenStatus = {
  deepseek: 'pending',
  deepseekError: null,
  deepseekAttempts: null,
  tebiq: 'pending',
  tebiqError: null,
  tebiqAttempts: null,
}

/**
 * Hydrate initial gen-status from server-side answer rows.
 * - has answer_text → success
 * - has error       → failed
 * - neither         → pending
 */
function hydrateGenStatus(
  questions: QuestionRow[],
  ans: Record<string, { deepseek_raw?: AnswerRow; tebiq_current?: AnswerRow }>,
): Record<string, QuestionGenStatus> {
  const out: Record<string, QuestionGenStatus> = {}
  for (const q of questions) {
    const slot = ans[q.id]
    out[q.id] = {
      deepseek: classify(slot?.deepseek_raw),
      deepseekError: slot?.deepseek_raw?.error ?? null,
      deepseekAttempts: getAttempts(slot?.deepseek_raw),
      tebiq: classify(slot?.tebiq_current),
      tebiqError: slot?.tebiq_current?.error ?? null,
      tebiqAttempts: getAttempts(slot?.tebiq_current),
    }
  }
  return out
}

function classify(row: AnswerRow | undefined): GenState {
  if (!row) return 'pending'
  if (row.answer_text) return 'success'
  if (row.error) return 'failed'
  return 'pending'
}

function getAttempts(row: AnswerRow | undefined): number | null {
  if (!row?.raw_payload_json) return null
  const v = (row.raw_payload_json as { attempts?: unknown }).attempts
  return typeof v === 'number' ? v : null
}

function annotationToEdit(a: AnnotationRow | null): EditableAnnotation {
  if (!a) return { ...EMPTY_EDIT }
  return {
    score: a.score ?? null,
    severity: (a.severity ?? '') as Severity | '',
    launchable: (a.launchable ?? '') as YesNo,
    direction_correct: (a.direction_correct ?? '') as YesNo,
    answered_question: (a.answered_question ?? '') as YesNo,
    dangerous_claim: (a.dangerous_claim ?? '') as YesNo,
    hallucination: (a.hallucination ?? '') as YesNo,
    should_handoff: (a.should_handoff ?? '') as YesNo,
    must_have: a.must_have ?? '',
    must_not_have: a.must_not_have ?? '',
    missing_points: a.missing_points ?? '',
    reviewer_note: a.reviewer_note ?? '',
    action: (a.action ?? '') as Action,
  }
}

type FilterMode =
  | 'all'
  | 'unannotated'
  | 'p0'
  | 'p1'
  | 'launchable_no'
  | 'ungenerated'
  | 'failed'
  | 'golden'

const DRAFT_KEY = 'tebiq_eval_lab_v1_drafts'

interface DraftMap {
  [questionId: string]: EditableAnnotation
}

function loadDrafts(): DraftMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as DraftMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}
function saveDraft(id: string, edit: EditableAnnotation): void {
  if (typeof window === 'undefined') return
  try {
    const drafts = loadDrafts()
    drafts[id] = edit
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts))
  } catch {
    /* quota / private mode — silent */
  }
}
function clearDraft(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const drafts = loadDrafts()
    delete drafts[id]
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts))
  } catch {
    /* silent */
  }
}

// ---------- batch concurrency cap (Issue #14: ≤ 3) ----------

const BATCH_CONCURRENCY = 3

export default function EvalLabClient() {
  const [questions, setQuestions] = useState<QuestionRow[]>([])
  const [answersByQuestion, setAnswersByQuestion] = useState<
    Record<string, { deepseek_raw?: AnswerRow; tebiq_current?: AnswerRow }>
  >({})
  const [annotationByQuestion, setAnnotationByQuestion] = useState<Record<string, AnnotationRow>>({})
  const [edits, setEdits] = useState<Record<string, EditableAnnotation>>({})
  const [saveState, setSaveState] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({})
  const [genStatus, setGenStatus] = useState<Record<string, QuestionGenStatus>>({})
  const [batchProgress, setBatchProgress] = useState<{ done: number; total: number } | null>(null)
  const [skipAnnotatedOnBatch, setSkipAnnotatedOnBatch] = useState(true)

  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterMode>('all')
  const [scenarioFilter, setScenarioFilter] = useState<string>('all')
  const [batchBusy, setBatchBusy] = useState(false)
  const [seedBusy, setSeedBusy] = useState(false)
  const [importText, setImportText] = useState('')
  const [headerMessage, setHeaderMessage] = useState<string | null>(null)

  const reviewer = 'default'
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const cancelBatchRef = useRef(false)

  // ---- helpers ----
  const updateGenStatus = useCallback(
    (qid: string, patch: Partial<QuestionGenStatus>) => {
      setGenStatus(prev => {
        const cur = prev[qid] ?? EMPTY_GEN_STATUS
        return { ...prev, [qid]: { ...cur, ...patch } }
      })
    },
    [],
  )

  // ---- initial load ----
  const loadAll = useCallback(async () => {
    try {
      const r = await fetch(`/api/internal/eval-lab/state?reviewer=${encodeURIComponent(reviewer)}`, {
        cache: 'no-store',
      })
      if (!r.ok) {
        setLoadError(`HTTP ${r.status}`)
        return
      }
      const j = (await r.json()) as {
        ok: boolean
        questions: QuestionRow[]
        answers: AnswerRow[]
        annotations: AnnotationRow[]
        error?: string
      }
      if (!j.ok) {
        setLoadError(j.error ?? 'unknown')
        return
      }
      setQuestions(j.questions)
      const ans: Record<string, { deepseek_raw?: AnswerRow; tebiq_current?: AnswerRow }> = {}
      for (const a of j.answers) {
        const slot = ans[a.question_id] ?? {}
        slot[a.answer_type] = a
        ans[a.question_id] = slot
      }
      setAnswersByQuestion(ans)
      const annMap: Record<string, AnnotationRow> = {}
      for (const a of j.annotations) annMap[a.question_id] = a
      setAnnotationByQuestion(annMap)
      // Hydrate edits from server, then overlay any unsynced drafts.
      const drafts = loadDrafts()
      const initialEdits: Record<string, EditableAnnotation> = {}
      for (const q of j.questions) {
        initialEdits[q.id] = drafts[q.id] ?? annotationToEdit(annMap[q.id] ?? null)
      }
      setEdits(initialEdits)
      // Hydrate genStatus from existing answer rows. Never demote a row
      // that's currently 'running' on the client (request still in flight).
      setGenStatus(prev => {
        const fresh = hydrateGenStatus(j.questions, ans)
        const merged: Record<string, QuestionGenStatus> = {}
        for (const q of j.questions) {
          const old = prev[q.id]
          const next = fresh[q.id]
          merged[q.id] = {
            deepseek: old?.deepseek === 'running' ? 'running' : next.deepseek,
            deepseekError: next.deepseekError,
            deepseekAttempts: next.deepseekAttempts,
            tebiq: old?.tebiq === 'running' ? 'running' : next.tebiq,
            tebiqError: next.tebiqError,
            tebiqAttempts: next.tebiqAttempts,
          }
        }
        return merged
      })
      setLoaded(true)
      setLoadError(null)
      if (j.questions.length > 0 && !selectedId) {
        setSelectedId(j.questions[0].id)
      }
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : String(err))
      setLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  // ---- derived ----
  const scenarios = useMemo(() => {
    const set = new Set<string>()
    for (const q of questions) if (q.scenario) set.add(q.scenario)
    return Array.from(set).sort()
  }, [questions])

  const filtered = useMemo(
    () => filterQuestions(questions, answersByQuestion, annotationByQuestion, genStatus, filter, scenarioFilter),
    [questions, answersByQuestion, annotationByQuestion, genStatus, filter, scenarioFilter],
  )
  const selected = questions.find(q => q.id === selectedId) ?? null
  const selectedAnswers = selectedId ? answersByQuestion[selectedId] : undefined
  const selectedEdit = selectedId ? edits[selectedId] ?? EMPTY_EDIT : EMPTY_EDIT
  const selectedStatus = selectedId ? genStatus[selectedId] ?? EMPTY_GEN_STATUS : EMPTY_GEN_STATUS

  const counts = useMemo(() => {
    const total = questions.length
    let annotated = 0
    let p0 = 0
    let p1 = 0
    let golden = 0
    let ungen = 0
    let failed = 0
    let running = 0
    for (const q of questions) {
      const a = annotationByQuestion[q.id]
      if (a?.score != null) annotated += 1
      if (a?.severity === 'P0') p0 += 1
      if (a?.severity === 'P1') p1 += 1
      if (a?.action === 'golden_case') golden += 1
      const s = genStatus[q.id]
      if (s?.deepseek === 'failed' || s?.tebiq === 'failed') failed += 1
      if (s?.deepseek === 'running' || s?.tebiq === 'running') running += 1
      const ans = answersByQuestion[q.id]
      if (!ans?.deepseek_raw?.answer_text || !ans?.tebiq_current?.answer_text) ungen += 1
    }
    return { total, annotated, p0, p1, golden, ungen, failed, running }
  }, [questions, annotationByQuestion, answersByQuestion, genStatus])

  // ---- annotation auto-save (unchanged behaviour) ----
  const persistAnnotation = useCallback(
    async (questionId: string, edit: EditableAnnotation) => {
      setSaveState(prev => ({ ...prev, [questionId]: 'saving' }))
      try {
        const r = await fetch('/api/internal/eval-lab/annotation', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            question_id: questionId,
            reviewer,
            score: edit.score,
            severity: edit.severity || null,
            launchable: edit.launchable || null,
            direction_correct: edit.direction_correct || null,
            answered_question: edit.answered_question || null,
            dangerous_claim: edit.dangerous_claim || null,
            hallucination: edit.hallucination || null,
            should_handoff: edit.should_handoff || null,
            must_have: edit.must_have || null,
            must_not_have: edit.must_not_have || null,
            missing_points: edit.missing_points || null,
            reviewer_note: edit.reviewer_note || null,
            action: edit.action || null,
          }),
        })
        const j = (await r.json()) as { ok?: boolean; annotation?: AnnotationRow; error?: string }
        if (j.ok && j.annotation) {
          setAnnotationByQuestion(prev => ({ ...prev, [questionId]: j.annotation! }))
          setSaveState(prev => ({ ...prev, [questionId]: 'saved' }))
          clearDraft(questionId)
          setTimeout(() => {
            setSaveState(prev => {
              if (prev[questionId] !== 'saved') return prev
              const next = { ...prev }
              delete next[questionId]
              return next
            })
          }, 1500)
        } else {
          setSaveState(prev => ({ ...prev, [questionId]: 'error' }))
        }
      } catch {
        setSaveState(prev => ({ ...prev, [questionId]: 'error' }))
      }
    },
    [reviewer],
  )

  const onAnnotate = useCallback(
    (questionId: string, patch: Partial<EditableAnnotation>) => {
      setEdits(prev => {
        const next = { ...prev[questionId] ?? EMPTY_EDIT, ...patch }
        saveDraft(questionId, next)
        const merged = { ...prev, [questionId]: next }
        const existing = debounceTimers.current[questionId]
        if (existing) clearTimeout(existing)
        debounceTimers.current[questionId] = setTimeout(() => {
          persistAnnotation(questionId, next)
        }, 500)
        return merged
      })
    },
    [persistAnnotation],
  )

  // ---- generation (per-question) ----

  /**
   * Single-question DeepSeek generation. Returns true on success, false on
   * failure. Status updates flow through `genStatus`. The route persists
   * the result to eval_answers; we then refresh that row from the server
   * so all derived UI (filters, counts, AnswerColumn) stays in sync.
   */
  const generateDeepseek = useCallback(
    async (q: QuestionRow): Promise<boolean> => {
      updateGenStatus(q.id, {
        deepseek: 'running',
        deepseekError: null,
        deepseekAttempts: null,
      })
      try {
        const r = await fetch('/api/internal/eval-lab/deepseek-raw', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question: q.question_text, question_id: q.id }),
        })
        const j = (await r.json()) as {
          ok?: boolean
          text?: string
          error?: string
          attempts?: number
        }
        if (j.ok && j.text) {
          updateGenStatus(q.id, {
            deepseek: 'success',
            deepseekError: null,
            deepseekAttempts: j.attempts ?? null,
          })
          return true
        }
        updateGenStatus(q.id, {
          deepseek: 'failed',
          deepseekError: j.error ?? `HTTP ${r.status}`,
          deepseekAttempts: j.attempts ?? null,
        })
        return false
      } catch (err) {
        updateGenStatus(q.id, {
          deepseek: 'failed',
          deepseekError: err instanceof Error ? err.message : String(err),
          deepseekAttempts: null,
        })
        return false
      }
    },
    [updateGenStatus],
  )

  const generateTebiq = useCallback(
    async (q: QuestionRow): Promise<boolean> => {
      updateGenStatus(q.id, {
        tebiq: 'running',
        tebiqError: null,
        tebiqAttempts: null,
      })
      try {
        const r = await fetch('/api/internal/eval-lab/tebiq-answer', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question: q.question_text, question_id: q.id }),
        })
        const j = (await r.json()) as { ok?: boolean; error?: string; attempts?: number }
        if (j.ok) {
          updateGenStatus(q.id, {
            tebiq: 'success',
            tebiqError: null,
            tebiqAttempts: j.attempts ?? null,
          })
          return true
        }
        updateGenStatus(q.id, {
          tebiq: 'failed',
          tebiqError: j.error ?? `HTTP ${r.status}`,
          tebiqAttempts: j.attempts ?? null,
        })
        return false
      } catch (err) {
        updateGenStatus(q.id, {
          tebiq: 'failed',
          tebiqError: err instanceof Error ? err.message : String(err),
          tebiqAttempts: null,
        })
        return false
      }
    },
    [updateGenStatus],
  )

  /** Refresh the answers slice of state from the server. Used after a batch
   *  finishes so the persisted answer rows hydrate into UI. */
  const refreshAnswers = useCallback(async () => {
    try {
      const r = await fetch(`/api/internal/eval-lab/state?reviewer=${encodeURIComponent(reviewer)}`, {
        cache: 'no-store',
      })
      if (!r.ok) return
      const j = (await r.json()) as { ok: boolean; answers: AnswerRow[] }
      if (!j.ok) return
      const ans: Record<string, { deepseek_raw?: AnswerRow; tebiq_current?: AnswerRow }> = {}
      for (const a of j.answers) {
        const slot = ans[a.question_id] ?? {}
        slot[a.answer_type] = a
        ans[a.question_id] = slot
      }
      setAnswersByQuestion(ans)
    } catch {
      /* ignore */
    }
  }, [reviewer])

  // ---- batch (Issue #14: ≤ 3 concurrent, failed-rerun, skip-annotated) ----

  type BatchScope = 'missing' | 'failed-only'

  /**
   * Decide whether `kind` should be (re)generated for `q` given the scope.
   * - 'missing':  generate when status is pending OR (failed if you ran the
   *               batch button — so failed gets retried at batch-time).
   *               Don't touch already-success rows.
   * - 'failed-only': generate only when status === 'failed'.
   *
   * In addition, when `skipAnnotatedOnBatch` is true and the question is
   * already annotated (score set), skip it entirely. Annotation rows are
   * not touched here regardless — they live in eval_annotations.
   */
  const shouldGenerate = useCallback(
    (qid: string, kind: 'deepseek' | 'tebiq', scope: BatchScope, skipAnnotated: boolean): boolean => {
      if (skipAnnotated) {
        const ann = annotationByQuestion[qid]
        if (ann?.score != null) return false
      }
      const s = genStatus[qid] ?? EMPTY_GEN_STATUS
      const slot = kind === 'deepseek' ? s.deepseek : s.tebiq
      if (slot === 'running') return false
      if (scope === 'failed-only') return slot === 'failed'
      // missing scope: generate unless already success
      return slot !== 'success'
    },
    [annotationByQuestion, genStatus],
  )

  const runBatch = useCallback(
    async (scope: BatchScope) => {
      if (batchBusy) return
      cancelBatchRef.current = false
      setBatchBusy(true)

      // Build the task list under current state. Two tasks per question
      // (one per kind) so concurrency cap applies across BOTH endpoints
      // — the cap protects DeepSeek and the TEBIQ pipeline equally.
      type Task = { q: QuestionRow; kind: 'deepseek' | 'tebiq' }
      const tasks: Task[] = []
      const skipAnn = skipAnnotatedOnBatch
      for (const q of questions) {
        if (shouldGenerate(q.id, 'deepseek', scope, skipAnn)) tasks.push({ q, kind: 'deepseek' })
        if (shouldGenerate(q.id, 'tebiq', scope, skipAnn)) tasks.push({ q, kind: 'tebiq' })
      }
      if (tasks.length === 0) {
        setBatchBusy(false)
        setHeaderMessage(scope === 'failed-only' ? '没有失败题需要重跑' : '没有需要生成的题')
        return
      }

      // Mark all queued tasks as 'pending' so the UI shows the queue depth.
      setGenStatus(prev => {
        const next = { ...prev }
        for (const t of tasks) {
          const cur = next[t.q.id] ?? EMPTY_GEN_STATUS
          if (t.kind === 'deepseek' && cur.deepseek !== 'running') {
            next[t.q.id] = { ...cur, deepseek: 'pending', deepseekError: null }
          }
          if (t.kind === 'tebiq' && cur.tebiq !== 'running') {
            next[t.q.id] = { ...cur, tebiq: 'pending', tebiqError: null }
          }
        }
        return next
      })

      const limit = pLimit(BATCH_CONCURRENCY)
      let done = 0
      setBatchProgress({ done: 0, total: tasks.length })

      const promises = tasks.map(t =>
        limit(async () => {
          if (cancelBatchRef.current) return
          if (t.kind === 'deepseek') await generateDeepseek(t.q)
          else await generateTebiq(t.q)
          done += 1
          setBatchProgress({ done, total: tasks.length })
        }),
      )
      try {
        await Promise.all(promises)
      } finally {
        setBatchBusy(false)
        setBatchProgress(null)
        await refreshAnswers()
      }
    },
    [batchBusy, questions, shouldGenerate, skipAnnotatedOnBatch, generateDeepseek, generateTebiq, refreshAnswers],
  )

  const cancelBatch = useCallback(() => {
    cancelBatchRef.current = true
  }, [])

  // ---- single-question rerun for the failed-only flow ----
  const rerunFailed = useCallback(
    async (q: QuestionRow) => {
      const s = genStatus[q.id] ?? EMPTY_GEN_STATUS
      const tasks: Promise<unknown>[] = []
      if (s.deepseek === 'failed') tasks.push(generateDeepseek(q))
      if (s.tebiq === 'failed') tasks.push(generateTebiq(q))
      if (tasks.length === 0) return
      await Promise.all(tasks)
      await refreshAnswers()
    },
    [genStatus, generateDeepseek, generateTebiq, refreshAnswers],
  )

  // ---- seed / import ----
  const onSeed = async () => {
    setSeedBusy(true)
    try {
      const r = await fetch('/api/internal/eval-lab/seed', { method: 'POST' })
      const j = (await r.json()) as { ok?: boolean; inserted?: number; skipped?: number; error?: string }
      if (j.ok) {
        setHeaderMessage(`Seed 完成：新增 ${j.inserted ?? 0}，跳过 ${j.skipped ?? 0}`)
        await loadAll()
      } else {
        setHeaderMessage(`Seed 失败: ${j.error ?? `HTTP ${r.status}`}`)
      }
    } finally {
      setSeedBusy(false)
    }
  }

  const onImport = async () => {
    const trimmed = importText.trim()
    if (!trimmed) return
    let body: unknown = null
    try {
      const parsed = JSON.parse(trimmed) as unknown
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const obj = parsed as { items?: unknown; questions?: unknown }
        if (Array.isArray(obj.items) || Array.isArray(obj.questions)) {
          body = obj
        }
      }
    } catch {
      /* fall through */
    }
    if (!body) {
      const lines = trimmed.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
      if (lines.length === 0) return
      body = { questions: lines }
    }
    const r = await fetch('/api/internal/eval-lab/import', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const j = (await r.json()) as { ok?: boolean; inserted?: number; received?: number; error?: string }
    if (j.ok) {
      setHeaderMessage(`导入完成：新增 ${j.inserted ?? 0} / ${j.received ?? 0}`)
      setImportText('')
      await loadAll()
    } else {
      setHeaderMessage(`导入失败: ${j.error ?? `HTTP ${r.status}`}`)
    }
  }

  const goNext = useCallback(() => {
    const idx = filtered.findIndex(q => q.id === selectedId)
    const start = idx >= 0 ? idx + 1 : 0
    for (let i = start; i < filtered.length; i += 1) {
      const a = annotationByQuestion[filtered[i].id]
      if (!a || a.score == null) {
        setSelectedId(filtered[i].id)
        return
      }
    }
    for (let i = 0; i < start; i += 1) {
      const a = annotationByQuestion[filtered[i].id]
      if (!a || a.score == null) {
        setSelectedId(filtered[i].id)
        return
      }
    }
  }, [filtered, selectedId, annotationByQuestion])

  if (!loaded) {
    return <div className="p-6 text-sm text-slate-500">加载中…</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-mono">
      <header className="border-b border-slate-300 bg-white px-4 py-3 flex flex-wrap items-center gap-3">
        <h1 className="text-base font-semibold tracking-tight">TEBIQ Eval Lab V1 · 内部</h1>
        <div className="text-xs text-slate-500">
          {counts.total} 题 · 已标 {counts.annotated} ·
          P0 {counts.p0} · P1 {counts.p1} ·
          golden {counts.golden} · 未生成 {counts.ungen} · 失败 {counts.failed}
          {counts.running > 0 ? ` · 运行中 ${counts.running}` : ''}
        </div>
        {batchProgress && (
          <span className="text-xs text-slate-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            批量进度: {batchProgress.done}/{batchProgress.total} · 并发 ≤ {BATCH_CONCURRENCY}
          </span>
        )}
        {loadError && <span className="text-xs text-red-600">载入错误: {loadError}</span>}
        {headerMessage && (
          <span className="text-xs text-slate-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            {headerMessage}
            <button onClick={() => setHeaderMessage(null)} className="ml-2 text-slate-400">×</button>
          </span>
        )}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <label className="text-[11px] text-slate-600 flex items-center gap-1 select-none">
            <input
              type="checkbox"
              checked={skipAnnotatedOnBatch}
              onChange={e => setSkipAnnotatedOnBatch(e.target.checked)}
              className="accent-blue-600"
            />
            批量时跳过已标注题
          </label>
          {counts.total === 0 && (
            <button
              onClick={onSeed}
              disabled={seedBusy}
              className="text-xs px-3 py-1.5 border border-blue-400 rounded bg-blue-50 hover:bg-blue-100 disabled:opacity-50"
            >
              {seedBusy ? 'Seed 中…' : 'Seed 100 题'}
            </button>
          )}
          {counts.total > 0 && (
            <button
              onClick={onSeed}
              disabled={seedBusy}
              className="text-xs px-3 py-1.5 border border-slate-300 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
            >
              {seedBusy ? 'Seed 中…' : 'Seed (idempotent)'}
            </button>
          )}
          <button
            onClick={() => runBatch('missing')}
            disabled={batchBusy}
            className="text-xs px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
          >
            {batchBusy ? '批量生成中…' : `批量生成未生成 (≤ ${BATCH_CONCURRENCY} 并发)`}
          </button>
          <button
            onClick={() => runBatch('failed-only')}
            disabled={batchBusy || counts.failed === 0}
            className="text-xs px-3 py-1.5 border border-orange-300 rounded bg-orange-50 text-orange-700 hover:bg-orange-100 disabled:opacity-50"
          >
            重跑失败 ({counts.failed})
          </button>
          {batchBusy && (
            <button
              onClick={cancelBatch}
              className="text-xs px-3 py-1.5 border border-red-300 rounded bg-white text-red-600 hover:bg-red-50"
            >
              取消
            </button>
          )}
          <a
            href="/api/internal/eval-lab/export?type=full"
            className="text-xs px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100"
          >
            导出完整 JSON
          </a>
          <a
            href="/api/internal/eval-lab/export?type=golden"
            className="text-xs px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100"
          >
            导出 golden JSON
          </a>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-3 p-3" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Left — question list */}
        <aside
          className="col-span-3 bg-white border border-slate-300 rounded p-3 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 76px)' }}
        >
          <div className="flex items-center gap-2 text-xs mb-2 flex-wrap">
            <span>筛选</span>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as FilterMode)}
              className="border border-slate-300 rounded px-1 py-0.5"
            >
              <option value="all">全部</option>
              <option value="unannotated">未标</option>
              <option value="ungenerated">未生成</option>
              <option value="failed">失败</option>
              <option value="p0">P0</option>
              <option value="p1">P1</option>
              <option value="launchable_no">不可上线</option>
              <option value="golden">golden_case</option>
            </select>
            {scenarios.length > 0 && (
              <select
                value={scenarioFilter}
                onChange={e => setScenarioFilter(e.target.value)}
                className="border border-slate-300 rounded px-1 py-0.5"
              >
                <option value="all">所有场景</option>
                {scenarios.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
            <span className="ml-auto text-slate-500">{filtered.length}</span>
          </div>
          <ul className="space-y-1">
            {filtered.map(q => {
              const isSel = q.id === selectedId
              const ann = annotationByQuestion[q.id]
              const sev = ann?.severity ?? null
              const sevColor =
                sev === 'P0' ? 'text-red-700 bg-red-50' :
                sev === 'P1' ? 'text-orange-700 bg-orange-50' :
                sev === 'P2' ? 'text-amber-700 bg-amber-50' :
                sev === 'OK' ? 'text-emerald-700 bg-emerald-50' :
                'text-slate-400'
              const s = genStatus[q.id] ?? EMPTY_GEN_STATUS
              return (
                <li key={q.id}>
                  <button
                    onClick={() => setSelectedId(q.id)}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded border ${
                      isSel ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span
                        className={`inline-block px-1 rounded ${sevColor}`}
                        style={{ minWidth: 22, textAlign: 'center' }}
                      >
                        {sev || (ann?.score != null ? '·' : ' ')}
                      </span>
                      <StatusDot kind="D" state={s.deepseek} />
                      <StatusDot kind="T" state={s.tebiq} />
                      <span className="truncate flex-1" title={q.question_text}>
                        {q.question_text}
                      </span>
                    </div>
                    {q.starter_tag && (
                      <div className="text-[10px] text-slate-400 ml-[26px]">{q.starter_tag}</div>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <textarea
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="粘贴新问题（每行一个），或粘贴完整 JSON ({items:[...]})"
              className="w-full h-24 p-2 text-xs border border-slate-300 rounded font-mono"
            />
            <button
              onClick={onImport}
              disabled={!importText.trim()}
              className="mt-1 w-full text-xs px-2 py-1 border border-slate-400 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
            >
              导入 / 追加
            </button>
          </div>
        </aside>

        {/* Center — comparison */}
        <section
          className="col-span-6 bg-white border border-slate-300 rounded p-3 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 76px)' }}
        >
          {!selected ? (
            <p className="text-sm text-slate-500">从左侧选一题。</p>
          ) : (
            <div className="space-y-3">
              <header>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {selected.starter_tag ?? selected.source}
                  {selected.scenario ? ` · ${selected.scenario}` : ''}
                </p>
                <h2 className="text-sm font-semibold text-slate-900 leading-tight mt-1">
                  {selected.question_text}
                </h2>
              </header>

              <div className="grid grid-cols-2 gap-3">
                <AnswerColumn
                  label="DeepSeek 裸答"
                  state={selectedStatus.deepseek}
                  liveError={selectedStatus.deepseekError}
                  attempts={selectedStatus.deepseekAttempts}
                  onGenerate={() => generateDeepseek(selected)}
                  row={selectedAnswers?.deepseek_raw}
                />
                <AnswerColumn
                  label="TEBIQ 当前输出"
                  state={selectedStatus.tebiq}
                  liveError={selectedStatus.tebiqError}
                  attempts={selectedStatus.tebiqAttempts}
                  onGenerate={() => generateTebiq(selected)}
                  row={selectedAnswers?.tebiq_current}
                  showMeta
                />
              </div>

              <div className="flex gap-2 text-[11px]">
                {(selectedStatus.deepseek === 'failed' || selectedStatus.tebiq === 'failed') && (
                  <button
                    onClick={() => rerunFailed(selected)}
                    className="px-2 py-1 border border-orange-300 rounded bg-orange-50 text-orange-700 hover:bg-orange-100"
                  >
                    重跑失败
                  </button>
                )}
                <button
                  onClick={goNext}
                  className="ml-auto px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100"
                >
                  下一题（未标）
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Right — annotation form */}
        <aside
          className="col-span-3 bg-white border border-slate-300 rounded p-3 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 76px)' }}
        >
          {!selected ? (
            <p className="text-sm text-slate-500">先选一题。</p>
          ) : (
            <AnnotationForm
              edit={selectedEdit}
              saveStatus={saveState[selected.id] ?? 'idle'}
              annotation={annotationByQuestion[selected.id] ?? null}
              onChange={patch => onAnnotate(selected.id, patch)}
            />
          )}
        </aside>
      </main>
    </div>
  )
}

// ---------- subcomponents ----------

function StatusDot({ kind, state }: { kind: 'D' | 'T'; state: GenState }) {
  const cls =
    state === 'success' ? 'text-emerald-600' :
    state === 'running' ? 'text-blue-600 animate-pulse' :
    state === 'failed' ? 'text-red-600' :
    'text-slate-300'
  const label =
    state === 'success' ? `${kind}✓` :
    state === 'running' ? `${kind}…` :
    state === 'failed' ? `${kind}✗` :
    `${kind}·`
  return (
    <span className={`text-[10px] font-mono ${cls}`} style={{ minWidth: 14, textAlign: 'center' }}>
      {label}
    </span>
  )
}

function AnswerColumn({
  label,
  state,
  liveError,
  attempts,
  onGenerate,
  row,
  showMeta,
}: {
  label: string
  state: GenState
  liveError: string | null
  attempts: number | null
  onGenerate: () => void
  row?: AnswerRow
  showMeta?: boolean
}) {
  const has = !!row?.answer_text
  const busy = state === 'running'
  const stateBadge =
    state === 'running' ? <span className="text-[10px] text-blue-600">running</span> :
    state === 'failed' ? <span className="text-[10px] text-red-600">failed</span> :
    state === 'success' ? <span className="text-[10px] text-emerald-600">success</span> :
    <span className="text-[10px] text-slate-400">pending</span>
  return (
    <div className="border border-slate-200 rounded p-2">
      <div className="flex items-center justify-between mb-2 gap-2">
        <span className="text-[10px] uppercase tracking-wider text-slate-500">{label}</span>
        {stateBadge}
        <button
          onClick={onGenerate}
          disabled={busy}
          className="text-[11px] px-2 py-0.5 border border-slate-300 rounded bg-white hover:bg-slate-100 disabled:opacity-50 ml-auto"
        >
          {busy ? '生成中…' : has ? '重新生成' : '生成'}
        </button>
      </div>
      {liveError && state === 'failed' && (
        <p className="text-[11px] text-red-600">live err: {liveError}</p>
      )}
      {row?.error && state !== 'success' && (
        <p className="text-[11px] text-red-600">err: {row.error}</p>
      )}
      {attempts != null && attempts > 1 && (
        <p className="text-[10px] text-slate-400">attempts: {attempts}</p>
      )}
      {showMeta && row?.tebiq_answer_id && (
        <div className="text-[11px] text-slate-600 space-y-0.5 mb-2 border-b border-slate-100 pb-2">
          <p>
            <a
              href={row.tebiq_answer_link ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {row.tebiq_answer_link}
            </a>
          </p>
          <p>
            engine={row.engine_version} · status={row.status} · domain={row.domain}
            {row.fallback_reason ? ` · fallback=${row.fallback_reason}` : ''}
            {row.latency_ms != null ? ` · ${row.latency_ms}ms` : ''}
          </p>
        </div>
      )}
      {showMeta && row?.raw_payload_json && typeof row.raw_payload_json === 'object' && (
        <p className="text-[11px] font-semibold mb-1">
          {(row.raw_payload_json as { title?: string }).title ?? ''}
        </p>
      )}
      <pre className="text-[12px] whitespace-pre-wrap leading-[1.6] text-slate-800">
        {row?.answer_text ?? '（未生成）'}
      </pre>
    </div>
  )
}

function AnnotationForm({
  edit,
  saveStatus,
  annotation,
  onChange,
}: {
  edit: EditableAnnotation
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  annotation: AnnotationRow | null
  onChange: (patch: Partial<EditableAnnotation>) => void
}) {
  return (
    <form className="space-y-3 text-xs">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-slate-500">标注</span>
        <span className="ml-auto text-[10px]">
          {saveStatus === 'saving' && <span className="text-slate-400">保存中…</span>}
          {saveStatus === 'saved' && <span className="text-emerald-600">已保存</span>}
          {saveStatus === 'error' && <span className="text-red-600">保存失败</span>}
        </span>
      </div>

      <Field label="score (1–5)">
        <select
          value={edit.score ?? ''}
          onChange={e =>
            onChange({ score: e.target.value ? Number(e.target.value) : null })
          }
          className="w-full border border-slate-300 rounded px-2 py-1"
        >
          <option value="">—</option>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </Field>

      <Field label="severity">
        <select
          value={edit.severity}
          onChange={e => onChange({ severity: e.target.value as Severity | '' })}
          className="w-full border border-slate-300 rounded px-2 py-1"
        >
          <option value="">—</option>
          <option value="OK">OK</option>
          <option value="P2">P2</option>
          <option value="P1">P1</option>
          <option value="P0">P0</option>
        </select>
      </Field>

      <YesNoField label="可以上线 (launchable)" value={edit.launchable} onChange={v => onChange({ launchable: v })} />
      <YesNoField label="方向正确" value={edit.direction_correct} onChange={v => onChange({ direction_correct: v })} />
      <YesNoField label="答到了问题" value={edit.answered_question} onChange={v => onChange({ answered_question: v })} />
      <YesNoField label="危险断言" value={edit.dangerous_claim} onChange={v => onChange({ dangerous_claim: v })} />
      <YesNoField label="hallucination" value={edit.hallucination} onChange={v => onChange({ hallucination: v })} />
      <YesNoField label="应交给行政書士 (handoff)" value={edit.should_handoff} onChange={v => onChange({ should_handoff: v })} />

      <Field label="must_have">
        <textarea
          value={edit.must_have}
          onChange={e => onChange({ must_have: e.target.value })}
          rows={2}
          className="w-full border border-slate-300 rounded px-2 py-1 font-mono text-xs"
        />
      </Field>
      <Field label="must_not_have">
        <textarea
          value={edit.must_not_have}
          onChange={e => onChange({ must_not_have: e.target.value })}
          rows={2}
          className="w-full border border-slate-300 rounded px-2 py-1 font-mono text-xs"
        />
      </Field>
      <Field label="missing_points">
        <textarea
          value={edit.missing_points}
          onChange={e => onChange({ missing_points: e.target.value })}
          rows={2}
          className="w-full border border-slate-300 rounded px-2 py-1 font-mono text-xs"
        />
      </Field>
      <Field label="reviewer_note">
        <textarea
          value={edit.reviewer_note}
          onChange={e => onChange({ reviewer_note: e.target.value })}
          rows={2}
          className="w-full border border-slate-300 rounded px-2 py-1 font-mono text-xs"
        />
      </Field>

      <Field label="action">
        <select
          value={edit.action}
          onChange={e => onChange({ action: e.target.value as Action })}
          className="w-full border border-slate-300 rounded px-2 py-1"
        >
          <option value="">—</option>
          <option value="golden_case">golden_case</option>
          <option value="prompt_rule">prompt_rule</option>
          <option value="fact_card_candidate">fact_card_candidate</option>
          <option value="handoff_rule">handoff_rule</option>
          <option value="ignore">ignore</option>
        </select>
      </Field>

      {annotation?.updated_at && (
        <p className="text-[10px] text-slate-400">last saved: {annotation.updated_at}</p>
      )}
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">{label}</span>
      {children}
    </label>
  )
}

function YesNoField({
  label,
  value,
  onChange,
}: {
  label: string
  value: YesNo
  onChange: (v: YesNo) => void
}) {
  return (
    <Field label={label}>
      <div className="flex gap-1">
        {(['yes', 'no', ''] as const).map(opt => (
          <button
            key={opt || 'clear'}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 px-2 py-1 border rounded text-[11px] ${
              value === opt
                ? opt === 'yes'
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-700'
                  : opt === 'no'
                  ? 'bg-red-100 border-red-400 text-red-700'
                  : 'bg-slate-100 border-slate-400 text-slate-600'
                : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {opt === 'yes' ? '✓' : opt === 'no' ? '✗' : '—'}
          </button>
        ))}
      </div>
    </Field>
  )
}

// ---------- helpers ----------

function filterQuestions(
  qs: QuestionRow[],
  answers: Record<string, { deepseek_raw?: AnswerRow; tebiq_current?: AnswerRow }>,
  annotations: Record<string, AnnotationRow>,
  status: Record<string, QuestionGenStatus>,
  mode: FilterMode,
  scenario: string,
): QuestionRow[] {
  const byScenario = qs.filter(q => scenario === 'all' || q.scenario === scenario)
  switch (mode) {
    case 'unannotated':
      return byScenario.filter(q => {
        const a = annotations[q.id]
        return !a || a.score == null
      })
    case 'p0':
      return byScenario.filter(q => annotations[q.id]?.severity === 'P0')
    case 'p1':
      return byScenario.filter(q => annotations[q.id]?.severity === 'P1')
    case 'launchable_no':
      return byScenario.filter(q => annotations[q.id]?.launchable === 'no')
    case 'ungenerated':
      return byScenario.filter(q => {
        const a = answers[q.id]
        return !a?.deepseek_raw?.answer_text || !a?.tebiq_current?.answer_text
      })
    case 'failed':
      return byScenario.filter(q => {
        const s = status[q.id]
        return s?.deepseek === 'failed' || s?.tebiq === 'failed'
      })
    case 'golden':
      return byScenario.filter(q => annotations[q.id]?.action === 'golden_case')
    case 'all':
    default:
      return byScenario
  }
}
