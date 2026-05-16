---
fact_id: tokurei-kikan-2months
title: 特例期間制度 — 申請中の在留期間満了後最大2か月の在留継続
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
reviewer:
sprint: "fact-window-bulk-1"
citation_label: "特例期間（申請中2か月在留継続）"
citation_summary: "在留期間更新・変更許可申請中に在留期間が満了した場合、処分が出るまで、または満了から2か月経過まで、従前の在留資格で在留・活動を継続できる制度。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户的在留卡快到期但申请还没结果"
  - "用户问在留期间过了能不能继续工作/生活"
  - "用户担心申请中过期会被强制出国"
does_not_cover:
  - "申請を出していない場合の在留期間満了（不法残留扱い）"
  - "申請が不許可になった後の出国期間"
  - "再入国許可とは別制度"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html
    label: ISA — 特例期間制度
    accessed: "2026-05-17"
applies_to:
  - 在留期間更新許可申請または在留資格変更許可申請を行った中長期在留者
direct_fact_fields:
  - 開始条件：更新または変更の許可申請を行ったこと（ISA公式）
  - 効果：従前の在留資格で在留・活動を継続可能（ISA公式）
  - 終了：処分時 または 在留期間満了から2か月経過時の早い方（ISA公式）
  - カード裏面記載：「在留期間更新等許可申請欄」に申請中である旨が記載される（オンライン申請は除く）（ISA公式）
  - 有効性確認：在留カード等番号失効情報照会ページで確認可能（ISA公式）
ai_inferred_fields:
  - 出国予定がある場合は別途再入国許可が必要（ai推定）
  - 雇用主が在留期限切れと誤認するリスクあり、カード裏面確認の説明が必要
needs_review_flags:
  - reentry_during_tokurei_kikan
  - employer_payroll_handling
  - online_application_card_back_notation_status
related_links:
  - title: "ISA — 特例期間制度"
    url: "https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 特例期間制度"
    locator: "ページ内「2か月」"
    relation: "official_reference"
evidence_points:
  - claim: "更新・変更申請中に在留期間が満了した場合、処分時または満了から2か月経過時のいずれか早い時点まで、従前の在留資格で在留・活動を継続できる。カード裏面に申請中の旨が記載される（オンライン申請を除く）。"
    source_title: "ISA — 特例期間制度"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「2か月」「在留期間更新等許可申請欄」"
    display_label: "特例期間 最大2か月"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報に基づく特例期間制度。

## current_effective_fact

在留期間更新・変更許可申請中は、在留期間満了後も最大2か月（または処分時まで）従前の在留資格で在留・活動可能。

## exceptions_or_transition

- 出国・再入国は特例期間中も別途再入国許可が必要（要確認）
- 申請を出していない場合は不法残留

## common_user_phrases

- 在留期間 過ぎた 申請中
- 特例期間 2ヶ月
- 申請中 期限切れ 働ける
- ビザ申請中 期限切れ

## must_say

- 申請中なら処分時または満了2か月の早い方まで在留・活動可能
- カード裏面に申請中表示
- 申請を出していなければ不法残留

## must_not_say

- 「申請を出していなくても2か月の猶予がある」（誤り）
- 「永遠に申請中で居られる」（誤り）

## qa_cases

**Q: 在留期間が終わるまでに更新の結果が出ません。働けますか？**
A: 期間内に更新申請を提出していれば、特例期間制度により処分時または満了から2か月経過時のいずれか早い時点まで、従前の在留資格で就労・活動を継続できます。カード裏面に申請中の旨が記載されます。

## injection_format

### injection_certain_block

```
【特例期間／ {{TODAY_ISO}} 公式】
・対象：在留期間更新/変更申請を期間内に提出済み
・効果：処分時または満了+2か月の早い方まで在留・活動可
・カード裏面に申請中の表示
```

### injection_needs_review_addendum

```
※ 特例期間中の出国・雇用主側の取扱は別途確認要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成（ai_extracted）。 | — | ai_extracted | new |
