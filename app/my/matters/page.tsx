'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import {
  listMatterDrafts,
  removeMatterDraft,
  type MatterDraft,
} from '@/lib/matters/storage'

// /my/matters — V0 Matter Draft list page.
//
// Per Context Pack §3 L2 + §5 我的事项：
//   "事项卡要写成"还差一步：……""现在先处理：……"，不要像项目管理软件"
//
// V0 storage = localStorage only. No auth, no backend, no sync.
// Each card links back to the original /answer/{id} render.

export default function MyMattersPage() {
  const [matters, setMatters] = useState<MatterDraft[] | null>(null)

  useEffect(() => {
    setMatters(listMatterDrafts())
  }, [])

  const onRemove = (id: string) => {
    removeMatterDraft(id)
    setMatters(listMatterDrafts())
  }

  return (
    <AppShell appBar={<AppBar title="我的事项" back="/" />} tabBar={<TabBar />}>
      {matters === null ? (
        // First-paint shimmer — keeps page from flashing "empty" while
        // localStorage reads.
        <section className="mt-4 rounded-[16px] border border-hairline bg-surface px-4 py-5">
          <div className="h-3 w-1/3 rounded bg-paper" />
        </section>
      ) : matters.length === 0 ? (
        <section className="mt-4 rounded-[16px] border border-hairline bg-surface px-4 py-6">
          <h1 className="text-[16px] font-medium text-ink">现在还没有保存的事项</h1>
          <p className="mt-2 text-[12px] leading-[1.7] text-ash">
            在回答页底部点「保存这个事项」，整理就会留在这里，下次直接回到原回答。
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex min-h-[40px] items-center rounded-btn bg-ink px-4 text-[13px] font-medium text-white"
          >
            去问一个问题
          </Link>
        </section>
      ) : (
        <section className="mt-4 grid gap-3">
          {matters.map(matter => (
            <article
              key={matter.id}
              className="rounded-[14px] border border-hairline bg-surface px-4 py-4"
            >
              <p className="text-[11px] leading-none text-ash">
                {matterUrgencyLabel(matter.urgency)}
              </p>
              <Link
                href={`/answer/${matter.answer_id}`}
                className="mt-2 block text-[15px] font-medium leading-[1.45] text-ink [overflow-wrap:anywhere] hover:underline"
              >
                {matter.title || '（未命名事项）'}
              </Link>
              {matter.summary && (
                <p className="mt-2 text-[12px] leading-[1.65] text-slate [overflow-wrap:anywhere]">
                  {matter.summary}
                </p>
              )}
              <div className="mt-3 flex items-center justify-between text-[11px] text-ash">
                <span>{formatDate(matter.created_at)}</span>
                <button
                  type="button"
                  onClick={() => onRemove(matter.id)}
                  className="text-ash hover:text-ink"
                >
                  移除
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      <p className="mt-6 text-[11px] leading-[1.7] text-ash">
        事项保存在你这台设备的浏览器里，换设备或清除浏览器数据会丢失。
      </p>
    </AppShell>
  )
}

function matterUrgencyLabel(u: MatterDraft['urgency']): string {
  switch (u) {
    case 'now':
      return '现在先处理'
    case 'soon':
      return '这周内处理'
    case 'later':
    default:
      return '还差一步'
  }
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    if (isNaN(d.valueOf())) return ''
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  } catch {
    return ''
  }
}
