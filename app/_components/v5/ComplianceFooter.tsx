/**
 * ComplianceFooter — 行政書士法合规底注
 *
 * 第 6 天专业人士反馈后新增。所有产生「建议行动」的 surface（自查结果、
 * 拍照即懂结果、知识详情、提醒等）必须挂这个组件。
 *
 * 两个核心声明：
 * 1. 非法律意见（行政書士法第 21 条）
 * 2. 市役所行动以居住地实际窗口为准（各区役所规则微妙不同）
 *
 * 视觉刻意低调（text-ash 11px），避免分散主要建议的注意力。
 */
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
            复杂或个别情况请咨询持牌行政書士。
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
