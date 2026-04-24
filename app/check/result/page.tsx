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

  let title = 'TEBIQ - 续签自查结果'
  let description = '在日签证续签风险自查 · 3 分钟看清你的情况'

  if (v === 'green') {
    title = '✅ 我的续签前置条件全部通过 - TEBIQ'
    description = '我刚做完续签风险自查，前置条件全部通过！3 分钟你也来测一测。'
  } else if (v === 'yellow') {
    title = `⚠️ 发现 ${n} 项需要注意的问题 - TEBIQ`
    description = `续签自查发现 ${n} 项需要处理。完整结果与处理建议请查看。`
  } else if (v === 'red') {
    title = `🚨 发现 ${n} 项严重风险，续签前必须处理 - TEBIQ`
    description = `续签自查检测到 ${n} 项严重风险。在递签前必须先解决。`
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
