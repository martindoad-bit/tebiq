import type { ReactNode } from 'react'
import AppShell from './AppShell'
import AppBar from './AppBar'

interface Props {
  articleSchema: Record<string, unknown>
  title: string
  updated: string
  children: ReactNode
}

export function SeoVisaArticleShell({
  articleSchema,
  title,
  updated,
  children,
}: Props) {
  return (
    <AppShell appBar={<AppBar title="签证指南" back="/" />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="pt-3 pb-5">
        <header className="rounded-card border border-hairline bg-surface px-4 py-4">
          <div className="mb-2 inline-flex rounded-[8px] bg-paper px-2 py-1 text-[10px] font-medium leading-none text-ink">
            SEO 指南
          </div>
          <h1 className="text-[21px] font-medium leading-[1.42] text-ink">{title}</h1>
          <p className="mt-2 text-[11px] leading-[1.6] text-ash">{updated}</p>
        </header>
        <div className="mt-3">{children}</div>
      </article>
    </AppShell>
  )
}

export function SeoSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="mb-4 scroll-mt-16 rounded-card border border-hairline bg-surface p-4"
    >
      <h2 className="mb-3 text-[16px] font-medium leading-snug text-ink">{title}</h2>
      <div className="space-y-3 text-[13px] leading-[1.75] text-slate">{children}</div>
    </section>
  )
}

export function SeoBullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2 text-[13px] leading-[1.75] text-slate">
      <span className="mt-[0.72em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-haze" />
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  )
}
