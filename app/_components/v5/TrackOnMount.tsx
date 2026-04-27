/**
 * TrackOnMount — 在客户端组件首次挂载时发一条事件。
 *
 * 用法（可放进任何 server component）：
 *   <TrackOnMount event={EVENT.QUIZ_VISA_SELECTED} payload={{ visa }} />
 *
 * 实现注意：用 useRef 防止 strict mode dev 双触发；payload 改变不重发。
 */
'use client'
import { useEffect, useRef } from 'react'
import { trackClient } from '@/lib/analytics/client'
import type { EventName } from '@/lib/analytics/events'

interface Props {
  event: EventName
  payload?: Record<string, unknown>
}

export default function TrackOnMount({ event, payload }: Props) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    trackClient(event, payload ?? {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
