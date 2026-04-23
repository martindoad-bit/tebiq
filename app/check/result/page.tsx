'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  judge,
  GIJINKOKU_CHECKLIST,
  type AnsweredItem,
  type JudgeResult,
} from '@/lib/check/questions'

const STORAGE_KEY = 'tebiq_check_answers'
const CTA_LINK = '#placeholder'

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

function GreenResult() {
  return (
    <ResultShell
      banner={
        <div className="bg-gradient-to-b from-emerald-700 to-emerald-900 px-4 pt-12 pb-8 text-center">
          <div className="text-5xl mb-3">✓</div>
          <h1 className="text-2xl font-bold mb-2">恭喜，你可以开始准备材料</h1>
          <p className="text-emerald-100 text-sm">
            前置条件全部通过，没有发现明显风险点
          </p>
        </div>
      }
    >
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-6">
        <h2 className="text-amber-400 font-bold mb-2">技人国续签材料清单</h2>
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
          <h3 className="font-bold text-white mb-3 text-base">{group.category}</h3>
          <ul className="space-y-2">
            {group.items.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-200 leading-relaxed">
                <span className="text-emerald-400 flex-shrink-0">□</span>
                <span>{item}</span>
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
          className="block w-full bg-slate-700 hover:bg-slate-600 text-white text-center font-bold py-3 rounded-xl text-sm transition-all"
        >
          联系专业书士确认 →
        </a>
      </div>

      <BottomActions />
    </ResultShell>
  )
}

function YellowResult({ result }: { result: JudgeResult }) {
  return (
    <ResultShell
      banner={
        <div className="bg-gradient-to-b from-amber-600 to-amber-800 px-4 pt-12 pb-8 text-center">
          <div className="text-5xl mb-3">⚠</div>
          <h1 className="text-2xl font-bold mb-2">需要先解决几个问题</h1>
          <p className="text-amber-100 text-sm">
            发现 {result.triggered.length} 项需要注意，建议处理后再申请
          </p>
        </div>
      }
    >
      <div className="space-y-4 mb-6">
        {result.triggered.map(q => (
          <div
            key={q.id}
            className="bg-slate-800 border-l-4 border-amber-400 rounded-r-xl p-4"
          >
            <div className="font-bold text-amber-400 text-sm mb-1">
              黄色提示 · 问题 {q.id}
            </div>
            <div className="text-white font-bold mb-2">{q.triggerLabel}</div>
            <p className="text-slate-300 text-sm leading-relaxed">{q.fixHint}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-950 border border-amber-900 rounded-2xl p-5">
        <p className="text-amber-100 text-sm leading-relaxed mb-4">
          这些问题不是绝对致命，但自行处理容易留下隐患。
          建议在递交申请前请书士过一遍材料和情况说明书。
        </p>
        <a
          href={CTA_LINK}
          className="block w-full bg-amber-400 hover:bg-amber-300 text-slate-900 text-center font-bold py-4 rounded-xl transition-all"
        >
          联系专业书士确认 →
        </a>
      </div>

      <BottomActions />
    </ResultShell>
  )
}

function RedResult({ result }: { result: JudgeResult }) {
  const reds = result.triggered.filter(q => q.severity === 'red')
  const yellows = result.triggered.filter(q => q.severity === 'yellow')

  return (
    <ResultShell
      banner={
        <div className="bg-gradient-to-b from-red-700 to-red-900 px-4 pt-12 pb-8 text-center">
          <div className="text-5xl mb-3">!</div>
          <h1 className="text-2xl font-bold mb-2">检测到高风险项</h1>
          <p className="text-red-100 text-sm">
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

      <div className="space-y-4 mb-6">
        {reds.map(q => (
          <div
            key={q.id}
            className="bg-slate-800 border-l-4 border-red-500 rounded-r-xl p-4"
          >
            <div className="font-bold text-red-400 text-sm mb-1">
              红色风险 · 问题 {q.id}
            </div>
            <div className="text-white font-bold mb-2">{q.triggerLabel}</div>
            <p className="text-slate-300 text-sm leading-relaxed">{q.fixHint}</p>
          </div>
        ))}
        {yellows.map(q => (
          <div
            key={q.id}
            className="bg-slate-800 border-l-4 border-amber-400 rounded-r-xl p-4"
          >
            <div className="font-bold text-amber-400 text-sm mb-1">
              黄色提示 · 问题 {q.id}
            </div>
            <div className="text-white font-bold mb-2">{q.triggerLabel}</div>
            <p className="text-slate-300 text-sm leading-relaxed">{q.fixHint}</p>
          </div>
        ))}
      </div>

      <div className="bg-red-950 border border-red-700 rounded-2xl p-5">
        <p className="text-red-100 text-sm leading-relaxed mb-4 font-bold">
          请务必在提交申请前联系持牌行政书士。
          每多拖一天，处理空间都会变小。
        </p>
        <a
          href={CTA_LINK}
          className="block w-full bg-red-500 hover:bg-red-400 text-white text-center font-bold py-4 rounded-xl transition-all"
        >
          立即联系专业书士 →
        </a>
      </div>

      <BottomActions />
    </ResultShell>
  )
}

function BottomActions() {
  return (
    <div className="mt-8 text-center">
      <a
        href="/check"
        className="text-slate-400 text-sm hover:text-slate-200"
        onClick={() => sessionStorage.removeItem(STORAGE_KEY)}
      >
        重新做一次自查
      </a>
    </div>
  )
}
