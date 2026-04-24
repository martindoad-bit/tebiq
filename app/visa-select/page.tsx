import Link from 'next/link'

type BadgeType = 'ready' | 'alert' | 'detail'

interface Visa {
  id: string
  name: string
  nameZh: string
  audience: string
  href: string
  badge: BadgeType
  icon: React.ReactNode
}

export default function VisaSelectPage() {
  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页"><img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" /><div><div className="text-xl font-bold text-title leading-none">TEBIQ</div><div className="text-xs text-muted leading-tight mt-0.5">てびき</div></div></Link>
          <Link href="/" className="text-body hover:text-title text-sm">
            ← 返回首页
          </Link>
        </div>
      </header>

      <div className="px-4 py-8 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))] flex-1">
        <div className="max-w-md md:max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">
            选择你要续签的<br className="md:hidden" />
            <span className="text-primary">在留资格</span>
          </h1>
          <p className="text-muted text-sm md:text-base mb-8 md:mb-10 leading-relaxed">
            目前「技人国」支持完整自查问卷，其他类型提供说明与建议
          </p>

          <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            {VISAS.map(v => (
              <VisaCard key={v.id} visa={v} />
            ))}
          </div>

          <p className="text-center text-muted text-xs mt-8 leading-relaxed">
            如果你的签证类型还未列出，建议直接联系持牌行政书士咨询
          </p>
        </div>
      </div>
    </main>
  )
}

function VisaCard({ visa }: { visa: Visa }) {
  const borderClass =
    visa.badge === 'ready'
      ? 'border-line hover:border-primary'
      : visa.badge === 'alert'
        ? 'border-orange-500/40 hover:border-orange-500'
        : 'border-line hover:border-blue-500'
  return (
    <Link
      href={visa.href}
      className={`flex gap-4 p-4 rounded-2xl border-2 transition-all w-full text-left bg-card ${borderClass}`}
    >
      <div className="flex-shrink-0 w-12 h-12 bg-highlight text-primary rounded-xl flex items-center justify-center">
        {visa.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-title text-base leading-snug mb-1">{visa.nameZh}</div>
        <div className="text-muted text-xs mb-1.5">{visa.name}</div>
        <div className="text-body text-sm leading-relaxed">{visa.audience}</div>
      </div>
      <Badge type={visa.badge} />
    </Link>
  )
}

function Badge({ type }: { type: BadgeType }) {
  if (type === 'ready') {
    return (
      <div className="flex-shrink-0 self-start bg-primary text-title text-[10px] font-bold px-2 py-1 rounded-full">
        已支持
      </div>
    )
  }
  if (type === 'alert') {
    return (
      <div className="flex-shrink-0 self-start bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
        政策提醒
      </div>
    )
  }
  return (
    <div className="flex-shrink-0 self-start bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'keiei-kanri',
    name: '経営・管理',
    nameZh: '经营管理',
    audience: '在日本设立公司的经营者、管理职 · 2025/10 政策大幅收紧',
    badge: 'alert',
    href: '/check/keiei',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="7" x2="9" y2="7" />
        <line x1="15" y1="7" x2="15" y2="7" />
        <line x1="9" y1="12" x2="9" y2="12" />
        <line x1="15" y1="12" x2="15" y2="12" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
  {
    id: 'haigusha',
    name: '日本人の配偶者等',
    nameZh: '配偶者',
    audience: '日本人或永住者的配偶、子女 · 取决于婚姻关系',
    badge: 'detail',
    href: '/check/haigusha',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 'teijusha',
    name: '定住者',
    nameZh: '定住者',
    audience: '日系人、长期居留经法务大臣特别认可者',
    badge: 'detail',
    href: '/check/teijusha',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'eijusha',
    name: '永住者',
    nameZh: '永住者',
    audience: '已取得日本永久居留权（在留卡更新流程说明）',
    badge: 'detail',
    href: '/check/eijusha',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'tokutei-ginou',
    name: '特定技能',
    nameZh: '特定技能',
    audience: '介护、餐饮、农业等 14 个特定行业的劳动者',
    badge: 'detail',
    href: '/check/tokutei',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
]
