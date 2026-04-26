import Image from 'next/image'

/**
 * Logo — v5 头部 logo。
 */
export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 20 : 24
  const text = size === 'sm' ? 'text-[13px]' : 'text-[15px]'
  return (
    <div className="flex items-center gap-1.5" aria-label="TEBIQ">
      <Image
        src="/logo-icon.png"
        alt=""
        width={dim}
        height={dim}
        priority={size === 'md'}
        className="rounded-[7px]"
      />
      <span className={`${text} font-medium text-ink tracking-[0.03em]`}>TEBIQ</span>
    </div>
  )
}
