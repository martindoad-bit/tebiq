import Link from 'next/link'
import { Archive, ArrowRight, Pin } from 'lucide-react'
import TabBar from '@/app/_components/v5/TabBar'
import {
  BrandHeader,
  ConsultationShell,
  SectionLabel,
  Surface,
} from '@/components/ui/consultation-alpha'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 我的',
  robots: { index: false, follow: false },
}

interface HubCard {
  href: string
  eyebrow: string
  title: string
  body: string
  cta: string
  Icon: typeof Archive
}

const CARDS: HubCard[] = [
  {
    href: '/me/consultations',
    eyebrow: '自动记录',
    title: '咨询记录',
    body: '同一浏览器问过的问题会自动留在这里。可以回看、删除，也可以再问一遍。',
    cta: '查看记录',
    Icon: Archive,
  },
  {
    href: '/me/matters',
    eyebrow: '手动保存',
    title: '我的事项',
    body: '把咨询过的事保存起来继续处理：补充背景、关联材料、找书士，或者直接关闭。',
    cta: '查看事项',
    Icon: Pin,
  },
]

export default function MyHubPage() {
  return (
    <ConsultationShell tabBar={<TabBar />}>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="我的"
          title="我的咨询和事项"
          description="所有记录都跟着这台设备的浏览器。换设备或清空数据后可能看不到旧内容。"
        />
        <SectionLabel>入口</SectionLabel>
        <ul className="space-y-3">
          {CARDS.map(card => {
            const { Icon } = card
            return (
              <li key={card.href}>
                <Link href={card.href} className="block">
                  <Surface className="space-y-3 transition-colors hover:border-[var(--tebiq-cool-gray)]">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-btn border border-[var(--tebiq-soft-gray)] bg-white text-[var(--tebiq-ink-blue)]">
                        <Icon className="h-4 w-4" strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <SectionLabel>{card.eyebrow}</SectionLabel>
                        <h2 className="mt-1 text-[17px] font-semibold text-[var(--tebiq-ink-blue)]">
                          {card.title}
                        </h2>
                        <p className="mt-1 text-[14px] leading-relaxed text-[var(--tebiq-deep-slate)]">
                          {card.body}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex min-h-9 items-center gap-1 text-[13.5px] font-medium text-[var(--tebiq-ink-blue)]">
                      {card.cta}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </span>
                  </Surface>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </ConsultationShell>
  )
}
