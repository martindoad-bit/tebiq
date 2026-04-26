import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AlertTriangle, CheckCircle2, CircleAlert, Clock3, Lock, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Logo from '@/app/_components/v5/Logo'
import { storage } from '@/lib/storage'
import type { ShareRecord } from '@/app/api/share/create/route'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const VERDICT_META = {
  red: {
    label: '红色',
    sub: '存在高风险项',
    hero: 'bg-[rgba(226,87,76,0.10)] border-danger text-danger',
    chip: 'bg-[rgba(226,87,76,0.10)] text-danger',
    icon: CircleAlert,
  },
  yellow: {
    label: '黄色',
    sub: '需要先解决几个问题',
    hero: 'bg-accent-2/55 border-accent text-ink',
    chip: 'bg-accent-2 text-ink',
    icon: AlertTriangle,
  },
  green: {
    label: '绿色',
    sub: '前置条件均通过',
    hero: 'bg-[rgba(87,167,123,0.12)] border-success text-success',
    chip: 'bg-[rgba(87,167,123,0.12)] text-success',
    icon: CheckCircle2,
  },
} satisfies Record<
  ShareRecord['verdict'],
  {
    label: string
    sub: string
    hero: string
    chip: string
    icon: LucideIcon
  }
>

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
  const Icon = meta.icon

  return (
    <main className="min-h-screen bg-canvas pb-[env(safe-area-inset-bottom)] text-ink">
      <header className="sticky top-0 z-10 border-b border-hairline bg-canvas/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-phone items-center justify-between px-4">
          <Link href="/" aria-label="TEBIQ 首页">
            <Logo size="sm" />
          </Link>
          <span className="rounded-full bg-surface px-2.5 py-1 text-[10.5px] text-ash shadow-card">
            分享结果
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-phone px-4 py-5">
        <section className={`rounded-card border px-4 py-5 text-center shadow-card ${meta.hero}`}>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[15px] bg-surface/80">
            <Icon size={26} strokeWidth={1.6} />
          </div>
          <div className="mt-3 text-[11px] font-medium leading-none text-ash">
            朋友分享 · TEBIQ 自查
          </div>
          <h1 className="mt-2 text-[19px] font-medium leading-snug text-ink">
            你的朋友刚做了一次签证自查
          </h1>
          <p className="mt-2 text-[12px] leading-relaxed text-ash">
            结果：{meta.label}（{meta.sub}）
          </p>
        </section>

        <section className="mt-4 rounded-card border border-hairline bg-surface p-4 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[13px] font-medium text-ink">结果摘要</h2>
            <span className={`rounded-[8px] px-2 py-1 text-[10px] font-medium leading-none ${meta.chip}`}>
              {meta.label}
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-[1.65] text-slate">
            {record.summary}
          </p>
          <div className="mt-4 flex items-start gap-2 rounded-[11px] bg-canvas px-3 py-2.5">
            <Lock size={14} strokeWidth={1.55} className="mt-0.5 flex-shrink-0 text-ash" />
            <p className="text-[11px] leading-[1.55] text-ash">
              为保护朋友隐私，这里不显示具体回答内容。
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-card border border-hairline bg-surface p-4 shadow-card">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
              <ShieldCheck size={17} strokeWidth={1.55} />
            </span>
            <div>
              <h2 className="text-[13px] font-medium leading-snug text-ink">
                你也来查查自己的情况
              </h2>
              <p className="mt-1 text-[11px] leading-[1.55] text-ash">
                3 分钟自查，先确认续签前有没有需要处理的事项。
              </p>
            </div>
          </div>
          <Link
            href="/visa-select"
            className="mt-4 flex min-h-[46px] w-full items-center justify-center rounded-btn bg-accent px-4 py-3 text-[13px] font-medium text-ink shadow-cta"
          >
            开始我的自查
          </Link>
        </section>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-ash">
          <Clock3 size={13} strokeWidth={1.55} />
          分享链接 7 天内有效
        </p>
      </div>
    </main>
  )
}
