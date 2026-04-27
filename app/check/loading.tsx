/**
 * /check 路由组的 loading 骨架屏（v5 风格 — 不是 spinner）。
 */
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'

function Pulse({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-[8px] bg-canvas ${className}`} />
}

export default function CheckLoading() {
  return (
    <AppShell appBar={<AppBar title="续签自查" back="/" />}>
      <div className="mt-3 space-y-3">
        <div className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
          <Pulse className="h-4 w-32 mb-3" />
          <Pulse className="h-3 w-full mb-2" />
          <Pulse className="h-3 w-4/5" />
        </div>
        <div className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
          <Pulse className="h-4 w-24 mb-3" />
          <Pulse className="h-10 w-full mb-2" />
          <Pulse className="h-10 w-full mb-2" />
          <Pulse className="h-10 w-full" />
        </div>
      </div>
    </AppShell>
  )
}
