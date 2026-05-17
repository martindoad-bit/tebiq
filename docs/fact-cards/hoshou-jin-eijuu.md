---
fact_id: hoshou-jin-eijuu
title: 永住申請 — 身元保証人（日本人/永住者）・法的責任の範囲
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住身元保証人"
citation_summary: "永住申請には身元保証書1通＋保証人の身分事項証明書が必要。保証人は日本人または永住者。道義的責任（生活費・帰国費）であり連帯保証ではない。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 身元保証人"
  - "保証人 責任"
does_not_cover:
  - "経営管理ビザの常勤職員要件（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 身元保証書：1通必要
  - 保証人資格：日本人または永住者（特別永住者含む）
  - 保証人書類：在職証明書、住民票、納税証明書等
  - 責任：道義的（生活費・帰国費）。連帯保証ではない
ai_inferred_fields:
  - 保証人の所得・納税状況も審査参考にされる
needs_review_flags:
  - hoshounin_income_threshold_practice
  - relationship_to_applicant_requirements
  - tokubetsu_eijuusha_eligibility_strict
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "身元保証書"
    relation: "official_reference"
evidence_points:
  - claim: "永住申請には身元保証書1通＋保証人身分事項証明書が必要。保証人は日本人または永住者。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "身元保証書"
    display_label: "永住身元保証人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住保証人は日本人または永住者・道義的責任。

## must_say

- 保証人は日本人/永住者
- 道義的責任
- 在職・住民票・納税証明添付

## injection_format

### injection_certain_block

```text
- 永住保証人は日本人または永住者・道義的責任。
- 保証人は日本人/永住者
- 道義的責任
- 在職・住民票・納税証明添付
- 出典: ISA — 永住申請 https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
