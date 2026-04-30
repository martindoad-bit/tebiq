import { notFound } from 'next/navigation'
import { PageShell } from '@/app/admin/_components/ui'
import { listDecisionCards } from '@/lib/decision/cards'
import ReviewLiteClient from './ReviewLiteClient'

export const dynamic = 'force-dynamic'

export default async function ReviewLitePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }
  const cards = await listDecisionCards({ admin: true })
  return (
    <PageShell
      title="Review Lite"
      subtitle="轻量审核 Decision Cards。当前页面不进主导航；如配置 ADMIN_KEY，需要带 key 参数访问。"
    >
      <ReviewLiteClient cards={cards} />
    </PageShell>
  )
}
