import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAiConsultationById } from '@/lib/db/queries/aiConsultations'

// /c/[id] — read-only view of a past AI consultation (Issue #39 / Charter §4).
//
// This page is for revisiting / sharing a completed consultation. Live
// streaming happens on /ai-consultation directly; once the row exists
// in DB the user can navigate here for a stable URL.

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 咨询记录 (Alpha)',
  robots: { index: false, follow: false },
}

const ALPHA_BANNER =
  'TEBIQ 1.0 Alpha — 以下回答用于整理问题和下一步，不是最终专业判断。'

interface PageProps { params: { id: string } }

export default async function ConsultationDetailPage({ params }: PageProps) {
  const id = params.id?.trim()
  if (!id) notFound()
  const row = await getAiConsultationById(id)
  if (!row) notFound()

  const answer = row.finalAnswerText ?? row.aiAnswerText ?? ''
  const status = row.completionStatus
  const riskHits = (row.riskKeywordHits ?? []) as string[]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-4 py-2 text-[12px] flex items-start gap-2 sticky top-0 z-10">
        <span aria-hidden>⚠️</span>
        <span><strong>{ALPHA_BANNER}</strong></span>
      </div>
      <main className="max-w-3xl mx-auto p-6 space-y-4">
        <header className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">咨询记录</p>
            <h1 className="text-lg font-semibold mt-0.5">
              {new Date(row.createdAt).toLocaleString('zh-CN')}
            </h1>
          </div>
          <Link href="/ai-consultation" className="text-[12px] text-blue-600 hover:underline">
            ← 再问一题
          </Link>
        </header>

        <section className="rounded border border-slate-200 bg-white p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">你的问题</p>
          <p className="mt-1 text-sm text-slate-800 leading-relaxed">{row.userQuestionText}</p>
        </section>

        {row.hasImage && row.imageSummary && (
          <section className="rounded border border-slate-200 bg-white p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">图片摘要（仅供咨询参考）</p>
            <p className="mt-1 text-[12px] text-slate-700 leading-relaxed">{row.imageSummary}</p>
            <p className="mt-1 text-[10px] text-slate-400">原图未保存；只保留识别摘要供这条咨询参考。</p>
          </section>
        )}

        {riskHits.length > 0 && (
          <div className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-[12px] text-amber-900 leading-relaxed">
            这个问题可能涉及在留风险，建议不要只靠 AI 回答做最终决定。
            <span className="block mt-1 text-[10px] text-amber-700">
              关键词：{riskHits.join(' · ')}
            </span>
          </div>
        )}

        <section className="rounded border border-slate-200 bg-white p-4">
          <div className="flex items-baseline gap-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">回答</p>
            <span className="text-[10px] text-slate-400">{statusLabel(status)}</span>
          </div>
          {status === 'timeout' && (
            <p className="mt-2 text-[12px] text-amber-800 italic">
              [降级回答] 当前模型响应超时，不是你的输入问题。你可以稍后重试；如果已识别出相关事项，也可以先保存继续处理。
            </p>
          )}
          {status === 'failed' && (
            <p className="mt-2 text-[12px] text-rose-800 italic">
              这次回答生成失败。{row.timeoutReason ? `（原因：${row.timeoutReason}）` : ''}
              你可以稍后重试或保存这个问题继续处理。
            </p>
          )}
          {answer && (
            <article className="mt-2 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
              {answer}
            </article>
          )}
          {!answer && status === 'streaming' && (
            <p className="mt-2 text-[12px] text-slate-500">
              这条咨询仍在生成。回到「再问一题」可以发起新会话。
            </p>
          )}
        </section>

        <section className="text-[11px] text-slate-500 grid grid-cols-2 gap-x-4 gap-y-1 pt-2">
          <span>状态：{statusLabel(status)}</span>
          {row.firstTokenLatencyMs != null && <span>first_token: {row.firstTokenLatencyMs}ms</span>}
          {row.totalLatencyMs != null && <span>total_latency: {row.totalLatencyMs}ms</span>}
          {row.feedbackType && <span>反馈：{feedbackLabel(row.feedbackType)}</span>}
          {row.savedQuestion && <span>已保存</span>}
          {row.humanConfirmClicked && <span>已点击「想找人工确认」</span>}
        </section>

        <footer className="text-[11px] text-slate-500 pt-4 border-t border-slate-200">
          <p>涉及具体期限、手续、个案审查时，建议向行政書士或入管确认。</p>
          <p className="mt-1">
            <Link href="/me/consultations" className="text-blue-600 hover:underline">
              查看我所有已保存的咨询 →
            </Link>
          </p>
        </footer>
      </main>
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

function feedbackLabel(t: 'helpful' | 'inaccurate' | 'add_context' | 'human_review' | 'saved'): string {
  switch (t) {
    case 'helpful':      return '有帮助'
    case 'inaccurate':   return '不准确'
    case 'add_context':  return '想补充情况'
    case 'human_review': return '想找人工确认'
    case 'saved':        return '已保存'
  }
}
