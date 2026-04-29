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

  let title = 'TEBIQ - 续签材料准备检查结果'
  let description = '在日签证续签材料准备检查 · 3 分钟整理准备事项'

  if (v === 'green') {
    title = '续签材料基本齐备 - TEBIQ'
    description = '续签材料准备检查结果为基本齐备。'
  } else if (v === 'yellow') {
    title = `发现 ${n} 项需要补齐 - TEBIQ`
    description = `材料准备检查发现 ${n} 项需要补齐。完整结果与处理建议请查看。`
  } else if (v === 'red') {
    title = `发现 ${n} 项待确认事项 - TEBIQ`
    description = `材料准备检查检测到 ${n} 项待确认事项。递交前请先确认。`
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
