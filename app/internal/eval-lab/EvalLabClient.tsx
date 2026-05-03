'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  addQuestions,
  exportFullJSON,
  exportGoldenJSON,
  importJSON,
  loadState,
  removeQuestion,
  resetToStarters,
  saveState,
  updateAnnotation,
  updateDeepseek,
  updateTebiq,
} from '@/lib/eval-lab/storage'
import type { Action, Annotation, EvalQuestion, Severity, YesNo } from '@/lib/eval-lab/types'

// TEBIQ Eval Lab V0 — internal annotation tool.
//
// Three-column layout:
//   left   — question list with filter
//   center — DeepSeek raw vs TEBIQ pipeline output, side-by-side
//   right  — annotation form
//
// Desktop-first; a narrow viewport will scroll horizontally.

type FilterMode = 'all' | 'unannotated' | 'p0' | 'p1' | 'launchable_no'

export default function EvalLabClient() {
  const [questions, setQuestions] = useState<EvalQuestion[]>([])
  const [loaded, setLoaded] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterMode>('all')
  const [importText, setImportText] = useState('')
  const [busyDeepseek, setBusyDeepseek] = useState<Set<string>>(new Set())
  const [busyTebiq, setBusyTebiq] = useState<Set<string>>(new Set())
  const [batchBusy, setBatchBusy] = useState(false)

  useEffect(() => {
    const initial = loadState()
    setQuestions(initial)
    setSelectedId(initial[0]?.id ?? null)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) saveState(questions)
  }, [questions, loaded])

  const filtered = useMemo(() => filterQuestions(questions, filter), [questions, filter])
  const selected = questions.find(q => q.id === selectedId) ?? null

  // ---- generation handlers ----
  const generateDeepseekRaw = async (q: EvalQuestion) => {
    setBusyDeepseek(prev => new Set(prev).add(q.id))
    try {
      const r = await fetch('/api/internal/eval-lab/deepseek-raw', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: q.question }),
      })
      const j = await r.json() as { ok?: boolean; text?: string; error?: string }
      if (j.ok && j.text) {
        setQuestions(prev => updateDeepseek(prev, q.id, {
          text: j.text!,
          generated_at: new Date().toISOString(),
          generation_error: null,
        }))
      } else {
        setQuestions(prev => updateDeepseek(prev, q.id, {
          generation_error: j.error ?? `HTTP ${r.status}`,
          generated_at: new Date().toISOString(),
        }))
      }
    } catch (err) {
      setQuestions(prev => updateDeepseek(prev, q.id, {
        generation_error: err instanceof Error ? err.message : String(err),
        generated_at: new Date().toISOString(),
      }))
    } finally {
      setBusyDeepseek(prev => {
        const next = new Set(prev)
        next.delete(q.id)
        return next
      })
    }
  }

  const generateTebiqAnswer = async (q: EvalQuestion) => {
    setBusyTebiq(prev => new Set(prev).add(q.id))
    try {
      const r = await fetch('/api/internal/eval-lab/tebiq-answer', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: q.question }),
      })
      const j = await r.json() as Record<string, unknown>
      if (j.ok) {
        setQuestions(prev => updateTebiq(prev, q.id, {
          answer_id: (j.answer_id as string | null) ?? null,
          answer_link: (j.answer_link as string | null) ?? null,
          status: (j.status as string | null) ?? null,
          domain: (j.domain as string | null) ?? null,
          engine_version: (j.engine_version as string | null) ?? null,
          fallback_reason: (j.fallback_reason as string | null) ?? null,
          visible_text: (j.visible_text as string | null) ?? null,
          title: (j.title as string | null) ?? null,
          summary: (j.summary as string | null) ?? null,
          generated_at: new Date().toISOString(),
          generation_error: null,
        }))
      } else {
        setQuestions(prev => updateTebiq(prev, q.id, {
          generation_error: (j.error as string | undefined) ?? `HTTP ${r.status}`,
          generated_at: new Date().toISOString(),
        }))
      }
    } catch (err) {
      setQuestions(prev => updateTebiq(prev, q.id, {
        generation_error: err instanceof Error ? err.message : String(err),
        generated_at: new Date().toISOString(),
      }))
    } finally {
      setBusyTebiq(prev => {
        const next = new Set(prev)
        next.delete(q.id)
        return next
      })
    }
  }

  const batchGenerate = async () => {
    setBatchBusy(true)
    try {
      // Snapshot to avoid racing with state updates from individual handlers.
      const snapshot = questions
      const todo = snapshot.filter(q => !q.deepseek_raw.text || !q.tebiq.answer_id)
      for (const q of todo) {
        const tasks: Promise<unknown>[] = []
        if (!q.deepseek_raw.text) tasks.push(generateDeepseekRaw(q))
        if (!q.tebiq.answer_id) tasks.push(generateTebiqAnswer(q))
        await Promise.all(tasks)
      }
    } finally {
      setBatchBusy(false)
    }
  }

  // ---- annotation handlers ----
  const onAnnotate = (id: string, patch: Partial<Annotation>) => {
    setQuestions(prev => updateAnnotation(prev, id, patch))
  }

  const goNextUnannotated = () => {
    const idx = filtered.findIndex(q => q.id === selectedId)
    const start = idx >= 0 ? idx + 1 : 0
    for (let i = start; i < filtered.length; i += 1) {
      if (filtered[i].annotation.score === null) {
        setSelectedId(filtered[i].id)
        return
      }
    }
    // wrap
    for (let i = 0; i < start; i += 1) {
      if (filtered[i].annotation.score === null) {
        setSelectedId(filtered[i].id)
        return
      }
    }
  }

  // ---- import / export ----
  const onImport = () => {
    const trimmed = importText.trim()
    if (!trimmed) return
    // Try JSON first; if fails, treat as line-per-question textarea.
    const asJson = importJSON(trimmed)
    if (asJson) {
      setQuestions(asJson)
      setSelectedId(asJson[0]?.id ?? null)
      setImportText('')
      return
    }
    const lines = trimmed.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
    if (lines.length === 0) return
    setQuestions(prev => addQuestions(prev, lines, 'imported'))
    setImportText('')
  }

  const onExportFull = () => download('eval-lab-full.json', exportFullJSON(questions))
  const onExportGolden = () => download('eval-lab-golden.json', exportGoldenJSON(questions))

  const onResetStarters = () => {
    if (!confirm('清空当前所有题目和标注，恢复内置 starter pack？')) return
    const fresh = resetToStarters()
    setQuestions(fresh)
    setSelectedId(fresh[0]?.id ?? null)
  }

  const onRemoveSelected = () => {
    if (!selected) return
    if (!confirm(`移除：${selected.question}\n\n该题目的标注会一起删除。`)) return
    setQuestions(prev => removeQuestion(prev, selected.id))
    setSelectedId(null)
  }

  if (!loaded) {
    return <div className="p-6 text-sm text-slate-500">加载中…</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-mono">
      <header className="border-b border-slate-300 bg-white px-4 py-3 flex flex-wrap items-center gap-3">
        <h1 className="text-base font-semibold tracking-tight">TEBIQ Eval Lab V0 · 内部</h1>
        <div className="text-xs text-slate-500">
          {questions.length} 题 · 已标 {questions.filter(q => q.annotation.score !== null).length} ·
          P0 {questions.filter(q => q.annotation.severity === 'P0').length} ·
          P1 {questions.filter(q => q.annotation.severity === 'P1').length}
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={batchGenerate} disabled={batchBusy} className="text-xs px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100 disabled:opacity-50">
            {batchBusy ? '批量生成中…' : '批量生成未生成'}
          </button>
          <button onClick={onExportFull} className="text-xs px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100">导出完整 JSON</button>
          <button onClick={onExportGolden} className="text-xs px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100">导出 golden JSON</button>
          <button onClick={onResetStarters} className="text-xs px-3 py-1.5 border border-red-300 rounded bg-white text-red-600 hover:bg-red-50">恢复 starter</button>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-3 p-3" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Left — question list */}
        <aside className="col-span-3 bg-white border border-slate-300 rounded p-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 76px)' }}>
          <div className="flex items-center gap-2 text-xs mb-2">
            <span>筛选</span>
            <select value={filter} onChange={e => setFilter(e.target.value as FilterMode)} className="border border-slate-300 rounded px-1 py-0.5">
              <option value="all">全部</option>
              <option value="unannotated">未标</option>
              <option value="p0">P0</option>
              <option value="p1">P1</option>
              <option value="launchable_no">不可上线</option>
            </select>
            <span className="ml-auto text-slate-500">{filtered.length}</span>
          </div>
          <ul className="space-y-1">
            {filtered.map(q => {
              const isSel = q.id === selectedId
              const annotated = q.annotation.score !== null
              const sev = q.annotation.severity
              const sevColor =
                sev === 'P0' ? 'text-red-700 bg-red-50' :
                sev === 'P1' ? 'text-orange-700 bg-orange-50' :
                sev === 'P2' ? 'text-amber-700 bg-amber-50' :
                sev === 'OK' ? 'text-emerald-700 bg-emerald-50' :
                'text-slate-400'
              return (
                <li key={q.id}>
                  <button
                    onClick={() => setSelectedId(q.id)}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded border ${isSel ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      <span className={`inline-block px-1 rounded ${sevColor}`} style={{ minWidth: 22, textAlign: 'center' }}>
                        {sev || (annotated ? '·' : ' ')}
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        {q.deepseek_raw.text ? 'D' : '·'}{q.tebiq.answer_id ? 'T' : '·'}
                      </span>
                      <span className="truncate flex-1" title={q.question}>{q.question}</span>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <textarea
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="粘贴新问题（每行一个），或粘贴完整 JSON"
              className="w-full h-24 p-2 text-xs border border-slate-300 rounded font-mono"
            />
            <button onClick={onImport} disabled={!importText.trim()} className="mt-1 w-full text-xs px-2 py-1 border border-slate-400 rounded bg-white hover:bg-slate-100 disabled:opacity-50">导入 / 追加</button>
          </div>
        </aside>

        {/* Center — comparison */}
        <section className="col-span-6 bg-white border border-slate-300 rounded p-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 76px)' }}>
          {!selected ? (
            <p className="text-sm text-slate-500">从左侧选一题。</p>
          ) : (
            <div className="space-y-3">
              <header>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{selected.starter_tag ?? selected.source}</p>
                <h2 className="text-sm font-semibold text-slate-900 leading-tight mt-1">{selected.question}</h2>
              </header>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-slate-200 rounded p-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">DeepSeek 裸答</span>
                    <button
                      onClick={() => generateDeepseekRaw(selected)}
                      disabled={busyDeepseek.has(selected.id)}
                      className="text-[11px] px-2 py-0.5 border border-slate-300 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
                    >
                      {busyDeepseek.has(selected.id) ? '生成中…' : (selected.deepseek_raw.text ? '重新生成' : '生成')}
                    </button>
                  </div>
                  {selected.deepseek_raw.generation_error && (
                    <p className="text-[11px] text-red-600">err: {selected.deepseek_raw.generation_error}</p>
                  )}
                  <pre className="text-[12px] whitespace-pre-wrap leading-[1.6] text-slate-800">{selected.deepseek_raw.text ?? '（未生成）'}</pre>
                </div>

                <div className="border border-slate-200 rounded p-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">TEBIQ 当前输出</span>
                    <button
                      onClick={() => generateTebiqAnswer(selected)}
                      disabled={busyTebiq.has(selected.id)}
                      className="text-[11px] px-2 py-0.5 border border-slate-300 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
                    >
                      {busyTebiq.has(selected.id) ? '生成中…' : (selected.tebiq.answer_id ? '重新生成' : '生成')}
                    </button>
                  </div>
                  {selected.tebiq.generation_error && (
                    <p className="text-[11px] text-red-600">err: {selected.tebiq.generation_error}</p>
                  )}
                  {selected.tebiq.answer_id && (
                    <div className="text-[11px] text-slate-600 space-y-0.5 mb-2 border-b border-slate-100 pb-2">
                      <p>
                        <a href={selected.tebiq.answer_link ?? '#'} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{selected.tebiq.answer_link}</a>
                      </p>
                      <p>
                        engine={selected.tebiq.engine_version} · status={selected.tebiq.status} · domain={selected.tebiq.domain}
                        {selected.tebiq.fallback_reason ? ` · fallback=${selected.tebiq.fallback_reason}` : ''}
                      </p>
                    </div>
                  )}
                  {selected.tebiq.title && (
                    <p className="text-[12px] font-semibold mb-1">{selected.tebiq.title}</p>
                  )}
                  <pre className="text-[12px] whitespace-pre-wrap leading-[1.6] text-slate-800">{selected.tebiq.visible_text ?? '（未生成）'}</pre>
                </div>
              </div>

              <div className="flex gap-2 text-[11px]">
                <button onClick={onRemoveSelected} className="px-2 py-1 border border-red-200 rounded bg-white text-red-600 hover:bg-red-50">移除该题</button>
                <button onClick={goNextUnannotated} className="ml-auto px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100">下一题（未标）</button>
              </div>
            </div>
          )}
        </section>

        {/* Right — annotation form */}
        <aside className="col-span-3 bg-white border border-slate-300 rounded p-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 76px)' }}>
          {!selected ? (
            <p className="text-sm text-slate-500">先选一题。</p>
          ) : (
            <AnnotationForm
              ann={selected.annotation}
              onChange={patch => onAnnotate(selected.id, patch)}
            />
          )}
        </aside>
      </main>
    </div>
  )
}

// ---------- annotation form ----------

function AnnotationForm({ ann, onChange }: { ann: Annotation; onChange: (patch: Partial<Annotation>) => void }) {
  return (
    <form className="space-y-3 text-xs">
      <Field label="score (1–5)">
        <select
          value={ann.score ?? ''}
          onChange={e => onChange({ score: e.target.value ? (Number(e.target.value) as 1 | 2 | 3 | 4 | 5) : null })}
          className="w-full border border-slate-300 rounded px-2 py-1"
        >
          <option value="">—</option>
          {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </Field>

      <Field label="severity">
        <select
          value={ann.severity}
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

      <YesNoField label="可以上线 (launchable)" value={ann.launchable} onChange={v => onChange({ launchable: v })} />
      <YesNoField label="方向正确" value={ann.direction_correct} onChange={v => onChange({ direction_correct: v })} />
      <YesNoField label="答到了问题" value={ann.answered_question} onChange={v => onChange({ answered_question: v })} />
      <YesNoField label="危险断言" value={ann.dangerous_claim} onChange={v => onChange({ dangerous_claim: v })} />
      <YesNoField label="hallucination" value={ann.hallucination} onChange={v => onChange({ hallucination: v })} />
      <YesNoField label="应交给行政書士 (handoff)" value={ann.should_handoff} onChange={v => onChange({ should_handoff: v })} />

      <Field label="must_have">
        <textarea value={ann.must_have} onChange={e => onChange({ must_have: e.target.value })} rows={2} className="w-full border border-slate-300 rounded px-2 py-1 font-mono text-xs" />
      </Field>
      <Field label="must_not_have">
        <textarea value={ann.must_not_have} onChange={e => onChange({ must_not_have: e.target.value })} rows={2} className="w-full border border-slate-300 rounded px-2 py-1 font-mono text-xs" />
      </Field>
      <Field label="missing_points">
        <textarea value={ann.missing_points} onChange={e => onChange({ missing_points: e.target.value })} rows={2} className="w-full border border-slate-300 rounded px-2 py-1 font-mono text-xs" />
      </Field>
      <Field label="reviewer_note">
        <textarea value={ann.reviewer_note} onChange={e => onChange({ reviewer_note: e.target.value })} rows={2} className="w-full border border-slate-300 rounded px-2 py-1 font-mono text-xs" />
      </Field>

      <Field label="action">
        <select
          value={ann.action}
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

      {ann.annotated_at && (
        <p className="text-[10px] text-slate-400">last saved: {ann.annotated_at}</p>
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

function YesNoField({ label, value, onChange }: { label: string; value: YesNo; onChange: (v: YesNo) => void }) {
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
                ? opt === 'yes' ? 'bg-emerald-100 border-emerald-400 text-emerald-700'
                : opt === 'no' ? 'bg-red-100 border-red-400 text-red-700'
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

function filterQuestions(qs: EvalQuestion[], mode: FilterMode): EvalQuestion[] {
  switch (mode) {
    case 'unannotated':
      return qs.filter(q => q.annotation.score === null)
    case 'p0':
      return qs.filter(q => q.annotation.severity === 'P0')
    case 'p1':
      return qs.filter(q => q.annotation.severity === 'P1')
    case 'launchable_no':
      return qs.filter(q => q.annotation.launchable === 'no')
    case 'all':
    default:
      return qs
  }
}

function download(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 0)
}
