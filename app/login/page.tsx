'use client'
import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

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
    <main className="min-h-screen bg-base text-title flex items-center justify-center pb-16 md:pb-0">
      <div className="text-muted">载入中…</div>
    </main>
  )
}

function LoginInner() {
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get('next') ?? '/my'

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
      // 客户端缓存用户信息（cookie 是 httpOnly，UI 显示靠 localStorage）
      localStorage.setItem(LS_USER_KEY, JSON.stringify(data.user))
      router.push(next)
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页"><img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" /><div><div className="text-xl font-bold text-title leading-none">TEBIQ</div><div className="text-xs text-muted leading-tight mt-0.5">てびき</div></div></Link>
          <Link href="/" className="text-muted hover:text-body text-sm">
            ← 返回首页
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-2">登录 TEBIQ</h1>
          <p className="text-muted text-sm mb-8 leading-relaxed">
            登录后可保存历次自查结果，方便对比变化
          </p>

          {step === 'phone' && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-body text-sm font-bold block mb-2">
                  手机号
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="例如 13800138000 或 +818012345678"
                  className="w-full bg-card border-2 border-line focus:border-primary rounded-xl px-4 py-3 text-title text-base outline-none transition-colors"
                  autoFocus
                />
              </label>
              {error && <p className="text-[#DC2626] text-sm">{error}</p>}
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover disabled:opacity-50 text-slate-900 font-bold py-4 rounded-xl text-base transition-all"
              >
                {loading ? '发送中…' : '获取验证码'}
              </button>
              <p className="text-center text-muted text-xs leading-relaxed">
                短信验证码 5 分钟内有效
                <br />
                <span className="text-muted">
                  （框架阶段验证码会输出到服务器控制台）
                </span>
              </p>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4">
              <p className="text-body text-sm">
                验证码已发送至{' '}
                <span className="text-primary font-bold">{phone}</span>
              </p>
              <label className="block">
                <span className="text-body text-sm font-bold block mb-2">
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
                  className="w-full bg-card border-2 border-line focus:border-primary rounded-xl px-4 py-3 text-title text-center text-2xl tracking-[0.5em] outline-none transition-colors"
                  autoFocus
                />
              </label>
              {error && <p className="text-[#DC2626] text-sm">{error}</p>}
              <button
                onClick={handleVerify}
                disabled={loading}
                className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover disabled:opacity-50 text-slate-900 font-bold py-4 rounded-xl text-base transition-all"
              >
                {loading ? '验证中…' : '登录'}
              </button>
              <button
                onClick={() => {
                  setStep('phone')
                  setOtp('')
                  setError('')
                }}
                className="block w-full text-muted hover:text-body text-sm"
              >
                ← 换个手机号
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
