import Image from 'next/image'

interface Props {
  src: string
  alt: string
  className?: string
}

export default function EmptyVisual({ src, alt, className = '' }: Props) {
  return (
    <span
      className={`mx-auto flex h-[88px] w-[116px] items-center justify-center ${className}`}
      role="img"
      aria-label={alt}
    >
      <Image src={src} alt="" width={116} height={88} className="h-auto w-full" />
    </span>
  )
}
