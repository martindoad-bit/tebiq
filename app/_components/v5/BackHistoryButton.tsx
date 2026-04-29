'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackHistoryButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="focus-ring flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-btn bg-ink px-4 py-3 text-[13px] font-medium text-white"
    >
      <ArrowLeft size={14} strokeWidth={1.55} />
      返回上一页
    </button>
  )
}
