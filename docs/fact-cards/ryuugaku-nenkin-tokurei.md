---
fact_id: ryuugaku-nenkin-tokurei
title: 学生納付特例 — 20歳以上学生の国民年金猶予制度
state: ai_verified   # LOOP3 2026-05-17: Japan Pension Service direct source
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "学生納付特例"
citation_summary: "20歳以上の学生は申請により国民年金保険料の納付猶予可。所得128万円以下が対象目安。卒業後の追納可（10年内）。外国人留学生も対象。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "学生 年金 猶予"
  - "留学生 年金"
does_not_cover:
  - "厚生年金加入中の取扱"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nenkin.go.jp/service/kokunen/menjo/20150514.html
    label: 日本年金機構 — 学生納付特例制度
    accessed: "2026-05-17"
applies_to:
  - 20歳以上の学生（外国人留学生含む）
direct_fact_fields:
  - 対象：20歳以上の学生
  - 所得要件あり
  - 申請により在学中の国民年金保険料納付が猶予される
  - 追納可能期間：10年以内
  - 承認期間は老齢基礎年金の受給資格期間に含まれる
ai_inferred_fields:
  - 外国人留学生も日本国内居住者として国民年金の案内対象になる
needs_review_flags:
  - shotoku_2026_amount
  - eijuu_2year_proof_during_tokurei
  - foreign_student_kanyu_practice
related_links:
  - title: "日本年金機構 — 学生納付特例制度"
    url: "https://www.nenkin.go.jp/service/kokunen/menjo/20150514.html"
    organization: "日本年金機構"
    display_label: "学生納付特例"
    locator: "20歳"
    relation: "official_reference"
evidence_points:
  - claim: "20歳以上の学生は、所得要件等を満たして申請すると学生納付特例制度により在学中の国民年金保険料納付が猶予され、10年以内の追納が可能。"
    source_title: "日本年金機構 — 学生納付特例制度"
    source_url: "https://www.nenkin.go.jp/service/kokunen/menjo/20150514.html"
    source_organization: "日本年金機構"
    source_locator: "学生納付特例"
    display_label: "学生納付特例"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

学生納付特例：20歳以上学生・申請制・10年追納可。

## must_say

- 20歳以上学生
- 所得要件あり
- 10年追納可

## injection_format

### injection_certain_block

```text
- 日本国内に住む20歳以上の学生は、国民年金の案内対象になる。
- 所得要件などを満たす学生は、申請により「学生納付特例制度」で在学中の保険料納付を猶予できる。
- 学生納付特例は「自動免除」ではなく申請制。承認された期間は、10年以内であれば追納できる。
- 出典: 日本年金機構「学生納付特例制度」 https://www.nenkin.go.jp/service/kokunen/menjo/20150514.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | 年金機構sourceへ修正し、学生納付特例としてruntime昇格。 | ai_extracted | ai_verified | source-repair/promote |
