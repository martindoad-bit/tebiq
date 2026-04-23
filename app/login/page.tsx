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
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-slate-400">载入中…</div>
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
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-wider text-amber-400 text-lg">
            TEBIQ
          </Link>
          <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm">
            ← 返回首页
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-2">登录 TEBIQ</h1>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            登录后可保存历次自查结果，方便对比变化
          </p>

          {step === 'phone' && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-slate-300 text-sm font-bold block mb-2">
                  手机号
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="例如 13800138000 或 +818012345678"
                  className="w-full bg-slate-800 border-2 border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-white outline-none transition-colors"
                  autoFocus
                />
              </label>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="flex items-center justify-center w-full min-h-[60px] bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-bold py-4 rounded-xl text-base transition-all"
              >
                {loading ? '发送中…' : '获取验证码'}
              </button>
              <p className="text-center text-slate-500 text-xs leading-relaxed">
                短信验证码 5 分钟内有效
                <br />
                <span className="text-slate-600">
                  （框架阶段验证码会输出到服务器控制台）
                </span>
              </p>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm">
                验证码已发送至{' '}
                <span className="text-amber-400 font-bold">{phone}</span>
              </p>
              <label className="block">
                <span className="text-slate-300 text-sm font-bold block mb-2">
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
                  className="w-full bg-slate-800 border-2 border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-center text-2xl tracking-[0.5em] outline-none transition-colors"
                  autoFocus
                />
              </label>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={handleVerify}
                disabled={loading}
                className="flex items-center justify-center w-full min-h-[60px] bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-bold py-4 rounded-xl text-base transition-all"
              >
                {loading ? '验证中…' : '登录'}
              </button>
              <button
                onClick={() => {
                  setStep('phone')
                  setOtp('')
                  setError('')
                }}
                className="block w-full text-slate-400 hover:text-slate-200 text-sm"
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
