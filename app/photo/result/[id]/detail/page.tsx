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
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import { getDocumentById } from '@/lib/db/queries/documents'
import type { PhotoRecognitionResult } from '@/lib/photo/types'
import SaveToArchiveButton from '../SaveToArchiveButton'

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
      {result.detail.sections.map((s, i) => (
        <section key={i} className="mt-3.5">
          <p className="text-[13px] font-medium text-ink mb-1.5">
            {i + 1}. {s.heading}
          </p>
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
        <section className="mt-3 bg-accent-2 rounded-[10px] px-3.5 py-3">
          {deadline && (
            <div className="flex justify-between text-[12px] py-0.5">
              <span className="text-ash">截止日期</span>
              <span className="text-ink font-medium">{deadline}</span>
            </div>
          )}
          {amount && (
            <>
              <div className="flex justify-between text-[12px] mt-2 py-0.5">
                <span className="text-ash">金额</span>
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
    </AppShell>
  )
}
