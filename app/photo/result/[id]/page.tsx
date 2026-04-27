/**
 * /photo/result/[id] — 屏 03 拍照结果（重要程度）
 *
 * 视觉源：docs/prototype/v5-mockup.html lines 1332-1387
 *
 * Server component：从 DB 读 documents 行，把 aiResponse 反序列化回
 * PhotoRecognitionResult。
 *
 * Sections:
 *   1. 文件类型 + docType + issuer
 *   2. 緊急度卡片（urgency 决定标签颜色 + 剩余天数）
 *   3. QA: 这是做什么的 / 你需要做什么 / 如果不做会怎样
 * 底部两按钮：
 *   - 查看详细说明 → /photo/result/[id]/detail
 *   - 保存到我的档案（client toast 后 router.back()）
 */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle2, FileText, RotateCcw } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import { EVENT } from '@/lib/analytics/events'
import { getDocumentById } from '@/lib/db/queries/documents'
import type { PhotoRecognitionResult, Urgency } from '@/lib/photo/types'
import SaveToArchiveButton from './SaveToArchiveButton'
import EmailReminderPrompt from './EmailReminderPrompt'
import ComplianceFooter from '@/app/_components/v5/ComplianceFooter'

export const dynamic = 'force-dynamic'

interface UrgencyDisplay {
  label: string
  bg: string
  /** 中文「!」颜色 */
  bang: string
}

function urgencyDisplay(u: Urgency): UrgencyDisplay {
  switch (u) {
    case 'critical':
      return { label: '需要尽快处理', bg: '#E2574C', bang: '#E2574C' }
    case 'high':
      return { label: '需要尽快处理', bg: '#E2574C', bang: '#E2574C' }
    case 'normal':
      return { label: '一般事项', bg: '#F6B133', bang: '#F6B133' }
    case 'ignorable':
      return { label: '可暂缓', bg: '#6E7A85', bang: '#6E7A85' }
  }
}

export default async function PhotoResultPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams?: { email?: string }
}) {
  const doc = await getDocumentById(params.id)
  if (!doc || !doc.aiResponse) notFound()

  const result = doc.aiResponse as unknown as PhotoRecognitionResult
  const urg = urgencyDisplay(result.urgency)

  return (
    <AppShell
      appBar={
        <AppBar
          title="识别结果"
          back
          right={
            <TrackedLink
              href="/photo"
              eventName={EVENT.PHOTO_RETAKE_CLICK}
              payload={{ source: 'result_appbar', docId: doc.id }}
              className="flex items-center gap-1 text-[12px] text-ash"
            >
              <RotateCcw size={13} strokeWidth={1.55} />
              重新识别
            </TrackedLink>
          }
        />
      }
    >
      {/* 文件类型 */}
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
            <FileText size={18} strokeWidth={1.55} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-ash mb-1">文件类型</p>
            <h1 className="text-[17px] font-medium leading-snug text-ink">
              {result.docType}
            </h1>
            <p className="mt-1 text-[11.5px] text-slate">来自：{result.issuer}</p>
          </div>
        </div>
      </section>

      {/* 緊急度 */}
      <section
        className="mt-2.5 rounded-card border bg-accent-2 px-3.5 py-4 text-center shadow-card"
        style={{ borderColor: 'rgba(246, 177, 51, 0.4)', borderWidth: '0.5px' }}
      >
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[12px] text-[11px] font-medium text-white"
          style={{ background: urg.bg }}
        >
          <span aria-hidden>●</span>
          {urg.label}
        </span>
        {result.deadlineRemainingDays !== null && (
          <div className="mt-2.5 text-[22px] font-medium leading-none text-ink">
            <span aria-hidden style={{ color: urg.bang }}>
              !
            </span>{' '}
            {result.deadlineRemainingDays} 天内
          </div>
        )}
      </section>

      {/* QA blocks */}
      <InfoBlock title="这是做什么的？">
        <p>{result.summary}</p>
      </InfoBlock>

      <InfoBlock title="你需要做什么？" icon="check">
        <ol className="list-decimal pl-4 space-y-0.5">
          {result.actions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ol>
      </InfoBlock>

      <InfoBlock title="如果不做会怎样？" icon="alert">
        <p>{result.consequences}</p>
      </InfoBlock>

      {searchParams?.email === 'prompt' && <EmailReminderPrompt />}

      {/* CTA */}
      <div className="mt-[18px] space-y-2">
        <Link href={`/photo/result/${doc.id}/detail`} className="block">
          <Button>查看详细说明</Button>
        </Link>
        <SaveToArchiveButton />
      </div>

      <ComplianceFooter />
    </AppShell>
  )
}

function InfoBlock({
  title,
  icon,
  children,
}: {
  title: string
  icon?: 'check' | 'alert'
  children: ReactNode
}) {
  const Icon = icon === 'check' ? CheckCircle2 : icon === 'alert' ? AlertCircle : FileText
  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
      <div className="mb-1.5 flex items-center gap-2">
        <Icon size={15} strokeWidth={1.55} className="text-ink" />
        <p className="text-[13px] font-medium text-ink">{title}</p>
      </div>
      <div className="text-[12px] leading-[1.62] text-slate">{children}</div>
    </section>
  )
}
