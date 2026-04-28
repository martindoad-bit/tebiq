import type { Verdict } from '@/lib/check/questions/gijinkoku'

export default function BreathCard({ verdict }: { verdict: Verdict }) {
  // Per spec: shown on red and yellow, hidden on green.
  if (verdict === 'green') return null

  return (
    <div className="mb-4 rounded-card border border-hairline bg-cool-blue/70 p-4 shadow-card">
      <div className="mb-1 text-[13px] font-medium text-ink">先确认现状</div>
      <div className="text-[12.5px] leading-[1.7] text-slate">
        你通过自查发现了问题，这已经比大多数人好了——
        大多数人是在申请被拒之后才发现问题，而你现在还有时间处理。
        <br />
        <br />
        接下来，我们一步一步来。
      </div>
    </div>
  )
}
