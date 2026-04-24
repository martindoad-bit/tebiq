import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface MonitorState {
  hash: string
  lastChecked: string
}

function checkAuth(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey) return true
  return req.nextUrl.searchParams.get('key') === adminKey
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  // 1. AI 配置检查（AWS Bedrock）
  const aiConfigured =
    !!process.env.AWS_ACCESS_KEY_ID && !!process.env.AWS_SECRET_ACCESS_KEY
  const aiRegion = process.env.AWS_REGION ?? 'us-east-1'

  // 2. KV 连接：尝试 ping 一个 key
  let kvOk = false
  let kvErr: string | null = null
  try {
    await storage.set('healthcheck:ping', { ts: Date.now() }, { ex: 60 })
    const back = await storage.get('healthcheck:ping')
    kvOk = !!back
  } catch (err) {
    kvErr = err instanceof Error ? err.message : 'unknown'
  }

  // 3. 监控最后核查时间
  const monitor = await storage.get<MonitorState>('monitor:gijinkoku')

  return NextResponse.json({
    ai: {
      configured: aiConfigured,
      provider: aiConfigured ? 'AWS Bedrock' : 'mock',
      region: aiRegion,
    },
    kv: { ok: kvOk, error: kvErr },
    monitor: {
      lastChecked: monitor?.lastChecked ?? null,
    },
  })
}
