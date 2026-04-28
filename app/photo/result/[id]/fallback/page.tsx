/**
 * /photo/result/[id]/fallback — 拍照识别失败兜底页（T5）
 *
 * 用户看到这个页面意味着 Bedrock 返回 "无法确认的文书"（详见 lib/photo/bedrock.ts
 * fallbackRecognition）。我们用诚实、不戏剧化的措辞引导用户：
 *  1) 重新拍 → 大多数失败是光线 / 角度 / 切边问题
 *  2) 反馈给 TEBIQ → 如果用户确信是日文政府文书，进咨询渠道
 *
 * 我们不显示原始上传图片缩略图（数据库目前只存 imageUrl 字段为 mock://，
 * 还没有实际图片存储）。Block 7 不引入 S3 / R2，留给后续。
 *
 * 视觉留给 Codex；这里只保证结构 + 文案 + tracking 完整。
 */
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, Camera, MessageCircle, RefreshCcw } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import ComplianceFooter from '@/app/_components/v5/ComplianceFooter'
import TrackOnMount from '@/app/_components/v5/TrackOnMount'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import { EVENT } from '@/lib/analytics/events'
import { getDocumentById } from '@/lib/db/queries/documents'
import type { PhotoRecognitionResult } from '@/lib/photo/types'

export const dynamic = 'force-dynamic'

const FALLBACK_DOCTYPE = '无法确认的文书'

const REASONS: { title: string; sub: string }[] = [
  {
    title: '照片不够清晰',
    sub: '请在光线充足处再拍一张，避免反光和阴影遮挡。',
  },
  {
    title: '拍摄角度有偏',
    sub: '请正面拍摄，确认文件四角都在画面内，文字水平。',
  },
  {
    title: '文件不是日文政府/官方文书',
    sub: 'TEBIQ 当前只支持税金、年金、入管、市役所等日本生活手续相关的官方文书。',
  },
  {
    title: '文件内容超出当前识别范围',
    sub: '罕见或个别地区专用的格式可能没被覆盖，欢迎反馈帮助我们改进。',
  },
]

export default async function PhotoFallbackPage({
  params,
}: {
  params: { id: string }
}) {
  const doc = await getDocumentById(params.id)
  if (!doc || !doc.aiResponse) notFound()
  const result = doc.aiResponse as unknown as PhotoRecognitionResult

  // 如果用户直接访问这个 URL 但文档其实识别成功了，直接送回正常 result 页。
  if (result.docType !== FALLBACK_DOCTYPE) {
    redirect(`/photo/result/${doc.id}`)
  }

  return (
    <AppShell appBar={<AppBar title="识别结果" back="/photo" />}>
      <TrackOnMount
        event={EVENT.PHOTO_RECOGNIZE_FAIL}
        payload={{ docId: doc.id, fallback: true }}
      />

      <section className="mt-3 rounded-card border border-accent/30 bg-accent-2 px-4 py-4 text-center shadow-card">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-[13px] bg-surface text-accent shadow-soft">
          <AlertTriangle size={20} strokeWidth={1.55} />
        </div>
        <h1 className="text-[16px] font-medium text-ink">这张图我们暂时没有看清</h1>
        <p className="mx-auto mt-2 max-w-[280px] text-[11.5px] leading-[1.65] text-ash">
          没识别出明确的文书类型和关键信息。下面的几个原因最常见，先按提示处理一次。
        </p>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <h2 className="mb-2 text-[13px] font-medium text-ink">可能的原因</h2>
        <ul className="space-y-2.5">
          {REASONS.map((r, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-[3px] flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <div className="min-w-0">
                <div className="text-[12.5px] font-medium leading-snug text-ink">
                  {r.title}
                </div>
                <p className="mt-1 text-[11px] leading-[1.6] text-ash">{r.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-5 space-y-2">
        <TrackedLink
          href="/photo"
          eventName={EVENT.PHOTO_FALLBACK_RETRY}
          payload={{ docId: doc.id, action: 'retake' }}
          className="block"
        >
          <Button>
            <span className="inline-flex items-center justify-center gap-2">
              <Camera size={15} strokeWidth={1.55} />
              重新拍摄
            </span>
          </Button>
        </TrackedLink>
        <TrackedLink
          href={`/consultation?from=photo_fallback&doc_id=${doc.id}`}
          eventName={EVENT.PHOTO_FALLBACK_RETRY}
          payload={{ docId: doc.id, action: 'feedback' }}
          className="mt-2 flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-btn border border-hairline bg-surface px-4 py-3 text-center text-[13px] font-medium text-ink transition-colors hover:bg-canvas"
        >
          <MessageCircle size={15} strokeWidth={1.55} />
          确认是日文政府文书，反馈以改进
        </TrackedLink>
        <Link
          href="/"
          className="mt-1 flex min-h-[40px] w-full items-center justify-center gap-1.5 text-center text-[12px] text-ash hover:text-ink"
        >
          <RefreshCcw size={13} strokeWidth={1.55} />
          回到首页
        </Link>
      </div>

      <ComplianceFooter />
    </AppShell>
  )
}
