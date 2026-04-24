'use client'
import DownloadPackage from './DownloadPackage'

export default function MaterialsPackage({ visaType = 'gijinkoku' }: { visaType?: string }) {
  return (
    <div className="no-capture bg-card border border-line border-l-4 border-l-primary rounded-2xl p-5 mb-6 shadow-sm">
      <h3 className="text-title text-base font-bold mb-3">📋 获取你的专属材料包</h3>

      <ul className="space-y-2 mb-5">
        {BENEFITS.map(b => (
          <li key={b} className="flex items-start gap-2 text-body text-sm leading-relaxed">
            <Check />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-muted text-xs">早鸟价</span>
        <span className="text-primary text-3xl font-bold leading-none">¥380</span>
        <span className="text-muted text-sm line-through">¥480</span>
      </div>
      <p className="text-muted text-xs mb-4">正式价 ¥480 · 早鸟期内免费试用生成功能</p>

      <DownloadPackage visaType={visaType} />

      <p className="text-muted text-[11px] leading-relaxed mt-4 pt-4 border-t border-line">
        本工具生成的申请书草稿仅供参考，请用户核对后自行修改提交，不构成法律服务。
      </p>
    </div>
  )
}

const BENEFITS = [
  '个性化材料清单（精确到你的情况）',
  '在留期间更新申请书预填草稿',
  '每项材料的获取指南',
]

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#16A34A"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 mt-1"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
