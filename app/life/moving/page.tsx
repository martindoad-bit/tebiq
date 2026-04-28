import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CalendarClock, CheckSquare, Home, Info, MapPin } from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'

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
  urgent: 'bg-accent-2 text-ink border-accent',
  must: 'bg-[#FDECEA] text-danger border-danger/35',
  soft: 'bg-surface text-ash border-hairline',
}

const BADGE_LABEL: Record<TimelinePhase['badge'], string> = {
  urgent: '搬家当天',
  must: '14 天内必须',
  soft: '尽快办理',
}

export default function MovingHubPage() {
  return (
    <AppShell appBar={<AppBar title="生活手续" back="/" />}>
      {/* 标题区 */}
      <section className="py-5">
        <div className="inline-flex items-center gap-1.5 rounded-chip bg-accent-2 px-3 py-1.5 text-[11px] font-medium text-ink">
          <Home size={13} strokeWidth={1.55} />
          生活节点 · 搬家
        </div>
        <h1 className="mt-3 text-[25px] font-medium leading-tight text-ink">
          搬家后 14 天内要完成的手续
        </h1>
        <p className="mt-3 text-[13px] leading-[1.7] text-slate">
          搬家后有多项法定申报义务，外国人尤其需要注意在留卡地址更新。
        </p>
      </section>

      {/* 风险自查入口 */}
      <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="mb-2 flex items-center gap-2 text-[13px] font-medium text-ink">
          <CheckSquare size={16} strokeWidth={1.55} />
          2 分钟自查
        </div>
        <h2 className="text-[15px] font-medium leading-snug text-ink">你的搬家情况有没有特殊风险？</h2>
        <p className="mt-2 text-[12px] leading-[1.7] text-slate">
          6 个问题，确认是否漏掉关键申报，特别是涉及在留卡和入管局的部分。
        </p>
        <Link
          href="/life/moving/quiz"
          className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-btn bg-accent px-4 text-[14px] font-medium text-white shadow-cta transition-transform active:translate-y-px"
        >
          开始自查
          <ArrowRight size={16} strokeWidth={1.55} />
        </Link>
      </section>

      {/* 时间线 */}
      <section className="mt-5 pb-4">
        <h2 className="mb-4 flex items-center gap-2 px-1 text-[13px] font-medium text-ink">
          <CalendarClock size={16} strokeWidth={1.55} />
          手续时间线
        </h2>
        <div className="space-y-5">
          {TIMELINE.map(phase => (
            <div key={phase.phase}>
              <div className={`mb-3 inline-flex rounded-chip border px-3 py-1.5 text-[11px] font-medium ${BADGE_STYLE[phase.badge]}`}>
                {phase.phase}
                <span className="ml-2 opacity-70">· {BADGE_LABEL[phase.badge]}</span>
              </div>
              <div className="space-y-3">
                {phase.items.map(item => (
                  <article
                    key={item.title}
                    className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card"
                  >
                    <h3 className="mb-3 flex items-start gap-2 text-[14px] font-medium leading-snug text-ink">
                      <MapPin size={16} strokeWidth={1.55} className="mt-0.5 flex-shrink-0 text-accent" />
                      <span>{item.title}</span>
                    </h3>
                    <dl className="mb-2 space-y-1.5">
                      {item.details.map(d => (
                        <div key={d.label} className="text-[12px] leading-[1.7]">
                          <span className="text-ash">{d.label}：</span>
                          <span className="text-slate">{d.value}</span>
                        </div>
                      ))}
                    </dl>
                    {item.notice && (
                      <p className="mt-3 rounded-[11px] bg-accent-2 px-3 py-2 text-[11px] leading-[1.65] text-slate">
                        {item.notice}
                      </p>
                    )}
                    {item.needsReview && (
                      <p className="mt-2 text-[11px] text-ash">[待书士审核]</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 底部说明 */}
      <section className="pb-6">
        <div className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
          <p className="flex gap-2 text-[11px] leading-[1.7] text-ash">
            <Info size={14} strokeWidth={1.55} className="mt-0.5 flex-shrink-0" />
            <span>
              本页信息来源：各市区町村官网、出入国在留管理庁。如有特殊情况请咨询持牌行政书士。
            </span>
          </p>
        </div>
      </section>
    </AppShell>
  )
}
