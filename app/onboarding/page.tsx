import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Building2, FileBadge, FileText, ReceiptText } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import { getCurrentUser } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '首次试拍 | TEBIQ',
  description: '选择一份现实文件，测试 TEBIQ 的识别和自动归档。',
  robots: { index: false, follow: false },
}

const CARDS = [
  {
    title: '拍最近一个市役所/区役所信封',
    icon: Building2,
  },
  {
    title: '拍在留卡/护照',
    icon: FileBadge,
  },
  {
    title: '拍孩子学校/保育园文件',
    icon: FileText,
  },
  {
    title: '拍有金额或期限的通知',
    icon: ReceiptText,
  },
] as const

export default async function OnboardingPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/register?next=/onboarding')

  return (
    <AppShell appBar={<AppBar title="首次试拍" back="/" />}>
      <section className="pt-3">
        <h1 className="text-[20px] font-semibold leading-tight text-ink">选择一份现实文件</h1>
        <p className="mt-2 text-[12px] leading-[1.65] text-ash">
          7 天试用已开启。拍一份真实文件，结果会自动进入时间线。
        </p>
      </section>

      <section className="mt-4 grid gap-3">
        {CARDS.map(({ title, icon: Icon }) => (
          <article
            key={title}
            className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-cool-blue text-ink">
                <Icon size={19} strokeWidth={1.55} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-[14px] font-medium leading-snug text-ink">{title}</h2>
                <p className="mt-1.5 text-[12px] leading-[1.65] text-ash">
                  拍一张测试TEBIQ识别能力，自动归档到时间线
                </p>
                <Link
                  href="/photo"
                  className="mt-3 inline-flex min-h-[34px] items-center justify-center rounded-btn border border-hairline bg-canvas px-3 text-[12px] font-medium text-ink"
                >
                  选择
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-5 text-center">
        <Link href="/" className="text-[12px] text-ash underline-offset-4 hover:underline">
          跳过
        </Link>
      </div>
    </AppShell>
  )
}
