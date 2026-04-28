import Link from 'next/link'
import type { ReactNode } from 'react'
import { BriefcaseBusiness, Building2, Heart, Home, ShieldCheck, Wrench } from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'

type BadgeType = 'ready' | 'alert' | 'detail'

interface Visa {
  id: string
  name: string
  nameZh: string
  audience: string
  href: string
  badge: BadgeType
  icon: ReactNode
}

export default function VisaSelectPage() {
  return (
    <AppShell appBar={<AppBar title="续签自查" back="/" />}>
      <div className="py-5">
        <h1 className="text-[25px] font-medium leading-tight text-ink">
          选择你要续签的在留资格
        </h1>
        <p className="mt-3 text-[13px] leading-[1.7] text-slate">
          目前「技人国」支持完整自查问卷，其他类型提供说明与建议。
        </p>

        <div className="mt-6 space-y-3">
          {VISAS.map(v => (
            <VisaCard key={v.id} visa={v} />
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] leading-relaxed text-ash">
          如果你的签证类型还未列出，建议直接联系持牌行政书士咨询。
        </p>
      </div>
    </AppShell>
  )
}

function VisaCard({ visa }: { visa: Visa }) {
  const borderClass =
    visa.badge === 'ready'
      ? 'border-accent/45 hover:border-accent'
      : visa.badge === 'alert'
        ? 'border-danger/25 hover:border-danger/45'
        : 'border-hairline hover:border-accent/45'
  return (
    <Link
      href={visa.href}
      className={`flex w-full gap-3 rounded-card border bg-surface px-4 py-4 text-left shadow-card transition-colors ${borderClass}`}
    >
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[13px] bg-accent-2 text-ink">
        {visa.icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 text-[15px] font-medium leading-snug text-ink">{visa.nameZh}</div>
        <div className="jp-text mb-1.5 text-[11px] text-ash">{visa.name}</div>
        <div className="text-[12px] leading-[1.65] text-slate">{visa.audience}</div>
      </div>
      <Badge type={visa.badge} />
    </Link>
  )
}

function Badge({ type }: { type: BadgeType }) {
  if (type === 'ready') {
    return (
      <div className="flex-shrink-0 self-start rounded-[8px] bg-accent px-2 py-1 text-[10px] font-medium text-white">
        已支持
      </div>
    )
  }
  if (type === 'alert') {
    return (
      <div className="flex-shrink-0 self-start rounded-[8px] bg-[#FDECEA] px-2 py-1 text-[10px] font-medium text-danger">
        政策提醒
      </div>
    )
  }
  return (
    <div className="flex-shrink-0 self-start rounded-[8px] bg-cool-blue px-2 py-1 text-[10px] font-medium text-ink">
      了解详情
    </div>
  )
}

const VISAS: Visa[] = [
  {
    id: 'gijinkoku',
    name: '技術・人文知識・国際業務',
    nameZh: '技人国',
    audience: '大学毕业的专业职：工程师、翻译、企划、海外业务等',
    badge: 'ready',
    href: '/check',
    icon: <BriefcaseBusiness size={21} strokeWidth={1.55} />,
  },
  {
    id: 'keiei-kanri',
    name: '経営・管理',
    nameZh: '经营管理',
    audience: '在日本设立公司的经营者、管理职 · 2025/10 政策大幅收紧',
    badge: 'alert',
    href: '/check/keiei/quiz',
    icon: <Building2 size={21} strokeWidth={1.55} />,
  },
  {
    id: 'haigusha',
    name: '日本人の配偶者等',
    nameZh: '配偶者',
    audience: '日本人或永住者的配偶、子女 · 取决于婚姻关系',
    badge: 'detail',
    href: '/check/haigusha/quiz',
    icon: <Heart size={21} strokeWidth={1.55} />,
  },
  {
    id: 'teijusha',
    name: '定住者',
    nameZh: '定住者',
    audience: '日系人、长期居留经法务大臣特别认可者',
    badge: 'detail',
    href: '/check/teijusha/quiz',
    icon: <Home size={21} strokeWidth={1.55} />,
  },
  {
    id: 'eijusha',
    name: '永住者',
    nameZh: '永住者',
    audience: '已取得日本永久居留权（在留卡更新流程说明）',
    badge: 'detail',
    href: '/check/eijusha',
    icon: <ShieldCheck size={21} strokeWidth={1.55} />,
  },
  {
    id: 'tokutei-ginou',
    name: '特定技能',
    nameZh: '特定技能',
    audience: '介护、餐饮、农业等 14 个特定行业的劳动者',
    badge: 'detail',
    href: '/check/tokutei/quiz',
    icon: <Wrench size={21} strokeWidth={1.55} />,
  },
]
