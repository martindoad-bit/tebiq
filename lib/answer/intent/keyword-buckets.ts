// 0.6 Sprint — KEYWORD_BUCKETS shared layer (ENGINE Pack 1).
//
// Single source of truth for "which residency-status bucket does this
// user question fall into". Three downstream consumers share this map:
//
//   1. Workstream B (First-response UX) — routing_status SSE event
//      surfaces the bucket label so the UI can show "正在核对经营管理 /
//      年金 / 技人国 ..." while waiting for first_token.
//   2. Workstream G (Risk-hint personalization) — risk_hint copy gets
//      tailored per matched bucket via `risk_hint_copy`.
//   3. Workstream C (Fact Layer matcher, ENGINE Pack 2) — fact cards
//      declare which bucket they participate in via frontmatter, and
//      the matcher consumes the same keyword list.
//
// Pack 1 owns ONLY (1). It exports the data + types. Pack 2 wires the
// matcher into the fact layer. Workstream G consumes risk_hint_copy
// in a later UI pass.
//
// Design constraints (Pack §1):
//   - Pure data + simple substring matching downstream
//   - No regex, no tokenizer, no LLM call, no embedding
//   - Keywords cover both 中文 (simplified + traditional) and 日本語
//     because the user base is bilingual zh-CN inputs into a domain
//     vocabulary that is canonically 日本語
//   - status_label_initial is a single shared copy across buckets at
//     the 0-1s mark (UI doesn't need bucket-specific copy yet)
//   - status_label_specific is bucket-specific, used at the 3000ms
//     mark when first_token still hasn't arrived
//   - PL §3 sample copy lives in the four most-common buckets (keiei
//     kanri / nenkin_zeikin / gijinkoku / spouse_divorce); the other
//     two buckets (shikakugai_fukugyo / zairyu_kigen) reuse the same
//     "正在核对 …" voice extended naturally
//
// Voice anchors:
//   - "正在核对 X、Y、Z" pattern (per PL §3 sample)
//   - No 安慰 / 陪伴 phrasing — TEBIQ voice = "不安慰、不陪伴、给方向"
//   - status_label_initial uses 已收到 + 正在整理 (received + processing)

export type KeywordBucketId =
  | 'keiei_kanri'
  | 'nenkin_zeikin'
  | 'gijinkoku'
  | 'spouse_divorce'
  | 'shikakugai_fukugyo'
  | 'zairyu_kigen'

export interface KeywordBucket {
  id: KeywordBucketId
  /** Substring keywords across 中文 / 日本語. Match is case-insensitive
   *  (lower-cased before comparison) but no other normalization (no
   *  half-width / katakana folding). */
  keywords: ReadonlyArray<string>
  /** 0-1s 文案 — fired immediately after `received` SSE event when ANY
   *  bucket matches. Same copy across all buckets at this layer; the
   *  UI just acknowledges it heard the question. */
  status_label_initial: string
  /** 3000ms 文案 — fired when first_token still hasn't arrived after
   *  3000ms, using the TOP-1 bucket's specific label so the user sees
   *  what residency dimension is being processed. */
  status_label_specific: string
  /** Workstream G hook — bucket-tailored risk hint copy that the UI
   *  may surface above the answer. Pack 1 only stores the string; the
   *  UI consumption point lands in a later pass. */
  risk_hint_copy?: string
}

/** Shared 0-1s status label across all buckets. Voice-anchored —
 *  acknowledges receipt without commitment. */
export const STATUS_LABEL_INITIAL_DEFAULT =
  '已收到，正在整理这个问题涉及的在留方向。'

/**
 * The 6 buckets, declaration order = match-result tiebreak order. When
 * two buckets score equally in `matchBuckets()`, the earlier-declared
 * bucket wins (mirrors FACT_ANCHORS / DOMAIN ordering convention).
 */
export const KEYWORD_BUCKETS: Record<KeywordBucketId, KeywordBucket> = {
  // ---- 1. 経営管理 / 公司签证 / 創業 ----
  keiei_kanri: {
    id: 'keiei_kanri',
    keywords: [
      // 日本語
      '経営管理', '経営', '経管', '経管ビザ', '創業ビザ', '投資経営',
      // 简体
      '经营管理', '经营', '经管', '经管签证', '经管ビザ', '创业签证', '投资经营',
      // 繁体
      '經營管理', '經管',
      // English / mixed
      'startup visa',
      // 公司语境（避免与 spouse_divorce 的 配偶 桶冲突，限制在公司维度词）
      '公司签证', '公司清算', '公司解散', '公司停业',
    ],
    status_label_initial: STATUS_LABEL_INITIAL_DEFAULT,
    status_label_specific: '正在核对经营管理、在留资格变更和当前基准。',
    risk_hint_copy: '经营管理涉及活动实态、纳税、社保等多维基准，单一信息难以判断；建议向行政書士确认最新基准。',
  },

  // ---- 2. 年金 / 税金 / 健保 / 缴纳记录 ----
  nenkin_zeikin: {
    id: 'nenkin_zeikin',
    keywords: [
      // 日本語
      '年金', '厚生年金', '国民年金', '健保', '健康保険', '国民健康保険',
      '住民税', '所得税', '税金', '滞納', '未納', '納付',
      // 简体
      '年金', '厚生年金', '国民年金', '健保', '健康保险', '国民健康保险',
      '住民税', '所得税', '税金', '滞纳', '未交', '没交', '没缴', '欠交', '缴纳',
      '永住',
      // 繁体
      '健康保險', '國民健康保險', '住民稅', '所得稅', '稅金',
    ],
    status_label_initial: STATUS_LABEL_INITIAL_DEFAULT,
    status_label_specific: '正在核对缴纳记录、更新/永住影响和下一步处理。',
    risk_hint_copy: '永住、更新审查会回看 5 年的纳税与社保连续性，记录缺口可能影响许可；建议先查清楚缴纳明细。',
  },

  // ---- 3. 技人国 / 技術・人文知識・国際業務 / 工作内容 ----
  gijinkoku: {
    id: 'gijinkoku',
    keywords: [
      // 日本語
      '技人国', '技術・人文知識', '技人国ビザ', '人文知識', '国際業務',
      '転職', '退職', '就職', '職場',
      // 简体
      '技人国', '技人国签证', '人文知识', '技术人文', '国际业务',
      '换工作', '转职', '跳槽', '工作内容', '工厂', '工作变更',
      // 繁体
      '技術人文', '人文知識', '國際業務',
    ],
    status_label_initial: STATUS_LABEL_INITIAL_DEFAULT,
    status_label_specific: '正在核对在留资格活动范围和工作内容匹配。',
    risk_hint_copy: '技人国资格的关键是「业务内容与学历/职历匹配」，转职后未届出或业务偏离都可能在更新时出问题。',
  },

  // ---- 4. 配偶 / 离婚 / 死别 / 分居 / 家庭关系 ----
  spouse_divorce: {
    id: 'spouse_divorce',
    keywords: [
      // 日本語
      '配偶者', '配偶者ビザ', '離婚', '離婚届', '別居', '死別',
      '夫', '妻', '夫婦', 'DV',
      // 简体
      '配偶', '配偶签证', '离婚', '分居', '死别',
      '丈夫', '妻子', '老公', '老婆', '夫妻',
      // 繁体
      '離婚', '別居',
    ],
    status_label_initial: STATUS_LABEL_INITIAL_DEFAULT,
    status_label_specific: '正在核对身份变化、届出和在留衔接风险。',
    risk_hint_copy: '配偶身份变化（离婚 / 死别 / 长期别居）会触发 14 日届出义务，且在留资格根据可能即时改变。',
  },

  // ---- 5. 資格外活動 / 副业 / 28时间 / 留学生打工 ----
  shikakugai_fukugyo: {
    id: 'shikakugai_fukugyo',
    keywords: [
      // 日本語
      '資格外活動', '資格外', '副業', 'アルバイト', '28時間',
      // 简体
      '资格外活动', '资格外', '副业', '兼职', '28小时', '留学生打工',
      'Uber Eats', 'Uber',
      // 繁体
      '資格外活動', '副業',
    ],
    status_label_initial: STATUS_LABEL_INITIAL_DEFAULT,
    status_label_specific: '正在核对资格外活动范围、上限工时和后续影响。',
    risk_hint_copy: '资格外活动有明确工时上限和业务范围，超出可能影响下次更新或永住审查。',
  },

  // ---- 6. 在留期限 / 续签 / 更新 / 特例期间 ----
  zairyu_kigen: {
    id: 'zairyu_kigen',
    keywords: [
      // 日本語
      '在留期限', '在留期間', '更新申請', '更新', '期限切れ',
      '特例期間', '特例期间', 'もうすぐ',
      // 简体
      '在留期限', '在留期间', '续签', '续期', '更新',
      '期限快到', '快到期', '过期', '1个月', '3个月',
      // 繁体
      '在留期限', '在留期間', '續簽', '更新',
    ],
    status_label_initial: STATUS_LABEL_INITIAL_DEFAULT,
    status_label_specific: '正在核对在留期限、更新窗口和特例期间。',
    risk_hint_copy: '在留期限临近时，先确认是否已经在期限前提交更新或变更申请；还没提交时不要等到期后处理，尽快向入管窗口或行政书士确认。',
  },
}

/**
 * Convenience: ordered list of bucket ids matching declaration order.
 * Used by `matchBuckets()` for stable ordering and by tests for
 * exhaustiveness checks.
 */
export const KEYWORD_BUCKET_IDS: ReadonlyArray<KeywordBucketId> = [
  'keiei_kanri',
  'nenkin_zeikin',
  'gijinkoku',
  'spouse_divorce',
  'shikakugai_fukugyo',
  'zairyu_kigen',
]
