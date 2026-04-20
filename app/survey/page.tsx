'use client'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

interface Message {
  role: 'assistant' | 'user'
  text: string
  hint?: string
  isRetry?: boolean
}

function SurveyContent() {
  const params = useSearchParams()
  const router = useRouter()
  const sessionId = params.get('session') || ''
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [total, setTotal] = useState(20)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { startSurvey() }, [])
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function startSurvey() {
    setLoading(true)
    const res = await fetch('/api/survey/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, questionIndex: 0 }),
    })
    const data = await res.json()
    if (data.question) {
      setMessages([{ role: 'assistant', text: data.question, hint: data.hint }])
      setTotal(data.total || 20)
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
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: '✅ 信息收集完成！正在生成您的申请材料，请稍候...' },
      ])
      setTimeout(() => router.push(`/result?session=${sessionId}`), 1800)
    } else if (data.question) {
      if (data.retry) {
        // Validation failed — ask the same question again
        setMessages(prev => [
          ...prev,
          { role: 'assistant', text: data.question, hint: data.hint, isRetry: true },
        ])
        // Do NOT increment questionIndex
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', text: data.question, hint: data.hint },
        ])
        setQuestionIndex(nextIndex)
        setTotal(data.total || total)
      }
    }
    setLoading(false)
  }

  const progress = total > 0 ? Math.round((questionIndex / total) * 100) : 0

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">

      {/* Header / Progress bar */}
      <div className="bg-blue-950 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <span className="text-amber-400 font-bold text-sm shrink-0">TEBIQ</span>
        <div className="flex-1 bg-slate-700 rounded-full h-2">
          <div
            className="bg-amber-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-slate-400 text-xs shrink-0">{questionIndex}/{total}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-amber-400 text-slate-900'
                  : m.isRetry
                  ? 'bg-red-900/60 text-red-100 border border-red-700'
                  : 'bg-slate-800 text-white'
              }`}
            >
              {m.text}
            </div>
            {m.hint && m.role === 'assistant' && (
              <p className="mt-1 ml-1 text-xs text-slate-500 max-w-[80%]">
                💡 {m.hint}
              </p>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 px-4 py-3 rounded-2xl text-slate-400 text-sm">
              处理中...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!done && (
        <div className="px-4 py-4 bg-slate-800 border-t border-slate-700 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="请输入您的回答..."
            className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-xl outline-none placeholder-slate-500 text-sm"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-amber-400 text-slate-900 px-5 py-3 rounded-xl font-bold disabled:opacity-40 text-sm shrink-0"
          >
            发送
          </button>
        </div>
      )}
    </div>
  )
}

export default function SurveyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">
          加载中...
        </div>
      }
    >
      <SurveyContent />
    </Suspense>
  )
}
