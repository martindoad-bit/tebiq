import { ArrowRight, FileText, Lock, ShieldCheck } from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import { EVENT } from '@/lib/analytics/events'
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
    <AppShell appBar={<AppBar title="材料包样例" back />}>
      {/* Title region */}
      <section className="py-5 text-center">
        <div className="mx-auto max-w-[360px]">
          <span className="inline-flex items-center gap-1.5 rounded-chip bg-accent-2 px-3 py-1.5 text-[11px] font-medium text-ink">
            <FileText size={13} strokeWidth={1.55} />
            サンプル · プレビュー
          </span>
          <h1 className="mt-3 text-[25px] font-medium leading-tight text-ink">
            TEBIQ 専属材料パッケージ
          </h1>
          <p className="mt-2 text-[12px] leading-[1.65] text-ash">
            サンプルプレビュー · 購入後に完全版をダウンロード
          </p>
        </div>
      </section>

      {/* Sample preview area */}
      <section className="pb-5">
        <div className="relative">
          {/* SAMPLE diagonal watermark */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <span
              className="font-bold text-7xl md:text-8xl select-none"
              style={{
                color: '#E56F4F',
                opacity: 0.07,
                transform: 'rotate(-25deg)',
                letterSpacing: '0.3em',
              }}
            >
              SAMPLE
            </span>
          </div>

          {/* Inner paper-style card */}
          <div className="relative rounded-card border border-hairline bg-surface p-5 shadow-raised">
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
                <div className="rounded-card border border-accent bg-surface px-5 py-4 text-center shadow-raised">
                  <div className="mb-1 flex items-center justify-center gap-1.5 text-[14px] font-medium text-ink">
                    <Lock size={15} strokeWidth={1.55} />
                    购买后完整解锁
                  </div>
                  <div className="text-[12px] text-ash">
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
                <div className="max-w-sm rounded-card border border-accent bg-surface px-5 py-4 text-center shadow-raised">
                  <div className="mb-1 flex items-center justify-center gap-1.5 text-[14px] font-medium text-ink">
                    <Lock size={15} strokeWidth={1.55} />
                    购买后查看
                  </div>
                  <div className="text-[12px] text-ash">
                    针对你具体情况的 AI 个性化建议（约 200 字）
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-6">
        <div className="rounded-card border border-hairline bg-surface px-5 py-5 shadow-raised">
            <div className="mb-1 flex items-baseline gap-3">
              <span className="rounded-[8px] bg-accent px-2 py-1 text-[11px] font-medium text-white">
                早鸟价
              </span>
              <span className="text-[34px] font-medium leading-none text-ink">
                ¥380
              </span>
              <span className="text-[14px] text-ash line-through">¥480</span>
            </div>
            <p className="mb-5 text-[11px] text-ash">
              正式价 ¥480 · 早鸟期内享专属折扣
            </p>

            <TrackedLink
              href="/consultation?visa=gijinkoku"
              eventName={EVENT.CONSULTATION_CTA_CLICK}
              payload={{ source: 'sample_package', visa: 'gijinkoku' }}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-btn bg-accent px-4 text-[14px] font-medium text-white shadow-cta transition-transform active:translate-y-px"
            >
              購入して完全版をダウンロード
              <ArrowRight size={16} strokeWidth={1.55} />
            </TrackedLink>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-ash">
              <ShieldCheck size={13} strokeWidth={1.55} />
              支払いはStripeにて安全に処理されます · 即時ダウンロード
            </p>
        </div>
      </section>
    </AppShell>
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
