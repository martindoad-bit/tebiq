/**
 * Notifications DAL — schedule + status tracking.
 *
 * Block 1: write-only API for now; actual delivery (email / SMS / push)
 * lands in Block 2.
 */
import { and, desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  notifications,
  type NewNotification,
  type Notification,
} from '@/lib/db/schema'

export async function scheduleNotification(
  input: NewNotification,
): Promise<Notification> {
  const [row] = await db
    .insert(notifications)
    .values({ ...input, status: input.status ?? 'queued' })
    .returning()
  return row
}

export async function listQueuedNotifications(limit = 100): Promise<Notification[]> {
  return await db
    .select()
    .from(notifications)
    .where(eq(notifications.status, 'queued'))
    .orderBy(desc(notifications.createdAt))
    .limit(limit)
}

export async function markNotificationSent(
  id: string,
): Promise<Notification | null> {
  const [row] = await db
    .update(notifications)
    .set({ status: 'sent', sentAt: new Date() })
    .where(eq(notifications.id, id))
    .returning()
  return row ?? null
}

export async function markNotificationFailed(
  id: string,
): Promise<Notification | null> {
  const [row] = await db
    .update(notifications)
    .set({ status: 'failed' })
    .where(eq(notifications.id, id))
    .returning()
  return row ?? null
}

export async function listNotificationsByFamilyId(
  familyId: string,
  limit = 50,
): Promise<Notification[]> {
  return await db
    .select()
    .from(notifications)
    .where(eq(notifications.familyId, familyId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit)
}

export async function hasNotificationOfType(
  familyId: string,
  type: string,
): Promise<boolean> {
  const rows = await db
    .select({ id: notifications.id })
    .from(notifications)
    .where(and(eq(notifications.familyId, familyId), eq(notifications.type, type)))
    .limit(1)
  return rows.length > 0
}
