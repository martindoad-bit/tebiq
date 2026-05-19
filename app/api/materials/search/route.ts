import { NextRequest, NextResponse } from 'next/server'
import { searchMaterials } from '@/lib/materials/search'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q') ?? ''
  const limit = Number(req.nextUrl.searchParams.get('limit') ?? 5)
  return NextResponse.json(searchMaterials(query, { limit }))
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const query = typeof body?.query === 'string' ? body.query : ''
  const limit = typeof body?.limit === 'number' ? body.limit : 5
  return NextResponse.json(searchMaterials(query, { limit }))
}

