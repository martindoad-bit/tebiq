import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TEBIQ - 在留資格の必要書類を即座に確認',
  description: '質問に答えるだけで必要書類リストをAIが生成。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
