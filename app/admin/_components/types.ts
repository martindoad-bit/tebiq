export interface MonitorStatus {
  id: string
  name: string
  url: string
  lastChecked: string | null
  alert: string | null
}

export interface RecentEntry {
  date: string
  result: 'green' | 'yellow' | 'red'
  triggeredItems: string[]
}

export interface AdminStats {
  userCount: number
  todayTests: number
  totalTests: number
  greenPct: number
  redPct: number
  monitors: MonitorStatus[]
  recent: RecentEntry[]
}

export interface CaseStats {
  caseCount: number
  approved: number
  rejected: number
  returned: number
  approvedPct: number
  recent: Array<{
    id: string
    date: string
    visaType: string
    result: 'approved' | 'rejected' | 'returned'
    yearsInJapan: number
    annualIncomeManYen: number
  }>
}

export interface SystemStatus {
  ai: { configured: boolean; provider: string; region: string }
  kv: { ok: boolean; error: string | null }
  monitor: { lastChecked: string | null }
}
