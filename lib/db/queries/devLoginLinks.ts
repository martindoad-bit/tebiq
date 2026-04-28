import { desc, eq, isNull } from 'drizzle-orm'
import { db } from '@/lib/db'
import { devLoginLinks, type DevLoginLink } from '@/lib/db/schema'

export function isDevLoginLinksEnabled(): boolean {
  return process.env.NODE_ENV !== 'production'
}

export async function createDevLoginLink(input: {
  token: string
  email: string
  link: string
}): Promise<DevLoginLink | null> {
  if (!isDevLoginLinksEnabled()) return null
  const [row] = await db
    .insert(devLoginLinks)
    .values({
      token: input.token,
      email: input.email.trim().toLowerCase(),
      link: input.link,
    })
    .onConflictDoUpdate({
      target: devLoginLinks.token,
      set: {
        email: input.email.trim().toLowerCase(),
        link: input.link,
        consumedAt: null,
      },
    })
    .returning()
  return row ?? null
}

export async function markDevLoginLinkConsumed(token: string): Promise<void> {
  if (!isDevLoginLinksEnabled() || !token) return
  await db
    .update(devLoginLinks)
    .set({ consumedAt: new Date() })
    .where(eq(devLoginLinks.token, token))
}

export async function listUnconsumedDevLoginLinks(limit = 50): Promise<DevLoginLink[]> {
  if (!isDevLoginLinksEnabled()) return []
  return await db
    .select()
    .from(devLoginLinks)
    .where(isNull(devLoginLinks.consumedAt))
    .orderBy(desc(devLoginLinks.createdAt))
    .limit(limit)
}
