/**
 * Members DAL.
 *
 * - getOrCreateByPhone is the main entry point from auth flow:
 *   creates a fresh family + member if the phone is unseen.
 * - All other operations are member-scoped.
 */
import { eq, asc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { families, members, type Member, type NewMember } from '@/lib/db/schema'

export async function getMemberByPhone(phone: string): Promise<Member | null> {
  const rows = await db.select().from(members).where(eq(members.phone, phone)).limit(1)
  return rows[0] ?? null
}

export async function getMemberById(id: string): Promise<Member | null> {
  const rows = await db.select().from(members).where(eq(members.id, id)).limit(1)
  return rows[0] ?? null
}

/**
 * Look up or provision a member for a phone number.
 * If absent, creates a new family with this member as the owner.
 */
export async function getOrCreateMemberByPhone(phone: string): Promise<Member> {
  const existing = await getMemberByPhone(phone)
  if (existing) return existing

  return await db.transaction(async tx => {
    const [family] = await tx.insert(families).values({}).returning()
    const [member] = await tx
      .insert(members)
      .values({
        familyId: family.id,
        phone,
        isOwner: true,
      })
      .returning()
    return member
  })
}

export async function updateMemberProfile(
  id: string,
  patch: Partial<Pick<NewMember, 'name' | 'visaType' | 'visaExpiry'>>,
): Promise<Member | null> {
  const [row] = await db
    .update(members)
    .set(patch)
    .where(eq(members.id, id))
    .returning()
  return row ?? null
}

export async function listMembersByFamilyId(familyId: string): Promise<Member[]> {
  return await db
    .select()
    .from(members)
    .where(eq(members.familyId, familyId))
    .orderBy(asc(members.createdAt))
}
