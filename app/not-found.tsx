/**
 * 全局 404 页 — v5 视觉。
 * 不戏剧化，简单陈述。CTA 回首页 / 知识中心。
 */
import Link from 'next/link'
import { Compass, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-canvas px-4 py-12 flex items-center justify-center">
      <div className="mx-auto w-full max-w-phone rounded-card border border-hairline bg-surface px-5 py-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-accent-2 text-ink shadow-soft">
          <Compass size={22} strokeWidth={1.55} />
        </div>
        <h1 className="text-[18px] font-medium leading-snug text-ink">这一页迷路了</h1>
        <p className="mx-auto mt-2 max-w-[280px] text-[12px] leading-[1.65] text-ash">
          你访问的链接不存在，或者已经下线。可以从首页继续。
        </p>
        <div className="mt-6 space-y-2">
          <Link
            href="/"
            className="flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-btn bg-accent px-4 py-3 text-[13px] font-medium text-white shadow-cta"
          >
            <Home size={14} strokeWidth={1.55} />
            回到首页
          </Link>
          <Link
            href="/knowledge"
            className="flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-btn border border-hairline bg-surface px-4 py-2.5 text-[12.5px] font-medium text-ink"
          >
            浏览知识中心
          </Link>
        </div>
      </div>
    </main>
  )
}
