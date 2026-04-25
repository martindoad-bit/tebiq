/**
 * Documents DAL — placeholder for "拍照即懂" feature (Block 3).
 *
 * Schema is in place so subscription quota tracking can count documents
 * even before the upload pipeline ships.
 */
import { and, desc, eq, gte } from 'drizzle-orm'
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
