import Link from 'next/link'

export default function HaigushaPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-wider text-amber-400 text-lg">
            TEBIQ
          </Link>
          <Link href="/visa-select" className="text-slate-400 hover:text-slate-200 text-sm">
            ← 选择其他签证
          </Link>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="text-amber-400">配偶者・家族滞在</span>
            ビザの续签
          </h1>

          <div className="bg-blue-600 text-white rounded-2xl p-5 mb-8 leading-relaxed text-sm md:text-base">
            配偶者签证的续签条件与技人国不同，主要取决于
            <span className="font-bold">婚姻关系状态</span>
          </div>

          <SituationCard
            tone="green"
            title="情况 1：婚姻关系正常维持"
            sub="通常情况下可以顺利续签"
          >
            <p className="text-slate-300 text-sm leading-relaxed mb-2">
              需要准备：婚姻证明、配偶的在留证明、共同生活证明（水电账单等）。
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              建议提前 2 个月开始准备材料。
            </p>
            <DraftMark />
          </SituationCard>

          <SituationCard
            tone="amber"
            title="情况 2：有离婚可能或婚姻关系不稳定"
            sub="续签最大的风险点"
          >
            <p className="text-slate-300 text-sm leading-relaxed mb-2">
              即使婚姻关系还未正式结束，入管局也会审查实质性的婚姻关系是否存在。
            </p>
            <p className="text-amber-300 text-sm font-bold leading-relaxed">
              强烈建议在情况发生变化前立刻咨询书士。
            </p>
            <DraftMark />
          </SituationCard>

          <SituationCard
            tone="red"
            title="情况 3：配偶去世或已离婚"
            sub="基础条件不复存在"
          >
            <p className="text-slate-300 text-sm leading-relaxed mb-2">
              配偶者签证的基础不复存在，需要在 6 个月内申请在留资格变更。
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-2">
              可以变更为：定住者、特定活动等。
            </p>
            <p className="text-red-300 text-sm font-bold leading-relaxed">
              必须立刻联系书士，时间紧迫。
            </p>
            <DraftMark />
          </SituationCard>

          <a
            href="#placeholder"
            className="flex items-center justify-center w-full min-h-[60px] bg-red-500 hover:bg-red-400 text-white font-bold py-4 rounded-xl text-base transition-all mt-6"
          >
            联系书士咨询配偶者签证 →
          </a>

          <p className="text-center text-slate-600 text-xs mt-8 leading-relaxed">
            本页面内容不构成法律意见，具体情况请咨询持牌行政书士。
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 pb-[env(safe-area-inset-bottom)]">
            <Link
              href="/knowledge"
              className="text-amber-400 hover:text-amber-300 text-sm font-bold underline underline-offset-4"
            >
              了解签证基础知识 →
            </Link>
            <Link href="/" className="text-slate-500 text-xs hover:text-slate-300">
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function SituationCard({
  tone,
  title,
  sub,
  children,
}: {
  tone: 'green' | 'amber' | 'red'
  title: string
  sub: string
  children: React.ReactNode
}) {
  const accent = {
    green: { border: 'border-emerald-500', icon: 'text-emerald-400', bg: 'bg-emerald-950/40' },
    amber: { border: 'border-amber-400', icon: 'text-amber-400', bg: 'bg-amber-950/40' },
    red: { border: 'border-red-500', icon: 'text-red-400', bg: 'bg-red-950/40' },
  }[tone]
  const symbol = tone === 'green' ? '✓' : tone === 'amber' ? '⚠' : '!'
  return (
    <div
      className={`bg-slate-800 border-l-4 ${accent.border} rounded-r-2xl p-5 mb-4`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`flex-shrink-0 w-8 h-8 ${accent.bg} ${accent.icon} rounded-full flex items-center justify-center text-base font-bold`}
        >
          {symbol}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-base leading-snug">{title}</h2>
          <p className={`${accent.icon} text-xs mt-1`}>{sub}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function DraftMark() {
  return (
    <p className="text-slate-600 text-[10px] mt-3 italic">[待书士审核]</p>
  )
}
