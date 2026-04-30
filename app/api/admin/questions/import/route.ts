import { errors, ok } from '@/lib/api/response'
import { bulkImportQuestions, normalizeQuestionLines, parseImportText } from '@/lib/db/queries/questions'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errors.badRequest()
  }
  if (!body || typeof body !== 'object') return errors.badRequest()
  const text = typeof (body as { text?: unknown }).text === 'string'
    ? (body as { text: string }).text
    : ''
  if (!text.trim()) return errors.badRequest('请粘贴问题')
  const rawLines = parseImportText(text)
  const normalized = normalizeQuestionLines(rawLines)
  if (normalized.length === 0) return errors.badRequest('没有可导入的问题')
  if (normalized.length > 800) return errors.badRequest('单次最多导入 800 行')

  try {
    const result = await bulkImportQuestions({ questions: rawLines, sourcePage: 'manual_import' })
    return ok({ ...result, totalParsed: normalized.length })
  } catch (error) {
    console.warn('[admin/questions/import] failed', errorCode(error))
    return errors.internal('导入失败')
  }
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
