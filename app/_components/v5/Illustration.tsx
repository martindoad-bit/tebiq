import Image from 'next/image'

/**
 * Illustration — v5 入口插画。
 */
interface Props {
  /** 插画区高度，默认 130 */
  height?: number
  /** 无障碍描述 */
  subject: string
  /** 项目内图片路径 */
  src?: string
}

export default function Illustration({
  height = 130,
  subject,
  src = '/illustrations/renewal-check.svg',
}: Props) {
  return (
    <div
      className="relative my-4 w-full overflow-hidden rounded-card border border-hairline bg-surface shadow-card"
      style={{ height }}
      role="img"
      aria-label={subject}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 420px) 90vw, 360px"
        className="object-contain"
        priority
      />
      <div className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-white/70" />
    </div>
  )
}
