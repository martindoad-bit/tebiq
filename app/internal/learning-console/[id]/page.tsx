import { notFound } from 'next/navigation'
import Link from 'next/link'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { getAiConsultationById } from '@/lib/db/queries/aiConsultations'

// /internal/learning-console/[id] — full-field detail view (Issue #41 §6.C).
//
// Displays every Charter §6 field for the row. Read-only (Pack §7 — no
// annotation interactions; that's eval-console territory). Same env gate
// as the list page.

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Learning Console · 详情 · TEBIQ Internal',
  robots: { index: false, follow: false },
}

interface PageProps { params: { id: string } }

export default async function LearningConsoleDetailPage({ params }: PageProps) {
  if (!isEvalLabEnabled()) {
    notFound()
  }
  const id = params.id?.trim()
  if (!id) notFound()
  const row = await getAiConsultationById(id)
  if (!row) notFound()

  const answer = row.finalAnswerText ?? row.aiAnswerText ?? ''
  const riskHits = (row.riskKeywordHits ?? []) as string[]
  const factAnchors = (row.factAnchorIds ?? []) as string[]
  const redactions = (row.forbiddenRedactions ?? []) as string[]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-4xl mx-auto p-6 space-y-4">
        <header className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Learning Console · 详情</p>
            <h1 className="text-base font-semibold mt-0.5">{row.id}</h1>
            <p className="mt-1 text-[11px] text-slate-500">
              创建时间：{new Date(row.createdAt).toLocaleString('zh-CN')}
            </p>
          </div>
          <Link
            href="/internal/learning-console"
            className="text-[12px] text-blue-600 hover:underline"
          >
            ← 返回列表
          </Link>
        </header>

        <section className="rounded border border-slate-200 bg-white p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">用户问题</p>
          <p className="mt-1 text-[13px] text-slate-800 leading-relaxed whitespace-pre-wrap">
            {row.userQuestionText}
          </p>
        </section>

        {row.hasImage && (
          <section className="rounded border border-slate-200 bg-white p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">图片摘要</p>
            <p className="mt-1 text-[12px] text-slate-700 leading-relaxed whitespace-pre-wrap">
              {row.imageSummary ?? '(空)'}
            </p>
            {row.imageStorageRef && (
              <p className="mt-2 text-[10px] text-slate-400 font-mono">
                ref: {row.imageStorageRef}
              </p>
            )}
            <p className="mt-2 text-[10px] text-slate-400">
              原图未保存，仅保留识别摘要。
            </p>
          </section>
        )}

        {riskHits.length > 0 && (
          <section className="rounded border border-amber-300 bg-amber-50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-amber-800">命中高风险关键词</p>
            <p className="mt-1 text-[12px] text-amber-900">{riskHits.join(' · ')}</p>
          </section>
        )}

        <section className="rounded border border-slate-200 bg-white p-3">
          <div className="flex items-baseline gap-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">回答</p>
            <span className="text-[10px] text-slate-400">
              {statusLabel(row.completionStatus)}
            </span>
          </div>
          {row.completionStatus === 'timeout' && (
            <p className="mt-2 text-[12px] text-amber-800 italic">
              超时（90s 阈值）。{row.timeoutReason ? `原因：${row.timeoutReason}` : ''}
              {row.partialAnswerSaved ? '（已保留 partial answer）' : ''}
            </p>
          )}
          {row.completionStatus === 'failed' && (
            <p className="mt-2 text-[12px] text-rose-800 italic">
              失败。{row.timeoutReason ? `原因：${row.timeoutReason}` : ''}
            </p>
          )}
          {answer ? (
            <article className="mt-2 text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap">
              {answer}
            </article>
          ) : (
            <p className="mt-2 text-[11px] text-slate-400 italic">(无回答内容)</p>
          )}
        </section>

        <section className="rounded border border-slate-200 bg-white p-3 text-[11px] text-slate-700">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">字段全览</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
            <Field k="question_id" v={row.id} mono />
            <Field k="viewer_id" v={row.viewerId ?? '(无 cookie)'} mono />
            <Field k="model" v={row.model} mono />
            <Field k="prompt_version" v={row.promptVersion} mono />
            <Field k="completion_status" v={row.completionStatus} />
            <Field k="partial_answer_saved" v={String(row.partialAnswerSaved)} />
            <Field k="timeout_reason" v={row.timeoutReason ?? '—'} />
            <Field k="has_image" v={String(row.hasImage)} />
            <Field k="risk_keyword_hits" v={riskHits.length > 0 ? riskHits.join(', ') : '[]'} />
            <Field k="fact_anchor_ids" v={factAnchors.length > 0 ? factAnchors.join(', ') : '[]'} />
            <Field k="forbidden_redactions" v={redactions.length > 0 ? redactions.join(', ') : '[]'} />
            <Field k="feedback_type" v={row.feedbackType ?? '—'} />
            <Field k="saved_question" v={String(row.savedQuestion)} />
            <Field k="human_confirm_clicked" v={String(row.humanConfirmClicked)} />
            <Field k="follow_up_count" v={row.followUpCount.toString()} />
            <Field k="first_token_latency_ms" v={row.firstTokenLatencyMs?.toString() ?? '—'} />
            <Field k="total_latency_ms" v={row.totalLatencyMs?.toString() ?? '—'} />
            <Field
              k="stream_started_at"
              v={row.streamStartedAt ? new Date(row.streamStartedAt).toISOString() : '—'}
              mono
            />
            <Field
              k="first_token_at"
              v={row.firstTokenAt ? new Date(row.firstTokenAt).toISOString() : '—'}
              mono
            />
            <Field
              k="completed_at"
              v={row.completedAt ? new Date(row.completedAt).toISOString() : '—'}
              mono
            />
            <Field k="schema_version" v={row.schemaVersion} mono />
            <Field k="created_at" v={new Date(row.createdAt).toISOString()} mono />
            <Field k="updated_at" v={new Date(row.updatedAt).toISOString()} mono />
          </dl>
        </section>
      </main>
    </div>
  )
}

function Field({ k, v, mono = false }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex gap-2">
      <dt className="text-slate-400 shrink-0 w-44">{k}</dt>
      <dd className={mono ? 'font-mono text-slate-700 break-all' : 'text-slate-700 break-words'}>{v}</dd>
    </div>
  )
}

function statusLabel(status: 'streaming' | 'completed' | 'timeout' | 'failed'): string {
  switch (status) {
    case 'streaming': return '进行中'
    case 'completed': return '完成'
    case 'timeout':   return '超时'
    case 'failed':    return '失败'
  }
}
