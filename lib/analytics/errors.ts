/**
 * 服务端错误捕获 helper。
 *
 * 写到 error_logs 表（替换之前 KV 'admin:error_log' rolling list）；
 * /admin KPI 看板按 severity + 时间窗口聚合显示。
 *
 * 失败永远不抛 — 错误捕获本身不能制造新错误。
 */
import { db } from '@/lib/db'
import { errorLogs, type NewErrorLog } from '@/lib/db/schema'

export type ErrorSeverity = 'warn' | 'error' | 'critical'

export interface CaptureInput {
  code?: string
  message: string
  stack?: string
  path?: string
  digest?: string
  severity?: ErrorSeverity
  payload?: Record<string, unknown>
}

export async function captureError(input: CaptureInput): Promise<void> {
  const row: NewErrorLog = {
    code: (input.code ?? 'unknown').slice(0, 64),
    message: String(input.message ?? '').slice(0, 1000),
    stack: input.stack ? String(input.stack).slice(0, 4000) : null,
    path: input.path ? String(input.path).slice(0, 200) : null,
    digest: input.digest ? String(input.digest).slice(0, 40) : null,
    severity: input.severity ?? 'error',
    payload: input.payload && Object.keys(input.payload).length > 0 ? input.payload : null,
  }
  try {
    await db.insert(errorLogs).values(row)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[errors] capture failed', err)
  }
}
