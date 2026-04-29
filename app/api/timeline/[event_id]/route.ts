import { ok, errors } from '@/lib/api/response'
import {
  findRelatedTimelineEvents,
  getTimelineEventForOwner,
  updateTimelineEventForOwner,
} from '@/lib/db/queries/timeline'
import { getTimelineRequestOwner } from '@/lib/timeline/owner'
import { formatTimelineAssociation } from '@/lib/timeline/builders'

export const dynamic = 'force-dynamic'

interface Params {
  params: { event_id: string }
}

async function ownerOrUnauthorized() {
  const owner = await getTimelineRequestOwner()
  if (!owner.memberId && !owner.sessionId) return null
  return owner
}

export async function GET(_req: Request, { params }: Params) {
  const owner = await ownerOrUnauthorized()
  if (!owner) return errors.unauthorized()
  const event = await getTimelineEventForOwner(params.event_id, {
    memberId: owner.memberId,
    sessionId: owner.sessionId,
  })
  if (!event) return errors.notFound('timeline event not found')
  const related = await findRelatedTimelineEvents({
    owner: { memberId: owner.memberId, sessionId: owner.sessionId },
    issuer: event.issuer,
    docType: event.docType,
    excludeId: event.id,
    limit: 5,
  })
  return ok({
    event,
    relatedEvents: related.map(formatTimelineAssociation),
  })
}

export async function PATCH(req: Request, { params }: Params) {
  const owner = await ownerOrUnauthorized()
  if (!owner) return errors.unauthorized()
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errors.badRequest('请求体不是合法 JSON')
  }

  const patch: {
    userNote?: string | null
    archived?: boolean
    tags?: string[]
  } = {}
  const raw = body as { user_note?: unknown; userNote?: unknown; archived?: unknown; tags?: unknown }
  if (typeof raw.user_note === 'string') patch.userNote = raw.user_note.trim() || null
  if (typeof raw.userNote === 'string') patch.userNote = raw.userNote.trim() || null
  if (typeof raw.archived === 'boolean') patch.archived = raw.archived
  if (Array.isArray(raw.tags)) {
    patch.tags = raw.tags
      .filter((tag): tag is string => typeof tag === 'string')
      .map(tag => tag.trim())
      .filter(Boolean)
      .slice(0, 12)
  }

  const event = await updateTimelineEventForOwner(params.event_id, {
    memberId: owner.memberId,
    sessionId: owner.sessionId,
  }, patch)
  if (!event) return errors.notFound('timeline event not found')
  return ok({ event })
}
