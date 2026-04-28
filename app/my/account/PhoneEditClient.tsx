'use client'

import { useState } from 'react'
import { KeyRound, Phone, Send } from 'lucide-react'
import Button from '@/app/_components/v5/Button'

interface Props {
  initialPhone: string | null
}

export default function PhoneEditClient({ initialPhone }: Props) {
  const [phone, setPhone] = useState(initialPhone ?? '')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>(initialPhone ? 'phone' : 'phone')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [savedPhone, setSavedPhone] = useState(initialPhone ?? '')

  async function sendOtp() {
    setMessage('')
    if (!/^[+]?\d{10,15}$/.test(phone)) {
      setMessage('请输入有效手机号')
      return
    }
    setBusy(true)
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data?.error ?? '发送失败')
        return
      }
      setStep('otp')
      setMessage('验证码已发送，5 分钟内有效。')
    } catch {
      setMessage('网络异常，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  async function verify() {
    setMessage('')
    if (!/^\d{6}$/.test(otp)) {
      setMessage('验证码为 6 位数字')
      return
    }
    setBusy(true)
    try {
      const res = await fetch('/api/account/phone/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data?.error ?? '绑定失败')
        return
      }
      setSavedPhone(data.phone ?? phone)
      setOtp('')
      setStep('phone')
      setMessage('手机号已绑定，之后也可以用短信验证码登录。')
    } catch {
      setMessage('网络异常，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  const dirty = phone.trim() !== savedPhone

  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface p-4 shadow-card">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
          <Phone size={17} strokeWidth={1.55} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[13px] font-medium leading-snug text-ink">
            登录手机号
          </h2>
          <p className="mt-1 text-[11px] leading-[1.55] text-ash">
            绑定后可用短信验证码登录。
          </p>
        </div>
      </div>

      <label className="mt-3 block">
        <span className="flex items-center gap-2 rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 focus-within:border-accent">
          <Phone size={14} strokeWidth={1.55} className="text-haze" />
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+818012345678"
            className="min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-haze"
          />
        </span>
      </label>

      {step === 'otp' && (
        <label className="mt-2 block">
          <span className="flex items-center gap-2 rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 focus-within:border-accent">
            <KeyRound size={14} strokeWidth={1.55} className="text-haze" />
            <input
              type="text"
              inputMode="numeric"
              value={otp}
              maxLength={6}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="6 位验证码"
              className="min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-haze"
            />
          </span>
        </label>
      )}

      <div className="mt-3 flex items-center gap-2">
        {step === 'phone' ? (
          <Button
            type="button"
            onClick={sendOtp}
            disabled={busy || !dirty}
            className="min-h-[40px] py-2 text-[13px]"
          >
            {busy ? '发送中…' : savedPhone ? '更换手机号' : '发送验证码'}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={verify}
            disabled={busy}
            className="min-h-[40px] py-2 text-[13px]"
          >
            {busy ? '验证中…' : '确认绑定'}
          </Button>
        )}
        {step === 'otp' && (
          <button
            type="button"
            onClick={() => {
              setStep('phone')
              setOtp('')
              setMessage('')
            }}
            className="flex min-h-[40px] items-center gap-1.5 rounded-btn border border-[rgba(30,58,95,0.18)] bg-surface px-3 py-2 text-[12.5px] font-medium text-ink"
          >
            <Send size={13} strokeWidth={1.55} />
            重填
          </button>
        )}
      </div>

      {message && <p className="mt-2 text-[11px] leading-relaxed text-ash">{message}</p>}
    </section>
  )
}
