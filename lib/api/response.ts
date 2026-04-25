/**
 * Standard API response envelope.
 *
 * Success:  { ok: true,  data: T }
 * Failure:  { ok: false, error: { code, message } }
 *
 * All API routes should return through `ok()` / `err()` for consistency.
 */
export type ApiSuccess<T> = { ok: true; data: T }
export type ApiError = {
  ok: false
  error: { code: string; message: string; details?: unknown }
}
export type ApiResponse<T> = ApiSuccess<T> | ApiError

export function ok<T>(data: T, init?: ResponseInit): Response {
  return Response.json({ ok: true, data } satisfies ApiSuccess<T>, init)
}

export function err(
  code: string,
  message: string,
  status = 400,
  details?: unknown,
): Response {
  return Response.json(
    {
      ok: false,
      error: { code, message, ...(details !== undefined ? { details } : {}) },
    } satisfies ApiError,
    { status },
  )
}

// --- Common error shortcuts ---
export const errors = {
  unauthorized: () => err('unauthorized', '请登录后重试', 401),
  forbidden: () => err('forbidden', '没有权限', 403),
  notFound: (what = 'resource') => err('not_found', `找不到${what}`, 404),
  badRequest: (msg = '请求格式错误') => err('bad_request', msg, 400),
  conflict: (msg = '冲突') => err('conflict', msg, 409),
  internal: (msg = '服务器异常') => err('internal_error', msg, 500),
  notImplemented: () => err('not_implemented', '功能暂未开放', 501),
}
