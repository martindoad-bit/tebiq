// 1.0 Alpha — Risk keyword detection (Issue #39 §5).
//
// 13 keywords covering high-risk in-residence patterns. Hits surface a
// soft warning above the streaming answer area, AND get persisted on
// the consultation row for telemetry.
//
// This is NOT a safety gate — it does not block / redact answers. It's
// a UX nudge for the user + an analytic signal for the Learning Console.
//
// Each canonical hit name (in RISK_KEYWORDS) has one or more match
// patterns. Patterns can be plain substrings or RegExp. The first
// pattern hit per canonical name records the canonical name in the
// result (so test/UI surfaces stable names regardless of phrasing).

export const RISK_KEYWORDS: ReadonlyArray<string> = Object.freeze([
  '不许可',
  '补材料',
  '超期',
  '期限',
  '离婚',
  '解雇',
  '公司清算',
  '经营管理',
  '永住',
  '年金',
  '税金',
  '工作不一致',
  '资格外活动',
])

interface RiskPattern {
  hit: string
  matches: ReadonlyArray<string | RegExp>
}

/**
 * Match-table mapping each canonical keyword to one or more user-phrasing
 * patterns. Order MATCHES the RISK_KEYWORDS export order so the result
 * is stable for tests.
 */
const RISK_PATTERNS: ReadonlyArray<RiskPattern> = [
  { hit: '不许可',     matches: ['不许可', '不許可'] },
  { hit: '补材料',     matches: ['补材料', '补资料', '補資料'] },
  { hit: '超期',       matches: ['超期', '过期', '過期'] },
  { hit: '期限',       matches: ['期限', '締切', '截止'] },
  { hit: '离婚',       matches: ['离婚', '離婚'] },
  { hit: '解雇',       matches: ['解雇', '失业', '失業', '被裁', 'クビ'] },
  // 公司清算 — accept either the concatenated form OR 清算 in any
  // residency-related context. "公司还没清算" type phrasing is the
  // I08 reproduction case; bare 清算 is enough signal.
  { hit: '公司清算',   matches: ['公司清算', '会社清算', '清算', '解散'] },
  { hit: '经营管理',   matches: ['经营管理', '経営管理', '经管', '経管'] },
  { hit: '永住',       matches: ['永住'] },
  { hit: '年金',       matches: ['年金'] },
  { hit: '税金',       matches: ['税金', '税务', '税務', '住民税', '所得税'] },
  // 工作不一致 — phrases like "在留资格和现在实际工作不一致" / "工作内容不一样" / "实际工作不符"
  { hit: '工作不一致', matches: [/工作.{0,8}(不一致|不一样|不同|不符)/, /(仕事|職).{0,8}不一致/] },
  { hit: '资格外活动', matches: ['资格外活动', '資格外活動', '资格外'] },
]

export function detectRiskKeywords(userQuestion: string | null | undefined): string[] {
  if (!userQuestion) return []
  const out: string[] = []
  for (const { hit, matches } of RISK_PATTERNS) {
    let matched = false
    for (const m of matches) {
      if (typeof m === 'string') {
        if (userQuestion.includes(m)) { matched = true; break }
      } else {
        if (m.test(userQuestion)) { matched = true; break }
      }
    }
    if (matched) out.push(hit)
  }
  return out
}

/**
 * Voice-canonical user-facing copy when one or more risk keywords match.
 * Surfaced ABOVE the answer area, NOT inside the LLM stream.
 */
export const RISK_HINT_COPY =
  '这个问题可能涉及在留风险，建议不要只靠 AI 回答做最终决定。'
