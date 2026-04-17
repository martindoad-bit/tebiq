import { NextRequest, NextResponse } from 'next/server'
import { generateMaterialsPDF } from '@/lib/pdf/generator'
import { uploadPDF } from '@/lib/pdf/storage'
import { VisaSession } from '@/types/session'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const session = body.session as VisaSession | undefined

    if (!session) {
      return NextResponse.json({ error: 'session required' }, { status: 400 })
    }

    const buffer = await generateMaterialsPDF(session)
    const hasReferralWarning = session.requiresReferral ?? false

    // Upload to S3 if configured, otherwise return base64
    if (process.env.S3_BUCKET && process.env.S3_ACCESS_KEY && process.env.S3_SECRET_KEY) {
      try {
        const { downloadUrl, key } = await uploadPDF(buffer, session.sessionId)
        return NextResponse.json({ downloadUrl, hasReferralWarning, key })
      } catch (err) {
        console.error('S3 upload failed, falling back to base64:', err)
      }
    }

    const base64 = Buffer.from(buffer).toString('base64')
    return NextResponse.json({
      downloadUrl: `data:application/pdf;base64,${base64}`,
      hasReferralWarning,
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}
