import type { Metadata } from 'next'
import ResultClient from './ResultClient'

export const dynamic = 'force-dynamic'

interface ResultSearchParams {
  v?: 'green' | 'yellow' | 'red'
  n?: string
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<ResultSearchParams>
}): Promise<Metadata> {
  const sp = await searchParams
  const v = sp.v
  const n = parseInt(sp.n ?? '0', 10) || 0

  let title = 'TEBIQ - 在留准备自查结果'
  let description = '在留准备自查 · 整理递交前需要核对的事项'

  if (v === 'green') {
    title = '准备事项基本齐备 - TEBIQ'
    description = '在留准备自查结果为基本齐备。'
  } else if (v === 'yellow') {
    title = `发现 ${n} 项需要补齐 - TEBIQ`
    description = `在留准备自查发现 ${n} 项需要补齐。请查看结果与处理建议。`
  } else if (v === 'red') {
    title = `发现 ${n} 项待确认事项 - TEBIQ`
    description = `在留准备自查发现 ${n} 项待确认事项。递交前请先确认。`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://tebiq.jp/check/result',
      siteName: 'TEBIQ',
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default function CheckResultPage() {
  return <ResultClient />
}
