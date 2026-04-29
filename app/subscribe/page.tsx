'use client'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CalendarDays, Check, CreditCard, ShieldCheck, TimerReset } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import { apiPost, ApiError } from '@/lib/api/client'

const PLANS = [
  {
    product: 'basic_monthly',
    name: '月度会员',
    price: '¥980 / 月',
    meta: '拍照不限 / 提醒永久 / 续签自查不限',
    primary: true,
  },
  {
    product: 'basic_yearly',
    name: '年度会员',
    price: '¥8,800 / 年',
    meta: '同月度权益 / 约 25% 折扣',
    primary: false,
  },
] as const

const BENEFITS = [
  '拍照即懂不限次数',
  '提醒永久保留',
  '接下来 30 天和历史期限可查询',
  '政策更新按记录字段匹配',
] as const

export default function SubscribePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<typeof PLANS[number]['product']>('basic_monthly')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleSubscribe() {
    if (busy) return
    setBusy(true)
    setErr(null)
    try {
      const res = await apiPost<{ checkout_url: string }>('/api/stripe/checkout', {
        product: selected,
      })
      if (res.checkout_url) {
        window.location.href = res.checkout_url
      } else {
        setErr('未能创建支付链接')
      }
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === 401) {
          router.push('/login?next=/subscribe')
          return
        }
        setErr(e.message)
      } else {
        setErr('网络异常')
      }
    } finally {
      setBusy(false)
    }
  }

  const selectedPlan = PLANS.find(plan => plan.product === selected) ?? PLANS[0]

  return (
    <AppShell appBar={<AppBar title="会员" back />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-cool-blue text-ink">
            <TimerReset size={19} strokeWidth={1.55} />
          </span>
          <div>
            <p className="text-[15px] font-semibold leading-snug text-ink">拍照不限 + 提醒永久</p>
            <p className="mt-2 text-[28px] font-semibold leading-none text-ink">{selectedPlan.price}</p>
            <p className="mt-2 text-[12px] leading-[1.65] text-ash">{selectedPlan.meta}</p>
          </div>
        </div>
      </section>

      <section className="mt-3 grid gap-2">
        {PLANS.map(plan => {
          const active = selected === plan.product
          return (
            <button
              key={plan.product}
              type="button"
              onClick={() => setSelected(plan.product)}
              className={`rounded-card border px-4 py-3 text-left shadow-card transition ${
                active ? 'border-ink bg-surface' : 'border-hairline bg-surface/70'
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span>
                  <span className="block text-[13px] font-semibold text-ink">{plan.name}</span>
                  <span className="mt-1 block text-[11px] text-ash">{plan.meta}</span>
                </span>
                <span className="text-right text-[13px] font-semibold text-ink">{plan.price}</span>
              </span>
            </button>
          )
        })}
      </section>

      <section className="mt-3 grid grid-cols-3 gap-2">
        <Metric icon={<CameraIcon />} title="拍照" sub="不限" />
        <Metric icon={<CalendarDays size={15} strokeWidth={1.55} />} title="提醒" sub="永久" />
        <Metric icon={<ShieldCheck size={15} strokeWidth={1.55} />} title="自查" sub="不限" />
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <h2 className="text-[13px] font-medium text-ink">包含内容</h2>
        <ul className="mt-3 grid gap-2">
          {BENEFITS.map(item => (
            <li key={item} className="flex items-start gap-2 text-[12px] leading-[1.6] text-slate">
              <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-ink text-white">
                <Check size={10.5} strokeWidth={2} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {err && <p className="mt-3 text-center text-[12px] text-danger" role="alert">{err}</p>}
      <Button onClick={handleSubscribe} disabled={busy} className="mt-4">
        {busy ? '处理中' : `开通${selectedPlan.name}`}
      </Button>

      <div className="mt-5 rounded-card border border-hairline bg-surface/70 px-4 py-3 shadow-card">
        <div className="flex items-center gap-2 text-[11px] text-ash">
          <CreditCard size={14} strokeWidth={1.55} className="text-ink" />
          Stripe 处理付款
        </div>
        <div className="mt-1.5 text-[11px] leading-[1.6] text-ash">
          免费层: 拍照每天 1 次，提醒保留 30 天。注册后自动开始 7 天试用。
        </div>
      </div>

      <p className="mt-3 text-center text-[12px] text-ash">
        <Link href="/timeline" className="underline-offset-4 hover:text-ink">查看我的提醒</Link>
      </p>
    </AppShell>
  )
}

function Metric({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className="min-w-0 rounded-[14px] border border-hairline bg-surface/80 px-2.5 py-2.5 shadow-soft">
      <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-[9px] bg-cool-blue text-ink">
        {icon}
      </div>
      <div className="truncate text-[11.5px] font-semibold leading-none text-ink">{title}</div>
      <div className="mt-1 truncate text-[10px] leading-none text-ash">{sub}</div>
    </div>
  )
}

function CameraIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}
