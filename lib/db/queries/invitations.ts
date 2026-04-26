/**
 * Invitations DAL — share link & referral rewards.
 *
 * Flow:
 *   inviter creates invite (createInvitation) → gets short code
 *   invitee opens /invite/{code} and signs up → redeemInvitation
 *   reward (7 days basic trial for both) granted when status='accepted'
 */
import { and, desc, eq, sql } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import { invitations, members, type Invitation, type NewInvitation } from '@/lib/db/schema'
import { grantBasicTrialDaysToFamily } from './subscriptions'

const CODE_LEN = 8
export const INVITE_REWARD_DAYS = Number(process.env.INVITE_REWARD_DAYS ?? 7)

function generateCode(): string {
  return createId().slice(0, CODE_LEN)
}

export interface InvitationStats {
  invitedCount: number
  earnedDays: number
  pendingDays: number
}

export async function createInvitation(
  inviterMemberId: string,
): Promise<Invitation> {
  const code = generateCode()
  const [row] = await db
    .insert(invitations)
    .values({
      inviterMemberId,
      code,
      status: 'pending',
    } satisfies NewInvitation)
    .returning()
  return row
}

export async function getOrCreatePendingInvitation(
  inviterMemberId: string,
): Promise<Invitation> {
  const rows = await db
    .select()
    .from(invitations)
    .where(
      and(
        eq(invitations.inviterMemberId, inviterMemberId),
        eq(invitations.status, 'pending'),
      ),
    )
    .orderBy(desc(invitations.createdAt))
    .limit(1)
  if (rows[0]) return rows[0]
  return await createInvitation(inviterMemberId)
}

export async function getInvitationByCode(code: string): Promise<Invitation | null> {
  const rows = await db
    .select()
    .from(invitations)
    .where(eq(invitations.code, code))
    .limit(1)
  return rows[0] ?? null
}

export async function getInvitationLandingByCode(code: string): Promise<{
  invitation: Invitation
  inviter: { id: string; familyId: string; name: string | null; phone: string }
} | null> {
  const rows = await db
    .select({
      invitation: invitations,
      inviter: {
        id: members.id,
        familyId: members.familyId,
        name: members.name,
        phone: members.phone,
      },
    })
    .from(invitations)
    .innerJoin(members, eq(invitations.inviterMemberId, members.id))
    .where(eq(invitations.code, code))
    .limit(1)
  return rows[0] ?? null
}

/** Mark code as accepted; idempotent (returns null if already accepted). */
export async function redeemInvitation(
  code: string,
  inviteeMemberId: string,
): Promise<Invitation | null> {
  const inv = await getInvitationByCode(code)
  if (!inv || inv.status !== 'pending') return null
  const [row] = await db
    .update(invitations)
    .set({
      inviteeMemberId,
      status: 'accepted',
      acceptedAt: new Date(),
    })
    .where(eq(invitations.id, inv.id))
    .returning()
  return row ?? null
}

export async function markRewardGranted(id: string): Promise<void> {
  await db.update(invitations).set({ rewardGranted: true }).where(eq(invitations.id, id))
}

export async function getInvitationStats(inviterMemberId: string): Promise<InvitationStats> {
  const [row] = await db
    .select({
      accepted: sql<number>`count(*) filter (where ${invitations.status} = 'accepted')::int`,
      rewarded: sql<number>`count(*) filter (where ${invitations.status} = 'accepted' and ${invitations.rewardGranted} = true)::int`,
      pendingReward: sql<number>`count(*) filter (where ${invitations.status} = 'accepted' and ${invitations.rewardGranted} = false)::int`,
    })
    .from(invitations)
    .where(eq(invitations.inviterMemberId, inviterMemberId))

  const invitedCount = Number(row?.accepted ?? 0)
  return {
    invitedCount,
    earnedDays: Number(row?.rewarded ?? 0) * INVITE_REWARD_DAYS,
    pendingDays: Number(row?.pendingReward ?? 0) * INVITE_REWARD_DAYS,
  }
}

export async function acceptInvitationAndGrantReward(
  code: string,
  inviteeMemberId: string,
): Promise<Invitation | null> {
  const landing = await getInvitationLandingByCode(code)
  if (!landing) return null
  const { invitation, inviter } = landing
  if (invitation.status !== 'pending') return null
  if (inviter.id === inviteeMemberId) return null

  const [invitee] = await db
    .select({
      id: members.id,
      familyId: members.familyId,
    })
    .from(members)
    .where(eq(members.id, inviteeMemberId))
    .limit(1)
  if (!invitee) return null

  const accepted = await redeemInvitation(code, inviteeMemberId)
  if (!accepted || accepted.rewardGranted) return accepted

  await grantBasicTrialDaysToFamily(inviter.familyId, INVITE_REWARD_DAYS)
  await grantBasicTrialDaysToFamily(invitee.familyId, INVITE_REWARD_DAYS)
  await markRewardGranted(invitation.id)

  const latest = await getInvitationByCode(code)
  return latest ?? accepted
}
