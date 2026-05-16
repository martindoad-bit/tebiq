'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Loader2,
  MessageSquarePlus,
  RefreshCcw,
  Send,
  Share2,
  ShieldAlert,
} from 'lucide-react'
import {
  BrandHeader,
  ConsultationShell,
  MetaPill,
  RiskHintBanner,
  SectionLabel,
  StatusBadge,
  Surface,
  type AlphaDisplayState,
} from '@/components/ui/consultation-alpha'
import { FactReferenceBlock } from '@/components/ui/fact-reference'
import { QuickReferenceBridge } from '@/components/ui/quick-reference-bridge'
import TabBar from '@/app/_components/v5/TabBar'
import {
  parseConsultationChunk,
  type ConsultationFactCardAuditEntry,
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
  fact_cards: ConsultationFactCardAuditEntry[]
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
  fact_cards: ConsultationFactCardAuditEntry[]
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
  const searchParams = useSearchParams()
  const [question, setQuestion] = useState('')
  const [active, setActive] = useState<ActiveConsultation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [viewerId, setViewerId] = useState<string>('')
  const [photo, setPhoto] = useState<PhotoState>({ kind: 'idle' })
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const streamRunRef = useRef(0)
  const photoRunRef = useRef(0)
  const photoAbortRef = useRef<AbortController | null>(null)
  const seededQuestionRef = useRef(false)

  useEffect(() => {
    setViewerId(ensureViewerCookie())
  }, [])

  useEffect(() => {
    if (seededQuestionRef.current) return
    const seeded = searchParams.get('q')?.trim()
    if (!seeded) return
    seededQuestionRef.current = true
    setQuestion(seeded.slice(0, 4000))
  }, [searchParams])

  useEffect(() => () => {
    abortRef.current?.abort()
    photoAbortRef.current?.abort()
    if (photo.kind === 'recognizing' || photo.kind === 'ready') {
      try { URL.revokeObjectURL(photo.preview) } catch { /* ignore */ }
    }
  }, [photo])

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    photoAbortRef.current?.abort()
    const runId = photoRunRef.current + 1
    photoRunRef.current = runId
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

    let uploadTimeoutId: number | null = null
    try {
      const fd = new FormData()
      fd.append('file', file)
      const ac = new AbortController()
      photoAbortRef.current = ac
      uploadTimeoutId = window.setTimeout(() => ac.abort(), 45_000)
      const r = await fetch('/api/consultation/upload', { method: 'POST', body: fd, signal: ac.signal })
      if (photoRunRef.current !== runId) return
      if (uploadTimeoutId !== null) {
        window.clearTimeout(uploadTimeoutId)
        uploadTimeoutId = null
      }
      const j = (await r.json().catch(() => ({}))) as {
        image_summary?: string
        image_storage_ref?: string
        recognition?: { confidence?: string }
        error?: string
        detail?: string
      }
      if (!r.ok || !j.image_summary || !j.image_storage_ref) {
        if (photoRunRef.current !== runId) return
        setPhoto({ kind: 'error', message: userSafePhotoMessage(j.detail || j.error || `识别失败 HTTP ${r.status}`) })
        return
      }
      if (photoRunRef.current !== runId) return
      setPhoto({
        kind: 'ready',
        preview,
        filename: file.name,
        summary: j.image_summary,
        storageRef: j.image_storage_ref,
        confidence: j.recognition?.confidence ?? 'unknown',
      })
    } catch (err) {
      if (photoRunRef.current !== runId) return
      setPhoto({ kind: 'error', message: userSafePhotoMessage(err instanceof Error ? err.message : String(err)) })
    } finally {
      if (uploadTimeoutId !== null) window.clearTimeout(uploadTimeoutId)
      if (photoRunRef.current === runId) photoAbortRef.current = null
      e.target.value = ''
    }
  }

  function clearPhoto() {
    photoRunRef.current += 1
    photoAbortRef.current?.abort()
    photoAbortRef.current = null
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
      fact_cards: [],
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
          return { ...prev, fact_cards: ev.items.slice() }
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
              ? '已保留部分内容；这条还不能作为完整整理。'
              : '这次没有整理出可用内容。',
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
        followUpLimitMessage: '这次咨询已经补充过几轮。建议先停在这里；如果是另一件事，可以重新开始。',
      } : prev)
      return
    }
    if (active.followUps.some(turn => !isFollowUpTerminal(turn.phase))) return

    const text = addition.trim()
    if (!text) return
    setError(null)
    const parentConsultationId = getFollowUpParentConsultationId(active)

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
          parent_consultation_id: parentConsultationId,
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
            return { ...turn, fact_cards: ev.items.slice() }
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
                ? '已保留部分内容；这条还不能作为完整整理。'
                : '这次没有整理出可用内容。',
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
        setError(j.error ?? '反馈没有提交成功，请稍后再试。')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
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
    <ConsultationShell tabBar={<TabBar />}>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="在留咨询"
          title={active ? '咨询结果' : '在留问题，先问一下。'}
          align={active ? 'left' : 'center'}
          description={
            active
              ? active.id
                ? '这次咨询已自动记录。可以补充同一件事。'
                : '整理完成后会自动记录。可以补充同一件事。'
              : '换工作、更新、离婚、年金、搬家。'
          }
        />

        {!active && (
          <form onSubmit={submit} className="space-y-3.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onPickFile}
              className="hidden"
            />
            <Surface className="space-y-3.5 bg-white/70">
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                maxLength={4000}
                rows={5}
                placeholder="例：我换工作了，需要向入管报告吗？"
                className="min-h-[190px] w-full resize-y rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] p-4 text-[18px] leading-[1.72] text-[var(--tebiq-ink-blue)] outline-none focus-visible:shadow-focus"
                required
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12.5px] text-[var(--tebiq-cool-gray)]">{question.length} / 4000</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={photo.kind === 'recognizing'}
                    className="inline-flex min-h-11 max-w-full shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] px-3.5 py-2 text-[14px] font-medium text-[var(--tebiq-ink-blue)] disabled:opacity-50"
                  >
                    {photo.kind === 'ready' ? <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.6} /> : <Camera className="h-3.5 w-3.5" strokeWidth={1.6} />}
                    {photo.kind === 'ready' ? '已添加照片' : '加一张材料照片'}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!question.trim() || photo.kind === 'recognizing'}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-4 py-3 text-[16px] font-medium text-[var(--tebiq-off-white)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {photo.kind === 'recognizing' ? (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
                  ) : (
                    <Send className="h-4 w-4" strokeWidth={1.6} />
                  )}
                  {photo.kind === 'recognizing' ? '读取中' : '开始咨询'}
                </button>
              </div>
            </Surface>

            {photo.kind !== 'idle' && (
              <PhotoLiteCard
                photo={photo}
                clearPhoto={clearPhoto}
                resetPhoto={() => setPhoto({ kind: 'idle' })}
              />
            )}

            {error && (
              <Surface className="border-[var(--tebiq-warm-amber)] text-[13px] text-[var(--tebiq-ink-blue)]">
                {error}
              </Surface>
            )}

          </form>
        )}

        {active && (
          <ActiveConsultationView
            active={active}
            error={error}
            onFeedback={sendFeedback}
            onReset={reset}
            onRetry={retryActiveConsultation}
            onFollowUp={submitFollowUp}
          />
        )}

        <footer className="space-y-1 border-t border-[var(--tebiq-soft-gray)] pt-4 text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
          <p>具体期限、手续和个案判断，请向行政书士或入管确认。</p>
        </footer>
      </div>
    </ConsultationShell>
  )
}

function PhotoLiteCard({
  photo,
  clearPhoto,
  resetPhoto,
}: {
  photo: PhotoState
  clearPhoto: () => void
  resetPhoto: () => void
}) {
  return (
    <Surface className="space-y-3 p-3.5 sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
          <div>
            <SectionLabel>上传材料照片</SectionLabel>
            <p className="text-[14px] leading-[1.6] text-[var(--tebiq-deep-slate)]">
              入管通知、年金、税金、雇佣材料都可以；可先遮住无关号码。
            </p>
          </div>
        </div>
        {photo.kind === 'ready' && (
          <button type="button" onClick={clearPhoto} className="whitespace-nowrap text-[13px] text-[var(--tebiq-deep-slate)]">
            移除图片
          </button>
        )}
      </div>

      {photo.kind === 'recognizing' && (
        <div className="flex items-center gap-3 rounded-card border border-[var(--tebiq-soft-gray)] p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.preview} alt="预览" className="h-16 w-16 rounded-card border border-[var(--tebiq-soft-gray)] object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] text-[var(--tebiq-ink-blue)]">{photo.filename}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-[var(--tebiq-deep-slate)]">
              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.6} />
              正在读取图片内容
            </p>
            <p className="mt-1 text-[12.5px] leading-[1.55] text-[var(--tebiq-cool-gray)]">
              通常需要几秒。太久时可取消，先用文字提问。
            </p>
            <button type="button" onClick={clearPhoto} className="mt-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)]">
              取消图片
            </button>
          </div>
        </div>
      )}

      {photo.kind === 'ready' && (
        <div className="flex gap-3 rounded-card border border-[var(--tebiq-soft-gray)] p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.preview} alt="预览" className="h-20 w-20 shrink-0 rounded-card border border-[var(--tebiq-soft-gray)] object-cover" />
          <div className="min-w-0 text-[14px] leading-relaxed">
            <SectionLabel>图片摘要</SectionLabel>
            <p className="mt-1 text-[var(--tebiq-ink-blue)]">{photo.summary}</p>
            <p className="mt-1 text-[12px] text-[var(--tebiq-cool-gray)]">
              图片内容仅供本次整理参考，仍以原文和窗口要求为准。
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
  onReset,
  onRetry,
  onFollowUp,
}: {
  active: ActiveConsultation
  error: string | null
  onFeedback: (type: FeedbackType) => void
  onReset: () => void
  onRetry: () => void
  onFollowUp: (addition: string) => void
}) {
  const canAct = active.phase === 'completed'
  const canRecover = active.phase === 'timeout' || active.phase === 'failed'
  const answerHasStarted = active.answer.trim().length > 0 || active.phase === 'streaming' || isTerminal(active.phase)
  const isWaitingForAnswer = !answerHasStarted
  const [waitingStage, setWaitingStage] = useState<WaitingStage>('early')
  const [followUpOpen, setFollowUpOpen] = useState(false)
  const baseDisplayState = getDisplayState(active)
  const displayState: AlphaDisplayState =
    isWaitingForAnswer && waitingStage !== 'early' ? 'timeout_waiting' : baseDisplayState
  const hasRunningFollowUp = active.followUps.some(turn => !isFollowUpTerminal(turn.phase))
  const followUpLocked = active.followUpLimitReached || active.followUpCount >= 3
  const waitingStatus =
    isWaitingForAnswer
      ? getWaitingStatus(active, waitingStage)
      : null
  const activeSafeDetail = userSafeDetail(active.detail, active.phase)
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
    if (!isWaitingForAnswer) return

    const longTimer = window.setTimeout(() => setWaitingStage('long'), 30_000)
    const escapeTimer = window.setTimeout(() => setWaitingStage('escape'), 60_000)
    return () => {
      window.clearTimeout(longTimer)
      window.clearTimeout(escapeTimer)
    }
  }, [active.id, isWaitingForAnswer])

  useEffect(() => {
    setFollowUpOpen(false)
  }, [active.id])

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
        <p className="text-[17px] leading-[1.75] text-[var(--tebiq-ink-blue)]">{active.question}</p>
      </Surface>

      {active.photoSummary && (
        <Surface className="flex gap-3">
          {active.photoPreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={active.photoPreview} alt="提交的图片" className="h-16 w-16 shrink-0 rounded-card border border-[var(--tebiq-soft-gray)] object-cover" />
          )}
          <div className="min-w-0 text-[14.5px] leading-[1.7]">
            <SectionLabel>图片摘要</SectionLabel>
            <p className="mt-1 text-[var(--tebiq-deep-slate)]">{active.photoSummary}</p>
            <p className="mt-1 text-[12px] text-[var(--tebiq-cool-gray)]">图片内容仅供本次整理参考，仍以原文为准。</p>
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
        <CrisisActionCard
          action={getCrisisAction(active.risk_keywords)}
        />
        {hasEncodingIssue(active.answer) && (
          <EncodingIssueNotice />
        )}

        {(displayState === 'partial' || displayState === 'fallback' || displayState === 'timeout') && (
          <div className="rounded-card border border-[var(--tebiq-warm-amber)] px-3 py-2 text-[12.5px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
            {displayState === 'partial' && '这次只保留了部分内容。'}
            {displayState === 'fallback' && '这次只保留了部分可用内容。'}
            {displayState === 'timeout' && '这次没有整理完成。'}
          </div>
        )}
        {displayState === 'failed' && (
          <div className="rounded-card border border-[var(--tebiq-warm-amber)] px-3 py-2 text-[12.5px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
            这次没有整理完成。可以重试，原问题会保留。
          </div>
        )}

        {canRecover && (
          <div className="rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] px-3 py-3">
            <SectionLabel>
              {displayState === 'partial'
                ? '这次只保留了部分内容'
                : '这次没有整理完成'}
            </SectionLabel>
            <p className="mt-1 text-[14px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
              {displayState === 'partial'
                ? '已保留的内容会继续显示。需要重新整理时，可以重试。'
                : '重试会保留原问题；这不是新的咨询。'}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <button
                onClick={onRetry}
                className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-off-white)]"
              >
                <RefreshCcw className="h-4 w-4" strokeWidth={1.6} />
                重试
              </button>
              {active.id && (
                <a
                  href="/me/consultations"
                  className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-ink-blue)]"
                >
                  稍后查看
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={onReset}
              className="mt-2 text-left text-[13px] font-medium text-[var(--tebiq-deep-slate)]"
            >
              改成新问题
            </button>
          </div>
        )}

        <article className="min-h-[7.5rem] text-[17px] leading-[1.8] text-[var(--tebiq-ink-blue)]">
          {displayState === 'fallback' && active.fallback_text && (
            <p className="mb-3 text-[16px] leading-[1.7] text-[var(--tebiq-deep-slate)]">{active.fallback_text}</p>
          )}
          {active.answer.trim() && (
            <AnswerProse text={active.answer} />
          )}
          {waitingStatus && active.answer === '' && (
            <div className="rounded-card border border-[var(--tebiq-soft-gray)] px-3.5 py-3 text-[14.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
              <div>
                <span className="inline-flex items-center gap-2">
                  {waitingStatus.showSpinner && (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
                  )}
                  {waitingStatus.main}
                </span>
                {waitingStatus.sub && (
                  <p className="mt-1 pl-6 text-[13px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
                    {waitingStatus.sub}
                  </p>
                )}
              </div>
              {waitingStatus.stage === 'escape' && (
                <div className="mt-3 space-y-2 border-t border-[var(--tebiq-soft-gray)] pt-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <a
                      href="/me/consultations"
                      className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-off-white)]"
                    >
                      稍后查看
                    </a>
                    <button
                      type="button"
                      onClick={onRetry}
                      className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-ink-blue)]"
                    >
                      <RefreshCcw className="h-3.5 w-3.5" strokeWidth={1.6} />
                      重试
                    </button>
                  </div>
                  <p className="text-[12px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
                    原问题已自动记录。如果回答稍后完成，可以从“咨询记录”打开。
                  </p>
                </div>
              )}
            </div>
          )}
          {active.phase === 'received' && active.answer !== '' && (
            <span className="inline-flex items-center gap-2 text-[15px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
              已收到，正在整理
            </span>
          )}
          {active.phase === 'streaming' && (
            <span className="ml-1 inline-block h-4 w-1.5 animate-pulse rounded-full bg-[var(--tebiq-cool-gray)] align-middle" />
          )}
        </article>

        {answerHasStarted && !canRecover && (
          <FactReferenceBlock audit={active.fact_cards} variant="compact" />
        )}

        {answerHasStarted && !canRecover && (
          <QuickReferenceBridge audit={active.fact_cards} />
        )}

        {activeSafeDetail && active.phase !== 'streaming' && (
          <p className="border-t border-[var(--tebiq-soft-gray)] pt-3 text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
            {activeSafeDetail}
          </p>
        )}
      </Surface>

      {active.followUps.map((turn, index) => (
        <FollowUpTurnCard key={turn.localId} turn={turn} index={index} />
      ))}

      {canAct && (
        <>
          <Surface className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <SectionLabel>补充这件事</SectionLabel>
                <p className="mt-1 text-[14.5px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
                  本次咨询已自动记录。补充内容会沿用上面的回答继续整理。
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {!followUpLocked ? (
                <button
                  type="button"
                  onClick={() => setFollowUpOpen(v => !v)}
                  disabled={hasRunningFollowUp}
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2.5 text-[16px] font-medium text-[var(--tebiq-off-white)] disabled:opacity-50"
                >
                  <MessageSquarePlus className="h-4 w-4" strokeWidth={1.6} />
                  {followUpOpen ? '收起' : '补充'}
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex min-h-12 items-center justify-center rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2.5 text-[15px] font-medium text-[var(--tebiq-off-white)] opacity-50"
                >
                  补充已到上限
                </button>
              )}
              <button
                type="button"
                onClick={canUseNativeShare ? shareConsultationLink : copyConsultationLink}
                disabled={!active.id}
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2.5 text-[16px] font-medium text-[var(--tebiq-ink-blue)] disabled:opacity-50"
              >
                {shareState === 'shared' || copyState === 'copied'
                  ? <ClipboardCheck className="h-4 w-4" strokeWidth={1.6} />
                  : <Share2 className="h-4 w-4" strokeWidth={1.6} />}
                {shareState === 'shared'
                  ? '分享已打开'
                  : copyState === 'copied'
                    ? '已复制'
                  : '分享'}
              </button>
              <button
                type="button"
                onClick={onReset}
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2.5 text-[16px] font-medium text-[var(--tebiq-ink-blue)]"
              >
                <MessageSquarePlus className="h-4 w-4" strokeWidth={1.6} />
                新问题
              </button>
            </div>
            <p className="text-[12.5px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
              分享的是这条咨询链接，包含问题和回答；含敏感内容时可先不要分享。
            </p>
            {copyState === 'failed' || shareState === 'failed' ? (
              <p className="text-[13px] leading-[1.65] text-[var(--tebiq-cool-gray)]">
                分享未完成时，可以复制链接后再发给朋友或专业人士。
              </p>
            ) : null}

            {followUpOpen && !followUpLocked && (
              <div className="rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] px-3 py-3">
                <p className="text-[13px] leading-[1.65] text-[var(--tebiq-cool-gray)]">
                  当前主题：<span className="font-medium text-[var(--tebiq-ink-blue)]">{compactText(active.question, 54)}</span>
                </p>
                <div className="mt-3">
                  <FollowUpComposer
                    disabled={hasRunningFollowUp}
                    nextIndex={active.followUpCount + 1}
                    onSubmit={addition => {
                      onFollowUp(addition)
                      setFollowUpOpen(false)
                    }}
                  />
                </div>
              </div>
            )}

            {followUpLocked && (
              <FollowUpLimitCard
                message={active.followUpLimitMessage}
                onHumanReview={() => onFeedback('human_review')}
                onNewQuestion={onReset}
              />
            )}
          </Surface>
        </>
      )}

      {error && (
        <div className="flex flex-wrap gap-2">
          <MetaPill tone="focus">{userSafeDetail(error, 'failed')}</MetaPill>
        </div>
      )}
      {active.feedback_sent === 'human_review' && (
        <HumanReviewNotice consultationId={active.id} />
      )}
    </section>
  )
}

function HumanReviewNotice({ consultationId }: { consultationId: string }) {
  return (
    <Surface className="space-y-2 border-[var(--tebiq-soft-gray)] p-3.5">
      <SectionLabel>已标记需确认</SectionLabel>
      <p className="text-[14px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
        已标记需确认。具体期限、材料或个案判断，请带记录向行政书士或入管确认。
      </p>
      <a
        href={`/consultation?consultation_id=${encodeURIComponent(consultationId)}`}
        className="inline-flex min-h-10 items-center justify-center rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13.5px] font-medium text-[var(--tebiq-ink-blue)]"
      >
        带记录预约
      </a>
    </Surface>
  )
}

function FollowUpTurnCard({ turn, index }: { turn: FollowUpTurn; index: number }) {
  const displayState = turn.phase === 'limit_reached' ? 'timeout' : getFollowUpDisplayState(turn)
  const waitingStatus =
    turn.phase === 'received' || turn.phase === 'still_generating'
      ? getFollowUpWaitingStatus(turn)
      : null
  const turnSafeDetail = userSafeDetail(turn.detail, turn.phase)

  return (
    <Surface className="space-y-4 border-l-2 border-l-[var(--tebiq-soft-gray)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <SectionLabel>补充 {index + 1}</SectionLabel>
          <p className="mt-1 text-[14.5px] leading-[1.7] text-[var(--tebiq-ink-blue)]">{turn.addition}</p>
        </div>
        <StatusBadge state={displayState} />
      </div>

      <div className="rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] px-3 py-2 text-[13.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
        这条补充沿用上面的咨询主题和已生成回答，不作为新的咨询事项。
      </div>

      <RiskHintBanner hits={turn.risk_keywords} />
      {hasEncodingIssue(turn.answer) && (
        <EncodingIssueNotice />
      )}

      {(displayState === 'partial' || displayState === 'fallback' || displayState === 'timeout') && (
        <div className="rounded-card border border-[var(--tebiq-warm-amber)] px-3 py-2 text-[12.5px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
          {turn.phase === 'limit_reached' && (turn.detail || '这次咨询的补充轮数已到上限。')}
          {turn.phase !== 'limit_reached' && displayState === 'partial' && '这次只保留了部分内容。'}
          {turn.phase !== 'limit_reached' && displayState === 'fallback' && '这次只保留了部分可用内容。'}
          {turn.phase !== 'limit_reached' && displayState === 'timeout' && '这次没有整理完成。'}
        </div>
      )}

      <article className="min-h-[5rem] text-[16px] leading-[1.78] text-[var(--tebiq-ink-blue)]">
        {displayState === 'fallback' && turn.fallback_text && (
          <p className="mb-3 text-[15px] leading-[1.7] text-[var(--tebiq-deep-slate)]">{turn.fallback_text}</p>
        )}
        {turn.answer.trim() && <AnswerProse text={turn.answer} />}
        {waitingStatus && turn.answer === '' && (
          <div className="rounded-card border border-[var(--tebiq-soft-gray)] px-3.5 py-3 text-[14.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
            <span className="inline-flex items-center gap-2">
              {waitingStatus.showSpinner && (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
              )}
              {waitingStatus.main}
            </span>
            {waitingStatus.sub && (
              <p className="mt-1 pl-6 text-[13px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
                {waitingStatus.sub}
              </p>
            )}
          </div>
        )}
        {turn.phase === 'idle' && (
          <span className="inline-flex items-center gap-2 text-[15px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
            已收到补充，正在继续整理。
          </span>
        )}
        {turn.phase === 'streaming' && (
          <span className="ml-1 inline-block h-4 w-1.5 animate-pulse rounded-full bg-[var(--tebiq-cool-gray)] align-middle" />
        )}
      </article>

      {turn.answer.trim() && (
        <FactReferenceBlock audit={turn.fact_cards} variant="compact" />
      )}

      {turn.answer.trim() && (
        <QuickReferenceBridge audit={turn.fact_cards} />
      )}

      {turnSafeDetail && turn.phase !== 'streaming' && turn.phase !== 'limit_reached' && (
        <p className="border-t border-[var(--tebiq-soft-gray)] pt-3 text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
          {turnSafeDetail}
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
        <SectionLabel>补充</SectionLabel>
        <span className="text-[12px] text-[var(--tebiq-cool-gray)]">{Math.min(nextIndex, 3)} / 3</span>
      </div>
      <textarea
        value={draft}
        onChange={e => setDraft(e.target.value)}
        disabled={disabled}
        maxLength={1600}
        rows={3}
        placeholder="例：我已经离开原公司，但在留期限还有 8 个月。"
        className="min-h-[104px] w-full resize-y rounded-card border border-[var(--tebiq-soft-gray)] bg-white p-3.5 text-[16px] leading-[1.7] text-[var(--tebiq-ink-blue)] outline-none focus-visible:shadow-focus disabled:opacity-60"
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] leading-[1.55] text-[var(--tebiq-cool-gray)]">
          {disabled ? '正在整理上一条补充，完成后再继续。' : `${draft.length} / 1600 · 只补充同一件事的新背景。`}
        </p>
        <button
          type="submit"
          disabled={!text || disabled}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-off-white)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          {disabled ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} /> : <Send className="h-4 w-4" strokeWidth={1.6} />}
          提交补充
        </button>
      </div>
    </form>
  )
}

function FollowUpLimitCard({
  message,
  onHumanReview,
  onNewQuestion,
}: {
  message: string | null
  onHumanReview: () => void
  onNewQuestion: () => void
}) {
  return (
    <div className="space-y-3 rounded-card border border-[var(--tebiq-warm-amber)] bg-[var(--tebiq-off-white)] px-3 py-3">
      <div>
        <SectionLabel>这次咨询先停在这里</SectionLabel>
        <p className="mt-1 text-[14.5px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
          {message || '这次咨询已经补充过几轮。建议先停在这里；如果是另一件事，可以重新开始。'}
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={onHumanReview}
          className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-off-white)]"
        >
          标记需确认
        </button>
        <button
          type="button"
          onClick={onNewQuestion}
          className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-ink-blue)]"
        >
          新问题
        </button>
      </div>
    </div>
  )
}

type CrisisAction = {
  title: string
  body: string
  steps: string[]
}

function CrisisActionCard({
  action,
}: {
  action: CrisisAction | null
}) {
  if (!action) return null
  return (
    <div className="rounded-card border border-[var(--tebiq-warm-amber)] bg-[var(--tebiq-soft-gray)]/30 px-3.5 py-3 text-[13px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
      <div className="flex items-start gap-2.5">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tebiq-warm-amber)]" strokeWidth={1.6} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{action.title}</p>
          <p className="mt-1 text-[12.5px] text-[var(--tebiq-deep-slate)]">{action.body}</p>
          <ol className="mt-2 space-y-1.5">
            {action.steps.map((step, index) => (
              <li key={step} className="flex gap-2">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--tebiq-off-white)] text-[11px] font-semibold text-[var(--tebiq-ink-blue)]">
                  {index + 1}
                </span>
                <span className="min-w-0">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

function getCrisisAction(hits: string[]): CrisisAction | null {
  const hitSet = new Set(hits)
  if (hitSet.has('家暴')) {
    return {
      title: '先保护人身安全，再整理签证影响',
      body: '如果人身安全受威胁，先离开危险场所并留下记录，签证路径可以随后整理。',
      steps: ['有当下危险时先联系警察或 DV 支援窗口。', '保留聊天、照片、诊断书、报警或相談记录。', '再确认住所、配偶关系和在留期限会怎样影响下一步。'],
    }
  }
  if (hitSet.has('证件扣押')) {
    return {
      title: '先确认并保留证件相关记录',
      body: '在留卡、护照等证件被扣押时，先处理证件本身和沟通记录，再判断工作或在留影响。',
      steps: ['保存公司要求、聊天记录和证件被收走的经过。', '必要时联系警察、入管相談或支援窗口确认取回方式。', '不要只听公司口头说法，再整理是否涉及退职、转职或在留期限。'],
    }
  }
  if (hitSet.has('入管通知')) {
    return {
      title: '先守住通知期限',
      body: '入管通知、说明书或补材料不能放着不管，先确认期限和要提交的内容。',
      steps: ['拍照保存通知书，确认提交期限、提交地点和材料名称。', '把事实经过按时间顺序整理，不要临时编理由。', '期限紧或内容不清楚时，尽快带通知书找专业人士确认。'],
    }
  }
  return null
}

type AnswerBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; lines: string[] }
  | { kind: 'list'; items: string[] }

interface FirstLookBlock {
  conclusion: string
  action: string
  avoid: string | null
}

function AnswerProse({ text }: { text: string }) {
  const safeText = cleanDisplayText(text)
  const { firstLook, rest } = extractFirstLook(safeText)
  const blocks = buildAnswerBlocks(rest)
  return (
    <div className="space-y-4">
      {firstLook && <FirstLookCard firstLook={firstLook} />}
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
          <p key={index} className="whitespace-pre-wrap text-[17px] leading-[1.82] text-[var(--tebiq-ink-blue)]">
            {renderInline(block.lines.join('\n'))}
          </p>
        )
      })}
    </div>
  )
}

function FirstLookCard({ firstLook }: { firstLook: FirstLookBlock }) {
  return (
    <div className="rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-soft-gray)]/35 px-3.5 py-3">
      <SectionLabel>先看这里</SectionLabel>
      <div className="mt-2 space-y-1.5 text-[16px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
        <p><span className="font-medium">当前判断：</span>{renderInline(firstLook.conclusion)}</p>
        <p><span className="font-medium">建议动作：</span>{renderInline(firstLook.action)}</p>
        {firstLook.avoid && (
          <p><span className="font-medium">暂缓事项：</span>{renderInline(firstLook.avoid)}</p>
        )}
      </div>
    </div>
  )
}

function extractFirstLook(text: string): { firstLook: FirstLookBlock | null; rest: string } {
  const normalized = text.replace(/\r\n/g, '\n').trimStart()
  const lines = normalized.split('\n')
  const firstNonEmpty = lines.findIndex(line => line.trim().length > 0)
  if (firstNonEmpty < 0) return { firstLook: null, rest: text }

  let cursor = firstNonEmpty
  const heading = lines[cursor].trim().replace(/^#+\s*/, '')
  if (/^(?:摘要|简要判断|先看这里)[:：]?$/.test(heading)) cursor += 1

  const take = (labels: string[]): string | null => {
    const raw = lines[cursor]?.trim() ?? ''
    const escaped = labels.map(label => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
    const re = new RegExp(`^(?:[-*]\\s*)?(?:${escaped})[：:]\\s*(.+)$`)
    const match = raw.match(re)
    if (!match) return null
    cursor += 1
    return match[1].trim()
  }

  const conclusion = take(['当前判断', '判断', '结论', '先看方向'])
  const action = take(['建议动作', '下一步', '优先行动', '今天先做', '今天可以先确认', '今天先确认', '先做'])
  const avoid = take(['暂缓事项', '注意', '注意事项', '先别这样做', '先不要做', '先避免', '暂时不要', '暂时不要做'])
  if (!conclusion || !action) return { firstLook: null, rest: text }

  while (cursor < lines.length && lines[cursor].trim() === '') cursor += 1
  return {
    firstLook: { conclusion, action, avoid },
    rest: lines.slice(cursor).join('\n').trimStart(),
  }
}

function hasEncodingIssue(text: string | null | undefined): boolean {
  return typeof text === 'string' && /\uFFFD/.test(text)
}

function cleanDisplayText(text: string): string {
  return text.replace(/\uFFFD+/g, '…')
}

function userSafeDetail(
  detail: string | null | undefined,
  phase: ActiveConsultation['phase'] | FollowUpTurn['phase'] | 'failed',
): string | null {
  if (!detail) return null
  const text = detail.trim()
  if (!text) return null
  if (phase === 'failed' || looksTechnicalDetail(text)) {
    return '这次没有整理完成。可以重试，或稍后再试。'
  }
  return cleanDisplayText(text)
}

function looksTechnicalDetail(text: string): boolean {
  return /(api[_ -]?key|not set|deepseek|openai|anthropic|vercel|postgres|database|stack|trace|undefined|null|fetch failed|econn|http\s?\d{3})/i.test(text)
}

function userSafePhotoMessage(message: string | null | undefined): string {
  if (!message) return '图片识别没有完成。可以重新上传，或先用文字描述材料内容。'
  const text = message.trim()
  if (/abort|timeout|timed out|超时/i.test(text)) return '图片识别等太久了。可以重新上传，或先用文字描述材料内容。'
  if (!text || looksTechnicalDetail(text)) return '图片识别没有完成。可以重新上传，或先用文字描述材料内容。'
  return cleanDisplayText(text)
}

function EncodingIssueNotice() {
  return (
    <div className="rounded-card border border-[var(--tebiq-warm-amber)] px-3 py-2 text-[12.5px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
      这条回答显示可能不完整。建议重试，或反馈为“不准确”。
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
      main: '处理时间稍长。',
      sub: '问题已自动记录。可以稍后查看；如果长时间没有结果，再重试一次。',
      showSpinner: true,
      stage: 'escape',
    }
  }
  if (waitingStage === 'long' || active.phase === 'still_generating') {
    return {
      main: '还在核对资料。',
      sub: active.routingStatus?.level === 'specific'
        ? `${active.routingStatus.label}，复杂情况会多花一点时间。`
        : '复杂在留问题通常需要 30-60 秒，页面会自动更新。',
      showSpinner: true,
      stage: 'long',
    }
  }
  if (active.phase === 'idle') {
    return {
      main: '已收到，正在整理。',
      sub: '通常需要 30-60 秒。',
      showSpinner: true,
      stage: 'early',
    }
  }
  return {
      main: active.routingStatus?.label ?? '正在整理问题类型。',
    sub: '通常需要 30-60 秒，完成后会自动显示。',
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
      main: '仍在处理这条补充。',
      sub: turn.routingStatus?.level === 'specific' ? turn.routingStatus.label : null,
      showSpinner: true,
    }
  }
  return {
    main: turn.routingStatus?.label ?? '已收到补充，正在继续整理。',
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
    fact_cards: [],
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

function getFollowUpParentConsultationId(active: ActiveConsultation): string {
  const latestAnswerTurn = active.followUps
    .slice()
    .reverse()
    .find(turn => turn.id && (turn.phase === 'completed' || turn.phase === 'timeout'))
  return latestAnswerTurn?.id ?? active.id
}

function compactText(text: string, max: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= max) return normalized
  return normalized.slice(0, max - 1) + '…'
}
