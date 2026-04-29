/**
 * SaveToArchiveButton — 屏 03/04 底部保存反馈。
 *
 * Block 3 mock：documents 已经在识别时入库，这里只做 UX feedback：
 * 显示一个轻量 toast，然后 router.back() 回到拍照入口。
 *
 * 后续 Block：会调一个 /api/photo/archive POST 把 doc 标为 archived。
 */
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/_components/v5/Button'

export default function SaveToArchiveButton() {
  const router = useRouter()
  const [saved, setSaved] = useState(false)

  const onSave = () => {
    if (saved) return
    setSaved(true)
    // 给一点 toast 时间，然后退回拍照入口
    setTimeout(() => router.push('/photo'), 900)
  }

  return (
    <>
      <Button variant="secondary" onClick={onSave} disabled={saved}>
        {saved ? '已进入我的提醒' : '确认进入我的提醒'}
      </Button>
      {saved && (
        <p className="text-center text-[11px] text-ash mt-1">
          可在「我的提醒」中查看
        </p>
      )}
    </>
  )
}
