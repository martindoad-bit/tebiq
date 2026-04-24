import Link from 'next/link'
import { storage } from '@/lib/storage'

export const revalidate = 60

async function getLiveCount(): Promise<number> {
  try {
    const [g, y, r] = await Promise.all([
      storage.get<number>('stats:result:green'),
      storage.get<number>('stats:result:yellow'),
      storage.get<number>('stats:result:red'),
    ])
    return (g ?? 0) + (y ?? 0) + (r ?? 0)
  } catch {
    return 0
  }
}

export default async function Home() {
  const totalTests = await getLiveCount()

  return (
    <main className="min-h-screen bg-base text-body flex flex-col pb-16 md:pb-0">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页"><img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" /><div><div className="text-xl font-bold text-title leading-none">TEBIQ</div><div className="text-xs text-muted leading-tight mt-0.5">てびき</div></div></Link>
          <Link
            href="/visa-select"
            className="bg-primary hover:bg-primary-hover text-title font-bold text-sm px-4 py-2 rounded-lg transition-all"
          >
            开始自查
          </Link>
        </div>
      </header>

      {/* Hero - 左右分栏 PC / 上下堆叠 mobile */}
      <section className="px-4 pt-10 md:pt-20 pb-12 md:pb-20">
        <div className="max-w-md md:max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-12 md:items-start">
          {/* 左：标题 + CTA + 信任点 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo-icon.png" alt="TEBIQ" className="h-16 w-16 rounded-2xl" />
              <div>
                <div className="text-2xl font-bold text-[#1E3A5F] leading-none">TEBIQ</div>
                <div className="text-sm text-[#6B7280] mt-1">てびき</div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium mb-4 leading-tight text-title">
              在日签证，<br />
              先查后办，安心每一步
            </h1>
            <p className="text-body text-base md:text-lg leading-relaxed mb-2">
              专业・安心・透明・200+ 真实案例经验
            </p>
            <p className="text-muted text-sm md:text-base leading-relaxed mb-8">
              3 分钟了解你的续签风险，提前发现可能影响结果的隐患
            </p>

            <Link
              href="/visa-select"
              className="flex items-center justify-center w-full md:max-w-sm min-h-[60px] bg-primary hover:bg-primary-hover text-title font-bold py-4 rounded-xl text-lg transition-all shadow-sm"
            >
              免费开始自查 →
            </Link>
            <p className="text-muted text-xs mt-3">
              3 分钟完成 · 无需注册 · 答案不上传
            </p>

            <ul className="mt-8 space-y-3">
              {TRUST_POINTS.map(t => (
                <li key={t} className="flex items-start gap-2 text-body text-sm leading-relaxed">
                  <Check />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 右：三步流程卡 */}
          <div className="mt-10 md:mt-0 space-y-3">
            {STEPS.map(s => (
              <div
                key={s.n}
                className="bg-card border border-line border-l-4 border-l-[#F6B133] rounded-2xl p-5 shadow-sm"
              >
                <div className="text-2xl font-bold not-italic text-primary leading-none mb-2 tracking-wide">
                  {s.n}
                </div>
                <div className="text-base font-medium text-title mb-1">{s.title}</div>
                <div className="text-sm text-muted leading-relaxed">{s.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 模块 1：你是否有这些疑问 */}
      <section className="bg-card border-t border-line px-4 py-12 md:py-16">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h2 className="text-title text-xl md:text-2xl font-bold mb-6 text-center">
            你是否有这些疑问？
          </h2>
          <ul className="space-y-3 mb-6">
            {QUESTIONS_HINT.map(q => (
              <li key={q} className="flex items-start gap-2 text-body text-base leading-relaxed">
                <span className="text-primary flex-shrink-0">·</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="text-center text-primary text-sm font-bold">
            → 建议先做一次自查，3 分钟知道答案
          </p>
        </div>
      </section>

      {/* 模块 2：你将获得什么 */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h2 className="text-title text-xl md:text-2xl font-bold mb-6 text-center">
            你将获得什么
          </h2>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {OUTPUTS.map(o => (
              <div
                key={o.title}
                className="bg-card border border-line rounded-xl p-4 shadow-sm"
              >
                <div className="text-primary text-xs font-bold mb-1">{o.label}</div>
                <div className="text-title text-sm font-bold leading-snug">{o.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 模块 3：实时数字 */}
      <section className="bg-highlight px-4 py-10 md:py-14 text-center border-y border-line">
        <p className="text-body text-sm md:text-base leading-relaxed">
          已帮助{' '}
          <span className="text-primary font-bold text-3xl md:text-4xl mx-1 inline-block align-middle">
            {totalTests.toLocaleString()}
          </span>{' '}
          人完成签证风险自查
        </p>
      </section>

      {/* 底部 CTA */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-md mx-auto text-center">
          <Link
            href="/visa-select"
            className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-title font-bold py-4 rounded-xl text-lg transition-all shadow-sm"
          >
            开始免费自查 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-line px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center mt-auto">
        <Link
          href="/knowledge"
          className="inline-block text-primary hover:text-primary-hover text-sm font-bold mb-4 underline underline-offset-4"
        >
          了解签证基础知识 →
        </Link>
        <p className="text-muted text-xs leading-relaxed">
          本工具由持牌行政书士团队提供支持
        </p>
        <p className="text-muted text-xs mt-1">© 2026 TEBIQ</p>
      </footer>
    </main>
  )
}

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#16A34A"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 mt-0.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const TRUST_POINTS = [
  '持牌行政书士提供判断逻辑',
  '基于 200+ 真实案例整理',
  '持续监控入管局政策更新',
]

const STEPS = [
  { n: 'STEP 1', title: '选择签证类型', subtitle: '技人国 / 经营管理 / 配偶者等' },
  { n: 'STEP 2', title: '回答 13 个问题', subtitle: '约 3 分钟，分支逻辑自动跳题' },
  { n: 'STEP 3', title: '获得风险评估', subtitle: '红 / 黄 / 绿三色判决 + 材料清单' },
]

const QUESTIONS_HINT = [
  '换工作后会影响续签吗？',
  '收入下降有没有问题？',
  '公司规模小会影响结果吗？',
]

const OUTPUTS = [
  { label: '判定', title: '风险等级（红 / 黄 / 绿）' },
  { label: '说明', title: '影响因素具体说明' },
  { label: '材料', title: '技人国标准材料清单' },
  { label: '行动', title: '行动时间建议' },
]
