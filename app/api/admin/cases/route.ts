import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export const dynamic = 'force-dynamic'

export interface RealCase {
  id: string
  date: string
  visaType: string
  yearsInJapan: number
  annualIncomeManYen: number
  changedJobs: boolean
  result: 'approved' | 'rejected' | 'returned'
  rejectionReason?: string
  notes?: string
}

interface RecentEntry {
  id: string
  date: string
  visaType: string
  result: 'approved' | 'rejected' | 'returned'
  yearsInJapan: number
  annualIncomeManYen: number
}

function checkAuth(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey) return true
  return req.nextUrl.searchParams.get('key') === adminKey
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }
  try {
    const body = await req.json()
    const visaType = String(body?.visaType ?? '').trim()
    const result = String(body?.result ?? '').trim()
    const yearsInJapan = Number(body?.yearsInJapan)
    const annualIncomeManYen = Number(body?.annualIncomeManYen)
    const changedJobs = Boolean(body?.changedJobs)
    const rejectionReason = body?.rejectionReason ? String(body.rejectionReason) : undefined
    const notes = body?.notes ? String(body.notes) : undefined

    if (!visaType) return NextResponse.json({ error: '签证类型必填' }, { status: 400 })
    if (result !== 'approved' && result !== 'rejected' && result !== 'returned') {
      return NextResponse.json({ error: 'result 不合法' }, { status: 400 })
    }
    if (!Number.isFinite(yearsInJapan) || !Number.isFinite(annualIncomeManYen)) {
      return NextResponse.json({ error: '年数 / 年收入必须是数字' }, { status: 400 })
    }

    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const now = new Date().toISOString()
    const record: RealCase = {
      id,
      date: now,
      visaType,
      yearsInJapan,
      annualIncomeManYen,
      changedJobs,
      result: result as RealCase['result'],
      rejectionReason,
      notes,
    }

    const [count, perResult, recent] = await Promise.all([
      storage.get<number>('stats:case_count'),
      storage.get<number>(`stats:case:${result}`),
      storage.get<RecentEntry[]>('stats:cases:recent'),
    ])

    const recentEntry: RecentEntry = {
      id,
      date: now,
      visaType,
      result: record.result,
      yearsInJapan,
      annualIncomeManYen,
    }

    await Promise.all([
      storage.set(`case:${id}`, record),
      storage.set('stats:case_count', (count ?? 0) + 1),
      storage.set(`stats:case:${result}`, (perResult ?? 0) + 1),
      storage.set('stats:cases:recent', [recentEntry, ...(recent ?? [])].slice(0, 50)),
    ])

    return NextResponse.json({ ok: true, case: record })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }
  const [count, approved, rejected, returned, recent] = await Promise.all([
    storage.get<number>('stats:case_count'),
    storage.get<number>('stats:case:approved'),
    storage.get<number>('stats:case:rejected'),
    storage.get<number>('stats:case:returned'),
    storage.get<RecentEntry[]>('stats:cases:recent'),
  ])
  const total = count ?? 0
  const approvedPct = total > 0 ? Math.round(((approved ?? 0) / total) * 100) : 0
  return NextResponse.json({
    caseCount: total,
    approved: approved ?? 0,
    rejected: rejected ?? 0,
    returned: returned ?? 0,
    approvedPct,
    recent: recent ?? [],
  })
}
