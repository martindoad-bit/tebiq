// 账号系统 - 走 lib/storage 统一存储层
//
// Key 规范：
//   user:{phone}        → User（含 history）
//   otp:{phone}         → OtpRecord（5 分钟 TTL）
//   session:{sessionId} → phone 字符串（30 天 TTL）

import { storage } from '@/lib/storage'
import type { Verdict } from '@/lib/check/questions'

export interface HistoryRecord {
  date: string
  visaType: string
  result: Verdict
  summary: string
  triggeredItems: string[]
  /** key = questionId, value = true 表示选了带 severity 的危险答案 */
  answers: Record<string, boolean>
}

export interface User {
  phone: string
  createdAt: string
  history: HistoryRecord[]
}

interface OtpRecord {
  otp: string
  createdAt: string
}

const OTP_TTL_SEC = 5 * 60 // 5 min
const SESSION_TTL_SEC = 30 * 24 * 60 * 60 // 30 days

function sessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`
}

// === OTP ===
export async function generateOtp(phone: string): Promise<string> {
  const otp = String(Math.floor(100000 + Math.random() * 900000))
  await storage.set(
    `otp:${phone}`,
    { otp, createdAt: new Date().toISOString() } satisfies OtpRecord,
    { ex: OTP_TTL_SEC },
  )
  return otp
}

export async function verifyOtp(phone: string, input: string): Promise<boolean> {
  const record = await storage.get<OtpRecord>(`otp:${phone}`)
  if (!record) return false
  if (record.otp !== input) return false
  await storage.del(`otp:${phone}`)
  return true
}

// === User ===
export async function findOrCreateUserByPhone(phone: string): Promise<User> {
  const existing = await storage.get<User>(`user:${phone}`)
  if (existing) return existing
  const user: User = {
    phone,
    createdAt: new Date().toISOString(),
    history: [],
  }
  await storage.set(`user:${phone}`, user)
  // 维护用户总数计数（取代 SCAN 全表）
  const count = (await storage.get<number>('stats:user_count')) ?? 0
  await storage.set('stats:user_count', count + 1)
  return user
}

export async function getUserByPhone(phone: string): Promise<User | null> {
  return await storage.get<User>(`user:${phone}`)
}

// === Session ===
export async function createSession(phone: string): Promise<string> {
  const sid = sessionId()
  await storage.set(`session:${sid}`, phone, { ex: SESSION_TTL_SEC })
  return sid
}

export async function getSessionPhone(sid: string): Promise<string | null> {
  return await storage.get<string>(`session:${sid}`)
}

export async function deleteSession(sid: string): Promise<void> {
  await storage.del(`session:${sid}`)
}

// === History ===
export async function appendHistory(phone: string, record: HistoryRecord): Promise<User> {
  const user = (await getUserByPhone(phone)) ?? (await findOrCreateUserByPhone(phone))
  // 最新的在前，且做轻量去重（同一日期 + 同一摘要视为重复）
  const dedupKey = `${record.date}|${record.summary}`
  const filtered = user.history.filter(
    h => `${h.date}|${h.summary}` !== dedupKey,
  )
  const updated: User = {
    ...user,
    history: [record, ...filtered].slice(0, 100), // 最多保留 100 条
  }
  await storage.set(`user:${phone}`, updated)
  return updated
}

export async function listHistory(phone: string): Promise<HistoryRecord[]> {
  const user = await getUserByPhone(phone)
  return user?.history ?? []
}
