import Link from 'next/link'
import { notFound } from 'next/navigation'
import { storage } from '@/lib/storage'
import type { ShareRecord } from '@/app/api/share/create/route'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const VERDICT_META = {
  red: {
    label: '红色',
    sub: '存在高风险项',
    bg: 'from-[#DC2626] to-[#B91C1C]',
    icon: '!',
  },
  yellow: {
    label: '黄色',
    sub: '需要先解决几个问题',
    bg: 'from-primary to-primary-hover',
    icon: '⚠',
  },
  green: {
    label: '绿色',
    sub: '前置条件均通过',
    bg: 'from-[#16A34A] to-[#15803D]',
    icon: '✓',
  },
} as const

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps) {
  const record = await storage.get<ShareRecord>(`share:${params.id}`)
  if (!record) {
    return { title: '分享已过期 | TEBIQ' }
  }
  const v = VERDICT_META[record.verdict]
  return {
    title: `朋友分享了一次 TEBIQ 自查（${v.label}） | TEBIQ`,
    description: `你的朋友刚刚做了 TEBIQ 续签自查，结果是${v.label}。你也来看看自己的情况吧。`,
  }
}

export default async function SharePage({ params }: PageProps) {
  const record = await storage.get<ShareRecord>(`share:${params.id}`)
  if (!record) notFound()
  const meta = VERDICT_META[record.verdict]

  return (
    <main className="min-h-screen bg-base text-title pb-[env(safe-area-inset-bottom)]">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
        </div>
      </header>

      <div className={`bg-gradient-to-b ${meta.bg} text-white px-4 pt-12 pb-10 text-center`}>
        <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
          朋友分享 · TEBIQ 自查
        </div>
        <div className="text-5xl mb-3">{meta.icon}</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
          你的朋友刚做了一次签证自查
        </h1>
        <p className="text-white/90 text-sm leading-relaxed px-4">
          结果：{meta.label}（{meta.sub}）
        </p>
      </div>

      <div className="max-w-md md:max-w-3xl mx-auto px-4 py-8 space-y-5">
        <div className="bg-card border border-line rounded-2xl p-5 shadow-sm">
          <div className="text-muted text-xs font-bold mb-2">摘要</div>
          <p className="text-title text-base leading-relaxed">{record.summary}</p>
          <p className="text-muted text-xs mt-4 leading-relaxed">
            为保护朋友隐私，这里不显示具体回答内容。
          </p>
        </div>

        <div className="bg-highlight border border-primary/30 rounded-2xl p-5">
          <h2 className="text-title font-bold text-base mb-2">你也来查查自己的情况</h2>
          <p className="text-body text-sm leading-relaxed mb-4">
            3 分钟自查，3 色判决，看看你的续签或申请前有没有需要先处理的隐患。
          </p>
          <Link
            href="/visa-select"
            className="flex items-center justify-center w-full min-h-[56px] bg-primary hover:bg-primary-hover text-title font-bold rounded-xl text-base transition-all"
          >
            开始我的自查 →
          </Link>
        </div>

        <p className="text-center text-muted text-xs">
          分享链接 7 天内有效 · 不暴露具体答案
        </p>
      </div>
    </main>
  )
}
