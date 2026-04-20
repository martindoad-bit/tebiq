'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { VisaSession } from '@/types/session'
import { FORM_QUESTIONS } from '@/lib/config/visa-form-fields'

function ResultContent() {
  const params = useSearchParams()
  const sessionId = params.get('session') || ''
  const [session, setSession] = useState<VisaSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    fetch(`/api/session?sessionId=${sessionId}`)
      .then(r => r.json())
      .then(data => { setSession(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [sessionId])

  async function handleDownload() {
    setDownloading(true)
    try {
      const res = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      if (!res.ok) throw new Error('PDF generation failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'tebiq-application.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('PDF生成失败，请重试')
    }
    setDownloading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">
        加载中...
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">
        找不到数据，请重新开始
      </div>
    )
  }

  const questions = FORM_QUESTIONS[session.visaType] || []
  const formData = session.formData

  return (
    <div className="min-h-screen bg-slate-900 pb-24">
      {/* Header */}
      <div className="bg-blue-950 px-4 py-4">
        <div className="text-amber-400 font-bold text-lg">TEBIQ</div>
        <div className="text-white text-sm mt-1">申请材料已生成</div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

        {/* Success banner */}
        <div className="bg-green-900/40 border border-green-700 rounded-xl px-4 py-3 text-green-300 text-sm">
          ✅ 信息收集完成！请下载PDF，按照表格内容填写官方申请书后提交入管局。
        </div>

        {/* Form data summary */}
        {formData && (
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-700 px-4 py-3">
              <h2 className="text-white font-bold text-sm">您的申请信息</h2>
              <p className="text-slate-400 text-xs mt-0.5">以下信息将填入申请书</p>
            </div>
            <div className="divide-y divide-slate-700">
              {questions.map((q, i) => {
                const value = formData[q.id]
                if (!value) return null
                return (
                  <div key={q.id} className={`px-4 py-3 flex gap-3 ${i % 2 === 0 ? '' : 'bg-slate-800/50'}`}>
                    <div className="flex-1">
                      <div className="text-slate-400 text-xs">{q.fieldLabelJa}</div>
                      <div className="text-white text-sm mt-0.5 font-medium">{value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Next steps */}
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <div className="bg-slate-700 px-4 py-3">
            <h2 className="text-white font-bold text-sm">提交步骤</h2>
          </div>
          <div className="px-4 py-3 space-y-3">
            {[
              { n: 1, title: '下载PDF', desc: '点击下方按钮下载申请材料参考文档' },
              { n: 2, title: '准备材料', desc: '按PDF内容准备护照、在留卡、源泉徴収票等材料' },
              { n: 3, title: '填写官方申请书', desc: '在入管局官网下载「在留期間更新許可申請書」，对照PDF填写' },
              { n: 4, title: '提交入管局', desc: '携带所有材料前往管辖区域的入管局窗口提交' },
              { n: 5, title: '等待审查结果', desc: '标准处理时间2周～3个月，结果邮寄到家' },
            ].map(s => (
              <div key={s.n} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {s.n}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{s.title}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Download button - fixed bottom */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-slate-900 border-t border-slate-700">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full bg-amber-400 text-slate-900 font-bold py-4 rounded-xl text-base disabled:opacity-50"
        >
          {downloading ? '生成中...' : '📄 下载申请材料PDF'}
        </button>
        <p className="text-slate-500 text-xs text-center mt-2">
          PDF为参考资料，请使用入管局官方表格正式提交
        </p>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">
        加载中...
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
