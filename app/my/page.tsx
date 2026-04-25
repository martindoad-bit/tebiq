'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Local types — mirror what the API returns. Source of truth is lib/db/schema.
interface HistoryRecord {
  date: string
  visaType: string
  result: 'red' | 'yellow' | 'green'
  summary: string
  triggeredItems: string[]
  answers: Record<string, boolean>
}

type VisaType =
  | 'gijinkoku' | 'keiei' | 'haigusha' | 'eijusha'
  | 'tokutei' | 'teijusha' | 'ryugaku' | 'other'
type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
type CompanyTypeNew =
  | 'category_1' | 'category_2' | 'category_3' | 'category_4' | 'not_applicable'

interface UserProfile {
  name: string | null
  visaType: VisaType | null
  visaExpiry: string | null
  nationality: string | null
  arrivedAt: string | null
  maritalStatus: MaritalStatus | null
  hasChildren: boolean
  currentJobIndustry: string | null
  lastVisaRenewalAt: string | null
  companyType: CompanyTypeNew | null
  recentChanges: Record<string, unknown> | null
  updatedAt: string
}

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
          {profile?.visaExpiry && <ExpiryReminder expiryDate={profile.visaExpiry} />}

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

const VISA_OPTIONS: { v: VisaType; l: string }[] = [
  { v: 'gijinkoku', l: '技人国（技術・人文知識・国際業務）' },
  { v: 'keiei', l: '经营管理' },
  { v: 'haigusha', l: '配偶者' },
  { v: 'eijusha', l: '永住者' },
  { v: 'tokutei', l: '特定技能' },
  { v: 'teijusha', l: '定住者' },
  { v: 'ryugaku', l: '留学' },
  { v: 'other', l: '其他' },
]
const MARITAL_OPTIONS: { v: MaritalStatus; l: string }[] = [
  { v: 'single', l: '未婚' },
  { v: 'married', l: '已婚' },
  { v: 'divorced', l: '离婚' },
  { v: 'widowed', l: '丧偶' },
]
const COMPANY_OPTIONS: { v: CompanyTypeNew; l: string }[] = [
  { v: 'category_1', l: '类别 1（上市公司等）' },
  { v: 'category_2', l: '类别 2（前年纳税额 1500 万以上）' },
  { v: 'category_3', l: '类别 3（前年纳税额 100 万以上）' },
  { v: 'category_4', l: '类别 4（其他）' },
  { v: 'not_applicable', l: '不适用（自营 / 非技人国 / 不确定）' },
]
const VISA_LABEL = Object.fromEntries(VISA_OPTIONS.map(o => [o.v, o.l])) as Record<VisaType, string>
const MARITAL_LABEL = Object.fromEntries(MARITAL_OPTIONS.map(o => [o.v, o.l])) as Record<MaritalStatus, string>
const COMPANY_LABEL = Object.fromEntries(COMPANY_OPTIONS.map(o => [o.v, o.l])) as Record<CompanyTypeNew, string>

function ProfileSection({
  profile,
  onChange,
}: {
  profile: UserProfile | null
  onChange: (p: UserProfile) => void
}) {
  const hasCore = !!(profile?.visaType && profile?.visaExpiry)
  const [editing, setEditing] = useState(!hasCore)

  if (!editing && profile && hasCore) {
    return (
      <div className="bg-card border border-line rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-title font-bold text-base">我的档案</h3>
          <button onClick={() => setEditing(true)} className="text-primary text-sm font-bold">编辑</button>
        </div>
        <ul className="text-body text-sm space-y-1">
          {profile.name && <li>姓名：<span className="font-bold">{profile.name}</span></li>}
          {profile.visaType && <li>签证：<span className="font-bold">{VISA_LABEL[profile.visaType]}</span></li>}
          {profile.visaExpiry && <li>到期日：<span className="font-bold">{profile.visaExpiry}</span></li>}
          {profile.nationality && <li>国籍：<span className="font-bold">{profile.nationality}</span></li>}
          {profile.arrivedAt && <li>来日年月：<span className="font-bold">{profile.arrivedAt}</span></li>}
          {profile.maritalStatus && <li>婚姻状态：<span className="font-bold">{MARITAL_LABEL[profile.maritalStatus]}</span></li>}
          <li>子女：<span className="font-bold">{profile.hasChildren ? '有' : '无'}</span></li>
          {profile.currentJobIndustry && <li>行业：<span className="font-bold">{profile.currentJobIndustry}</span></li>}
          {profile.lastVisaRenewalAt && <li>上次续签：<span className="font-bold">{profile.lastVisaRenewalAt}</span></li>}
          {profile.companyType && <li>公司类别：<span className="font-bold">{COMPANY_LABEL[profile.companyType]}</span></li>}
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
  const [name, setName] = useState(initial?.name ?? '')
  const [visaType, setVisaType] = useState<VisaType>(initial?.visaType ?? 'gijinkoku')
  const [visaExpiry, setVisaExpiry] = useState(initial?.visaExpiry ?? '')
  const [nationality, setNationality] = useState(initial?.nationality ?? '')
  const [arrivedAt, setArrivedAt] = useState(initial?.arrivedAt ?? '')
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | ''>(initial?.maritalStatus ?? '')
  const [hasChildren, setHasChildren] = useState<boolean>(initial?.hasChildren ?? false)
  const [currentJobIndustry, setCurrentJobIndustry] = useState(initial?.currentJobIndustry ?? '')
  const [lastVisaRenewalAt, setLastVisaRenewalAt] = useState(initial?.lastVisaRenewalAt ?? '')
  const [companyType, setCompanyType] = useState<CompanyTypeNew | ''>(initial?.companyType ?? '')
  const [showOptional, setShowOptional] = useState(!!initial)

  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const canSave = !!visaType && !!visaExpiry

  async function save() {
    setErr('')
    setSaving(true)
    try {
      const res = await fetch('/api/profile/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || null,
          visaType,
          visaExpiry,
          nationality: nationality || null,
          arrivedAt: arrivedAt || null,
          maritalStatus: maritalStatus || null,
          hasChildren,
          currentJobIndustry: currentJobIndustry || null,
          lastVisaRenewalAt: lastVisaRenewalAt || null,
          companyType: companyType || null,
        }),
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
      <h3 className="text-title font-bold text-base mb-1">建立你的档案</h3>
      <p className="text-muted text-xs mb-4 leading-relaxed">
        先填 2 个必填项即可使用到期提醒。其余可以稍后完善——填得越全，提醒和建议越准。
      </p>

      <div className="bg-highlight border-l-[3px] border-primary px-3 py-2 mb-4 rounded-r">
        <p className="text-title text-xs font-bold">必填项（2 项）</p>
      </div>

      <Field label="① 签证类型">
        <select value={visaType} onChange={e => setVisaType(e.target.value as VisaType)} className="w-full bg-base border border-line rounded-lg px-3 py-2 text-base">
          {VISA_OPTIONS.map(o => (
            <option key={o.v} value={o.v}>{o.l}</option>
          ))}
        </select>
      </Field>
      <Field label="② 在留卡到期日">
        <input type="date" value={visaExpiry} onChange={e => setVisaExpiry(e.target.value)} className="w-full bg-base border border-line rounded-lg px-3 py-2 text-base" />
      </Field>

      {!showOptional ? (
        <button
          type="button"
          onClick={() => setShowOptional(true)}
          className="w-full text-primary text-sm font-bold py-2 mb-3 hover:text-primary-hover"
        >
          + 完善档案可以获得更准确的建议（8 项选填）
        </button>
      ) : (
        <>
          <div className="bg-base border-l-[3px] border-line px-3 py-2 mt-4 mb-3 rounded-r">
            <p className="text-muted text-xs font-bold">选填项 · 完善后系统能给出更针对性的建议</p>
          </div>

          <Field label="③ 姓名（用于通信）">
            <input type="text" value={name} onChange={e => setName(e.target.value)} maxLength={80} placeholder="李小明" className="w-full bg-base border border-line rounded-lg px-3 py-2 text-base" />
          </Field>

          <Field label="④ 国籍">
            <input type="text" value={nationality} onChange={e => setNationality(e.target.value)} maxLength={64} placeholder="中国 / 越南 / 菲律宾 等" className="w-full bg-base border border-line rounded-lg px-3 py-2 text-base" />
          </Field>

          <Field label="⑤ 来日年月">
            <input type="date" value={arrivedAt} onChange={e => setArrivedAt(e.target.value)} className="w-full bg-base border border-line rounded-lg px-3 py-2 text-base" />
          </Field>

          <Field label="⑥ 婚姻状态">
            <select value={maritalStatus} onChange={e => setMaritalStatus(e.target.value as MaritalStatus | '')} className="w-full bg-base border border-line rounded-lg px-3 py-2 text-base">
              <option value="">不指定</option>
              {MARITAL_OPTIONS.map(o => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>
          </Field>

          <Field label="⑦ 是否有子女">
            <label className="flex items-center gap-2 text-body text-sm min-h-[28px]">
              <input type="checkbox" checked={hasChildren} onChange={e => setHasChildren(e.target.checked)} />
              有子女
            </label>
          </Field>

          <Field label="⑧ 当前行业">
            <input type="text" value={currentJobIndustry} onChange={e => setCurrentJobIndustry(e.target.value)} maxLength={128} placeholder="IT / 制造 / 餐饮 / 服务 等" className="w-full bg-base border border-line rounded-lg px-3 py-2 text-base" />
          </Field>

          <Field label="⑨ 上次续签日期">
            <input type="date" value={lastVisaRenewalAt} onChange={e => setLastVisaRenewalAt(e.target.value)} className="w-full bg-base border border-line rounded-lg px-3 py-2 text-base" />
          </Field>

          <Field label="⑩ 雇主公司类别（仅技人国相关）">
            <select value={companyType} onChange={e => setCompanyType(e.target.value as CompanyTypeNew | '')} className="w-full bg-base border border-line rounded-lg px-3 py-2 text-base">
              <option value="">不指定</option>
              {COMPANY_OPTIONS.map(o => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>
          </Field>
        </>
      )}

      {err && <p className="text-[#DC2626] text-sm mb-2">{err}</p>}
      <button
        onClick={save}
        disabled={saving || !canSave}
        className="w-full min-h-[48px] bg-primary hover:bg-primary-hover disabled:opacity-50 text-title font-bold rounded-xl mt-2"
      >
        {saving ? '保存中…' : !canSave ? '请先填写必填项' : '保存档案'}
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
