import { ok, err } from '@/lib/api/response'
import { getOrCreateAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import {
  createTextUnderstandRequest,
  getTextUnderstandQuotaForFamily,
  getTextUnderstandQuotaForSession,
} from '@/lib/db/queries/textUnderstand'
import { buildUserContext } from '@/lib/photo/user-context'
import {
  TextUnderstandError,
  understandJapaneseText,
} from '@/lib/text-understand/bedrock'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  const sessionId = user ? null : await getOrCreateAnonymousSessionId()
  const quota = user
    ? await getTextUnderstandQuotaForFamily(user.familyId)
    : await getTextUnderstandQuotaForSession(sessionId as string)

  if (!quota.unlimited && quota.remaining <= 0) {
    return err('quota_exceeded', '本月免费文字理解次数已用完', 402, {
      used: quota.used,
      limit: quota.limit,
    })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return err('bad_request', '请求格式错误', 400)
  }

  const text = typeof (body as { text?: unknown })?.text === 'string'
    ? (body as { text: string }).text
    : ''
  const userNote = typeof (body as { userNote?: unknown })?.userNote === 'string'
    ? (body as { userNote: string }).userNote
    : null

  try {
    const userContext = user ? await buildUserContext({ memberId: user.id }) : null
    const output = await understandJapaneseText({ text, userNote, userContext })
    await createTextUnderstandRequest({
      familyId: user?.familyId ?? null,
      memberId: user?.id ?? null,
      sessionId,
      inputHash: output.inputHash,
      summary: output.result.detectedTopic ?? output.result.meaning.slice(0, 120),
      aiResponse: output.result as unknown as Record<string, unknown>,
    })

    const nextQuota = user
      ? await getTextUnderstandQuotaForFamily(user.familyId)
      : await getTextUnderstandQuotaForSession(sessionId as string)

    return ok({
      result: output.result,
      recognition: {
        model: output.modelId,
        userContextInjected: output.userContextInjected,
      },
      quota: nextQuota,
    })
  } catch (error) {
    if (error instanceof TextUnderstandError) {
      const status = error.code === 'too_long' || error.code === 'bad_text' ? 400 : 503
      return err(error.code, error.message, status)
    }
    return err('text_understand_failed', '文字理解服务暂时不可用，请稍后再试', 503)
  }
}
