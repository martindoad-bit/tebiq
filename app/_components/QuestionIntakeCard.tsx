'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader, PencilLine } from 'lucide-react'

const POPULAR_SITUATIONS = [
  '办公室搬迁',
  '换工作',
  '父母来日',
  '公司休眠',
  '签证转换',
] as const

interface Props {
  sourcePage: string
  variant?: 'home' | 'compact'
  className?: string
}

export default function QuestionIntakeCard({
  sourcePage,
  variant = 'compact',
  className = '',
}: Props) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const isHome = variant === 'home'

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const raw = query.trim()
    if (!raw || busy) return
    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch('/api/decision-lab/query', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: raw, sourcePage }),
      })
      const json = await res.json() as {
        ok?: boolean
        data?: { slug?: string | null; message?: string }
      }
      const slug = json.data?.slug
      if (res.ok && slug) {
        router.push(`/decision-lab/${slug}`)
        return
      }
      setMessage(json.data?.message ?? '已记录。TEBIQ 会根据真实问题继续整理手续路径。')
    } catch {
      setMessage('请求失败。可以稍后再提交，或先查看已整理内容。')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section
      className={`rounded-card border border-hairline bg-surface ${
        isHome ? 'px-4 py-4' : 'px-4 py-3'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-paper text-ink">
          <PencilLine size={17} strokeWidth={1.5} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className={`${isHome ? 'text-[18px]' : 'text-[13px]'} font-medium leading-snug text-ink`}>
            {isHome ? '你现在遇到什么情况？' : '找不到你的情况？'}
          </h2>
          {!isHome && (
            <p className="mt-1 text-[11.5px] leading-[1.6] text-ash">
              把你现在遇到的问题写下来，TEBIQ 会根据真实问题继续整理手续路径。
            </p>
          )}
        </div>
      </div>

      <form onSubmit={submit} className={isHome ? 'mt-4' : 'mt-3'}>
        <textarea
          value={query}
          onChange={event => setQuery(event.target.value)}
          rows={isHome ? 4 : 3}
          maxLength={1000}
          placeholder="例：换工作后，公司让我补在留相关材料"
          className="w-full resize-none rounded-[12px] border border-hairline bg-canvas px-3.5 py-3 text-[14px] leading-[1.65] text-ink outline-none transition-colors placeholder:text-haze focus:border-ink"
        />
        {isHome && (
          <div className="mt-3">
            <p className="text-[11px] leading-none text-ash">热门情况</p>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {POPULAR_SITUATIONS.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className="flex-shrink-0 rounded-[10px] border border-hairline bg-canvas px-3 py-1.5 text-[11px] font-normal text-slate active:bg-paper"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          type="submit"
          disabled={busy || !query.trim()}
          className="focus-ring mt-3 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-btn bg-ink px-4 py-2 text-[13px] font-medium text-white transition-colors active:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-45"
        >
          {busy ? (
            <>
              <Loader size={14} strokeWidth={1.5} className="animate-spin" />
              处理中...
            </>
          ) : (
            <>
              提交情况
              <ArrowRight size={14} strokeWidth={1.5} />
            </>
          )}
        </button>
      </form>

      {message && (
        <p className="mt-3 rounded-[10px] bg-paper px-3 py-2 text-[11.5px] leading-[1.6] text-slate">
          {message}
        </p>
      )}
    </section>
  )
}
