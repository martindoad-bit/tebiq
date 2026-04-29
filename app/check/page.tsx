import type { Metadata } from 'next'
import TrackOnMount from '@/app/_components/v5/TrackOnMount'
import CheckDimensionList from './CheckDimensionList'
import { EVENT } from '@/lib/analytics/events'
import { getAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { normalizeCheckVisa } from '@/lib/check/dimensions'
import { listDimensionViews } from '@/lib/db/queries/checkDimensions'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '续签材料准备检查 | TEBIQ',
  description: '按维度确认递交前要看的材料准备事项。完整检查约 5 分钟。',
  alternates: { canonical: '/check' },
}

export default async function CheckLandingPage() {
  const user = await getCurrentUser().catch(() => null)
  const sessionId = user ? null : await getAnonymousSessionId().catch(() => null)
  const visa = normalizeCheckVisa(user?.visaType ?? null)
  const dimensions = await listDimensionViews({ memberId: user?.id ?? null, sessionId }, visa)
    .catch(() => [])

  return (
    <>
      <TrackOnMount event={EVENT.QUIZ_START} />
      <CheckDimensionList visa={visa} dimensions={dimensions} />
    </>
  )
}
