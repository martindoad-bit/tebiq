import type { TimelineEvent } from '@/lib/db/schema'

export function eventTypeLabel(type: string): string {
  switch (type) {
    case 'photo_recognition':
      return '已识别'
    case 'self_check':
      return '已自查'
    case 'text_understand':
      return '已解析'
    case 'policy_match':
      return '政策更新'
    case 'manual_note':
      return '手动记录'
    default:
      return '已归档'
  }
}

export function eventTitle(event: Pick<TimelineEvent, 'docType' | 'issuer' | 'eventType' | 'eventPayload'>): string {
  const payload = event.eventPayload ?? {}
  const summary = typeof payload.summary === 'string' ? payload.summary : null
  const meaning = typeof payload.meaning === 'string' ? payload.meaning : null
  return event.docType ?? event.issuer ?? summary ?? meaning ?? eventTypeLabel(event.eventType)
}

export function eventSubline(event: Pick<TimelineEvent, 'issuer' | 'deadline' | 'eventType'>): string {
  const parts = [
    event.issuer,
    event.deadline ? `期限 ${event.deadline}` : null,
    eventTypeLabel(event.eventType),
  ].filter(Boolean)
  return parts.join(' / ')
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
