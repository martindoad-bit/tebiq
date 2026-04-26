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
function QuotaModalFromQuery() {
  const router = useRouter()
  const sp = useSearchParams()
  const quotaFull = sp?.get('quota') === 'full'
  return (
    <QuotaFullModal
      open={quotaFull}
      onClose={() => router.replace('/photo')}
    />
  )
}

export default function PhotoEntryPage() {
  return (
    <AppShell appBar={<AppBar title="拍照即懂" back />} tabBar={<TabBar />}>
      <div className="flex flex-col min-h-full">
        <p className="text-center text-[11px] text-ash mt-1 mb-4">
          任何日文文件，拍照即理解
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
