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

const STORAGE_KEY = 'tebiq_check_answers'
const SAVED_FOR_KEY = 'tebiq_check_saved_for' // 去重：值 = 已保存过的 history JSON
const TRACKED_FOR_KEY = 'tebiq_stats_tracked_for' // 匿名 stats 同款去重
const LS_USER_KEY = 'tebiq_user'
const CTA_LINK = '#placeholder'
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
      ? 'border-red-500'
      : verdict === 'yellow'
        ? 'border-amber-400'
        : 'border-emerald-500'
  return (
    <div className={`bg-slate-800/70 border-l-4 ${borderColor} rounded-r-xl px-5 py-4 mb-4`}>
      <div className="text-slate-400 text-xs font-bold mb-2 tracking-wide">你的情况</div>
      <p className="text-slate-100 text-sm leading-relaxed">{summary}</p>
      <p className="text-slate-600 text-[10px] mt-3 leading-relaxed">
        本摘要由系统自动组合生成，不构成法律意见。具体方案请咨询持牌行政书士。
      </p>
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
      <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-slate-400">载入判断结果中…</div>
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
  children,
}: {
  banner: React.ReactNode
  captureRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <TopBar />
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
    <header className="no-capture sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-wider text-amber-400 text-lg">
          TEBIQ
        </Link>
        <Link href="/visa-select" className="text-slate-400 hover:text-slate-200 text-sm">
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
    <div className="bg-slate-950 px-4 py-5 text-center border-t border-slate-800">
      <div className="max-w-md md:max-w-3xl mx-auto flex items-center justify-between text-xs">
        <div className="text-amber-400 font-bold tracking-wider">TEBIQ</div>
        <div className="text-slate-500">测试日期 {dateStr}</div>
        <div className="text-slate-500">tebiq.jp</div>
      </div>
    </div>
  )
}

function BottomActions() {
  return (
    <div className="no-capture mt-8 mb-12 flex flex-col items-center gap-3">
      <Link
        href="/knowledge"
        className="text-amber-400 hover:text-amber-300 text-sm font-bold underline underline-offset-4"
      >
        了解签证基础知识 →
      </Link>
      <Link
        href="/check"
        className="text-slate-400 text-sm hover:text-slate-200 underline underline-offset-4"
        onClick={() => {
          sessionStorage.removeItem(STORAGE_KEY)
          sessionStorage.removeItem(SAVED_FOR_KEY)
          sessionStorage.removeItem(TRACKED_FOR_KEY)
        }}
      >
        重新测试
      </Link>
      <Link href="/" className="text-slate-500 text-xs hover:text-slate-300">
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
      ? 'bg-red-500 hover:bg-red-400 text-white'
      : verdict === 'yellow'
        ? 'bg-amber-400 hover:bg-amber-300 text-slate-900'
        : 'bg-emerald-500 hover:bg-emerald-400 text-white'

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
      banner={
        <div className="bg-gradient-to-b from-emerald-700 to-emerald-900 px-4 pt-12 pb-10 text-center">
          <div className="inline-block bg-amber-400 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4">
            TEBIQ · 续签自查
          </div>
          <div className="text-5xl mb-3">✓</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">恭喜，你可以开始准备材料</h1>
          <p className="text-emerald-100 text-sm leading-relaxed px-4">
            前置条件全部通过，没有发现明显风险点
          </p>
        </div>
      }
    >
      <SummaryCard verdict="green" summary={summary} />

      <div className="space-y-3 mb-6">
        <SaveResultButton captureRef={captureRef} verdict="green" />
        <PremiumCallout />
      </div>

      {/* PC 端左右分栏：左结论右清单；移动端纵向 */}
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-4">
            <h2 className="text-amber-400 font-bold mb-2 text-base">
              技人国续签材料清单
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              以下是续签所需的标准材料。建议提前 2 个月开始准备，
              点击展开每项可查看详细办理信息。
            </p>
          </div>

          <div className="bg-blue-950 border border-blue-900 rounded-2xl p-5">
            <p className="text-slate-200 text-sm leading-relaxed mb-4">
              材料齐全后即可前往最近的入管局递交。
              如果在准备过程中遇到任何不确定的地方，可以咨询持牌行政书士。
            </p>
            <a
              href={CTA_LINK}
              className="flex items-center justify-center w-full min-h-[56px] bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-xl text-sm transition-all"
            >
              联系专业书士确认 →
            </a>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
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
        className="w-full flex items-center justify-between bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-2xl px-5 py-4 text-left transition-colors"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0 pr-3">
          <div className="text-amber-400 font-bold text-base leading-snug">
            无论结果如何，以下材料都需要准备
          </div>
          <div className="text-slate-400 text-xs mt-1 leading-relaxed">
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
    <div className="bg-slate-800 border border-slate-700 rounded-2xl mb-4 overflow-hidden">
      <h3 className="font-bold text-white text-base px-5 pt-5 pb-3">
        {group.category}
      </h3>
      <ul>
        {group.materials.map(m => (
          <ExpandableMaterial key={m.id} material={m} />
        ))}
      </ul>
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
    <li className="border-t border-slate-700/60 first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-700/30 active:bg-slate-700/50 transition-colors text-left"
        aria-expanded={open}
      >
        <span className="text-emerald-400 flex-shrink-0">□</span>
        <span className="flex-1 text-white text-sm font-bold leading-snug">
          {material.name}
        </span>
        <Chevron open={open} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 space-y-2.5">
          <Detail label="去哪里开" value={where} />
          <Detail label="需要带" value={bring} />
          <Detail label="多久拿到" value={time} />
          <Detail label="大概费用" value={cost} />
          <Detail label="可在线办理" value={online} />
          <div className="bg-amber-950/60 border-l-2 border-amber-400 px-3 py-2 mt-3 rounded">
            <div className="text-amber-400 font-bold text-xs mb-1">
              ⚠ 外国人常见踩坑
            </div>
            <p className="text-amber-100 text-xs leading-relaxed">{tips}</p>
          </div>
        </div>
      )}
    </li>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-xs leading-relaxed">
      <span className="text-slate-500">{label}：</span>
      <span className="text-slate-200">{value}</span>
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
      className={`text-slate-400 flex-shrink-0 transition-transform ${
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
      className="w-full min-h-[56px] bg-slate-800 border-2 border-dashed border-slate-700 text-slate-500 rounded-xl text-sm cursor-not-allowed"
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
      banner={
        <div className="bg-gradient-to-b from-amber-600 to-amber-800 px-4 pt-12 pb-10 text-center">
          <div className="inline-block bg-slate-900 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
            TEBIQ · 续签自查
          </div>
          <div className="text-5xl mb-3">⚠</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">需要先解决几个问题</h1>
          <p className="text-amber-100 text-sm leading-relaxed">
            发现 {result.triggered.length} 项需要注意，建议处理后再申请
          </p>
        </div>
      }
    >
      <SummaryCard verdict="yellow" summary={summary} />

      <div className="mb-6">
        <SaveResultButton captureRef={captureRef} verdict="yellow" />
      </div>

      {selfFix.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-emerald-400 text-sm mb-3 px-1">
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
          <h2 className="font-bold text-amber-400 text-sm mb-3 px-1">
            ⚖ 建议咨询书士（{needPro.length} 项）
          </h2>
          <div className="space-y-3">
            {needPro.map(t => (
              <TriggerCard key={t.id} item={t} accentColor="amber" />
            ))}
          </div>
        </div>
      )}

      <div className="bg-amber-950 border border-amber-900 rounded-2xl p-5 mt-6">
        <p className="text-amber-100 text-sm leading-relaxed mb-4">
          这些问题不是绝对致命，但自行处理容易留下隐患。
          建议在递交申请前请书士过一遍材料和情况说明书。
        </p>
        <a
          href={CTA_LINK}
          className="flex items-center justify-center w-full min-h-[60px] bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-4 rounded-xl transition-all"
        >
          联系专业书士确认 →
        </a>
      </div>

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
      banner={
        <div className="bg-gradient-to-b from-red-700 to-red-900 px-4 pt-12 pb-10 text-center">
          <div className="inline-block bg-slate-900 text-red-300 text-xs font-bold px-3 py-1 rounded-full mb-4">
            TEBIQ · 续签自查
          </div>
          <div className="text-5xl mb-3">!</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">检测到高风险项</h1>
          <p className="text-red-100 text-sm leading-relaxed">
            发现 {reds.length} 项严重风险，请勿自行递签
          </p>
        </div>
      }
    >
      <SummaryCard verdict="red" summary={summary} />

      <div className="mb-6">
        <SaveResultButton captureRef={captureRef} verdict="red" />
      </div>

      <div className="bg-red-950 border border-red-900 rounded-2xl p-5 mb-6">
        <p className="text-red-100 text-sm leading-relaxed">
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

      <div className="bg-red-950 border border-red-700 rounded-2xl p-5">
        <p className="text-red-100 text-sm leading-relaxed mb-4 font-bold">
          请务必在提交申请前联系持牌行政书士。
          每多拖一天，处理空间都会变小。
        </p>
        <a
          href={CTA_LINK}
          className="flex items-center justify-center w-full min-h-[60px] bg-red-500 hover:bg-red-400 text-white font-bold py-4 rounded-xl transition-all"
        >
          立即联系专业书士 →
        </a>
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
  const borderClass = accentColor === 'red' ? 'border-red-500' : 'border-amber-400'
  const titleClass = accentColor === 'red' ? 'text-red-400' : 'text-amber-400'

  return (
    <div className={`bg-slate-800 border-l-4 ${borderClass} rounded-r-xl p-4`}>
      <div className="font-bold text-white text-base leading-snug mb-2">
        {item.triggerLabel}
      </div>
      <div className={`${titleClass} text-xs font-bold mb-2`}>书士建议</div>
      <p className="text-slate-300 text-sm leading-relaxed">{item.fixHint}</p>
    </div>
  )
}
