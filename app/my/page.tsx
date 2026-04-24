'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { HistoryRecord } from '@/lib/auth/store'
import type { UserProfile, YearsInJapan, CompanyType } from '@/lib/auth/profile'

const LS_USER_KEY = 'tebiq_user'

interface ClientUser {
  phone: string
}

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<ClientUser | null>(null)
  const [history, setHistory] = useState<HistoryRecord[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
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

        const [listData, profileData] = await Promise.all([
          fetch('/api/results/list', { cache: 'no-store' }).then(r => r.json()),
          fetch('/api/profile/get', { cache: 'no-store' }).then(r => r.json()),
        ])
        setHistory(listData?.history ?? [])
        if (profileData?.profile) setProfile(profileData.profile)
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
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
          <button onClick={handleLogout} className="text-body hover:text-title text-sm">
            退出登录
          </button>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md md:max-w-2xl mx-auto">
          {profile && <ExpiryReminder expiryDate={profile.expiryDate} />}

          <h1 className="text-2xl font-bold mb-2">我的账号</h1>
          {user && (
            <p className="text-body text-sm mb-6">
              当前登录：<span className="text-primary font-bold">{user.phone}</span>
            </p>
          )}

          {!loading && <ProfileSection profile={profile} onChange={setProfile} />}
          <AskAssistant hasProfile={!!profile} />

          <Link
            href="/visa-select"
            className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-title font-bold py-4 rounded-xl text-base transition-all my-6"
          >
            开始新的自查 →
          </Link>

          <h2 className="text-primary font-bold text-sm mb-3 mt-8">测试历史</h2>
          {history.length > 0 && <HistorySummary records={history} />}
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

function ExpiryReminder({ expiryDate }: { expiryDate: string }) {
  const today = new Date()
  const expiry = new Date(expiryDate + 'T00:00:00')
  const days = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (days < 0) return null

  let bg = ''
  let title = ''
  let sub = ''
  if (days < 30) {
    bg = 'bg-[#DC2626]'
    title = `非常紧急：剩余 ${days} 天`
    sub = '请立刻联系书士开始办理'
  } else if (days < 60) {
    bg = 'bg-orange-500'
    title = `需要尽快提交：剩余 ${days} 天`
    sub = '建议立刻准备材料并提交申请'
  } else if (days < 90) {
    bg = 'bg-primary'
    title = `建议开始准备：剩余 ${days} 天`
    sub = '续签材料部分需要 2-3 周开具'
  } else {
    bg = 'bg-[#16A34A]'
    title = `目前不紧急：剩余 ${days} 天`
    sub = '建议到期前 3 个月开始准备'
  }

  return (
    <div className={`${bg} text-white rounded-2xl p-4 mb-6 leading-relaxed text-sm`}>
      <div className="font-bold text-base mb-1">⏰ {title}</div>
      <div className="text-white/90 text-xs">到期日 {expiryDate} · {sub}</div>
    </div>
  )
}

function ProfileSection({
  profile,
  onChange,
}: {
  profile: UserProfile | null
  onChange: (p: UserProfile) => void
}) {
  const [editing, setEditing] = useState(!profile)
  if (!editing && profile) {
    return (
      <div className="bg-card border border-line rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-title font-bold text-base">我的情况</h3>
          <button onClick={() => setEditing(true)} className="text-primary text-sm font-bold">编辑</button>
        </div>
        <ul className="text-body text-sm space-y-1">
          <li>签证：<span className="font-bold">{profile.visaType}</span></li>
          <li>到期日：<span className="font-bold">{profile.expiryDate}</span></li>
          <li>在日：<span className="font-bold">{profile.yearsInJapan}</span></li>
          <li>公司类别：<span className="font-bold">{profile.companyType}</span></li>
          {profile.recentChanges.length > 0 && (
            <li>最近变化：<span className="font-bold">{profile.recentChanges.join('、')}</span></li>
          )}
        </ul>
      </div>
    )
  }
  return <ProfileForm initial={profile} onSaved={p => { onChange(p); setEditing(false) }} />
}

function ProfileForm({
  initial,
  onSaved,
}: {
  initial: UserProfile | null
  onSaved: (p: UserProfile) => void
}) {
  const [visaType, setVisaType] = useState(initial?.visaType ?? '技人国')
  const [expiryDate, setExpiryDate] = useState(initial?.expiryDate ?? '')
  const [yearsInJapan, setYears] = useState<YearsInJapan>(initial?.yearsInJapan ?? '1-3')
  const [companyType, setCompany] = useState<CompanyType>(initial?.companyType ?? 'normal')
  const [recentChanges, setChanges] = useState<string[]>(initial?.recentChanges ?? [])
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  function toggleChange(c: string) {
    setChanges(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]))
  }

  async function save() {
    setErr('')
    setSaving(true)
    try {
      const res = await fetch('/api/profile/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visaType, expiryDate, yearsInJapan, companyType, recentChanges }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErr(data?.error ?? '保存失败')
        return
      }
      onSaved(data.profile)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-card border border-line rounded-2xl p-5 mb-6 shadow-sm">
      <h3 className="text-title font-bold text-base mb-2">建立你的档案</h3>
      <p className="text-muted text-xs mb-4 leading-relaxed">
        告诉我你的基本情况，我可以给你更准确的信息
      </p>

      <Field label="① 签证类型">
        <select value={visaType} onChange={e => setVisaType(e.target.value)} className="w-full bg-base border border-line rounded-lg px-3 py-2 text-title text-base">
          {['技人国', '经营管理', '配偶者', '永住者', '特定技能', '定住者'].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </Field>
      <Field label="② 在留卡到期日">
        <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="w-full bg-base border border-line rounded-lg px-3 py-2 text-title text-base" />
      </Field>
      <Field label="③ 在日本生活了多久">
        <select value={yearsInJapan} onChange={e => setYears(e.target.value as YearsInJapan)} className="w-full bg-base border border-line rounded-lg px-3 py-2 text-title text-base">
          <option value="<1">不足 1 年</option>
          <option value="1-3">1-3 年</option>
          <option value="3-5">3-5 年</option>
          <option value="5+">5 年以上</option>
        </select>
      </Field>
      <Field label="④ 雇主公司类别">
        <select value={companyType} onChange={e => setCompany(e.target.value as CompanyType)} className="w-full bg-base border border-line rounded-lg px-3 py-2 text-title text-base">
          <option value="listed">上市 / 大企业</option>
          <option value="normal">普通公司</option>
          <option value="self">自营 / 经营管理</option>
          <option value="unknown">不确定</option>
        </select>
      </Field>
      <Field label="⑤ 最近一年内有什么变化（可多选）">
        <div className="space-y-2">
          {[
            { v: 'changed-job', l: '换工作' },
            { v: 'moved', l: '搬家' },
            { v: 'married', l: '结婚 / 离婚' },
            { v: 'none', l: '没有变化' },
          ].map(c => (
            <label key={c.v} className="flex items-center gap-2 text-body text-sm">
              <input type="checkbox" checked={recentChanges.includes(c.v)} onChange={() => toggleChange(c.v)} />
              {c.l}
            </label>
          ))}
        </div>
      </Field>
      {err && <p className="text-[#DC2626] text-sm mb-2">{err}</p>}
      <button onClick={save} disabled={saving} className="w-full min-h-[48px] bg-primary hover:bg-primary-hover disabled:opacity-50 text-title font-bold rounded-xl mt-2">
        {saving ? '保存中…' : '保存'}
      </button>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-3">
      <span className="text-body text-xs font-bold mb-1 block">{label}</span>
      {children}
    </label>
  )
}

function AskAssistant({ hasProfile }: { hasProfile: boolean }) {
  const [q, setQ] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [mock, setMock] = useState(false)
  const [err, setErr] = useState('')

  async function ask() {
    if (!q.trim()) return
    setErr('')
    setAnswer('')
    setLoading(true)
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErr(data?.error ?? '请求失败')
        return
      }
      setAnswer(data.answer)
      setMock(!!data.mock)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-line rounded-2xl p-5 mb-6 shadow-sm">
      <h3 className="text-title font-bold text-base mb-1">💬 直接问我</h3>
      <p className="text-muted text-xs mb-3 leading-relaxed">
        {hasProfile ? '基于你的档案给出针对性回答' : '建议先填写上方档案，回答会更准确'}
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="有什么不确定的，直接问"
          onKeyDown={e => e.key === 'Enter' && ask()}
          className="flex-1 bg-base border border-line focus:border-primary rounded-xl px-3 py-2 text-title text-base outline-none transition-colors"
        />
        <button onClick={ask} disabled={loading || !q.trim()} className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-title font-bold px-4 rounded-xl text-sm">
          {loading ? '…' : '发送'}
        </button>
      </div>
      {err && <p className="text-[#DC2626] text-sm mt-3">{err}</p>}
      {answer && (
        <div className="mt-4 bg-highlight border-l-[3px] border-primary rounded-r-xl px-4 py-3">
          {mock && <div className="text-muted text-[10px] mb-2">⚠ Mock 模式（未配置 ANTHROPIC_API_KEY）</div>}
          <p className="text-title text-sm leading-relaxed whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  )
}

function HistorySummary({ records }: { records: HistoryRecord[] }) {
  const last = records[0]
  const lastDate = new Date(last.date)
  const months = Math.round((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
  const verdictText = last.result === 'green' ? '绿色' : last.result === 'yellow' ? '黄色' : '红色'

  return (
    <div className="bg-card border border-line rounded-2xl p-4 mb-3 shadow-sm">
      <p className="text-body text-sm leading-relaxed">
        你上次自查结果是<span className="font-bold text-title">「{verdictText}」</span>，
        距今已过 <span className="font-bold text-title">{months}</span> 个月。
        如果最近有换工作或其他变化，建议重新自查。
      </p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="bg-card border border-line rounded-2xl p-8 text-center">
      <p className="text-body text-sm leading-relaxed">
        还没有测试记录。<br />完成一次自查后会自动保存到这里。
      </p>
    </div>
  )
}

function HistoryRow({ record }: { record: HistoryRecord }) {
  const [open, setOpen] = useState(false)
  const verdictLabel = {
    red: { text: '高风险', cls: 'bg-[#DC2626] text-white' },
    yellow: { text: '需注意', cls: 'bg-primary text-title' },
    green: { text: '可申请', cls: 'bg-[#16A34A] text-white' },
  }[record.result]

  const date = new Date(record.date)
  const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

  return (
    <div className="bg-card border border-line rounded-2xl p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 ${verdictLabel.cls} rounded-lg px-3 py-2 text-xs font-bold min-w-[64px] text-center`}>
          {verdictLabel.text}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-title text-sm font-bold">技人国续签自查</div>
          <div className="text-body text-xs mt-1">{dateStr}</div>
          {record.triggeredItems.length > 0 && (
            <div className="text-muted text-xs mt-1">触发 {record.triggeredItems.length} 项风险</div>
          )}
        </div>
      </div>
      <p className="text-body text-sm leading-relaxed mt-3 pt-3 border-t border-line">{record.summary}</p>
      {record.triggeredItems.length > 0 && (
        <>
          <button type="button" onClick={() => setOpen(o => !o)} className="text-primary hover:text-primary-hover text-sm font-bold mt-3">
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
