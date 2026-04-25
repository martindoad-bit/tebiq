import { notFound } from 'next/navigation'
import QuizResultsClient from './QuizResultsClient'

export const dynamic = 'force-dynamic'

export default async function AdminQuizResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }
  return <QuizResultsClient adminKey={sp.key ?? ''} />
}
