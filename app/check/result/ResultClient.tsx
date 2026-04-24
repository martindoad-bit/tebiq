'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  judge,
  type AnsweredItem,
  type JudgeResult,
  type TriggeredItem,
} from '@/lib/check/questions'
import { buildSummary } from '@/lib/check/summary'
import { GIJINKOKU_MATERIALS, type MaterialDetail } from '@/lib/check/materials'
import { materialDetails } from '@/lib/knowledge/materials'
import MaterialsPackage from './MaterialsPackage'
import SignupBanner from './SignupBanner'
import ShareLinkButton from './ShareLinkButton'

const STORAGE_KEY = 'tebiq_check_answers'
const SAVED_FOR_KEY = 'tebiq_check_saved_for' // 去重：值 = 已保存过的 history JSON
const TRACKED_FOR_KEY = 'tebiq_stats_tracked_for' // 匿名 stats 同款去重
const LS_USER_KEY = 'tebiq_user'
const CONSULTATION_CTX_KEY = 'tebiq_consultation_ctx'

function consultationHref(verdict: 'red' | 'yellow' | 'green'): string {
  return `/consultation?visa=gijinkoku&color=${verdict}`
}
const SHARE_TEXT = '我刚用 TEBIQ 查了续签前置条件，3 分钟就能发现隐藏风险，推荐给在日华人朋友。'

function SummaryCard({
  verdict,
  summary,
}: {
  verdict: JudgeResult['verdict']
  summary: string
}) {
  const borderColor =
    verdict === 'red'
      ? 'border-[#DC2626]'
      : verdict === 'yellow'
        ? 'border-primary'
        : 'border-[#16A34A]'
  return (
    <div className={`bg-card border-l-4 ${borderColor} rounded-r-xl px-5 py-5 mb-4`}>
      <div className="text-body text-xs font-bold mb-2 tracking-wide">你的情况</div>
      <p className="text-title text-base leading-relaxed">{summary}</p>
      <p className="text-muted text-xs mt-4 leading-relaxed">
        本摘要由系统自动组合生成，不构成法律意见。具体方案请咨询持牌行政书士。
      </p>
    </div>
  )
}

function SaveToAccountPrompt({ verdict, count }: { verdict: 'red' | 'yellow' | 'green'; count: number }) {
  const [authState, setAuthState] = useState<'loading' | 'in' | 'out'>('loading')

  useEffect(() => {
    fetch('/api/auth/me', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => setAuthState(d?.user ? 'in' : 'out'))
      .catch(() => setAuthState('out'))
  }, [])

  if (authState === 'loading') return null

  if (authState === 'in') {
    return (
      <div className="no-capture bg-[#DCFCE7] border border-[#16A34A] rounded-2xl px-4 py-3 text-title text-sm font-bold flex items-center gap-2">
        <span>✅</span>
        <span>已保存到你的账号</span>
        <Link href="/my" className="ml-auto text-title hover:text-title underline underline-offset-4">
          查看历史
        </Link>
      </div>
    )
  }

  const next = encodeURIComponent(`/check/result?v=${verdict}&n=${count}`)
  return (
    <div className="no-capture bg-highlight border border-blue-800 rounded-2xl p-4">
      <div className="text-primary font-bold text-sm mb-1">📋 保存这次自查结果</div>
      <p className="text-body text-sm leading-relaxed mb-3">
        登录后下次续签时，可以一键对比变化
      </p>
      <Link
        href={`/login?next=${next}`}
        className="flex items-center justify-center w-full min-h-[48px] bg-primary hover:bg-primary-hover text-title font-bold py-3 rounded-xl text-sm transition-all"
      >
        登录 / 注册
      </Link>
    </div>
  )
}

export default function ResultClient() {
  const router = useRouter()
  const [result, setResult] = useState<JudgeResult | null>(null)
  const [history, setHistory] = useState<AnsweredItem[]>([])

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) {
      router.replace('/check')
      return
    }
    try {
      const parsed = JSON.parse(raw) as AnsweredItem[]
      setHistory(parsed)
      const j = judge(parsed)
      setResult(j)
      // 把咨询上下文写入 sessionStorage，以便 /consultation 页面读取触发项
      try {
        sessionStorage.setItem(
          CONSULTATION_CTX_KEY,
          JSON.stringify({
            visaType: 'gijinkoku',
            resultColor: j.verdict,
            triggeredItems: j.triggered.map(t => t.triggerLabel),
          }),
        )
      } catch {
        /* sessionStorage 满或被禁用 */
      }
      // 全用户匿名 stats（admin 看板）
      trackStats(parsed, j).catch(() => {
        /* 静默 */
      })
      // 登录用户额外保存到账号
      autoSave(parsed).catch(() => {
        /* 未登录或网络错误，静默 */
      })
    } catch {
      router.replace('/check')
    }
  }, [router])

  if (!result) {
    return (
      <main className="min-h-screen bg-base text-title flex items-center justify-center pb-16 md:pb-0">
        <div className="text-muted">载入判断结果中…</div>
      </main>
    )
  }

  const summary = buildSummary(result.verdict, result, history)

  if (result.verdict === 'green') return <GreenResult summary={summary} />
  if (result.verdict === 'yellow') return <YellowResult result={result} summary={summary} />
  return <RedResult result={result} summary={summary} />
}

async function trackStats(history: AnsweredItem[], j: JudgeResult) {
  if (typeof window === 'undefined') return
  const fp = JSON.stringify(history)
  if (sessionStorage.getItem(TRACKED_FOR_KEY) === fp) return
  const res = await fetch('/api/stats/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      verdict: j.verdict,
      triggeredItems: j.triggered.map(t => t.triggerLabel),
    }),
  })
  if (res.ok) sessionStorage.setItem(TRACKED_FOR_KEY, fp)
}

async function autoSave(history: AnsweredItem[]) {
  if (typeof window === 'undefined') return
  // 仅当 localStorage 显示已登录时才尝试（避免无谓的 401 噪音）
  if (!localStorage.getItem(LS_USER_KEY)) return
  // 去重：相同 history 在本会话已保存过就跳过（防 React strict-mode 双触发 + 刷新重复）
  const fingerprint = JSON.stringify(history)
  if (sessionStorage.getItem(SAVED_FOR_KEY) === fingerprint) return
  const res = await fetch('/api/results/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history, visaType: 'gijinkoku' }),
  })
  if (res.ok) sessionStorage.setItem(SAVED_FOR_KEY, fingerprint)
}

// ============ Shell ============

function ResultShell({
  banner,
  captureRef,
  signupBanner,
  children,
}: {
  banner: React.ReactNode
  captureRef: React.RefObject<HTMLDivElement>
  signupBanner?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-base text-title pb-[env(safe-area-inset-bottom)]">
      <TopBar />
      {signupBanner}
      <div ref={captureRef} id="result-capture">
        {banner}
        <div className="max-w-md md:max-w-3xl mx-auto px-4 py-6">{children}</div>
        <CaptureFooter />
      </div>
      <BottomActions />
    </main>
  )
}

function TopBar() {
  return (
    <header className="no-capture sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
      <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页"><img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" /><div><div className="text-xl font-bold text-title leading-none">TEBIQ</div><div className="text-xs text-muted leading-tight mt-0.5">てびき</div></div></Link>
        <Link href="/visa-select" className="text-muted hover:text-body text-sm">
          重新选择签证
        </Link>
      </div>
    </header>
  )
}

function CaptureFooter() {
  const date = new Date()
  const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}.${String(date.getDate()).padStart(2, '0')}`
  return (
    <div className="bg-base px-4 py-5 text-center border-t border-line">
      <div className="max-w-md md:max-w-3xl mx-auto flex items-center justify-between text-xs">
        <div className="text-primary font-bold tracking-wider">TEBIQ</div>
        <div className="text-muted">测试日期 {dateStr}</div>
        <div className="text-muted">tebiq.jp</div>
      </div>
    </div>
  )
}

function BottomActions() {
  return (
    <div className="no-capture mt-8 mb-12 flex flex-col items-center gap-3">
      <Link
        href="/knowledge"
        className="text-primary hover:text-primary-hover text-sm font-bold underline underline-offset-4"
      >
        了解签证基础知识 →
      </Link>
      <Link
        href="/check"
        className="text-muted text-sm hover:text-body underline underline-offset-4"
        onClick={() => {
          sessionStorage.removeItem(STORAGE_KEY)
          sessionStorage.removeItem(SAVED_FOR_KEY)
          sessionStorage.removeItem(TRACKED_FOR_KEY)
        }}
      >
        重新测试
      </Link>
      <Link href="/" className="text-muted text-xs hover:text-body">
        返回首页
      </Link>
    </div>
  )
}

// ============ 保存按钮 ============

function SaveResultButton({
  captureRef,
  verdict,
}: {
  captureRef: React.RefObject<HTMLDivElement>
  verdict: 'red' | 'yellow' | 'green'
}) {
  const [busy, setBusy] = useState(false)

  async function handleSave() {
    if (busy || !captureRef.current) return
    setBusy(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
        ignoreElements: el => el.classList?.contains('no-capture') ?? false,
      })
      const blob = await new Promise<Blob | null>(resolve =>
        canvas.toBlob(resolve, 'image/png'),
      )
      if (!blob) return

      const fileName = `tebiq-result-${Date.now()}.png`
      const file = new File([blob], fileName, { type: 'image/png' })

      // 优先 Web Share API（手机分享）
      if (
        typeof navigator !== 'undefined' &&
        'canShare' in navigator &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({
            files: [file],
            title: 'TEBIQ 续签自查结果',
            text: SHARE_TEXT,
          })
          return
        } catch {
          /* 用户取消分享，走下载兜底 */
        }
      }

      // 下载兜底
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setBusy(false)
    }
  }

  const colorClass =
    verdict === 'red'
      ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
      : verdict === 'yellow'
        ? 'bg-primary hover:bg-primary-hover text-title'
        : 'bg-[#16A34A] hover:bg-[#15803D] text-title'

  return (
    <button
      onClick={handleSave}
      disabled={busy}
      className={`no-capture flex items-center justify-center w-full min-h-[60px] ${colorClass} disabled:opacity-50 font-bold py-4 rounded-xl text-base transition-all`}
    >
      {busy ? '生成图片中…' : '保存结果为图片'}
    </button>
  )
}

// ============ 绿色页 ============

function GreenResult({ summary }: { summary: string }) {
  const captureRef = useRef<HTMLDivElement>(null)

  return (
    <ResultShell
      captureRef={captureRef}
      signupBanner={<SignupBanner verdict="green" count={0} />}
      banner={
        <div className="bg-gradient-to-b from-[#16A34A] to-[#15803D] text-white px-4 pt-12 pb-10 text-center">
          <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            TEBIQ · 续签自查
          </div>
          <div className="text-5xl mb-3">✓</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">恭喜，你可以开始准备材料</h1>
          <p className="text-white/90 text-sm leading-relaxed px-4">
            前置条件全部通过，没有发现明显风险点
          </p>
        </div>
      }
    >
      <SummaryCard verdict="green" summary={summary} />

      <div className="space-y-3 mb-6">
        <SaveResultButton captureRef={captureRef} verdict="green" />
        <ShareLinkButton verdict="green" summary={summary} />
        <SaveToAccountPrompt verdict="green" count={0} />
        <PremiumCallout />
      </div>

      {/* PC 端左右分栏：左结论右清单；移动端纵向 */}
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div>
          <div className="bg-card border border-line rounded-2xl p-5 mb-4">
            <h2 className="text-primary font-bold mb-2 text-base">
              技人国续签材料清单
            </h2>
            <p className="text-body text-sm leading-relaxed">
              以下是续签所需的标准材料。建议提前 2 个月开始准备，
              点击展开每项可查看详细办理信息。
            </p>
          </div>

          <div className="bg-highlight border border-line rounded-2xl p-5">
            <p className="text-body text-sm leading-relaxed mb-4">
              材料齐全后即可前往最近的入管局递交。
              如果在准备过程中遇到任何不确定的地方，可以咨询持牌行政书士。
            </p>
            <Link
              href={consultationHref('green')}
              className="flex items-center justify-center w-full min-h-[56px] bg-slate-700 hover:bg-slate-600 text-title font-bold py-4 rounded-xl text-sm transition-all"
            >
              联系专业书士确认 →
            </Link>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <MaterialsPackage />
          <MaterialChecklist />
        </div>
      </div>
    </ResultShell>
  )
}

function MaterialChecklist() {
  return (
    <>
      {GIJINKOKU_MATERIALS.map(group => (
        <CategoryGroup key={group.category} group={group} />
      ))}
    </>
  )
}

function CollapsibleChecklist() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between bg-card border border-line hover:border-line rounded-2xl px-5 py-4 text-left transition-colors"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0 pr-3">
          <div className="text-primary font-bold text-base leading-snug">
            无论结果如何，以下材料都需要准备
          </div>
          <div className="text-muted text-xs mt-1 leading-relaxed">
            技人国续签所需的标准材料 · 共 {GIJINKOKU_MATERIALS.reduce((s, g) => s + g.materials.length, 0)} 项
          </div>
        </div>
        <Chevron open={open} />
      </button>
      {open && (
        <div className="mt-3">
          <MaterialChecklist />
        </div>
      )}
    </div>
  )
}

function CategoryGroup({
  group,
}: {
  group: { category: string; materials: MaterialDetail[] }
}) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-muted px-1 pb-3 uppercase tracking-wide">
        {group.category}
      </h3>
      <div className="bg-card border border-line rounded-2xl overflow-hidden">
      <ul>
        {group.materials.map(m => (
          <ExpandableMaterial key={m.id} material={m} />
        ))}
      </ul>
      </div>
    </div>
  )
}

function ExpandableMaterial({ material }: { material: MaterialDetail }) {
  const [open, setOpen] = useState(false)
  // 优先从知识库（lib/knowledge/materials.ts）按日文名查 detail，否则回落到 legacy 字段
  const detail = material.nameJa ? materialDetails[material.nameJa] : null
  const where = detail?.where ?? material.where
  const bring = detail?.bring ?? material.whatToBring.join('、')
  const time = detail?.timeRequired ?? material.duration
  const cost = detail?.cost ?? material.cost
  const online =
    detail?.online ??
    (material.online
      ? `是${material.onlineNote ? ` · ${material.onlineNote}` : ''}`
      : '否')
  const tips = detail?.tips ?? material.pitfall

  return (
    <li className="border-t border-line first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-highlight/40 active:bg-highlight transition-colors text-left"
        aria-expanded={open}
      >
        <span
          className={`flex-shrink-0 inline-flex items-center justify-center w-5 h-5 border rounded ${
            open
              ? 'bg-primary border-primary text-white'
              : 'border-line bg-card text-transparent'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="flex-1 text-title text-sm font-bold leading-snug">
          {material.name}
        </span>
        <Chevron open={open} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 space-y-3">
          <Detail label="去哪里开" value={where} />
          <Detail label="需要带" value={bring} />
          <Detail label="多久拿到" value={time} />
          <Detail label="大概费用" value={cost} />
          <Detail label="可在线办理" value={online} />
          <div className="bg-highlight border-l-[3px] border-orange-500 px-3 py-2.5 mt-3 rounded">
            <div className="text-[#92400E] font-bold text-xs mb-1">
              ⚠ 外国人常见踩坑
            </div>
            <p className="text-[#92400E] text-xs leading-relaxed">{tips}</p>
          </div>
        </div>
      )}
    </li>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-xs leading-relaxed">
      <span className="text-muted">{label}：</span>
      <span className="text-body">{value}</span>
    </div>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-muted flex-shrink-0 transition-transform ${
        open ? 'rotate-180' : ''
      }`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ============ Premium 按钮预留（任务 7） ============

function PremiumCallout() {
  return (
    <button
      type="button"
      disabled
      className="w-full min-h-[56px] bg-card border-2 border-dashed border-line text-muted rounded-xl text-sm cursor-not-allowed"
      title="即将推出"
    >
      升级到完整服务（即将推出）
    </button>
  )
}

// ============ 黄色页 ============

function YellowResult({ result, summary }: { result: JudgeResult; summary: string }) {
  const captureRef = useRef<HTMLDivElement>(null)
  const selfFix = result.triggered.filter(t => t.selfFix)
  const needPro = result.triggered.filter(t => !t.selfFix)

  return (
    <ResultShell
      captureRef={captureRef}
      signupBanner={<SignupBanner verdict="yellow" count={result.triggered.length} />}
      banner={
        <div className="bg-gradient-to-b from-primary to-primary-hover text-white px-4 pt-12 pb-10 text-center">
          <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            TEBIQ · 续签自查
          </div>
          <div className="text-5xl mb-3">⚠</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">需要先解决几个问题</h1>
          <p className="text-white/90 text-sm leading-relaxed">
            发现 {result.triggered.length} 项需要注意，建议处理后再申请
          </p>
        </div>
      }
    >
      <SummaryCard verdict="yellow" summary={summary} />

      <div className="space-y-3 mb-6">
        <SaveResultButton captureRef={captureRef} verdict="yellow" />
        <ShareLinkButton verdict="yellow" summary={summary} />
        <SaveToAccountPrompt verdict="yellow" count={result.triggered.length} />
      </div>

      {selfFix.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-[#16A34A] text-sm mb-3 px-1">
            ✓ 可以自己处理（{selfFix.length} 项）
          </h2>
          <div className="space-y-3">
            {selfFix.map(t => (
              <TriggerCard key={t.id} item={t} accentColor="amber" />
            ))}
          </div>
        </div>
      )}

      {needPro.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-primary text-sm mb-3 px-1">
            ⚖ 建议咨询书士（{needPro.length} 项）
          </h2>
          <div className="space-y-3">
            {needPro.map(t => (
              <TriggerCard key={t.id} item={t} accentColor="amber" />
            ))}
          </div>
        </div>
      )}

      <div className="bg-highlight border border-primary rounded-2xl p-5 mt-6">
        <p className="text-body text-sm leading-relaxed mb-4">
          这些问题不是绝对致命，但自行处理容易留下隐患。
          建议在递交申请前请书士过一遍材料和情况说明书。
        </p>
        <Link
          href={consultationHref('yellow')}
          className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-title font-bold py-4 rounded-xl transition-all"
        >
          联系专业书士确认 →
        </Link>
      </div>

      <MaterialsPackage />
      <CollapsibleChecklist />
    </ResultShell>
  )
}

// ============ 红色页 ============

function RedResult({ result, summary }: { result: JudgeResult; summary: string }) {
  const captureRef = useRef<HTMLDivElement>(null)
  const reds = result.triggered.filter(t => t.severity === 'red')
  const yellows = result.triggered.filter(t => t.severity === 'yellow')

  return (
    <ResultShell
      captureRef={captureRef}
      signupBanner={<SignupBanner verdict="red" count={reds.length} />}
      banner={
        <div className="bg-gradient-to-b from-[#DC2626] to-[#B91C1C] text-white px-4 pt-12 pb-10 text-center">
          <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            TEBIQ · 续签自查
          </div>
          <div className="text-5xl mb-3">!</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">检测到高风险项</h1>
          <p className="text-white/90 text-sm leading-relaxed">
            发现 {reds.length} 项严重风险，请勿自行递签
          </p>
        </div>
      }
    >
      <div className="bg-[#E6EEF5] border-l-4 border-[#1E3A5F] p-4 rounded-lg mb-4">
        <div className="text-[#1E3A5F] font-medium mb-1">💙 首先，深呼吸</div>
        <div className="text-sm text-[#374151] leading-relaxed">
          你通过自查发现了问题，这已经比大多数人好了——
          大多数人是在申请被拒之后才发现问题，而你现在还有时间处理。
          <br />
          <br />
          接下来，我们一步一步来。
        </div>
      </div>

      <SummaryCard verdict="red" summary={summary} />

      <div className="space-y-3 mb-6">
        <SaveResultButton captureRef={captureRef} verdict="red" />
        <ShareLinkButton verdict="red" summary={summary} />
        <SaveToAccountPrompt
          verdict="red"
          count={result.triggered.filter(t => t.severity === 'red').length}
        />
      </div>

      <div className="bg-[#FEE2E2] border border-[#DC2626] rounded-2xl p-5 mb-6">
        <p className="text-title text-sm leading-relaxed">
          下列任何一项都可能直接导致续签被拒，甚至影响今后在留资格。
          强烈建议先与持牌行政书士确认应对方案，再决定如何提交申请。
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {reds.map(t => (
          <TriggerCard key={t.id} item={t} accentColor="red" />
        ))}
        {yellows.map(t => (
          <TriggerCard key={t.id} item={t} accentColor="amber" />
        ))}
      </div>

      <div className="bg-[#FEE2E2] border border-[#DC2626] rounded-2xl p-5">
        <p className="text-title text-sm leading-relaxed mb-4 font-bold">
          请务必在提交申请前联系持牌行政书士。
          每多拖一天，处理空间都会变小。
        </p>
        <Link
          href={consultationHref('red')}
          className="flex items-center justify-center w-full min-h-[60px] bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold py-4 rounded-xl transition-all"
        >
          立即联系专业书士 →
        </Link>
      </div>

      <CollapsibleChecklist />
    </ResultShell>
  )
}

// ============ 共用触发卡 ============

function TriggerCard({
  item,
  accentColor,
}: {
  item: TriggeredItem
  accentColor: 'red' | 'amber'
}) {
  const borderClass = accentColor === 'red' ? 'border-[#DC2626]' : 'border-primary'
  const titleClass = accentColor === 'red' ? 'text-[#DC2626]' : 'text-primary'

  return (
    <div className={`bg-card border-l-4 ${borderClass} rounded-r-xl p-4`}>
      <div className="font-bold text-title text-base leading-snug mb-2">
        {item.triggerLabel}
      </div>
      <div className={`${titleClass} text-xs font-bold mb-2`}>书士建议</div>
      <p className="text-body text-sm leading-relaxed">{item.fixHint}</p>
    </div>
  )
}
