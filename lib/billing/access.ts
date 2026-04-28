import {
  isMemberTrialActive,
  listMembersByFamilyId,
  trialDaysRemaining,
} from '@/lib/db/queries/members'
import { getSubscriptionByFamilyId } from '@/lib/db/queries/subscriptions'
import type { Member } from '@/lib/db/schema'

export type AccessTier = 'free' | 'trial' | 'paid_monthly' | 'paid_yearly'

export interface MemberAccess {
  tier: AccessTier
  photoUnlimited: boolean
  timelinePermanent: boolean
  remindersUnlimited: boolean
  trialActive: boolean
  trialExpired: boolean
  trialDaysRemaining: number | null
}

export const FREE_TIMELINE_RETENTION_DAYS = 30
export const FREE_PHOTO_QUOTA_PER_DAY = 1

export async function getMemberAccess(member: Member): Promise<MemberAccess> {
  const sub = await getSubscriptionByFamilyId(member.familyId)
  const paid =
    sub &&
    (sub.status === 'active' || sub.status === 'trialing') &&
    sub.currentPeriodEnd.getTime() > Date.now()

  if (paid) {
    return {
      tier: sub.billingCycle === 'yearly' ? 'paid_yearly' : 'paid_monthly',
      photoUnlimited: true,
      timelinePermanent: true,
      remindersUnlimited: true,
      trialActive: false,
      trialExpired: false,
      trialDaysRemaining: null,
    }
  }

  const trialActive = isMemberTrialActive(member)
  const remaining = trialDaysRemaining(member)
  if (trialActive) {
    return {
      tier: 'trial',
      photoUnlimited: true,
      timelinePermanent: true,
      remindersUnlimited: true,
      trialActive: true,
      trialExpired: false,
      trialDaysRemaining: remaining,
    }
  }

  return {
    tier: 'free',
    photoUnlimited: false,
    timelinePermanent: false,
    remindersUnlimited: false,
    trialActive: false,
    trialExpired: !!member.trialStartedAt && !!member.trialUsed,
    trialDaysRemaining: remaining,
  }
}

export async function getTimelineRetentionCutoff(member: Member | null): Promise<Date | null> {
  if (!member) return daysAgo(FREE_TIMELINE_RETENTION_DAYS)
  const access = await getMemberAccess(member)
  return access.timelinePermanent ? null : daysAgo(FREE_TIMELINE_RETENTION_DAYS)
}

export async function familyHasUnlimitedPhoto(familyId: string): Promise<boolean> {
  const sub = await getSubscriptionByFamilyId(familyId)
  if (
    sub &&
    (sub.status === 'active' || sub.status === 'trialing') &&
    sub.currentPeriodEnd.getTime() > Date.now()
  ) {
    return true
  }
  const member = await getOwnerLikeMember(familyId)
  return member ? isMemberTrialActive(member) : false
}

async function getOwnerLikeMember(familyId: string): Promise<Member | null> {
  const list = await listMembersByFamilyId(familyId)
  return list.find(member => member.isOwner) ?? list[0] ?? null
}

function daysAgo(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d
}
