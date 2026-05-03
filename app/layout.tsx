import type { Metadata, Viewport } from 'next'
import './globals.css'

/**
 * Root layout — Block 3 streamlined.
 *
 * v5 visual system uses per-page <AppShell> which owns its own <TabBar>
 * and footer affordances. Layout no longer mounts a global MobileNav or
 * LegalFooter — pages opt-in (legal pages can mount LegalFooter
 * themselves; admin / login skip the tab bar).
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://tebiq.jp'),
  title: 'TEBIQ — 下一步怎么做',
  description:
    '签证、税金、年金、会社手续和日文通知。先看下一步、材料、期限和办理窗口。',
  openGraph: {
    title: 'TEBIQ — 下一步怎么做',
    description: '签证、税金、年金、会社手续和日文通知。先看下一步、材料、期限和办理窗口。',
    url: 'https://tebiq.jp',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEBIQ — 下一步怎么做',
    description: '签证、税金、年金、会社手续和日文通知。先看下一步、材料、期限和办理窗口。',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0F2544',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        {/* V07 Quiet Brow favicon stack — root-level paths so they
            resolve at any route depth. ICO covers legacy browsers,
            16/32 PNG cover modern, apple-touch-icon covers iOS home
            screen. PWA manifest icons live under /brand/tebiq-v07/pwa. */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-canvas text-ink antialiased">{children}</body>
    </html>
  )
}
