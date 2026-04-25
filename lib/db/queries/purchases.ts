/**
 * Purchases DAL — one-time orders (材料包 / 拍照包 / 专家咨询).
 */
import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { purchases, type NewPurchase, type Purchase } from '@/lib/db/schema'

export async function createPurchase(input: NewPurchase): Promise<Purchase> {
  const [row] = await db.insert(purchases).values(input).returning()
  return row
}

export async function getPurchaseById(id: string): Promise<Purchase | null> {
  const rows = await db.select().from(purchases).where(eq(purchases.id, id)).limit(1)
  return rows[0] ?? null
}

export async function listPurchasesByFamilyId(familyId: string): Promise<Purchase[]> {
  return await db
    .select()
    .from(purchases)
    .where(eq(purchases.familyId, familyId))
    .orderBy(desc(purchases.createdAt))
}

export async function markPurchasePaid(
  id: string,
  stripePaymentIntentId: string,
): Promise<Purchase | null> {
  const [row] = await db
    .update(purchases)
    .set({
      status: 'paid',
      paidAt: new Date(),
      stripePaymentIntentId,
    })
    .where(eq(purchases.id, id))
    .returning()
  return row ?? null
}

export async function markPurchaseFailed(id: string): Promise<Purchase | null> {
  const [row] = await db
    .update(purchases)
    .set({ status: 'failed' })
    .where(eq(purchases.id, id))
    .returning()
  return row ?? null
}

export async function refundPurchase(id: string): Promise<Purchase | null> {
  const [row] = await db
    .update(purchases)
    .set({ status: 'refunded' })
    .where(eq(purchases.id, id))
    .returning()
  return row ?? null
}
