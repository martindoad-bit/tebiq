import { NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface ProcessingTimeRecord {
  visaType: string
  daysAvg: number
  fetchedAt: string
  source: string
}

// GET /api/processing-time?visa=gijinkoku
// 返回已核对的审查处理参考时间：
// - 优先读 KV (key: processing-time:{visa})
// - 无缓存时不返回推定天数，避免把占位数据误认为官方口径
export async function GET(req: Request) {
  const url = new URL(req.url)
  const visa = url.searchParams.get('visa') ?? 'gijinkoku'

  const cached = await storage.get<ProcessingTimeRecord>(`processing-time:${visa}`)
  if (cached) {
    return NextResponse.json(cached)
  }

  return NextResponse.json({
    visaType: visa,
    available: false,
    fetchedAt: new Date().toISOString(),
    message: '处理时间暂未核对。请以入管庁最新公开资料或窗口说明为准。',
  })
}
