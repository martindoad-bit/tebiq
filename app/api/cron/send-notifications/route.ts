/**
 * Every-30-min cron — drain the queued notifications table.
 *
 * For each queued row:
 *   - Look up the template (id is in payload._templateId, falling back to
 *     the row.type which is convention-equal for visa_expiry_*).
 *   - Resolve recipient address (from payload._to, or from the member).
 *   - Render + dispatch via Resend.
 *   - Update the row in-place to 'sent' or 'failed'.
 *
 * We dispatch directly here rather than going through `sender.send()`
 * because send() writes a fresh audit row — which would duplicate the
 * row this cron is consuming. Both paths share the templates registry
 * and the lazy-init Resend pattern, so behavior stays consistent.
 *
 * Important Block-2 note: members do not have an email column yet.
 * Until /my/profile collects one (Block 3), almost every row will land
 * at "no email address on recipient" and be marked failed. That paper
 * trail is intentional — sizes the Block 3 release.
 *
 * Auth: Bearer ${CRON_SECRET}.
 */
import { Resend } from 'resend'
import { ok, errors } from '@/lib/api/response'
import {
  listQueuedNotifications,
  markNotificationFailed,
  markNotificationSent,
} from '@/lib/db/queries/notifications'
import { getMemberById } from '@/lib/db/queries/members'
import { getTemplate } from '@/lib/notifications/templates'
import type { Notification } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

function checkCronAuth(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return true
  const header = req.headers.get('authorization') ?? ''
  return header === `Bearer ${secret}`
}

const BATCH_SIZE = 50
const FROM = 'TEBIQ <noreply@tebiq.jp>'

interface QueuedPayload {
  _templateId?: string
  _to?: { email?: string; phone?: string; lineId?: string; deviceToken?: string }
  [k: string]: unknown
}

function payloadOf(row: Notification): QueuedPayload {
  return (row.payload ?? {}) as QueuedPayload
}

interface DispatchOutcome {
  ok: boolean
  error?: string
}

/**
 * Block 2 stub: members table has no email column yet. Touch the row so
 * we don't drift the type signature later, and return undefined so the
 * caller marks the row failed with a clear reason. Block 3 swaps this
 * for the real lookup.
 */
async function resolveMemberEmail(memberId: string | null): Promise<string | undefined> {
  if (!memberId) return undefined
  const member = await getMemberById(memberId)
  void member
  return undefined
}

async function dispatchEmail(
  resend: Resend | null,
  to: string,
  rendered: { subject: string; html: string; text: string },
): Promise<DispatchOutcome> {
  if (!resend) return { ok: false, error: 'RESEND_API_KEY not set' }
  try {
    const result = await resend.emails.send({
      from: FROM,
      to,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    })
    if (result.error) {
      return { ok: false, error: result.error.message ?? 'resend error' }
    }
    return { ok: true }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

export async function GET(req: Request) {
  if (!checkCronAuth(req)) return errors.unauthorized()

  const queued = await listQueuedNotifications(BATCH_SIZE)
  // Lazy-init Resend once per invocation. If the key is missing the
  // dispatch step fails cleanly per row.
  const apiKey = process.env.RESEND_API_KEY
  const resend = apiKey ? new Resend(apiKey) : null

  let sent = 0
  let failed = 0
  const errorsBucket: Array<{ id: string; error: string }> = []

  for (const row of queued) {
    const payload = payloadOf(row)

    if (row.channel !== 'email') {
      await markNotificationFailed(row.id)
      failed++
      errorsBucket.push({
        id: row.id,
        error: `channel '${row.channel}' not implemented yet`,
      })
      continue
    }

    // Resolve recipient email — payload._to wins, then member lookup.
    // Block 3: once members.email is added, fall back to that here.
    const email = payload._to?.email ?? (await resolveMemberEmail(row.memberId))
    if (!email) {
      await markNotificationFailed(row.id)
      failed++
      errorsBucket.push({ id: row.id, error: 'no email address on recipient' })
      continue
    }

    // Look up the template.
    const templateId = payload._templateId ?? row.type
    const tpl = getTemplate(templateId)
    if (!tpl) {
      await markNotificationFailed(row.id)
      failed++
      errorsBucket.push({
        id: row.id,
        error: `unknown templateId '${templateId}'`,
      })
      continue
    }

    // Strip internal underscore-prefixed keys before passing to template.
    const data: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(payload)) {
      if (!k.startsWith('_')) data[k] = v
    }

    let rendered: { subject: string; html: string; text: string }
    try {
      rendered = tpl.build(data)
    } catch (e) {
      await markNotificationFailed(row.id)
      failed++
      errorsBucket.push({
        id: row.id,
        error: `render failed: ${e instanceof Error ? e.message : String(e)}`,
      })
      continue
    }

    const outcome = await dispatchEmail(resend, email, rendered)
    if (outcome.ok) {
      await markNotificationSent(row.id)
      sent++
    } else {
      await markNotificationFailed(row.id)
      failed++
      errorsBucket.push({ id: row.id, error: outcome.error ?? 'unknown error' })
    }
  }

  return ok({
    processed: queued.length,
    sent,
    failed,
    errors: errorsBucket,
    ranAt: new Date().toISOString(),
  })
}
