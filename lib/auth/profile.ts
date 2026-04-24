import { storage } from '@/lib/storage'

export type YearsInJapan = '<1' | '1-3' | '3-5' | '5+'
export type CompanyType = 'listed' | 'normal' | 'self' | 'unknown'

export interface UserProfile {
  visaType: string
  expiryDate: string // YYYY-MM-DD
  yearsInJapan: YearsInJapan
  companyType: CompanyType
  recentChanges: string[] // ['changed-job', 'moved', 'married', 'none']
  updatedAt: string
}

export async function getProfile(phone: string): Promise<UserProfile | null> {
  return await storage.get<UserProfile>(`profile:${phone}`)
}

export async function saveProfile(phone: string, p: UserProfile): Promise<void> {
  await storage.set(`profile:${phone}`, p)
}
