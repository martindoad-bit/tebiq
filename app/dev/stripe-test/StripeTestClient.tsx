'use client'

import { useState } from 'react'

type Product =
  | 'basic_monthly'
  | 'basic_yearly'
  | 'material_package'
  | 'expert_consultation'

interface ApiSuccess {
  ok: true
  data: { checkout_url: string }
}
interface ApiError {
  ok: false
  error: { code: string; message: string }
}

const PRODUCTS: { id: Product; label: string; sub: string }[] = [
  { id: 'basic_monthly', label: '基础会员（月）', sub: '¥280/月 · 首月 ¥1（需先登录）' },
  { id: 'basic_yearly', label: '基础会员（年）', sub: '¥2,800/年（需先登录）' },
  { id: 'material_package', label: '材料包', sub: '¥980 · 一次性（无需登录）' },
  { id: 'expert_consultation', label: '专家咨询', sub: '¥9,800 · 一次性（无需登录）' },
]

export function StripeTestClient() {
  const [loading, setLoading] = useState<Product | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function handleClick(product: Product) {
    setErr(null)
    setLoading(product)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ product }),
      })
      const json = (await res.json()) as ApiSuccess | ApiError
      if (!json.ok) {
        setErr(`${json.error.code}: ${json.error.message}`)
        setLoading(null)
        return
      }
      window.location.href = json.data.checkout_url
    } catch (e) {
      setErr(e instanceof Error ? e.message : '请求失败')
      setLoading(null)
    }
  }

  return (
    <div className="space-y-3">
      {PRODUCTS.map(p => (
        <button
          key={p.id}
          type="button"
          onClick={() => handleClick(p.id)}
          disabled={loading !== null}
          className="w-full rounded-xl bg-card border border-line p-4 text-left hover:border-primary disabled:opacity-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-title">{p.label}</div>
              <div className="text-xs text-muted mt-1">{p.sub}</div>
            </div>
            <div className="text-sm text-primary">
              {loading === p.id ? '跳转中…' : '开始 →'}
            </div>
          </div>
        </button>
      ))}
      {err && (
        <div className="rounded-lg bg-risk-high-bg text-risk-high-fg p-3 text-sm">
          {err}
        </div>
      )}
    </div>
  )
}
