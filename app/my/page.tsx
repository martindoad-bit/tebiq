'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { HistoryRecord } from '@/lib/auth/store'

const LS_USER_KEY = 'tebiq_user'

interface ClientUser {
  phone: string
}

interface ReminderState {
  date: string
  setAt: string
  daysLeft: number
}

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<ClientUser | null>(null)
  const [history, setHistory] = useState<HistoryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [reminder, setReminder] = useState<ReminderState | null>(null)

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

        const [listData, remData] = await Promise.all([
          fetch('/api/results/list', { cache: 'no-store' }).then(r => r.json()),
          fetch('/api/reminder/get', { cache: 'no-store' }).then(r => r.json()),
        ])
        setHistory(listData?.history ?? [])
        if (remData?.reminder) {
          setReminder({
            date: remData.reminder.date,
            setAt: remData.reminder.setAt,
            daysLeft: remData.daysLeft,
          })
        }
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
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="TEBIQ 首页"><img src="/logo.svg" alt="TEBIQ" width={120} height={40} className="h-9 w-auto" /></Link>
          <button
            onClick={handleLogout}
            className="text-body hover:text-title text-sm"
          >
            退出登录
          </button>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md md:max-w-2xl mx-auto">
          {/* 续签提醒横幅 */}
          {reminder && reminder.daysLeft <= 90 && reminder.daysLeft >= 0 && (
            <ReminderBanner reminder={reminder} />
          )}

          <h1 className="text-2xl font-bold mb-2">我的测试记录</h1>
          {user && (
            <p className="text-body text-sm mb-6">
              当前登录：
              <span className="text-primary font-bold">{user.phone}</span>
            </p>
          )}

          {/* 重新自查按钮 */}
          <Link
            href="/visa-select"
            className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl text-base transition-all mb-6"
          >
            开始新的自查 →
          </Link>

          {/* 续签提醒设置 */}
          <ReminderForm
            current={reminder}
            onChange={r => setReminder(r)}
          />

          {/* 历史记录 */}
          <h2 className="text-primary font-bold text-sm mb-3 mt-8">测试历史</h2>
          {loading ? (
            <p className="text-body text-sm">载入中…</p>
          ) : history.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              {history.map((r, i) => (
                <HistoryRow key={`${r.date}-${i}`} record={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function ReminderBanner({ reminder }: { reminder: ReminderState }) {
  const tone =
    reminder.daysLeft <= 30
      ? 'bg-red-600 border-[#DC2626]'
      : reminder.daysLeft <= 60
        ? 'bg-amber-600 border-primary'
        : 'bg-blue-600 border-blue-700'
  return (
    <div className={`${tone} text-title rounded-2xl p-4 mb-6 leading-relaxed text-sm`}>
      <div className="font-bold text-base mb-1">
        ⏰ 在留期限剩余 {reminder.daysLeft} 天
      </div>
      <div className="text-title/90 text-xs">
        到期日 {reminder.date} · 建议尽快开始准备续签材料
      </div>
    </div>
  )
}

function ReminderForm({
  current,
  onChange,
}: {
  current: ReminderState | null
  onChange: (r: ReminderState | null) => void
}) {
  const [date, setDate] = useState(current?.date ?? '')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function save() {
    setMsg('')
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setMsg('请选择正确的日期')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/reminder/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date }),
      })
      if (!res.ok) {
        setMsg('保存失败')
        return
      }
      const data = await res.json()
      const today = new Date()
      const expiry = new Date(date + 'T00:00:00')
      const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      onChange({ date: data.reminder.date, setAt: data.reminder.setAt, daysLeft })
      setMsg('已保存')
    } finally {
      setSaving(false)
    }
  }

  async function clear() {
    if (!current) return
    await fetch('/api/reminder/save', { method: 'DELETE' })
    setDate('')
    onChange(null)
    setMsg('已清除')
  }

  return (
    <div className="bg-card border border-line rounded-2xl p-5 mb-6">
      <h3 className="text-primary font-bold text-sm mb-2">下次续签提醒</h3>
      <p className="text-body text-xs leading-relaxed mb-3">
        填入在留卡到期日，距到期 90 天内访问会自动提醒
      </p>
      <div className="flex gap-2">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="flex-1 bg-base border-2 border-line focus:border-primary rounded-xl px-3 py-2 text-title text-base outline-none transition-colors"
        />
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-slate-900 font-bold px-4 rounded-xl text-sm transition-all"
        >
          {saving ? '...' : '保存'}
        </button>
      </div>
      {current && (
        <button
          type="button"
          onClick={clear}
          className="text-muted hover:text-body text-xs mt-2"
        >
          清除提醒
        </button>
      )}
      {msg && <p className="text-[#16A34A] text-xs mt-2">{msg}</p>}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="bg-card border border-line rounded-2xl p-8 text-center">
      <p className="text-body text-sm leading-relaxed">
        还没有测试记录。
        <br />
        完成一次自查后会自动保存到这里。
      </p>
    </div>
  )
}

function HistoryRow({ record }: { record: HistoryRecord }) {
  const [open, setOpen] = useState(false)
  const verdictLabel = {
    red: { text: '高风险', cls: 'bg-[#DC2626] text-white' },
    yellow: { text: '需注意', cls: 'bg-primary text-white' },
    green: { text: '可申请', cls: 'bg-[#16A34A] text-white' },
  }[record.result]

  const date = new Date(record.date)
  const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
    date.getDate(),
  ).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}`

  return (
    <div className="bg-card border border-line rounded-2xl p-4">
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 ${verdictLabel.cls} rounded-lg px-3 py-2 text-xs font-bold min-w-[64px] text-center`}
        >
          {verdictLabel.text}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-title text-sm font-bold">技人国续签自查</div>
          <div className="text-body text-xs mt-1">{dateStr}</div>
          {record.triggeredItems.length > 0 && (
            <div className="text-muted text-xs mt-1">
              触发 {record.triggeredItems.length} 项风险
            </div>
          )}
        </div>
      </div>
      <p className="text-body text-sm leading-relaxed mt-3 pt-3 border-t border-line">
        {record.summary}
      </p>
      {record.triggeredItems.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            className="text-primary hover:text-primary-hover text-sm font-bold mt-3"
          >
            {open ? '收起详情 ▴' : '查看详情 ▾'}
          </button>
          {open && (
            <ul className="mt-3 space-y-2">
              {record.triggeredItems.map((item, i) => (
                <li key={i} className="flex gap-2 text-body text-sm leading-relaxed">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
