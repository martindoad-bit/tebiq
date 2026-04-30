import { notFound } from 'next/navigation'
import { PageShell } from '@/app/admin/_components/ui'
import { getQuestionStats, listQuestions } from '@/lib/db/queries/questions'
import type { QueryBacklog } from '@/lib/db/schema'
import QuestionsClient from './QuestionsClient'
import type { AdminQuestionRow, AdminQuestionStats } from './types'

export const dynamic = 'force-dynamic'

export default async function AdminQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }

  const result = await loadQuestions()
  return (
    <PageShell
      title="Questions"
      subtitle="用户原始问题、手动导入咨询记录和后续 Decision Card 起草入口。"
    >
      <QuestionsClient
        initialQuestions={result.questions}
        stats={result.stats}
        unavailable={result.unavailable}
      />
    </PageShell>
  )
}

async function loadQuestions(): Promise<{
  questions: AdminQuestionRow[]
  stats: AdminQuestionStats
  unavailable: boolean
}> {
  if (!process.env.DATABASE_URL) {
    return { questions: [], stats: emptyStats(), unavailable: true }
  }
  try {
    const [questions, stats] = await Promise.all([
      listQuestions({ limit: 300 }),
      getQuestionStats(),
    ])
    return { questions: questions.map(serializeQuestion), stats, unavailable: false }
  } catch {
    return { questions: [], stats: emptyStats(), unavailable: true }
  }
}

function serializeQuestion(question: QueryBacklog): AdminQuestionRow {
  return {
    id: question.id,
    rawQuery: question.rawQuery,
    normalizedQuery: question.normalizedQuery,
    visaType: question.visaType,
    contactEmail: question.contactEmail,
    sourcePage: question.sourcePage,
    matchStatus: question.matchStatus,
    status: question.status,
    priority: question.priority,
    note: question.note,
    createdAt: question.createdAt.toISOString(),
    updatedAt: question.updatedAt.toISOString(),
  }
}

function emptyStats(): AdminQuestionStats {
  return { total: 0, today: 0, unprocessed: 0, highPriority: 0, ignored: 0, published: 0 }
}
