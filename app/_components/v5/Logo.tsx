/**
 * Logo — v5 头部 logo（深蓝方块 + 橙色 T + TEBIQ 字样）
 */
export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 18 : 22
  const text = size === 'sm' ? 'text-[13px]' : 'text-[15px]'
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="bg-ink rounded-[7px] flex items-center justify-center text-accent font-bold"
        style={{ width: dim, height: dim, fontSize: dim - 11 }}
      >
        T
      </div>
      <span className={`${text} font-medium text-ink tracking-[0.5px]`}>TEBIQ</span>
    </div>
  )
}
