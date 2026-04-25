import { notFound } from 'next/navigation'
import UsersClient from './UsersClient'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }
  return <UsersClient adminKey={sp.key ?? ''} />
}
