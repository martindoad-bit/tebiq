'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
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
    <main className="min-h-screen bg-base text-body pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
          <Link href="/" className="text-body hover:text-title text-sm">← 首页</Link>
        </div>
      </header>

      <section className="px-4 pt-10 pb-6">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <div className="inline-block bg-highlight text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
            预约咨询
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-title leading-tight mb-3">
            预约专业书士咨询
          </h1>
          <p className="text-body text-sm md:text-base leading-relaxed">
            提交后我们会在 24 小时内联系您，根据您的情况匹配合适的持牌行政书士。
          </p>
        </div>
      </section>

      {/* 用户情况摘要 */}
      <section className="px-4 mb-8">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <ContextCard ctx={ctx} />
        </div>
      </section>

      <section className="px-4 pb-12">
        <form
          onSubmit={handleSubmit}
          className="max-w-md md:max-w-3xl mx-auto bg-card border border-line rounded-2xl p-5 shadow-sm space-y-5"
        >
          <Field label="姓名" hint="选填，方便我们称呼您">
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              maxLength={40}
              placeholder="王先生 / 李女士"
              className="w-full bg-base border border-line rounded-lg px-3 py-2.5 text-title text-base focus:border-primary outline-none"
            />
          </Field>

          <Field label="希望的联系方式" required>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(CONTACT_LABEL) as ContactMethod[]).map(m => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setPreferredContact(m)}
                  className={`min-h-[44px] rounded-lg border text-sm font-bold transition-colors ${
                    preferredContact === m
                      ? 'bg-primary border-primary text-title'
                      : 'bg-card border-line text-body hover:border-primary'
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
              className="w-full bg-base border border-line rounded-lg px-3 py-2.5 text-title text-base focus:border-primary outline-none"
            />
          </Field>

          <Field label="所在地域" hint="选填">
            <select
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full bg-base border border-line rounded-lg px-3 py-2.5 text-title text-base focus:border-primary outline-none"
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                    urgency === u ? 'border-primary bg-highlight' : 'border-line bg-card hover:border-primary'
                  }`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    checked={urgency === u}
                    onChange={() => setUrgency(u)}
                    className="accent-primary"
                  />
                  <span className="text-title text-sm">{URGENCY_LABEL[u]}</span>
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
              className="w-full bg-base border border-line rounded-lg px-3 py-2.5 text-title text-sm resize-y focus:border-primary outline-none"
            />
          </Field>

          {error && (
            <p className="text-[#DC2626] text-sm font-bold">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full min-h-[56px] bg-primary hover:bg-primary-hover disabled:opacity-60 text-title font-bold rounded-xl text-base transition-all"
          >
            {submitting ? '提交中…' : '提交咨询请求 →'}
          </button>

          <p className="text-muted text-[11px] leading-relaxed pt-2 border-t border-line">
            本平台聚合合作书士资源，根据您的情况匹配合适的专业人士。
            您提交的信息仅用于咨询对接，不会用于其他用途。
          </p>
        </form>
      </section>

      <footer className="bg-card border-t border-line px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center">
        <p className="text-muted text-xs">© 2026 TEBIQ</p>
      </footer>
    </main>
  )
}

function ContextCard({ ctx }: { ctx: PageContext }) {
  const visaLabel = VISA_LABEL[ctx.visaType] ?? ctx.visaType
  return (
    <div className="bg-card border border-line border-l-4 border-l-primary rounded-2xl p-5 shadow-sm">
      <div className="text-primary text-xs font-bold mb-2">你的自查情况</div>
      <dl className="text-sm leading-relaxed space-y-1">
        <div>
          <span className="text-muted">签证类型：</span>
          <span className="text-title font-bold">{visaLabel}</span>
        </div>
        <div>
          <span className="text-muted">自查结果：</span>
          <ColorBadge color={ctx.resultColor} />
        </div>
        {ctx.triggeredItems.length > 0 && (
          <div>
            <span className="text-muted block mb-1">触发的主要风险：</span>
            <ul className="ml-3 list-disc text-body text-sm space-y-0.5">
              {ctx.triggeredItems.slice(0, 5).map((it, i) => (
                <li key={i}>{it}</li>
              ))}
              {ctx.triggeredItems.length > 5 && (
                <li className="text-muted">等 {ctx.triggeredItems.length} 项</li>
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
      <span className="bg-[#FEE2E2] text-[#B91C1C] text-xs font-bold px-2 py-0.5 rounded">
        {COLOR_LABEL.red}
      </span>
    )
  }
  if (color === 'yellow') {
    return (
      <span className="bg-highlight text-primary text-xs font-bold px-2 py-0.5 rounded">
        {COLOR_LABEL.yellow}
      </span>
    )
  }
  if (color === 'green') {
    return (
      <span className="bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-2 py-0.5 rounded">
        {COLOR_LABEL.green}
      </span>
    )
  }
  return <span className="text-muted text-xs">{COLOR_LABEL.unknown}</span>
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
    <label className="block">
      <span className="text-title text-sm font-bold mb-1.5 block">
        {label}
        {required && <span className="text-[#DC2626] ml-1">*</span>}
        {hint && <span className="text-muted text-xs font-normal ml-2">{hint}</span>}
      </span>
      {children}
    </label>
  )
}

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
