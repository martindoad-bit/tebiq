import { notFound } from 'next/navigation'
import { PageShell } from '@/app/admin/_components/ui'
import ImportQuestionsClient from './ImportQuestionsClient'

export const dynamic = 'force-dynamic'

export default async function ImportQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }
  return (
    <PageShell
      title="Import Questions"
      subtitle="粘贴 300-500 个真实历史问题。默认 source_page=manual_import / match_status=manual_import / status=new / priority=normal。"
    >
      <ImportQuestionsClient />
    </PageShell>
  )
}
