'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { SavedResult } from '@/lib/auth/store'

const LS_USER_KEY = 'tebiq_user'

interface ClientUser {
  id: string
  phone: string
}

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<ClientUser | null>(null)
  const [results, setResults] = useState<SavedResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch('/api/auth/me', { cache: 'no-store' })
        const meData = await meRes.json()
        if (!meData?.user) {
          localStorage.removeItem(LS_USER_KEY)
          router.replace('/login?next=/my')
          return
        }
        setUser(meData.user)
        localStorage.setItem(LS_USER_KEY, JSON.stringify(meData.user))

        const listRes = await fetch('/api/results/list', { cache: 'no-store' })
        const listData = await listRes.json()
        setResults(listData?.results ?? [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [router])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem(LS_USER_KEY)
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-wider text-amber-400 text-lg">
            TEBIQ
          </Link>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-slate-200 text-sm"
          >
            退出登录
          </button>
        </div>
      </header>

      <div className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">我的测试记录</h1>
          {user && (
            <p className="text-slate-400 text-sm mb-8">
              当前登录：
              <span className="text-amber-400 font-bold">{user.phone}</span>
            </p>
          )}

          {loading ? (
            <p className="text-slate-400">载入中…</p>
          ) : results.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              {results.map(r => (
                <ResultRow key={r.id} record={r} />
              ))}
            </div>
          )}

          <Link
            href="/visa-select"
            className="flex items-center justify-center w-full min-h-[60px] bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-4 rounded-xl text-base transition-all mt-8"
          >
            开始新的自查 →
          </Link>
        </div>
      </div>
    </main>
  )
}

function EmptyState() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
      <p className="text-slate-400 text-sm leading-relaxed">
        还没有测试记录。
        <br />
        完成一次自查后会自动保存到这里。
      </p>
    </div>
  )
}

function ResultRow({ record }: { record: SavedResult }) {
  const verdictLabel = {
    red: { text: '高风险', cls: 'bg-red-500 text-white' },
    yellow: { text: '需注意', cls: 'bg-amber-400 text-slate-900' },
    green: { text: '可申请', cls: 'bg-emerald-500 text-white' },
  }[record.verdict]

  const date = new Date(record.createdAt)
  const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
    date.getDate(),
  ).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}`

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4">
      <div
        className={`flex-shrink-0 ${verdictLabel.cls} rounded-lg px-3 py-2 text-xs font-bold min-w-[64px] text-center`}
      >
        {verdictLabel.text}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-bold">技人国续签自查</div>
        <div className="text-slate-400 text-xs mt-1">{dateStr}</div>
        {record.triggered.length > 0 && (
          <div className="text-slate-500 text-xs mt-1">
            触发 {record.triggered.length} 项风险
          </div>
        )}
      </div>
    </div>
  )
}
