/**
 * Daily cron — scan all members with a visa_expiry and queue reminder
 * notifications when days-until-expiry is exactly 60 / 30 / 7 (Tokyo TZ).
 *
 * This route ONLY queues rows. The send-notifications cron dispatches
 * them. Splitting scan from delivery means a Resend hiccup or rate limit
 * never delays the daily scan, and re-running a scan is idempotent.
 *
 * Auth: same Bearer pattern as check-immigration.
 */
import { ok, errors } from '@/lib/api/response'
import { listMembersWithVisaExpiry } from '@/lib/db/queries/members'
import {
  scheduleNotification,
  hasNotificationOfTypeForMember,
} from '@/lib/db/queries/notifications'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

function checkCronAuth(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return true // dev fallback; production MUST set CRON_SECRET
  const header = req.headers.get('authorization') ?? ''
  return header === `Bearer ${secret}`
}

const TZ = 'Asia/Tokyo'

/**
 * Days from "today in Tokyo" (00:00 JST) to the given visa_expiry date.
 *
 * `visa_expiry` is a SQL DATE, which Drizzle returns as a 'YYYY-MM-DD'
 * string (no timezone). We compare midnight-to-midnight in Tokyo to avoid
 * UTC drift causing off-by-one bugs around the day boundary.
 */
function daysUntilInTokyo(expiryYmd: string): number {
  // Today in Tokyo as YYYY-MM-DD.
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const todayYmd = fmt.format(new Date()) // 'YYYY-MM-DD' (en-CA gives ISO format)

  // Treat both as UTC midnight so the diff is purely calendar days.
  const today = Date.UTC(
    Number(todayYmd.slice(0, 4)),
    Number(todayYmd.slice(5, 7)) - 1,
    Number(todayYmd.slice(8, 10)),
  )
  const expiry = Date.UTC(
    Number(expiryYmd.slice(0, 4)),
    Number(expiryYmd.slice(5, 7)) - 1,
    Number(expiryYmd.slice(8, 10)),
  )
  return Math.round((expiry - today) / 86_400_000)
}

const TARGETS: Array<{ days: number; type: string; templateId: string }> = [
  { days: 60, type: 'visa_expiry_60d', templateId: 'visa_expiry_60d' },
  { days: 30, type: 'visa_expiry_30d', templateId: 'visa_expiry_30d' },
  { days: 7, type: 'visa_expiry_7d', templateId: 'visa_expiry_7d' },
]

export async function GET(req: Request) {
  if (!checkCronAuth(req)) return errors.unauthorized()

  const members = await listMembersWithVisaExpiry()
  let scheduled = 0
  const queued: Array<{ memberId: string; type: string; daysLeft: number }> = []

  for (const m of members) {
    if (!m.visaExpiry) continue
    const daysLeft = daysUntilInTokyo(m.visaExpiry)
    const hit = TARGETS.find(t => t.days === daysLeft)
    if (!hit) continue

    // Dedup per member — if they already got this exact reminder, skip.
    if (await hasNotificationOfTypeForMember(m.id, hit.type)) continue

    await scheduleNotification({
      familyId: m.familyId,
      memberId: m.id,
      channel: 'email',
      type: hit.type,
      status: 'queued',
      payload: {
        name: m.name ?? undefined,
        expiryDate: m.visaExpiry,
        daysLeft,
        visaType: m.visaType ?? 'other',
        _templateId: hit.templateId,
      },
    })
    scheduled++
    queued.push({ memberId: m.id, type: hit.type, daysLeft })
  }

  return ok({
    scanned: members.length,
    scheduled,
    queued,
    ranAt: new Date().toISOString(),
  })
}
