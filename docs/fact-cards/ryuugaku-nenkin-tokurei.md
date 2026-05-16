---
fact_id: ryuugaku-nenkin-tokurei
title: 学生納付特例 — 20歳以上学生の国民年金猶予制度
state: ai_extracted
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
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住（年金）
    accessed: "2026-05-17"
applies_to:
  - 20歳以上の学生（外国人留学生含む）
direct_fact_fields:
  - 対象：20歳以上の学生
  - 所得要件：128万円以下（目安）
  - 申請：区役所国民年金窓口
  - 卒業後追納：10年内可
  - 老齢年金反映：追納すれば全額、なしなら受給資格期間にカウントのみ
ai_inferred_fields:
  - 外国人留学生も加入義務あり（永住申請の2年要件に影響）
needs_review_flags:
  - shotoku_2026_amount
  - eijuu_2year_proof_during_tokurei
  - foreign_student_kanyu_practice
related_links:
  - title: "年金機構"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "日本年金機構"
    display_label: "学生納付特例"
    locator: "20歳"
    relation: "official_reference"
evidence_points:
  - claim: "20歳以上の学生（外国人留学生含む）は申請で国民年金保険料納付猶予可。所得128万円以下目安、卒業後10年内追納可。"
    source_title: "年金機構"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "日本年金機構"
    source_locator: "学生納付特例"
    display_label: "学生納付特例"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

学生納付特例：20歳以上学生・所得要件あり・10年追納可。

## must_say

- 20歳以上学生
- 128万円目安
- 10年追納可

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
