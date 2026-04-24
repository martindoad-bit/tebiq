import Link from 'next/link'

export default function TeijushaPage() {
  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="TEBIQ 首页"><img src="/logo.svg" alt="TEBIQ" width={120} height={40} className="h-9 w-auto" /></Link>
          <Link href="/visa-select" className="text-body hover:text-title text-sm">
            ← 选择其他签证
          </Link>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="text-primary">定住者</span>ビザの续签
          </h1>

          <div className="bg-blue-600 text-white rounded-2xl p-5 mb-8 leading-relaxed text-sm">
            定住者签证的续签主要取决于在日本的生活状况和社会融入程度。
          </div>

          <Section title="主要审查项目">
            <ul className="space-y-2">
              <Bullet>住民税、社保全部按时缴纳</Bullet>
              <Bullet>无违规记录</Bullet>
              <Bullet>在日本有稳定的生活基础</Bullet>
              <Bullet>家庭状况（子女在日本就学等加分项）</Bullet>
            </ul>
            <DraftMark />
          </Section>

          <Section title="日系人身份的特别注意">
            <p className="text-body text-sm leading-relaxed mb-2">
              持有定住者签证的日系人，续签时入管局会关注与日本的联系是否继续维持。
            </p>
            <p className="text-primary-hover text-sm font-bold leading-relaxed">
              长期不在日本居住可能影响续签。
            </p>
            <DraftMark />
          </Section>

          <a
            href="#placeholder"
            className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl text-base transition-all mt-6"
          >
            咨询定住者续签 →
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-line rounded-2xl p-5 mb-4">
      <h2 className="text-primary font-bold text-base mb-3">【{title}】</h2>
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
