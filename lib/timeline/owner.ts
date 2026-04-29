import { getAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import type { Member } from '@/lib/db/schema'

export interface TimelineRequestOwner {
  user: Member | null
  memberId: string | null
  sessionId: string | null
}

export async function getTimelineRequestOwner(): Promise<TimelineRequestOwner> {
  const user = await getCurrentUser()
  if (user) return { user, memberId: user.id, sessionId: null }
  const sessionId = await getAnonymousSessionId()
  return { user: null, memberId: null, sessionId }
}
