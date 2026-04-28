import { notFound } from 'next/navigation'
import DevLoginClient from './DevLoginClient'

export const dynamic = 'force-dynamic'

export default async function AdminDevLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  if (process.env.NODE_ENV === 'production') notFound()
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }
  return <DevLoginClient adminKey={sp.key ?? ''} />
}
