import { kv } from '@vercel/kv'

// 内存 fallback：本地 dev / 没配 KV 环境变量时用
// 生产环境 Vercel KV 配好后会优先走 kv，此 Map 不会被读
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
    try {
      return (await kv.get<T>(key)) ?? null
    } catch {
      return (memGet(key) as T) ?? null
    }
  },
  async set(key: string, value: unknown, options?: { ex?: number }): Promise<void> {
    try {
      if (options?.ex) await kv.set(key, value, { ex: options.ex })
      else await kv.set(key, value)
    } catch {
      memSet(key, value, options?.ex)
    }
  },
  async del(key: string): Promise<void> {
    try {
      await kv.del(key)
    } catch {
      memoryStore.delete(key)
    }
  },
}
