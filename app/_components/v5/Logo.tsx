import Image from 'next/image'

/**
 * Logo — v5 头部 logo。
 */
export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 22 : size === 'lg' ? 34 : 28
  const text =
    size === 'sm'
      ? 'text-[14px]'
      : size === 'lg'
        ? 'text-[clamp(22px,6.4vw,30px)]'
        : 'text-[18px]'
  return (
    <div className="flex items-center gap-2" aria-label="TEBIQ">
      <Image
        src="/logo-icon.png"
        alt=""
        width={dim}
        height={dim}
        priority={size === 'md'}
        className="rounded-[9px]"
      />
      <span className={`${text} font-semibold text-ink tracking-[0.02em]`}>TEBIQ</span>
    </div>
  )
}
