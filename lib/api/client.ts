/**
 * Frontend fetch helper — handles both new and legacy API response shapes.
 *
 * New shape (per lib/api/response.ts):
 *   success: { ok: true,  data: T }
 *   failure: { ok: false, error: { code, message } }
 *
 * Legacy shape (still produced by un-migrated routes):
 *   success: arbitrary JSON
 *   failure: { error: string } with non-2xx status
 *
 * Usage:
 *   const user = await apiFetch<{ user: { phone: string } }>('/api/auth/me')
 *   await apiPost('/api/auth/verify-otp', { phone, otp })
 *
 * Always throws `ApiError` on failure (HTTP 4xx/5xx OR ok=false).
 */
export class ApiError extends Error {
  code: string
  status: number
  details?: unknown

  constructor(opts: { code: string; message: string; status: number; details?: unknown }) {
    super(opts.message)
    this.name = 'ApiError'
    this.code = opts.code
    this.status = opts.status
    this.details = opts.details
  }
}

interface EnvelopeOk<T> {
  ok: true
  data: T
}
interface EnvelopeErr {
  ok: false
  error: { code: string; message: string; details?: unknown }
}
type EnvelopeAny<T> = EnvelopeOk<T> | EnvelopeErr | T | { error?: string }

function isEnvelopeOk<T>(j: unknown): j is EnvelopeOk<T> {
  return !!j && typeof j === 'object' && (j as { ok?: unknown }).ok === true && 'data' in j
}
function isEnvelopeErr(j: unknown): j is EnvelopeErr {
  return (
    !!j &&
    typeof j === 'object' &&
    (j as { ok?: unknown }).ok === false &&
    'error' in j &&
    typeof (j as { error: unknown }).error === 'object'
  )
}
function isLegacyError(j: unknown): j is { error: string } {
  return !!j && typeof j === 'object' && typeof (j as { error?: unknown }).error === 'string'
}

export async function apiFetch<T = unknown>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  let parsed: EnvelopeAny<T> | null = null
  try {
    parsed = (await res.json()) as EnvelopeAny<T>
  } catch {
    /* empty / non-JSON body */
  }

  if (!res.ok) {
    if (parsed && isEnvelopeErr(parsed)) {
      throw new ApiError({
        code: parsed.error.code,
        message: parsed.error.message,
        status: res.status,
        details: parsed.error.details,
      })
    }
    if (parsed && isLegacyError(parsed)) {
      throw new ApiError({
        code: 'http_error',
        message: parsed.error,
        status: res.status,
      })
    }
    throw new ApiError({
      code: 'http_error',
      message: `HTTP ${res.status}`,
      status: res.status,
    })
  }

  if (parsed && isEnvelopeOk<T>(parsed)) return parsed.data
  // Legacy 2xx with arbitrary shape — return as-is
  return parsed as T
}

export async function apiPost<T = unknown>(
  url: string,
  body?: unknown,
  init?: RequestInit,
): Promise<T> {
  return apiFetch<T>(url, {
    method: 'POST',
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...init,
  })
}

export async function apiPatch<T = unknown>(
  url: string,
  body?: unknown,
  init?: RequestInit,
): Promise<T> {
  return apiFetch<T>(url, {
    method: 'PATCH',
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...init,
  })
}
