'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Mail, Send, ShieldAlert } from 'lucide-react'
import Button from '@/app/_components/v5/Button'

interface Props {
  initialEmail: string | null
  initialVerifiedAt: string | null
}

const REASON_TEXT: Record<string, string> = {
  not_found: '验证链接无效，请重新发送邮件',
  expired: '验证链接已过期（24h 失效），请重新发送',
  consumed: '该链接已被使用过，邮箱无需再次验证',
  email_changed: '账户邮箱已变更，请用最新地址重新验证',
  unknown: '验证未完成，请稍后再试',
}

export default function EmailEditClient({ initialEmail, initialVerifiedAt }: Props) {
  const sp = useSearchParams()
  const [email, setEmail] = useState(initialEmail ?? '')
  const [savedEmail, setSavedEmail] = useState(initialEmail ?? '')
  const [verifiedAt, setVerifiedAt] = useState<string | null>(initialVerifiedAt)
  const [busy, setBusy] = useState(false)
  const [verifyBusy, setVerifyBusy] = useState(false)
  const [message, setMessage] = useState('')

  // 处理 verify redirect 回来的提示
  useEffect(() => {
    if (!sp) return
    const flag = sp.get('email')
    if (flag === 'verified') {
      setMessage('邮箱已验证，今后会通过这个邮箱给你发送提醒。')
      setVerifiedAt(new Date().toISOString())
    } else if (flag === 'verify_failed') {
      const reason = sp.get('reason') ?? 'unknown'
      setMessage(REASON_TEXT[reason] ?? REASON_TEXT.unknown)
    }
  }, [sp])

  async function save() {
    setBusy(true)
    setMessage('')
    try {
      const res = await fetch('/api/account/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data?.error ?? '保存失败')
        return
      }
      const nextEmail = data?.email ?? ''
      setSavedEmail(nextEmail)
      setEmail(nextEmail)
      setVerifiedAt(null) // 改邮箱后强制重新验证
      setMessage(nextEmail ? '已保存提醒邮箱，请点击下方按钮发送验证邮件。' : '已清空提醒邮箱')
    } catch {
      setMessage('网络异常，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  async function sendVerification() {
    setVerifyBusy(true)
    setMessage('')
    try {
      const res = await fetch('/api/account/email/send-verification', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data?.error ?? '邮件发送失败')
        return
      }
      if (data.alreadyVerified) {
        setMessage('该邮箱已验证，无需再次发送。')
        return
      }
      setMessage(`验证邮件已发送到 ${savedEmail}（24h 内有效，请去收件箱查看）。`)
    } catch {
      setMessage('网络异常，请稍后再试')
    } finally {
      setVerifyBusy(false)
    }
  }

  const dirty = email.trim() !== savedEmail
  const hasSavedEmail = !!savedEmail
  const isVerified = !!verifiedAt && hasSavedEmail && !dirty

  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface p-4 shadow-card">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
          <Mail size={17} strokeWidth={1.55} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[13px] font-medium leading-snug text-ink">
            到期提醒邮箱
          </h2>
          <p className="mt-1 text-[11px] leading-[1.55] text-ash">
            用于接收在留期限、住民税、年金等提醒。
          </p>
        </div>
        {hasSavedEmail && !dirty && (
          isVerified ? (
            <span className="flex flex-shrink-0 items-center gap-1 rounded-[8px] bg-[rgba(46,125,101,0.12)] px-2 py-1 text-[10px] font-medium leading-none text-success">
              <CheckCircle2 size={11} strokeWidth={1.7} />
              已验证
            </span>
          ) : (
            <span className="flex flex-shrink-0 items-center gap-1 rounded-[8px] bg-accent-2 px-2 py-1 text-[10px] font-medium leading-none text-ink">
              <ShieldAlert size={11} strokeWidth={1.7} />
              未验证
            </span>
          )
        )}
      </div>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="name@example.com"
        className="mt-3 w-full rounded-[11px] border border-hairline bg-canvas px-3 py-2.5 text-[13px] text-ink outline-none placeholder:text-haze focus:border-accent"
      />
      <div className="mt-3 flex items-center gap-2">
        <Button
          type="button"
          onClick={save}
          disabled={busy || !dirty}
          className="min-h-[40px] py-2 text-[13px]"
        >
          {busy ? '保存中…' : '保存邮箱'}
        </Button>
        {hasSavedEmail && !dirty && !isVerified && (
          <button
            type="button"
            onClick={sendVerification}
            disabled={verifyBusy}
            className="flex min-h-[40px] items-center gap-1.5 rounded-btn border border-hairline bg-surface px-3 py-2 text-[12.5px] font-medium text-ink transition-colors hover:bg-canvas disabled:opacity-60"
          >
            <Send size={13} strokeWidth={1.55} />
            {verifyBusy ? '发送中…' : '发送验证邮件'}
          </button>
        )}
      </div>
      {message && <p className="mt-2 text-[11px] leading-relaxed text-ash">{message}</p>}
    </section>
  )
}
