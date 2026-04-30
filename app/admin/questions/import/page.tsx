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
      title="批量导入问题"
      subtitle="粘贴真实咨询记录。系统按行保存，后续再分流和整理。"
    >
      <ImportQuestionsClient />
    </PageShell>
  )
}
