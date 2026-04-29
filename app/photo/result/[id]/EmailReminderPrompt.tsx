'use client'

import { useState } from 'react'
import { BellRing, X } from 'lucide-react'
import Button from '@/app/_components/v5/Button'

export default function EmailReminderPrompt() {
  const [visible, setVisible] = useState(true)
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  if (!visible) return null

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
        setMessage(data?.error ?? '请输入有效邮箱')
        return
      }
      setMessage('已保存。之后可在我的账户修改。')
      window.setTimeout(() => setVisible(false), 900)
    } catch {
      setMessage('网络异常，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
          <BellRing size={17} strokeWidth={1.5} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[13px] font-medium leading-snug text-ink">
            邮箱提醒
          </h2>
          <p className="mt-1 text-[11px] leading-[1.55] text-ash">
            留一个邮箱，后续有在留期限、缴费期限时提醒你。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="跳过"
          className="focus-ring -mr-1 -mt-1 flex h-7 w-7 items-center justify-center rounded-btn text-ash"
        >
          <X size={15} strokeWidth={1.5} />
        </button>
      </div>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="name@example.com"
        className="focus-ring mt-3 w-full rounded-btn border border-hairline bg-surface px-3 py-2.5 text-[13px] text-ink outline-none placeholder:text-haze focus:border-ink"
      />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="min-h-[40px] rounded-btn border border-hairline px-3 py-2 text-[12px] font-medium text-ink"
        >
          跳过
        </button>
        <Button
          type="button"
          onClick={save}
          disabled={busy}
          className="min-h-[40px] py-2 text-[12px]"
        >
          {busy ? '处理中...' : '保存'}
        </Button>
      </div>
      {message && <p className="mt-2 text-[11px] leading-relaxed text-ash">{message}</p>}
    </section>
  )
}
