/**
 * Consultations DAL — pre-sales / specialist booking form.
 */
import { and, desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  consultations,
  type Consultation,
  type NewConsultation,
} from '@/lib/db/schema'

export async function createConsultation(
  input: NewConsultation,
): Promise<Consultation> {
  const [row] = await db.insert(consultations).values(input).returning()
  return row
}

export async function getConsultationById(id: string): Promise<Consultation | null> {
  const rows = await db
    .select()
    .from(consultations)
    .where(eq(consultations.id, id))
    .limit(1)
  return rows[0] ?? null
}

export async function listConsultations(
  filter: { status?: 'new' | 'contacted' | 'closed' } = {},
  limit = 100,
): Promise<Consultation[]> {
  const where = filter.status ? eq(consultations.status, filter.status) : undefined
  const query = db
    .select()
    .from(consultations)
    .orderBy(desc(consultations.createdAt))
    .limit(limit)
  return where ? await query.where(where) : await query
}

export async function updateConsultationStatus(
  id: string,
  status: 'new' | 'contacted' | 'closed',
): Promise<Consultation | null> {
  const [row] = await db
    .update(consultations)
    .set({ status })
    .where(eq(consultations.id, id))
    .returning()
  return row ?? null
}

export async function listConsultationsByFamilyId(
  familyId: string,
): Promise<Consultation[]> {
  return await db
    .select()
    .from(consultations)
    .where(eq(consultations.familyId, familyId))
    .orderBy(desc(consultations.createdAt))
}

/** Used by admin to filter on multiple criteria. */
export async function listConsultationsAdvanced(
  filter: { status?: 'new' | 'contacted' | 'closed'; familyId?: string },
  limit = 100,
): Promise<Consultation[]> {
  const conditions = []
  if (filter.status) conditions.push(eq(consultations.status, filter.status))
  if (filter.familyId) conditions.push(eq(consultations.familyId, filter.familyId))
  const whereClause = conditions.length === 1 ? conditions[0] : and(...conditions)
  const query = db
    .select()
    .from(consultations)
    .orderBy(desc(consultations.createdAt))
    .limit(limit)
  return whereClause ? await query.where(whereClause) : await query
}
