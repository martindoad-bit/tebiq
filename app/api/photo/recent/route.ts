/**
 * GET /api/photo/recent — 当前 family 最近 10 条 documents
 *
 * 屏 02「拍照入口」最近记录列表的数据源。
 * Block 3 mock 阶段：直接读 documents 表（无图片附件）。
 */
import { ok } from '@/lib/api/response'
import { getAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { listDocumentsByFamilyId, listDocumentsBySessionId } from '@/lib/db/queries/documents'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const user = await getCurrentUser()
  const anonymousSessionId = user ? null : await getAnonymousSessionId()
  const docs = user
    ? await listDocumentsByFamilyId(user.familyId, 10)
    : anonymousSessionId
      ? await listDocumentsBySessionId(anonymousSessionId, 10)
      : []

  return ok({
    items: docs.map(d => ({
      id: d.id,
      docType: d.docType ?? '未识别文件',
      summary: d.summary ?? '',
      createdAt: d.createdAt.toISOString(),
      urgency: d.urgency,
    })),
  })
}
