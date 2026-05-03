// TEBIQ Eval Lab V0 — localStorage helpers (browser only).

import {
  EMPTY_ANNOTATION,
  EMPTY_DEEPSEEK,
  EMPTY_TEBIQ,
  type Annotation,
  type DeepseekRawSnapshot,
  type EvalLabState,
  type EvalQuestion,
  type TebiqAnswerSnapshot,
} from './types'
import { STARTER_QUESTIONS } from './starter-questions'

export const STORAGE_KEY = 'tebiq_eval_lab_v0'
export const SCHEMA_VERSION = 'eval-lab-v0' as const

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function generateId(): string {
  if (isBrowser() && typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `q_${crypto.randomUUID().slice(0, 12)}`
  }
  return `q_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`
}

export function makeStarterQuestion(question: string, starter_tag: string): EvalQuestion {
  return {
    id: generateId(),
    question,
    source: 'starter',
    starter_tag,
    deepseek_raw: { ...EMPTY_DEEPSEEK },
    tebiq: { ...EMPTY_TEBIQ },
    annotation: { ...EMPTY_ANNOTATION },
    created_at: new Date().toISOString(),
  }
}

export function makeManualQuestion(question: string, source: 'imported' | 'manual' = 'manual'): EvalQuestion {
  return {
    id: generateId(),
    question,
    source,
    deepseek_raw: { ...EMPTY_DEEPSEEK },
    tebiq: { ...EMPTY_TEBIQ },
    annotation: { ...EMPTY_ANNOTATION },
    created_at: new Date().toISOString(),
  }
}

export function loadState(): EvalQuestion[] {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedWithStarters()
    const parsed = JSON.parse(raw) as Partial<EvalLabState> | EvalQuestion[]
    if (Array.isArray(parsed)) return parsed
    if (parsed && Array.isArray(parsed.questions)) return parsed.questions
    return seedWithStarters()
  } catch {
    return []
  }
}

export function saveState(questions: EvalQuestion[]): void {
  if (!isBrowser()) return
  try {
    const state: EvalLabState = {
      schema_version: SCHEMA_VERSION,
      exported_at: new Date().toISOString(),
      questions,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // quota / private mode — silent
  }
}

function seedWithStarters(): EvalQuestion[] {
  const seeded = STARTER_QUESTIONS.map(s => makeStarterQuestion(s.question, s.starter_tag))
  saveState(seeded)
  return seeded
}

export function resetToStarters(): EvalQuestion[] {
  if (!isBrowser()) return []
  window.localStorage.removeItem(STORAGE_KEY)
  return seedWithStarters()
}

export function updateAnnotation(qs: EvalQuestion[], id: string, patch: Partial<Annotation>): EvalQuestion[] {
  return qs.map(q =>
    q.id === id
      ? {
        ...q,
        annotation: {
          ...q.annotation,
          ...patch,
          annotated_at: new Date().toISOString(),
        },
      }
      : q,
  )
}

export function updateDeepseek(qs: EvalQuestion[], id: string, patch: Partial<DeepseekRawSnapshot>): EvalQuestion[] {
  return qs.map(q =>
    q.id === id ? { ...q, deepseek_raw: { ...q.deepseek_raw, ...patch } } : q,
  )
}

export function updateTebiq(qs: EvalQuestion[], id: string, patch: Partial<TebiqAnswerSnapshot>): EvalQuestion[] {
  return qs.map(q => (q.id === id ? { ...q, tebiq: { ...q.tebiq, ...patch } } : q))
}

export function addQuestions(qs: EvalQuestion[], texts: string[], source: 'imported' | 'manual'): EvalQuestion[] {
  const additions = texts
    .map(t => t.trim())
    .filter(Boolean)
    .map(t => makeManualQuestion(t, source))
  return [...qs, ...additions]
}

export function removeQuestion(qs: EvalQuestion[], id: string): EvalQuestion[] {
  return qs.filter(q => q.id !== id)
}

// ---------- import / export ----------

export function exportFullJSON(qs: EvalQuestion[]): string {
  const state: EvalLabState = {
    schema_version: SCHEMA_VERSION,
    exported_at: new Date().toISOString(),
    questions: qs,
  }
  return JSON.stringify(state, null, 2)
}

// Golden-case export: only the fields per spec §6
export function exportGoldenJSON(qs: EvalQuestion[]): string {
  const items = qs.map(q => ({
    question: q.question,
    deepseek_raw_answer: q.deepseek_raw.text,
    tebiq_answer_text: q.tebiq.visible_text,
    tebiq_answer_id: q.tebiq.answer_id,
    score: q.annotation.score,
    severity: q.annotation.severity,
    direction_correct: q.annotation.direction_correct,
    must_have: q.annotation.must_have,
    must_not_have: q.annotation.must_not_have,
    should_handoff: q.annotation.should_handoff,
    action: q.annotation.action,
    starter_tag: q.starter_tag ?? null,
    annotated_at: q.annotation.annotated_at,
  }))
  return JSON.stringify({
    schema_version: 'eval-lab-golden-v0',
    exported_at: new Date().toISOString(),
    items,
  }, null, 2)
}

export function importJSON(text: string): EvalQuestion[] | null {
  try {
    const parsed = JSON.parse(text) as unknown
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const obj = parsed as Partial<EvalLabState>
      if (Array.isArray(obj.questions)) return obj.questions
    }
    if (Array.isArray(parsed)) return parsed as EvalQuestion[]
    return null
  } catch {
    return null
  }
}
