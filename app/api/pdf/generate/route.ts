import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { generateApplicationPDF } from '@/lib/pdf/generator'

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json() as { sessionId: string }

    const session = await getSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (session.status !== 'survey_completed') {
      return NextResponse.json({ error: 'Survey not completed' }, { status: 400 })
    }

    if (!session.formData) {
  // Build formData on the fly from answers if missing
  const { buildFormData } = await import('@/lib/ai/claude')
  session.formData = await buildFormData(session.answers, session.visaType)
}

    const pdfBytes = await generateApplicationPDF(session)

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="tebiq-application.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}
