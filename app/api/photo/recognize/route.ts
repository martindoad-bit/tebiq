/**
 * POST /api/photo/recognize
 *
 * Block 5：使用 Bedrock Claude Vision 识别真实图片，并走完整 DAL 流程：
 *   1. 鉴权 → 获取 family
 *   2. 检查配额（免费 3/月）
 *   3. 识别图片 → 写 documents 行
 *   4. 返回 documentId + result
 *
 * 输入：multipart/form-data with file
 * 输出：{ documentId, result }
 */
import { ok, err } from '@/lib/api/response'
import { getCurrentUser } from '@/lib/auth/session'
import { getOrCreateAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { createDocument } from '@/lib/db/queries/documents'
import { PhotoRecognitionError, recognizePhotoDocument } from '@/lib/photo/bedrock'
import { getPhotoQuotaForFamily, getPhotoQuotaForSession } from '@/lib/photo/quota'
import type { Urgency } from '@/lib/photo/types'
import { track } from '@/lib/analytics/track'
import { EVENT } from '@/lib/analytics/events'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function mapUrgencyToSchema(u: Urgency): 'critical' | 'important' | 'normal' | 'ignorable' {
  // schema enum 用 'important' 而非 'high'
  if (u === 'high') return 'important'
  return u
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  const sessionId = user ? null : await getOrCreateAnonymousSessionId()

  await track(EVENT.PHOTO_RECOGNIZE_ATTEMPT, {}, { user, sessionId })

  // 1. 配额检查
  const quota = user
    ? await getPhotoQuotaForFamily(user.familyId)
    : await getPhotoQuotaForSession(sessionId as string)
  const shouldPromptEmail = !!user && !user.email && quota.used === 0
  if (!quota.unlimited && quota.remaining <= 0) {
    await track(
      EVENT.PHOTO_QUOTA_EXCEEDED,
      { used: quota.used, limit: quota.limit },
      { user, sessionId },
    )
    return err('quota_exceeded', '本月免费拍照次数已用完', 402, {
      used: quota.used,
      limit: quota.limit,
    })
  }

  // 2. 接收图片（当前不持久化原图，只记录 hash metadata）
  const contentType = req.headers.get('content-type') ?? ''
  if (!contentType.includes('multipart/form-data')) {
    return err('bad_request', '请上传文书图片', 400)
  }

  let recognition
  let imageUrl = ''
  try {
    const form = await req.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return err('missing_file', '请上传文书图片', 400)
    }

    const bytes = Buffer.from(await file.arrayBuffer())
    recognition = await recognizePhotoDocument({
      bytes,
      mediaType: file.type,
      filename: file.name,
    })
    imageUrl = `bedrock://${recognition.imageHash.slice(0, 24)}`
  } catch (error) {
    if (error instanceof PhotoRecognitionError) {
      await track(
        EVENT.PHOTO_RECOGNIZE_FAIL,
        { code: error.code, message: error.message },
        { user, sessionId },
      )
      const status = error.code === 'too_large' ? 413
        : error.code === 'unsupported_type' || error.code === 'bad_image' ? 400
          : 503
      return err(error.code, error.message, status)
    }
    await track(
      EVENT.PHOTO_RECOGNIZE_FAIL,
      { code: 'unknown', message: error instanceof Error ? error.message : 'unknown' },
      { user, sessionId },
    )
    return err('recognition_failed', '拍照识别服务暂时不可用，请稍后再试', 503)
  }

  // 3. 写 documents 行
  const result = recognition.result
  const doc = await createDocument({
    familyId: user?.familyId ?? null,
    memberId: user?.id ?? null,
    sessionId,
    imageUrl,
    docType: result.docType,
    summary: result.summary,
    urgency: mapUrgencyToSchema(result.urgency),
    aiResponse: result as unknown as Record<string, unknown>,
  })

  await track(
    EVENT.PHOTO_RECOGNIZE_SUCCESS,
    {
      docType: result.docType,
      urgency: result.urgency,
      hasDeadline: !!result.deadline,
      hasAmount: result.amount !== null,
    },
    { user, sessionId },
  )

  return ok({
    documentId: doc.id,
    result,
    recognition: {
      model: recognition.modelId,
    },
    quota: user
      ? await getPhotoQuotaForFamily(user.familyId)
      : await getPhotoQuotaForSession(sessionId as string),
    emailPrompt: shouldPromptEmail,
  })
}
