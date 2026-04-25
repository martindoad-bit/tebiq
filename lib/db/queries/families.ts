/**
 * Families DAL.
 * A family is the subscription / billing unit. Block 1 keeps families:members 1:1.
 */
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { families, type Family, type NewFamily } from '@/lib/db/schema'

export async function createFamily(input: NewFamily = {}): Promise<Family> {
  const [row] = await db.insert(families).values(input).returning()
  return row
}

export async function getFamilyById(id: string): Promise<Family | null> {
  const rows = await db.select().from(families).where(eq(families.id, id)).limit(1)
  return rows[0] ?? null
}
