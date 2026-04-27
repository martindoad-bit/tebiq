import { ok } from '@/lib/api/response'
import { captureError, type ErrorSeverity } from '@/lib/analytics/errors'

export const dynamic = 'force-dynamic'

interface LogPayload {
  message?: string
  code?: string
  digest?: string
  stack?: string
  path?: string
  severity?: ErrorSeverity
}

export async function POST(req: Request) {
  let body: LogPayload = {}
  try {
    body = (await req.json()) as LogPayload
  } catch {
    return ok({ logged: false })
  }
  await captureError({
    code: body.code,
    message: body.message ?? 'unknown',
    stack: body.stack,
    path: body.path,
    digest: body.digest,
    severity: body.severity ?? 'error',
  })
  return ok({ logged: true })
}
