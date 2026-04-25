import type { Verdict } from '@/lib/check/questions'

export default function BreathCard({ verdict }: { verdict: Verdict }) {
  // Per spec: shown on red and yellow, hidden on green.
  if (verdict === 'green') return null

  return (
    <div className="bg-[#E6EEF5] border-l-4 border-[#1E3A5F] p-4 rounded-lg mb-4">
      <div className="text-[#1E3A5F] font-medium mb-1">💙 首先，深呼吸</div>
      <div className="text-sm text-[#374151] leading-relaxed">
        你通过自查发现了问题，这已经比大多数人好了——
        大多数人是在申请被拒之后才发现问题，而你现在还有时间处理。
        <br />
        <br />
        接下来，我们一步一步来。
      </div>
    </div>
  )
}
