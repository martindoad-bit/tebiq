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
  desc: string
  icon: LucideIcon
  /** 'link' = 直接跳；'portal' = POST /api/stripe/portal；'disabled' = 禁用 */
  kind: 'link' | 'portal' | 'disabled'
  href?: string
  group: 'profile' | 'billing' | 'settings'
}

const ROWS: Row[] = [
  {
    id: 'profile',
    label: '我的信息',
    desc: '姓名、在留期限、联系方式',
    icon: User,
    kind: 'link',
    href: '/my/profile',
    group: 'profile',
  },
  {
    id: 'family',
    label: '家庭成员管理',
    desc: '为家人保存档案和提醒',
    icon: Users,
    kind: 'disabled',
    group: 'profile',
  },
  {
    id: 'subscription',
    label: '订阅管理',
    desc: '查看方案、取消或恢复订阅',
    icon: CreditCard,
    kind: 'portal',
    group: 'billing',
  },
  {
    id: 'payments',
    label: '支付记录',
    desc: '会员付款和收据',
    icon: Receipt,
    kind: 'disabled',
    group: 'billing',
  },
  {
    id: 'invitations',
    label: '邀请记录',
    desc: '查看邀请和奖励状态',
    icon: CheckCircle,
    kind: 'disabled',
    group: 'billing',
  },
  {
    id: 'settings',
    label: '设置',
    desc: '通知、语言和隐私设置',
    icon: Settings,
    kind: 'disabled',
    group: 'settings',
  },
]

const GROUPS: { id: Row['group']; label: string }[] = [
  { id: 'profile', label: '资料' },
  { id: 'billing', label: '会员与支付' },
  { id: 'settings', label: '设置' },
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
      <div className="space-y-3">
        {GROUPS.map(group => {
          const rows = ROWS.filter(row => row.group === group.id)
          return (
            <section key={group.id}>
              <h2 className="mb-2 px-1 text-[11px] font-medium text-ash">
                {group.label}
              </h2>
              <ul className="overflow-hidden rounded-card border border-hairline bg-surface shadow-card">
                {rows.map((row, idx) => {
                  const isFirst = idx === 0
                  const baseCls = `flex items-center gap-3 px-[14px] py-3.5 ${
                    isFirst ? '' : 'border-t border-hairline'
                  }`
                  const inner = (
                    <>
                      <IconBox icon={row.icon} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-medium leading-snug text-ink">
                          {row.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[10.5px] leading-snug text-ash">
                          {row.desc}
                        </span>
                      </span>
                      <ChevronRight
                        size={16}
                        strokeWidth={1.55}
                        className="flex-shrink-0 text-haze"
                      />
                    </>
                  )

                  if (row.kind === 'disabled') {
                    return (
                      <li key={row.id}>
                        <div
                          className={`${baseCls} cursor-not-allowed opacity-65`}
                          aria-disabled="true"
                          title="即将开放"
                        >
                          <IconBox icon={row.icon} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13px] font-medium leading-snug text-ink">
                              {row.label}
                            </span>
                            <span className="mt-0.5 block truncate text-[10.5px] leading-snug text-ash">
                              {row.desc}
                            </span>
                          </span>
                          <span className="flex-shrink-0 rounded-[8px] bg-accent-2 px-2 py-1 text-[10px] font-medium leading-none text-ash">
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
                          className={`${baseCls} w-full text-left transition-colors hover:bg-canvas disabled:opacity-60`}
                        >
                          {inner}
                        </button>
                      </li>
                    )
                  }

                  return (
                    <li key={row.id}>
                      <a
                        href={row.href}
                        className={`${baseCls} transition-colors hover:bg-canvas`}
                      >
                        {inner}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
      {error && (
        <p className="mt-3 text-[12px] text-danger text-center">{error}</p>
      )}
    </>
  )
}

function IconBox({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-accent-2 text-ink">
      <Icon size={15} strokeWidth={1.55} />
    </span>
  )
}
