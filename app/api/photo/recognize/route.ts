/**
 * POST /api/photo/recognize
 *
 * Block 3 mock：不真实调用 AI，返回固定 fixture，但走完整 DAL 流程：
 *   1. 鉴权 → 获取 family
 *   2. 检查配额（免费 3/月）
 *   3. 写 documents 行（含 mock 识别结果）
 *   4. 返回 documentId + result
 *
 * 输入：multipart/form-data with file（Block 3 不存图片，只接 metadata）
 *       OR application/json { skip: true } (dev 触发器)
 * 输出：{ documentId, result }
 */
import { ok, err, errors } from '@/lib/api/response'
import { getCurrentUser } from '@/lib/auth/session'
import { createDocument } from '@/lib/db/queries/documents'
import { getPhotoQuotaForFamily } from '@/lib/photo/quota'
import { MOCK_RECOGNITION } from '@/lib/photo/mock'
import type { Urgency } from '@/lib/photo/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function mapUrgencyToSchema(u: Urgency): 'critical' | 'important' | 'normal' | 'ignorable' {
  // schema enum 用 'important' 而非 'high'
  if (u === 'high') return 'important'
  return u
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return errors.unauthorized()

  // 1. 配额检查
  const quota = await getPhotoQuotaForFamily(user.familyId)
  const shouldPromptEmail = !user.email && quota.used === 0
  if (!quota.unlimited && quota.remaining <= 0) {
    return err('quota_exceeded', '本月免费拍照次数已用完', 402, {
      used: quota.used,
      limit: quota.limit,
    })
  }

  // 2. 接收图片（Block 3 不真实存储 — Block 5 接 S3 / Supabase Storage）
  // 仅探测 content-type 来确定是 form-data 还是 JSON
  const contentType = req.headers.get('content-type') ?? ''
  let imageUrl = '' // placeholder
  if (contentType.includes('multipart/form-data')) {
    try {
      const form = await req.formData()
      const file = form.get('file') as File | null
      if (file) {
        // Block 5 会替换为真实上传 + URL；现在只记录元信息以便调试
        imageUrl = `mock://${file.name ?? 'untitled'}-${file.size ?? 0}b`
      }
    } catch {
      /* swallow — 不影响 mock 流程 */
    }
  } else {
    imageUrl = 'mock://no-upload'
  }

  // 3. 写 documents 行
  const result = MOCK_RECOGNITION
  const doc = await createDocument({
    familyId: user.familyId,
    memberId: user.id,
    imageUrl,
    docType: result.docType,
    summary: result.summary,
    urgency: mapUrgencyToSchema(result.urgency),
    aiResponse: result as unknown as Record<string, unknown>,
  })

  return ok({
    documentId: doc.id,
    result,
    quota: await getPhotoQuotaForFamily(user.familyId),
    emailPrompt: shouldPromptEmail,
  })
}
