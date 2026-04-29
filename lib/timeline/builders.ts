import type { NewTimelineEvent } from '@/lib/db/schema'
import type { PhotoRecognitionResult } from '@/lib/photo/types'
import type { TextUnderstandResult } from '@/lib/text-understand/types'

export interface TimelineAssociation {
  id: string
  eventType: string
  title: string
  createdAt: string
  docType: string | null
  issuer: string | null
}

function clean(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function toIsoDate(value: string | null | undefined): string | null {
  if (!value) return null
  const d = new Date(`${value.slice(0, 10)}T00:00:00+09:00`)
  return Number.isNaN(d.getTime()) ? null : value.slice(0, 10)
}

function parseAmount(value: string | null | undefined): string | null {
  if (!value) return null
  const normalized = value.replace(/[,，円￥¥\s]/g, '')
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null
  return normalized
}

function uniqueTags(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const value of values) {
    const trimmed = value?.trim()
    if (!trimmed || seen.has(trimmed)) continue
    seen.add(trimmed)
    out.push(trimmed)
    if (out.length >= 12) break
  }
  return out
}

export function formatTimelineAssociation(row: {
  id: string
  eventType: string
  createdAt: Date
  docType: string | null
  issuer: string | null
  eventPayload: Record<string, unknown>
}): TimelineAssociation {
  const payloadTitle = clean(row.eventPayload.summary) ?? clean(row.eventPayload.meaning)
  return {
    id: row.id,
    eventType: row.eventType,
    title: payloadTitle ?? row.docType ?? row.issuer ?? '已归档事件',
    createdAt: row.createdAt.toISOString(),
    docType: row.docType,
    issuer: row.issuer,
  }
}

export function buildPhotoTimelineEvent(input: {
  memberId: string | null
  sessionId: string | null
  documentId: string
  result: PhotoRecognitionResult
  visaType?: string | null
}): NewTimelineEvent {
  const { result } = input
  return {
    memberId: input.memberId,
    sessionId: input.sessionId,
    eventType: 'photo_recognition',
    eventPayload: result as unknown as Record<string, unknown>,
    docType: result.docType ?? (result.isEnvelope ? '信封' : null),
    issuer: result.issuer,
    amount: parseAmount(result.amount),
    deadline: toIsoDate(result.deadline),
    isEnvelope: result.isEnvelope,
    recognitionConfidence: result.recognitionConfidence,
    visaRelevance: input.visaType ? { visaType: input.visaType } : null,
    tags: uniqueTags(['拍照', result.docType, result.issuer, result.isEnvelope ? '信封' : null]),
    sourceRecordId: input.documentId,
    sourceRecordType: 'document',
  }
}

export function buildSelfCheckTimelineEvent(input: {
  memberId: string | null
  sessionId: string | null
  quizResultId: string
  visaType: string
  resultColor: string
  summary: Record<string, unknown>
}): NewTimelineEvent {
  const triggered = Array.isArray(input.summary.triggered)
    ? input.summary.triggered as Array<{ label?: string; id?: string; severity?: string }>
    : []
  return {
    memberId: input.memberId,
    sessionId: input.sessionId,
    eventType: 'self_check',
    eventPayload: {
      visaType: input.visaType,
      resultColor: input.resultColor,
      summary: input.summary,
    },
    docType: `${input.visaType} 续签材料准备检查`,
    issuer: null,
    amount: null,
    deadline: null,
    isEnvelope: null,
    recognitionConfidence: null,
    visaRelevance: { visaType: input.visaType, resultColor: input.resultColor },
    tags: uniqueTags(['自查', input.visaType, input.resultColor, ...triggered.map(item => item.id ?? item.label)]),
    sourceRecordId: input.quizResultId,
    sourceRecordType: 'quiz_result',
  }
}

export function buildTextTimelineEvent(input: {
  memberId: string | null
  sessionId: string | null
  requestId: string
  result: TextUnderstandResult
  visaType?: string | null
}): NewTimelineEvent {
  return {
    memberId: input.memberId,
    sessionId: input.sessionId,
    eventType: 'text_understand',
    eventPayload: input.result as unknown as Record<string, unknown>,
    docType: input.result.detectedTopic,
    issuer: null,
    amount: null,
    deadline: null,
    isEnvelope: null,
    recognitionConfidence: input.result.confidence,
    visaRelevance: input.visaType ? { visaType: input.visaType } : null,
    tags: uniqueTags(['文字', input.result.detectedTopic, ...input.result.relatedTags]),
    sourceRecordId: input.requestId,
    sourceRecordType: 'text_understand',
  }
}
