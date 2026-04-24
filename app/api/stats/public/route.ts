import { NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [g, y, r] = await Promise.all([
    storage.get<number>('stats:result:green'),
    storage.get<number>('stats:result:yellow'),
    storage.get<number>('stats:result:red'),
  ])
  const totalTests = (g ?? 0) + (y ?? 0) + (r ?? 0)
  return NextResponse.json({ totalTests })
}
