---
fact_id: ssw-support-implementation-difficulty-attachments-source
title: "特定技能1号 — 支援実施困難では相談記録・面談報告・理由書等を確認する"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 4
citation_label: "特定技能1号: 支援実施困難の資料"
citation_summary: "ISA は、支援実施困難に係る届出の資料として、相談記録書、定期面談報告書、転職支援実施報告書、支援実施困難に係る理由書等を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-013
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "1号特定技能外国人支援計画の実施困難に係る届出"
  source_locator: "支援計画の実施困難に係る届出 / 必要書類等"
  claim_type: material_boundary
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - notification
  exclusion_scope:
    - "全件で必要な添付資料の断定"
    - "記録内容の適否判断"
    - "遅延届出理由の評価"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-support-implementation-difficulty
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00191.html
    title: 特定技能所属機関による1号特定技能外国人支援計画の実施困難に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "支援実施困難届出でどの資料を確認するかの相談"
direct_fact_fields:
  - ssw_support_implementation_difficulty_attachments
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_support_difficulty_attachments_review
    reason: "状況により求められる資料が変わり、追加資料を求められることがある。"
evidence_points:
  - claim: "ISA は、支援実施困難に係る届出の必要書類等として、相談記録書、定期面談報告書、転職支援実施報告書、支援実施困難に係る理由書等を案内している。"
    source_title: "特定技能所属機関による1号特定技能外国人支援計画の実施困難に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00191.html"
    source_organization: "出入国在留管理庁"
    source_locator: "必要書類等"
    display_label: "特定技能1号: 支援実施困難の資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 支援実施困難では相談記録・面談報告・理由書等を確認する

## current_date_logic

Checked against the ISA support-implementation difficulty notification page on 2026-05-13.

## current_effective_fact

支援実施困難に係る届出では、相談記録書、定期面談報告書、転職支援実施報告書、支援実施困難に係る理由書等を確認する。

## exceptions_or_transition

- 全資料が常に必要とは限らない。状況や届出内容により確認する。

## common_user_phrases

- 特定技能 支援実施困難 添付資料
- 特定技能 支援できない 相談記録
- 特定技能 支援実施困難 理由書
- 特定技能 転職支援 実施報告書
- 特定技能 定期面談報告書 支援困難
- 特定技能 support difficulty attachments

## must_say

- 支援実施困難では相談記録・面談報告・理由書等を確認する。

## must_not_say

- 支援実施困難届出は届出書だけで必ず足りる。
- 相談記録や面談報告は支援実施困難では関係ない。

## injection_format

### injection_certain_block

```text

```

### injection_needs_review_addendum

```text

```

## changelog

| Date | Actor | Change | From | To | Notes |
|---|---|---|---|---|---|
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-013 |
