/**
 * /photo 路由组的 loading 骨架屏（v5 风格）。
 */
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'

function Pulse({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-[8px] bg-canvas ${className}`} />
}

export default function PhotoLoading() {
  return (
    <AppShell appBar={<AppBar title="拍照" back />} tabBar={<TabBar />}>
      <Pulse className="h-3 w-2/3 mx-auto mt-2 mb-3" />
      <div className="rounded-card border border-hairline bg-surface px-4 py-12 flex flex-col items-center">
        <div className="h-12 w-12 mb-3 rounded-[14px] bg-canvas animate-pulse" />
        <Pulse className="h-3 w-32 mb-2" />
        <Pulse className="h-3 w-40" />
      </div>
      <div className="mt-4 space-y-2">
        <Pulse className="h-3 w-20 mb-1" />
        <Pulse className="h-14 w-full" />
        <Pulse className="h-14 w-full" />
      </div>
    </AppShell>
  )
}
