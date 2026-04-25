import type { Verdict } from '@/lib/check/questions'
import ShareLinkButton from '../ShareLinkButton'

export default function ShareBlock({
  verdict,
  summary,
  heading = '分享给朋友',
  description = '生成一个 7 天有效的分享链接，朋友点开即可看到这份结果摘要。',
}: {
  verdict: Verdict
  summary: string
  heading?: string
  description?: string
}) {
  return (
    <div className="no-capture bg-card border border-line rounded-2xl p-4">
      <div className="text-title font-bold text-sm mb-1">{heading}</div>
      <p className="text-muted text-xs leading-relaxed mb-3">{description}</p>
      <ShareLinkButton verdict={verdict} summary={summary} />
    </div>
  )
}
