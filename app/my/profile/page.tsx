'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  History,
  LogOut,
  Pencil,
  Sparkles,
  UserRound,
} from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'

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
  phone: string | null
  email: string | null
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
          router.replace('/login?next=/my/profile')
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
    <div className="h-[100dvh] bg-canvas">
      <div className="flex h-[100dvh] flex-col md:mx-auto md:max-w-phone md:border-x md:border-hairline md:shadow-soft">
        <AppBar
          title="我的信息"
          back="/my/account"
          right={
            <button
              onClick={handleLogout}
              aria-label="退出登录"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ash hover:bg-surface hover:text-ink"
            >
              <LogOut size={16} strokeWidth={1.55} />
            </button>
          }
        />

        <main
          className="min-h-0 flex-1 overflow-y-auto px-4 pb-6"
          style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom))' }}
        >
          {profile?.visaExpiry && <ExpiryReminder expiryDate={profile.visaExpiry} />}

          <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-accent-2 text-ink">
                <UserRound size={19} strokeWidth={1.55} />
              </span>
              <div className="min-w-0 flex-1">
                <h1 className="text-[15px] font-medium leading-snug text-ink">
                  我的账号
                </h1>
                {user && (
                  <p className="mt-1 truncate text-[11px] leading-[1.5] text-ash">
                    当前登录：{user.email ?? user.phone ?? '已登录'}
                  </p>
                )}
              </div>
            </div>
          </section>

          {!loading && <ProfileSection profile={profile} onChange={setProfile} />}
          <Link
            href="/check"
            className="my-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-btn bg-accent px-4 text-[14px] font-medium text-white shadow-cta active:translate-y-px"
          >
            <ClipboardCheck size={16} strokeWidth={1.55} />
            开始新的自查
          </Link>

          <div className="mb-3 mt-5 flex items-center gap-2 px-1 text-[12px] font-medium text-ink">
            <History size={15} strokeWidth={1.55} />
            测试历史
          </div>
          {history.length > 0 && <HistorySummary records={history} />}
          {loading ? (
            <p className="mt-4 text-center text-[12px] text-ash">载入中...</p>
          ) : history.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              {history.map((r, i) => (
                <HistoryRow key={`${r.date}-${i}`} record={r} />
              ))}
            </div>
          )}
        </main>
        <TabBar />
      </div>
    </div>
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
    bg = 'bg-danger'
    title = `非常紧急：剩余 ${days} 天`
    sub = '请立刻确认材料并咨询专家'
  } else if (days < 60) {
    bg = 'bg-accent'
    title = `需要尽快提交：剩余 ${days} 天`
    sub = '建议立刻准备材料并提交申请'
  } else if (days < 90) {
    bg = 'bg-ink'
    title = `建议开始准备：剩余 ${days} 天`
    sub = '续签材料部分需要 2-3 周开具'
  } else {
    bg = 'bg-success'
    title = `目前不紧急：剩余 ${days} 天`
    sub = '建议到期前 3 个月开始准备'
  }

  return (
    <div className={`${bg} mt-3 rounded-card px-4 py-3.5 leading-relaxed text-white shadow-card`}>
      <div className="flex items-center gap-2 text-[13px] font-medium leading-snug">
        <CalendarClock size={16} strokeWidth={1.55} />
        {title}
      </div>
      <div className="mt-1.5 text-[11px] leading-[1.5] text-white/88">
        到期日 {expiryDate} · {sub}
      </div>
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
      <div className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-[13px] font-medium leading-snug text-ink">我的档案</h3>
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1 rounded-[9px] bg-accent-2 px-2.5 py-1.5 text-[11px] font-medium text-ink"
          >
            <Pencil size={12} strokeWidth={1.55} />
            编辑
          </button>
        </div>
        <ul className="divide-y divide-hairline rounded-[12px] bg-canvas px-3">
          {profile.name && <InfoRow label="姓名" value={profile.name} />}
          {profile.visaType && <InfoRow label="签证" value={VISA_LABEL[profile.visaType]} />}
          {profile.visaExpiry && <InfoRow label="到期日" value={profile.visaExpiry} />}
          {profile.nationality && <InfoRow label="国籍" value={profile.nationality} />}
          {profile.arrivedAt && <InfoRow label="来日年月" value={profile.arrivedAt} />}
          {profile.maritalStatus && <InfoRow label="婚姻状态" value={MARITAL_LABEL[profile.maritalStatus]} />}
          <InfoRow label="子女" value={profile.hasChildren ? '有' : '无'} />
          {profile.currentJobIndustry && <InfoRow label="行业" value={profile.currentJobIndustry} />}
          {profile.lastVisaRenewalAt && <InfoRow label="上次续签" value={profile.lastVisaRenewalAt} />}
          {profile.companyType && <InfoRow label="公司类别" value={COMPANY_LABEL[profile.companyType]} />}
        </ul>
      </div>
    )
  }
  return <ProfileForm initial={profile} onSaved={p => { onChange(p); setEditing(false) }} />
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex gap-3 py-2.5 text-[12px] leading-snug">
      <span className="w-[74px] flex-shrink-0 text-ash">{label}</span>
      <span className="min-w-0 flex-1 break-words font-medium text-ink">{value}</span>
    </li>
  )
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
    <div className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <h3 className="text-[13px] font-medium leading-snug text-ink">建立你的档案</h3>
      <p className="mt-1 text-[11px] leading-[1.55] text-ash">
        先填 2 个必填项即可使用到期提醒。其余可以稍后完善——填得越全，提醒和建议越准。
      </p>

      <div className="my-4 rounded-[11px] bg-accent-2 px-3 py-2">
        <p className="text-[11px] font-medium text-ink">必填项（2 项）</p>
      </div>

      <Field label="① 签证类型">
        <select value={visaType} onChange={e => setVisaType(e.target.value as VisaType)} className="w-full rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 text-[13px] text-ink outline-none focus:border-accent">
          {VISA_OPTIONS.map(o => (
            <option key={o.v} value={o.v}>{o.l}</option>
          ))}
        </select>
      </Field>
      <Field label="② 在留卡到期日">
        <input type="date" value={visaExpiry} onChange={e => setVisaExpiry(e.target.value)} className="w-full rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 text-[13px] text-ink outline-none focus:border-accent" />
      </Field>

      {!showOptional ? (
        <button
          type="button"
          onClick={() => setShowOptional(true)}
          className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-btn border border-hairline bg-surface px-3 py-2.5 text-[12px] font-medium text-ink"
        >
          <Sparkles size={14} strokeWidth={1.55} />
          完善选填项（8 项）
        </button>
      ) : (
        <>
          <div className="mb-3 mt-4 rounded-[11px] bg-canvas px-3 py-2">
            <p className="text-[11px] font-medium text-ash">选填项 · 用于更准确的提醒和建议</p>
          </div>

          <Field label="③ 姓名（用于通信）">
            <TextInput value={name} onChange={setName} maxLength={80} placeholder="李小明" />
          </Field>

          <Field label="④ 国籍">
            <TextInput value={nationality} onChange={setNationality} maxLength={64} placeholder="中国 / 越南 / 菲律宾 等" />
          </Field>

          <Field label="⑤ 来日年月">
            <input type="date" value={arrivedAt} onChange={e => setArrivedAt(e.target.value)} className="w-full rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 text-[13px] text-ink outline-none focus:border-accent" />
          </Field>

          <Field label="⑥ 婚姻状态">
            <select value={maritalStatus} onChange={e => setMaritalStatus(e.target.value as MaritalStatus | '')} className="w-full rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 text-[13px] text-ink outline-none focus:border-accent">
              <option value="">不指定</option>
              {MARITAL_OPTIONS.map(o => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>
          </Field>

          <Field label="⑦ 是否有子女">
            <label className="flex min-h-[36px] items-center gap-2 rounded-[11px] bg-canvas px-3 text-[13px] text-ink">
              <input type="checkbox" checked={hasChildren} onChange={e => setHasChildren(e.target.checked)} className="h-4 w-4 accent-[#0F2544]" />
              有子女
            </label>
          </Field>

          <Field label="⑧ 当前行业">
            <TextInput value={currentJobIndustry} onChange={setCurrentJobIndustry} maxLength={128} placeholder="IT / 制造 / 餐饮 / 服务 等" />
          </Field>

          <Field label="⑨ 上次续签日期">
            <input type="date" value={lastVisaRenewalAt} onChange={e => setLastVisaRenewalAt(e.target.value)} className="w-full rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 text-[13px] text-ink outline-none focus:border-accent" />
          </Field>

          <Field label="⑩ 雇主公司类别（仅技人国相关）">
            <select value={companyType} onChange={e => setCompanyType(e.target.value as CompanyTypeNew | '')} className="w-full rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 text-[13px] text-ink outline-none focus:border-accent">
              <option value="">不指定</option>
              {COMPANY_OPTIONS.map(o => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>
          </Field>
        </>
      )}

      {err && <p className="mb-2 text-[12px] text-danger">{err}</p>}
      <button
        onClick={save}
        disabled={saving || !canSave}
        className="mt-2 min-h-[46px] w-full rounded-btn bg-accent px-4 text-[14px] font-medium text-white shadow-cta disabled:opacity-50"
      >
        {saving ? '保存中...' : !canSave ? '请先填写必填项' : '保存档案'}
      </button>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-3 block">
      <span className="mb-1.5 block text-[11px] font-medium text-ash">{label}</span>
      {children}
    </label>
  )
}

function TextInput({
  value,
  onChange,
  maxLength,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  maxLength: number
  placeholder: string
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      placeholder={placeholder}
      className="w-full rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 text-[13px] text-ink outline-none placeholder:text-haze focus:border-accent"
    />
  )
}

function HistorySummary({ records }: { records: HistoryRecord[] }) {
  const last = records[0]
  const lastDate = new Date(last.date)
  const months = Math.round((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
  const verdictText = last.result === 'green' ? '绿色' : last.result === 'yellow' ? '黄色' : '红色'

  return (
    <div className="mb-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
      <p className="text-[12px] leading-[1.65] text-ash">
        你上次自查结果是<span className="font-medium text-ink">「{verdictText}」</span>，
        距今已过 <span className="font-medium text-ink">{months}</span> 个月。
        如果最近有换工作或其他变化，建议重新自查。
      </p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-card border border-hairline bg-surface px-4 py-8 text-center shadow-card">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-[14px] bg-accent-2 text-ink">
        <CheckCircle2 size={21} strokeWidth={1.55} />
      </span>
      <p className="mt-3 text-[13px] font-medium leading-relaxed text-ink">
        还没有测试记录
      </p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-ash">
        完成一次自查后会自动保存到这里。
      </p>
    </div>
  )
}

function HistoryRow({ record }: { record: HistoryRecord }) {
  const [open, setOpen] = useState(false)
  const verdictLabel = {
    red: { text: '待确认', cls: 'bg-danger text-white' },
    yellow: { text: '需注意', cls: 'bg-accent text-white' },
    green: { text: '可申请', cls: 'bg-success text-white' },
  }[record.result]

  const date = new Date(record.date)
  const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

  return (
    <div className="rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
      <div className="flex items-start gap-4">
        <div className={`min-w-[62px] flex-shrink-0 rounded-[10px] px-2.5 py-2 text-center text-[11px] font-medium ${verdictLabel.cls}`}>
          {verdictLabel.text}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium leading-snug text-ink">技人国续签材料准备检查</div>
          <div className="mt-1 text-[10.5px] text-ash">{dateStr}</div>
          {record.triggeredItems.length > 0 && (
            <div className="mt-1 text-[10.5px] text-ash">触发 {record.triggeredItems.length} 项待确认事项</div>
          )}
        </div>
      </div>
      <p className="mt-3 border-t border-hairline pt-3 text-[12px] leading-[1.65] text-ash">{record.summary}</p>
      {record.triggeredItems.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            className="mt-3 flex items-center gap-1 text-[12px] font-medium text-ink"
          >
            {open ? <ChevronUp size={14} strokeWidth={1.55} /> : <ChevronDown size={14} strokeWidth={1.55} />}
            {open ? '收起详情' : '查看详情'}
          </button>
          {open && (
            <ul className="mt-3 space-y-2">
              {record.triggeredItems.map((item, i) => (
                <li key={i} className="flex gap-2 text-[12px] leading-[1.65] text-ash">
                  <AlertCircle size={13} strokeWidth={1.55} className="mt-0.5 flex-shrink-0 text-accent" />
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
