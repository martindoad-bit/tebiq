'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  KeyRound,
  Mail,
  MessageSquareText,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
} from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import Logo from '@/app/_components/v5/Logo'

const LS_USER_KEY = 'tebiq_user'

type AuthMethod = 'email' | 'phone'
type PhoneStep = 'phone' | 'otp'

const ERROR_TEXT: Record<string, string> = {
  magic_link_not_found: '登录链接无效，请重新发送邮件',
  magic_link_expired: '登录链接已过期，请重新发送邮件',
  magic_link_consumed: '登录链接已使用过，请重新发送邮件',
}

function safeNext(value: string | null): string | null {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return null
  return value
}

function buildNext(search: ReturnType<typeof useSearchParams>): string {
  const explicit = safeNext(search.get('next'))
  if (explicit) return explicit
  if (search.get('from') === 'photo') {
    const docId = search.get('doc_id')
    if (docId) return `/photo/result/${encodeURIComponent(docId)}`
  }
  return '/my/archive'
}

export default function AuthPageClient({ intent = 'login' }: { intent?: 'login' | 'register' }) {
  const router = useRouter()
  const search = useSearchParams()
  const next = useMemo(() => buildNext(search), [search])
  const inviteCode = search.get('ref')?.trim() ?? ''
  const initialError = search.get('error')

  const [method, setMethod] = useState<AuthMethod>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [phoneStep, setPhoneStep] = useState<PhoneStep>('phone')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(initialError ? ERROR_TEXT[initialError] ?? '登录未完成' : '')
  const [message, setMessage] = useState('')
  const [lastDevOtp, setLastDevOtp] = useState('')

  async function handleSendMagicLink() {
    setError('')
    setMessage('')
    const normalized = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setError('请输入有效邮箱')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalized, next, inviteCode }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error ?? '发送失败')
        return
      }
      setMessage(`登录链接已发送到 ${normalized}，10 分钟内有效。`)
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  async function handleSendOtp() {
    setError('')
    setMessage('')
    if (!/^[+]?\d{10,15}$/.test(phone)) {
      setError('请输入有效的手机号')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error ?? '发送失败')
        return
      }
      if (data?.devOtp) setLastDevOtp(data.devOtp)
      setPhoneStep('otp')
      setMessage('')
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp() {
    setError('')
    setMessage('')
    if (otp.length !== 6) {
      setError('验证码为 6 位数字')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, inviteCode }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error ?? '验证失败')
        return
      }
      localStorage.setItem(LS_USER_KEY, JSON.stringify(data.user))
      const defaultRegisterNext = isRegister && data.firstLogin && next === '/my/archive'
      router.push(
        inviteCode && data.invitationAccepted
          ? '/welcome'
          : defaultRegisterNext
            ? '/onboarding'
            : next,
      )
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  const isRegister = intent === 'register'
  const title = isRegister ? '注册账号' : '登录 / 注册'

  return (
    <AppShell appBar={<AppBar back="/" />}>
      <div className="mx-auto w-full min-w-0 max-w-[420px]">
        <section className="pt-2 pb-5 text-center">
          <div className="flex justify-center">
            <Logo size="md" />
          </div>
          <div className="mx-auto mt-5 inline-flex max-w-full items-center justify-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 text-center text-[11px] text-slate shadow-card">
            <ShieldCheck size={13} strokeWidth={1.55} className="text-ink" />
            {inviteCode ? '注册成功后自动领取邀请奖励' : '邮箱优先，也可用手机号登录'}
          </div>
        </section>

        <h1 className="mb-1.5 text-center text-[22px] font-medium leading-tight text-ink">
          {phoneStep === 'otp' && method === 'phone' ? '输入验证码' : title}
        </h1>
        <p className="mb-5 text-center text-[12px] leading-relaxed text-slate">
          {method === 'email'
            ? '用邮箱收一次性登录链接，没有账号会自动注册'
            : phoneStep === 'phone'
              ? '手机号登录保留给已有用户和备用登录'
              : `验证码已发送至 ${phone}`}
        </p>

        <div className="mb-3 grid w-full min-w-0 grid-cols-2 gap-2 rounded-card border border-hairline bg-surface p-1 shadow-card">
          <button
            type="button"
            onClick={() => {
              setMethod('email')
              setError('')
            }}
            className={`focus-ring min-h-[40px] min-w-0 rounded-[10px] px-2 text-[12px] font-medium transition-colors ${
              method === 'email' ? 'bg-ink text-white shadow-soft' : 'text-slate hover:text-ink'
            }`}
            aria-pressed={method === 'email'}
          >
            用邮箱登录
          </button>
          <button
            type="button"
            onClick={() => {
              setMethod('phone')
              setError('')
            }}
            className={`focus-ring min-h-[40px] min-w-0 rounded-[10px] px-2 text-[12px] font-medium transition-colors ${
              method === 'phone' ? 'bg-ink text-white shadow-soft' : 'text-slate hover:text-ink'
            }`}
            aria-pressed={method === 'phone'}
          >
            用手机号登录
          </button>
        </div>

        {method === 'email' && (
          <div className="w-full min-w-0 rounded-card border border-hairline bg-surface p-4 shadow-card">
            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-ink">邮箱</span>
              <span className="relative block min-w-0">
                <Mail size={16} strokeWidth={1.55} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full min-w-0 rounded-btn border border-hairline bg-canvas py-3 pl-11 pr-3 text-[16px] text-ink outline-none transition-colors placeholder:text-ash focus:border-ink"
                  autoFocus
                />
              </span>
            </label>
            {error && (
              <div className="mt-3 rounded-[10px] bg-paper px-3 py-2" role="alert">
                <p className="text-[12px] leading-relaxed text-danger">{error}</p>
                <button
                  type="button"
                  onClick={() => {
                    setMethod('phone')
                    setError('')
                  }}
                  className="mt-2 text-[12px] font-medium text-ink underline underline-offset-4"
                >
                  使用手机号登录
                </button>
              </div>
            )}
            {message && <p className="mt-3 text-[12px] leading-relaxed text-slate">{message}</p>}
            <Button onClick={handleSendMagicLink} disabled={loading} className="mt-4">
              {loading ? '处理中...' : '发送登录链接'}
            </Button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] leading-relaxed text-slate">
              <Send size={12} strokeWidth={1.55} />
              链接 10 分钟内有效
            </div>
          </div>
        )}

        {method === 'phone' && phoneStep === 'phone' && (
          <div className="w-full min-w-0 rounded-card border border-hairline bg-surface p-4 shadow-card">
            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-ink">手机号</span>
              <span className="relative block min-w-0">
                <Phone size={16} strokeWidth={1.55} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="例: 08012345678"
                  className="w-full min-w-0 rounded-btn border border-hairline bg-canvas py-3 pl-11 pr-3 text-[16px] text-ink outline-none transition-colors placeholder:text-ash focus:border-ink"
                  autoFocus
                />
              </span>
            </label>
            {error && <p className="mt-3 text-[12px] text-danger" role="alert">{error}</p>}
            <Button onClick={handleSendOtp} disabled={loading} className="mt-4">
              {loading ? '处理中...' : '获取验证码'}
            </Button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] leading-relaxed text-slate">
              <MessageSquareText size={12} strokeWidth={1.55} />
              短信验证码 5 分钟内有效
            </div>
          </div>
        )}

        {method === 'phone' && phoneStep === 'otp' && (
          <div className="w-full min-w-0 rounded-card border border-hairline bg-surface p-4 shadow-card">
            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-ink">6 位验证码</span>
              <span className="relative block min-w-0">
                <KeyRound size={16} strokeWidth={1.55} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full min-w-0 rounded-btn border border-hairline bg-canvas py-3 pl-11 pr-3 text-center text-[22px] tracking-[0.32em] text-ink outline-none transition-colors placeholder:text-ash focus:border-ink"
                  autoFocus
                />
              </span>
            </label>
            {error && <p className="mt-3 text-[12px] text-danger" role="alert">{error}</p>}
            <Button onClick={handleVerifyOtp} disabled={loading} className="mt-4">
              {loading ? '处理中...' : '登录'}
            </Button>
            <button
              type="button"
              onClick={() => {
                setPhoneStep('phone')
                setOtp('')
                setError('')
              }}
              className="mt-3 flex w-full items-center justify-center gap-1.5 text-center text-[12px] text-slate hover:text-ink"
            >
              <RotateCcw size={13} strokeWidth={1.55} />
              换个手机号
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-[10.5px] leading-relaxed text-ash">
          登录即表示同意{' '}
          <Link href="/terms" className="text-ink underline underline-offset-4">
            利用規約
          </Link>{' '}
          和{' '}
          <Link href="/privacy-policy" className="text-ink underline underline-offset-4">
            プライバシーポリシー
          </Link>
        </p>
      </div>

      {process.env.NODE_ENV !== 'production' && lastDevOtp && (
        <div className="fixed bottom-3 right-3 z-50 rounded-[10px] border border-hairline bg-surface px-3 py-2 text-[11px] text-ink shadow-card">
          上次发送的 OTP: {lastDevOtp}
        </div>
      )}
    </AppShell>
  )
}
