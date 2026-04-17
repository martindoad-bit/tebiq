'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { VisaSession } from '@/types/session'

function ResultContent() {
  const params = useSearchParams()
  const router = useRouter()
  const sessionId = params.get('session') || ''
  const [session, setSession] = useState<VisaSession | null>(null)
  const [pdfUrl, setPdfUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  useEffect(() => { loadSession() }, [])

  async function loadSession() {
    const res = await fetch(`/api/session?sessionId=${sessionId}`)
    const data = await res.json()
    if (data.session) {
      setSession(data.session)
      generatePDF(data.session)
    }
    setLoading(false)
  }

  async function generatePDF(s: VisaSession) {
    setGenerating(true)
    const res = await fetch('/api/pdf/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session: s }),
    })
    const data = await res.json()
    if (data.downloadUrl) setPdfUrl(data.downloadUrl)
    setGenerating(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">読み込み中...</div>
  )

  if (!session) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">セッションが見つかりません</div>
  )

  const required = session.materials.filter(m => !m.conditional)
  const conditional = session.materials.filter(m => m.conditional)

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-amber-400 font-bold text-sm mb-2">TEBIQ</div>
        <h1 className="text-2xl font-bold mb-2">必要書類リスト</h1>
        <p className="text-slate-400 text-sm mb-6">{session.visaType} / {session.materials.length}点</p>

        {session.requiresReferral && (
          <div className="bg-red-900/40 border border-red-700 rounded-xl p-4 mb-6">
            <div className="font-bold text-red-400 mb-1">⚠ 行政書士への相談を推奨</div>
            <p className="text-sm text-red-300">{session.referralReason || 'お客様の状況では専門家のサポートをお勧めします。'}</p>
            <button onClick={() => router.push(`/referral?session=${sessionId}`)}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-500">
              書士に相談する
            </button>
          </div>
        )}

        {/* Required materials */}
        <div className="bg-slate-800 rounded-2xl p-4 mb-4">
          <h2 className="font-bold mb-3">必須書類（{required.length}点）</h2>
          <div className="space-y-2">
            {required.map((m, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {conditional.length > 0 && (
          <div className="bg-slate-800 rounded-2xl p-4 mb-4">
            <h2 className="font-bold mb-3">条件付き書類（{conditional.length}点）</h2>
            <div className="space-y-3">
              {conditional.map((m, i) => (
                <div key={i} className="text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">△</span>
                    <span>{m.name}</span>
                  </div>
                  {m.condition && <p className="text-slate-500 text-xs ml-5">条件: {m.condition}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        {session.submissionSteps.length > 0 && (
          <div className="bg-slate-800 rounded-2xl p-4 mb-6">
            <h2 className="font-bold mb-3">提出ステップ</h2>
            <div className="space-y-3">
              {session.submissionSteps.map(s => (
                <div key={s.step} className="flex gap-3 text-sm">
                  <div className="w-6 h-6 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <div className="font-bold">{s.title}</div>
                    <div className="text-slate-400">{s.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PDF download */}
        {generating ? (
          <div className="w-full bg-slate-700 text-slate-400 font-bold py-4 rounded-xl text-center">
            PDFを生成中...
          </div>
        ) : pdfUrl ? (
          <a href={pdfUrl} download="tebiq-documents.pdf"
            className="block w-full bg-amber-400 text-slate-900 font-bold py-4 rounded-xl text-center text-lg hover:bg-amber-300 transition-all">
            PDFをダウンロード
          </a>
        ) : null}
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">読み込み中...</div>}>
      <ResultContent />
    </Suspense>
  )
}
