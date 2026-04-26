/**
 * Illustration — 插画占位（Block 3 期间用）
 *
 * Block 3 完成后创始人会用 GPT Image 生成真插画接进来；这里只是
 * 视觉占位，按 v5 原型的尺寸保留位置。
 */
interface Props {
  /** 占位区高度，默认 130 */
  height?: number
  /** 给创始人和 GPT Image 的主题描述 */
  subject: string
  /** 备注（如建议风格 / 比例） */
  note?: string
}

export default function Illustration({ height = 130, subject, note }: Props) {
  return (
    <div
      className="w-full bg-accent-2 rounded-card flex flex-col items-center justify-center text-center px-4 py-3 my-4"
      style={{ height }}
      role="img"
      aria-label={subject}
    >
      <span className="text-[11px] text-ash leading-snug">[插画占位]</span>
      <span className="text-[12px] text-ink font-medium mt-1 leading-snug">
        {subject}
      </span>
      {note && <span className="text-[10px] text-ash mt-1 leading-snug">{note}</span>}
    </div>
  )
}
