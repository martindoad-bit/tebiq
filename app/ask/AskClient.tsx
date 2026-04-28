'use client'
import { useMemo, useState } from 'react'
import { AlertTriangle, ChevronDown, FileText, Languages, Loader2, ShieldCheck } from 'lucide-react'
import Button from '@/app/_components/v5/Button'
import ComplianceFooter from '@/app/_components/v5/ComplianceFooter'
import RelatedKnowledge from '@/app/_components/v5/RelatedKnowledge'
import type { TextUnderstandResult } from '@/lib/text-understand/types'

interface ApiResponse {
  ok: boolean
  data?: {
    result: TextUnderstandResult
    quota: { unlimited: boolean; used: number; limit: number | null; remaining: number | null }
  }
  error?: { code: string; message: string }
}

export default function AskClient() {
  const [text, setText] = useState('')
  const [userNote, setUserNote] = useState('')
  const [showContext, setShowContext] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<TextUnderstandResult | null>(null)

  const chars = text.trim().length
  const canSubmit = chars > 0 && chars <= 2000 && !busy
  const relatedTags = useMemo(() => {
    if (!result) return []
    return [
      result.detectedTopic ?? '',
      ...result.relatedTags,
      result.needsExpertAdvice ? '在留' : '',
    ]
  }, [result])

  async function handleSubmit() {
    if (!canSubmit) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/text-understand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, userNote }),
      })
      const data = (await res.json()) as ApiResponse
      if (!res.ok || !data.ok || !data.data) {
        setError(data.error?.message ?? '文字理解失败，请稍后再试')
        return
      }
      setResult(data.data.result)
    } catch {
      setError('网络异常，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="pt-3">
      <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-accent-2 text-ink">
            <Languages size={19} strokeWidth={1.55} />
          </span>
          <div>
            <h1 className="text-[16px] font-medium leading-snug text-ink">粘贴一段日文</h1>
            <p className="mt-1 text-[11.5px] leading-[1.65] text-ash">
              通知、邮件、网页、LINE 文字都可以。最多 2000 字。
            </p>
          </div>
        </div>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={2200}
          placeholder="例：市役所からのお知らせ、税金の納付期限、入管からの通知文..."
          className="mt-4 min-h-[190px] w-full resize-none rounded-[14px] border border-hairline bg-canvas px-3.5 py-3 text-[14px] leading-[1.65] text-ink outline-none placeholder:text-haze focus:border-accent"
        />
        <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-ash">
          <span>{chars > 2000 ? '超过 2000 字，请删短' : 'AI 会按字面内容解释，不替你做行政判断'}</span>
          <span>{chars}/2000</span>
        </div>

        <button
          type="button"
          onClick={() => setShowContext(v => !v)}
          className="mt-3 flex w-full items-center justify-between rounded-[12px] border border-hairline bg-canvas px-3 py-2 text-left text-[12px] font-medium text-ink"
        >
          补充上下文（选填）
          <ChevronDown
            size={14}
            strokeWidth={1.55}
            className={`transition ${showContext ? 'rotate-180' : ''}`}
          />
        </button>
        {showContext && (
          <textarea
            value={userNote}
            onChange={e => setUserNote(e.target.value)}
            maxLength={400}
            placeholder="例：我是技人国，8 月续签，住在江戸川区。"
            className="mt-2 min-h-[86px] w-full resize-none rounded-[13px] border border-hairline bg-canvas px-3.5 py-3 text-[13px] leading-[1.6] text-ink outline-none placeholder:text-haze focus:border-accent"
          />
        )}

        {error && (
          <div className="mt-3 flex items-start gap-2 rounded-[12px] border border-accent/35 bg-accent-2 px-3 py-2 text-[11.5px] leading-[1.6] text-ink">
            <AlertTriangle size={14} strokeWidth={1.55} className="mt-0.5 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="mt-4">
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {busy ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={15} strokeWidth={1.55} className="animate-spin" />
                理解中
              </span>
            ) : (
              '开始理解'
            )}
          </Button>
        </div>
      </section>

      {result && (
        <>
          <ResultSection icon={<Languages size={15} strokeWidth={1.55} />} title="这段日文什么意思">
            {result.meaning}
          </ResultSection>
          <ResultSection icon={<ShieldCheck size={15} strokeWidth={1.55} />} title="和你可能有什么关系">
            {result.relevance}
          </ResultSection>
          <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
            <div className="mb-1.5 flex items-center gap-2">
              <FileText size={15} strokeWidth={1.55} className="text-ink" />
              <p className="text-[13px] font-medium text-ink">可以先这样处理</p>
            </div>
            <ol className="list-decimal space-y-1 pl-4 text-[12px] leading-[1.65] text-slate">
              {result.generalActions.map(action => (
                <li key={action}>{action}</li>
              ))}
            </ol>
          </section>
          {result.confidence === 'low' && (
            <section className="mt-3 rounded-card border border-accent/35 bg-accent-2 px-4 py-3 text-[11.5px] leading-[1.65] text-ink shadow-card">
              这段文字的上下文不完整，建议补充前后文或拍照识别原文件。
            </section>
          )}
          <RelatedKnowledge tags={relatedTags} />
          <ComplianceFooter />
        </>
      )}
    </div>
  )
}

function ResultSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-ink">{icon}</span>
        <p className="text-[13px] font-medium text-ink">{title}</p>
      </div>
      <p className="text-[12px] leading-[1.65] text-slate">{children}</p>
    </section>
  )
}
