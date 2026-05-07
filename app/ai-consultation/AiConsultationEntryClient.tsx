'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Archive,
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  FileText,
  Loader2,
  MessageSquarePlus,
  RefreshCcw,
  Send,
  Share2,
  Upload,
} from 'lucide-react'
import {
  BrandHeader,
  ConsultationShell,
  MetaPill,
  RiskHintBanner,
  SectionLabel,
  StatusBadge,
  Surface,
  cx,
  feedbackLabel,
  type AlphaDisplayState,
} from '@/components/ui/consultation-alpha'
import {
  parseConsultationChunk,
  type ConsultationEvent,
} from '@/lib/consultation/stream-protocol'

type Phase =
  | 'idle'
  | 'received'
  | 'streaming'
  | 'still_generating'
  | 'completed'
  | 'timeout'
  | 'failed'

type PhotoState =
  | { kind: 'idle' }
  | { kind: 'recognizing'; preview: string; filename: string }
  | { kind: 'ready'; preview: string; filename: string; summary: string; storageRef: string; confidence: string }
  | { kind: 'error'; message: string }

type FeedbackType = 'helpful' | 'inaccurate' | 'add_context' | 'human_review' | 'saved'

type FollowUpPhase = Phase | 'limit_reached'

interface FollowUpTurn {
  localId: string
  id: string
  addition: string
  answer: string
  risk_keywords: string[]
  routingStatus: {
    label: string
    level: 'initial' | 'specific'
    buckets: string[]
  } | null
  phase: FollowUpPhase
  first_token_latency_ms: number | null
  total_latency_ms: number | null
  redactions_count: number | null
  fallback_text: string | null
  partial_answer_saved: boolean
  detail: string | null
}

interface ActiveConsultation {
  id: string
  question: string
  photoSummary: string | null
  photoStorageRef: string | null
  photoPreview: string | null
  answer: string
  risk_keywords: string[]
  routingStatus: {
    label: string
    level: 'initial' | 'specific'
    buckets: string[]
  } | null
  phase: Phase
  first_token_latency_ms: number | null
  total_latency_ms: number | null
  redactions_count: number | null
  fallback_text: string | null
  partial_answer_saved: boolean
  detail: string | null
  feedback_sent: FeedbackType | null
  saved: boolean
  followUps: FollowUpTurn[]
  followUpCount: number
  followUpLimitReached: boolean
  followUpLimitMessage: string | null
}

type ConsultationStartPayload = {
  text: string
  photoSummary: string | null
  photoStorageRef: string | null
  photoPreview: string | null
}

type WaitingStage = 'early' | 'long' | 'escape'

const FEEDBACK_BUTTONS: Array<{ type: FeedbackType; label: string }> = [
  { type: 'helpful', label: '有帮助' },
  { type: 'inaccurate', label: '不准确' },
  { type: 'human_review', label: '想找人工确认' },
]

function ensureViewerCookie(): string {
  if (typeof document === 'undefined') return ''
  const existing = document.cookie
    .split(';')
    .map(s => s.trim())
    .find(s => s.startsWith('tebiq_viewer='))
  if (existing) return decodeURIComponent(existing.slice('tebiq_viewer='.length))
  const id = 'v_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
  const expires = new Date(Date.now() + 365 * 24 * 3600 * 1000).toUTCString()
  document.cookie = `tebiq_viewer=${encodeURIComponent(id)}; path=/; expires=${expires}; samesite=lax`
  return id
}

export default function AiConsultationEntryClient() {
  const [question, setQuestion] = useState('')
  const [active, setActive] = useState<ActiveConsultation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [viewerId, setViewerId] = useState<string>('')
  const [photo, setPhoto] = useState<PhotoState>({ kind: 'idle' })
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const streamRunRef = useRef(0)

  useEffect(() => {
    setViewerId(ensureViewerCookie())
  }, [])

  useEffect(() => () => {
    abortRef.current?.abort()
    if (photo.kind === 'recognizing' || photo.kind === 'ready') {
      try { URL.revokeObjectURL(photo.preview) } catch { /* ignore */ }
    }
  }, [photo])

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (photo.kind === 'recognizing' || photo.kind === 'ready') {
      try { URL.revokeObjectURL(photo.preview) } catch { /* ignore */ }
    }
    if (file.size > 10 * 1024 * 1024) {
      setPhoto({ kind: 'error', message: '图片超过 10MB，请压缩后再上传。' })
      e.target.value = ''
      return
    }
    const preview = URL.createObjectURL(file)
    setPhoto({ kind: 'recognizing', preview, filename: file.name })
    setError(null)

    try {
      const fd = new FormData()
      fd.append('file', file)
      const r = await fetch('/api/consultation/upload', { method: 'POST', body: fd })
      const j = (await r.json().catch(() => ({}))) as {
        image_summary?: string
        image_storage_ref?: string
        recognition?: { confidence?: string }
        error?: string
        detail?: string
      }
      if (!r.ok || !j.image_summary || !j.image_storage_ref) {
        setPhoto({ kind: 'error', message: j.detail || j.error || `识别失败 HTTP ${r.status}` })
        return
      }
      setPhoto({
        kind: 'ready',
        preview,
        filename: file.name,
        summary: j.image_summary,
        storageRef: j.image_storage_ref,
        confidence: j.recognition?.confidence ?? 'unknown',
      })
    } catch (err) {
      setPhoto({ kind: 'error', message: err instanceof Error ? err.message : String(err) })
    } finally {
      e.target.value = ''
    }
  }

  function clearPhoto() {
    if (photo.kind === 'recognizing' || photo.kind === 'ready') {
      try { URL.revokeObjectURL(photo.preview) } catch { /* ignore */ }
    }
    setPhoto({ kind: 'idle' })
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text = question.trim()
    if (!text) return
    if (active && !isTerminal(active.phase)) return
    if (photo.kind === 'recognizing') return

    const photoSummary = photo.kind === 'ready' ? photo.summary : null
    const photoStorageRef = photo.kind === 'ready' ? photo.storageRef : null
    const photoPreview = photo.kind === 'ready' ? photo.preview : null

    await startConsultation({ text, photoSummary, photoStorageRef, photoPreview })
  }

  async function startConsultation({
    text,
    photoSummary,
    photoStorageRef,
    photoPreview,
  }: ConsultationStartPayload) {
    abortRef.current?.abort()
    const runId = streamRunRef.current + 1
    streamRunRef.current = runId
    setError(null)

    setActive({
      id: '',
      question: text,
      photoSummary,
      photoStorageRef,
      photoPreview,
      answer: '',
      risk_keywords: [],
      routingStatus: null,
      phase: 'idle',
      first_token_latency_ms: null,
      total_latency_ms: null,
      redactions_count: null,
      fallback_text: null,
      partial_answer_saved: false,
      detail: null,
      feedback_sent: null,
      saved: false,
      followUps: [],
      followUpCount: 0,
      followUpLimitReached: false,
      followUpLimitMessage: null,
    })

    const ac = new AbortController()
    abortRef.current = ac

    let res: Response
    try {
      res = await fetch('/api/consultation/stream', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question: text,
          viewer_id: viewerId,
          image_summary: photoSummary,
          image_storage_ref: photoStorageRef,
        }),
        signal: ac.signal,
      })
    } catch (err) {
      if (streamRunRef.current === runId) {
        setActive(prev => prev ? { ...prev, phase: 'failed', detail: err instanceof Error ? err.message : String(err) } : prev)
      }
      return
    }
    if (!res.ok || !res.body) {
      const j = (await res.json().catch(() => ({}))) as { error?: string; detail?: string }
      if (streamRunRef.current === runId) {
        setActive(prev => prev ? { ...prev, phase: 'failed', detail: j.detail ?? j.error ?? `HTTP ${res.status}` } : prev)
      }
      return
    }

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
    let buffer = ''
    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += value
        const { events, remainder } = parseConsultationChunk(buffer)
        buffer = remainder
        for (const ev of events) applyEvent(ev, runId)
      }
    } catch (err) {
      if ((err as { name?: string })?.name === 'AbortError') return
      if (streamRunRef.current === runId) {
        setActive(prev => prev ? { ...prev, phase: 'failed', detail: err instanceof Error ? err.message : String(err) } : prev)
      }
    } finally {
      try { reader.releaseLock() } catch { /* ignore */ }
    }
  }

  function applyEvent(ev: ConsultationEvent, runId: number) {
    setActive(prev => {
      if (!prev) return prev
      if (streamRunRef.current !== runId) return prev
      switch (ev.event) {
        case 'received':
          return { ...prev, id: ev.consultation_id, phase: 'received' }
        case 'risk_hint':
          return { ...prev, risk_keywords: ev.risk_keyword_hits.slice() }
        case 'routing_status':
          return {
            ...prev,
            routingStatus: {
              label: ev.status_label,
              level: ev.level,
              buckets: ev.buckets.slice(),
            },
          }
        case 'fact_cards_injected':
          // 0.6 ENGINE Pack 2.2: matcher audit announcement. CODEXUI
          // Workstream G owns the UI rendering ("今日有效事实命中"
          // hint); this client doesn't surface it yet. Returning
          // `prev` keeps the existing UX while making the switch
          // exhaustive over the new event.
          return prev
        case 'follow_up_limit_reached':
          // 0.6 ENGINE Pack 2.3: emitted only by the
          // /api/consultation/follow-up endpoint when the chain has
          // already had 3 follow-ups (4th attempt rejected). The
          // initial /api/consultation/stream call this client makes
          // never sees this event; CODEXUI Workstream D-UI owns
          // rendering it on the follow-up surface. No-op here keeps
          // the union exhaustive.
          return prev
        case 'still_generating':
          return prev.phase === 'received' ? { ...prev, phase: 'still_generating' } : prev
        case 'first_token':
          return { ...prev, phase: 'streaming', first_token_latency_ms: ev.first_token_latency_ms }
        case 'answer_chunk':
          return { ...prev, answer: prev.answer + ev.chunk }
        case 'completed':
          return {
            ...prev,
            phase: 'completed',
            total_latency_ms: ev.total_latency_ms,
            redactions_count: ev.redactions_count,
          }
        case 'timeout':
          return {
            ...prev,
            phase: 'timeout',
            fallback_text: ev.fallback_text,
            partial_answer_saved: ev.partial_answer_saved,
            detail: ev.partial_answer_saved
              ? '已保留部分回答；这条不能当作完整回答。'
              : '没有生成可用完整回答。',
          }
        case 'failed':
          return { ...prev, phase: 'failed', detail: ev.detail }
        case 'follow_up_limit_reached':
          return {
            ...prev,
            followUpLimitReached: true,
            followUpLimitMessage: ev.message,
          }
      }
    })
  }

  async function submitFollowUp(addition: string) {
    if (!active?.id) return
    if (active.followUpLimitReached || active.followUpCount >= 3) {
      setActive(prev => prev ? {
        ...prev,
        followUpLimitReached: true,
        followUpLimitMessage: '这次咨询已经补充过几轮。建议先保存，或把关键点给人工确认；如果是另一个事项，可以重新开始。',
      } : prev)
      return
    }
    if (active.followUps.some(turn => !isFollowUpTerminal(turn.phase))) return

    const text = addition.trim()
    if (!text) return
    setError(null)

    const localId = 'fu_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    const turn = createFollowUpTurn(localId, text)
    setActive(prev => prev ? { ...prev, followUps: [...prev.followUps, turn] } : prev)

    const ac = new AbortController()
    abortRef.current = ac

    let res: Response
    try {
      res = await fetch('/api/consultation/follow-up', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          parent_consultation_id: active.id,
          user_addition: text,
        }),
        signal: ac.signal,
      })
    } catch (err) {
      applyFollowUpError(localId, err instanceof Error ? err.message : String(err))
      return
    }

    if (!res.ok || !res.body) {
      const j = (await res.json().catch(() => ({}))) as { error?: string; detail?: string }
      applyFollowUpError(localId, j.detail ?? j.error ?? `HTTP ${res.status}`)
      return
    }

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
    let buffer = ''
    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += value
        const { events, remainder } = parseConsultationChunk(buffer)
        buffer = remainder
        for (const ev of events) applyFollowUpEvent(localId, ev)
      }
    } catch (err) {
      if ((err as { name?: string })?.name === 'AbortError') return
      applyFollowUpError(localId, err instanceof Error ? err.message : String(err))
    } finally {
      try { reader.releaseLock() } catch { /* ignore */ }
    }
  }

  function applyFollowUpError(localId: string, detail: string) {
    setActive(prev => prev ? {
      ...prev,
      followUps: prev.followUps.map((turn): FollowUpTurn => (
        turn.localId === localId
          ? { ...turn, phase: 'failed' as const, detail }
          : turn
      )),
    } : prev)
  }

  function applyFollowUpEvent(localId: string, ev: ConsultationEvent) {
    setActive(prev => {
      if (!prev) return prev
      let completedTurnIndex = -1
      const followUps = prev.followUps.map((turn, index): FollowUpTurn => {
        if (turn.localId !== localId) return turn
        switch (ev.event) {
          case 'received':
            return { ...turn, id: ev.consultation_id, phase: 'received' }
          case 'risk_hint':
            return { ...turn, risk_keywords: ev.risk_keyword_hits.slice() }
          case 'routing_status':
            return {
              ...turn,
              routingStatus: {
                label: ev.status_label,
                level: ev.level,
                buckets: ev.buckets.slice(),
              },
            }
          case 'still_generating':
            return turn.phase === 'received' ? { ...turn, phase: 'still_generating' } : turn
          case 'first_token':
            return { ...turn, phase: 'streaming', first_token_latency_ms: ev.first_token_latency_ms }
          case 'fact_cards_injected':
            return turn
          case 'answer_chunk':
            return { ...turn, answer: turn.answer + ev.chunk }
          case 'completed':
            completedTurnIndex = index
            return {
              ...turn,
              phase: 'completed',
              total_latency_ms: ev.total_latency_ms,
              redactions_count: ev.redactions_count,
            }
          case 'timeout':
            return {
              ...turn,
              phase: 'timeout',
              fallback_text: ev.fallback_text,
              partial_answer_saved: ev.partial_answer_saved,
              detail: ev.partial_answer_saved
                ? '已保留部分回答；这条不能当作完整回答。'
                : '没有生成可用完整回答。',
            }
          case 'failed':
            return { ...turn, phase: 'failed', detail: ev.detail }
          case 'follow_up_limit_reached':
            return { ...turn, phase: 'limit_reached', detail: ev.message }
        }
      })
      if (ev.event === 'follow_up_limit_reached') {
        return {
          ...prev,
          followUps,
          followUpLimitReached: true,
          followUpLimitMessage: ev.message,
        }
      }
      if (completedTurnIndex >= 0) {
        return {
          ...prev,
          followUps,
          followUpCount: Math.max(prev.followUpCount, completedTurnIndex + 1),
        }
      }
      return { ...prev, followUps }
    })
  }

  async function sendFeedback(type: FeedbackType) {
    if (!active || !active.id) return
    if (active.feedback_sent === type) return
    setActive(prev => prev ? { ...prev, feedback_sent: type, saved: type === 'saved' || prev.saved } : prev)
    try {
      const r = await fetch(`/api/consultation/${encodeURIComponent(active.id)}/feedback`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ feedback: type }),
      })
      if (!r.ok) {
        const j = (await r.json().catch(() => ({}))) as { error?: string }
        setError(j.error ?? `反馈提交失败 HTTP ${r.status}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  async function saveQuestion() {
    if (!active || !active.id) return
    setActive(prev => prev ? { ...prev, saved: true } : prev)
    try {
      await fetch(`/api/consultation/${encodeURIComponent(active.id)}/save`, { method: 'POST' })
    } catch { /* ignore */ }
  }

  function reset() {
    streamRunRef.current += 1
    abortRef.current?.abort()
    setActive(null)
    setQuestion('')
    setError(null)
    clearPhoto()
  }

  async function retryActiveConsultation() {
    if (!active) return
    await startConsultation({
      text: active.question,
      photoSummary: active.photoSummary,
      photoStorageRef: active.photoStorageRef,
      photoPreview: active.photoPreview,
    })
  }

  return (
    <ConsultationShell>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="AI 在留咨询 Alpha"
          title={active ? '咨询回答' : '先把问题说清楚'}
          description={
            active
              ? '回答完成后，可以继续补充情况，或先保存这次咨询。'
              : '文字或日文材料照片都可以先问。TEBIQ 会整理方向、风险提示和下一步确认点。'
          }
          action={
            <a
              href="/me/consultations"
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 text-[12px] text-[var(--tebiq-deep-slate)] sm:w-auto"
            >
              <Archive className="h-3.5 w-3.5" strokeWidth={1.6} />
              已保存咨询
            </a>
          }
        />

        {!active && (
          <form onSubmit={submit} className="space-y-3.5">
            <Surface className="space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <MessageSquarePlus className="h-4 w-4 shrink-0 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
                  <div className="min-w-0">
                    <SectionLabel>文字咨询</SectionLabel>
                    <p className="text-[13.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">把现在的情况直接写下来。已有日文材料时，也可以先加一张照片。</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={photo.kind === 'recognizing'}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] px-2.5 py-2 text-[12px] font-medium text-[var(--tebiq-ink-blue)] disabled:opacity-50"
                >
                  {photo.kind === 'ready' ? <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.6} /> : <Camera className="h-3.5 w-3.5" strokeWidth={1.6} />}
                  {photo.kind === 'ready' ? '已加图片' : '拍照'}
                </button>
              </div>
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                maxLength={4000}
                rows={5}
                placeholder="例：我是经管签，公司还没清算，能不能直接回国？"
                className="min-h-[132px] w-full resize-y rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] p-3.5 text-[16px] leading-[1.7] text-[var(--tebiq-ink-blue)] outline-none focus-visible:shadow-focus"
                required
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[11px] text-[var(--tebiq-cool-gray)]">{question.length} / 4000</span>
                <button
                  type="submit"
                  disabled={!question.trim() || photo.kind === 'recognizing'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-[var(--tebiq-ink-blue)] px-4 py-2.5 text-[14px] font-medium text-[var(--tebiq-off-white)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  {photo.kind === 'recognizing' ? (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
                  ) : (
                    <Send className="h-4 w-4" strokeWidth={1.6} />
                  )}
                  {photo.kind === 'recognizing' ? '识别中' : '开始咨询'}
                </button>
              </div>
            </Surface>

            <PhotoLiteCard
              photo={photo}
              fileInputRef={fileInputRef}
              onPickFile={onPickFile}
              clearPhoto={clearPhoto}
              resetPhoto={() => setPhoto({ kind: 'idle' })}
            />

            {error && (
              <Surface className="border-[var(--tebiq-warm-amber)] text-[13px] text-[var(--tebiq-ink-blue)]">
                {error}
              </Surface>
            )}

            <Surface className="flex items-center justify-between gap-3 p-3.5 text-[13px] text-[var(--tebiq-deep-slate)] sm:p-4">
              <span>保存过的咨询可以从这里找回。</span>
              <a href="/me/consultations" className="inline-flex items-center gap-1 font-medium text-[var(--tebiq-ink-blue)]">
                已保存咨询
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
              </a>
            </Surface>
          </form>
        )}

        {active && (
          <ActiveConsultationView
            active={active}
            error={error}
            onFeedback={sendFeedback}
            onSave={saveQuestion}
            onReset={reset}
            onRetry={retryActiveConsultation}
            onFollowUp={submitFollowUp}
          />
        )}

        <footer className="space-y-1 border-t border-[var(--tebiq-soft-gray)] pt-4 text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
          <p>这是 TEBIQ 1.0 Alpha，limited release。</p>
          <p>涉及具体期限、手续、个案审查时，建议向行政書士或入管确认。</p>
        </footer>
      </div>
    </ConsultationShell>
  )
}

function PhotoLiteCard({
  photo,
  fileInputRef,
  onPickFile,
  clearPhoto,
  resetPhoto,
}: {
  photo: PhotoState
  fileInputRef: React.RefObject<HTMLInputElement>
  onPickFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearPhoto: () => void
  resetPhoto: () => void
}) {
  return (
    <Surface className="space-y-3 p-3.5 sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
          <div>
            <SectionLabel>拍照咨询 Lite</SectionLabel>
            <p className="text-[13px] leading-[1.6] text-[var(--tebiq-deep-slate)]">适合入管通知、年金税金、雇佣相关材料。</p>
          </div>
        </div>
        {photo.kind === 'ready' && (
          <button type="button" onClick={clearPhoto} className="text-[12px] text-[var(--tebiq-deep-slate)]">
            移除
          </button>
        )}
      </div>

      {photo.kind === 'idle' && (
        <div className="rounded-card border border-dashed border-[var(--tebiq-cool-gray)] p-3.5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            capture="environment"
            onChange={onPickFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)]"
          >
            <Upload className="h-4 w-4" strokeWidth={1.6} />
            上传 / 拍照
          </button>
          <p className="mt-2 text-[12px] leading-[1.65] text-[var(--tebiq-cool-gray)]">
            图片只用于这次咨询的识别摘要，不做 OCR 档案系统。
          </p>
        </div>
      )}

      {photo.kind === 'recognizing' && (
        <div className="flex items-center gap-3 rounded-card border border-[var(--tebiq-soft-gray)] p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.preview} alt="预览" className="h-16 w-16 rounded-card border border-[var(--tebiq-soft-gray)] object-cover" />
          <div className="min-w-0">
            <p className="truncate text-[13px] text-[var(--tebiq-ink-blue)]">{photo.filename}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-[var(--tebiq-deep-slate)]">
              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.6} />
              正在识别图片内容
            </p>
          </div>
        </div>
      )}

      {photo.kind === 'ready' && (
        <div className="flex gap-3 rounded-card border border-[var(--tebiq-soft-gray)] p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.preview} alt="预览" className="h-20 w-20 shrink-0 rounded-card border border-[var(--tebiq-soft-gray)] object-cover" />
          <div className="min-w-0 text-[13px] leading-relaxed">
            <SectionLabel>识别摘要</SectionLabel>
            <p className="mt-1 text-[var(--tebiq-ink-blue)]">{photo.summary}</p>
            <p className="mt-1 text-[11px] text-[var(--tebiq-cool-gray)]">
              这不是最终判断。识别可信度：{photo.confidence}
            </p>
          </div>
        </div>
      )}

      {photo.kind === 'error' && (
        <div className="space-y-2 rounded-card border border-[var(--tebiq-warm-amber)] p-3 text-[13px] text-[var(--tebiq-ink-blue)]">
          <p>{photo.message}</p>
          <button type="button" onClick={resetPhoto} className="text-[12px] font-medium">
            重新选择图片
          </button>
        </div>
      )}
    </Surface>
  )
}

function ActiveConsultationView({
  active,
  error,
  onFeedback,
  onSave,
  onReset,
  onRetry,
  onFollowUp,
}: {
  active: ActiveConsultation
  error: string | null
  onFeedback: (type: FeedbackType) => void
  onSave: () => void
  onReset: () => void
  onRetry: () => void
  onFollowUp: (addition: string) => void
}) {
  const canAct = active.phase === 'completed'
  const canRecover = active.phase === 'timeout' || active.phase === 'failed'
  const answerHasStarted = active.answer.trim().length > 0 || active.phase === 'streaming' || isTerminal(active.phase)
  const isWaitingForAnswer = !answerHasStarted
  const [waitingStage, setWaitingStage] = useState<WaitingStage>('early')
  const [waitingChoice, setWaitingChoice] = useState<'idle' | 'continue' | 'saved'>('idle')
  const baseDisplayState = getDisplayState(active)
  const displayState: AlphaDisplayState =
    isWaitingForAnswer && waitingStage !== 'early' ? 'timeout_waiting' : baseDisplayState
  const hasRunningFollowUp = active.followUps.some(turn => !isFollowUpTerminal(turn.phase))
  const followUpLocked = active.followUpLimitReached || active.followUpCount >= 3
  const waitingStatus =
    isWaitingForAnswer
      ? getWaitingStatus(active, waitingStage)
      : null
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [shareState, setShareState] = useState<'idle' | 'shared' | 'copied' | 'failed'>('idle')
  const [shareContext, setShareContext] = useState({
    isWechat: false,
    isDesktop: false,
    canNativeShare: false,
  })
  const detailPath = active.id ? `/c/${encodeURIComponent(active.id)}` : '/me/consultations'
  const consultationUrl =
    typeof window === 'undefined'
      ? detailPath
      : new URL(detailPath, window.location.origin).toString()
  const canUseNativeShare = shareContext.canNativeShare && !shareContext.isWechat && !shareContext.isDesktop

  useEffect(() => {
    const ua = navigator.userAgent
    setShareContext({
      isWechat: /MicroMessenger/i.test(ua),
      isDesktop: !/Android|iPhone|iPad|iPod|Mobile/i.test(ua),
      canNativeShare: typeof navigator.share === 'function',
    })
  }, [])

  useEffect(() => {
    setWaitingStage('early')
    setWaitingChoice('idle')
    if (!isWaitingForAnswer) return

    const longTimer = window.setTimeout(() => setWaitingStage('long'), 17_000)
    const escapeTimer = window.setTimeout(() => setWaitingStage('escape'), 35_000)
    return () => {
      window.clearTimeout(longTimer)
      window.clearTimeout(escapeTimer)
    }
  }, [active.id, isWaitingForAnswer])

  async function writeClipboardText(text: string) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', 'true')
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(textarea)
    if (!copied) throw new Error('copy command failed')
  }

  async function copyConsultationLink() {
    if (!active.id) return
    try {
      await writeClipboardText(consultationUrl)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  async function shareConsultationLink() {
    if (!active.id) return
    if (!canUseNativeShare) {
      setShareState('failed')
      return
    }
    try {
      await navigator.share({
        title: 'TEBIQ 咨询记录',
        text: '这次咨询可以下次查看。',
        url: consultationUrl,
      })
      setShareState('shared')
    } catch {
      setShareState('failed')
    }
  }

  return (
    <section className="space-y-4">
      <Surface className="space-y-2">
        <SectionLabel>你的问题</SectionLabel>
        <p className="text-[16px] leading-[1.75] text-[var(--tebiq-ink-blue)]">{active.question}</p>
      </Surface>

      {active.photoSummary && (
        <Surface className="flex gap-3">
          {active.photoPreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={active.photoPreview} alt="提交的图片" className="h-16 w-16 shrink-0 rounded-card border border-[var(--tebiq-soft-gray)] object-cover" />
          )}
          <div className="min-w-0 text-[13.5px] leading-[1.7]">
            <SectionLabel>图片摘要</SectionLabel>
            <p className="mt-1 text-[var(--tebiq-deep-slate)]">{active.photoSummary}</p>
            <p className="mt-1 text-[11px] text-[var(--tebiq-cool-gray)]">只作为本次咨询上下文，不是文书判断。</p>
          </div>
        </Surface>
      )}

      <Surface className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
            <SectionLabel>咨询回答</SectionLabel>
          </div>
          <StatusBadge state={displayState} />
        </div>

        <RiskHintBanner hits={active.risk_keywords} />

        {(displayState === 'partial' || displayState === 'fallback' || displayState === 'timeout') && (
          <div className="rounded-card border border-[var(--tebiq-warm-amber)] px-3 py-2 text-[12.5px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
            {displayState === 'partial' && '回答中断，下面只保留已生成部分。'}
            {displayState === 'fallback' && '模型响应超时，下面是安全降级提示，不是完整咨询回答。'}
            {displayState === 'timeout' && '没有生成可用完整回答。'}
          </div>
        )}
        {displayState === 'failed' && (
          <div className="rounded-card border border-[var(--tebiq-warm-amber)] px-3 py-2 text-[12.5px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
            这次请求没有完成。可以直接重新生成这次回答，不需要重新输入问题。
          </div>
        )}

        <article className="min-h-[7.5rem] text-[16px] leading-[1.78] text-[var(--tebiq-ink-blue)]">
          {displayState === 'fallback' && active.fallback_text && (
            <p className="mb-3 text-[15px] leading-[1.7] text-[var(--tebiq-deep-slate)]">{active.fallback_text}</p>
          )}
          {active.answer.trim() && <AnswerProse text={active.answer} />}
          {waitingStatus && active.answer === '' && (
            <div className="rounded-card border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
              <div>
                <span className="inline-flex items-center gap-2">
                  {waitingStatus.showSpinner && (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
                  )}
                  {waitingStatus.main}
                </span>
                {waitingStatus.sub && (
                  <p className="mt-1 pl-6 text-[12px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
                    {waitingStatus.sub}
                  </p>
                )}
              </div>
              {waitingStatus.stage === 'escape' && (
                <div className="mt-3 space-y-2 border-t border-[var(--tebiq-soft-gray)] pt-3">
                  <div className="grid gap-2 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => setWaitingChoice('continue')}
                      className="inline-flex min-h-10 items-center justify-center rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-off-white)]"
                    >
                      继续等待
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSave()
                        setWaitingChoice('saved')
                      }}
                      disabled={!active.id || active.saved}
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)] disabled:opacity-60"
                    >
                      {active.saved ? '已保存' : '稍后回来'}
                    </button>
                    <button
                      type="button"
                      onClick={onRetry}
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)]"
                    >
                      <RefreshCcw className="h-3.5 w-3.5" strokeWidth={1.6} />
                      重新生成
                    </button>
                  </div>
                  {waitingChoice === 'continue' && (
                    <p className="text-[12px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
                      会继续在这里等待，正文一出现就会自动显示。
                    </p>
                  )}
                  {waitingChoice === 'saved' && (
                    <p className="text-[12px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
                      已保存到咨询记录。稍后可以从记录页回来查看。
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          {active.phase === 'received' && active.answer !== '' && (
            <span className="inline-flex items-center gap-2 text-[15px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
              已收到，正在整理咨询方向
            </span>
          )}
          {active.phase === 'streaming' && (
            <span className="ml-1 inline-block h-4 w-1.5 animate-pulse rounded-full bg-[var(--tebiq-cool-gray)] align-middle" />
          )}
        </article>

        {active.detail && active.phase !== 'streaming' && (
          <p className="border-t border-[var(--tebiq-soft-gray)] pt-3 text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
            {active.detail}
          </p>
        )}
      </Surface>

      {active.followUps.map((turn, index) => (
        <FollowUpTurnCard key={turn.localId} turn={turn} index={index} />
      ))}

      {canAct && (
        <Surface className="space-y-4">
          <div className="rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] px-3 py-3">
            <SectionLabel>继续这个咨询</SectionLabel>
            <p className="mt-1 text-[13.5px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
              当前主题仍然是：<span className="font-medium text-[var(--tebiq-ink-blue)]">{compactText(active.question, 54)}</span>
            </p>
            <p className="mt-1 text-[12.5px] leading-[1.65] text-[var(--tebiq-cool-gray)]">
              补充会接在上面的回答后继续整理，不是重新开一个问题。
            </p>
          </div>

          {followUpLocked ? (
            <FollowUpLimitCard
              message={active.followUpLimitMessage}
              onSave={onSave}
              onHumanReview={() => onFeedback('human_review')}
              onNewQuestion={onReset}
            />
          ) : (
            <FollowUpComposer
              disabled={hasRunningFollowUp}
              nextIndex={active.followUpCount + 1}
              onSubmit={onFollowUp}
            />
          )}

          <div className="space-y-3 border-t border-[var(--tebiq-soft-gray)] pt-3">
            <div>
              <SectionLabel>保存和下次查看</SectionLabel>
              <p className="mt-1 text-[13.5px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
                觉得这条回答有用，先保存。也可以复制链接发给自己，之后从已保存咨询里打开。
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                onClick={onSave}
                disabled={active.saved}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-off-white)] disabled:opacity-70"
              >
                {active.saved ? <CheckCircle2 className="h-4 w-4" strokeWidth={1.6} /> : <Archive className="h-4 w-4" strokeWidth={1.6} />}
                {active.saved ? '已保存' : '保存这次咨询'}
              </button>
              <button
                onClick={copyConsultationLink}
                disabled={!active.id}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)] disabled:opacity-50"
              >
                {copyState === 'copied' ? <ClipboardCheck className="h-4 w-4" strokeWidth={1.6} /> : <Copy className="h-4 w-4" strokeWidth={1.6} />}
                {copyState === 'copied' ? '已复制链接' : copyState === 'failed' ? '复制失败' : '复制咨询链接'}
              </button>
            </div>
            <p className="text-[12px] leading-[1.65] text-[var(--tebiq-cool-gray)]">
              {shareContext.isWechat
                ? '微信里也可以用右上角菜单发送给自己。复制链接仍然是最稳的方式。'
                : shareContext.isDesktop
                  ? '桌面端要发到微信或邮件时，建议先复制链接，再粘贴过去。'
                  : '手机浏览器可以复制链接；支持系统分享时，也可以用系统分享。'}
            </p>
          </div>

          <details className="rounded-card border border-[var(--tebiq-soft-gray)] px-3 py-2.5 text-[12.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
            <summary className="cursor-pointer font-medium text-[var(--tebiq-ink-blue)]">
              更多保存方式
            </summary>
            <div className="mt-3 space-y-3">
              <p>如果要发给自己，复制链接最稳定。微信内也可以使用右上角菜单。如果已经换成另一件事，可以重新开始。</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {canUseNativeShare && (
                  <button
                    onClick={shareConsultationLink}
                    disabled={!active.id}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)] disabled:opacity-50"
                  >
                    {shareState === 'shared'
                      ? <CheckCircle2 className="h-4 w-4" strokeWidth={1.6} />
                      : <Share2 className="h-4 w-4" strokeWidth={1.6} />}
                    {shareState === 'shared'
                      ? '已打开分享'
                      : shareState === 'failed'
                        ? '分享未完成'
                        : '打开系统分享'}
                  </button>
                )}
                <button
                  onClick={onReset}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)] disabled:opacity-50"
                >
                  <MessageSquarePlus className="h-4 w-4" strokeWidth={1.6} />
                  重新开始咨询
                </button>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px]">
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-1 font-medium text-[var(--tebiq-deep-slate)]"
                >
                  提出新的问题
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                </button>
                <a href="/me/consultations" className="inline-flex items-center gap-1 font-medium text-[var(--tebiq-deep-slate)]">
                  已保存咨询
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                </a>
                <a href={detailPath} className="inline-flex items-center gap-1 font-medium text-[var(--tebiq-deep-slate)]">
                  打开这次咨询
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                </a>
              </div>
              <p className="text-[12px] text-[var(--tebiq-cool-gray)]">TEBIQ 不会强制跳出当前浏览器；保存或复制后，你可以按自己的习惯下次打开。</p>
            </div>
          </details>
          <div className="space-y-2 border-t border-[var(--tebiq-soft-gray)] pt-3">
            <div>
              <SectionLabel>反馈</SectionLabel>
              <p className="mt-1 text-[12.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">这条回答是否帮助你判断下一步？</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {FEEDBACK_BUTTONS.map(b => (
                <button
                  key={b.type}
                  onClick={() => onFeedback(b.type)}
                  disabled={active.feedback_sent !== null && active.feedback_sent !== b.type}
                  className={cx(
                    'min-h-9 rounded-btn border px-2 py-1.5 text-center text-[12px] font-medium',
                    active.feedback_sent === b.type
                      ? 'border-[var(--tebiq-ink-blue)] bg-[var(--tebiq-soft-gray)] text-[var(--tebiq-ink-blue)]'
                      : 'border-[var(--tebiq-soft-gray)] text-[var(--tebiq-deep-slate)]',
                    'disabled:opacity-50',
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </Surface>
      )}

      {canRecover && (
        <Surface className="space-y-3">
          <div>
            <SectionLabel>
              {displayState === 'partial'
                ? '这次回答可能不完整'
                : displayState === 'failed'
                  ? '这次生成失败'
                  : '这次没有完整回答'}
            </SectionLabel>
            <p className="mt-1 text-[12.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
              {displayState === 'partial'
                ? '已生成的内容会保留；如果要完整回答，可以重新生成这次回答。'
                : displayState === 'failed'
                  ? '请求没有完成。重试会保留原问题重新发起，不是新问题。'
                  : '这次没有拿到可用完整回答。可以继续保存问题，或重新生成这次回答。'}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-off-white)]"
            >
              <RefreshCcw className="h-4 w-4" strokeWidth={1.6} />
              重新生成这次回答
            </button>
            {active.id && (
              <button
                onClick={onSave}
                className="inline-flex items-center justify-center gap-2 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)]"
              >
                <Archive className="h-4 w-4" strokeWidth={1.6} />
                先保存这个问题
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-left text-[12px] font-medium text-[var(--tebiq-deep-slate)]"
          >
            改成新问题
          </button>
        </Surface>
      )}

      {(active.feedback_sent || error) && (
        <div className="flex flex-wrap gap-2">
          {active.feedback_sent && <MetaPill>反馈：{feedbackLabel(active.feedback_sent)}</MetaPill>}
          {error && <MetaPill tone="focus">{error}</MetaPill>}
        </div>
      )}
    </section>
  )
}

function FollowUpTurnCard({ turn, index }: { turn: FollowUpTurn; index: number }) {
  const displayState = turn.phase === 'limit_reached' ? 'timeout' : getFollowUpDisplayState(turn)
  const waitingStatus =
    turn.phase === 'received' || turn.phase === 'still_generating'
      ? getFollowUpWaitingStatus(turn)
      : null

  return (
    <Surface className="space-y-4 border-l-2 border-l-[var(--tebiq-soft-gray)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <SectionLabel>补充 {index + 1}</SectionLabel>
          <p className="mt-1 text-[13.5px] leading-[1.7] text-[var(--tebiq-ink-blue)]">{turn.addition}</p>
        </div>
        <StatusBadge state={displayState} />
      </div>

      <div className="rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] px-3 py-2 text-[12.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
        这条补充沿用上面的咨询主题和已生成回答，不作为新的咨询事项。
      </div>

      <RiskHintBanner hits={turn.risk_keywords} />

      {(displayState === 'partial' || displayState === 'fallback' || displayState === 'timeout') && (
        <div className="rounded-card border border-[var(--tebiq-warm-amber)] px-3 py-2 text-[12.5px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
          {turn.phase === 'limit_reached' && (turn.detail || '这次咨询的补充轮数已到上限。')}
          {turn.phase !== 'limit_reached' && displayState === 'partial' && '回答中断，下面只保留已生成部分。'}
          {turn.phase !== 'limit_reached' && displayState === 'fallback' && '模型响应超时，下面是安全降级提示，不是完整咨询回答。'}
          {turn.phase !== 'limit_reached' && displayState === 'timeout' && '没有生成可用完整回答。'}
        </div>
      )}

      <article className="min-h-[5rem] text-[16px] leading-[1.78] text-[var(--tebiq-ink-blue)]">
        {displayState === 'fallback' && turn.fallback_text && (
          <p className="mb-3 text-[15px] leading-[1.7] text-[var(--tebiq-deep-slate)]">{turn.fallback_text}</p>
        )}
        {turn.answer.trim() && <AnswerProse text={turn.answer} />}
        {waitingStatus && turn.answer === '' && (
          <div className="rounded-card border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
            <span className="inline-flex items-center gap-2">
              {waitingStatus.showSpinner && (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
              )}
              {waitingStatus.main}
            </span>
            {waitingStatus.sub && (
              <p className="mt-1 pl-6 text-[12px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
                {waitingStatus.sub}
              </p>
            )}
          </div>
        )}
        {turn.phase === 'idle' && (
          <span className="inline-flex items-center gap-2 text-[15px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
            已收到补充，正在接到当前咨询里整理。
          </span>
        )}
        {turn.phase === 'streaming' && (
          <span className="ml-1 inline-block h-4 w-1.5 animate-pulse rounded-full bg-[var(--tebiq-cool-gray)] align-middle" />
        )}
      </article>

      {turn.detail && turn.phase !== 'streaming' && turn.phase !== 'limit_reached' && (
        <p className="border-t border-[var(--tebiq-soft-gray)] pt-3 text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
          {turn.detail}
        </p>
      )}
    </Surface>
  )
}

function FollowUpComposer({
  disabled,
  nextIndex,
  onSubmit,
}: {
  disabled: boolean
  nextIndex: number
  onSubmit: (addition: string) => void
}) {
  const [draft, setDraft] = useState('')
  const text = draft.trim()

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!text || disabled) return
    onSubmit(text)
    setDraft('')
  }

  return (
    <form onSubmit={submit} className="space-y-2.5 rounded-card border border-[var(--tebiq-soft-gray)] px-3 py-3">
      <div className="flex items-center justify-between gap-3">
        <SectionLabel>补充给当前咨询</SectionLabel>
        <span className="text-[11px] text-[var(--tebiq-cool-gray)]">{Math.min(nextIndex, 3)} / 3</span>
      </div>
      <textarea
        value={draft}
        onChange={e => setDraft(e.target.value)}
        disabled={disabled}
        maxLength={1600}
        rows={3}
        placeholder="例：我已经离开原公司，但在留期限还有 8 个月。"
        className="min-h-[96px] w-full resize-y rounded-card border border-[var(--tebiq-soft-gray)] bg-white p-3 text-[15px] leading-[1.7] text-[var(--tebiq-ink-blue)] outline-none focus-visible:shadow-focus disabled:opacity-60"
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11.5px] leading-[1.55] text-[var(--tebiq-cool-gray)]">
          {disabled ? '正在整理上一条补充，完成后再继续。' : `${draft.length} / 1600 · 只补充同一件事的新背景。`}
        </p>
        <button
          type="submit"
          disabled={!text || disabled}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-off-white)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          {disabled ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} /> : <Send className="h-4 w-4" strokeWidth={1.6} />}
          补充到当前咨询
        </button>
      </div>
    </form>
  )
}

function FollowUpLimitCard({
  message,
  onSave,
  onHumanReview,
  onNewQuestion,
}: {
  message: string | null
  onSave: () => void
  onHumanReview: () => void
  onNewQuestion: () => void
}) {
  return (
    <div className="space-y-3 rounded-card border border-[var(--tebiq-warm-amber)] bg-[var(--tebiq-off-white)] px-3 py-3">
      <div>
        <SectionLabel>这次咨询先停在这里</SectionLabel>
        <p className="mt-1 text-[13.5px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
          {message || '这次咨询已经补充过几轮。建议先保存，或把关键点给人工确认；如果是另一个事项，可以重新开始。'}
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-off-white)]"
        >
          <Archive className="h-4 w-4" strokeWidth={1.6} />
          保存
        </button>
        <button
          type="button"
          onClick={onHumanReview}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)]"
        >
          想找人工确认
        </button>
        <button
          type="button"
          onClick={onNewQuestion}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)]"
        >
          新问题
        </button>
      </div>
    </div>
  )
}

type AnswerBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; lines: string[] }
  | { kind: 'list'; items: string[] }

function AnswerProse({ text }: { text: string }) {
  const blocks = buildAnswerBlocks(text)
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        if (block.kind === 'heading') {
          return (
            <h2 key={index} className="border-l-2 border-[var(--tebiq-warm-amber)] pl-3 text-[15px] font-semibold leading-[1.55] text-[var(--tebiq-ink-blue)]">
              {renderInline(block.text)}
            </h2>
          )
        }
        if (block.kind === 'list') {
          return (
            <ul key={index} className="space-y-2.5 pl-1">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-2.5 text-[15.5px] leading-[1.75] text-[var(--tebiq-ink-blue)]">
                  <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--tebiq-cool-gray)]" />
                  <span className="min-w-0">{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={index} className="whitespace-pre-wrap text-[16px] leading-[1.82] text-[var(--tebiq-ink-blue)]">
            {renderInline(block.lines.join('\n'))}
          </p>
        )
      })}
    </div>
  )
}

function getWaitingStatus(active: ActiveConsultation, waitingStage: WaitingStage): {
  main: string
  sub: string | null
  showSpinner: boolean
  stage: WaitingStage
} {
  if (waitingStage === 'escape') {
    return {
      main: '仍在生成，没有卡死。',
      sub: '可以继续等待，也可以先保存问题稍后回来，或重新生成这次回答。',
      showSpinner: true,
      stage: 'escape',
    }
  }
  if (waitingStage === 'long' || active.phase === 'still_generating') {
    return {
      main: '还在生成，请再等一下。',
      sub: active.routingStatus?.level === 'specific'
        ? `${active.routingStatus.label}。复杂问题可能需要更久一点。`
        : '复杂问题可能需要更久一点。',
      showSpinner: true,
      stage: 'long',
    }
  }
  if (active.phase === 'idle') {
    return {
      main: '正在连接咨询服务...',
      sub: null,
      showSpinner: true,
      stage: 'early',
    }
  }
  return {
    main: active.routingStatus?.label ?? '已收到，正在整理这个问题涉及的在留方向。',
    sub: null,
    showSpinner: true,
    stage: 'early',
  }
}

function getFollowUpWaitingStatus(turn: FollowUpTurn): {
  main: string
  sub: string | null
  showSpinner: boolean
} {
  if (turn.phase === 'still_generating') {
    return {
      main: '仍在生成，可以继续等待。',
      sub: turn.routingStatus?.level === 'specific' ? turn.routingStatus.label : null,
      showSpinner: true,
    }
  }
  return {
    main: turn.routingStatus?.label ?? '已收到补充，正在接到当前咨询里整理。',
    sub: null,
    showSpinner: true,
  }
}

function getFollowUpDisplayState(turn: FollowUpTurn): AlphaDisplayState {
  if (turn.phase === 'completed') return 'completed'
  if (turn.phase === 'streaming' || turn.phase === 'received' || turn.phase === 'idle') return 'streaming'
  if (turn.phase === 'still_generating') return 'timeout_waiting'
  if (turn.phase === 'failed') return 'failed'
  if (turn.phase === 'limit_reached') return 'timeout'
  if (turn.phase === 'timeout') {
    if (turn.partial_answer_saved || turn.answer.trim().length > 0) return 'partial'
    if (turn.fallback_text) return 'fallback'
    return 'timeout'
  }
  return 'streaming'
}

function createFollowUpTurn(localId: string, addition: string): FollowUpTurn {
  return {
    localId,
    id: '',
    addition,
    answer: '',
    risk_keywords: [],
    routingStatus: null,
    phase: 'idle',
    first_token_latency_ms: null,
    total_latency_ms: null,
    redactions_count: null,
    fallback_text: null,
    partial_answer_saved: false,
    detail: null,
  }
}

function buildAnswerBlocks(text: string): AnswerBlock[] {
  const blocks: AnswerBlock[] = []
  let paragraph: string[] = []
  let list: string[] = []

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ kind: 'paragraph', lines: paragraph })
      paragraph = []
    }
  }
  const flushList = () => {
    if (list.length > 0) {
      blocks.push({ kind: 'list', items: list })
      list = []
    }
  }

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line) {
      flushParagraph()
      flushList()
      continue
    }

    const heading = line.match(/^#{1,3}\s+(.+)$/)
    if (heading) {
      flushParagraph()
      flushList()
      blocks.push({ kind: 'heading', text: heading[1] })
      continue
    }

    const bullet = line.match(/^(?:[-*]|\d+[.)])\s+(.+)$/)
    if (bullet) {
      flushParagraph()
      list.push(bullet[1])
      continue
    }

    flushList()
    paragraph.push(line)
  }

  flushParagraph()
  flushList()
  return blocks
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-[var(--tebiq-ink-blue)]">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

function getDisplayState(active: ActiveConsultation): AlphaDisplayState {
  if (active.phase === 'completed') return 'completed'
  if (active.phase === 'streaming' || active.phase === 'received' || active.phase === 'idle') return 'streaming'
  if (active.phase === 'still_generating') return 'timeout_waiting'
  if (active.phase === 'failed') return 'failed'
  if (active.phase === 'timeout') {
    if (active.partial_answer_saved || active.answer.trim().length > 0) return 'partial'
    if (active.fallback_text) return 'fallback'
    return 'timeout'
  }
  return 'streaming'
}

function isTerminal(phase: Phase): boolean {
  return phase === 'completed' || phase === 'timeout' || phase === 'failed'
}

function isFollowUpTerminal(phase: FollowUpPhase): boolean {
  return phase === 'completed' || phase === 'timeout' || phase === 'failed' || phase === 'limit_reached'
}

function compactText(text: string, max: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= max) return normalized
  return normalized.slice(0, max - 1) + '…'
}
