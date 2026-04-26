/**
 * Unified notification sender.
 *
 * Block 4 implements `email` through a switchable channel. In local/dev
 * the mock channel writes .eml files; in production it can use Resend. Other channels (sms /
 * app_push / line) record a `failed` row with a clear note so we have an
 * audit trail of what was attempted before those backends ship.
 *
 * Importing this module never requires `RESEND_API_KEY`, which keeps
 * `next build` green in environments where the key is not set.
 */
import {
  scheduleNotification,
  markNotificationSent,
  markNotificationFailed,
} from '@/lib/db/queries/notifications'
import type { NewNotification } from '@/lib/db/schema'
import { getTemplate } from './templates'
import { sendEmail } from './email-channel'

export type NotifChannel = 'email' | 'sms' | 'app_push' | 'line'

export interface SendInput {
  to: { email?: string; phone?: string; lineId?: string; deviceToken?: string }
  channel: NotifChannel
  templateId: string
  data: Record<string, unknown>
  // Used to write the notifications row.
  familyId: string
  memberId?: string
  type: string
}

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; error: string }

/**
 * Schedule (queue) a notification — write a row with status='queued' and
 * return the row id. The cron worker (/api/cron/send-notifications) picks
 * it up later and dispatches it. Useful when you want to defer delivery
 * or batch many notifications without blocking the request.
 */
export async function schedule(
  input: Omit<SendInput, 'to'> & { to?: SendInput['to'] },
): Promise<{ id: string }> {
  const row = await scheduleNotification({
    familyId: input.familyId,
    memberId: input.memberId,
    channel: input.channel,
    type: input.type,
    payload: { ...input.data, _to: input.to ?? null, _templateId: input.templateId },
    status: 'queued',
  } satisfies NewNotification)
  return { id: row.id }
}

/**
 * Render + dispatch a notification synchronously, recording the attempt.
 *
 * - Always writes a notifications row first (so we have a paper trail).
 * - Marks 'sent' on success or 'failed' on error.
 * - Returns the row id on success, or an error string on failure.
 *
 * For unsupported channels we still write+fail-mark a row, so the admin
 * dashboard surfaces "we tried, here's why nothing went out".
 */
export async function send(input: SendInput): Promise<SendResult> {
  // 1. Write a queued row up front for traceability.
  const row = await scheduleNotification({
    familyId: input.familyId,
    memberId: input.memberId,
    channel: input.channel,
    type: input.type,
    payload: { ...input.data, _to: input.to, _templateId: input.templateId },
    status: 'queued',
  } satisfies NewNotification)

  if (input.channel !== 'email') {
    await markNotificationFailed(row.id)
    return { ok: false, error: `channel '${input.channel}' not implemented yet` }
  }

  if (!input.to.email) {
    await markNotificationFailed(row.id)
    return { ok: false, error: 'no email address on recipient' }
  }

  const tpl = getTemplate(input.templateId)
  if (!tpl) {
    await markNotificationFailed(row.id)
    return { ok: false, error: `unknown templateId '${input.templateId}'` }
  }
  if (tpl.channel !== 'email') {
    await markNotificationFailed(row.id)
    return {
      ok: false,
      error: `template '${input.templateId}' is not an email template`,
    }
  }

  let rendered: { subject: string; html: string; text: string }
  try {
    rendered = tpl.build(input.data)
  } catch (e) {
    await markNotificationFailed(row.id)
    return {
      ok: false,
      error: `template render failed: ${e instanceof Error ? e.message : String(e)}`,
    }
  }

  const result = await sendEmail({ to: input.to.email, ...rendered })
  if (result.ok) {
    await markNotificationSent(row.id)
    return { ok: true, id: row.id }
  }

  await markNotificationFailed(row.id)
  return { ok: false, error: `${result.provider} send failed: ${result.error}` }
}
