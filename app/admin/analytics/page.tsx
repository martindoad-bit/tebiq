/**
 * /admin/analytics — KPI 看板
 *
 * Block 6 基线 + Block 7 增强（T11）：
 *  - SVG sparkline（24h 每小时 / 7d 每天事件数，手画 path）
 *  - 转化率卡片（distinct memberId：登录 → 自查 → 拍照 → 订阅）
 *  - 实时事件流（最近 50 条，server component + revalidate=60）
 *  - 错误按 path 聚合（TOP 8）
 *
 * 全部 server component；admin 鉴权同其他 /admin 子页（searchParams.key）。
 */
import { notFound } from 'next/navigation'
import AdminNav from '@/app/admin/_components/AdminNav'
import {
  conversionFunnel,
  errorTotals,
  errorsByPath,
  eventsPerDay,
  eventsPerHour,
  memberConversionFunnel,
  photoFunnel,
  quizFunnel,
  recentErrors,
  recentEvents,
} from '@/lib/db/queries/analytics'

export const dynamic = 'force-dynamic'
// 60 秒粒度自动刷新（admin 看板，非高频）
export const revalidate = 60

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const sp = await searchParams
  if (process.env.ADMIN_KEY && sp.key !== process.env.ADMIN_KEY) notFound()
  const adminKey = sp.key ?? ''

  const [
    photo24, photo7d,
    quiz24, quiz7d,
    conv24, conv7d,
    err24, err7d,
    recent,
    hourly, daily,
    convMembers24, convMembers7d,
    errPath24,
    eventStream,
  ] = await Promise.all([
    photoFunnel(24), photoFunnel(24 * 7),
    quizFunnel(24), quizFunnel(24 * 7),
    conversionFunnel(24), conversionFunnel(24 * 7),
    errorTotals(24), errorTotals(24 * 7),
    recentErrors(10),
    eventsPerHour(), eventsPerDay(),
    memberConversionFunnel(24), memberConversionFunnel(24 * 7),
    errorsByPath(24, 8),
    recentEvents(50),
  ])

  return (
    <div className="min-h-screen bg-bg text-title">
      <AdminNav adminKey={adminKey} />
      <main className="max-w-md md:max-w-6xl mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-title">KPI 看板</h1>
          <p className="mt-1 text-xs text-muted">
            24 小时 / 7 天滚动窗口。事件来自 events 表，错误来自 error_logs 表。
            生存线参考：100 付费 / 月、月营收 ¥100,000。看板每 60 秒自动刷新。
          </p>
        </header>

        <div className="mb-5 grid gap-4 md:grid-cols-2">
          <SparklineCard
            title="近 24 小时事件量"
            data={fillHourly(hourly)}
            unit="小时"
          />
          <SparklineCard
            title="近 7 天事件量"
            data={fillDaily(daily)}
            unit="天"
          />
        </div>

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
          title="转化（事件计数）"
          rows={[
            { label: '登录成功', a: conv24.loginSuccess, b: conv7d.loginSuccess },
            { label: '订阅 checkout 启动', a: conv24.checkoutStarted, b: conv7d.checkoutStarted },
            { label: '订阅 checkout 完成', a: conv24.checkoutCompleted, b: conv7d.checkoutCompleted, hint: '生存线 KPI' },
            { label: '邀请链接生成', a: conv24.inviteGenerated, b: conv7d.inviteGenerated },
          ]}
        />

        <ConversionRateCard
          title="用户路径转化（distinct member · 24h vs 7d）"
          a={convMembers24}
          b={convMembers7d}
        />

        <ErrorCard
          buckets24={err24}
          buckets7d={err7d}
          recent={recent}
          byPath={errPath24}
        />

        <EventStreamCard rows={eventStream} />
      </main>
    </div>
  )
}

// ────────────────────────── helpers ──────────────────────────

interface SeriesPoint {
  t: string
  n: number
}

/** 把稀疏数据点（缺失的小时没有行）补成 24 个连续点。 */
function fillHourly(rows: SeriesPoint[]): SeriesPoint[] {
  const map = new Map(rows.map(r => [new Date(r.t).getTime(), r.n]))
  const out: SeriesPoint[] = []
  const now = new Date()
  // 从 23h 之前开始，按小时桶
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours()) - 23 * 3600 * 1000,
  )
  for (let i = 0; i < 24; i++) {
    const t = new Date(start.getTime() + i * 3600 * 1000)
    out.push({ t: t.toISOString(), n: map.get(t.getTime()) ?? 0 })
  }
  return out
}

function fillDaily(rows: SeriesPoint[]): SeriesPoint[] {
  const map = new Map(rows.map(r => [r.t.slice(0, 10), r.n]))
  const out: SeriesPoint[] = []
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - i * 86400000,
    )
    const key = d.toISOString().slice(0, 10)
    out.push({ t: key, n: map.get(key) ?? 0 })
  }
  return out
}

// ────────────────────────── components ──────────────────────────

function SparklineCard({
  title,
  data,
  unit,
}: {
  title: string
  data: SeriesPoint[]
  unit: '小时' | '天'
}) {
  const total = data.reduce((s, p) => s + p.n, 0)
  const max = Math.max(1, ...data.map(p => p.n))
  // SVG viewport 320 x 80
  const W = 320
  const H = 80
  const stepX = data.length > 1 ? W / (data.length - 1) : W
  const points = data.map((p, i) => {
    const x = i * stepX
    const y = H - (p.n / max) * (H - 8) - 4
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const path = points.length ? `M ${points.join(' L ')}` : ''
  const area = points.length
    ? `M 0,${H} L ${points.join(' L ')} L ${W},${H} Z`
    : ''

  return (
    <section className="rounded-2xl border border-line bg-card p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold text-title">{title}</h2>
        <span className="text-[10px] text-muted">总计 {total}</span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 w-full"
        role="img"
        aria-label={`${title} 折线图`}
        preserveAspectRatio="none"
      >
        <path d={area} fill="rgba(246,177,51,0.18)" />
        <path d={path} stroke="#233B37" strokeWidth="1.5" fill="none" />
        {data.map((p, i) => {
          const x = i * stepX
          const y = H - (p.n / max) * (H - 8) - 4
          return (
            <circle key={i} cx={x} cy={y} r="2" fill="#233B37" />
          )
        })}
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-muted">
        <span>最旧 ({data.length} {unit}前)</span>
        <span>最新</span>
      </div>
    </section>
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

function pct(num: number, den: number): string {
  if (den === 0) return '—'
  return `${((num / den) * 100).toFixed(1)}%`
}

function ConversionRateCard({
  title,
  a,
  b,
}: {
  title: string
  a: ReturnType<typeof memberConversionFunnel> extends Promise<infer R> ? R : never
  b: ReturnType<typeof memberConversionFunnel> extends Promise<infer R> ? R : never
}) {
  // 注意：分母用 signedIn，从「登录后」开始算
  const stages: Array<{ label: string; aN: number; bN: number; aR: string; bR: string }> = [
    { label: '登录成功', aN: a.signedIn, bN: b.signedIn, aR: '100%', bR: '100%' },
    {
      label: '完成自查',
      aN: a.quizCompleted,
      bN: b.quizCompleted,
      aR: pct(a.quizCompleted, a.signedIn),
      bR: pct(b.quizCompleted, b.signedIn),
    },
    {
      label: '尝试拍照',
      aN: a.photoAttempted,
      bN: b.photoAttempted,
      aR: pct(a.photoAttempted, a.signedIn),
      bR: pct(b.photoAttempted, b.signedIn),
    },
    {
      label: '订阅 checkout 启动',
      aN: a.checkoutStarted,
      bN: b.checkoutStarted,
      aR: pct(a.checkoutStarted, a.signedIn),
      bR: pct(b.checkoutStarted, b.signedIn),
    },
    {
      label: '订阅完成',
      aN: a.checkoutCompleted,
      bN: b.checkoutCompleted,
      aR: pct(a.checkoutCompleted, a.signedIn),
      bR: pct(b.checkoutCompleted, b.signedIn),
    },
  ]
  return (
    <section className="mb-5 rounded-2xl border border-line bg-card p-4">
      <h2 className="mb-3 text-sm font-bold text-title">{title}</h2>
      <div className="divide-y divide-line">
        {stages.map(s => (
          <div key={s.label} className="grid grid-cols-3 items-baseline gap-2 py-2.5 first:pt-1">
            <div className="text-sm text-title">{s.label}</div>
            <div className="text-right text-xs">
              <span className="text-title font-bold">{s.aN}</span>
              <span className="ml-1 text-[10px] text-muted">({s.aR})</span>
            </div>
            <div className="text-right text-xs">
              <span className="text-title font-bold">{s.bN}</span>
              <span className="ml-1 text-[10px] text-muted">({s.bR})</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-muted">
        分母：登录成功的 distinct member 数。匿名访问不计入。
      </p>
    </section>
  )
}

function ErrorCard({
  buckets24,
  buckets7d,
  recent,
  byPath,
}: {
  buckets24: { severity: string; n: number }[]
  buckets7d: { severity: string; n: number }[]
  recent: Array<{ id: string; code: string; message: string; severity: string; path: string | null; createdAt: Date }>
  byPath: Array<{ path: string; n: number }>
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

      {byPath.length > 0 && (
        <div className="mt-4">
          <div className="text-[10px] font-bold uppercase text-muted">24h TOP 路径</div>
          <div className="mt-1 space-y-1">
            {byPath.map(p => (
              <div
                key={p.path}
                className="flex items-baseline justify-between rounded-lg bg-bg px-2.5 py-1.5"
              >
                <code className="truncate text-[11px] text-title">{p.path}</code>
                <span className="ml-2 flex-shrink-0 text-[11px] font-bold text-title">{p.n}</span>
              </div>
            ))}
          </div>
        </div>
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

function EventStreamCard({
  rows,
}: {
  rows: Array<{
    id: string
    eventName: string
    memberId: string | null
    payload: Record<string, unknown> | null
    createdAt: Date
  }>
}) {
  function summarizePayload(p: Record<string, unknown> | null): string {
    if (!p) return ''
    const entries = Object.entries(p).slice(0, 3)
    if (entries.length === 0) return ''
    return entries
      .map(([k, v]) => `${k}=${typeof v === 'object' ? JSON.stringify(v).slice(0, 30) : String(v).slice(0, 30)}`)
      .join(' · ')
  }
  return (
    <section className="mb-5 rounded-2xl border border-line bg-card p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold text-title">实时事件流</h2>
        <span className="text-[10px] text-muted">最近 50 条</span>
      </div>
      {rows.length === 0 ? (
        <div className="mt-3 rounded-xl border border-dashed border-line px-3 py-4 text-center text-xs text-muted">
          暂无事件
        </div>
      ) : (
        <div className="mt-3 max-h-[420px] overflow-y-auto">
          <table className="w-full text-left text-[11px]">
            <thead className="text-[10px] uppercase text-muted">
              <tr>
                <th className="py-1.5 font-bold">时间</th>
                <th className="py-1.5 font-bold">事件</th>
                <th className="py-1.5 font-bold">payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map(r => (
                <tr key={r.id}>
                  <td className="py-1.5 align-top text-muted whitespace-nowrap pr-2">
                    {r.createdAt.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo' })}
                  </td>
                  <td className="py-1.5 align-top pr-2">
                    <code className="text-title">{r.eventName}</code>
                  </td>
                  <td className="py-1.5 align-top text-muted break-all">
                    {summarizePayload(r.payload)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
