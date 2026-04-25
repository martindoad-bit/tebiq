/**
 * Invitations DAL — share link & referral rewards.
 *
 * Flow:
 *   inviter creates invite (createInvitation) → gets short code
 *   invitee opens /invite/{code} and signs up → redeemInvitation
 *   reward (1 month basic free for both) granted when status='accepted'
 */
import { eq } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import { invitations, type Invitation, type NewInvitation } from '@/lib/db/schema'

const CODE_LEN = 8

function generateCode(): string {
  return createId().slice(0, CODE_LEN)
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

export async function getInvitationByCode(code: string): Promise<Invitation | null> {
  const rows = await db
    .select()
    .from(invitations)
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
