/**
 * Members DAL.
 *
 * - getOrCreateByPhone is the main entry point from auth flow:
 *   creates a fresh family + member if the phone is unseen.
 * - All other operations are member-scoped.
 */
import { eq, asc, isNotNull, inArray } from 'drizzle-orm'
import { db } from '@/lib/db'
import { families, members, type Member, type NewMember } from '@/lib/db/schema'

export async function getMemberByPhone(phone: string): Promise<Member | null> {
  const rows = await db.select().from(members).where(eq(members.phone, phone)).limit(1)
  return rows[0] ?? null
}

export async function getMemberByEmail(email: string): Promise<Member | null> {
  const normalized = email.trim().toLowerCase()
  const rows = await db.select().from(members).where(eq(members.email, normalized)).limit(1)
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
        archiveRetentionUntil: archiveDateFromNow(30),
      })
      .returning()
    return member
  })
}

export async function getOrCreateMemberByEmail(email: string): Promise<Member> {
  const normalized = email.trim().toLowerCase()
  const existing = await getMemberByEmail(normalized)
  if (existing) return existing

  return await db.transaction(async tx => {
    const [family] = await tx.insert(families).values({}).returning()
    const [member] = await tx
      .insert(members)
      .values({
        familyId: family.id,
        email: normalized,
        emailVerifiedAt: new Date(),
        isOwner: true,
        archiveRetentionUntil: archiveDateFromNow(30),
      })
      .returning()
    return member
  })
}

/**
 * Profile fields editable from /my/profile.
 * All optional; UI passes only the keys the user filled in.
 */
export type MemberProfilePatch = Partial<
  Pick<
    NewMember,
    | 'name'
    | 'email'
    | 'emailVerifiedAt'
    | 'visaType'
    | 'visaExpiry'
    | 'nationality'
    | 'arrivedAt'
    | 'maritalStatus'
    | 'hasChildren'
    | 'currentJobIndustry'
    | 'lastVisaRenewalAt'
    | 'companyType'
    | 'recentChanges'
    | 'archiveRetentionUntil'
  >
>

export async function updateMemberProfile(
  id: string,
  patch: MemberProfilePatch,
): Promise<Member | null> {
  const [row] = await db
    .update(members)
    .set(patch)
    .where(eq(members.id, id))
    .returning()
  return row ?? null
}

export async function updateMemberEmail(
  id: string,
  email: string | null,
): Promise<Member | null> {
  const [row] = await db
    .update(members)
    .set({
      email,
      emailVerifiedAt: null,
    })
    .where(eq(members.id, id))
    .returning()
  return row ?? null
}

export async function updateMemberPhone(
  id: string,
  phone: string | null,
): Promise<Member | null> {
  const [row] = await db
    .update(members)
    .set({ phone })
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

function archiveDateFromNow(days: number): string {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export async function setArchiveRetentionForFamily(
  familyId: string,
  until: string,
): Promise<number> {
  const rows = await db
    .update(members)
    .set({ archiveRetentionUntil: until })
    .where(eq(members.familyId, familyId))
    .returning({ id: members.id })
  return rows.length
}

export async function listMemberIdsByFamilyId(familyId: string): Promise<string[]> {
  const rows = await db
    .select({ id: members.id })
    .from(members)
    .where(eq(members.familyId, familyId))
  return rows.map(row => row.id)
}

export async function setArchiveRetentionForMembers(
  memberIds: string[],
  until: string,
): Promise<number> {
  if (memberIds.length === 0) return 0
  const rows = await db
    .update(members)
    .set({ archiveRetentionUntil: until })
    .where(inArray(members.id, memberIds))
    .returning({ id: members.id })
  return rows.length
}

/**
 * All members who have a visa_expiry set — used by the check-expiry cron.
 * Indexed via members_visa_expiry_idx so this is cheap even at scale.
 */
export async function listMembersWithVisaExpiry(): Promise<Member[]> {
  return await db
    .select()
    .from(members)
    .where(isNotNull(members.visaExpiry))
    .orderBy(asc(members.visaExpiry))
}
