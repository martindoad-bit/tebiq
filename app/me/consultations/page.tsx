import { cookies } from 'next/headers'
import Link from 'next/link'
import {
  listSavedAiConsultationsForViewer,
  type AiConsultation,
} from '@/lib/db/queries/aiConsultations'

// /me/consultations — list saved AI consultations for the current viewer
// (Issue #39 / Charter §4).
//
// Viewer is identified by the `tebiq_viewer` cookie set on the entry
// page (no auth in Alpha). If the cookie is missing the page shows an
// empty state with a back-link to /ai-consultation.

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 我保存的咨询',
  robots: { index: false, follow: false },
}

const ALPHA_BANNER =
  'TEBIQ 1.0 Alpha — 以下回答用于整理问题和下一步，不是最终专业判断。'

export default async function MyConsultationsPage() {
  const cookieStore = cookies()
  const viewerId = cookieStore.get('tebiq_viewer')?.value ?? null

  let rows: AiConsultation[] = []
  if (viewerId) {
    rows = await listSavedAiConsultationsForViewer(viewerId, 50)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-4 py-2 text-[12px] flex items-start gap-2 sticky top-0 z-10">
        <span aria-hidden>⚠️</span>
        <span><strong>{ALPHA_BANNER}</strong></span>
      </div>
      <main className="max-w-3xl mx-auto p-6 space-y-4">
        <header className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">我保存的咨询</p>
            <h1 className="text-lg font-semibold mt-0.5">已保存 {rows.length} 条</h1>
          </div>
          <Link href="/ai-consultation" className="text-[12px] text-blue-600 hover:underline">
            ← 开始新咨询
          </Link>
        </header>

        {!viewerId && (
          <section className="rounded border border-slate-200 bg-white p-4 text-sm text-slate-600">
            还没有保存过咨询。
            <Link href="/ai-consultation" className="ml-1 text-blue-600 hover:underline">
              去问一题 →
            </Link>
          </section>
        )}

        {viewerId && rows.length === 0 && (
          <section className="rounded border border-slate-200 bg-white p-4 text-sm text-slate-600">
            还没有保存过咨询。回答页底部「保存到我的咨询」可以收藏。
          </section>
        )}

        {rows.length > 0 && (
          <ul className="space-y-2">
            {rows.map(row => (
              <li key={row.id}>
                <Link
                  href={`/c/${encodeURIComponent(row.id)}`}
                  className="block rounded border border-slate-200 bg-white p-3 hover:border-slate-400"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">
                      {new Date(row.createdAt).toLocaleString('zh-CN')}
                    </span>
                    <span className="text-[10px] text-slate-400">{statusBadge(row.completionStatus)}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-800 line-clamp-2 leading-snug">
                    {row.userQuestionText}
                  </p>
                  {row.hasImage && (
                    <p className="mt-1 text-[10px] text-slate-500">附图片</p>
                  )}
                  {(row.riskKeywordHits ?? []).length > 0 && (
                    <p className="mt-1 text-[10px] text-amber-700">
                      风险关键词：{(row.riskKeywordHits as string[]).join(' · ')}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <footer className="text-[11px] text-slate-500 pt-4 border-t border-slate-200">
          <p>1.0 Alpha — 仅在本浏览器内识别。换浏览器或清空 cookie 后列表会重置。</p>
        </footer>
      </main>
    </div>
  )
}

// Issue #51: 'partial' added. Placeholder label only — CODEXUI Polish
// PR (#52) owns the polished rendering for partial-answer state.
function statusBadge(status: 'streaming' | 'completed' | 'partial' | 'timeout' | 'failed'): string {
  switch (status) {
    case 'streaming': return '进行中'
    case 'completed': return '完成'
    case 'partial':   return '部分'
    case 'timeout':   return '超时'
    case 'failed':    return '失败'
  }
}
