import Link from 'next/link'
import { ChevronRight, ClipboardCheck, ListChecks } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import {
  CHECK_VISA_META,
  type CanonicalCheckVisa,
  type DimensionStatus,
  type DimensionView,
} from '@/lib/check/dimensions'

const STATUS_LABEL: Record<DimensionStatus, string> = {
  unchecked: '未查',
  checked: '已查',
  needs_action: '需处理',
  recent: '3月内已查',
  expired: '已过期',
}

const RISK_LABEL: Record<string, string> = {
  recommended: '建议必看',
  archive_triggered: '档案触发',
  expired: '已过期',
}

export default function CheckDimensionList({
  visa,
  dimensions,
}: {
  visa: CanonicalCheckVisa
  dimensions: DimensionView[]
}) {
  const meta = CHECK_VISA_META[visa]
  const needsAction = dimensions.filter(item => item.status === 'needs_action').length
  const checked = dimensions.filter(item => item.status === 'checked' || item.status === 'recent').length

  return (
    <AppShell appBar={<AppBar title="续签自查" back="/" />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-cool-blue text-ink">
            <ListChecks size={19} strokeWidth={1.55} />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-[16px] font-medium text-ink">{meta.label}</h1>
            <p className="mt-1 text-[12px] leading-[1.65] text-ash">
              {checked} 项已查 / {needsAction} 项需处理
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
          <span className="text-[11px] text-ash">完整自查约 5 分钟</span>
          <Link href={`/check/${visa}/quiz`} className="text-[12px] font-medium text-ink underline-offset-4 hover:underline">
            完整自查
          </Link>
        </div>
      </section>

      <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {(Object.entries(CHECK_VISA_META) as Array<[CanonicalCheckVisa, typeof meta]>).map(([key, item]) => (
          <Link
            key={key}
            href={`/check/${key}`}
            className={`flex-shrink-0 rounded-[10px] border px-3 py-1.5 text-[11px] font-medium ${
              key === visa ? 'border-ink bg-ink text-white' : 'border-hairline bg-surface text-slate'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        <div className="mb-2 flex items-center gap-2 text-[12px] font-medium text-ink">
          <ClipboardCheck size={15} strokeWidth={1.55} />
          维度清单
        </div>
        <ul className="divide-y divide-hairline">
          {dimensions.map(item => {
            const statusLabel = STATUS_LABEL[item.status]
            return (
              <li key={item.key} className="py-3 first:pt-1 last:pb-1">
                <Link href={`/check/${visa}/${item.key}`} className="group flex items-center gap-3">
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[13px] font-medium text-ink">{item.title}</span>
                      <StatusBadge status={item.status} />
                      {item.riskFlag && RISK_LABEL[item.riskFlag] !== STATUS_LABEL[item.status] && (
                        <RiskBadge label={RISK_LABEL[item.riskFlag] ?? item.riskFlag} />
                      )}
                    </span>
                    <span className="mt-1 block text-[11px] leading-[1.55] text-ash">
                      {item.reason ?? item.description}
                    </span>
                  </span>
                  {item.actionLabel !== statusLabel && (
                    <span className="flex-shrink-0 text-[11px] text-ash">
                      {item.actionLabel}
                    </span>
                  )}
                  <ChevronRight size={14} className="text-haze group-hover:text-ink" />
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </AppShell>
  )
}

function StatusBadge({ status }: { status: DimensionStatus }) {
  const label = STATUS_LABEL[status]
  const attention = label === '待确认' || label === '需要补齐'
  return (
    <span className={`rounded-[8px] px-2 py-0.5 text-[10px] font-normal ${attention ? 'bg-[#FFF4E1] text-warning' : 'bg-paper text-ash'}`}>
      {label}
    </span>
  )
}

function RiskBadge({ label }: { label: string }) {
  const attention = label === '待确认' || label === '需要补齐'
  return (
    <span className={`rounded-[8px] px-2 py-0.5 text-[10px] font-normal ${attention ? 'bg-[#FFF4E1] text-warning' : 'bg-paper text-ash'}`}>
      {label}
    </span>
  )
}
