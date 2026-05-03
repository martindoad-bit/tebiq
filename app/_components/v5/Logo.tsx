import Image from 'next/image'

/**
 * Logo — v5 头部 logo。
 */
export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 22 : size === 'lg' ? 38 : 28
  const text =
    size === 'sm'
      ? 'text-[14px]'
      : size === 'lg'
        ? 'text-[clamp(24px,7vw,32px)]'
        : 'text-[18px]'
  return (
    <div className="flex items-center gap-2.5" aria-label="TEBIQ">
      <Image
        src="/brand/tebiq-v07/svg/tebiq-v07-app-icon.svg"
        alt=""
        width={dim}
        height={dim}
        priority={size === 'md'}
        className="rounded-[9px]"
        unoptimized
      />
      <span className="flex flex-col">
        <span className={`${text} font-medium leading-none text-ink tracking-[0.02em]`}>
          TEBIQ
        </span>
        {size === 'lg' && (
          <span className="mt-1 text-[10px] font-medium leading-none tracking-[0.36em] text-ash">
            てびき
          </span>
        )}
      </span>
    </div>
  )
}
