---
fact_id: zairyu-irrelevent-jutsu
title: 在留資格変更 — 業務範囲外への転職は変更許可必須
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "業務範囲外転職変更"
citation_summary: "技人国から経営管理への転職、留学から技人国への変更等、現在の在留資格の活動範囲を超える就職・転職は在留資格変更許可申請が必要。許可前の活動は不法就労。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "技人国 経営者 変更"
  - "業務範囲 転職"
does_not_cover:
  - "同一在留資格内の転職（届出のみ）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-1.html
    label: ISA — 在留資格変更
    accessed: "2026-05-17"
applies_to:
  - 業務範囲超の転職予定者
direct_fact_fields:
  - 業務範囲超：変更許可必須
  - 許可前の活動：不法就労扱い
  - 同一資格内の転職：所属機関等届出14日のみ
  - 就労資格証明書の取得推奨（同一資格内転職時）
ai_inferred_fields:
  - 入管に判断を仰ぐべき境界事例多数
needs_review_flags:
  - boundary_case_practice
  - permission_period_during_transition
  - reverse_changes_practice
related_links:
  - title: "ISA — 在留資格変更"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    organization: "出入国在留管理庁"
    display_label: "在留資格変更"
    locator: "業務範囲"
    relation: "official_reference"
evidence_points:
  - claim: "現在の在留資格の活動範囲を超える就職・転職は在留資格変更許可申請が必須。許可前の活動は不法就労扱い。"
    source_title: "ISA — 在留資格変更"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "業務範囲"
    display_label: "業務範囲外変更"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

業務範囲外転職：変更許可必須・許可前活動は不法。

## must_say

- 業務範囲超は変更許可
- 許可前は不法就労
- 同資格内は届出のみ

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
