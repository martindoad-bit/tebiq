/**
 * Documents DAL — placeholder for "拍照即懂" feature (Block 3).
 *
 * Schema is in place so subscription quota tracking can count documents
 * even before the upload pipeline ships.
 */
import { and, desc, eq, gte, isNull } from 'drizzle-orm'
import { db } from '@/lib/db'
import { documents, type Document, type NewDocument } from '@/lib/db/schema'

export async function createDocument(input: NewDocument): Promise<Document> {
  const [row] = await db.insert(documents).values(input).returning()
  return row
}

export async function getDocumentById(id: string): Promise<Document | null> {
  const rows = await db.select().from(documents).where(eq(documents.id, id)).limit(1)
  return rows[0] ?? null
}

export async function listDocumentsByFamilyId(
  familyId: string,
  limit = 50,
): Promise<Document[]> {
  return await db
    .select()
    .from(documents)
    .where(eq(documents.familyId, familyId))
    .orderBy(desc(documents.createdAt))
    .limit(limit)
}

export async function listDocumentsBySessionId(
  sessionId: string,
  limit = 50,
): Promise<Document[]> {
  return await db
    .select()
    .from(documents)
    .where(and(eq(documents.sessionId, sessionId), isNull(documents.familyId)))
    .orderBy(desc(documents.createdAt))
    .limit(limit)
}

/** Used by the photo-quota check (e.g. 30/month for basic tier). */
export async function countDocumentsThisPeriod(
  familyId: string,
  since: Date,
): Promise<number> {
  const rows = await db
    .select({ id: documents.id })
    .from(documents)
    .where(and(eq(documents.familyId, familyId), gte(documents.createdAt, since)))
  return rows.length
}

export async function countSessionDocumentsThisPeriod(
  sessionId: string,
  since: Date,
): Promise<number> {
  const rows = await db
    .select({ id: documents.id })
    .from(documents)
    .where(and(
      eq(documents.sessionId, sessionId),
      isNull(documents.familyId),
      gte(documents.createdAt, since),
    ))
  return rows.length
}

export async function attachSessionDocumentsToFamily(
  sessionId: string,
  familyId: string,
  memberId: string | null = null,
): Promise<number> {
  const rows = await db
    .update(documents)
    .set({ familyId, memberId })
    .where(and(eq(documents.sessionId, sessionId), isNull(documents.familyId)))
    .returning({ id: documents.id })
  return rows.length
}
