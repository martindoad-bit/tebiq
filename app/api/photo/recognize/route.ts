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
import { createTimelineEvent, findRelatedTimelineEvents } from '@/lib/db/queries/timeline'
import { PhotoRecognitionError, recognizePhotoDocument } from '@/lib/photo/bedrock'
import { getPhotoQuotaForFamily, getPhotoQuotaForSession } from '@/lib/photo/quota'
import { buildUserContext, type PhotoUserContext } from '@/lib/photo/user-context'
import type { PhotoRecognitionResult } from '@/lib/photo/types'
import { buildPhotoTimelineEvent, formatTimelineAssociation } from '@/lib/timeline/builders'
import { track } from '@/lib/analytics/track'
import { EVENT } from '@/lib/analytics/events'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function mapResultToSchemaUrgency(
  result: PhotoRecognitionResult,
): 'critical' | 'important' | 'normal' | 'ignorable' {
  if (result.isUrgent) return 'important'
  if (result.recognitionConfidence === 'low') return 'ignorable'
  return 'normal'
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
  let userContext: PhotoUserContext | null = null
  try {
    const form = await req.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return err('missing_file', '请上传文书图片', 400)
    }

    const bytes = Buffer.from(await file.arrayBuffer())
    userContext = user
      ? await buildUserContext({ memberId: user.id })
      : null
    recognition = await recognizePhotoDocument({
      bytes,
      mediaType: file.type,
      filename: file.name,
      userContext,
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
    docType: result.docType ?? (result.isEnvelope ? '信封' : '未识别文件'),
    summary: result.summary,
    urgency: mapResultToSchemaUrgency(result),
    aiResponse: result as unknown as Record<string, unknown>,
  })

  const timelineEvent = await createTimelineEvent(buildPhotoTimelineEvent({
    memberId: user?.id ?? null,
    sessionId,
    documentId: doc.id,
    result,
    visaType: userContext?.visaType ?? null,
  }))
  const relatedEvents = await findRelatedTimelineEvents({
    owner: { memberId: user?.id ?? null, sessionId },
    issuer: result.issuer,
    docType: result.docType,
    excludeId: timelineEvent.id,
    limit: 3,
  })

  await track(
    EVENT.PHOTO_RECOGNIZE_SUCCESS,
    {
      docType: result.docType,
      confidence: result.recognitionConfidence,
      hasDeadline: !!result.deadline,
      hasAmount: result.amount !== null,
      isEnvelope: result.isEnvelope,
      needsExpertAdvice: result.needsExpertAdvice,
    },
    { user, sessionId },
  )

  return ok({
    documentId: doc.id,
    result,
    recognition: {
      model: recognition.modelId,
      mediaType: recognition.mediaType,
      userContextInjected: recognition.userContextInjected,
    },
    quota: user
      ? await getPhotoQuotaForFamily(user.familyId)
      : await getPhotoQuotaForSession(sessionId as string),
    emailPrompt: shouldPromptEmail,
    timeline: {
      eventId: timelineEvent.id,
      relatedEvents: relatedEvents.map(formatTimelineAssociation),
    },
  })
}
