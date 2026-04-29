import { db } from '@/lib/db'
import {
  textUnderstandRequests,
  type NewTextUnderstandRequest,
  type TextUnderstandRequest,
} from '@/lib/db/schema'

export const FREE_TEXT_UNDERSTAND_PER_MONTH = Infinity

export interface TextUnderstandQuota {
  unlimited: boolean
  used: number
  limit: number
  remaining: number
}

export async function getTextUnderstandQuotaForFamily(
  familyId: string,
): Promise<TextUnderstandQuota> {
  void familyId
  return { unlimited: true, used: 0, limit: Infinity, remaining: Infinity }
}

export async function getTextUnderstandQuotaForSession(
  sessionId: string,
): Promise<TextUnderstandQuota> {
  void sessionId
  return { unlimited: true, used: 0, limit: Infinity, remaining: Infinity }
}

export async function createTextUnderstandRequest(
  input: NewTextUnderstandRequest,
): Promise<TextUnderstandRequest> {
  const [row] = await db.insert(textUnderstandRequests).values(input).returning()
  return row
}
