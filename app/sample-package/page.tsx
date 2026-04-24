import Link from 'next/link'
import { GIJINKOKU_MATERIALS } from '@/lib/check/materials'

export const metadata = {
  title: 'TEBIQ 専属材料パッケージ · サンプルプレビュー',
  description: '購入後にダウンロードできる専属材料パッケージのサンプルプレビュー',
}

const SAMPLE_MATERIALS = GIJINKOKU_MATERIALS[0].materials.slice(0, 3)

const PREFILLED_FIELDS = [
  '出生年月日',
  '国籍',
  '在留カード番号',
  '職業',
  '勤務先',
  '勤務先住所',
  '年収',
  '在留期間更新理由',
  '渡航歴',
  '緊急連絡先',
  '家族構成',
  '学歴',
  '職歴',
  '配偶者情報',
  '同居人',
]

export default function SamplePackagePage() {
  return (
    <main className="min-h-screen bg-base text-body flex flex-col">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
          <Link
            href="/visa-select"
            className="bg-primary hover:bg-primary-hover text-title font-bold text-sm px-4 py-2 rounded-lg transition-all"
          >
            开始自查
          </Link>
        </div>
      </header>

      {/* Title region */}
      <section className="px-4 pt-10 md:pt-16 pb-6 md:pb-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-primary text-title text-xs font-bold px-3 py-1 rounded-full mb-4">
            サンプル · プレビュー
          </span>
          <h1 className="text-3xl md:text-4xl font-medium mb-3 leading-tight text-title">
            TEBIQ 専属材料パッケージ
          </h1>
          <p className="text-muted text-sm md:text-base">
            サンプルプレビュー · 購入後に完全版をダウンロード
          </p>
        </div>
      </section>

      {/* Sample preview area */}
      <section className="px-4 pb-10">
        <div className="max-w-3xl mx-auto relative">
          {/* SAMPLE diagonal watermark */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <span
              className="font-bold text-7xl md:text-8xl select-none"
              style={{
                color: '#F6B133',
                opacity: 0.07,
                transform: 'rotate(-25deg)',
                letterSpacing: '0.3em',
              }}
            >
              SAMPLE
            </span>
          </div>

          {/* Inner paper-style card */}
          <div className="relative bg-card border border-line rounded-2xl p-6 md:p-10 shadow-sm">
            {/* Cover section */}
            <div className="pb-8 mb-8 border-b-2 border-dashed border-highlight">
              <div
                className="inline-block text-2xl md:text-3xl font-bold text-primary border-b-[3px] border-primary pb-2 mb-5"
                style={{ letterSpacing: '0.4em' }}
              >
                TEBIQ
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-title leading-tight mb-2">
                専属材料パッケージ
              </h2>
              <p className="text-body text-sm md:text-base mb-5">
                技術・人文知識・国際業務 · 需注意（黄色）
              </p>
              <dl className="bg-base border-l-4 border-primary rounded-r-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                <div className="flex gap-2 text-sm">
                  <dt className="text-muted shrink-0">生成日期</dt>
                  <dd className="text-title font-semibold">2026 年 4 月 24 日</dd>
                </div>
                <div className="flex gap-2 text-sm">
                  <dt className="text-muted shrink-0">签证类型</dt>
                  <dd className="text-title font-semibold">技術・人文知識・国際業務</dd>
                </div>
                <div className="flex gap-2 text-sm">
                  <dt className="text-muted shrink-0">系统判定</dt>
                  <dd className="text-title font-semibold">需注意（黄色）</dd>
                </div>
                <div className="flex gap-2 text-sm">
                  <dt className="text-muted shrink-0">材料数量</dt>
                  <dd className="text-title font-semibold">共 19 项</dd>
                </div>
              </dl>
            </div>

            {/* 情况摘要 */}
            <SectionHeader title="情况摘要" pill="系统组合生成" />
            <div className="bg-base border-l-4 border-primary rounded-r-lg p-4 mb-8">
              <div className="text-xs font-bold text-[#92400E] mb-1">系统判定</div>
              <p className="text-body text-sm leading-relaxed">
                你换工作后已合规申报，住民税与社保正常，无欠税无断保。可以开始准备续签材料。
              </p>
            </div>

            {/* 材料清单 */}
            <SectionHeader title="材料清单" pill="共 19 项" />

            {/* First 3 fully visible */}
            <div className="space-y-3 mb-4">
              {SAMPLE_MATERIALS.map(m => (
                <article
                  key={m.id}
                  className="bg-card border border-line border-l-4 border-l-primary rounded-lg p-4"
                >
                  <h4 className="flex items-start gap-2 text-title text-sm md:text-base font-bold mb-3">
                    <span className="inline-block w-4 h-4 border-[1.5px] border-muted rounded-sm flex-shrink-0 mt-0.5" />
                    {m.name}
                  </h4>
                  <dl className="space-y-1.5 text-xs md:text-sm">
                    <div className="flex gap-2">
                      <dt className="text-muted shrink-0 w-16">去哪里</dt>
                      <dd className="text-body">{m.where}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted shrink-0 w-16">带什么</dt>
                      <dd className="text-body">{m.whatToBring.join('、')}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted shrink-0 w-16">多久</dt>
                      <dd className="text-body">{m.duration}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted shrink-0 w-16">多少钱</dt>
                      <dd className="text-body">{m.cost}</dd>
                    </div>
                  </dl>
                  <p className="bg-[#FEF3C7] border-l-[3px] border-[#F59E0B] text-[#92400E] text-xs md:text-sm mt-3 px-3 py-2 rounded-r">
                    ⚠ 常见踩坑：{m.pitfall}
                  </p>
                </article>
              ))}
            </div>

            {/* Items 4+ blurred + overlay */}
            <div className="relative mb-8">
              <div
                aria-hidden
                className="space-y-3"
                style={{ filter: 'blur(4px)' }}
              >
                {[0, 1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="bg-card border border-line border-l-4 border-l-primary rounded-lg p-4"
                  >
                    <div className="h-4 bg-line rounded w-2/3 mb-3" />
                    <div className="space-y-1.5">
                      <div className="h-3 bg-line/70 rounded w-full" />
                      <div className="h-3 bg-line/70 rounded w-5/6" />
                      <div className="h-3 bg-line/70 rounded w-4/6" />
                    </div>
                    <div className="h-6 bg-[#FEF3C7] rounded-r mt-3" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-card border-2 border-primary rounded-xl px-6 py-4 shadow-lg text-center">
                  <div className="text-title font-bold text-base md:text-lg mb-1">
                    🔒 购买后完整解锁
                  </div>
                  <div className="text-muted text-xs md:text-sm">
                    还有 16 项材料详情
                  </div>
                </div>
              </div>
            </div>

            {/* 申请书预填 */}
            <SectionHeader title="申请书预填" pill="自动填写" />
            <div className="space-y-4 mb-8">
              <div className="bg-base border border-line rounded-lg p-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted shrink-0 w-20">氏名</span>
                  <span className="text-muted italic">（购买后预填）</span>
                </div>
              </div>
              <div className="bg-card border border-line rounded-lg p-4">
                <div className="text-xs font-bold text-title mb-3">
                  完整版自动填写以下 15 个字段
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1.5 gap-x-4">
                  {PREFILLED_FIELDS.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-body">
                      <CheckIcon />
                      <span>{f}</span>
                      <span className="text-muted text-xs ml-auto italic">—</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-muted text-xs text-center">
                完整版可下载已预填的申请书草稿
              </p>
            </div>

            {/* 特别注意事项 */}
            <SectionHeader title="特别注意事项" pill="AI 个性化建议" />
            <div className="relative">
              <div
                aria-hidden
                className="bg-card border border-line rounded-lg p-4 space-y-2"
                style={{ filter: 'blur(4px)' }}
              >
                <div className="h-3 bg-line/70 rounded w-full" />
                <div className="h-3 bg-line/70 rounded w-11/12" />
                <div className="h-3 bg-line/70 rounded w-5/6" />
                <div className="h-3 bg-line/70 rounded w-full" />
                <div className="h-3 bg-line/70 rounded w-4/6" />
                <div className="h-3 bg-line/70 rounded w-11/12" />
                <div className="h-3 bg-line/70 rounded w-3/4" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-card border-2 border-primary rounded-xl px-6 py-4 shadow-lg text-center max-w-sm">
                  <div className="text-title font-bold text-sm md:text-base mb-1">
                    🔒 购买后查看
                  </div>
                  <div className="text-muted text-xs md:text-sm">
                    针对你具体情况的 AI 个性化建议（约 200 字）
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-12 md:pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-line border-l-4 border-l-primary rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="bg-primary text-title text-xs font-bold px-2 py-0.5 rounded">
                早鸟价
              </span>
              <span className="text-primary text-4xl md:text-5xl font-bold leading-none">
                ¥380
              </span>
              <span className="text-muted text-base line-through">¥480</span>
            </div>
            <p className="text-muted text-xs mb-5">
              正式价 ¥480 · 早鸟期内享专属折扣
            </p>

            <Link
              href="/consultation?visa=gijinkoku"
              className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-title font-bold py-4 rounded-xl text-lg transition-all shadow-sm"
            >
              購入して完全版をダウンロード
            </Link>
            <p className="text-muted text-xs text-center mt-3">
              支払いはStripeにて安全に処理されます · 即時ダウンロード
            </p>
          </div>
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

function SectionHeader({ title, pill }: { title: string; pill: string }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-primary pb-1.5 mb-4">
      <h3 className="text-title text-base md:text-lg font-bold">{title}</h3>
      <span className="text-muted text-xs">{pill}</span>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#16A34A"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
