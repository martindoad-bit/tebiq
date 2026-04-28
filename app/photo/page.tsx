/**
 * /photo — 屏 02 拍照入口
 *
 * 视觉源：docs/prototype/v5-mockup.html lines 1272-1330
 *
 * - AppShell + AppBar(title="拍照即懂", back) + TabBar
 * - 副标题 + 大块拍照框（PhotoUploader）
 * - 最近记录列表（RecentList）
 * - 当 ?quota=full 出现 → 弹起 QuotaFullModal（屏 15）
 *
 * 标记 client 因为要读 query 参数 + 控制 modal state。
 */
'use client'
import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import PhotoUploader from './_components/PhotoUploader'
import RecentList from './_components/RecentList'
import QuotaFullModal from './_components/QuotaFullModal'

/**
 * useSearchParams 必须在 Suspense 边界内（Next.js 14 静态生成约束）。
 * 把 modal 部分单独抽成子组件即可。
 */
function daysUntilNextMonthUtc(): number {
  const now = new Date()
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1))
  return Math.ceil((next.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))
}

function QuotaModalFromQuery() {
  const router = useRouter()
  const sp = useSearchParams()
  const quotaFull = sp?.get('quota') === 'full'
  return (
    <QuotaFullModal
      open={quotaFull}
      onClose={() => router.replace('/photo')}
      daysUntilReset={daysUntilNextMonthUtc()}
    />
  )
}

export default function PhotoEntryPage() {
  return (
    <AppShell appBar={<AppBar title="拍照即懂" back />} tabBar={<TabBar />}>
      <div className="flex flex-col min-h-full">
        <p className="mx-auto mb-4 mt-2 max-w-[330px] break-all text-center text-[clamp(14px,3.8vw,16px)] leading-[1.65] text-slate/76">
          住民税、年金、在留カード相关文件都可以先拍照确认
        </p>

        <PhotoUploader />

        <RecentList />
      </div>

      <Suspense fallback={null}>
        <QuotaModalFromQuery />
      </Suspense>
    </AppShell>
  )
}
