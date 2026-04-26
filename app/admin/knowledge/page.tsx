import { notFound } from 'next/navigation'
import AdminKnowledgeClient from './AdminKnowledgeClient'

export const dynamic = 'force-dynamic'

export default async function AdminKnowledgePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }
  return <AdminKnowledgeClient adminKey={sp.key ?? ''} />
}
