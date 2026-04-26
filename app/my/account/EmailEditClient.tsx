'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import Button from '@/app/_components/v5/Button'

export default function EmailEditClient({ initialEmail }: { initialEmail: string | null }) {
  const [email, setEmail] = useState(initialEmail ?? '')
  const [savedEmail, setSavedEmail] = useState(initialEmail ?? '')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

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
      setMessage(nextEmail ? '已保存提醒邮箱' : '已清空提醒邮箱')
    } catch {
      setMessage('网络异常，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  const dirty = email.trim() !== savedEmail

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
      </div>
      {message && <p className="mt-2 text-[11px] leading-relaxed text-ash">{message}</p>}
    </section>
  )
}
