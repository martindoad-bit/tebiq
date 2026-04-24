export type ResultColor = 'red' | 'yellow' | 'green'
export type Urgency = 'urgent' | 'normal' | 'planning'
export type ContactMethod = 'phone' | 'wechat' | 'line' | 'email'
export type ConsultationStatus =
  | 'pending'
  | 'assigned'
  | 'contacted'
  | 'converted'
  | 'closed'

export interface Consultation {
  id: string
  createdAt: string

  userPhone: string
  userName?: string

  visaType: string
  resultColor: ResultColor | 'unknown'
  triggeredItems: string[]

  urgency: Urgency
  preferredContact: ContactMethod
  contactDetail: string
  location?: string
  additionalInfo?: string

  status: ConsultationStatus
  assignedTo?: string
  internalNotes?: string

  sourceVisa: string
  sourcePage: string
}

export interface ConsultationIndexEntry {
  id: string
  createdAt: string
  visaType: string
  resultColor: Consultation['resultColor']
  urgency: Urgency
  status: ConsultationStatus
  preferredContact: ContactMethod
  userName?: string
  contactDetail: string
}

export const VISA_LABEL: Record<string, string> = {
  gijinkoku: '技人国',
  haigusha: '配偶者',
  tokutei: '特定技能',
  teijusha: '定住者',
  keiei: '经营管理',
  eijusha: '永住',
  unknown: '未指定',
}

export const COLOR_LABEL: Record<Consultation['resultColor'], string> = {
  red: '红色（高风险）',
  yellow: '黄色（需注意）',
  green: '绿色（可准备）',
  unknown: '未做自查',
}

export const URGENCY_LABEL: Record<Urgency, string> = {
  urgent: '紧急（2 周内）',
  normal: '正常（1-2 个月内）',
  planning: '计划中（3 个月以上）',
}

export const STATUS_LABEL: Record<ConsultationStatus, string> = {
  pending: '待处理',
  assigned: '已分配',
  contacted: '已联系',
  converted: '已成单',
  closed: '已关闭',
}

export const CONTACT_LABEL: Record<ContactMethod, string> = {
  phone: '电话',
  wechat: '微信',
  line: 'LINE',
  email: '邮件',
}

export function isResultColor(v: string): v is ResultColor {
  return v === 'red' || v === 'yellow' || v === 'green'
}

export function isUrgency(v: string): v is Urgency {
  return v === 'urgent' || v === 'normal' || v === 'planning'
}

export function isContactMethod(v: string): v is ContactMethod {
  return v === 'phone' || v === 'wechat' || v === 'line' || v === 'email'
}

export function isStatus(v: string): v is ConsultationStatus {
  return (
    v === 'pending' ||
    v === 'assigned' ||
    v === 'contacted' ||
    v === 'converted' ||
    v === 'closed'
  )
}

export const INDEX_KEY = 'consultations:index'
export const INDEX_LIMIT = 500

export function consultationKey(id: string): string {
  return `consultation:${id}`
}
