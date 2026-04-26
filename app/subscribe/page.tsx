/**
 * Screen 10 — 订阅方案
 *
 * 3 个 plan card：月付 ¥980 / 年付 ¥9,800 / 高级 ¥19,800
 * 「推荐」tag 在月付（per v5）
 *
 * 订阅按钮：调用 /api/stripe/checkout 取 checkout_url 跳转。
 * 实际付费配置在 Stripe Dashboard，env 变量未配时按钮会失败。
 */
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, CreditCard, ShieldCheck, Sparkles } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import { apiPost, ApiError } from '@/lib/api/client'

type PlanId = 'basic_monthly' | 'basic_yearly' | 'premium_yearly'

interface Plan {
  id: PlanId
  product: 'basic_monthly' | 'basic_yearly' | 'expert_consultation'
  name: string
  price: string
  meta: string
  tag?: string
  benefits: string[]
}

// 注：高级会员（¥19,800）走 Stripe 还需要单独 Product；目前用 expert_consultation 占位
// Block 4 配 Dashboard 时可拆出独立 premium_yearly product
const PLANS: Plan[] = [
  {
    id: 'basic_monthly',
    product: 'basic_monthly',
    name: '月度会员',
    price: '¥980 / 月',
    meta: '享受所有会员权益',
    tag: '推荐',
    benefits: ['无限次拍照识别', '重要事项提醒', '永久保存档案'],
  },
  {
    id: 'basic_yearly',
    product: 'basic_yearly',
    name: '年度会员',
    price: '¥9,800 / 年',
    meta: '¥817 / 月，节省 16%',
    benefits: ['包含月度全部权益', '年付更省', '适合长期在日生活'],
  },
  {
    id: 'premium_yearly',
    product: 'expert_consultation',
    name: '高级会员',
    price: '¥19,800 / 年',
    meta: '含 1 次专家咨询（价值 ¥15,000）',
    benefits: ['包含年度全部权益', '1 次专家咨询', '复杂情况优先处理'],
  },
]

export default function SubscribePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<PlanId>('basic_monthly')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleSubscribe() {
    if (busy) return
    setBusy(true)
    setErr(null)
    try {
      const plan = PLANS.find(p => p.id === selected)
      if (!plan) return
      const res = await apiPost<{ checkout_url: string }>('/api/stripe/checkout', {
        product: plan.product,
      })
      if (res.checkout_url) {
        window.location.href = res.checkout_url
      } else {
        setErr('未能创建支付链接，请稍后重试')
      }
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === 401) {
          router.push('/login?next=/subscribe')
          return
        }
        setErr(e.message)
      } else {
        setErr('网络异常，请稍后重试')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <AppShell appBar={<AppBar title="选择适合你的方案" back />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
            <Sparkles size={18} strokeWidth={1.55} />
          </span>
          <div>
            <p className="text-[13px] font-medium leading-snug text-ink">
              拍照即懂用完后，可按月开通
            </p>
            <p className="mt-1 text-[11px] leading-[1.55] text-ash">
              会员主要解锁无限拍照、提醒和档案保存。续签自查仍可免费使用。
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-2.5 mt-3">
        {PLANS.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={selected === plan.id}
            onSelect={() => setSelected(plan.id)}
          />
        ))}
      </div>

      {err && (
        <p className="text-danger text-[12px] mt-3 text-center" role="alert">
          {err}
        </p>
      )}

      <Button onClick={handleSubscribe} disabled={busy} className="mt-4">
        {busy ? '处理中…' : '立即订阅'}
      </Button>

      <p className="text-center text-[12px] text-ash mt-2.5">
        <Link href="/subscribe/compare" className="underline-offset-4 hover:text-ink">
          查看所有权益对比
        </Link>
      </p>

      <div className="mt-5 rounded-card border border-hairline bg-surface/70 px-4 py-3 shadow-card">
        <div className="flex items-center gap-2 text-[11px] text-ash">
          <ShieldCheck size={14} strokeWidth={1.55} className="text-ink" />
          由 Stripe 安全处理付款
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-ash">
          <CreditCard size={14} strokeWidth={1.55} className="text-ink" />
          支持 Card / PayPay / 便利店，随时取消
        </div>
      </div>
    </AppShell>
  )
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left bg-surface rounded-card relative shadow-card transition-all active:translate-y-px ${
        selected
          ? 'border-[1.5px] border-accent p-[13px] bg-accent-2/35'
          : 'border border-hairline p-3.5'
      }`}
    >
      {plan.tag && (
        <span className="absolute -top-2 right-3 bg-accent text-ink text-[10px] font-medium px-2 py-0.5 rounded-[8px]">
          {plan.tag}
        </span>
      )}
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <div className="text-[14px] font-medium text-ink">{plan.name}</div>
          <div className="text-[17px] font-medium text-ink mt-1.5">{plan.price}</div>
          <div className="text-[11px] text-ash mt-0.5">{plan.meta}</div>
        </div>
        <span
          className={`flex-shrink-0 w-[18px] h-[18px] rounded-full transition-all ${
            selected
              ? 'bg-accent border-[1.5px] border-accent shadow-[inset_0_0_0_3px_#FFFFFF]'
              : 'border-[1.5px] border-[rgba(30,58,95,0.2)]'
          }`}
        />
      </div>
      <ul className="mt-3 grid gap-1.5">
        {plan.benefits.map(b => (
          <li key={b} className="flex items-center gap-2 text-[11px] text-slate">
            <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent text-ink">
              <Check size={10.5} strokeWidth={2} />
            </span>
            {b}
          </li>
        ))}
      </ul>
    </button>
  )
}
