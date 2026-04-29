/**
 * /photo/result/[id]/detail — 拍照识别详细说明。
 *
 * Block 9 schema 不再生成长篇判断，只展示文书字面信息、通用行动和合规提示。
 */
import { notFound } from 'next/navigation'
import { CalendarDays, FileText, ReceiptText, ShieldCheck } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import { getDocumentById } from '@/lib/db/queries/documents'
import type { PhotoRecognitionResult } from '@/lib/photo/types'
import SaveToArchiveButton from '../SaveToArchiveButton'
import ComplianceFooter from '@/app/_components/v5/ComplianceFooter'

export const dynamic = 'force-dynamic'

function formatDeadline(iso: string | null, remaining: number | null): string | null {
  if (!iso) return null
  const d = new Date(`${iso}T00:00:00+09:00`)
  if (Number.isNaN(d.getTime())) return iso
  const base = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  if (remaining === null) return base
  if (remaining < 0) return `${base}（已过 ${Math.abs(remaining)} 天）`
  if (remaining === 0) return `${base}（今天）`
  return `${base}（还有 ${remaining} 天）`
}

export default async function PhotoResultDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const doc = await getDocumentById(params.id)
  if (!doc || !doc.aiResponse) notFound()

  const result = doc.aiResponse as unknown as PhotoRecognitionResult
  const title = result.docType ?? (result.isEnvelope ? '信封' : '未识别文件')
  const deadline = formatDeadline(result.deadline, result.deadlineRemainingDays)

  return (
    <AppShell appBar={<AppBar title={`${title} 详细说明`} back />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
            <FileText size={18} strokeWidth={1.5} />
          </span>
          <div>
            <p className="text-[11px] text-ash">识别文件</p>
            <h1 className="mt-1 text-[16px] font-medium leading-snug text-ink">
              {title}
            </h1>
            <p className="mt-1 text-[11px] leading-[1.55] text-slate">
              {result.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3">
        <div className="mb-2 flex items-center gap-2">
          <ShieldCheck size={15} strokeWidth={1.55} className="text-ink" />
          <p className="text-[13px] font-medium text-ink">识别到的信息</p>
        </div>
        <dl className="space-y-2 text-[12px] leading-[1.6]">
          <div className="flex justify-between gap-3">
            <dt className="text-ash">发件机构</dt>
            <dd className="text-right text-ink">{result.issuer ?? '未识别'}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ash">识别质量</dt>
            <dd className="text-right text-ink">{result.recognitionConfidence}</dd>
          </div>
          {deadline && (
            <div className="flex justify-between gap-3">
              <dt className="flex items-center gap-1.5 text-ash">
                <CalendarDays size={13} strokeWidth={1.55} />
                截止日期
              </dt>
              <dd className="text-right text-ink">{deadline}</dd>
            </div>
          )}
          {result.amount && (
            <div className="flex justify-between gap-3">
              <dt className="flex items-center gap-1.5 text-ash">
                <ReceiptText size={13} strokeWidth={1.55} />
                金额
              </dt>
              <dd className="text-right text-ink">{result.amount}</dd>
            </div>
          )}
        </dl>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3">
        <h2 className="text-[13px] font-medium text-ink">通用处理步骤</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-4 text-[12px] leading-[1.65] text-slate">
          {result.generalActions.map((action, i) => (
            <li key={i}>{action}</li>
          ))}
        </ol>
      </section>

      <div className="mt-[18px]">
        <SaveToArchiveButton />
      </div>

      <ComplianceFooter />
    </AppShell>
  )
}
