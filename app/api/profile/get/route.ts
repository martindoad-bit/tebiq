import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'

/**
 * GET /api/profile/get — return the logged-in member's profile fields.
 * Now reads directly from members table (no shim).
 */
export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })
  return NextResponse.json({
    profile: {
      name: user.name,
      visaType: user.visaType,
      visaExpiry: user.visaExpiry,
      nationality: user.nationality,
      arrivedAt: user.arrivedAt,
      maritalStatus: user.maritalStatus,
      hasChildren: user.hasChildren,
      currentJobIndustry: user.currentJobIndustry,
      lastVisaRenewalAt: user.lastVisaRenewalAt,
      companyType: user.companyType,
      recentChanges: user.recentChanges,
      updatedAt: user.updatedAt,
    },
  })
}
