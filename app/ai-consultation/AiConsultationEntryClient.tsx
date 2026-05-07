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

interface ActiveConsultation {
  id: string
  question: string
  photoSummary: string | null
  photoPreview: string | null
  answer: string
  risk_keywords: string[]
  phase: Phase
  first_token_latency_ms: number | null
  total_latency_ms: number | null
  redactions_count: number | null
  fallback_text: string | null
  partial_answer_saved: boolean
  detail: string | null
  feedback_sent: FeedbackType | null
  saved: boolean
}

const FEEDBACK_BUTTONS: Array<{ type: FeedbackType; label: string }> = [
  { type: 'helpful', label: '有帮助' },
  { type: 'inaccurate', label: '不准确' },
  { type: 'add_context', label: '我想补充情况' },
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
    setError(null)

    const photoSummary = photo.kind === 'ready' ? photo.summary : null
    const photoStorageRef = photo.kind === 'ready' ? photo.storageRef : null
    const photoPreview = photo.kind === 'ready' ? photo.preview : null

    setActive({
      id: '',
      question: text,
      photoSummary,
      photoPreview,
      answer: '',
      risk_keywords: [],
      phase: 'idle',
      first_token_latency_ms: null,
      total_latency_ms: null,
      redactions_count: null,
      fallback_text: null,
      partial_answer_saved: false,
      detail: null,
      feedback_sent: null,
      saved: false,
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
      setActive(prev => prev ? { ...prev, phase: 'failed', detail: err instanceof Error ? err.message : String(err) } : prev)
      return
    }
    if (!res.ok || !res.body) {
      const j = (await res.json().catch(() => ({}))) as { error?: string; detail?: string }
      setActive(prev => prev ? { ...prev, phase: 'failed', detail: j.detail ?? j.error ?? `HTTP ${res.status}` } : prev)
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
        for (const ev of events) applyEvent(ev)
      }
    } catch (err) {
      if ((err as { name?: string })?.name === 'AbortError') return
      setActive(prev => prev ? { ...prev, phase: 'failed', detail: err instanceof Error ? err.message : String(err) } : prev)
    } finally {
      try { reader.releaseLock() } catch { /* ignore */ }
    }
  }

  function applyEvent(ev: ConsultationEvent) {
    setActive(prev => {
      if (!prev) return prev
      switch (ev.event) {
        case 'received':
          return { ...prev, id: ev.consultation_id, phase: 'received' }
        case 'risk_hint':
          return { ...prev, risk_keywords: ev.risk_keyword_hits.slice() }
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
      }
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
    abortRef.current?.abort()
    setActive(null)
    setQuestion('')
    setError(null)
    clearPhoto()
  }

  return (
    <ConsultationShell>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="AI 在留咨询 Alpha"
          title={active ? '咨询回答' : '先把问题说清楚'}
          description={
            active
              ? '回答会按咨询记录保存状态展示。完整、部分、超时和失败会明确区分。'
              : '文字或日文材料照片都可以先问。TEBIQ 会整理方向、风险提示和下一步确认点。'
          }
          action={
            <a
              href="/me/consultations"
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 text-[12px] text-[var(--tebiq-deep-slate)] sm:w-auto"
            >
              <Archive className="h-3.5 w-3.5" strokeWidth={1.6} />
              我的咨询记录
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
              <span>最近保存的咨询可以从记录页找回。</span>
              <a href="/me/consultations" className="inline-flex items-center gap-1 font-medium text-[var(--tebiq-ink-blue)]">
                我的咨询记录
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
}: {
  active: ActiveConsultation
  error: string | null
  onFeedback: (type: FeedbackType) => void
  onSave: () => void
  onReset: () => void
}) {
  const displayState = getDisplayState(active)
  const canAct = active.phase === 'completed'
  const canRecover = active.phase === 'timeout' || active.phase === 'failed'
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [shareState, setShareState] = useState<'idle' | 'shared' | 'copied' | 'failed'>('idle')
  const detailPath = active.id ? `/c/${encodeURIComponent(active.id)}` : '/me/consultations'
  const consultationUrl =
    typeof window === 'undefined'
      ? detailPath
      : new URL(detailPath, window.location.origin).toString()

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
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'TEBIQ 咨询记录',
          text: '这次咨询可以下次继续查看。',
          url: consultationUrl,
        })
        setShareState('shared')
        return
      }
      await writeClipboardText(consultationUrl)
      setShareState('copied')
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

        <article className="min-h-[7.5rem] text-[16px] leading-[1.78] text-[var(--tebiq-ink-blue)]">
          {displayState === 'fallback' && active.fallback_text && (
            <p className="mb-3 text-[15px] leading-[1.7] text-[var(--tebiq-deep-slate)]">{active.fallback_text}</p>
          )}
          {active.answer.trim() && <AnswerProse text={active.answer} />}
          {active.phase === 'received' && (
            <span className="inline-flex items-center gap-2 text-[15px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
              已收到，正在整理咨询方向
            </span>
          )}
          {active.phase === 'still_generating' && active.answer === '' && (
            <span className="text-[15px] leading-[1.7] text-[var(--tebiq-deep-slate)]">回答仍在生成，可以继续等待。</span>
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

      {canAct && (
        <Surface className="space-y-4">
          <div>
            <SectionLabel>反馈与保存</SectionLabel>
            <p className="mt-1 text-[12.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">这次咨询可以先保存。反馈会进入 Learning Console，用于判断回答质量。</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {FEEDBACK_BUTTONS.map(b => (
              <button
                key={b.type}
                onClick={() => onFeedback(b.type)}
                disabled={active.feedback_sent !== null && active.feedback_sent !== b.type}
                className={cx(
                  'min-h-10 rounded-btn border px-3 py-2 text-left text-[13px] font-medium',
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
          <div className="border-t border-[var(--tebiq-soft-gray)] pt-3">
            <p className="text-[13px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
              保存后可以从记录页回来，也可以把链接发给自己。
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              onClick={onSave}
              disabled={active.saved}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-off-white)] disabled:opacity-75"
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
              {copyState === 'copied' ? '已复制链接' : copyState === 'failed' ? '复制失败' : '复制链接'}
            </button>
            <button
              onClick={shareConsultationLink}
              disabled={!active.id}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)] disabled:opacity-50"
            >
              {shareState === 'shared' || shareState === 'copied'
                ? <CheckCircle2 className="h-4 w-4" strokeWidth={1.6} />
                : <Share2 className="h-4 w-4" strokeWidth={1.6} />}
              {shareState === 'shared'
                ? '已打开分享'
                : shareState === 'copied'
                  ? '已复制链接'
                  : shareState === 'failed'
                    ? '分享未完成'
                    : '分享给自己'}
            </button>
            <a
              href="/me/consultations"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-deep-slate)]"
            >
              <Archive className="h-4 w-4" strokeWidth={1.6} />
              我的咨询记录
            </a>
          </div>
          <a
            href={detailPath}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--tebiq-deep-slate)]"
          >
            打开这次咨询详情
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
          </a>
          <details className="rounded-card border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[12.5px] leading-[1.65] text-[var(--tebiq-deep-slate)]">
            <summary className="cursor-pointer font-medium text-[var(--tebiq-ink-blue)]">
              下次如何快速打开 TEBIQ？
            </summary>
            <div className="mt-2 space-y-1.5">
              <p>先保存这次咨询，或复制链接发给微信文件传输助手、LINE、邮件、备忘录。</p>
              <p>Safari 可以再添加到主屏幕；微信里可以收藏或转发给自己。</p>
            </div>
          </details>
          <button
            onClick={onReset}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)]"
          >
            <MessageSquarePlus className="h-4 w-4" strokeWidth={1.6} />
            继续补充
          </button>
        </Surface>
      )}

      {canRecover && (
        <Surface className="space-y-3">
          <SectionLabel>这次没有完整回答</SectionLabel>
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              onClick={onReset}
              className="inline-flex items-center justify-center gap-2 rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[13px] font-medium text-[var(--tebiq-off-white)]"
            >
              <RefreshCcw className="h-4 w-4" strokeWidth={1.6} />
              重试 / 重新开始
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
