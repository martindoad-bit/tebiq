'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

function ReferralContent() {
  const params = useSearchParams()
  const router = useRouter()
  const sessionId = params.get('session') || ''
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit() {
    if (!name || !email) return
    setSubmitting(true)
    await fetch('/api/referral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, name, email, message }),
    })
    setDone(true)
    setSubmitting(false)
  }

  if (done) return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold mb-2">送信完了</h1>
      <p className="text-slate-400 mb-6">担当の行政書士より24時間以内にご連絡します。</p>
      <button onClick={() => router.push('/')} className="text-amber-400 underline">トップに戻る</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-amber-400 font-bold text-sm mb-2">TEBIQ</div>
        <h1 className="text-2xl font-bold mb-2">行政書士に相談</h1>
        <p className="text-slate-400 text-sm mb-6">フォームを送信すると、提携書士が24時間以内に連絡します。</p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">お名前 *</label>
            <input value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl outline-none border border-slate-700 focus:border-amber-400"
              placeholder="山田 太郎" />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">メールアドレス *</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email"
              className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl outline-none border border-slate-700 focus:border-amber-400"
              placeholder="example@email.com" />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">ご相談内容（任意）</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
              className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl outline-none border border-slate-700 focus:border-amber-400 resize-none"
              placeholder="気になることを自由に記入してください" />
          </div>
        </div>

        <button onClick={handleSubmit} disabled={!name || !email || submitting}
          className="w-full bg-amber-400 text-slate-900 font-bold py-4 rounded-xl text-lg disabled:opacity-40 hover:bg-amber-300 transition-all">
          {submitting ? '送信中...' : '相談を申し込む'}
        </button>
      </div>
    </div>
  )
}

export default function ReferralPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">読み込み中...</div>}>
      <ReferralContent />
    </Suspense>
  )
}
