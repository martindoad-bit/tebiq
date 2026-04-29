import Image from 'next/image'

interface Props {
  src: string
  alt: string
  className?: string
}

export default function EmptyVisual({ src, alt, className = '' }: Props) {
  return (
    <span
      className={`mx-auto flex h-[112px] w-[150px] items-center justify-center overflow-hidden rounded-card border border-hairline bg-surface ${className}`}
      role="img"
      aria-label={alt}
    >
      <Image src={src} alt="" width={300} height={225} className="h-full w-full object-cover" />
    </span>
  )
}
