/**
 * 拍照配额逻辑。
 * - Block 11：所有工具不限次数。
 * - 付费只影响档案保留 / 时间线查询 / 政策推送，不再限制拍照入口。
 */
export const FREE_QUOTA_PER_MONTH = Infinity

export interface QuotaStatus {
  unlimited: boolean
  used: number
  limit: number
  remaining: number
}

/**
 * 查询当前 family 的本月拍照配额状态。
 */
export async function getPhotoQuotaForFamily(familyId: string): Promise<QuotaStatus> {
  void familyId
  return { unlimited: true, used: 0, limit: Infinity, remaining: Infinity }
}

export async function getPhotoQuotaForSession(sessionId: string): Promise<QuotaStatus> {
  void sessionId
  return { unlimited: true, used: 0, limit: Infinity, remaining: Infinity }
}
