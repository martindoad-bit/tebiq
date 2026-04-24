'use client'
import { useState } from 'react'
import Link from 'next/link'
import { policyUpdates, type PolicyUpdate } from '@/lib/knowledge/policy-updates'

export default function UpdatesPage() {
  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页"><img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" /><div><div className="text-xl font-bold text-title leading-none">TEBIQ</div><div className="text-xs text-muted leading-tight mt-0.5">てびき</div></div></Link>
          <Link href="/knowledge" className="text-body hover:text-title text-sm">
            ← 知识库
          </Link>
        </div>
      </header>

      <div className="px-4 py-8 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))] flex-1">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight text-title">
            最新政策动态
          </h1>
          <p className="text-body text-sm md:text-base leading-relaxed mb-8">
            2025 年 10 月以后入管局发布的重大政策变化（按时间倒序）
          </p>

          <ol className="space-y-4">
            {policyUpdates.map(p => (
              <UpdateCard key={p.date + p.title} update={p} />
            ))}
          </ol>

          <p className="text-center text-muted text-xs mt-10 leading-relaxed">
            信息来源以入管局官网为准；本页内容不构成法律意见，标注[待书士审核]条目正在审核更新中
          </p>
        </div>
      </div>
    </main>
  )
}

function UpdateCard({ update }: { update: PolicyUpdate }) {
  const [open, setOpen] = useState(false)
  const typeLabel =
    update.type === 'gijinkoku'
      ? '技人国'
      : update.type === 'keiei'
        ? '经营管理'
        : '其他'

  return (
    <li className="bg-card border border-line rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 pt-5 pb-3 flex items-start gap-3">
        <div className="flex-shrink-0 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-full">
          {update.date}
        </div>
        <div className="text-xs text-muted">{typeLabel}</div>
      </div>
      <div className="px-5 pb-3">
        <h2 className="text-title text-base md:text-lg font-bold leading-snug mb-2">
          {update.title}
        </h2>
        <p className="text-body text-sm leading-relaxed">{update.summary}</p>
      </div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-5 py-3 border-t border-line hover:bg-highlight/40 transition-colors text-primary text-sm font-bold"
        aria-expanded={open}
      >
        {open ? '收起详情 ▴' : '查看详情 ▾'}
      </button>
      {open && (
        <div className="px-5 py-4 bg-base/40 border-t border-line">
          <p className="text-body text-sm leading-relaxed whitespace-pre-line">
            {update.detail}
          </p>
        </div>
      )}
    </li>
  )
}
