import Link from 'next/link'
import { Bell, Camera, ClipboardCheck } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import Logo from '@/app/_components/v5/Logo'
import QuestionIntakeBox from '@/app/_components/QuestionIntakeBox'
import { ListRow, ListSection, SectionLabel } from '@/components/ui/tebiq'
import { getCurrentUser } from '@/lib/auth/session'
import { getMemberAccess, type MemberAccess } from '@/lib/billing/access'
import { listNeedsActionDimensions } from '@/lib/db/queries/checkDimensions'
import type { Member } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const user = await safeGetCurrentUser()

  if (!user) {
    return (
      <AppShell appBar={<HomeAppBar />} tabBar={<TabBar />}>
        <NewUserHome />
      </AppShell>
    )
  }

  const owner = { memberId: user.id, sessionId: null }
  const [access, checkItems] = await Promise.all([
    safeAccess(user),
    listNeedsActionDimensions(owner, 20).catch(() => []),
  ])

  return (
    <AppShell appBar={<HomeAppBar />} tabBar={<TabBar />}>
      <UserHome
        access={access}
        needsActionCount={checkItems.length}
      />
    </AppShell>
  )
}

function NewUserHome() {
  return (
    <>
      <BrandIntro />

      <div id="question" className="mt-6 scroll-mt-4">
        <QuestionIntakeBox sourcePage="/" />
      </div>
      <QuickTools />
    </>
  )
}

function UserHome({
  access,
  needsActionCount,
}: {
  access: MemberAccess | null
  needsActionCount: number
}) {
  const showTrial = access?.trialActive && access.trialDaysRemaining !== null

  return (
    <>
      {showTrial && (
        <section className="-mx-5 mb-4 border-b border-hairline bg-paper px-5 py-3">
          <p className="text-[13px] font-medium text-ink">
            试用期 残り {access.trialDaysRemaining ?? 0} 日
          </p>
        </section>
      )}

      <BrandIntro compact />

      <div id="question" className="mt-5 scroll-mt-4">
        <QuestionIntakeBox sourcePage="/" />
      </div>

      <QuickTools needsActionCount={needsActionCount} />
    </>
  )
}

function BrandIntro({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? 'pt-1' : 'pt-4'}>
      <Logo size="lg" />
      <h1 className={`${compact ? 'mt-4 text-[21px]' : 'mt-5 text-[24px]'} max-w-[320px] font-medium leading-[1.28] text-ink`}>
        材料有问题，问 TEBIQ
      </h1>
      <p className="mt-2 text-[13px] leading-[1.6] text-ash">
        日本手续下一步。
      </p>
    </section>
  )
}

function QuickTools({
  needsActionCount = 0,
}: {
  needsActionCount?: number
}) {
  return (
    <>
      <SectionLabel title="快捷工具" />
      <ListSection className="mt-3">
        <ListRow
          href="/photo"
          icon={<Camera size={19} strokeWidth={1.5} />}
          title="拍照"
          subtitle="看不懂通知时"
        />
        <ListRow
          href="/check"
          icon={<ClipboardCheck size={19} strokeWidth={1.5} />}
          title="续签检查"
          subtitle={needsActionCount > 0 ? `${needsActionCount} 项待确认` : '递交前确认'}
        />
        <ListRow
          href="/timeline"
          icon={<Bell size={19} strokeWidth={1.5} />}
          title="提醒"
          subtitle="期限别漏"
        />
      </ListSection>
    </>
  )
}

async function safeGetCurrentUser(): Promise<Member | null> {
  try {
    return await getCurrentUser()
  } catch {
    return null
  }
}

async function safeAccess(user: Member): Promise<MemberAccess | null> {
  try {
    return await getMemberAccess(user)
  } catch {
    return null
  }
}

function HomeAppBar() {
  return (
    <header className="flex h-[58px] flex-shrink-0 items-center justify-between bg-canvas px-5">
      <Logo size="sm" />
      <Link
        href="/timeline"
        aria-label="我的提醒"
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink"
      >
        <Bell size={20} strokeWidth={1.5} />
      </Link>
    </header>
  )
}
