'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  judge,
  GIJINKOKU_CHECKLIST,
  type AnsweredItem,
  type JudgeResult,
  type TriggeredItem,
} from '@/lib/check/questions'

const STORAGE_KEY = 'tebiq_check_answers'
const CTA_LINK = '#placeholder'
const SHARE_TEXT = '我刚用 TEBIQ 查了续签前置条件，3 分钟就能发现隐藏风险，推荐给在日华人朋友。'

export default function CheckResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<JudgeResult | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) {
      router.replace('/check')
      return
    }
    try {
      const history = JSON.parse(raw) as AnsweredItem[]
      setResult(judge(history))
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

  if (result.verdict === 'green') return <GreenResult />
  if (result.verdict === 'yellow') return <YellowResult result={result} />
  return <RedResult result={result} />
}

function ResultShell({
  banner,
  children,
}: {
  banner: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {banner}
      <div className="max-w-md mx-auto px-4 py-8">{children}</div>
    </main>
  )
}

// === 绿色页 ===
function GreenResult() {
  return (
    <ResultShell
      banner={
        <div className="bg-gradient-to-b from-emerald-700 to-emerald-900 px-4 pt-12 pb-10 text-center">
          <div className="inline-block bg-amber-400 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-4">
            TEBIQ · 续签自查
          </div>
          <div className="text-5xl mb-3">✓</div>
          <h1 className="text-2xl font-bold mb-2">恭喜，你可以开始准备材料</h1>
          <p className="text-emerald-100 text-sm leading-relaxed px-4">
            前置条件全部通过，没有发现明显风险点
          </p>
        </div>
      }
    >
      <ShareButton verdict="green" />

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-6 mt-6">
        <h2 className="text-amber-400 font-bold mb-2 text-base">技人国续签材料清单</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          以下是技术·人文知识·国际业务（技人国）续签所需的标准材料。
          建议提前 2 个月开始准备，部分文件需要去市役所或公司开具。
        </p>
      </div>

      {GIJINKOKU_CHECKLIST.map(group => (
        <div
          key={group.category}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-4"
        >
          <h3 className="font-bold text-white mb-4 text-base">{group.category}</h3>
          <ul className="space-y-4">
            {group.items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-emerald-400 flex-shrink-0 mt-0.5">□</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-bold leading-snug mb-1">
                    {item.name}
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed">
                    <span className="text-slate-500">在哪拿：</span>
                    {item.where}
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed">
                    <span className="text-slate-500">注意：</span>
                    {item.note}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="bg-blue-950 border border-blue-900 rounded-2xl p-5 mt-6">
        <p className="text-slate-200 text-sm leading-relaxed mb-4">
          材料齐全后即可前往最近的入管局递交。
          如果在准备过程中遇到任何不确定的地方，可以咨询持牌行政书士。
        </p>
        <a
          href={CTA_LINK}
          className="block w-full min-h-[56px] bg-slate-700 hover:bg-slate-600 text-white text-center font-bold py-4 rounded-xl text-sm transition-all"
        >
          联系专业书士确认 →
        </a>
      </div>

      <BottomActions />
    </ResultShell>
  )
}

// === 黄色页 ===
function YellowResult({ result }: { result: JudgeResult }) {
  const selfFix = result.triggered.filter(t => t.selfFix)
  const needPro = result.triggered.filter(t => !t.selfFix)

  return (
    <ResultShell
      banner={
        <div className="bg-gradient-to-b from-amber-600 to-amber-800 px-4 pt-12 pb-10 text-center">
          <div className="text-5xl mb-3">⚠</div>
          <h1 className="text-2xl font-bold mb-2">需要先解决几个问题</h1>
          <p className="text-amber-100 text-sm leading-relaxed">
            发现 {result.triggered.length} 项需要注意，建议处理后再申请
          </p>
        </div>
      }
    >
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

      <BottomActions />
    </ResultShell>
  )
}

// === 红色页 ===
function RedResult({ result }: { result: JudgeResult }) {
  const reds = result.triggered.filter(t => t.severity === 'red')
  const yellows = result.triggered.filter(t => t.severity === 'yellow')

  return (
    <ResultShell
      banner={
        <div className="bg-gradient-to-b from-red-700 to-red-900 px-4 pt-12 pb-10 text-center">
          <div className="text-5xl mb-3">!</div>
          <h1 className="text-2xl font-bold mb-2">检测到高风险项</h1>
          <p className="text-red-100 text-sm leading-relaxed">
            发现 {reds.length} 项严重风险，请勿自行递签
          </p>
        </div>
      }
    >
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

      <BottomActions />
    </ResultShell>
  )
}

// === 单个触发卡片 ===
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
    <div
      className={`bg-slate-800 border-l-4 ${borderClass} rounded-r-xl p-4`}
    >
      <div className="font-bold text-white text-base leading-snug mb-2">
        {item.triggerLabel}
      </div>
      <div className={`${titleClass} text-xs font-bold mb-2`}>书士建议</div>
      <p className="text-slate-300 text-sm leading-relaxed">{item.fixHint}</p>
    </div>
  )
}

// === 分享按钮 ===
function ShareButton({ verdict }: { verdict: 'green' | 'yellow' | 'red' }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.origin : ''
    const shareData = {
      title: 'TEBIQ · 续签风险自查',
      text: SHARE_TEXT,
      url,
    }
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // 用户取消或失败，走 fallback
      }
    }
    // Fallback: 复制到剪贴板
    try {
      await navigator.clipboard.writeText(`${SHARE_TEXT} ${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('复制此链接分享', `${SHARE_TEXT} ${url}`)
    }
  }

  // 仅绿色页突出显示分享，其他页轻量显示
  if (verdict === 'green') {
    return (
      <button
        onClick={handleShare}
        className="w-full min-h-[60px] bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-4 rounded-xl text-base transition-all flex items-center justify-center"
      >
        {copied ? '✓ 链接已复制' : '分享给在日的朋友 →'}
      </button>
    )
  }
  return null
}

// === 底部重测 + 分享 ===
function BottomActions() {
  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <a
        href="/check"
        className="text-slate-400 text-sm hover:text-slate-200 underline underline-offset-4"
        onClick={() => sessionStorage.removeItem(STORAGE_KEY)}
      >
        重新测试
      </a>
      <a href="/" className="text-slate-500 text-xs hover:text-slate-300">
        返回首页
      </a>
    </div>
  )
}
