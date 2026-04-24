import { Redis } from '@upstash/redis'

// Vercel KV 集成把环境变量加了 tebiq_ 前缀，所以这里手动读
const redis =
  process.env.tebiq_KV_REST_API_URL && process.env.tebiq_KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.tebiq_KV_REST_API_URL,
        token: process.env.tebiq_KV_REST_API_TOKEN,
      })
    : null

// 内存 fallback：本地 dev / 没配 KV 时用
interface MemEntry {
  value: unknown
  expiresAt?: number
}
const memoryStore = new Map<string, MemEntry>()

function memGet(key: string): unknown {
  const entry = memoryStore.get(key)
  if (!entry) return null
  if (entry.expiresAt && Date.now() > entry.expiresAt) {
    memoryStore.delete(key)
    return null
  }
  return entry.value
}

function memSet(key: string, value: unknown, ex?: number): void {
  memoryStore.set(key, {
    value,
    expiresAt: ex ? Date.now() + ex * 1000 : undefined,
  })
}

export const storage = {
  async get<T = unknown>(key: string): Promise<T | null> {
    if (redis) {
      try {
        return (await redis.get<T>(key)) ?? null
      } catch {
        return (memGet(key) as T) ?? null
      }
    }
    return (memGet(key) as T) ?? null
  },
  async set(key: string, value: unknown, options?: { ex?: number }): Promise<void> {
    if (redis) {
      try {
        if (options?.ex) await redis.set(key, value, { ex: options.ex })
        else await redis.set(key, value)
        return
      } catch {
        memSet(key, value, options?.ex)
        return
      }
    }
    memSet(key, value, options?.ex)
  },
  async del(key: string): Promise<void> {
    if (redis) {
      try {
        await redis.del(key)
        return
      } catch {
        memoryStore.delete(key)
        return
      }
    }
    memoryStore.delete(key)
  },
}
