import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: '拍照即懂 | TEBIQ',
  description: '拍一张日本生活手续相关的文书，识别内容、关键日期、需要的行动。',
  alternates: { canonical: '/photo' },
  openGraph: {
    title: '拍照即懂 — TEBIQ',
    description: '拍照看懂日文文书：住民税、年金、在留カード相关通知。',
    url: 'https://tebiq.jp/photo',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
  },
}

export default function PhotoLayout({ children }: { children: ReactNode }) {
  return children
}
