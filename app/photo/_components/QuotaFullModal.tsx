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
import Link from 'next/link'
import { Check, Crown } from 'lucide-react'
import Button from '@/app/_components/v5/Button'

interface Props {
  open: boolean
  onClose: () => void
}

const FEATURES = [
  '无限次拍照识别',
  '自动提醒重要事项',
  '永久保存档案',
  '家人共用账户',
] as const

export default function QuotaFullModal({ open, onClose }: Props) {
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
        className="bg-canvas px-[18px] pt-3 pb-6 flex-shrink-0 mx-auto w-full shadow-raised md:max-w-phone"
        style={{
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
        }}
      >
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-ink/12" />
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-[13px] bg-accent-2 text-ink shadow-soft">
          <Crown size={20} strokeWidth={1.55} />
        </div>
        <h2
          id="quota-modal-title"
          className="text-[16px] font-medium text-ink text-center mb-1"
        >
          本月免费额度已用完
        </h2>
        <p className="text-[11.5px] text-ash text-center mb-[14px]">
          开通会员，享受无限次拍照即懂
        </p>

        <ul className="mb-4 space-y-1.5 rounded-card border border-hairline bg-surface/70 px-3.5 py-3 shadow-card">
          {FEATURES.map(f => (
            <li
              key={f}
              className="flex items-center gap-2 text-[12px] text-ink leading-[1.5]"
            >
              <span
                aria-hidden
                className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent text-ink"
              >
                <Check size={11} strokeWidth={2} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Link href="/subscribe" className="block">
          <Button>立即开通会员</Button>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="block w-full text-center text-[12px] text-ash mt-3"
        >
          稍后再说
        </button>
      </div>
    </div>
  )
}
