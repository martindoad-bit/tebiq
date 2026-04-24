import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '搬家了？这些手续 14 天内必须完成 | TEBIQ',
  description: '在日外国人搬家后必须完成的法定手续清单：転出届・転入届・在留卡地址更新・マイナンバー・入管申报。',
}

interface TimelineItem {
  title: string
  details: { label: string; value: string }[]
  notice?: string
  needsReview?: boolean
}

interface TimelinePhase {
  phase: string
  badge: 'urgent' | 'must' | 'soft'
  items: TimelineItem[]
}

const TIMELINE: TimelinePhase[] = [
  {
    phase: '离开旧住所前 / 搬家当天',
    badge: 'urgent',
    items: [
      {
        title: '向旧市役所 / 区役所提交「転出届」',
        details: [
          { label: '去哪里', value: '旧住所所在地市役所 / 区役所「住民課」窗口' },
          { label: '带什么', value: '在留卡、印鑑（无印鑑也可）' },
          { label: '费用', value: '免费' },
        ],
        notice: '可以提前 2 周内提交，也可以搬家后 14 天内补交。',
      },
    ],
  },
  {
    phase: '搬家后 14 天以内（法定期限）',
    badge: 'must',
    items: [
      {
        title: '向新市役所 / 区役所提交「転入届」',
        details: [
          { label: '去哪里', value: '新住所所在地市役所 / 区役所「住民課」窗口' },
          { label: '带什么', value: '転出証明書（旧市役所发的）、在留卡、护照' },
          { label: '费用', value: '免费' },
        ],
        notice: '⚠️ 外国人特别注意：転入届时同步更新在留卡地址，窗口会直接在卡背面盖章。',
      },
      {
        title: 'マイナンバーカード地址更新',
        details: [
          { label: '去哪里', value: '同一市役所窗口' },
          { label: '带什么', value: 'マイナンバーカード' },
          { label: '费用', value: '免费' },
        ],
      },
      {
        title: '通知入管局（如有以下情况）',
        details: [
          { label: '换工作同时搬家', value: '需要单独申报「契約機関に関する届出」' },
          { label: '在留卡背面地址已更新', value: '通常不需要额外通知入管局' },
        ],
        needsReview: true,
      },
    ],
  },
  {
    phase: '搬家后尽快（无硬性截止但越早越好）',
    badge: 'soft',
    items: [
      {
        title: '通知雇主 HR',
        details: [{ label: '为什么', value: '公司需要更新住民税の特别徴収・年金等记录' }],
      },
      {
        title: '通知银行',
        details: [{ label: '怎么办', value: '各银行网银或窗口办理（多数支持在线）' }],
      },
      {
        title: '通知手机运营商',
        details: [{ label: '怎么办', value: '官网或 App 内变更' }],
      },
      {
        title: '国民健康保险 / 厚生年金（如适用）',
        details: [{ label: '怎么办', value: '自加入国保者随転入届一并办理' }],
      },
      {
        title: '更新驾照地址',
        details: [{ label: '去哪里', value: '管辖警察署或运转免许中心，免费' }],
      },
      {
        title: '更新クレジットカード地址',
        details: [{ label: '怎么办', value: '各发卡机构 App 或网页登记' }],
      },
    ],
  },
]

const BADGE_STYLE: Record<TimelinePhase['badge'], string> = {
  urgent: 'bg-highlight text-primary border-primary',
  must: 'bg-[#FEE2E2] text-[#B91C1C] border-[#DC2626]',
  soft: 'bg-card text-body border-line',
}

const BADGE_LABEL: Record<TimelinePhase['badge'], string> = {
  urgent: '搬家当天',
  must: '14 天内必须',
  soft: '尽快办理',
}

export default function MovingHubPage() {
  return (
    <main className="min-h-screen bg-base text-body pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
          <Link href="/" className="text-body hover:text-title text-sm">← 首页</Link>
        </div>
      </header>

      {/* 标题区 */}
      <section className="px-4 pt-10 md:pt-14 pb-6">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <div className="inline-block bg-highlight text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
            生活节点 · 搬家
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-title leading-tight mb-3">
            搬家了？这些手续 14 天内必须完成
          </h1>
          <p className="text-body text-sm md:text-base leading-relaxed">
            搬家后有多项法定申报义务，外国人尤其需要注意在留卡地址更新。
            漏掉任何一项都可能影响今后的续签或永住申请。
          </p>
        </div>
      </section>

      {/* 风险自查入口 */}
      <section className="px-4 mb-8">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <div className="bg-card border border-line border-l-4 border-l-primary rounded-2xl p-5 shadow-sm">
            <div className="text-primary text-xs font-bold mb-2">2 分钟自查</div>
            <h2 className="text-title text-base font-bold mb-2">你的搬家情况有没有特殊风险？</h2>
            <p className="text-body text-sm leading-relaxed mb-4">
              6 个问题，帮你确认是否漏掉了关键申报，特别是涉及在留卡和入管局的部分。
            </p>
            <Link
              href="/life/moving/quiz"
              className="flex items-center justify-center w-full min-h-[52px] bg-primary hover:bg-primary-hover text-title font-bold rounded-xl text-base transition-all"
            >
              开始自查 →
            </Link>
          </div>
        </div>
      </section>

      {/* 时间线 */}
      <section className="px-4 pb-12">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h2 className="text-title text-lg md:text-xl font-bold mb-4">手续时间线</h2>
          <div className="space-y-6">
            {TIMELINE.map(phase => (
              <div key={phase.phase}>
                <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-3 ${BADGE_STYLE[phase.badge]}`}>
                  【{phase.phase}】
                  <span className="ml-2 opacity-70">· {BADGE_LABEL[phase.badge]}</span>
                </div>
                <div className="space-y-3">
                  {phase.items.map(item => (
                    <article
                      key={item.title}
                      className="bg-card border border-line rounded-2xl p-5 shadow-sm"
                    >
                      <h3 className="text-title text-base font-bold mb-3 flex items-start gap-2">
                        <span className="inline-block w-5 h-5 mt-0.5 border border-line rounded flex-shrink-0" />
                        <span>{item.title}</span>
                      </h3>
                      <dl className="space-y-1.5 mb-2">
                        {item.details.map(d => (
                          <div key={d.label} className="text-sm leading-relaxed">
                            <span className="text-muted">{d.label}：</span>
                            <span className="text-body">{d.value}</span>
                          </div>
                        ))}
                      </dl>
                      {item.notice && (
                        <p className="text-body text-xs leading-relaxed mt-3 bg-highlight border-l-[3px] border-primary px-3 py-2 rounded-r">
                          {item.notice}
                        </p>
                      )}
                      {item.needsReview && (
                        <p className="text-muted text-[11px] mt-2">[待书士审核]</p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部说明 */}
      <section className="px-4 pb-12">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <div className="bg-card border border-line rounded-2xl p-5 text-center">
            <p className="text-muted text-xs leading-relaxed">
              本页信息来源：各市区町村官网、出入国在留管理庁。
              如有特殊情况请咨询持牌行政书士。
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-line px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center">
        <p className="text-muted text-xs">© 2026 TEBIQ</p>
      </footer>
    </main>
  )
}
