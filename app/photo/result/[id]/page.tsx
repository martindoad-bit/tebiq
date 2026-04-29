/**
 * /photo/result/[id] — 拍照识别结果。
 *
 * Block 9: 新识别 schema 只做客观文书整理 + 保守通用行动，
 * 不输出对在留资格/永住/续签的影响判断。
 */
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { AlertTriangle, FileText, LockKeyhole, MailOpen, RotateCcw } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import { EVENT } from '@/lib/analytics/events'
import { getCurrentUser } from '@/lib/auth/session'
import { getDocumentById } from '@/lib/db/queries/documents'
import { shouldUseFallbackPage } from '@/lib/photo/bedrock'
import type { PhotoRecognitionResult } from '@/lib/photo/types'
import SaveToArchiveButton from './SaveToArchiveButton'
import EmailReminderPrompt from './EmailReminderPrompt'
import ComplianceFooter from '@/app/_components/v5/ComplianceFooter'
import RelatedKnowledge from '@/app/_components/v5/RelatedKnowledge'

export const dynamic = 'force-dynamic'

function formatDeadline(iso: string | null, remaining: number | null): string | null {
  if (!iso) return null
  const d = new Date(`${iso}T00:00:00+09:00`)
  if (Number.isNaN(d.getTime())) return iso
  const base = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  if (remaining === null) return base
  if (remaining < 0) return `${base}（已过 ${Math.abs(remaining)} 天）`
  if (remaining === 0) return `${base}（今天）`
  return `${base}（${remaining} 天后）`
}

function formatDeadlineShort(iso: string | null): string {
  if (!iso) return '未识别'
  const d = new Date(`${iso}T00:00:00+09:00`)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function remainingLabel(days: number | null): string {
  if (days === null) return '残り -- 日'
  if (days < 0) return `已过 ${Math.abs(days)} 日`
  if (days === 0) return '今日截止'
  return `残り ${days} 日`
}

function confidenceLabel(result: PhotoRecognitionResult): string {
  if (result.isEnvelope) return '信封识别'
  if (result.recognitionConfidence === 'high') return '识别质量高'
  if (result.recognitionConfidence === 'medium') return '识别质量中等'
  return '识别质量不高'
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
  const user = await getCurrentUser()

  const result = doc.aiResponse as unknown as PhotoRecognitionResult
  if (shouldUseFallbackPage(result)) {
    redirect(`/photo/result/${doc.id}/fallback`)
  }

  const deadline = formatDeadline(result.deadline, result.deadlineRemainingDays)
  const title = result.docType ?? (result.isEnvelope ? '信封' : '未识别文件')
  const issuer = result.issuer ?? '发件机构不明'

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
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
        <p className="mb-2 text-[11px] text-ash">{result.isEnvelope ? '信封外观' : '文书类型'}</p>
        <h1 className="text-[20px] font-medium leading-snug text-ink">{title}</h1>
        <p className="mt-1 text-[13px] text-ash">{issuer}</p>
      </section>

      <section className="mt-3 overflow-hidden rounded-card border border-hairline bg-surface">
        <FactRow label="期限" value={formatDeadlineShort(result.deadline)} sub={remainingLabel(result.deadlineRemainingDays)} urgent={(result.deadlineRemainingDays ?? 99) < 7} />
        <FactRow label="金额" value={result.amount ?? '未识别'} sub="原文件金额为准" />
        <FactRow label="识别质量" value={confidenceLabel(result)} sub={deadline ?? '结构化字段已整理'} />
      </section>

      {result.isEnvelope && (
        <NoticeBlock tone="envelope" title="这次只识别到信封">
          目前只能看到发件机构或信封类别。请打开信封后拍摄正文，才能确认期限、金额和办理内容。
        </NoticeBlock>
      )}

      {result.recognitionConfidence === 'low' && (
        <NoticeBlock tone="warning" title="识别质量不高">
          图片里可读信息较少，建议重新拍摄整页，确保标题、日期、金额和正文都清晰。
        </NoticeBlock>
      )}

      {result.contextHints && result.contextHints.length > 0 && (
        <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3">
          <div className="space-y-1.5">
            {result.contextHints.map(hint => (
              <p key={hint} className="text-[11.5px] leading-[1.6] text-ink">
                {hint}
              </p>
            ))}
          </div>
        </section>
      )}

      <InfoBlock title="这是做什么的？">
        <p>{result.summary}</p>
      </InfoBlock>

      <InfoBlock title="可以先这样处理">
        <ol className="list-decimal pl-4 space-y-0.5">
          {result.generalActions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ol>
      </InfoBlock>

      {searchParams?.email === 'prompt' && <EmailReminderPrompt />}

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
            <FileText size={16} strokeWidth={1.5} />
          </span>
          <p className="text-[11.5px] leading-[1.6] text-ash">
            TEBIQ 只整理文书字面信息；付款金额、期限和提交要求请以原文件为准。
          </p>
        </div>
      </section>

      <div className="mt-[18px] space-y-2">
        <Link href={`/photo/result/${doc.id}/detail`} className="block">
          <Button>查看详细说明</Button>
        </Link>
        {result.needsExpertAdvice && (
          <div className="rounded-btn border border-hairline bg-surface px-4 py-3 text-center text-[13px] font-medium text-ink">
            涉及法律 / 税务 / 签证决策时，建议咨询专家
          </div>
        )}
        {user ? <SaveToArchiveButton /> : <RegisterAfterPhotoCard docId={doc.id} />}
      </div>

      <RelatedKnowledge
        tags={[
          result.docType ?? '',
          result.issuer ?? '',
          result.isEnvelope ? '信封' : '',
          result.needsExpertAdvice ? '在留' : '',
        ]}
      />

      <ComplianceFooter />
    </AppShell>
  )
}

function RegisterAfterPhotoCard({ docId }: { docId: string }) {
  return (
    <section className="rounded-card border border-hairline bg-surface p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
          <LockKeyhole size={17} strokeWidth={1.55} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[13px] font-medium leading-snug text-ink">
            保存识别记录和到期提醒
          </h2>
          <p className="mt-1 text-[11px] leading-[1.55] text-ash">
            注册账号，邮箱 / 手机号都可以。刚才的识别会自动归入你的档案。
          </p>
        </div>
      </div>
      <Link href={`/register?from=photo&doc_id=${encodeURIComponent(docId)}`} className="mt-3 block">
        <Button>注册账号</Button>
      </Link>
    </section>
  )
}

function FactRow({
  label,
  value,
  sub,
  urgent,
}: {
  label: string
  value: string
  sub?: string
  urgent?: boolean
}) {
  return (
    <div className="grid min-h-[64px] grid-cols-[72px_1fr] items-center gap-3 border-b border-hairline px-4 last:border-b-0">
      <span className="text-[12px] text-ash">{label}</span>
      <span className="min-w-0">
        <span className={`block truncate text-[20px] font-light leading-tight numeric ${urgent ? 'text-warning' : 'text-ink'}`}>
          {value}
        </span>
        {sub && <span className="mt-1 block truncate text-[11px] text-ash">{sub}</span>}
      </span>
    </div>
  )
}

function NoticeBlock({
  title,
  tone,
  children,
}: {
  title: string
  tone: 'warning' | 'envelope'
  children: ReactNode
}) {
  const icon = tone === 'warning'
    ? <AlertTriangle size={15} strokeWidth={1.55} />
    : <MailOpen size={15} strokeWidth={1.55} />
  return (
    <section className={`mt-3 rounded-card border px-4 py-3 ${tone === 'warning' ? 'border-warning/55 bg-surface' : 'border-hairline bg-surface'}`}>
      <div className="mb-1.5 flex items-center gap-2 text-ink">
        {icon}
        <p className="text-[13px] font-medium">{title}</p>
      </div>
      <p className="text-[11.5px] leading-[1.65] text-slate">{children}</p>
    </section>
  )
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3">
      <div className="mb-1.5 flex items-center gap-2">
        <FileText size={15} strokeWidth={1.55} className="text-ink" />
        <p className="text-[13px] font-medium text-ink">{title}</p>
      </div>
      <div className="text-[12px] leading-[1.62] text-slate">{children}</div>
    </section>
  )
}
