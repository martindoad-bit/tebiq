'use client'
import { useState } from 'react'
import Link from 'next/link'

type VisaState = 'ready' | 'info' | 'coming'

interface Visa {
  id: string
  name: string
  nameZh: string
  audience: string
  state: VisaState
  href?: string
  icon: React.ReactNode
}

export default function VisaSelectPage() {
  const [showModal, setShowModal] = useState(false)
  const [pendingVisa, setPendingVisa] = useState<string>('')

  function handleUnsupported(visaName: string) {
    setPendingVisa(visaName)
    setShowModal(true)
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* 顶部导航（与首页一致） */}
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-wider text-amber-400 text-lg">
            TEBIQ
          </Link>
          <Link
            href="/"
            className="text-slate-400 hover:text-slate-200 text-sm"
          >
            ← 返回首页
          </Link>
        </div>
      </header>

      <div className="px-4 py-8 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))] flex-1">
        <div className="max-w-md md:max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">
            选择你要续签的<br className="md:hidden" />
            <span className="text-amber-400">在留资格</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base mb-8 md:mb-10 leading-relaxed">
            目前仅支持「技人国」自查，其他类型陆续开放
          </p>

          <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            {VISAS.map(v => (
              <VisaCard
                key={v.id}
                visa={v}
                onUnsupported={() => handleUnsupported(v.nameZh)}
              />
            ))}
          </div>

          <p className="text-center text-slate-500 text-xs mt-8 leading-relaxed">
            如果你的签证类型还未支持，
            <br />
            建议直接联系持牌行政书士咨询
          </p>
        </div>
      </div>

      {showModal && (
        <UnsupportedModal
          visaName={pendingVisa}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  )
}

function VisaCard({
  visa,
  onUnsupported,
}: {
  visa: Visa
  onUnsupported: () => void
}) {
  const cardBase =
    'flex gap-4 p-4 rounded-2xl border-2 transition-all w-full text-left'

  if (visa.state === 'ready' && visa.href) {
    return (
      <Link
        href={visa.href}
        className={`${cardBase} bg-slate-800 border-slate-700 hover:border-amber-400`}
      >
        <CardInner visa={visa} />
        <Badge type="ready" />
      </Link>
    )
  }

  if (visa.state === 'info' && visa.href) {
    return (
      <Link
        href={visa.href}
        className={`${cardBase} bg-slate-800 border-orange-500/40 hover:border-orange-500`}
      >
        <CardInner visa={visa} />
        <Badge type="info" />
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onUnsupported}
      className={`${cardBase} bg-slate-800/50 border-slate-800 opacity-60 hover:opacity-80`}
    >
      <CardInner visa={visa} />
      <Badge type="coming" />
    </button>
  )
}

function CardInner({ visa }: { visa: Visa }) {
  return (
    <>
      <div className="flex-shrink-0 w-12 h-12 bg-blue-950 text-amber-400 rounded-xl flex items-center justify-center">
        {visa.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-white text-base leading-snug mb-1">
          {visa.nameZh}
        </div>
        <div className="text-slate-500 text-xs mb-1.5">{visa.name}</div>
        <div className="text-slate-400 text-xs leading-relaxed">
          {visa.audience}
        </div>
      </div>
    </>
  )
}

function Badge({ type }: { type: 'ready' | 'info' | 'coming' }) {
  if (type === 'ready') {
    return (
      <div className="flex-shrink-0 self-start bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-1 rounded-full">
        已支持
      </div>
    )
  }
  if (type === 'info') {
    return (
      <div className="flex-shrink-0 self-start bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
        政策提醒
      </div>
    )
  }
  return (
    <div className="flex-shrink-0 self-start bg-slate-700 text-slate-400 text-[10px] font-bold px-2 py-1 rounded-full">
      即将支持
    </div>
  )
}

function UnsupportedModal({
  visaName,
  onClose,
}: {
  visaName: string
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4 animate-fade-in"
      onClick={onClose}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 200ms ease-out;
        }
      `}</style>
      <div
        className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-amber-400 font-bold text-base mb-3">
          「{visaName}」即将支持
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          这个签证类型的自查问卷还在准备中。
          当前建议直接联系持牌行政书士确认你的具体情况。
        </p>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-full min-h-[60px] bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-3 rounded-xl transition-all"
        >
          了解
        </button>
      </div>
    </div>
  )
}

const VISAS: Visa[] = [
  {
    id: 'gijinkoku',
    name: '技術・人文知識・国際業務',
    nameZh: '技人国',
    audience: '大学毕业的专业职：工程师、翻译、企划、海外业务等',
    state: 'ready',
    href: '/check',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
    state: 'info',
    href: '/check/keiei',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
    state: 'info',
    href: '/check/haigusha',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 'teijusha',
    name: '定住者',
    nameZh: '定住者',
    audience: '日系人、长期居留经法务大臣特别认可者',
    state: 'coming',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
    state: 'info',
    href: '/check/eijusha',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
    state: 'coming',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
]
