/**
 * /my/reminders — 提醒中心（v5 screen 12）
 *
 * 视觉跟 docs/prototype/v5-mockup.html 1831-1918。
 *
 * 1.0 数据来源：member 字段（visa_expiry / last_visa_renewal_at）。
 * 数据稀薄时 fall back 到 4 张固定的占位提醒（block 4 才接通知系统）。
 *
 * CN/JP 混排规则：在留期間更新 / 健康保険 / 年金 / 住民税 = 日文原文。
 */
import { redirect } from 'next/navigation'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { getCurrentUser } from '@/lib/auth/session'
import RemindersClient, { type ReminderItem } from './RemindersClient'

export const dynamic = 'force-dynamic'

function fmtDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
}

function daysUntil(target: Date, now: Date): number {
  const ms = target.getTime() - now.getTime()
  return Math.ceil(ms / (1000 * 60 * 60 * 24))
}

export default async function RemindersPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/my/reminders')

  const now = new Date()
  const items: ReminderItem[] = []

  // 1. 在留期間更新 — 来自 visaExpiry
  if (user.visaExpiry) {
    const expiry = new Date(`${user.visaExpiry}T00:00:00`)
    const days = daysUntil(expiry, now)
    if (days >= 0) {
      const urgent = days <= 30
      items.push({
        id: 'visa-expiry',
        title: '在留期間更新',
        meta1: `还有 ${days} 天到期`,
        meta2: fmtDate(expiry),
        urgent,
        kind: 'expiring',
      })
    }
  }

  // 2. 健康保険更新 — 粗略：上次续签 + 1 年
  if (user.lastVisaRenewalAt) {
    const last = new Date(`${user.lastVisaRenewalAt}T00:00:00`)
    const next = new Date(last)
    next.setFullYear(next.getFullYear() + 1)
    const days = daysUntil(next, now)
    if (days >= 0 && days <= 120) {
      items.push({
        id: 'health-insurance',
        title: '健康保険更新',
        meta1: `还有 ${days} 天到期`,
        meta2: fmtDate(next),
        urgent: days <= 14,
        kind: 'expiring',
      })
    }
  }

  // 3. 数据稀薄时使用占位（block 4 接 notifications 后移除）
  if (items.length === 0) {
    items.push(
      {
        id: 'mock-zairyu',
        title: '在留期間更新',
        meta1: '还有 60 天到期',
        meta2: '2024/07/15',
        urgent: false,
        kind: 'expiring',
      },
      {
        id: 'mock-juminzei',
        title: '住民税缴纳',
        meta1: '还有 10 天截止',
        meta2: '2024/05/20',
        urgent: true,
        kind: 'important',
      },
      {
        id: 'mock-nenkin',
        title: '年金更新',
        meta1: '还有 30 天到期',
        meta2: '2024/06/10',
        urgent: false,
        kind: 'expiring',
      },
      {
        id: 'mock-kenko',
        title: '健康保険更新',
        meta1: '还有 45 天到期',
        meta2: '2024/06/25',
        urgent: false,
        kind: 'expiring',
      },
    )
  }

  return (
    <AppShell appBar={<AppBar title="提醒中心" />} tabBar={<TabBar />}>
      <RemindersClient items={items} />
    </AppShell>
  )
}
