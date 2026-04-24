import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tebiq.jp'),
  title: 'TEBIQ - 在日签证续签风险自查',
  description:
    '3 分钟发现续签隐藏风险。200+ 真实案例经验，帮你避开续签雷区。完全免费，答案不上传。',
  openGraph: {
    title: 'TEBIQ - 在日签证续签风险自查',
    description: '3 分钟发现续签隐藏风险。完全免费。',
    url: 'https://tebiq.jp',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEBIQ - 在日签证续签风险自查',
    description: '3 分钟发现续签隐藏风险。完全免费。',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0f172a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
