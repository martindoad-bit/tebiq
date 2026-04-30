import { notFound } from 'next/navigation'
import { PageShell } from '@/app/admin/_components/ui'
import { listDecisionCards } from '@/lib/decision/cards'
import { getQuestionById } from '@/lib/db/queries/questions'
import ReviewLiteClient from './ReviewLiteClient'

export const dynamic = 'force-dynamic'

export default async function ReviewLitePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; questionId?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }
  const [cards, question] = await Promise.all([
    listDecisionCards({ admin: true }),
    sp.questionId ? getQuestionById(sp.questionId).catch(() => null) : Promise.resolve(null),
  ])
  return (
    <PageShell
      title="轻量审核"
      subtitle="按原始问题检查草稿方向、答案等级和是否需要专家。"
    >
      <ReviewLiteClient
        cards={cards}
        question={question ? {
          id: question.id,
          rawQuery: question.rawQuery,
          visaType: question.visaType,
          sourcePage: question.sourcePage,
          status: question.status,
          priority: question.priority,
          createdAt: question.createdAt.toISOString(),
        } : null}
      />
    </PageShell>
  )
}
