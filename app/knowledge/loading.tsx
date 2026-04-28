/**
 * /knowledge 路由组的 loading 骨架屏（v5 风格）。
 */
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'

function Pulse({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-[8px] bg-canvas ${className}`} />
}

export default function KnowledgeLoading() {
  return (
    <AppShell appBar={<AppBar title="知识中心" />} tabBar={<TabBar />}>
      <div className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
        <Pulse className="h-4 w-32 mb-2" />
        <Pulse className="h-3 w-2/3" />
      </div>
      <Pulse className="mt-3 h-11 w-full" />
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Pulse key={i} className="h-[76px] w-full" />
        ))}
      </div>
      <Pulse className="mt-5 h-3 w-24 mb-3" />
      <div className="space-y-2.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Pulse key={i} className="h-20 w-full" />
        ))}
      </div>
    </AppShell>
  )
}
