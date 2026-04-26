import type { Verdict } from '@/lib/check/questions/gijinkoku'
import { Gift } from 'lucide-react'
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
    <div className="no-capture rounded-card border border-hairline bg-surface p-4 shadow-card">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
          <Gift size={17} strokeWidth={1.55} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium leading-snug text-ink">
            {heading}
          </div>
          <p className="mt-1 text-[11px] leading-[1.55] text-ash">{description}</p>
        </div>
      </div>
      <div className="mt-3">
      <ShareLinkButton verdict={verdict} summary={summary} />
      </div>
    </div>
  )
}
