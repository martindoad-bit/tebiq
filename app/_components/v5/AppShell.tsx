/**
 * AppShell — v5 视觉系统的页面外壳。
 *
 * 桌面端 max-w-phone 居中（保持手机视觉），mobile 全宽。
 * 提供 statusbar 占位、appbar slot、滚动 body、可选的底部 TabBar slot。
 *
 * 用法：
 *   <AppShell appBar={<AppBar title="拍照即懂" back />} tabBar={<TabBar active="home" />}>
 *     ...page body...
 *   </AppShell>
 */
import type { ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  appBar?: ReactNode
  tabBar?: ReactNode
  children: ReactNode
  /** 让 body 背景跟外壳不一样（如拍照页用深色） */
  bodyClassName?: string
  /** 整个外壳背景（默认纸白灰） */
  shellClassName?: string
}

export default function AppShell({
  appBar,
  tabBar,
  children,
  bodyClassName = '',
  shellClassName = 'bg-canvas',
}: Props) {
  return (
    <div className={`tebiq-viewport-lock h-[100dvh] overflow-x-hidden ${shellClassName}`}>
      <div className="tebiq-app-shell mx-0 flex h-[100dvh] min-w-0 max-w-[390px] flex-col overflow-hidden sm:mx-auto sm:max-w-phone md:border-x md:border-hairline md:bg-canvas">
        {appBar}
        <main
          className={`min-h-0 min-w-0 max-w-full flex-1 overflow-x-hidden overflow-y-auto px-3 pb-6 text-[17px] min-[390px]:px-4 sm:px-5 ${bodyClassName}`}
          style={{
            paddingBottom: tabBar ? 'calc(88px + env(safe-area-inset-bottom))' : 'env(safe-area-inset-bottom)',
          }}
        >
          {children}
          <footer className="mt-8 border-t border-hairline pt-4 text-center text-[11.5px] leading-[1.6] text-haze">
            <Link href="/privacy-policy" className="underline-offset-4 hover:text-ink">
              隐私政策 / Privacy Policy
            </Link>
          </footer>
        </main>
        {tabBar}
      </div>
    </div>
  )
}
