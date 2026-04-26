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
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import { getDocumentById } from '@/lib/db/queries/documents'
import type { PhotoRecognitionResult, Urgency } from '@/lib/photo/types'
import SaveToArchiveButton from './SaveToArchiveButton'

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
      return { label: '請尽快处理', bg: '#E2574C', bang: '#E2574C' }
    case 'normal':
      return { label: '一般事项', bg: '#F6B133', bang: '#F6B133' }
    case 'ignorable':
      return { label: '可暂缓', bg: '#6E7A85', bang: '#6E7A85' }
  }
}

export default async function PhotoResultPage({
  params,
}: {
  params: { id: string }
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
            <Link href="/photo" className="text-[12px] text-ash">
              重新识别
            </Link>
          }
        />
      }
    >
      {/* 文件类型 */}
      <section className="mt-3">
        <p className="text-[11px] text-ash mb-1">文件类型</p>
        <h1 className="text-[17px] font-medium text-ink mb-1.5">
          {result.docType}
        </h1>
        <p className="text-[11.5px] text-ink">来自：{result.issuer}</p>
      </section>

      {/* 緊急度 */}
      <section
        className="mt-2.5 rounded-[12px] border bg-accent-2 px-3.5 py-3.5 text-center"
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
          <div className="mt-2 text-[16px] font-medium text-ink">
            <span aria-hidden style={{ color: urg.bang }}>
              !
            </span>{' '}
            {result.deadlineRemainingDays} 天内
          </div>
        )}
      </section>

      {/* QA blocks */}
      <section className="mt-3.5">
        <p className="text-[13px] font-medium text-ink mb-1">这是做什么的？</p>
        <p className="text-[12px] text-slate leading-[1.6]">{result.summary}</p>
      </section>

      <section className="mt-3.5">
        <p className="text-[13px] font-medium text-ink mb-1">你需要做什么？</p>
        <ol className="list-decimal pl-5 text-[12px] text-slate leading-[1.6] space-y-0.5">
          {result.actions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ol>
      </section>

      <section className="mt-3.5">
        <p className="text-[13px] font-medium text-ink mb-1">如果不做会怎样？</p>
        <p className="text-[12px] text-slate leading-[1.6]">
          {result.consequences}
        </p>
      </section>

      {/* CTA */}
      <div className="mt-[18px] space-y-2">
        <Link href={`/photo/result/${doc.id}/detail`} className="block">
          <Button>查看详细说明</Button>
        </Link>
        <SaveToArchiveButton />
      </div>
    </AppShell>
  )
}
