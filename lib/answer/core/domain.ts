import type { AnswerIntent } from '@/lib/answer/intent-router'
import type { DetectedIntent, SupportedDomain } from './types'

// Detect the V1 supported domain from intent + question text.
// V1 only supports 5 visa categories. Anything else returns 'unknown',
// and the orchestrator will treat that as out_of_scope.

export function detectDomain(input: {
  questionText: string
  intent: AnswerIntent
  visaType?: string | null
}): SupportedDomain {
  const targetMatch = matchDomain(input.intent.target_status ?? '')
  if (targetMatch !== 'unknown') return targetMatch

  const currentMatch = matchDomain(input.intent.current_status ?? '')
  if (currentMatch !== 'unknown') return currentMatch

  const procMatch = matchDomain(input.intent.extracted_entities?.procedure ?? '')
  if (procMatch !== 'unknown') return procMatch

  const visaMatch = matchDomain(input.visaType ?? '')
  if (visaMatch !== 'unknown') return visaMatch

  const textMatch = matchDomain(input.questionText)
  return textMatch
}

function matchDomain(text: string): SupportedDomain {
  if (!text) return 'unknown'
  // 5 specific visa categories — most-specific match wins.
  if (/(永住|永住権|永住权|永住者)/.test(text)) return 'permanent_resident'
  if (/(经营管理|経営管理|经管|管理签|管理ビザ)/.test(text)) return 'business_manager'
  if (/(家族滞在|家属签|家属簽)/.test(text)) return 'family_stay'
  if (/(定住者|定住資格)/.test(text)) return 'long_term_resident'
  if (/(?:^|[^永])定住/.test(text)) return 'long_term_resident'
  if (/(技人国|技術・?人文|人文签|人文簽|国際業務|gijinkoku|技術人文知識)/.test(text)) {
    return 'gijinkoku'
  }

  // ─── Routing Safety Gate v1 (Issue #18, R01–R05) ───────────────────
  // Targeted regressions: 7 high-risk questions that were mis-routed
  // to `out_of_scope` because none of the visa-keyword regexes above
  // matched their phrasing. We resolve them to a *broader* domain
  // (long_term_resident / family_stay / business_manager / admin_general)
  // so the orchestrator stops short-circuiting to OOS — downstream
  // projector then produces clarification_needed / preliminary, which
  // is the correct safety stance per the Work Packet.
  //
  // These rules are intentionally narrow and conjunctive (multiple
  // signals required) to avoid scope creep into questions that should
  // still legitimately fall to 'unknown'. They run BEFORE the
  // admin_general broad patterns so a specific domain wins when it can.

  // R02 — 配偶 + 离婚 → 身份変更 / 定住者 path
  //   Targets: D05 (日本人配偶签离婚后还能留在日本吗？)
  //            D06 (配偶签离婚后多久要处理在留问题？)
  if (/(配偶|配偶者|日本人.*配偶)/.test(text) && /(离婚|離婚|りこん)/.test(text)) {
    return 'long_term_resident'
  }

  // D09 — 家人 + 在留 / 签证 → 家族 path (R02 family-side)
  //   Target: D09 (家人的在留资格跟我有关，我换签证会影响他们吗？)
  if (/(家人|家族|家属)/.test(text) && /(在留|签证|簽證|ビザ|资格|資格)/.test(text)) {
    return 'family_stay'
  }

  // R03 — 公司 / 法人 + 清算 / 解散 → 経管 path
  //   R05 (overlap) — 回国 / 帰国 / 出境 + 公司 / 経営 → 経管 path
  //   Target: I08 (公司还没清算，我可以直接回国吗？)
  if (/(公司|会社|法人|商社|有限会社|株式会社)/.test(text) && /(清算|解散|閉店|注销|閉鎖|破産)/.test(text)) {
    return 'business_manager'
  }
  if (/(回国|帰国|出境|離日|帰るとき|帰国時)/.test(text) && /(公司|会社|法人|経営|経管|经营|经管|清算)/.test(text)) {
    return 'business_manager'
  }
  // ──────────────────────────────────────────────────────────────────

  // V1.1 — admin_general catches the long tail of 在留行政 questions
  // that aren't tied to one of the 5 specific visa categories but are
  // still in-scope for a hedged preliminary answer:
  //   - 入管 / 出入国在留管理 / 在留卡 / 補資料 / 不许可 / 通知書 / 届出
  //   - 区役所 / 市役所 / 法务局 / 税务署 / 住民票 / 住民票異動
  //   - 年金 / 厚生年金 / 国民年金 / 健保 / 国保 / 社保
  //   - 税务 / 住民税 / 確定申告
  //   - 公司 / 会社 / 役員変更 / 移転 / 搬迁
  //   - 期限 / 更新 / 変更 (general 行政 actions)
  // Only "明显无关" topics (diet / stocks / tourism / unrelated) fall to 'unknown'.
  if (/(入管|出入国在留管理|在留カード|在留卡|補資料|补资料|补材料|不许可|不許可|通知書|届出|届け出)/.test(text)) return 'admin_general'
  if (/(区役所|市役所|町役場|村役場|法务局|法務局|税务署|税務署|住民票|住民登録)/.test(text)) return 'admin_general'
  if (/(厚生年金|国民年金|年金|健康保険|健保|国民健康保险|国保|社会保険|社会保险|社保)/.test(text)) return 'admin_general'
  if (/(住民税|所得税|確定申告|确定申告|納税|纳税)/.test(text)) return 'admin_general'
  if (/(役員変更|代表変更|本店移転|事務所移転|公司变更|会社変更|搬迁|搬家.*登记|登記)/.test(text)) return 'admin_general'

  // ─── Routing Safety Gate v1 (continued) ────────────────────────────
  // R01 — 时间敏感 + 在留 / 签证 → admin_general (clarification_needed)
  //   Target: J03 (签证快到期了但材料还没准备好怎么办？)
  if (
    /(在留|签证|簽證|ビザ|资格|資格|入管|永住|更新|変更|変更許可)/.test(text) &&
    /(到期|快到期|期限|截止|過期|过期|赶不上|過ぎ|期日|締切|時限)/.test(text)
  ) {
    return 'admin_general'
  }

  // R04 — 解雇 / 失业 / 在留+工作不一致 → admin_general (clarification_needed)
  //   Targets: J04 (我被公司解雇了，在留怎么办？)
  //            J08 (我的在留资格和现在实际工作不一致怎么办？)
  if (/(解雇|失业|失業|解職|離職|クビ|首になった)/.test(text) && /(在留|签证|簽證|ビザ|资格|資格)/.test(text)) {
    return 'admin_general'
  }
  if (/在留资格|在留資格/.test(text) && /(工作|仕事|職|職業|労働)/.test(text)) {
    return 'admin_general'
  }
  // ──────────────────────────────────────────────────────────────────

  return 'unknown'
}

export function buildDetectedIntent(input: {
  questionText: string
  intent: AnswerIntent
}): DetectedIntent {
  return {
    intent_type: input.intent.intent_type,
    current_status: meaningfulStatus(input.intent.current_status),
    target_status: meaningfulStatus(input.intent.target_status),
    confidence: input.intent.confidence,
    understood_question: rewriteUnderstoodQuestion(input.intent, input.questionText),
    legacy_intent: input.intent,
  }
}

// V1 contract: never let literal "unknown" / "null" / "undefined" /
// "未知" leak into user-visible text. The legacy intent-router can
// produce status='unknown' from the LLM intent parser; we treat all
// of those as "missing" here.
function meaningfulStatus(value: string | null | undefined): string | null {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^(?:unknown|null|undefined|未知|未定义|n\/a|none)$/i.test(trimmed)) return null
  // V1.2 P1-A — reject LLM-emitted descriptive clauses (e.g.
  // "年金未納または納付不足がある状態"). The "从「X」转为「Y」"
  // template expects short categorical visa labels:
  //   経営管理 (4), 定住者 (3), 永住 (2), 家族滞在 (4),
  //   日本人の配偶者等 (8), 技術・人文知識・国際業務 (12).
  // Anything > 14 chars is not a visa label; fall through to the
  // natural-language path in rewriteUnderstoodQuestion().
  if (trimmed.length > 14) return null
  return trimmed
}

function rewriteUnderstoodQuestion(intent: AnswerIntent, questionText: string): string {
  const cur = meaningfulStatus(intent.current_status)
  const tgt = meaningfulStatus(intent.target_status)
  if (cur && tgt) {
    return `从「${cur}」转为「${tgt}」需要满足什么条件，以及接下来怎么做。`
  }
  if (cur) {
    return `你目前持有「${cur}」，TEBIQ 还需要你告知具体想办的手续。`
  }
  if (tgt) {
    return `你想办到「${tgt}」，TEBIQ 还需要你告知现在的在留资格。`
  }
  if (intent.intent_type === 'misconception') {
    return '这个想法是否存在常见误解，以及有没有稳定可行路径。'
  }
  if (intent.intent_type === 'risk_assessment') {
    return '这件事可能影响谁、先保留什么证据，以及什么情况要找专家。'
  }
  return questionText.trim() || '我还不能确定你的当前身份和目标手续。'
}
