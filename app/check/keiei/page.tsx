import Link from 'next/link'

export default function KeieiPage() {
  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="TEBIQ 首页"><img src="/logo-icon.png" alt="" className="h-9 w-9 rounded-xl" /><img src="/logo-full.svg" alt="TEBIQ" className="h-9 w-auto" /></Link>
          <Link
            href="/visa-select"
            className="text-muted hover:text-body text-sm"
          >
            ← 选择其他签证
          </Link>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="text-primary">経営・管理</span>ビザの续签
          </h1>

          {/* 警告横幅 */}
          <div className="bg-orange-500 text-white rounded-2xl p-5 mb-8 leading-relaxed text-sm md:text-base font-bold">
            ⚠️ 2025 年 10 月 16 日起，经营管理签证要求大幅提高
          </div>

          {/* 新要求 */}
          <Section title="新要求（2025 年 10 月 16 日起生效）">
            <p className="text-body text-sm leading-relaxed mb-4">
              以下条件必须<span className="text-primary font-bold">同时满足</span>：
            </p>
            <ul className="space-y-3">
              <Bullet
                label="资本金"
                value="3,000 万日元以上（原来是 500 万日元）"
              />
              <Bullet
                label="常勤员工"
                value="1 名以上（限日本人、永住者等身份类外国人，技人国等就劳系外国人不算）"
              />
              <Bullet
                label="日语能力"
                value="申请人或常勤员工中至少 1 人达到 JLPT N2 以上"
              />
              <Bullet
                label="经营经验"
                value="申请人本人需有 3 年以上经营实务经验或硕士以上学位"
              />
              <Bullet
                label="事业计划书"
                value="需要税理士等第三方专家确认"
              />
              <Bullet label="办公室" value="不可使用自宅兼办公室" />
            </ul>
          </Section>

          {/* 过渡期 */}
          <Section title="已持有经营管理签证的人（过渡期）">
            <p className="text-body text-sm leading-relaxed">
              2028 年 10 月 16 日前更新时，入管局会综合评判经营状况和今后展望。
              建议尽早确认自身情况是否符合新要求。
            </p>
          </Section>

          {/* 提示 */}
          <div className="bg-card border border-line rounded-2xl p-5 mb-8">
            <p className="text-body text-sm leading-relaxed">
              由于要求复杂，个人情况差异大，
              <span className="text-primary font-bold">
                强烈建议在准备材料前先咨询书士
              </span>
              。
            </p>
          </div>

          {/* 强 CTA */}
          <a
            href="#placeholder"
            className="flex items-center justify-center w-full min-h-[60px] bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold py-4 rounded-xl text-base transition-all"
          >
            预约书士咨询经营管理签证续签 →
          </a>

          {/* 来源 + 免责 */}
          <div className="mt-10 text-center space-y-1">
            <p className="text-muted text-xs leading-relaxed">
              信息来源：出入国在留管理庁（令和 7 年 10 月 16 日施行）
            </p>
            <p className="text-muted text-xs leading-relaxed">
              本页面内容不构成法律意见，具体情况请咨询持牌行政书士。
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-line rounded-2xl p-5 mb-6">
      <h2 className="text-primary font-bold text-base mb-4">【{title}】</h2>
      {children}
    </div>
  )
}

function Bullet({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex gap-3">
      <span className="text-primary flex-shrink-0 mt-0.5">•</span>
      <div className="flex-1 min-w-0">
        <span className="text-title font-bold text-sm">{label}：</span>
        <span className="text-body text-sm leading-relaxed">{value}</span>
      </div>
    </li>
  )
}
