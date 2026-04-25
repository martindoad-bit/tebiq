import { notFound } from 'next/navigation'
import ConsultationsClient from './ConsultationsClient'

export const dynamic = 'force-dynamic'

export default async function AdminConsultationsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }
  return <ConsultationsClient adminKey={sp.key ?? ''} />
}
