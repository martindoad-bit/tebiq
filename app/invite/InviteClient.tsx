'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Check, Copy, Gift, Share2 } from 'lucide-react'
import Button from '@/app/_components/v5/Button'
import { trackClient } from '@/lib/analytics/client'
import { EVENT } from '@/lib/analytics/events'

interface InviteData {
  code: string
  url: string
  rewardDays: number
  stats: {
    invitedCount: number
    earnedDays: number
    pendingDays: number
  }
}

export default function InviteClient() {
  const [data, setData] = useState<InviteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/invite/create', { method: 'POST' })
      .then(async res => {
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error ?? '无法生成邀请链接')
        setData(json)
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const shareText = useMemo(() => {
    if (!data) return ''
    return `我在用 TEBIQ 处理在日手续。通过这个链接注册，你和我都能获得 ${data.rewardDays} 天会员体验：${data.url}`
  }, [data])

  async function copyLink() {
    if (!data) return
    trackClient(EVENT.SHARE_CLICK, { method: 'copy', source: 'invite_page' })
    await navigator.clipboard.writeText(data.url)
    setCopied(true)
    trackClient(EVENT.SHARE_COMPLETED, { method: 'copy' })
    window.setTimeout(() => setCopied(false), 1800)
  }

  async function shareLink() {
    if (!data) return
    trackClient(EVENT.SHARE_CLICK, { method: 'navigator', source: 'invite_page' })
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TEBIQ 邀请',
          text: shareText,
          url: data.url,
        })
        trackClient(EVENT.SHARE_COMPLETED, { method: 'navigator' })
      } catch {
        /* 用户取消分享 — 不计完成 */
      }
      return
    }
    await copyLink()
  }

  return (
    <div className="pt-2 pb-4">
      <section className="rounded-card border border-hairline bg-surface px-4 pt-4 pb-5 text-center shadow-card">
        <div className="relative mx-auto h-[230px] w-full overflow-hidden rounded-card border border-white/80 bg-surface shadow-raised">
          <Image
            src="/illustrations/invite-share-wide-image2.png"
            alt=""
            fill
            priority
            sizes="(max-width: 420px) 90vw, 360px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-white/60" />
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent-2 px-3 py-1 text-[11px] font-medium text-ink">
          <Gift size={13} strokeWidth={1.55} />
          双方各得会员体验
        </div>
        <h1 className="mt-4 text-[clamp(28px,8.5vw,38px)] font-semibold leading-tight text-ink">
          邀请朋友一起用 TEBIQ
        </h1>
        <p className="mx-auto mt-3 max-w-[330px] text-[clamp(14px,4vw,17px)] leading-[1.65] text-slate/78">
          朋友通过你的链接注册成功后，你和朋友各获得 7 天 basic 会员体验。
        </p>
      </section>

      <section className="mt-4 grid grid-cols-3 gap-2">
        <StatCard label="已邀请" value={data ? `${data.stats.invitedCount} 人` : '--'} />
        <StatCard label="已获得" value={data ? `${data.stats.earnedDays} 天` : '--'} />
        <StatCard label="待领取" value={data ? `${data.stats.pendingDays} 天` : '--'} />
      </section>

      <section className="mt-4 rounded-card border border-hairline bg-surface p-4 shadow-card">
        <div className="mb-2 text-[12px] font-medium text-ink">邀请链接</div>
        <div className="flex min-h-[46px] items-center gap-2 rounded-btn border border-hairline bg-canvas px-3">
          <span className="min-w-0 flex-1 truncate text-[12px] text-slate">
            {loading ? '生成中…' : data?.url ?? '暂时无法生成链接'}
          </span>
          {copied && <Check size={15} strokeWidth={1.7} className="text-success" />}
        </div>
        {error && <p className="mt-2 text-[11px] leading-relaxed text-danger">{error}</p>}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={copyLink}
            disabled={!data || loading}
            className="flex items-center justify-center gap-1.5"
          >
            <Copy size={15} strokeWidth={1.55} />
            复制
          </Button>
          <Button
            type="button"
            onClick={shareLink}
            disabled={!data || loading}
            className="flex items-center justify-center gap-1.5"
          >
            <Share2 size={15} strokeWidth={1.55} />
            分享
          </Button>
        </div>
      </section>

      <section className="mt-4 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        <h2 className="text-[13px] font-medium text-ink">规则</h2>
        <ul className="mt-2 space-y-1.5 text-[11.5px] leading-[1.6] text-ash">
          <li>朋友使用你的链接完成手机号注册后，奖励自动发放。</li>
          <li>体验期会加到当前会员有效期之后，不会覆盖已有时间。</li>
          <li>邀请奖励用于 TEBIQ basic 会员体验，不涉及现金返利。</li>
        </ul>
      </section>

      <Link href="/my/account" className="mt-5 block text-center text-[12px] text-ash">
        返回我的账户
      </Link>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[13px] border border-hairline bg-surface px-2 py-3 text-center shadow-card">
      <div className="text-[10.5px] leading-none text-ash">{label}</div>
      <div className="mt-1.5 text-[15px] font-medium leading-none text-ink">{value}</div>
    </div>
  )
}
