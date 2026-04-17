'use client'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

interface Message {
  role: 'assistant' | 'user'
  text: string
}

function SurveyContent() {
  const params = useSearchParams()
  const router = useRouter()
  const sessionId = params.get('session') || ''
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [total, setTotal] = useState(4)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { startSurvey() }, [])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function startSurvey() {
    setLoading(true)
    const res = await fetch('/api/survey/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, questionIndex: 0 }),
    })
    const data = await res.json()
    if (data.question) {
      setMessages([{ role: 'assistant', text: data.question }])
      setTotal(data.total || 4)
    }
    setLoading(false)
  }

  async function handleSend() {
    if (!input.trim() || loading) return
    const userText = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userText }])
    setLoading(true)

    const nextIndex = questionIndex + 1
    const res = await fetch('/api/survey/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, answer: userText, questionIndex: nextIndex }),
    })
    const data = await res.json()

    if (data.done) {
      setDone(true)
      setMessages(prev => [...prev, { role: 'assistant', text: '回答ありがとうございました！書類リストを作成しています...' }])
      setTimeout(() => router.push(`/result?session=${sessionId}`), 1500)
    } else if (data.question) {
      setMessages(prev => [...prev, { role: 'assistant', text: data.question }])
      setQuestionIndex(nextIndex)
    }
    setLoading(false)
  }

  const progress = Math.round((questionIndex / total) * 100)

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-blue-950 px-4 py-3 flex items-center gap-3">
        <div className="text-amber-400 font-bold">TEBIQ</div>
        <div className="flex-1 bg-slate-700 rounded-full h-2">
          <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-slate-400 text-sm">{questionIndex}/{total}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-amber-400 text-slate-900'
                : 'bg-slate-800 text-white'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 px-4 py-3 rounded-2xl text-slate-400 text-sm">
              入力中...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!done && (
        <div className="px-4 py-4 bg-slate-800 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="回答を入力..."
            className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-xl outline-none placeholder-slate-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-amber-400 text-slate-900 px-5 py-3 rounded-xl font-bold disabled:opacity-40"
          >
            送信
          </button>
        </div>
      )}
    </div>
  )
}

export default function SurveyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">読み込み中...</div>}>
      <SurveyContent />
    </Suspense>
  )
}
