/**
 * Account list client — handles 订阅管理 click（Stripe portal redirect）
 * 和占位项的禁用展示。
 */
'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ChevronRight,
  User,
  Users,
  CreditCard,
  Receipt,
  CheckCircle,
  Settings,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Row {
  id: string
  label: string
  icon: LucideIcon
  /** 'link' = 直接跳；'portal' = POST /api/stripe/portal；'disabled' = 禁用 */
  kind: 'link' | 'portal' | 'disabled'
  href?: string
}

const ROWS: Row[] = [
  { id: 'profile', label: '我的信息', icon: User, kind: 'link', href: '/my/profile' },
  { id: 'family', label: '家庭成员管理', icon: Users, kind: 'disabled' },
  { id: 'subscription', label: '订阅管理', icon: CreditCard, kind: 'portal' },
  { id: 'payments', label: '支付记录', icon: Receipt, kind: 'disabled' },
  { id: 'invitations', label: '邀请记录', icon: CheckCircle, kind: 'disabled' },
  { id: 'settings', label: '设置', icon: Settings, kind: 'disabled' },
]

export default function AccountListClient({
  hasSubscription,
}: {
  hasSubscription: boolean
}) {
  const router = useRouter()
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handlePortal() {
    setError('')
    if (!hasSubscription) {
      router.push('/subscribe')
      return
    }
    setBusy('subscription')
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      // 标准响应包：{ ok: true, data: { portal_url } }
      const url: string | undefined = data?.data?.portal_url
      if (res.ok && url) {
        window.location.href = url
        return
      }
      const msg: string =
        data?.error?.message ??
        (typeof data?.error === 'string' ? data.error : '无法打开订阅管理')
      setError(msg)
    } catch {
      setError('网络异常，请稍后再试')
    } finally {
      setBusy(null)
    }
  }

  return (
    <>
      <ul className="bg-surface rounded-chip border border-hairline overflow-hidden">
        {ROWS.map((row, idx) => {
          const Icon = row.icon
          const isFirst = idx === 0
          const baseCls = `flex items-center gap-3 px-[14px] py-3 ${
            isFirst ? '' : 'border-t border-hairline'
          }`
          const inner = (
            <>
              <Icon size={22} strokeWidth={1.5} className="text-ink flex-shrink-0" />
              <span className="flex-1 text-[13px] text-ink">{row.label}</span>
              <ChevronRight size={16} className="text-haze flex-shrink-0" />
            </>
          )

          if (row.kind === 'disabled') {
            return (
              <li key={row.id}>
                <div
                  className={`${baseCls} opacity-60 cursor-not-allowed`}
                  aria-disabled="true"
                  title="即将开放"
                >
                  <Icon size={22} strokeWidth={1.5} className="text-ink flex-shrink-0" />
                  <span className="flex-1 text-[13px] text-ink">{row.label}</span>
                  <span className="text-[10px] text-ash bg-accent-2 rounded-full px-2 py-0.5">
                    即将开放
                  </span>
                </div>
              </li>
            )
          }

          if (row.kind === 'portal') {
            return (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={handlePortal}
                  disabled={busy === row.id}
                  className={`${baseCls} w-full text-left disabled:opacity-60`}
                >
                  {inner}
                </button>
              </li>
            )
          }

          return (
            <li key={row.id}>
              <a href={row.href} className={baseCls}>
                {inner}
              </a>
            </li>
          )
        })}
      </ul>
      {error && (
        <p className="mt-3 text-[12px] text-danger text-center">{error}</p>
      )}
    </>
  )
}
