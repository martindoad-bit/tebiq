// 简易内存 store ——MLP 框架阶段，重启即丢失
// 上线前必须替换为持久存储（Vercel KV / Postgres / Supabase 等）
//
// 替换方法：保持下面所有导出函数的签名不变，把 Map 操作改为对应数据库的 SDK 调用

import type { Verdict, TriggeredItem, AnsweredItem } from '@/lib/check/questions'

export interface User {
  id: string
  phone: string
  createdAt: string
}

export interface Session {
  id: string
  userId: string
  createdAt: string
  expiresAt: string
}

export interface OtpRecord {
  phone: string
  otp: string
  expiresAt: number
  attempts: number
}

export interface SavedResult {
  id: string
  userId: string
  visaType: string
  verdict: Verdict
  triggered: TriggeredItem[]
  history: AnsweredItem[]
  createdAt: string
}

// === in-memory storage ===
const users = new Map<string, User>() // userId -> User
const usersByPhone = new Map<string, string>() // phone -> userId
const sessions = new Map<string, Session>() // sessionId -> Session
const otps = new Map<string, OtpRecord>() // phone -> OtpRecord
const results = new Map<string, SavedResult[]>() // userId -> SavedResult[]

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30 // 30 天
const OTP_TTL_MS = 1000 * 60 * 5 // 5 分钟
const OTP_MAX_ATTEMPTS = 5

function id(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

// === OTP ===
export function generateOtp(phone: string): string {
  const otp = String(Math.floor(100000 + Math.random() * 900000))
  otps.set(phone, {
    phone,
    otp,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  })
  return otp
}

export function verifyOtp(phone: string, input: string): boolean {
  const record = otps.get(phone)
  if (!record) return false
  if (Date.now() > record.expiresAt) {
    otps.delete(phone)
    return false
  }
  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    otps.delete(phone)
    return false
  }
  record.attempts += 1
  if (record.otp !== input) return false
  otps.delete(phone)
  return true
}

// === User ===
export function findOrCreateUserByPhone(phone: string): User {
  const existingId = usersByPhone.get(phone)
  if (existingId) {
    const u = users.get(existingId)
    if (u) return u
  }
  const user: User = {
    id: id('user'),
    phone,
    createdAt: new Date().toISOString(),
  }
  users.set(user.id, user)
  usersByPhone.set(phone, user.id)
  return user
}

export function getUser(userId: string): User | null {
  return users.get(userId) ?? null
}

// === Session ===
export function createSession(userId: string): Session {
  const session: Session = {
    id: id('sess'),
    userId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
  }
  sessions.set(session.id, session)
  return session
}

export function getSession(sessionId: string): Session | null {
  const session = sessions.get(sessionId)
  if (!session) return null
  if (Date.now() > new Date(session.expiresAt).getTime()) {
    sessions.delete(sessionId)
    return null
  }
  return session
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId)
}

// === Results ===
export function saveResult(input: Omit<SavedResult, 'id' | 'createdAt'>): SavedResult {
  const record: SavedResult = {
    ...input,
    id: id('res'),
    createdAt: new Date().toISOString(),
  }
  const userResults = results.get(input.userId) ?? []
  userResults.unshift(record) // 最新的在前
  results.set(input.userId, userResults)
  return record
}

export function listResults(userId: string): SavedResult[] {
  return results.get(userId) ?? []
}

export function getResult(userId: string, resultId: string): SavedResult | null {
  return (results.get(userId) ?? []).find(r => r.id === resultId) ?? null
}
