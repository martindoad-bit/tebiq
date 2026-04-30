import { notFound } from 'next/navigation'
import { PageShell } from '@/app/admin/_components/ui'
import { listDecisionCards } from '@/lib/decision/cards'
import { listAnswerDrafts } from '@/lib/db/queries/answerDrafts'
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
  const [cards, question, answerDrafts] = await Promise.all([
    listDecisionCards({ admin: true }),
    sp.questionId ? getQuestionById(sp.questionId).catch(() => null) : Promise.resolve(null),
    listAnswerDrafts(80).catch(() => []),
  ])
  return (
    <PageShell
      title="Answer Review Lite"
      subtitle="按原始问题检查 answer draft，标记 reviewed / needs_expert / rejected。"
    >
      <ReviewLiteClient
        cards={cards}
        answerDrafts={answerDrafts.map(draft => ({
          id: draft.id,
          questionText: draft.questionText,
          answerType: draft.answerType,
          answerLevel: draft.answerLevel,
          reviewStatus: draft.reviewStatus,
          title: draft.title,
          summary: draft.summary,
          createdAt: draft.createdAt.toISOString(),
          reviewNote: draft.reviewNote,
        }))}
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
