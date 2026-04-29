import { errors } from '@/lib/api/response'
import { getCurrentUser } from '@/lib/auth/session'
import { listTimelineEvents } from '@/lib/db/queries/timeline'
import { listDocumentsByFamilyId } from '@/lib/db/queries/documents'
import { listQuizResultsByMemberId } from '@/lib/db/queries/quizResults'

export const dynamic = 'force-dynamic'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return errors.unauthorized()

  const [timelineEvents, documents, quizResults] = await Promise.all([
    listTimelineEvents({ memberId: user.id }, { includeArchived: true, limit: 100 }),
    listDocumentsByFamilyId(user.familyId, 100),
    listQuizResultsByMemberId(user.id, 100),
  ])

  return Response.json(
    {
      exported_at: new Date().toISOString(),
      member: {
        id: user.id,
        family_id: user.familyId,
        email: user.email,
        phone: user.phone,
        visa_type: user.visaType,
        visa_expiry: user.visaExpiry,
      },
      timeline_events: timelineEvents,
      documents,
      quiz_results: quizResults,
    },
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'content-disposition': 'attachment; filename="tebiq-export.json"',
      },
    },
  )
}
