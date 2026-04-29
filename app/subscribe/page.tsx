'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import { StatusBadge } from '@/components/ui/tebiq'
import { apiPost, ApiError } from '@/lib/api/client'

const PAID_PLANS = [
  {
    product: 'basic_monthly',
    name: '月度',
    price: '¥980',
    period: '月',
    features: ['拍照每天不限', '提醒持续保留', '时间线查询'],
  },
  {
    product: 'basic_yearly',
    name: '年度',
    price: '¥8,800',
    period: '年',
    features: ['拍照每天不限', '提醒持续保留', '时间线查询', '省 25%'],
  },
] as const

const FREE_FEATURES = ['拍照每天 1 次', '注册赠 7 天试用', '基础提醒']

export default function SubscribePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<typeof PAID_PLANS[number]['product']>('basic_yearly')
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

  const selectedPlan = PAID_PLANS.find(plan => plan.product === selected) ?? PAID_PLANS[1]

  return (
    <AppShell appBar={<AppBar title="会员" back />}>
      <section className="mt-3 border-b border-hairline pb-5">
        <p className="text-[13px] text-ash">定价</p>
        <h1 className="mt-2 text-[20px] font-medium leading-snug text-ink">文书识别和提醒</h1>
        <p className="mt-2 text-[13px] leading-[1.7] text-ash">
          按使用频率选择。付款由 Stripe 处理。
        </p>
      </section>

      <section className="mt-4 overflow-hidden rounded-card border border-hairline bg-surface">
        <PlanStaticCard name="免费版" price="¥0" period="" features={FREE_FEATURES} />
        {PAID_PLANS.map(plan => (
          <button
            key={plan.product}
            type="button"
            onClick={() => setSelected(plan.product)}
            className={`focus-ring w-full border-b border-hairline px-4 py-4 text-left last:border-b-0 ${
              selected === plan.product ? 'bg-paper' : 'bg-surface'
            }`}
          >
            <PlanContent
              name={plan.name}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              selected={selected === plan.product}
            />
          </button>
        ))}
      </section>

      {err && <p className="mt-3 text-center text-[12px] text-warning" role="alert">{err}</p>}
      <Button onClick={handleSubscribe} disabled={busy} className="mt-4">
        {busy ? '处理中' : `开通${selectedPlan.name}`}
      </Button>

      <p className="mt-4 text-center text-[12px] text-ash">
        <Link href="/timeline" className="underline-offset-4 hover:text-ink">查看我的提醒</Link>
      </p>
    </AppShell>
  )
}

function PlanStaticCard({
  name,
  price,
  period,
  features,
}: {
  name: string
  price: string
  period: string
  features: readonly string[]
}) {
  return (
    <div className="border-b border-hairline px-4 py-4">
      <PlanContent name={name} price={price} period={period} features={features} />
    </div>
  )
}

function PlanContent({
  name,
  price,
  period,
  features,
  selected,
}: {
  name: string
  price: string
  period: string
  features: readonly string[]
  selected?: boolean
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[15px] font-medium text-ink">{name}</p>
            {name === '年度' && <StatusBadge tone="neutral">省 25%</StatusBadge>}
          </div>
          <p className="mt-2 flex items-baseline gap-1">
            <span className="numeric text-[34px] font-light leading-none text-ink">{price}</span>
            {period && <span className="text-[13px] text-ash">/ {period}</span>}
          </p>
        </div>
        {selected && <StatusBadge tone="checked">已选</StatusBadge>}
      </div>
      <ul className="mt-3 grid gap-1.5 text-[12px] leading-[1.6] text-ash">
        {features.map(feature => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}
