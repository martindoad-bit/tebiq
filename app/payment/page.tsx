'use client'
import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

function PaymentContent() {
  const params = useSearchParams()
  const router = useRouter()
  const sessionId = params.get('session') || ''

  useEffect(() => {
    if (!sessionId) return
    const interval = setInterval(async () => {
      const res = await fetch(`/api/payment/status?sessionId=${sessionId}`)
      const data = await res.json()
      if (data.status === 'COMPLETED') {
        clearInterval(interval)
        router.push(`/survey?session=${sessionId}`)
      }
    }, 2000)
    // Auto-proceed after 10s in dev
    const timeout = setTimeout(() => {
      clearInterval(interval)
      router.push(`/survey?session=${sessionId}`)
    }, 10000)
    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [sessionId, router])

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4 text-center">
      <div className="text-amber-400 font-bold text-sm mb-6">TEBIQ</div>
      <div className="text-4xl mb-4">💳</div>
      <h1 className="text-2xl font-bold mb-2">支払いを確認中</h1>
      <p className="text-slate-400">PayPayでの支払いが完了すると自動で次に進みます</p>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">読み込み中...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
