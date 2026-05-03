import type { AnswerSource } from './types'

// Deterministic safe-answer rules for known-dangerous question shapes.
// These bypass the legacy seed lookup entirely and write a hand-crafted
// safe AnswerSource directly. The projector then turns this into a
// PublicAnswer with status='preliminary'.
//
// Rules are intentionally narrow. Each names the exact shape it
// handles; new rules append, never widen existing ones.

export interface RuleBasedMatch {
  source: AnswerSource
  rule_id: string
}

export function tryRuleBasedSource(input: {
  questionText: string
}): RuleBasedMatch | null {
  if (matchSpouseDivorceTeiju(input.questionText)) {
    return {
      rule_id: 'spouse_divorce_to_teiju',
      source: spouseDivorceTeijuSource(),
    }
  }
  return null
}

function matchSpouseDivorceTeiju(q: string): boolean {
  const teiju = /(定住|定住者)/.test(q)
  const spouse = /(配偶|配偶者|配偶签|日本人配偶|永住者の配偶|妻|夫)/.test(q)
  const divorce = /(离婚|離婚|分居|协议离婚|協議離婚|裁判離婚|別居)/.test(q)
  return teiju && spouse && divorce
}

function spouseDivorceTeijuSource(): AnswerSource {
  return {
    kind: 'rule_based',
    rule_id: 'spouse_divorce_to_teiju',
    source_confidence: 'medium',
    legacy_title: '配偶离婚后转「定住者」需要的事实和手续',
    legacy_summary:
      '配偶离婚后想转「定住者」不是届出可以解决的事，需要走「在留資格変更許可申請」。能不能批，看婚姻持续期间、在日年数、子女与亲权、收入与税金、住所与生活基础、离婚原因这些个案事实。TEBIQ 不能保证一定能转。',
    legacy_conclusion:
      '配偶离婚后想转「定住者」不是届出可以解决的事，需要走「在留資格変更許可申請」。',
    legacy_what_to_do: [
      '先把离婚事实和 14 日内届出做掉',
      '整理「離婚定住」要看的事实',
      '判断是「在留資格変更」还是先「在留期間更新」',
      '咨询行政書士做个案诊断',
    ],
    legacy_how_to_do: [
      '离婚成立（戸籍記載）后 14 日内，向出入国在留管理庁提交「配偶者に関する届出」。这个届出是义务，做不做都不直接决定定住能否取得，但不做会被记一笔。',
      '把婚姻持续期、同居期、在日年数、子女出生地与亲权、最近 3 年的所得 / 課税 / 納税証明、年金缴纳记录、住所证明集中放在一起。',
      '在留期限尚远可以直接申请变更；期限将至且事实尚未齐备，要权衡先更新配偶签再变更，还是直接变更。',
      '离婚定住高度依赖个案事实，建议带婚姻 / 离婚 / 子女 / 收入 / 在留 文书咨询有「離婚定住」实务经验的行政書士。',
    ],
    legacy_where_to_go: ['出入国在留管理局', '行政書士事务所'],
    legacy_documents_needed: [
      '在留カード',
      '护照',
      '戸籍謄本（離婚記載あり） / 離婚届受理証明書',
      '婚姻期間 / 同居期間を示す資料',
      '住民票（世帯全員）',
      '直近 3 年の課税証明書 / 納税証明書',
      '年金加入記録 / 健康保険加入記録',
      '在職証明書 / 雇用契約書 / 給与明細',
      '子女の出生証明 / 親権者を示す書類（如有）',
    ],
    legacy_deadline_or_timing: [
      '离婚成立 14 日内必须提交「配偶者に関する届出」。',
      '在留資格変更建议在当前在留期限到期前留出 2 - 3 个月窗口。',
    ],
    legacy_consequences: [
      '婚姻持续期短（同居 3 年以下）通常很难直接转定住者。',
      '没有日本国籍子女且在日年数不长时，审查会显著严格。',
      '未缴年金 / 未缴税记录会成为强减分项。',
      'TEBIQ 不能保证一定能转定住者；最终结果由出入国在留管理庁判断。',
    ],
    legacy_expert_handoff: [
      '婚姻持续 < 3 年、子女不归你抚养、年金 / 税金有空白、或离婚原因复杂的，必须带材料咨询有「離婚定住」实务经验的行政書士再决定申请。',
    ],
    legacy_sections: [
      {
        heading: '我先按以下假设给你一个初步整理',
        body: [
          '· 你目前的在留资格是「日本人の配偶者等」或「永住者の配偶者等」。',
          '· 你已经办理或即将办理离婚（協議離婚 / 調停離婚 / 裁判離婚 任一）。',
          '· 你想知道怎么从配偶签转到「定住者」（不是简单延签）。',
        ].join('\n'),
      },
      {
        heading: '初步答案',
        body: '配偶离婚后想转「定住者」不是届出可以解决的事，需要走「在留資格変更許可申請」。能不能批，看婚姻持续期间、在日年数、子女与亲权、收入与税金、住所与生活基础、离婚原因、是否有暴力 / 不法行为记录这些个案事实。TEBIQ 不能保证一定能转。',
      },
    ],
    legacy_next_steps: [
      '先把离婚事实和 14 日内届出做掉',
      '整理「離婚定住」要看的事实',
      '判断是「在留資格変更」还是先「在留期間更新」',
      '咨询行政書士做个案诊断',
    ],
    legacy_seed_id: null,
    legacy_card_id: null,
    legacy_review_status: 'unreviewed',
    legacy_answer_type: 'draft',
  }
}
