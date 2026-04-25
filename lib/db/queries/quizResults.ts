/**
 * Quiz results DAL.
 *
 * member_id is nullable: anonymous users get a sessionId that can later
 * be migrated to a logged-in member.
 */
import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { quizResults, type NewQuizResult, type QuizResult } from '@/lib/db/schema'

export async function createQuizResult(input: NewQuizResult): Promise<QuizResult> {
  const [row] = await db.insert(quizResults).values(input).returning()
  return row
}

export async function getQuizResultById(id: string): Promise<QuizResult | null> {
  const rows = await db
    .select()
    .from(quizResults)
    .where(eq(quizResults.id, id))
    .limit(1)
  return rows[0] ?? null
}

export async function listQuizResultsByMemberId(
  memberId: string,
  limit = 50,
): Promise<QuizResult[]> {
  return await db
    .select()
    .from(quizResults)
    .where(eq(quizResults.memberId, memberId))
    .orderBy(desc(quizResults.createdAt))
    .limit(limit)
}

export async function listQuizResultsBySessionId(
  sessionId: string,
  limit = 50,
): Promise<QuizResult[]> {
  return await db
    .select()
    .from(quizResults)
    .where(eq(quizResults.sessionId, sessionId))
    .orderBy(desc(quizResults.createdAt))
    .limit(limit)
}

/** Migrate anonymous results to a member after login. */
export async function attachSessionResultsToMember(
  sessionId: string,
  memberId: string,
): Promise<number> {
  const result = await db
    .update(quizResults)
    .set({ memberId })
    .where(eq(quizResults.sessionId, sessionId))
    .returning({ id: quizResults.id })
  return result.length
}
