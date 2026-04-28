import { ShieldAlert } from 'lucide-react'

interface Props {
  /** 是否显示「以居住地市役所为准」一句（仅当建议涉及市役所时） */
  includeMunicipalityNote?: boolean
  /** 自定义额外提示行（可选） */
  extra?: string
}

export default function ComplianceFooter({
  includeMunicipalityNote = true,
  extra,
}: Props) {
  return (
    <section className="mt-4 rounded-card border border-hairline bg-canvas px-4 py-3">
      <div className="flex items-start gap-2 text-[11px] leading-[1.7] text-ash">
        <ShieldAlert size={13} strokeWidth={1.55} className="mt-[2px] flex-shrink-0" />
        <div className="space-y-1.5">
          <p>
            以上为参考信息，<strong className="text-slate">非法律意见</strong>。
            具体以官方 website 或专家为准。
          </p>
          {includeMunicipalityNote && (
            <p>
              市役所相关行动各区役所流程略有差异，
              <strong className="text-slate">具体以居住地市役所窗口公式为准</strong>。
            </p>
          )}
          {extra && <p>{extra}</p>}
        </div>
      </div>
    </section>
  )
}
