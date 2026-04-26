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
        className="bg-canvas px-[18px] pt-[22px] pb-6 flex-shrink-0 mx-auto w-full md:max-w-phone"
        style={{
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
        }}
      >
        <h2
          id="quota-modal-title"
          className="text-[16px] font-medium text-ink text-center mb-1"
        >
          本月免费额度已用完
        </h2>
        <p className="text-[11.5px] text-ash text-center mb-[14px]">
          开通会员，享受无限次拍照即懂
        </p>

        <ul className="mb-4 space-y-0">
          {FEATURES.map(f => (
            <li
              key={f}
              className="relative pl-4 text-[12px] text-ink leading-[1.7]"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[8px] w-1 h-1 rounded-full bg-accent"
              />
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
