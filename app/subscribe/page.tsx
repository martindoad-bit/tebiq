'use client'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Archive, Check, CreditCard, Database, FileText, ShieldCheck } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import { apiPost, ApiError } from '@/lib/api/client'

const PLAN = {
  product: 'archive_yearly',
  name: '档案保留年度',
  price: '¥1,580 / 年',
  meta: '档案永久保留 / 时间线查询 / 政策推送',
  benefits: [
    '档案保留 365 天，续费后继续延长',
    '查看完整时间线和历史关联',
    '政策更新按档案字段匹配',
    '拍照 / 文字 / 自查不限次数',
  ],
} as const

export default function SubscribePage() {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleSubscribe() {
    if (busy) return
    setBusy(true)
    setErr(null)
    try {
      const res = await apiPost<{ checkout_url: string }>('/api/stripe/checkout', {
        product: PLAN.product,
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

  return (
    <AppShell appBar={<AppBar title="档案保留" back />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-cool-blue text-ink">
            <Archive size={19} strokeWidth={1.55} />
          </span>
          <div>
            <p className="text-[15px] font-semibold leading-snug text-ink">{PLAN.name}</p>
            <p className="mt-2 text-[28px] font-semibold leading-none text-ink">{PLAN.price}</p>
            <p className="mt-2 text-[12px] leading-[1.65] text-ash">{PLAN.meta}</p>
          </div>
        </div>
      </section>

      <section className="mt-3 grid grid-cols-3 gap-2">
        <Metric icon={<Database size={15} strokeWidth={1.55} />} title="保留" sub="365 天" />
        <Metric icon={<FileText size={15} strokeWidth={1.55} />} title="查询" sub="时间线" />
        <Metric icon={<ShieldCheck size={15} strokeWidth={1.55} />} title="匹配" sub="政策" />
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <h2 className="text-[13px] font-medium text-ink">包含内容</h2>
        <ul className="mt-3 grid gap-2">
          {PLAN.benefits.map(item => (
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
        {busy ? '处理中' : '开通年度档案保留'}
      </Button>

      <div className="mt-5 rounded-card border border-hairline bg-surface/70 px-4 py-3 shadow-card">
        <div className="flex items-center gap-2 text-[11px] text-ash">
          <CreditCard size={14} strokeWidth={1.55} className="text-ink" />
          Stripe 处理付款
        </div>
        <div className="mt-1.5 text-[11px] leading-[1.6] text-ash">
          免费层: 档案保留 30 天，工具不限次数。年度层: 档案保留延长至 365 天。
        </div>
      </div>

      <p className="mt-3 text-center text-[12px] text-ash">
        <Link href="/timeline" className="underline-offset-4 hover:text-ink">查看当前档案</Link>
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
