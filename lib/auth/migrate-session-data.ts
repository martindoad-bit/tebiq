import { and, eq, isNull } from 'drizzle-orm'
import { db } from '@/lib/db'
import { documents, events, members, quizResults, timelineEvents } from '@/lib/db/schema'

export interface SessionDataMigrationResult {
  documents: number
  quizResults: number
  events: number
  timelineEvents: number
}

async function getOwnerMemberId(familyId: string): Promise<string | null> {
  const rows = await db
    .select({ id: members.id })
    .from(members)
    .where(and(eq(members.familyId, familyId), eq(members.isOwner, true)))
    .limit(1)
  return rows[0]?.id ?? null
}

export async function migrateSessionDataToFamily(
  sessionId: string | null | undefined,
  familyId: string,
): Promise<SessionDataMigrationResult> {
  if (!sessionId) return { documents: 0, quizResults: 0, events: 0, timelineEvents: 0 }

  const memberId = await getOwnerMemberId(familyId)
  const migratedDocuments = await db
    .update(documents)
    .set({ familyId, memberId })
    .where(and(eq(documents.sessionId, sessionId), isNull(documents.familyId)))
    .returning({ id: documents.id })

  const migratedQuizResults = memberId
    ? await db
        .update(quizResults)
        .set({ memberId })
        .where(and(eq(quizResults.sessionId, sessionId), isNull(quizResults.memberId)))
        .returning({ id: quizResults.id })
    : []

  const migratedEvents = await db
    .update(events)
    .set({ familyId, memberId })
    .where(and(eq(events.sessionId, sessionId), isNull(events.familyId)))
    .returning({ id: events.id })

  const migratedTimelineEvents = memberId
    ? await db
        .update(timelineEvents)
        .set({ memberId })
        .where(and(eq(timelineEvents.sessionId, sessionId), isNull(timelineEvents.memberId)))
        .returning({ id: timelineEvents.id })
    : []

  return {
    documents: migratedDocuments.length,
    quizResults: migratedQuizResults.length,
    events: migratedEvents.length,
    timelineEvents: migratedTimelineEvents.length,
  }
}
