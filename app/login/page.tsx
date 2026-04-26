/**
 * 登录 / 注册 — Block 3 视觉刷新（v5）
 *
 * 流程不变：手机号 → OTP → setUserSession（cookie）。仅视觉跟着 v5 刷新。
 */
'use client'
import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { KeyRound, MessageSquareText, Phone, RotateCcw, ShieldCheck } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import Logo from '@/app/_components/v5/Logo'

const LS_USER_KEY = 'tebiq_user'

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingShell />}>
      <LoginInner />
    </Suspense>
  )
}

function LoadingShell() {
  return (
    <AppShell appBar={<AppBar back="/" />}>
      <div className="text-ash text-center mt-12">载入中…</div>
    </AppShell>
  )
}

function LoginInner() {
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get('next') ?? '/my/archive'
  const inviteCode = search.get('ref')?.trim() ?? ''

  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSendOtp() {
    setError('')
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
      setStep('otp')
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify() {
    setError('')
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
      router.push(next)
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppShell appBar={<AppBar back="/" />}>
      <section className="pt-2 pb-5 text-center">
        <div className="flex justify-center">
          <Logo size="md" />
        </div>
        <div className="mx-auto mt-5 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 text-[11px] text-ash shadow-card">
          <ShieldCheck size={13} strokeWidth={1.55} className="text-ink" />
          {inviteCode ? '注册成功后自动领取邀请奖励' : '手机号用于登录和保存档案'}
        </div>
      </section>

      <h1 className="mb-1.5 text-center text-[22px] font-medium leading-tight text-ink">
        {step === 'phone' ? '登录 / 注册' : '输入验证码'}
      </h1>
      <p className="mb-5 text-center text-[12px] leading-relaxed text-ash">
        {step === 'phone'
          ? '使用手机号登录，没有账号会自动注册'
          : `验证码已发送至 ${phone}`}
      </p>

      {step === 'phone' && (
        <div className="rounded-card border border-hairline bg-surface p-4 shadow-card">
          <label className="block">
            <span className="mb-2 block text-[13px] font-medium text-ink">手机号</span>
            <span className="flex items-center gap-2 rounded-btn border border-hairline bg-canvas px-3.5 py-3 transition-colors focus-within:border-accent">
              <Phone size={16} strokeWidth={1.55} className="flex-shrink-0 text-haze" />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="13800138000 或 +818012345678"
                className="min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-haze"
                autoFocus
              />
            </span>
          </label>
          {error && (
            <p className="mt-3 text-[12px] text-danger" role="alert">
              {error}
            </p>
          )}
          <Button onClick={handleSendOtp} disabled={loading} className="mt-4">
            {loading ? '发送中…' : '获取验证码'}
          </Button>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] leading-relaxed text-ash">
            <MessageSquareText size={12} strokeWidth={1.55} />
            短信验证码 5 分钟内有效
          </div>
        </div>
      )}

      {step === 'otp' && (
        <div className="rounded-card border border-hairline bg-surface p-4 shadow-card">
          <label className="block">
            <span className="mb-2 block text-[13px] font-medium text-ink">
              6 位验证码
            </span>
            <span className="flex items-center gap-2 rounded-btn border border-hairline bg-canvas px-3.5 py-3 transition-colors focus-within:border-accent">
              <KeyRound size={16} strokeWidth={1.55} className="flex-shrink-0 text-haze" />
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="min-w-0 flex-1 bg-transparent text-center text-[22px] tracking-[0.38em] text-ink outline-none placeholder:text-haze"
                autoFocus
              />
            </span>
          </label>
          {error && (
            <p className="mt-3 text-[12px] text-danger" role="alert">
              {error}
            </p>
          )}
          <Button onClick={handleVerify} disabled={loading} className="mt-4">
            {loading ? '验证中…' : '登录'}
          </Button>
          <button
            type="button"
            onClick={() => {
              setStep('phone')
              setOtp('')
              setError('')
            }}
            className="mt-3 flex w-full items-center justify-center gap-1.5 text-center text-[12px] text-ash hover:text-ink"
          >
            <RotateCcw size={13} strokeWidth={1.55} />
            换个手机号
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-[10px] leading-relaxed text-haze">
        登录即表示同意{' '}
        <Link href="/terms" className="underline">
          利用規約
        </Link>{' '}
        和{' '}
        <Link href="/privacy" className="underline">
          プライバシーポリシー
        </Link>
      </p>
    </AppShell>
  )
}
