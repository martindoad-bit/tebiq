/**
 * TrackedLink — 包装 next/link，在点击时同步发一条 client 事件。
 *
 * 用法：
 *   <TrackedLink href="/photo" eventName={EVENT.HOME_PHOTO_CARD_CLICK} payload={{ from: 'home' }}>
 *     ...
 *   </TrackedLink>
 *
 * - 因为 trackClient 用 sendBeacon，不会阻塞跳转。
 * - server component 也能用（这是 client component，会被自动 boundary）。
 * - 兼容自带 onClick：先 track，再调用业务 onClick。
 */
'use client'
import Link from 'next/link'
import type { ComponentProps, MouseEvent } from 'react'
import { trackClient } from '@/lib/analytics/client'
import type { EventName } from '@/lib/analytics/events'

type LinkProps = ComponentProps<typeof Link>

interface Props extends LinkProps {
  eventName: EventName
  payload?: Record<string, unknown>
}

export default function TrackedLink({ eventName, payload, onClick, ...rest }: Props) {
  function handle(e: MouseEvent<HTMLAnchorElement>) {
    try {
      trackClient(eventName, payload ?? {})
    } catch {
      /* trackClient itself never throws，这里防御 */
    }
    onClick?.(e)
  }
  return <Link {...rest} onClick={handle} />
}

/** 同样思路的 button 包装 — 用在不跳转的场景（比如 modal dismiss）。 */
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  eventName: EventName
  payload?: Record<string, unknown>
}

export function TrackedButton({ eventName, payload, onClick, ...rest }: BtnProps) {
  function handle(e: MouseEvent<HTMLButtonElement>) {
    try {
      trackClient(eventName, payload ?? {})
    } catch {
      /* swallow */
    }
    onClick?.(e)
  }
  return <button {...rest} onClick={handle} />
}
