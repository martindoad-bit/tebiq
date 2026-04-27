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
  title: 'TEBIQ — 你的在日生活好帮手',
  description:
    '在日生活のお守り。拍照即懂日文文件、续签自查、到期提醒，一个 App 帮你管好在日生活的麻烦事。',
  openGraph: {
    title: 'TEBIQ — 你的在日生活好帮手',
    description: '拍照即懂、续签自查、到期提醒。在日生活のお守り。',
    url: 'https://tebiq.jp',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEBIQ — 你的在日生活好帮手',
    description: '拍照即懂、续签自查、到期提醒。',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#233B37',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/logo-icon.png" />
        <link rel="apple-touch-icon" href="/logo-icon.png" />
      </head>
      <body className="bg-canvas text-ink antialiased">{children}</body>
    </html>
  )
}
