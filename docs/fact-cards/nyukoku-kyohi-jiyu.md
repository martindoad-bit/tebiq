---
fact_id: nyukoku-kyohi-jiyu
title: 上陸拒否事由 — 入管法第5条10項目
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "上陸拒否事由"
citation_summary: "入管法第5条の上陸拒否事由には、感染症、麻薬関連、1年以上の懲役・禁錮、麻薬犯罪、売春関連、退去強制歴、テロ関連など10項目あり。該当者は原則として上陸不可。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "前科 来日"
  - "退去強制歴 再入国"
does_not_cover:
  - "上陸特別許可（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-9.html
    label: ISA — 上陸拒否
    accessed: "2026-05-17"
applies_to:
  - 来日希望の外国人
direct_fact_fields:
  - 感染症
  - 麻薬・覚醒剤関連
  - 1年以上の懲役・禁錮歴
  - 麻薬犯罪歴（軽微でも）
  - 売春関連
  - 退去強制歴
  - テロ関連
  - 7条1項各号該当
  - その他
ai_inferred_fields:
  - 上陸特別許可の可能性あり（人道的事情等）
  - 退去強制後5年/10年の再上陸制限
needs_review_flags:
  - 5year_vs_10year_resubmission_specifics
  - terror_related_judgment_criteria
  - special_permission_actual_practice
related_links:
  - title: "ISA — 上陸拒否"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-9.html"
    organization: "出入国在留管理庁"
    display_label: "上陸拒否"
    locator: "5条"
    relation: "official_reference"
evidence_points:
  - claim: "入管法第5条の上陸拒否事由には感染症、麻薬関連、1年以上の懲役・禁錮、退去強制歴等10項目あり。該当者は原則上陸不可。"
    source_title: "ISA — 上陸拒否"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-9.html"
    source_organization: "出入国在留管理庁"
    source_locator: "5条"
    display_label: "上陸拒否事由"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

上陸拒否：感染症・麻薬・前科・退去歴・テロ等。

## must_say

- 10項目
- 1年以上前科で拒否対象
- 上陸特別許可あり

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
