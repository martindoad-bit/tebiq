'use client'

import { useEffect, useState } from 'react'
import {
  hasMatterDraftForAnswer,
  saveMatterDraft,
  removeMatterDraft,
  listMatterDrafts,
  type MatterDraft,
} from '@/lib/matters/storage'

// Save Matter Button — V0 (localStorage-only).
//
// Per Context Pack §5 我的事项: "事项卡要写成"还差一步：……""现在先
// 处理：……"，不要像项目管理软件". Button labels follow the same
// voice — concrete and quiet, no "保存到我的清单" 项目-管理-软件 wording.

interface Props {
  answer_id: string
  question: string
  title: string
  summary: string
  urgency?: 'now' | 'soon' | 'later'
}

export default function SaveMatterButton({
  answer_id,
  question,
  title,
  summary,
  urgency = 'later',
}: Props) {
  const [saved, setSaved] = useState<boolean>(false)
  const [busy, setBusy] = useState<boolean>(false)

  useEffect(() => {
    setSaved(hasMatterDraftForAnswer(answer_id))
  }, [answer_id])

  const onSave = () => {
    if (busy) return
    setBusy(true)
    try {
      if (saved) {
        // Toggle off — find this answer's matter and remove.
        const existing = listMatterDrafts().find((m: MatterDraft) => m.answer_id === answer_id)
        if (existing) removeMatterDraft(existing.id)
        setSaved(false)
      } else {
        saveMatterDraft({ answer_id, question, title, summary, urgency })
        setSaved(true)
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      type="button"
      onClick={onSave}
      className={
        saved
          ? 'min-h-[40px] rounded-[10px] border border-hairline bg-paper px-4 text-[13px] font-medium text-slate active:bg-canvas'
          : 'min-h-[40px] rounded-[10px] border border-hairline bg-canvas px-4 text-[13px] font-medium text-ink active:bg-paper'
      }
      aria-pressed={saved}
    >
      {saved ? '已保存到我的事项' : '保存这个事项'}
    </button>
  )
}
