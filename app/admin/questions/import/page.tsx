'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ClipboardList } from 'lucide-react'
import { PageShell } from '@/app/admin/_components/ui'

export default function AdminQuestionImportPage() {
  const [raw, setRaw] = useState('')
  const [savedCount, setSavedCount] = useState<number | null>(null)
  const rows = useMemo(() => normalizeRows(raw), [raw])

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (rows.length === 0) return
    setSavedCount(rows.length)
  }

  return (
    <PageShell
      title="Import Questions"
      subtitle="批量粘贴真实问题。当前页面先提供低摩擦导入 UI，后续接入正式写入流程。"
    >
      <Link
        href="/admin/questions"
        className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-ash hover:text-ink"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        返回问题列表
      </Link>

      <form onSubmit={submit} className="rounded-card border border-hairline bg-surface px-4 py-4">
        <label htmlFor="question-import" className="block text-[13px] font-medium text-ink">
          粘贴问题
        </label>
        <p className="mt-1 text-[11.5px] leading-[1.6] text-ash">
          每行一个问题，也可以直接粘贴多行原始咨询记录。
        </p>
        <textarea
          id="question-import"
          value={raw}
          onChange={event => {
            setRaw(event.target.value)
            setSavedCount(null)
          }}
          rows={16}
          placeholder={'例：\n公司搬迁后，技人国续签需要更新哪些材料？\n父母来日探亲，邀请理由书怎么准备？'}
          className="mt-3 min-h-[280px] w-full resize-y rounded-[12px] border border-hairline bg-canvas px-3 py-3 text-[13px] leading-[1.7] text-ink outline-none placeholder:text-haze focus:border-ink"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-[12px] bg-paper px-3 py-3">
          <div className="flex items-center gap-2 text-[12px] text-slate">
            <ClipboardList size={15} strokeWidth={1.5} />
            预览导入数量
          </div>
          <div className="numeric text-[24px] font-light leading-none text-ink">
            {rows.length}
            <span className="ml-1 text-[12px] text-ash">条</span>
          </div>
        </div>

        {rows.length > 0 && (
          <div className="mt-3 max-h-[180px] overflow-auto rounded-[12px] border border-hairline bg-canvas">
            {rows.slice(0, 8).map((row, index) => (
              <div key={`${row}-${index}`} className="border-b border-hairline px-3 py-2 text-[12px] leading-[1.55] text-slate last:border-b-0">
                {row}
              </div>
            ))}
            {rows.length > 8 && (
              <div className="px-3 py-2 text-[11px] text-ash">还有 {rows.length - 8} 条未显示</div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={rows.length === 0}
          className="mt-4 min-h-[44px] w-full rounded-btn bg-ink px-4 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-45"
        >
          导入问题
        </button>

        {savedCount !== null && (
          <p className="mt-3 rounded-[10px] bg-paper px-3 py-2 text-[12px] leading-[1.6] text-slate">
            已完成导入预览：{savedCount} 条。接入写入接口后可直接入库。
          </p>
        )}
      </form>
    </PageShell>
  )
}

function normalizeRows(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map(row => row.trim())
    .filter(Boolean)
}
