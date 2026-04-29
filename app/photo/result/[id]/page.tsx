/**
 * /photo/result/[id] — 拍照识别结果。
 *
 * Block 9: 新识别 schema 只做客观文书整理 + 保守通用行动，
 * 不输出对在留资格/永住/续签的影响判断。
 */
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  AlertTriangle,
  CalendarDays,
  FileText,
  LockKeyhole,
  MailOpen,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react'
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
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
            {result.isEnvelope ? <MailOpen size={18} strokeWidth={1.55} /> : <FileText size={18} strokeWidth={1.55} />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-ash mb-1">{result.isEnvelope ? '信封外观' : '文件类型'}</p>
            <h1 className="text-[17px] font-medium leading-snug text-ink">{title}</h1>
            <p className="mt-1 text-[11.5px] text-slate">来自：{issuer}</p>
          </div>
        </div>
      </section>

      <section className="mt-2.5 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[12px] bg-cool-blue px-2.5 py-1 text-[11px] font-medium text-ink">
            <ShieldCheck size={12} strokeWidth={1.55} />
            {confidenceLabel(result)}
          </span>
          {deadline && (
            <span className="inline-flex items-center gap-1.5 rounded-[12px] bg-accent-2 px-2.5 py-1 text-[11px] font-medium text-ink">
              <CalendarDays size={12} strokeWidth={1.55} />
              截止日期 {deadline}
            </span>
          )}
          {result.amount && (
            <span className="inline-flex items-center rounded-[12px] bg-canvas px-2.5 py-1 text-[11px] font-medium text-ink">
              金额 {result.amount}
            </span>
          )}
        </div>
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
        <section className="mt-3 rounded-card border border-accent/35 bg-accent-2/55 px-4 py-3 shadow-card">
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

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[11px] bg-cool-blue text-ink">
            <ShieldCheck size={16} strokeWidth={1.55} />
          </span>
          <p className="text-[11.5px] leading-[1.6] text-slate/74">
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
    <section className="rounded-card border border-accent/35 bg-accent-2/60 p-4 shadow-card">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-surface text-ink shadow-soft">
          <LockKeyhole size={17} strokeWidth={1.55} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[13px] font-medium leading-snug text-ink">
            想保存这次识别 + 收到到期提醒？
          </h2>
          <p className="mt-1 text-[11px] leading-[1.55] text-ash">
            注册账号，邮箱 / 手机号都可以。刚才的识别会自动进入我的提醒。
          </p>
        </div>
      </div>
      <Link href={`/register?from=photo&doc_id=${encodeURIComponent(docId)}`} className="mt-3 block">
        <Button>注册账号</Button>
      </Link>
    </section>
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
    <section className="mt-3 rounded-card border border-accent/35 bg-accent-2 px-4 py-3 shadow-card">
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
    <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
      <div className="mb-1.5 flex items-center gap-2">
        <FileText size={15} strokeWidth={1.55} className="text-ink" />
        <p className="text-[13px] font-medium text-ink">{title}</p>
      </div>
      <div className="text-[12px] leading-[1.62] text-slate">{children}</div>
    </section>
  )
}
