import { errors, ok } from '@/lib/api/response'
import {
  getQuestionStats,
  isQuestionPriority,
  isQuestionStatus,
  listQuestions,
  updateQuestion,
} from '@/lib/db/queries/questions'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: Request) {
  const url = new URL(req.url)
  try {
    const [questions, stats] = await Promise.all([
      listQuestions({
        status: url.searchParams.get('status'),
        priority: url.searchParams.get('priority'),
        limit: Number(url.searchParams.get('limit') ?? 200),
      }),
      getQuestionStats(),
    ])
    return ok({ questions, stats })
  } catch (error) {
    console.warn('[admin/questions] list failed', errorCode(error))
    return ok({ questions: [], stats: emptyStats(), unavailable: true })
  }
}

export async function PATCH(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errors.badRequest()
  }
  if (!body || typeof body !== 'object') return errors.badRequest()
  const row = body as Record<string, unknown>
  const id = typeof row.id === 'string' ? row.id : ''
  if (!id) return errors.badRequest('缺少 id')
  const status = isQuestionStatus(row.status) ? row.status : undefined
  const priority = isQuestionPriority(row.priority) ? row.priority : undefined
  const note = typeof row.note === 'string' ? row.note.slice(0, 2000) : undefined
  if (!status && !priority && note === undefined) return errors.badRequest('没有可更新字段')

  try {
    const updated = await updateQuestion({ id, status, priority, note })
    if (!updated) return errors.notFound('question')
    return ok({ question: updated })
  } catch (error) {
    console.warn('[admin/questions] update failed', errorCode(error))
    return errors.internal('保存失败')
  }
}

function emptyStats() {
  return { total: 0, today: 0, unprocessed: 0, highPriority: 0, ignored: 0, published: 0 }
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
