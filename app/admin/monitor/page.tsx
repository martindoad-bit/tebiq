import { notFound } from 'next/navigation'
import MonitorClient from './MonitorClient'

export const dynamic = 'force-dynamic'

export default async function AdminMonitorPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }
  return <MonitorClient adminKey={sp.key ?? ''} />
}
