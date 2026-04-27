/**
 * /photo/result/[id]/detail — 屏 04 拍照结果（详细说明）
 *
 * 视觉源：docs/prototype/v5-mockup.html lines 1389-1442
 *
 * Server component：从 DB 读 doc.aiResponse → PhotoRecognitionResult。
 *
 * 渲染：
 *   - 每个 detail.sections：序号 + heading + body + 可选 bullets
 *   - 底部金额卡片（截止日期 + 金额大字右对齐）
 *   - 主按钮：保存到我的档案
 */
import { notFound } from 'next/navigation'
import { CalendarDays, FileText, ReceiptText } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import { getDocumentById } from '@/lib/db/queries/documents'
import type { PhotoRecognitionResult } from '@/lib/photo/types'
import SaveToArchiveButton from '../SaveToArchiveButton'
import ComplianceFooter from '@/app/_components/v5/ComplianceFooter'

export const dynamic = 'force-dynamic'

function formatDeadline(iso: string | null, remaining: number | null): string | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  const base = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  if (remaining !== null) return `${base}（还有 ${remaining} 天）`
  return base
}

function formatAmount(amount: number | null): string | null {
  if (amount === null) return null
  return `¥${amount.toLocaleString('en-US')}`
}

export default async function PhotoResultDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const doc = await getDocumentById(params.id)
  if (!doc || !doc.aiResponse) notFound()

  const result = doc.aiResponse as unknown as PhotoRecognitionResult
  const deadline = formatDeadline(result.deadline, result.deadlineRemainingDays)
  const amount = formatAmount(result.amount)
  const showAmountCard = deadline !== null || amount !== null

  return (
    <AppShell appBar={<AppBar title={`${result.docType} 详细说明`} back />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
            <FileText size={18} strokeWidth={1.55} />
          </span>
          <div>
            <p className="text-[11px] text-ash">识别文件</p>
            <h1 className="mt-1 text-[16px] font-medium leading-snug text-ink">
              {result.docType}
            </h1>
            <p className="mt-1 text-[11px] leading-[1.55] text-slate">
              以下说明根据识别内容整理，付款和期限请以原文件为准。
            </p>
          </div>
        </div>
      </section>

      {result.detail.sections.map((s, i) => (
        <section key={i} className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cool-blue text-[10px] font-medium text-ink">
              {i + 1}
            </span>
            <p className="text-[13px] font-medium text-ink">{s.heading}</p>
          </div>
          {s.body && (
            <p className="text-[12px] text-slate leading-[1.65]">{s.body}</p>
          )}
          {s.bullets && s.bullets.length > 0 && (
            <ul className="list-disc pl-5 text-[12px] text-slate leading-[1.65] space-y-0.5 mt-1">
              {s.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {showAmountCard && (
        <section className="mt-3 rounded-card border border-accent/30 bg-accent-2 px-3.5 py-3 shadow-card">
          {deadline && (
            <div className="flex items-start justify-between gap-3 text-[12px] py-0.5">
              <span className="flex items-center gap-1.5 text-ash">
                <CalendarDays size={14} strokeWidth={1.55} />
                截止日期
              </span>
              <span className="text-right font-medium text-ink">{deadline}</span>
            </div>
          )}
          {amount && (
            <>
              <div className="flex justify-between text-[12px] mt-2 py-0.5">
                <span className="flex items-center gap-1.5 text-ash">
                  <ReceiptText size={14} strokeWidth={1.55} />
                  金额
                </span>
              </div>
              <div className="text-[19px] font-medium text-ink mt-1.5 text-right">
                {amount}
              </div>
            </>
          )}
        </section>
      )}

      <div className="mt-[18px]">
        <SaveToArchiveButton />
      </div>

      <ComplianceFooter />
    </AppShell>
  )
}
