/**
 * QuotaFullModal — 屏 15 拍照配额用完
 *
 * 视觉：从底部弹起的米色 sheet（rounded top 18px），上方为深蓝半透明遮罩。
 * 使用：当 /photo 路由 query ?quota=full 出现，或上传时收到 402 quota_exceeded。
 *
 * Props:
 *  - open: 是否展示
 *  - onClose: 关闭回调（清除 query / 刷新 router）
 */
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Archive, X } from 'lucide-react'
import { trackClient } from '@/lib/analytics/client'
import { EVENT } from '@/lib/analytics/events'

interface Props {
  open: boolean
  onClose: () => void
  /** 距明天额度重置剩余天数（保留旧 prop 名称兼容调用方） */
  daysUntilReset?: number
}

export default function QuotaFullModal({ open, onClose, daysUntilReset }: Props) {
  const [archivedCount, setArchivedCount] = useState<number | null>(null)

  useEffect(() => {
    if (open) {
      trackClient(EVENT.QUOTA_MODAL_VIEW, {
        daysUntilReset: daysUntilReset ?? null,
      })
      setArchivedCount(null)
      fetch('/api/photo/quota')
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          const count = data?.data?.archivedDocumentsCount
          if (typeof count === 'number') setArchivedCount(count)
        })
        .catch(() => {
          setArchivedCount(null)
        })
    }
  }, [open, daysUntilReset])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quota-modal-title"
    >
      {/* 遮罩 — 深蓝半透明 */}
      <button
        type="button"
        aria-label="关闭"
        className="flex-1 bg-ink/85 cursor-default"
        onClick={onClose}
      />
      {/* sheet */}
      <div
        className="relative bg-canvas px-[18px] pt-3 pb-6 flex-shrink-0 mx-auto w-full md:max-w-phone"
        style={{
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
        }}
      >
        <button
          type="button"
          onClick={() => {
            trackClient(EVENT.QUOTA_MODAL_DISMISS, {})
            onClose()
          }}
          aria-label="关闭"
          className="focus-ring absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-btn border border-hairline bg-surface text-ash"
        >
          <X size={16} strokeWidth={1.6} />
        </button>
        <div className="mx-auto mb-5 h-1 w-9 rounded-full bg-ink/12" />
        <h2
          id="quota-modal-title"
          className="text-[16px] font-medium text-ink text-center mb-2"
        >
          今日次数已用完
        </h2>
        <p className="mx-auto max-w-[300px] text-center text-[12px] leading-[1.65] text-ash">
          免费版每天可识别 1 次。已识别的文书在「我的提醒」时间线。
        </p>

        <div className="my-4 rounded-card border border-hairline bg-surface px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-ink">
            <Archive size={16} strokeWidth={1.55} />
            <span className="text-[13px] font-medium">
              {archivedCount === null ? '已归档文书统计中' : `已归档 ${archivedCount} 份文书`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/timeline"
            className="flex min-h-[44px] items-center justify-center rounded-btn border border-hairline bg-surface px-3 py-3 text-center text-[13px] font-medium text-ink transition-colors hover:bg-canvas"
          >
            查看时间线
          </Link>
          <Link
            href="/pricing"
            className="flex min-h-[44px] items-center justify-center rounded-btn border border-hairline bg-surface px-3 py-3 text-center text-[13px] font-medium text-ink transition-colors hover:bg-canvas"
            onClick={() => trackClient(EVENT.QUOTA_MODAL_SUBSCRIBE_CLICK, {})}
          >
            升级会员
          </Link>
        </div>
      </div>
    </div>
  )
}
