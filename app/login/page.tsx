/**
 * 登录 / 注册 — Block 3 视觉刷新（v5）
 *
 * 流程不变：手机号 → OTP → setUserSession（cookie）。仅视觉跟着 v5 刷新。
 */
'use client'
import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
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
        body: JSON.stringify({ phone, otp }),
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
      <section className="pt-3 pb-6 flex justify-center">
        <Logo size="md" />
      </section>

      <h1 className="text-[22px] font-medium text-ink leading-tight mb-1.5 text-center">
        {step === 'phone' ? '登录 / 注册' : '输入验证码'}
      </h1>
      <p className="text-[12px] text-ash text-center mb-8">
        {step === 'phone'
          ? '使用手机号登录，没有账号会自动注册'
          : `验证码已发送至 ${phone}`}
      </p>

      {step === 'phone' && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-[13px] font-medium text-ink block mb-2">手机号</span>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="13800138000 或 +818012345678"
              className="w-full bg-surface border border-hairline focus:border-accent rounded-btn px-4 py-3 text-[16px] text-ink outline-none transition-colors"
              autoFocus
            />
          </label>
          {error && (
            <p className="text-danger text-[12px]" role="alert">
              {error}
            </p>
          )}
          <Button onClick={handleSendOtp} disabled={loading}>
            {loading ? '发送中…' : '获取验证码'}
          </Button>
          <p className="text-center text-[10.5px] text-ash leading-relaxed pt-1">
            短信验证码 5 分钟内有效
            <br />
            （开发阶段：验证码输出到服务器控制台）
          </p>
        </div>
      )}

      {step === 'otp' && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-[13px] font-medium text-ink block mb-2">
              6 位验证码
            </span>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="••••••"
              className="w-full bg-surface border border-hairline focus:border-accent rounded-btn px-4 py-3 text-ink text-center text-2xl tracking-[0.5em] outline-none transition-colors"
              autoFocus
            />
          </label>
          {error && (
            <p className="text-danger text-[12px]" role="alert">
              {error}
            </p>
          )}
          <Button onClick={handleVerify} disabled={loading}>
            {loading ? '验证中…' : '登录'}
          </Button>
          <button
            type="button"
            onClick={() => {
              setStep('phone')
              setOtp('')
              setError('')
            }}
            className="block w-full text-ash hover:text-ink text-[12px] text-center"
          >
            ← 换个手机号
          </button>
        </div>
      )}

      <p className="text-center text-[10px] text-haze mt-8 leading-relaxed">
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
