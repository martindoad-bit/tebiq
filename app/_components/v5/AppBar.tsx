/**
 * AppBar — v5 顶部导航栏。
 *
 * 三种用法：
 *  1. <AppBar /> — 透明，无内容（首页、tab 顶级页面）
 *  2. <AppBar title="拍照即懂" back /> — 标题 + 返回箭头
 *  3. <AppBar title="..." back right={<Bell />} /> — 自定义右侧
 */
'use client'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  title?: string
  /** 显示返回箭头；可传 string 指定 href，true 用 router.back() */
  back?: boolean | string
  right?: ReactNode
  /** 透明背景（默认 canvas 同色） */
  transparent?: boolean
}

export default function AppBar({ title, back, right, transparent }: Props) {
  const router = useRouter()
  const onBack = () => {
    if (typeof back === 'string') router.push(back)
    else router.back()
  }
  return (
    <header
      className={`flex-shrink-0 h-[56px] px-5 flex items-center justify-between ${
        transparent ? '' : 'bg-canvas'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}
    >
      {back ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="返回"
          className="focus-ring -ml-2 flex h-10 w-10 items-center justify-center rounded-btn text-ink"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
      ) : (
        <span className="w-10" />
      )}
      <h1 className="truncate text-[18px] font-medium leading-none text-ink">
        {title}
      </h1>
      <div className="flex w-10 items-center justify-end">{right}</div>
    </header>
  )
}
