import { cookies } from 'next/headers'
import Link from 'next/link'
import { ArrowRight, BookOpen, MessageSquare, Pin } from 'lucide-react'
import TabBar from '@/app/_components/v5/TabBar'
import {
  BrandHeader,
  ConsultationShell,
  MetaPill,
  SectionLabel,
  Surface,
} from '@/components/ui/consultation-alpha'
import {
  listUserMattersForViewer,
  type MatterStatus,
  type UserMatter,
} from '@/lib/db/queries/userMatters'
import MatterTabs from './MatterTabs'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 我的事项',
  robots: { index: false, follow: false },
}

interface PageProps {
  searchParams: { status?: string }
}

const TAB_STATUSES: Array<{ key: 'active' | 'closed'; label: string }> = [
  { key: 'active', label: '进行中' },
  { key: 'closed', label: '已关闭' },
]

export default async function MyMattersPage({ searchParams }: PageProps) {
  const cookieStore = cookies()
  const viewerId = cookieStore.get('tebiq_viewer')?.value ?? null
  const requested = searchParams?.status === 'closed' ? 'closed' : 'active'
  const tab: 'active' | 'closed' = requested

  let rows: UserMatter[] = []
  let unavailable = false
  if (viewerId) {
    try {
      // 'active' tab also surfaces 'paused' matters so users don't lose them.
      const wanted: MatterStatus | 'all' = tab === 'active' ? 'all' : 'closed'
      const all = await listUserMattersForViewer(viewerId, { status: wanted, limit: 100 })
      rows = tab === 'active' ? all.filter(m => m.status !== 'closed') : all
    } catch (error) {
      unavailable = true
      console.error('[me/matters] failed to load matters', error)
    }
  }

  return (
    <ConsultationShell tabBar={<TabBar />}>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="我的事项"
          title="正在跟进的事"
          description="把某次咨询保存成一个事项后，可以继续补充背景、再问、关联材料或书士。这里只在这台浏览器里看得到。"
          action={
            <Link
              href="/me/consultations"
              className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 text-[13px] font-medium text-[var(--tebiq-ink-blue)]"
            >
              <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.6} />
              咨询记录
            </Link>
          }
        />

        <MatterTabs current={tab} tabs={TAB_STATUSES} />

        {!viewerId && (
          <EmptyState
            title="还没有保存的事项"
            body="提问后，在咨询详情页可以把这件事保存起来继续处理。"
          />
        )}
        {viewerId && unavailable && (
          <EmptyState
            title="暂时没取到事项"
            body="稍后再打开通常就能看到。这不影响正常提问。"
          />
        )}
        {viewerId && !unavailable && rows.length === 0 && (
          <EmptyState
            title={tab === 'active' ? '当前没有进行中的事项' : '当前没有已关闭的事项'}
            body={
              tab === 'active'
                ? '咨询详情页底部有「把这件事保存起来继续处理」。'
                : '关闭后的事项会出现在这里，可以回看。'
            }
          />
        )}

        {rows.length > 0 && (
          <ul className="space-y-2">
            {rows.map(matter => (
              <li key={matter.id}>
                <Surface as="article" className="space-y-3 transition-colors hover:border-[var(--tebiq-cool-gray)]">
                  <Link href={`/me/matters/${encodeURIComponent(matter.id)}`} className="block">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <SectionLabel>{new Date(matter.updatedAt).toLocaleDateString('zh-CN')} 更新</SectionLabel>
                        <p className="mt-1 line-clamp-2 text-[17px] font-medium leading-snug text-[var(--tebiq-ink-blue)]">
                          {matter.title}
                        </p>
                      </div>
                      <StatusPill status={matter.status} />
                    </div>
                  </Link>
                  <div className="flex flex-wrap gap-2">
                    {matter.originConsultationId && (
                      <MetaPill icon={MessageSquare}>来自一次咨询</MetaPill>
                    )}
                    {Array.isArray(matter.supplementalFacts) && matter.supplementalFacts.length > 0 && (
                      <MetaPill icon={Pin}>补充 ×{matter.supplementalFacts.length}</MetaPill>
                    )}
                    {Array.isArray(matter.linkedMaterialIds) && matter.linkedMaterialIds.length > 0 && (
                      <MetaPill icon={BookOpen}>材料 ×{matter.linkedMaterialIds.length}</MetaPill>
                    )}
                    {Array.isArray(matter.linkedConsultationIds) && matter.linkedConsultationIds.length > 0 && (
                      <MetaPill icon={MessageSquare}>关联咨询 ×{matter.linkedConsultationIds.length}</MetaPill>
                    )}
                  </div>
                  <Link
                    href={`/me/matters/${encodeURIComponent(matter.id)}`}
                    className="inline-flex min-h-9 items-center gap-1 text-[13.5px] font-medium text-[var(--tebiq-ink-blue)]"
                  >
                    打开事项
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                  </Link>
                </Surface>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ConsultationShell>
  )
}

function StatusPill({ status }: { status: string }) {
  const label = status === 'closed' ? '已关闭' : status === 'paused' ? '暂停' : '进行中'
  const tone =
    status === 'closed'
      ? 'border-[var(--tebiq-soft-gray)] text-[var(--tebiq-deep-slate)]'
      : status === 'paused'
        ? 'border-[var(--tebiq-warm-amber)] text-[var(--tebiq-ink-blue)]'
        : 'border-[var(--tebiq-ink-blue)] text-[var(--tebiq-ink-blue)]'
  return (
    <span className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11.5px] font-medium ${tone}`}>
      {label}
    </span>
  )
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Surface className="space-y-3 text-center">
      <div>
        <h2 className="text-[17px] font-semibold text-[var(--tebiq-ink-blue)]">{title}</h2>
        <p className="mt-1 text-[14px] leading-relaxed text-[var(--tebiq-deep-slate)]">{body}</p>
      </div>
      <Link
        href="/me/consultations"
        className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-4 py-2 text-[14px] font-medium text-[var(--tebiq-off-white)]"
      >
        去咨询记录
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
      </Link>
    </Surface>
  )
}
