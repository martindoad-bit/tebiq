import type { Verdict } from '@/lib/check/questions/gijinkoku'

export default function BreathCard({ verdict }: { verdict: Verdict }) {
  // Per spec: shown on red and yellow, hidden on green.
  if (verdict === 'green') return null

  return (
    <div className="mb-4 rounded-card border border-hairline bg-surface p-4">
      <div className="mb-1 text-[13px] font-medium text-ink">先确认现状</div>
      <div className="text-[12.5px] leading-[1.7] text-slate">
        当前结果包含需要处理的项目。递交前应逐项核对材料、期限和说明内容。
      </div>
    </div>
  )
}
