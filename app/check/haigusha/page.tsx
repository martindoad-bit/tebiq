import Link from 'next/link'

export default function HaigushaPage() {
  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="TEBIQ 首页"><img src="/logo.svg" alt="TEBIQ" width={120} height={40} className="h-9 w-auto" /></Link>
          <Link href="/visa-select" className="text-muted hover:text-body text-sm">
            ← 选择其他签证
          </Link>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="text-primary">配偶者・家族滞在</span>
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
            <p className="text-body text-sm leading-relaxed mb-2">
              需要准备：婚姻证明、配偶的在留证明、共同生活证明（水电账单等）。
            </p>
            <p className="text-body text-sm leading-relaxed">
              建议提前 2 个月开始准备材料。
            </p>
            <DraftMark />
          </SituationCard>

          <SituationCard
            tone="amber"
            title="情况 2：有离婚可能或婚姻关系不稳定"
            sub="续签最大的风险点"
          >
            <p className="text-body text-sm leading-relaxed mb-2">
              即使婚姻关系还未正式结束，入管局也会审查实质性的婚姻关系是否存在。
            </p>
            <p className="text-primary-hover text-sm font-bold leading-relaxed">
              强烈建议在情况发生变化前立刻咨询书士。
            </p>
            <DraftMark />
          </SituationCard>

          <SituationCard
            tone="red"
            title="情况 3：配偶去世或已离婚"
            sub="基础条件不复存在"
          >
            <p className="text-body text-sm leading-relaxed mb-2">
              配偶者签证的基础不复存在，需要在 6 个月内申请在留资格变更。
            </p>
            <p className="text-body text-sm leading-relaxed mb-2">
              可以变更为：定住者、特定活动等。
            </p>
            <p className="text-title text-sm font-bold leading-relaxed">
              必须立刻联系书士，时间紧迫。
            </p>
            <DraftMark />
          </SituationCard>

          <a
            href="#placeholder"
            className="flex items-center justify-center w-full min-h-[60px] bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold py-4 rounded-xl text-base transition-all mt-6"
          >
            联系书士咨询配偶者签证 →
          </a>

          <p className="text-center text-muted text-xs mt-8 leading-relaxed">
            本页面内容不构成法律意见，具体情况请咨询持牌行政书士。
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 pb-[env(safe-area-inset-bottom)]">
            <Link
              href="/knowledge"
              className="text-primary hover:text-primary-hover text-sm font-bold underline underline-offset-4"
            >
              了解签证基础知识 →
            </Link>
            <Link href="/" className="text-muted text-xs hover:text-body">
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
    green: { border: 'border-[#16A34A]', icon: 'text-[#16A34A]', bg: 'bg-emerald-950/40' },
    amber: { border: 'border-primary', icon: 'text-primary', bg: 'bg-highlight' },
    red: { border: 'border-[#DC2626]', icon: 'text-[#DC2626]', bg: 'bg-[#FEE2E2]' },
  }[tone]
  const symbol = tone === 'green' ? '✓' : tone === 'amber' ? '⚠' : '!'
  return (
    <div
      className={`bg-card border-l-4 ${accent.border} rounded-r-2xl p-5 mb-4`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`flex-shrink-0 w-8 h-8 ${accent.bg} ${accent.icon} rounded-full flex items-center justify-center text-base font-bold`}
        >
          {symbol}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-title font-bold text-base leading-snug">{title}</h2>
          <p className={`${accent.icon} text-xs mt-1`}>{sub}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function DraftMark() {
  return (
    <p className="text-muted text-[10px] mt-3 italic">[待书士审核]</p>
  )
}
