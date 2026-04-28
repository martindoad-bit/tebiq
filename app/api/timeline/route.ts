import { ok, errors } from '@/lib/api/response'
import {
  archiveExpiredTimelineEventsForMember,
  listTimelineEvents,
  type TimelineEventType,
} from '@/lib/db/queries/timeline'
import { getTimelineRequestOwner } from '@/lib/timeline/owner'
import { formatTimelineAssociation } from '@/lib/timeline/builders'

export const dynamic = 'force-dynamic'

const VALID_TYPES = new Set<TimelineEventType>([
  'photo_recognition',
  'self_check',
  'text_understand',
  'policy_match',
  'manual_note',
])

function boolParam(value: string | null): boolean | null {
  if (value === 'true') return true
  if (value === 'false') return false
  return null
}

export async function GET(req: Request) {
  const owner = await getTimelineRequestOwner()
  if (!owner.memberId && !owner.sessionId) return ok({ events: [], total: 0 })
  if (owner.user) await archiveExpiredTimelineEventsForMember(owner.user)

  const url = new URL(req.url)
  const requestedMemberId = url.searchParams.get('member_id')
  if (requestedMemberId && requestedMemberId !== owner.memberId) return errors.forbidden()
  const eventTypeRaw = url.searchParams.get('event_type')
  const eventType = eventTypeRaw && VALID_TYPES.has(eventTypeRaw as TimelineEventType)
    ? eventTypeRaw as TimelineEventType
    : null
  const limit = Number(url.searchParams.get('limit') ?? 50)
  const offset = Number(url.searchParams.get('offset') ?? 0)
  const rows = await listTimelineEvents(
    { memberId: owner.memberId, sessionId: owner.sessionId },
    {
      eventType,
      docType: url.searchParams.get('doc_type'),
      issuer: url.searchParams.get('issuer'),
      from: url.searchParams.get('from'),
      to: url.searchParams.get('to'),
      tag: url.searchParams.get('tag'),
      archived: boolParam(url.searchParams.get('archived')),
      includeArchived: url.searchParams.get('include_archived') === 'true',
      limit,
      offset,
    },
  )

  return ok({
    events: rows.map(row => ({
      ...formatTimelineAssociation(row),
      archived: row.archived,
      deadline: row.deadline,
      tags: row.tags,
    })),
    total: rows.length,
  })
}

export function POST() {
  return errors.badRequest('timeline events are created by tools')
}
