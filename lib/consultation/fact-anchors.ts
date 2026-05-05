// 0.5 Safe Consultation Sprint Workstream D — Light Fact Anchor matcher
// (Issue #54 / Work Packet WORKSTREAM_05_FACT_ANCHOR_INTEGRATION_PACK.md).
//
// 15 anchors transcribed from `docs/domain/DOMAIN_FACT_ANCHORS_v0.1.md`
// (DOMAIN-CC, draft / needs human review). Pack §2.1 mandates a one-shot
// manual transcription with NO runtime YAML parse, embeddings, vector
// match, or RAG — ENGINE just does substring keyword matching against
// the user's question + (optional) image_summary.
//
// Editorial note on trigger_keywords:
//   The DOMAIN file lists 日本語 triggers (kanji + katakana). The user
//   base is zh-CN; production questions will mostly use Simplified
//   Chinese ("离婚" / "配偶" / "公司" / etc), which substring-match against
//   the kanji form ("離婚" / "配偶者" / "会社") does NOT catch — the glyphs
//   differ. Pack §2.1 lets ENGINE do the transcription; Pack §3 forbids
//   editing the DOMAIN file. So the const array adds simplified Chinese
//   variants alongside the 日本語 originals. The DOMAIN .md file is
//   untouched. When DOMAIN-CC promotes the file out of draft, this list
//   should be re-synced.
//
// Performance: substring match across 15 anchors with ~10 keywords each
// is ~150 indexOf calls on a string ≤ 4200 chars — sub-millisecond. No
// caching / memoization needed.

export interface FactAnchor {
  /** Stable id for DB persistence (ai_consultations.fact_anchor_ids[]) and
   *  prompt-time citation. Matches `anchor_id` in the DOMAIN yaml. */
  anchorId: string
  /** Substring keywords. Hit on ANY one of these → anchor matches. The
   *  matcher is case-insensitive (lower-cased) but no other normalization
   *  (no half-width / katakana / pinyin folding). */
  triggerKeywords: ReadonlyArray<string>
  /** Voice-canonical "must consider" — injected into prompt context so the
   *  LLM is steered toward this fact. */
  mustConsider: string
  /** Voice-canonical "must NOT say" — injected into prompt context so the
   *  LLM avoids forbidden assertions. */
  mustNotSay: string
  /** Suggested follow-up question for the user — currently injected into
   *  prompt context (LLM may render it); UI rendering of suggestions is
   *  CODEXUI's territory, not this Pack's. */
  suggestedNextQuestion: string
  /** Internal hint flagging when human-expert review is recommended.
   *  Currently injected into prompt context for the LLM to consider. */
  humanConfirmHint: string
}

export const FACT_ANCHORS: ReadonlyArray<FactAnchor> = Object.freeze([
  {
    anchorId: 'bm_to_humanities',
    triggerKeywords: [
      // DOMAIN 日本語
      '経営管理', '人文知識', '技術人文', '転換', '経管', '社長をやめる', 'ビザ変更',
      // ENGINE 简体
      '经营管理', '人文知识', '技术人文', '转换', '经管', '辞去社长', '签证变更',
    ],
    mustConsider:
      '経営管理から他資格への転換は「活動実態の消失」が発生点となる。' +
      '転換先の職務と学歴・職歴の整合性、申請時の雇用証明、在留期限の残余期間を確認する必要がある。' +
      '転換手続き中の空白期間は原則として認められない。',
    mustNotSay: '転換できます / 問題なく変更できます / 就活中でも大丈夫 / 申請すれば許可されます',
    suggestedNextQuestion: '転換後の予定雇用先・職務内容・現在の在留期限の残り期間を教えてください。',
    humanConfirmHint: '転換先の職務が学歴・職歴と整合しない場合、または在留期限まで3ヶ月未満の場合は専門家確認を推奨。',
  },
  {
    anchorId: 'humanities_to_pr',
    triggerKeywords: [
      '永住', '人文知識', '技術人文', '永住申請', '永住権', '永住許可',
      // ENGINE 简体（永住 字符相同，不需变体）
      '人文知识', '技术人文', '永住申请', '永住权', '永住许可',
    ],
    mustConsider:
      '技人国から永住申請には原則10年以上の在留（うち就労5年以上）が必要。' +
      '直近5年の納税・年金・健康保険の継続加入が審査対象となる。' +
      '直近1年の出国日数も確認される。',
    mustNotSay: '申請できます / 許可されます / 10年いれば大丈夫 / 条件を満たしています',
    suggestedNextQuestion: '現在の在留年数・直近5年の健康保険と年金の加入継続状況を教えてください。',
    humanConfirmHint: '過去5年内に納税漏れ・年金未払い・出国超過がある場合は行政書士への確認を推奨。',
  },
  {
    anchorId: 'pension_pr',
    triggerKeywords: [
      '厚生年金', '国民年金', '年金', '永住', '未払い', '年金記録', '保険料',
      // ENGINE 简体
      '年金记录', '未交', '未付', '保险费', '未缴', '未交年金',
    ],
    mustConsider:
      '永住審査では直近5年以上の年金保険料の納付実績が確認される。' +
      '未払い期間は許可に影響する可能性がある。' +
      '免除・猶予は未払いとは扱いが異なる場合があるが、個別状況による。',
    mustNotSay: '未払いがあっても大丈夫 / 今払えば問題なし / 影響しません / 必ず許可されます',
    suggestedNextQuestion: '直近5年で年金の未払いや免除申請の期間はありますか？',
    humanConfirmHint: '未払い期間がある、または記録が不明瞭な場合は nenkin.go.jp で確認後、専門家相談を推奨。',
  },
  {
    anchorId: 'tax_pr',
    triggerKeywords: [
      '税金', '住民税', '所得税', '納税', '永住', '未納', '確定申告',
      // ENGINE 简体
      '纳税', '未缴', '未交税', '确定申告', '税务', '欠税',
    ],
    mustConsider:
      '永住申請では住民税・所得税の完納証明が必要。' +
      '未納・滞納が直近3〜5年以内にある場合は許可に影響する可能性がある。' +
      '確定申告漏れがある場合も審査に影響しうる。',
    mustNotSay: '少し遅れても大丈夫 / 今払えば問題なし / 影響しません / 許可されます',
    suggestedNextQuestion: '直近5年間で住民税や所得税の未納・滞納の経験はありますか？',
    humanConfirmHint: '未納・滞納が確認された場合は、完納証明を取得した上で行政書士に相談を推奨。',
  },
  {
    anchorId: 'spouse_divorce',
    triggerKeywords: [
      '離婚', '配偶者', '配偶者ビザ', '離婚届', '別居', '定住者',
      // ENGINE 简体
      '离婚', '配偶', '配偶签证', '配偶ビザ', '分居', '别居',
    ],
    mustConsider:
      '日本人・永住者の配偶者資格は婚姻継続が前提。' +
      '離婚成立後は在留資格の基礎が消失し、別途変更が必要になる場合がある。' +
      '離婚後14日以内の届出義務がある。定住者への変更には実績・要件がある。',
    mustNotSay: '離婚しても大丈夫 / すぐ変更できます / 帰国しなくていい / 定住者に変われます',
    suggestedNextQuestion: '現在の在留資格・在留期限・離婚の時期（または予定）を教えてください。',
    humanConfirmHint: '離婚成立済みまたは別居が続いている場合は、在留への影響を速やかに専門家へ確認推奨。',
  },
  {
    anchorId: 'bm_dissolution',
    triggerKeywords: [
      '会社', '清算', '廃業', '経営管理', '解散', '事業停止', '閉鎖',
      // ENGINE 简体
      '公司', '废业', '经营管理', '事业停止', '关闭', '关停', '业务停止',
    ],
    mustConsider:
      '経営管理の在留資格は実際の経営活動継続が前提。' +
      '会社が実態なく存続している場合や清算手続きが未完了でも、活動実態が失われると資格の根拠が消失する可能性がある。',
    mustNotSay: '会社があれば大丈夫 / 書類上の会社で更新できます / 清算しなくても問題なし',
    suggestedNextQuestion: '会社の現在の経営実態（売上・従業員・活動状況）と在留期限を教えてください。',
    humanConfirmHint: '会社が実質活動停止・休業状態の場合は、更新前に行政書士への相談を強く推奨。',
  },
  {
    anchorId: 'work_mismatch',
    triggerKeywords: [
      '仕事内容', '活動範囲', '副業', 'アルバイト', '資格外活動', '業務内容', '不法就労',
      // ENGINE 简体
      '工作内容', '活动范围', '副业', '兼职', '资格外活动', '业务内容', '非法就劳', '打工',
    ],
    mustConsider:
      '就労ビザの活動範囲外の業務（例：技人国での飲食現場作業）は資格外活動となりうる。' +
      '副業・兼業も許可の範囲内かの確認が必要。' +
      '資格外活動は在留資格取消しや不法就労につながる可能性がある。',
    mustNotSay: 'バレません / 問題ありません / 少しなら大丈夫 / 会社が許可すれば大丈夫',
    suggestedNextQuestion: '現在の在留資格の種類と、実際に行っている主な業務内容を具体的に教えてください。',
    humanConfirmHint: '現在の業務が在留資格の活動範囲と異なる可能性がある場合は、即時専門家への相談を推奨。',
  },
  {
    anchorId: 'supplemental_request',
    triggerKeywords: [
      '補完要求', '追加書類', '入管', '通知書', '資料追加', '提出期限', '補充材料',
      // ENGINE 简体
      '补材料', '补充材料', '追加书类', '通知书', '资料追加', '提交期限', '补完要求', '补资料',
    ],
    mustConsider:
      '入管から補完要求が届いた場合、指定期限内に提出しなければ申請が取り下げ扱いになる可能性がある。' +
      '通知書に記載の要求書類・期限・提出先を正確に把握することが最優先。',
    mustNotSay: '大丈夫です / 許可されます / 通常は問題なし / 出せば許可が出ます',
    suggestedNextQuestion: '通知書に記載されている提出期限と要求されている書類の内容を教えてください。',
    humanConfirmHint: '期限が2週間未満の場合や、要求書類の取得が困難な場合は行政書士に即時相談を推奨。',
  },
  {
    anchorId: 'denial_notice',
    triggerKeywords: [
      '不許可', '不交付', '通知書', '拒否', '申請却下', '不許可通知書',
      // ENGINE 简体
      '不许可', '不许可通知书', '通知书', '拒绝', '申请驳回', '驳回',
    ],
    mustConsider:
      '不許可通知を受けた場合、在留期限が迫っている状況では速やかな対応が必要。' +
      '不許可の理由は窓口での確認が可能。再申請・審査請求・異議申立てなど選択肢があるが要件・期限が異なる。',
    mustNotSay: '再申請すれば通ります / 理由を聞けば解決します / 必ず方法があります / 諦めなくて大丈夫',
    suggestedNextQuestion: '不許可通知の受領日・現在の在留期限・申請の種類（変更・更新・永住等）を教えてください。',
    humanConfirmHint: '不許可通知受領後は在留期限の残余日数に関わらず、行政書士または弁護士への相談を強く推奨。',
  },
  {
    anchorId: 'visa_expiring',
    triggerKeywords: [
      '在留期限', '更新', '期限切れ', 'もうすぐ', '更新申請', '在留期間', '期限',
      // ENGINE 简体
      '过期', '快到期', '更新申请', '在留期间', '签证到期', '续签',
    ],
    mustConsider:
      '更新申請は原則、在留期限の3ヶ月前から期限日まで。' +
      '期限を過ぎての申請は特別な理由がない限りリスクがある。' +
      '在留カードの記載内容と在留期限を正確に確認する必要がある。',
    mustNotSay: 'まだ大丈夫 / 申請すれば問題なし / 期限が過ぎても申請できます / 大丈夫です',
    suggestedNextQuestion: '在留カードに記載されている在留期限と、更新したい在留資格の種類を教えてください。',
    humanConfirmHint: '在留期限まで1ヶ月以内の場合や、期限が既に過ぎている場合は専門家への即時相談を強く推奨。',
  },
  {
    anchorId: 'family_change_impact',
    triggerKeywords: [
      '家族', '配偶者', '子供', '家族滞在', '影響', '変更', '在留資格',
      // ENGINE 简体
      '家人', '配偶', '孩子', '家族滞在', '影响', '变更', '在留资格',
    ],
    mustConsider:
      '扶養者の在留資格変更・喪失・更新不許可は、家族滞在の家族員の在留にも影響する可能性がある。' +
      '家族員が就労している場合は資格外活動許可の範囲内かどうかも確認が必要。',
    mustNotSay: '家族は関係ありません / 影響しません / 家族は安全です / 別々に更新できます',
    suggestedNextQuestion: '変更・更新が生じる方の在留資格と、影響を受ける可能性がある家族の在留資格を教えてください。',
    humanConfirmHint: '扶養者の在留資格が取り消し・不許可になった場合は、家族全員の状況を専門家に確認推奨。',
  },
  {
    anchorId: 'family_to_work',
    triggerKeywords: [
      '家族滞在', '就労', '働きたい', '転職', '資格変更', '就職', 'ビザ変更',
      // ENGINE 简体
      '就劳', '想工作', '转职', '跳槽', '资格变更', '就职', '签证变更',
    ],
    mustConsider:
      '家族滞在から就労ビザへの変更には、就職先の職務内容と学歴・職歴の整合性が必要。' +
      '資格外活動許可（週28時間以内）の就労とは別の手続きとなる。' +
      '変更申請中は現在の在留資格の範囲内での活動が原則。',
    mustNotSay: '働けます / 変更できます / 会社が採用すれば大丈夫 / 申請すれば許可されます',
    suggestedNextQuestion: '就職先の職種・業務内容と、ご自身の学歴・これまでの職歴を教えてください。',
    humanConfirmHint: '就職先の業務内容と学歴・職歴の対応が不明確な場合は、申請前に行政書士への確認を推奨。',
  },
  {
    anchorId: 'humanities_job_change',
    triggerKeywords: [
      '転職', '技術人文', '会社変更', '退職', '転職届', '職場変更', '就職',
      // ENGINE 简体
      '转职', '跳槽', '技术人文', '公司变更', '离职', '转职届', '职场变更', '就职',
    ],
    mustConsider:
      '技人国での転職は、転職先の業務内容が現在の在留資格の活動範囲に含まれるかの確認が必要。' +
      '転職後14日以内の届出義務がある。' +
      '転職先の業務が活動範囲外の場合は在留資格変更が必要になる場合がある。',
    mustNotSay: '転職できます / 届出するだけで大丈夫 / どんな仕事でも問題なし / 許可されます',
    suggestedNextQuestion: '現在の在留資格・転職先の具体的な業務内容・ご自身の学歴を教えてください。',
    humanConfirmHint: '転職先の業務が「専門性・技術性・人文知識」から乖離している可能性がある場合は申請前に確認推奨。',
  },
  {
    anchorId: 're_entry',
    triggerKeywords: [
      '再入国', '離日', '出国', 'みなし再入国', '長期出国', '帰国', '在留期限',
      // ENGINE 简体
      '离日', '视同再入国', '长期出国', '回国', '在留期限',
    ],
    mustConsider:
      'みなし再入国許可は出国後1年以内かつ在留期限内が条件。' +
      '長期出国の場合は通常の再入国許可（最大5年）が必要。' +
      '在留期限を出国中に迎えると再入国不可になる可能性がある。' +
      '経営管理者の長期不在は活動実態問題を生じることがある。',
    mustNotSay: '大丈夫です / みなし再入国で1年は安全 / いつ帰っても問題なし / 在留期限は関係ない',
    suggestedNextQuestion: '現在の在留期限・出国予定期間・在留資格の種類を教えてください。',
    humanConfirmHint: '出国中に在留期限を迎える可能性がある場合は、出国前に再入国許可の種類と有効性の確認を推奨。',
  },
  {
    anchorId: 'card_lost',
    triggerKeywords: [
      '在留カード', '紛失', '盗難', '失くした', '再発行', '届出',
      // ENGINE 简体
      '在留卡', '丢失', '弄丢', '被盗', '再发行', '补办', '申报', '丢了',
    ],
    mustConsider:
      '在留カードを紛失・盗難した場合は14日以内に市区町村への届出が必要。' +
      '再発行は入管局への申請が必要。' +
      '在留カードは常時携帯義務があり、紛失状態が続くと義務違反になる可能性がある。',
    mustNotSay: 'すぐ再発行できます / 問題ありません / 影響しません / 更新と同時でいいです',
    suggestedNextQuestion: '紛失・盗難の時期と、現在お住まいの市区町村を教えてください。',
    humanConfirmHint: '在留期限の更新時期と重なる場合や、紛失から14日以上経過している場合は専門家への確認を推奨。',
  },
])

/**
 * Substring keyword match (Pack §2.1). Returns matched anchors in
 * FACT_ANCHORS declaration order (which mirrors DOMAIN_FACT_ANCHORS_v0.1
 * FA-01..FA-15 order). Each anchor matches at most once even if multiple
 * trigger keywords hit (no de-dup of triggers — first hit wins; the
 * anchor is in or out).
 *
 * Inputs are concatenated with a space separator and lower-cased before
 * matching. Triggers are also lower-cased before comparison so any
 * latin/half-width Romaji is case-insensitive. Han / hiragana / katakana
 * are unaffected by toLowerCase (no case in those scripts).
 *
 * Pack §2.1 invariants:
 *   - No regex
 *   - No tokenizer
 *   - No embeddings / vector search / RAG
 *   - Sub-millisecond runtime (~150 indexOf calls)
 */
export function matchAnchors(
  question: string,
  imageSummary?: string | null,
): FactAnchor[] {
  const haystack = `${question} ${imageSummary ?? ''}`.toLowerCase()
  if (!haystack.trim()) return []
  const out: FactAnchor[] = []
  for (const a of FACT_ANCHORS) {
    for (const kw of a.triggerKeywords) {
      if (haystack.includes(kw.toLowerCase())) {
        out.push(a)
        break
      }
    }
  }
  return out
}

/**
 * Convert matched anchors into the `{id, text}` shape that
 * `buildConsultationMessages` expects (Issue #39 scaffold). The text is
 * a single line composed of the four DOMAIN-canonical fields so the LLM
 * sees them all in one prompt-context bullet.
 */
export function anchorsToPromptContext(
  anchors: ReadonlyArray<FactAnchor>,
): Array<{ id: string; text: string }> {
  return anchors.map(a => ({
    id: a.anchorId,
    text: [
      `必考虑：${a.mustConsider}`,
      `不得说：${a.mustNotSay}`,
      `建议追问：${a.suggestedNextQuestion}`,
      `Human review hint：${a.humanConfirmHint}`,
    ].join(' / '),
  }))
}
