'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  Download,
  Gift,
  LockKeyhole,
  RotateCcw,
} from 'lucide-react'
import {
  judge,
  type AnsweredItem,
  type JudgeResult,
} from '@/lib/check/questions/gijinkoku'
import { buildSummary } from '@/lib/check/summary'
import MaterialsPackage from './MaterialsPackage'
import SignupBanner from './SignupBanner'
import ShareLinkButton from './ShareLinkButton'
import RiskList from './components/RiskList'
import MaterialChecklist, { CollapsibleChecklist } from './components/MaterialChecklist'
import CTABlock from './components/CTABlock'
import BreathCard from './components/BreathCard'
import Logo from '@/app/_components/v5/Logo'
import RelatedKnowledge from '@/app/_components/v5/RelatedKnowledge'

const STORAGE_KEY = 'tebiq_check_answers'
const SAVED_FOR_KEY = 'tebiq_check_saved_for' // 去重：值 = 已保存过的 history JSON
const TRACKED_FOR_KEY = 'tebiq_stats_tracked_for' // 匿名 stats 同款去重
const CONSULTATION_CTX_KEY = 'tebiq_consultation_ctx'

const SHARE_TEXT = '我刚用 TEBIQ 查了续签前置条件，3 分钟就能发现隐藏准备事项，推荐给在日华人朋友。'

function SummaryCard({
  verdict,
  summary,
}: {
  verdict: JudgeResult['verdict']
  summary: string
}) {
  const tone =
    verdict === 'red'
      ? 'border-warning/55 bg-surface'
      : verdict === 'yellow'
        ? 'border-hairline bg-surface'
        : 'border-hairline bg-surface'
  return (
    <div className={`mb-4 rounded-card border px-4 py-4 ${tone}`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="text-[12px] font-medium text-ink">判断摘要</div>
        <div className="rounded-chip border border-hairline bg-paper px-2 py-0.5 text-[10px] font-normal text-ash">
          非法律意见
        </div>
      </div>
      <p className="text-[14px] leading-[1.7] text-ink">{summary}</p>
      <p className="mt-4 border-t border-hairline pt-3 text-[11.5px] leading-relaxed text-slate/70">
        TEBIQ 根据你的回答整理准备事项。最终提交策略请以原材料、官方说明或专家意见为准。
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
      <div className="no-capture flex items-center gap-2 rounded-card border border-hairline bg-surface px-4 py-3 text-[12px] font-medium text-ink">
        <CheckCircle2 size={16} strokeWidth={1.5} className="text-ink" />
        <span>已保存到你的账号</span>
        <Link href="/my/archive" className="ml-auto text-ink underline underline-offset-4">
          查看历史
        </Link>
      </div>
    )
  }

  const next = encodeURIComponent(`/check/result?v=${verdict}&n=${count}`)
  return (
    <div className="no-capture rounded-card border border-hairline bg-surface p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
          <LockKeyhole size={17} strokeWidth={1.5} />
        </span>
        <div>
          <div className="text-[13px] font-medium leading-snug text-ink">
            保存这次自查结果
          </div>
          <p className="mt-1 text-[11px] leading-[1.55] text-ash">
            登录后下次续签时，可以一键对比变化。
          </p>
        </div>
      </div>
      <Link
        href={`/login?next=${next}`}
        className="focus-ring mt-3 flex min-h-[46px] w-full items-center justify-center rounded-btn bg-ink px-4 py-3 text-[13px] font-medium text-white"
      >
        登录 / 注册
      </Link>
    </div>
  )
}

function InviteRewardCallout() {
  return (
    <Link
      href="/invite"
      className="no-capture flex items-start gap-3 rounded-card border border-hairline bg-surface px-4 py-3 transition-colors hover:bg-paper"
    >
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
        <Gift size={17} strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-medium leading-snug text-ink">
          邀请朋友一起做自查
        </span>
        <span className="mt-1 block text-[11px] leading-[1.55] text-ash">
          朋友注册后，双方各得 7 天 basic 会员体验。
        </span>
      </span>
    </Link>
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
      <main className="flex min-h-screen items-center justify-center bg-canvas pb-16 text-ink md:pb-0">
        <div className="rounded-card border border-hairline bg-surface px-5 py-4 text-[12px] text-ash">
          载入判断结果中…
        </div>
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
  relatedTags = ['续签', '在留期間更新', '材料'],
  children,
}: {
  banner: React.ReactNode
  captureRef: React.RefObject<HTMLDivElement>
  signupBanner?: React.ReactNode
  relatedTags?: string[]
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-canvas pb-[env(safe-area-inset-bottom)] text-ink">
      <TopBar />
      {signupBanner}
      <div ref={captureRef} id="result-capture">
        {banner}
        <div className="max-w-md md:max-w-3xl mx-auto px-4 py-6">{children}</div>
        <div className="mx-auto max-w-md px-4 md:max-w-3xl">
          <RelatedKnowledge tags={relatedTags} />
        </div>
        <CaptureFooter />
      </div>
      <BottomActions />
    </main>
  )
}

function TopBar() {
  return (
    <header className="no-capture sticky top-0 z-10 border-b border-hairline bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-md items-center justify-between px-4 md:max-w-3xl">
        <Link href="/" aria-label="TEBIQ 首页">
          <Logo size="sm" />
        </Link>
        <Link href="/check/select" className="text-[12px] text-ash hover:text-ink">
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
    <div className="border-t border-hairline bg-canvas px-4 py-5 text-center">
      <div className="mx-auto flex max-w-md items-center justify-between text-[10.5px] text-ash md:max-w-3xl">
        <div className="font-medium text-ink tracking-[0.03em]">TEBIQ</div>
        <div>测试日期 {dateStr}</div>
        <div>tebiq.jp</div>
      </div>
    </div>
  )
}

function BottomActions() {
  return (
    <div className="no-capture mt-8 mb-12 flex flex-col items-center gap-3">
      <Link
        href="/knowledge"
        className="text-[13px] font-medium text-ink underline underline-offset-4"
      >
        了解签证基础知识
      </Link>
      <Link
        href="/check"
        className="inline-flex items-center gap-1.5 text-[12px] text-ash hover:text-ink"
        onClick={() => {
          sessionStorage.removeItem(STORAGE_KEY)
          sessionStorage.removeItem(SAVED_FOR_KEY)
          sessionStorage.removeItem(TRACKED_FOR_KEY)
        }}
      >
        <RotateCcw size={13} strokeWidth={1.55} />
        重新测试
      </Link>
      <Link href="/" className="text-[11px] text-ash hover:text-ink">
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
            title: 'TEBIQ 续签材料准备检查结果',
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
      ? 'bg-ink text-white hover:bg-primary-hover'
      : verdict === 'yellow'
        ? 'bg-ink text-white hover:bg-primary-hover'
        : 'bg-ink text-white hover:bg-primary-hover'

  return (
    <button
      onClick={handleSave}
      disabled={busy}
      className={`no-capture focus-ring flex min-h-[48px] w-full items-center justify-center gap-2 rounded-btn px-4 py-3 text-[13px] font-medium transition-colors disabled:opacity-50 ${colorClass}`}
    >
      <Download size={15} strokeWidth={1.6} />
      {busy ? '处理中...' : '保存结果为图片'}
    </button>
  )
}

// ============ Premium 按钮预留（任务 7） ============

function PremiumCallout() {
  return (
    <button
      type="button"
      disabled
      className="min-h-[48px] w-full cursor-not-allowed rounded-btn border border-dashed border-hairline bg-surface px-4 py-3 text-[13px] text-ash"
      title="即将推出"
    >
      升级到完整服务（即将推出）
    </button>
  )
}

function ResultHero({
  verdict,
  title,
  description,
}: {
  verdict: 'green' | 'yellow' | 'red'
  title: string
  description: string
}) {
  const meta = {
    green: {
      icon: CheckCircle2,
      tone: 'border-hairline bg-surface text-ink',
    },
    yellow: {
      icon: AlertTriangle,
      tone: 'border-hairline bg-surface text-ink',
    },
    red: {
      icon: CircleAlert,
      tone: 'border-warning/55 bg-surface text-warning',
    },
  }[verdict]
  const Icon = meta.icon
  return (
    <section className={`mx-4 mt-4 rounded-card border px-4 py-5 text-center ${meta.tone}`}>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[15px] bg-surface/85">
        <Icon size={26} strokeWidth={1.6} />
      </div>
      <div className="mt-3 text-[11px] font-medium leading-none text-ash">
        TEBIQ · 续签材料准备检查
      </div>
      <h1 className="mt-2 text-[22px] font-medium leading-snug text-ink">{title}</h1>
      <p className="mx-auto mt-2 max-w-[300px] text-[13px] leading-relaxed text-slate/74">
        {description}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-left">
        <ResultMeta label="依据" value="你的回答" />
        <ResultMeta label="用途" value="准备参考" />
        <ResultMeta label="下一步" value="看行动项" />
      </div>
    </section>
  )
}

function ResultMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-hairline bg-surface/72 px-2 py-2">
      <div className="text-[9.5px] leading-none text-ash">{label}</div>
      <div className="mt-1 text-[11px] font-medium leading-none text-ink">{value}</div>
    </div>
  )
}

// ============ 绿色页 ============

function GreenResult({ summary }: { summary: string }) {
  const captureRef = useRef<HTMLDivElement>(null)

  return (
    <ResultShell
      captureRef={captureRef}
      relatedTags={['续签', '材料', '在留期間更新']}
      signupBanner={<SignupBanner verdict="green" count={0} />}
      banner={
        <ResultHero
          verdict="green"
          title="可以开始准备材料"
          description="前置条件全部通过，没有发现明显准备事项。"
        />
      }
    >
      <BreathCard verdict="green" />
      <SummaryCard verdict="green" summary={summary} />

      <div className="space-y-3 mb-6">
        <SaveResultButton captureRef={captureRef} verdict="green" />
        <ShareLinkButton verdict="green" summary={summary} />
        <InviteRewardCallout />
        <SaveToAccountPrompt verdict="green" count={0} />
        <PremiumCallout />
      </div>

      {/* PC 端左右分栏：左结论右清单；移动端纵向 */}
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div>
          <div className="mb-4 rounded-card border border-hairline bg-surface p-4">
            <h2 className="mb-2 text-[13px] font-medium text-ink">
              技人国续签材料清单
            </h2>
            <p className="text-[12px] leading-relaxed text-ash">
              以下是续签所需的标准材料。建议提前 2 个月开始准备，
              点击展开每项可查看详细办理信息。
            </p>
          </div>

          <CTABlock
            verdict="green"
            description="材料齐全后即可前往最近的入管局递交。如果在准备过程中遇到任何不确定的地方，可以咨询专家。"
          />
        </div>

        <div className="mt-4 md:mt-0">
          <MaterialsPackage />
          <MaterialChecklist />
        </div>
      </div>
    </ResultShell>
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
      relatedTags={[
        '续签',
        '在留期間更新',
        ...result.triggered.map(item => item.triggerLabel),
      ]}
      signupBanner={<SignupBanner verdict="yellow" count={result.triggered.length} />}
      banner={
        <ResultHero
          verdict="yellow"
          title="需要先解决几个问题"
          description={`发现 ${result.triggered.length} 项需要注意，建议处理后再申请。`}
        />
      }
    >
      <BreathCard verdict="yellow" />
      <SummaryCard verdict="yellow" summary={summary} />

      <div className="space-y-3 mb-6">
        <SaveResultButton captureRef={captureRef} verdict="yellow" />
        <ShareLinkButton verdict="yellow" summary={summary} />
        <InviteRewardCallout />
        <SaveToAccountPrompt verdict="yellow" count={result.triggered.length} />
      </div>

      <RiskList
        items={selfFix}
        accentColor="amber"
        sortBySeverity={false}
        heading={{ text: `可以自己处理（${selfFix.length} 项）`, tone: 'green' }}
      />

      <RiskList
        items={needPro}
        accentColor="amber"
        sortBySeverity={false}
        heading={{ text: `建议咨询专家（${needPro.length} 项）`, tone: 'amber' }}
      />

      <CTABlock
        verdict="yellow"
        description="这些问题不是绝对致命，但自行处理容易留下隐患。建议在递交申请前请专家过一遍材料和情况说明书。"
      />

      <MaterialsPackage />
      <CollapsibleChecklist />
    </ResultShell>
  )
}

// ============ 红色页 ============

function RedResult({ result, summary }: { result: JudgeResult; summary: string }) {
  const captureRef = useRef<HTMLDivElement>(null)
  const reds = result.triggered.filter(t => t.severity === 'red')

  return (
    <ResultShell
      captureRef={captureRef}
      relatedTags={[
        '续签',
        '在留期間更新',
        ...result.triggered.map(item => item.triggerLabel),
      ]}
      signupBanner={<SignupBanner verdict="red" count={reds.length} />}
      banner={
        <ResultHero
          verdict="red"
          title="检测到高准备事项"
          description={`发现 ${reds.length} 项待确认事项，请先确认处理方案。`}
        />
      }
    >
      <BreathCard verdict="red" />

      <SummaryCard verdict="red" summary={summary} />

      <div className="space-y-3 mb-6">
        <SaveResultButton captureRef={captureRef} verdict="red" />
        <ShareLinkButton verdict="red" summary={summary} />
        <InviteRewardCallout />
        <SaveToAccountPrompt verdict="red" count={reds.length} />
      </div>

      <div className="mb-6 rounded-card border border-warning/55 bg-surface p-4">
        <p className="text-[13px] leading-relaxed text-ink">
          下列任何一项都可能直接导致续签被拒，甚至影响今后在留资格。
          强烈建议先与专家确认应对方案，再决定如何提交申请。
        </p>
      </div>

      <RiskList items={result.triggered} />

      <CTABlock
        verdict="red"
        description="请务必在提交申请前咨询专家。每多拖一天，处理空间都会变小。"
        emphasizeDescription
      />

      <CollapsibleChecklist />
    </ResultShell>
  )
}
