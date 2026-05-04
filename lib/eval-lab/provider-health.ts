// Provider health inference (Issue #26 / Workstream A).
//
// We do NOT call DeepSeek live from the console — per Work Packet
// "不实时调用 DeepSeek（首屏）". Instead we infer current health from
// the most recent eval_answers rows of answer_type='deepseek_raw':
//
//   - if no row in the lookback window  → 'unknown'
//   - if any row in the window has error containing 'timeout' / 'http_5'
//     and no successful row newer than it → 'timeout'
//   - if the most recent row is successful (answer_text present, no error)
//     → 'healthy'
//   - mixed (some failures, but the latest is successful) → 'healthy'
//   - all failures, no timeouts → 'unavailable'
//
// The intent is observability, not gating. The console renders this so
// reviewers know why batches may be returning DS_FAILED rows.

export type ProviderStatus = 'healthy' | 'unavailable' | 'timeout' | 'unknown'

/** The minimal eval_answers shape this helper reads. */
export interface AnswerForHealth {
  answer_type: 'deepseek_raw' | 'tebiq_current'
  answer_text: string | null
  error: string | null
  created_at: string // ISO timestamp
}

export interface ProviderHealth {
  status: ProviderStatus
  last_checked_at: string | null
  /** How many DS rows fed the inference (within the lookback window). */
  sample_size: number
}

const DEFAULT_LOOKBACK_HOURS = 24

/**
 * Infer DeepSeek health from a list of eval_answers rows. Pass any list;
 * the function filters to deepseek_raw + the lookback window itself.
 */
export function inferDeepseekHealth(
  answers: AnswerForHealth[],
  opts: { now?: Date; lookbackHours?: number } = {},
): ProviderHealth {
  const now = opts.now ?? new Date()
  const lookbackMs = (opts.lookbackHours ?? DEFAULT_LOOKBACK_HOURS) * 3600 * 1000
  const cutoff = now.getTime() - lookbackMs

  const dsRows = answers
    .filter(a => a.answer_type === 'deepseek_raw')
    .filter(a => {
      const t = Date.parse(a.created_at)
      return Number.isFinite(t) && t >= cutoff
    })
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))

  if (dsRows.length === 0) {
    return { status: 'unknown', last_checked_at: null, sample_size: 0 }
  }

  const latest = dsRows[0]
  const latestSuccess = !latest.error && !!latest.answer_text
  if (latestSuccess) {
    return { status: 'healthy', last_checked_at: latest.created_at, sample_size: dsRows.length }
  }

  // Latest is a failure. Decide between 'timeout' and 'unavailable' based
  // on what the failure looked like.
  const looksLikeTimeout = (err: string | null) =>
    !!err && /timeout|http_5\d{2}|aborted|gateway/i.test(err)

  if (looksLikeTimeout(latest.error)) {
    return { status: 'timeout', last_checked_at: latest.created_at, sample_size: dsRows.length }
  }
  return { status: 'unavailable', last_checked_at: latest.created_at, sample_size: dsRows.length }
}

/** Static description of which downstream work this provider gates. */
export const DEEPSEEK_IMPACT = {
  blocked: [
    'FULL_COMPARABLE 样本生成',
    'M3 Answer Quality Baseline',
    'DOMAIN 正式标注（依赖 FULL_COMPARABLE ≥ 24）',
  ] as const,
  not_blocked: [
    '100 题浏览（中台）',
    'Routing 状态查看 / Routing Safety Gate 验证',
    'DOMAIN 风险地图（pre-eval）',
    'Internal Console 本身',
    '/internal/preview 提交（走 TEBIQ pipeline，DS 失败时落 fallback）',
  ] as const,
}
