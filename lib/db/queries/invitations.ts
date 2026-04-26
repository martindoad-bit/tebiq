/**
 * Invitations DAL — share link & referral rewards.
 *
 * Flow:
 *   inviter creates invite (createInvitation) → gets short code
 *   invitee opens /invite/{code} and signs up → redeemInvitation
 *   reward (7 days basic trial for both) granted when status='accepted'
 */
import { and, desc, eq, lt, sql } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import { invitations, members, type Invitation, type NewInvitation } from '@/lib/db/schema'
import { grantBasicTrialDaysToFamily } from './subscriptions'

const CODE_LEN = 8
export const INVITE_REWARD_DAYS = Number(process.env.INVITE_REWARD_DAYS ?? 7)
export const INVITE_EXPIRY_DAYS = Number(process.env.INVITE_EXPIRY_DAYS ?? 30)
export const INVITE_MONTHLY_REWARD_CAP_DAYS = Number(
  process.env.INVITE_MONTHLY_REWARD_CAP_DAYS ?? 30,
)

function generateCode(): string {
  return createId().slice(0, CODE_LEN)
}

export interface InvitationStats {
  invitedCount: number
  earnedDays: number
  pendingDays: number
}

export class InvitationLimitError extends Error {
  constructor(message = '本月邀请奖励已达上限') {
    super(message)
    this.name = 'InvitationLimitError'
  }
}

function expiryCutoff(): Date {
  return new Date(Date.now() - INVITE_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
}

function isExpired(invitation: Invitation): boolean {
  return invitation.status === 'pending' && invitation.createdAt.getTime() < expiryCutoff().getTime()
}

function monthRange(now = new Date()) {
  return {
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(now.getFullYear(), now.getMonth() + 1, 1),
  }
}

export async function expireOldPendingInvitations(): Promise<void> {
  await db
    .update(invitations)
    .set({ status: 'expired' })
    .where(and(eq(invitations.status, 'pending'), lt(invitations.createdAt, expiryCutoff())))
}

async function getMonthlyRewardDays(inviterMemberId: string): Promise<number> {
  const { start, end } = monthRange()
  const [row] = await db
    .select({
      rewarded: sql<number>`count(*) filter (
        where ${invitations.status} = 'accepted'
          and ${invitations.rewardGranted} = true
          and ${invitations.acceptedAt} >= ${start}
          and ${invitations.acceptedAt} < ${end}
      )::int`,
    })
    .from(invitations)
    .where(eq(invitations.inviterMemberId, inviterMemberId))
  return Number(row?.rewarded ?? 0) * INVITE_REWARD_DAYS
}

async function assertMonthlyRewardAvailable(inviterMemberId: string): Promise<void> {
  const earnedDays = await getMonthlyRewardDays(inviterMemberId)
  if (earnedDays + INVITE_REWARD_DAYS > INVITE_MONTHLY_REWARD_CAP_DAYS) {
    throw new InvitationLimitError()
  }
}

export async function createInvitation(
  inviterMemberId: string,
): Promise<Invitation> {
  await expireOldPendingInvitations()
  await assertMonthlyRewardAvailable(inviterMemberId)
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
  await expireOldPendingInvitations()
  await assertMonthlyRewardAvailable(inviterMemberId)
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
  await expireOldPendingInvitations()
  const rows = await db
    .select()
    .from(invitations)
    .where(eq(invitations.code, code))
    .limit(1)
  const invitation = rows[0] ?? null
  if (!invitation) return null
  if (!isExpired(invitation)) return invitation
  const [expired] = await db
    .update(invitations)
    .set({ status: 'expired' })
    .where(eq(invitations.id, invitation.id))
    .returning()
  return expired ?? { ...invitation, status: 'expired' }
}

export async function getInvitationLandingByCode(code: string): Promise<{
  invitation: Invitation
  inviter: { id: string; familyId: string; name: string | null; phone: string }
} | null> {
  await expireOldPendingInvitations()
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
  const row = rows[0] ?? null
  if (!row) return null
  if (!isExpired(row.invitation)) return row
  const [expired] = await db
    .update(invitations)
    .set({ status: 'expired' })
    .where(eq(invitations.id, row.invitation.id))
    .returning()
  return expired ? { ...row, invitation: expired } : row
}

/** Mark code as accepted; idempotent (returns null if already accepted). */
export async function redeemInvitation(
  code: string,
  inviteeMemberId: string,
): Promise<Invitation | null> {
  const inv = await getInvitationByCode(code)
  if (!inv || inv.status !== 'pending') return null
  const alreadyInvited = await db
    .select({ id: invitations.id })
    .from(invitations)
    .where(and(eq(invitations.inviteeMemberId, inviteeMemberId), eq(invitations.status, 'accepted')))
    .limit(1)
  if (alreadyInvited[0]) return null

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
  await expireOldPendingInvitations()
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
  await assertMonthlyRewardAvailable(inviter.id)

  const [invitee] = await db
    .select({
      id: members.id,
      familyId: members.familyId,
    })
    .from(members)
    .where(eq(members.id, inviteeMemberId))
    .limit(1)
  if (!invitee) return null

  let accepted: Invitation | null = null
  try {
    accepted = await redeemInvitation(code, inviteeMemberId)
  } catch {
    return null
  }
  if (!accepted || accepted.rewardGranted) return accepted

  await grantBasicTrialDaysToFamily(inviter.familyId, INVITE_REWARD_DAYS)
  await grantBasicTrialDaysToFamily(invitee.familyId, INVITE_REWARD_DAYS)
  await markRewardGranted(invitation.id)

  const latest = await getInvitationByCode(code)
  return latest ?? accepted
}
