import { NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface ProcessingTimeRecord {
  visaType: string
  daysAvg: number
  fetchedAt: string
  source: string
}

const SOURCE_URL =
  'https://www.moj.go.jp/isa/applications/resources/shinsakikann.html'

const PLACEHOLDER: Record<string, number> = {
  gijinkoku: 45,
  keiei: 80,
  haigusha: 50,
  tokutei: 60,
  teijusha: 55,
  eijusha: 120,
}

// GET /api/processing-time?visa=gijinkoku
// 返回审查处理参考时间。当前为占位实现：
// - 优先读 KV (key: processing-time:{visa})
// - 回落到内置 PLACEHOLDER
// - 由后续 cron 任务定期抓取入管局官网更新 KV
export async function GET(req: Request) {
  const url = new URL(req.url)
  const visa = url.searchParams.get('visa') ?? 'gijinkoku'

  const cached = await storage.get<ProcessingTimeRecord>(`processing-time:${visa}`)
  if (cached) {
    return NextResponse.json(cached)
  }

  const fallback: ProcessingTimeRecord = {
    visaType: visa,
    daysAvg: PLACEHOLDER[visa] ?? 60,
    fetchedAt: new Date().toISOString(),
    source: SOURCE_URL,
  }
  return NextResponse.json({ ...fallback, placeholder: true })
}
