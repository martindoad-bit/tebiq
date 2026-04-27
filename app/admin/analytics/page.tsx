/**
 * /admin/analytics — Block 6 KPI 看板
 *
 * 显示 24h / 7d 两个时间窗口的：
 *  - 拍照漏斗（attempt → success / fail / quota）
 *  - quiz 漏斗（start → visa_selected → completed）
 *  - 转化（subscribe checkout / invite generated / login）
 *  - 错误分布（warn / error / critical）+ 最近 10 条 error_logs 行
 *
 * 全部 server component；admin 鉴权同其他 /admin 子页（searchParams.key）。
 */
import { notFound } from 'next/navigation'
import AdminNav from '@/app/admin/_components/AdminNav'
import {
  conversionFunnel,
  errorTotals,
  photoFunnel,
  quizFunnel,
  recentErrors,
} from '@/lib/db/queries/analytics'

export const dynamic = 'force-dynamic'

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) notFound()
  const adminKey = sp.key ?? ''

  // 24h + 7d 窗口对比 — 给创始人最快的体感
  const [
    photo24, photo7d,
    quiz24, quiz7d,
    conv24, conv7d,
    err24, err7d,
    recent,
  ] = await Promise.all([
    photoFunnel(24), photoFunnel(24 * 7),
    quizFunnel(24), quizFunnel(24 * 7),
    conversionFunnel(24), conversionFunnel(24 * 7),
    errorTotals(24), errorTotals(24 * 7),
    recentErrors(10),
  ])

  return (
    <div className="min-h-screen bg-bg text-title">
      <AdminNav adminKey={adminKey} />
      <main className="max-w-md md:max-w-6xl mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-title">KPI 看板</h1>
          <p className="mt-1 text-xs text-muted">
            24 小时 / 7 天滚动窗口。事件来自 events 表，错误来自 error_logs 表。
            生存线参考：100 付费 / 月、月营收 ¥100,000。
          </p>
        </header>

        <FunnelCard
          title="拍照即懂漏斗"
          rows={[
            { label: '上传尝试', a: photo24.attempt, b: photo7d.attempt },
            { label: '识别成功', a: photo24.success, b: photo7d.success },
            { label: '识别失败', a: photo24.fail, b: photo7d.fail, danger: true },
            { label: '配额已用完', a: photo24.quotaExceeded, b: photo7d.quotaExceeded, hint: '推订阅触发点' },
          ]}
        />

        <FunnelCard
          title="自查漏斗"
          rows={[
            { label: '进入 /check', a: quiz24.start, b: quiz7d.start },
            { label: '选了签证', a: quiz24.visa, b: quiz7d.visa },
            { label: '完成自查', a: quiz24.completed, b: quiz7d.completed },
          ]}
        />

        <FunnelCard
          title="转化"
          rows={[
            { label: '登录成功', a: conv24.loginSuccess, b: conv7d.loginSuccess },
            { label: '订阅 checkout 启动', a: conv24.checkoutStarted, b: conv7d.checkoutStarted },
            { label: '订阅 checkout 完成', a: conv24.checkoutCompleted, b: conv7d.checkoutCompleted, hint: '生存线 KPI' },
            { label: '邀请链接生成', a: conv24.inviteGenerated, b: conv7d.inviteGenerated },
          ]}
        />

        <ErrorCard buckets24={err24} buckets7d={err7d} recent={recent} />
      </main>
    </div>
  )
}

interface FunnelRow {
  label: string
  a: number
  b: number
  danger?: boolean
  hint?: string
}

function FunnelCard({ title, rows }: { title: string; rows: FunnelRow[] }) {
  return (
    <section className="mb-5 rounded-2xl border border-line bg-card p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold text-title">{title}</h2>
        <div className="flex gap-4 text-[10px] font-bold text-muted">
          <span>24h</span>
          <span>7d</span>
        </div>
      </div>
      <div className="mt-3 divide-y divide-line">
        {rows.map(r => (
          <div
            key={r.label}
            className="flex items-baseline justify-between py-2.5 first:pt-1"
          >
            <div className="min-w-0">
              <div className={`text-sm ${r.danger ? 'text-[#92400E]' : 'text-title'}`}>
                {r.label}
              </div>
              {r.hint && <div className="mt-0.5 text-[10px] text-muted">{r.hint}</div>}
            </div>
            <div className="flex gap-4 text-sm font-bold">
              <span className={`min-w-[36px] text-right ${r.a > 0 ? 'text-title' : 'text-muted'}`}>
                {r.a}
              </span>
              <span className={`min-w-[36px] text-right ${r.b > 0 ? 'text-title' : 'text-muted'}`}>
                {r.b}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ErrorCard({
  buckets24,
  buckets7d,
  recent,
}: {
  buckets24: { severity: string; n: number }[]
  buckets7d: { severity: string; n: number }[]
  recent: Array<{ id: string; code: string; message: string; severity: string; path: string | null; createdAt: Date }>
}) {
  const total24 = buckets24.reduce((s, b) => s + b.n, 0)
  const total7d = buckets7d.reduce((s, b) => s + b.n, 0)
  const critical24 = buckets24.find(b => b.severity === 'critical')?.n ?? 0
  return (
    <section className="mb-5 rounded-2xl border border-line bg-card p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold text-title">错误日志</h2>
        <div className="flex gap-4 text-[10px] font-bold text-muted">
          <span>24h</span>
          <span>7d</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <ErrorBox label="总错误" a={total24} b={total7d} />
        <ErrorBox
          label="error 级"
          a={buckets24.find(b => b.severity === 'error')?.n ?? 0}
          b={buckets7d.find(b => b.severity === 'error')?.n ?? 0}
        />
        <ErrorBox
          label="critical 级"
          a={critical24}
          b={buckets7d.find(b => b.severity === 'critical')?.n ?? 0}
          tone={critical24 > 0 ? 'danger' : 'normal'}
        />
      </div>

      {critical24 > 0 && (
        <p className="mt-3 rounded-xl bg-[#FDECEA] px-3 py-2 text-xs text-[#92400E]">
          ⚠ 最近 24 小时内有 {critical24} 条 critical 级错误，先看下面最新一条。
        </p>
      )}

      <div className="mt-4 space-y-2">
        <div className="text-[10px] font-bold uppercase text-muted">最近 10 条</div>
        {recent.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line px-3 py-4 text-center text-xs text-muted">
            暂无错误日志（events 表写入正常）
          </div>
        ) : (
          recent.map(e => (
            <div key={e.id} className="rounded-xl border border-line bg-bg px-3 py-2 text-xs">
              <div className="flex items-baseline justify-between">
                <div className="font-bold text-title truncate flex-1">
                  <span
                    className={`mr-2 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      e.severity === 'critical'
                        ? 'bg-[#FDECEA] text-[#92400E]'
                        : e.severity === 'error'
                          ? 'bg-highlight text-title'
                          : 'bg-line text-muted'
                    }`}
                  >
                    {e.severity}
                  </span>
                  {e.code}
                </div>
                <div className="ml-2 flex-shrink-0 text-[10px] text-muted">
                  {e.createdAt.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
                </div>
              </div>
              <div className="mt-1 break-all text-muted">{e.message}</div>
              {e.path && <div className="mt-1 text-[10px] text-muted">{e.path}</div>}
            </div>
          ))
        )}
      </div>
    </section>
  )
}

function ErrorBox({
  label,
  a,
  b,
  tone = 'normal',
}: {
  label: string
  a: number
  b: number
  tone?: 'normal' | 'danger'
}) {
  return (
    <div className="rounded-xl border border-line bg-bg p-3">
      <div className="text-[10px] font-bold uppercase text-muted">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${tone === 'danger' ? 'text-[#92400E]' : 'text-title'}`}>
          {a}
        </span>
        <span className="text-[10px] text-muted">/ {b}</span>
      </div>
    </div>
  )
}
