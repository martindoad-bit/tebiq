import Link from 'next/link'
import { notFound } from 'next/navigation'
import { desc, eq, or } from 'drizzle-orm'
import AdminNav from '../_components/AdminNav'
import { PageShell } from '../_components/ui'
import AutoRefresh from './AutoRefresh'
import CopyButton from './CopyButton'
import { db } from '@/lib/db'
import { aiConsultations, consultations, type AiConsultation } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ key?: string }>

const BOOKING_STATUS_LABEL = {
  new: '未联系',
  contacted: '已联系',
  closed: '已关闭',
} as const

const AI_STATUS_LABEL = {
  streaming: '生成中',
  completed: '完成',
  partial: '部分完成',
  timeout: '超时',
  failed: '失败',
} as const

const FEEDBACK_LABEL = {
  helpful: '有帮助',
  inaccurate: '不准确',
  add_context: '补充情况',
  human_review: '需确认',
  saved: '保存',
} as const

export default async function ScrivenerLeadsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) {
    notFound()
  }

  const keyParam = sp.key ? `?key=${encodeURIComponent(sp.key)}` : ''
  const now = new Date()
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const [bookingRows, aiRows] = await Promise.all([
    db
      .select()
      .from(consultations)
      .orderBy(desc(consultations.createdAt))
      .limit(80),
    db
      .select()
      .from(aiConsultations)
      .where(
        or(
          eq(aiConsultations.humanConfirmClicked, true),
          eq(aiConsultations.feedbackType, 'human_review'),
          eq(aiConsultations.feedbackType, 'inaccurate'),
          eq(aiConsultations.completionStatus, 'failed'),
          eq(aiConsultations.completionStatus, 'timeout'),
        ),
      )
      .orderBy(desc(aiConsultations.createdAt))
      .limit(120),
  ])

  const newBookings = bookingRows.filter(r => r.status === 'new')
  const recentBookings = bookingRows.filter(r => r.createdAt >= dayAgo)
  const humanReviewRows = aiRows.filter(
    r => r.humanConfirmClicked || r.feedbackType === 'human_review',
  )
  const attentionRows = aiRows.filter(
    r => r.feedbackType === 'inaccurate' || r.completionStatus === 'failed' || r.completionStatus === 'timeout',
  )

  return (
    <main className="min-h-screen bg-base text-title">
      <AdminNav adminKey={sp.key ?? ''} />
      <PageShell
        title="书士线索"
        subtitle="先看未联系预约，再看 AI 咨询里的“需确认 / 不准确 / 失败”。这个页面每 20 秒刷新一次。"
      >
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <AutoRefresh />
          <Link
            href={`/admin/consultations${keyParam}`}
            className="rounded-full border border-hairline bg-surface px-3 py-1.5 text-[11px] font-medium text-ink hover:border-accent"
          >
            打开旧预约管理
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Metric label="未联系预约" value={newBookings.length} tone="hot" />
          <Metric label="24h 新预约" value={recentBookings.length} />
          <Metric label="需确认点击" value={humanReviewRows.length} tone="hot" />
          <Metric label="异常/不准确" value={attentionRows.length} tone="warn" />
        </div>

        <section className="mb-8">
          <SectionHeader
            title="预约表单提交"
            count={bookingRows.length}
            note="这里是用户已经留下联系方式的请求。"
          />
          {bookingRows.length === 0 ? (
            <EmptyState text="还没有预约表单提交。" />
          ) : (
            <div className="space-y-3">
              {bookingRows.map(row => {
                const parsed = parseConsultationContent(row.content ?? '')
                const contact = row.phone ?? row.email ?? row.lineId ?? '未填写'
                const sourceId = parsed.sourceConsultationId
                return (
                  <article
                    key={row.id}
                    className={`rounded-card border bg-surface p-4 shadow-card ${
                      row.status === 'new' ? 'border-warning/70' : 'border-hairline'
                    }`}
                  >
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusPill label={BOOKING_STATUS_LABEL[row.status]} hot={row.status === 'new'} />
                          <span className="text-[11px] text-ash">{formatTime(row.createdAt)}</span>
                        </div>
                        <h2 className="mt-2 text-base font-medium text-ink">
                          {row.name || '未填姓名'} · {contact}
                        </h2>
                      </div>
                      <CopyButton text={contact} label="复制联系方式" />
                    </div>

                    <dl className="grid gap-2 text-[12px] leading-relaxed md:grid-cols-2">
                      <Info label="紧急度" value={parsed.urgency || '未填写'} />
                      <Info label="地域" value={parsed.location || '未填写'} />
                      <Info label="签证" value={parsed.visaType || 'unknown'} />
                      <Info label="自查结果" value={parsed.resultColor || 'unknown'} />
                    </dl>

                    {parsed.additionalInfo && (
                      <div className="mt-3 rounded-[12px] bg-canvas px-3 py-3 text-[12px] leading-relaxed text-slate">
                        <span className="font-medium text-ink">补充：</span>
                        {parsed.additionalInfo}
                      </div>
                    )}

                    {parsed.triggeredItems.length > 0 && (
                      <div className="mt-3 text-[12px] leading-relaxed text-slate">
                        <span className="font-medium text-ink">触发项：</span>
                        {parsed.triggeredItems.join('；')}
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {sourceId && (
                        <LinkButton href={`/c/${sourceId}`} label="打开对应咨询" />
                      )}
                      <LinkButton href={`/admin/consultations${keyParam}`} label="去处理状态" />
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        <section>
          <SectionHeader
            title="AI 咨询跟进池"
            count={aiRows.length}
            note="用户点过需确认，或答案被标记不准确 / 失败 / 超时。"
          />
          {aiRows.length === 0 ? (
            <EmptyState text="暂无需要跟进的 AI 咨询。" />
          ) : (
            <div className="space-y-3">
              {aiRows.map(row => {
                const hot = row.humanConfirmClicked || row.feedbackType === 'human_review'
                const riskHits = Array.isArray(row.riskKeywordHits) ? row.riskKeywordHits : []
                return (
                  <article
                    key={row.id}
                    className={`rounded-card border bg-surface p-4 shadow-card ${
                      hot ? 'border-warning/70' : 'border-hairline'
                    }`}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <StatusPill
                        label={hot ? '需人工确认' : leadReason(row.feedbackType, row.completionStatus)}
                        hot={hot}
                      />
                      <span className="rounded-full bg-accent-2 px-2 py-1 text-[10px] font-medium text-ash">
                        {AI_STATUS_LABEL[row.completionStatus]}
                      </span>
                      <span className="text-[11px] text-ash">{formatTime(row.createdAt)}</span>
                    </div>
                    <h2 className="line-clamp-3 text-sm font-medium leading-relaxed text-ink">
                      {row.userQuestionText}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-ash">
                      {row.feedbackType && (
                        <span className="rounded-full bg-canvas px-2 py-1">
                          反馈：{FEEDBACK_LABEL[row.feedbackType]}
                        </span>
                      )}
                      {row.hasImage && <span className="rounded-full bg-canvas px-2 py-1">图片咨询</span>}
                      {riskHits.length > 0 && (
                        <span className="rounded-full bg-warning/10 px-2 py-1 text-warning">
                          风险词 × {riskHits.length}
                        </span>
                      )}
                      {row.totalLatencyMs && (
                        <span className="rounded-full bg-canvas px-2 py-1">
                          {Math.round(row.totalLatencyMs / 1000)}s
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <LinkButton href={`/c/${row.id}`} label="打开咨询记录" />
                      <CopyButton text={`/c/${row.id}`} label="复制记录链接" />
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </PageShell>
    </main>
  )
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone?: 'hot' | 'warn'
}) {
  const toneClass =
    tone === 'hot' ? 'text-warning' : tone === 'warn' ? 'text-danger' : 'text-ink'
  return (
    <div className="rounded-card border border-hairline bg-surface p-4 shadow-card">
      <p className="text-[11px] text-ash">{label}</p>
      <p className={`numeric mt-2 text-3xl font-light leading-none ${toneClass}`}>{value}</p>
    </div>
  )
}

function SectionHeader({
  title,
  count,
  note,
}: {
  title: string
  count: number
  note: string
}) {
  return (
    <div className="mb-3 flex flex-wrap items-end justify-between gap-2 px-1">
      <div>
        <h2 className="text-base font-medium text-ink">{title}</h2>
        <p className="mt-1 text-[11px] text-ash">{note}</p>
      </div>
      <span className="rounded-full bg-accent-2 px-2.5 py-1 text-[11px] font-medium text-slate">
        {count} 条
      </span>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-card border border-hairline bg-surface px-4 py-8 text-center text-sm text-ash">
      {text}
    </div>
  )
}

function StatusPill({ label, hot }: { label: string; hot?: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
        hot ? 'bg-warning/10 text-warning ring-1 ring-warning/30' : 'bg-accent-2 text-slate'
      }`}
    >
      {label}
    </span>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-ash">{label}：</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  )
}

function LinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-[10px] border border-hairline bg-surface px-3 py-2 text-[12px] font-medium text-ink hover:border-accent"
    >
      {label}
    </Link>
  )
}

function leadReason(
  feedbackType: AiConsultation['feedbackType'],
  completionStatus: AiConsultation['completionStatus'],
) {
  if (feedbackType === 'inaccurate') return '不准确'
  if (completionStatus === 'failed') return '失败'
  if (completionStatus === 'timeout') return '超时'
  return '需跟进'
}

function formatTime(date: Date) {
  return date.toLocaleString('zh-CN', {
    timeZone: 'Asia/Tokyo',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function parseConsultationContent(content: string) {
  const result = {
    visaType: '',
    resultColor: '',
    urgency: '',
    location: '',
    additionalInfo: '',
    sourceConsultationId: '',
    triggeredItems: [] as string[],
  }

  const lines = content.split('\n')
  let mode: 'triggered' | null = null
  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue
    if (line.startsWith('签证：')) {
      result.visaType = line.slice(3)
      mode = null
      continue
    }
    if (line.startsWith('自查结果：')) {
      result.resultColor = line.slice(5)
      mode = null
      continue
    }
    if (line.startsWith('紧急度：')) {
      result.urgency = line.slice(4)
      mode = null
      continue
    }
    if (line.startsWith('地域：')) {
      result.location = line.slice(3)
      mode = null
      continue
    }
    if (line.startsWith('补充：')) {
      result.additionalInfo = line.slice(3)
      mode = null
      continue
    }
    if (line.startsWith('咨询记录：')) {
      result.sourceConsultationId = line.replace('咨询记录：/c/', '').trim()
      mode = null
      continue
    }
    if (line.startsWith('触发项：')) {
      mode = 'triggered'
      continue
    }
    if (mode === 'triggered') {
      result.triggeredItems.push(line.replace(/^·\s*/, ''))
    }
  }
  return result
}
