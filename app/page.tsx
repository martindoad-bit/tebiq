'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { VISA_TYPE_LIST } from '@/lib/config/visa-types'

export default function Home() {
  const router = useRouter()
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleStart() {
    if (!selected) return
    setLoading(true)
    const res = await fetch('/api/payment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visaType: selected }),
    })
    const data = await res.json()
    if (data.redirectUrl) {
      router.push(data.redirectUrl)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-950 to-slate-900 px-4 pt-16 pb-12 text-center">
        <div className="inline-block bg-amber-400 text-blue-950 text-sm font-bold px-3 py-1 rounded-full mb-6">
          TEBIQ
        </div>
        <h1 className="text-3xl font-bold mb-4 leading-tight">
          在留資格の必要書類を<br />
          <span className="text-amber-400">3分で確認</span>
        </h1>
        <p className="text-slate-300 text-base mb-2">
          質問に答えるだけ。AIがあなたの状況に合わせた<br />
          書類リストをPDFで生成します。
        </p>
        <p className="text-slate-400 text-sm">¥9,800〜 / 書士相談不要ケースに最適</p>
      </div>

      {/* Visa selector */}
      <div className="max-w-md mx-auto px-4 py-8">
        <h2 className="text-lg font-bold mb-4 text-center">ビザの種類を選択</h2>
        <div className="space-y-3 mb-8">
          {VISA_TYPE_LIST.map(v => (
            <button
              key={v.id}
              onClick={() => setSelected(v.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selected === v.id
                  ? 'border-amber-400 bg-blue-950'
                  : 'border-slate-700 bg-slate-800 hover:border-slate-500'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">{v.label}</div>
                  <div className="text-slate-400 text-sm">{v.description}</div>
                </div>
                <div className="text-amber-400 font-bold text-sm">¥{v.price.toLocaleString()}</div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleStart}
          disabled={!selected || loading}
          className="w-full bg-amber-400 text-slate-900 font-bold py-4 rounded-xl text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-300 transition-all"
        >
          {loading ? '処理中...' : '今すぐ書類を確認する →'}
        </button>

        <p className="text-center text-slate-500 text-xs mt-4">
          ※ 支払い完了後、AIによる質問が始まります
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-md mx-auto px-4 pb-12">
        <h2 className="text-lg font-bold mb-4 text-center text-slate-300">使い方</h2>
        {[
          { n: '1', t: 'ビザの種類を選んで支払い', d: 'PayPayで簡単決済' },
          { n: '2', t: 'AIの質問に答える', d: '3〜5分で完了' },
          { n: '3', t: '書類リストをPDFで受け取る', d: '即ダウンロード可能' },
        ].map(s => (
          <div key={s.n} className="flex gap-4 mb-4">
            <div className="w-8 h-8 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">
              {s.n}
            </div>
            <div>
              <div className="font-bold">{s.t}</div>
              <div className="text-slate-400 text-sm">{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
