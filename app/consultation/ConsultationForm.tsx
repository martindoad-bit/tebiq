'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  AlertCircle,
  ClipboardList,
  MessageSquareText,
  Send,
  ShieldCheck,
} from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import {
  COLOR_LABEL,
  CONTACT_LABEL,
  URGENCY_LABEL,
  VISA_LABEL,
  type ContactMethod,
  type ResultColor,
  type Urgency,
} from '@/lib/consultation'

const CTX_KEY = 'tebiq_consultation_ctx'

interface PageContext {
  visaType: string
  resultColor: ResultColor | 'unknown'
  triggeredItems: string[]
}

const LOCATIONS = ['东京都', '大阪府', '爱知县', '神奈川县', '京都府', '北海道', '其他']

export default function ConsultationForm() {
  const router = useRouter()
  const params = useSearchParams()

  const visaParam = params.get('visa') ?? 'unknown'
  const colorParam = params.get('color') ?? 'unknown'

  const [ctx, setCtx] = useState<PageContext>({
    visaType: visaParam,
    resultColor: isResultColorOrUnknown(colorParam) ? colorParam : 'unknown',
    triggeredItems: [],
  })

  // sessionStorage 中可能存了完整上下文（含 triggeredItems），优先使用
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = sessionStorage.getItem(CTX_KEY)
      if (!raw) return
      const stored = JSON.parse(raw) as PageContext
      // URL 参数优先于 sessionStorage（用户从结果页 CTA 进来都会带）
      setCtx(prev => ({
        visaType: prev.visaType !== 'unknown' ? prev.visaType : stored.visaType,
        resultColor: prev.resultColor !== 'unknown' ? prev.resultColor : stored.resultColor,
        triggeredItems: stored.triggeredItems ?? [],
      }))
    } catch {
      /* ignore */
    }
  }, [])

  const [userName, setUserName] = useState('')
  const [preferredContact, setPreferredContact] = useState<ContactMethod>('phone')
  const [contactDetail, setContactDetail] = useState('')
  const [location, setLocation] = useState('')
  const [urgency, setUrgency] = useState<Urgency>('normal')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    setError(null)
    if (!contactDetail.trim()) {
      setError('请填写联系方式详情')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: userName.trim() || undefined,
          preferredContact,
          contactDetail: contactDetail.trim(),
          location: location || undefined,
          urgency,
          additionalInfo: additionalInfo.trim() || undefined,
          visaType: ctx.visaType,
          resultColor: ctx.resultColor,
          triggeredItems: ctx.triggeredItems,
          sourceVisa: ctx.visaType,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '',
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error ?? '提交失败，请稍后重试')
        return
      }
      sessionStorage.removeItem(CTX_KEY)
      router.push('/consultation/success')
    } catch {
      setError('网络异常，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppShell appBar={<AppBar title="预约咨询" back="/" />}>
      <section className="pt-4">
        <div className="inline-flex items-center gap-1.5 rounded-chip bg-accent-2 px-3 py-1.5 text-[11px] font-medium text-ink">
          <ClipboardList size={13} strokeWidth={1.55} />
            预约咨询
        </div>
        <h1 className="mt-3 max-w-full text-[26px] font-medium leading-[1.18] text-ink">
          预约专业书士咨询
        </h1>
        <p className="mt-3 max-w-full break-words text-[13px] leading-[1.7] text-slate">
          提交后我们会在 24 小时内联系你，根据你的情况匹配合适的持牌行政书士。
        </p>
      </section>

      {/* 用户情况摘要 */}
      <section className="mt-5">
        <ContextCard ctx={ctx} />
      </section>

      <section className="mt-4 pb-4">
        <form
          onSubmit={handleSubmit}
          className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card"
        >
          <div className="mb-4 flex items-center gap-2 text-[13px] font-medium text-ink">
            <MessageSquareText size={16} strokeWidth={1.55} />
            联系信息
          </div>

          <Field label="姓名" hint="选填，方便我们称呼你">
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              maxLength={40}
              placeholder="王先生 / 李女士"
              className={controlClass}
            />
          </Field>

          <Field label="希望的联系方式" required>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(CONTACT_LABEL) as ContactMethod[]).map(m => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setPreferredContact(m)}
                  className={`min-h-[40px] rounded-[11px] border text-[12px] font-medium transition-colors ${
                    preferredContact === m
                      ? 'border-accent bg-accent text-ink shadow-soft'
                      : 'border-hairline bg-surface text-ash hover:border-accent'
                  }`}
                >
                  {CONTACT_LABEL[m]}
                </button>
              ))}
            </div>
          </Field>

          <Field label="联系方式详情" required hint={contactPlaceholderHint(preferredContact)}>
            <input
              type="text"
              value={contactDetail}
              onChange={e => setContactDetail(e.target.value)}
              required
              maxLength={120}
              placeholder={contactPlaceholder(preferredContact)}
              className={controlClass}
            />
          </Field>

          <Field label="所在地域" hint="选填">
            <select
              value={location}
              onChange={e => setLocation(e.target.value)}
              className={controlClass}
            >
              <option value="">不指定</option>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </Field>

          <Field label="希望处理时间" required>
            <div className="space-y-2">
              {(Object.keys(URGENCY_LABEL) as Urgency[]).map(u => (
                <label
                  key={u}
                  className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-[11px] border px-3 py-2.5 transition-colors ${
                    urgency === u ? 'border-accent bg-accent-2' : 'border-hairline bg-surface hover:border-accent'
                  }`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    checked={urgency === u}
                    onChange={() => setUrgency(u)}
                    className="accent-[#F6B133]"
                  />
                  <span className="text-[13px] text-ink">{URGENCY_LABEL[u]}</span>
                </label>
              ))}
            </div>
          </Field>

          <Field label="补充说明" hint="选填，比如具体疑问或时间限制">
            <textarea
              value={additionalInfo}
              onChange={e => setAdditionalInfo(e.target.value)}
              rows={4}
              maxLength={1000}
              className={`${controlClass} resize-y text-[13px]`}
            />
          </Field>

          {error && (
            <p className="flex items-start gap-1.5 text-[12px] font-medium leading-relaxed text-danger">
              <AlertCircle size={14} strokeWidth={1.55} className="mt-0.5 flex-shrink-0" />
              {error}
            </p>
          )}

          <div className="mt-4 rounded-[12px] bg-canvas px-3 py-3">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-ink">
              <ShieldCheck size={13} strokeWidth={1.55} />
              关于你的信息
            </p>
            <ul className="space-y-1 text-[11px] leading-relaxed text-ash">
              <li>提交的信息仅用于本次咨询对接</li>
              <li>不会用于其他营销用途</li>
              <li>不会出售或共享给第三方</li>
              <li>
                详见
                <Link
                  href="/privacy"
                  className="mx-0.5 text-ink underline underline-offset-2"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-btn bg-accent px-4 text-[14px] font-medium text-ink shadow-cta transition-transform active:translate-y-px disabled:opacity-60"
          >
            {submitting ? '提交中...' : (
              <>
                <Send size={16} strokeWidth={1.55} />
                提交咨询请求
              </>
            )}
          </button>

          <p className="mt-4 border-t border-hairline pt-3 text-[11px] leading-relaxed text-ash">
            本平台聚合合作书士资源，根据您的情况匹配合适的专业人士。
          </p>
        </form>
      </section>
    </AppShell>
  )
}

function ContextCard({ ctx }: { ctx: PageContext }) {
  const visaLabel = VISA_LABEL[ctx.visaType] ?? ctx.visaType
  return (
    <div className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-ink">
        <ClipboardList size={16} strokeWidth={1.55} />
        你的自查情况
      </div>
      <dl className="space-y-2 text-[12px] leading-relaxed">
        <div className="flex gap-3">
          <span className="w-[68px] flex-shrink-0 text-ash">签证类型</span>
          <span className="min-w-0 flex-1 break-words font-medium text-ink">{visaLabel}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-[68px] flex-shrink-0 text-ash">自查结果</span>
          <ColorBadge color={ctx.resultColor} />
        </div>
        {ctx.triggeredItems.length > 0 && (
          <div className="rounded-[11px] bg-canvas px-3 py-2.5">
            <span className="mb-1.5 block text-[11px] font-medium text-ash">触发的主要风险</span>
            <ul className="space-y-1 text-[12px] leading-relaxed text-slate">
              {ctx.triggeredItems.slice(0, 5).map((it, i) => (
                <li key={i} className="flex gap-1.5">
                  <AlertCircle size={13} strokeWidth={1.55} className="mt-0.5 flex-shrink-0 text-accent" />
                  <span>{it}</span>
                </li>
              ))}
              {ctx.triggeredItems.length > 5 && (
                <li className="text-ash">等 {ctx.triggeredItems.length} 项</li>
              )}
            </ul>
          </div>
        )}
      </dl>
    </div>
  )
}

function ColorBadge({ color }: { color: PageContext['resultColor'] }) {
  if (color === 'red') {
    return (
      <span className="rounded-[8px] bg-[#FDECEA] px-2 py-1 text-[11px] font-medium text-danger">
        {COLOR_LABEL.red}
      </span>
    )
  }
  if (color === 'yellow') {
    return (
      <span className="rounded-[8px] bg-accent-2 px-2 py-1 text-[11px] font-medium text-ink">
        {COLOR_LABEL.yellow}
      </span>
    )
  }
  if (color === 'green') {
    return (
      <span className="rounded-[8px] bg-[#E7F4ED] px-2 py-1 text-[11px] font-medium text-success">
        {COLOR_LABEL.green}
      </span>
    )
  }
  return <span className="text-[11px] text-ash">{COLOR_LABEL.unknown}</span>
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-[12px] font-medium text-ink">
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
        {hint && <span className="ml-2 text-[11px] font-normal text-ash">{hint}</span>}
      </span>
      {children}
    </label>
  )
}

const controlClass =
  'w-full rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 text-[16px] text-ink outline-none placeholder:text-haze transition-colors focus:border-accent'

function contactPlaceholder(m: ContactMethod): string {
  if (m === 'phone') return '例：090-1234-5678'
  if (m === 'wechat') return '例：wxid_abcdef'
  if (m === 'line') return '例：line_id_abc'
  return '例：name@example.com'
}

function contactPlaceholderHint(m: ContactMethod): string {
  if (m === 'wechat') return '请准确填写微信号，方便我们添加'
  if (m === 'line') return '请填写 LINE ID 或扫码截图链接'
  return ''
}

function isResultColorOrUnknown(v: string): v is ResultColor | 'unknown' {
  return v === 'red' || v === 'yellow' || v === 'green' || v === 'unknown'
}
