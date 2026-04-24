import Link from 'next/link'

export default function EijushaPage() {
  return (
    <main className="min-h-screen bg-base text-title flex flex-col">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-wider text-primary text-lg">
            TEBIQ
          </Link>
          <Link href="/visa-select" className="text-muted hover:text-body text-sm">
            ← 选择其他签证
          </Link>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="text-primary">永住者</span>
            ビザの更新について
          </h1>

          <div className="bg-blue-600 text-white rounded-2xl p-5 mb-8 leading-relaxed text-sm">
            永住者の在留カードは有効期限が 7 年（16 歳以上）または在留カード更新申請時まで有効。
            在留資格自体の更新は不要ですが、在留カードの更新手続きは必要です。
          </div>

          <Section title="永住者在留卡更新（每 7 年）">
            <p className="text-body text-sm leading-relaxed mb-2">
              这不是签证更新，是在留卡本身的有效期更新。
            </p>
            <p className="text-body text-sm leading-relaxed mb-3">
              需要在有效期满前に最寄りの入管局で手続き。
            </p>
            <div className="text-muted text-xs leading-relaxed mb-1">
              <span className="text-muted">所需材料：</span>
              申请书、护照、现在留卡、照片、手续费 4000 日元印纸
            </div>
            <DraftMark />
          </Section>

          <Section title="注意：永住者也需要遵守的义务" tone="amber">
            <ul className="space-y-2">
              <Bullet>住所变更后 14 天内向市役所申报</Bullet>
              <Bullet>结婚 / 离婚 / 出生等身份变化后 14 天内申报</Bullet>
              <Bullet>长期出国（5 年以上）可能影响永住资格</Bullet>
            </ul>
            <DraftMark />
          </Section>

          <Section title="想申请永住的人">
            <p className="text-body text-sm leading-relaxed mb-3">
              技人国持有者申请永住的基本条件：
            </p>
            <ul className="space-y-2 mb-3">
              <Bullet>在日本连续居住 10 年以上（其中就劳资格 5 年以上）</Bullet>
              <Bullet>住民税、社保全部按时缴纳</Bullet>
              <Bullet>无违规记录</Bullet>
              <Bullet>现在留期间为 3 年或 5 年</Bullet>
            </ul>
            <p className="text-primary-hover text-sm font-bold leading-relaxed">
              详细条件复杂，强烈建议咨询书士。
            </p>
            <DraftMark />
          </Section>

          <a
            href="#placeholder"
            className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl text-base transition-all mt-6"
          >
            咨询永住申请条件 →
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

function Section({
  title,
  tone = 'amber',
  children,
}: {
  title: string
  tone?: 'amber'
  children: React.ReactNode
}) {
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
  return <p className="text-muted text-[10px] mt-3 italic">[待书士审核]</p>
}
