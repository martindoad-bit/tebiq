import Link from 'next/link'

export default function TokuteiPage() {
  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="TEBIQ 首页"><img src="/logo-icon.png" alt="" className="h-9 w-9 rounded-xl" /><img src="/logo-full.svg" alt="TEBIQ" className="h-9 w-auto" /></Link>
          <Link href="/visa-select" className="text-body hover:text-title text-sm">
            ← 选择其他签证
          </Link>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="text-primary">特定技能</span>ビザの续签
          </h1>

          <div className="bg-blue-600 text-white rounded-2xl p-5 mb-8 leading-relaxed text-sm">
            特定技能 1 号和 2 号的续签条件不同，请先确认你属于哪一类。
          </div>

          <Section title="特定技能 1 号（上限 5 年）">
            <ul className="space-y-2">
              <Bullet>通过特定技能测试和日语测试</Bullet>
              <Bullet>所属登录支援机关正常运营</Bullet>
              <Bullet>技能评估试验合格证有效</Bullet>
            </ul>
            <p className="text-primary-hover text-sm mt-3 leading-relaxed">
              注意：特定技能 1 号有 5 年上限，到期后需要变更为其他签证或特定技能 2 号。
            </p>
            <DraftMark />
          </Section>

          <Section title="特定技能 2 号（无上限）">
            <ul className="space-y-2">
              <Bullet>对象：建设业、造船舶用工业（2024 年起扩大至更多行业）</Bullet>
              <Bullet>条件比 1 号严格，需要更高技能证明</Bullet>
            </ul>
            <DraftMark />
          </Section>

          <Section title="续签常见风险" tone="amber">
            <ul className="space-y-2">
              <Bullet>所属机关变更未申报</Bullet>
              <Bullet>技能试验资格到期</Bullet>
              <Bullet>日语能力证明失效</Bullet>
            </ul>
            <DraftMark />
          </Section>

          <a
            href="#placeholder"
            className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl text-base transition-all mt-6"
          >
            咨询特定技能续签 →
          </a>

          <p className="text-center text-muted text-xs mt-8 leading-relaxed">
            本页面内容不构成法律意见，具体情况请咨询持牌行政书士。
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href="/knowledge" className="text-primary hover:text-primary-hover text-sm font-bold underline underline-offset-4">
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

function Section({ title, tone = 'amber', children }: { title: string; tone?: 'amber'; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-line rounded-2xl p-5 mb-4">
      <h2 className={`${tone === 'amber' ? 'text-primary' : 'text-primary'} font-bold text-base mb-3`}>
        【{title}】
      </h2>
      {children}
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-body text-sm leading-relaxed">
      <span className="text-primary flex-shrink-0">•</span>
      <span>{children}</span>
    </li>
  )
}

function DraftMark() {
  return <p className="text-muted text-xs mt-3 italic">[待书士审核]</p>
}
