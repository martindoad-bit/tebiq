import { storage } from '@/lib/storage'
import { ok } from '@/lib/api/response'

export const dynamic = 'force-dynamic'

interface ErrorLog {
  ts: string
  message: string
  digest?: string
  stack?: string
  path?: string
}

const KEY = 'admin:error_log'
const LIMIT = 100

export async function POST(req: Request) {
  let body: Partial<ErrorLog>
  try {
    body = await req.json()
  } catch {
    return ok({ logged: true })
  }
  const entry: ErrorLog = {
    ts: new Date().toISOString(),
    message: String(body.message ?? '').slice(0, 500),
    digest: body.digest ? String(body.digest).slice(0, 40) : undefined,
    stack: body.stack ? String(body.stack).slice(0, 1000) : undefined,
    path: body.path ? String(body.path).slice(0, 200) : undefined,
  }
  const list = (await storage.get<ErrorLog[]>(KEY)) ?? []
  await storage.set(KEY, [entry, ...list].slice(0, LIMIT))
  return ok({ logged: true })
}
