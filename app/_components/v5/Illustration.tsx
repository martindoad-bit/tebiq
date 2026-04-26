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
      className="relative my-4 w-full overflow-hidden rounded-card border border-hairline bg-accent-2 px-4 py-3 shadow-card"
      style={{ height }}
      role="img"
      aria-label={subject}
    >
      <div className="absolute left-5 top-5 h-[86px] w-[74px] rounded-[12px] border border-ink/12 bg-white shadow-soft">
        <div className="mx-auto -mt-2 h-5 w-9 rounded-[7px] bg-ink" />
        <div className="mt-4 space-y-2 px-4">
          <span className="block h-1.5 rounded-full bg-success" />
          <span className="block h-1.5 rounded-full bg-success" />
          <span className="block h-1.5 rounded-full bg-accent" />
        </div>
      </div>
      <div className="absolute bottom-4 left-[86px] h-12 w-16 rounded-[12px] bg-cool-blue/80" />
      <div className="absolute right-8 top-6 h-14 w-14 rounded-full bg-cool-blue" />
      <div className="absolute right-10 top-[62px] h-[58px] w-[46px] rounded-t-[18px] bg-ink/82" />
      <div className="absolute right-[58px] top-[47px] h-5 w-5 rounded-full bg-[#F2C18B]" />
      <div className="absolute right-5 bottom-5 h-10 w-[54px] rotate-[-5deg] rounded-[10px] border border-ink/10 bg-white shadow-soft" />
      <div className="absolute bottom-4 left-4 right-4 h-px bg-white/70" />
      {note && (
        <span className="absolute bottom-3 left-4 text-[10px] text-ash">{note}</span>
      )}
    </div>
  )
}
