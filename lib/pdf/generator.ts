import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { VisaSession } from '@/types/session'

const PAGE_W = 595
const PAGE_H = 842
const MARGIN = 40

const C = {
  navy: rgb(0.09, 0.18, 0.38),
  amber: rgb(1, 0.65, 0),
  white: rgb(1, 1, 1),
  lightGray: rgb(0.95, 0.95, 0.95),
  warmYellow: rgb(1, 0.98, 0.92),
  darkGray: rgb(0.3, 0.3, 0.3),
  midGray: rgb(0.5, 0.5, 0.5),
  red: rgb(0.85, 0.15, 0.15),
  lightRed: rgb(1, 0.94, 0.94),
  green: rgb(0.1, 0.65, 0.3),
}

export async function generateMaterialsPDF(session: VisaSession): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const page = pdfDoc.addPage([PAGE_W, PAGE_H])

  // Header bar
  page.drawRectangle({ x: 0, y: PAGE_H - 60, width: PAGE_W, height: 60, color: C.navy })
  page.drawText('TEBIQ', { x: MARGIN, y: PAGE_H - 40, size: 20, font: boldFont, color: C.amber })
  page.drawText('Required Documents', { x: MARGIN + 75, y: PAGE_H - 40, size: 14, font: boldFont, color: C.white })
  page.drawText(session.visaType, { x: PAGE_W - MARGIN - 90, y: PAGE_H - 35, size: 9, font: boldFont, color: C.amber, maxWidth: 88 })

  let y = PAGE_H - 80

  // Referral warning
  if (session.requiresReferral) {
    page.drawRectangle({ x: MARGIN, y: y - 28, width: PAGE_W - MARGIN * 2, height: 32, color: C.lightRed })
    page.drawRectangle({ x: MARGIN, y: y - 28, width: 4, height: 32, color: C.red })
    page.drawText('! Professional consultation recommended', {
      x: MARGIN + 10, y: y - 16, size: 9, font: boldFont, color: C.red,
    })
    y -= 42
  }

  // Required materials
  const required = session.materials.filter(m => !m.conditional)
  const conditional = session.materials.filter(m => m.conditional)

  page.drawText('Required Documents', { x: MARGIN, y, size: 12, font: boldFont, color: C.navy })
  y -= 6
  page.drawRectangle({ x: MARGIN, y, width: PAGE_W - MARGIN * 2, height: 1, color: C.navy })
  y -= 20

  for (const mat of required) {
    if (y < 60) break
    page.drawRectangle({ x: MARGIN, y: y - 4, width: PAGE_W - MARGIN * 2, height: 22, color: C.lightGray })
    page.drawText('✓', { x: MARGIN + 6, y: y + 4, size: 10, font: boldFont, color: C.green })
    page.drawText(mat.name, { x: MARGIN + 22, y: y + 4, size: 10, font: regularFont, color: C.darkGray, maxWidth: PAGE_W - MARGIN * 2 - 30 })
    if (mat.description) {
      page.drawText(mat.description, { x: MARGIN + 22, y: y - 8, size: 7, font: regularFont, color: C.midGray, maxWidth: PAGE_W - MARGIN * 2 - 30 })
      y -= 10
    }
    y -= 26
  }

  // Conditional materials
  if (conditional.length > 0) {
    y -= 8
    page.drawText('Conditional Documents', { x: MARGIN, y, size: 12, font: boldFont, color: C.navy })
    y -= 6
    page.drawRectangle({ x: MARGIN, y, width: PAGE_W - MARGIN * 2, height: 1, color: C.amber })
    y -= 20

    for (const mat of conditional) {
      if (y < 60) break
      page.drawRectangle({ x: MARGIN, y: y - 4, width: PAGE_W - MARGIN * 2, height: 22, color: C.warmYellow })
      page.drawText('△', { x: MARGIN + 6, y: y + 4, size: 10, font: boldFont, color: C.amber })
      page.drawText(mat.name, { x: MARGIN + 22, y: y + 4, size: 10, font: regularFont, color: C.darkGray, maxWidth: PAGE_W - MARGIN * 2 - 30 })
      if (mat.condition) {
        page.drawText(`If: ${mat.condition}`, { x: MARGIN + 22, y: y - 8, size: 7, font: regularFont, color: C.midGray, maxWidth: PAGE_W - MARGIN * 2 - 30 })
        y -= 10
      }
      y -= 26
    }
  }

  // Submission steps
  if (session.submissionSteps.length > 0 && y > 140) {
    y -= 12
    page.drawText('Submission Steps', { x: MARGIN, y, size: 12, font: boldFont, color: C.navy })
    y -= 6
    page.drawRectangle({ x: MARGIN, y, width: PAGE_W - MARGIN * 2, height: 1, color: C.navy })
    y -= 20

    for (const step of session.submissionSteps) {
      if (y < 60) break
      page.drawRectangle({ x: MARGIN, y: y - 4, width: 22, height: 22, color: C.navy })
      page.drawText(String(step.step), { x: MARGIN + 7, y: y + 4, size: 10, font: boldFont, color: C.white })
      page.drawText(step.title, { x: MARGIN + 30, y: y + 6, size: 10, font: boldFont, color: C.darkGray })
      page.drawText(step.description, { x: MARGIN + 30, y: y - 5, size: 8, font: regularFont, color: C.midGray, maxWidth: PAGE_W - MARGIN * 2 - 36 })
      y -= 30
    }
  }

  // Footer
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: 28, color: C.navy })
  page.drawText('TEBIQ - tebiq.jp', { x: MARGIN, y: 9, size: 8, font: regularFont, color: C.white })
  page.drawText('For reference only. Please verify with immigration authorities.', {
    x: MARGIN + 110, y: 9, size: 7, font: regularFont, color: rgb(0.7, 0.7, 0.8), maxWidth: 340,
  })

  return pdfDoc.save()
}
