---
fact_id: eijuu-takeoff-risk
title: 永住者 — 1年超の海外滞在で再入国期限超過リスク
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住者 海外滞在期限"
citation_summary: "永住者がみなし再入国（1年以内）または通常再入国（最大5年）の期限内に帰国しない場合、永住資格を失う。長期滞在予定は出国前に通常再入国必須。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住者 1年超 帰国"
  - "永住 失効 帰国"
does_not_cover:
  - "再入国許可申請手続詳細（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-9.html
    label: ISA — 再入国
    accessed: "2026-05-17"
applies_to:
  - 永住資格保持者
direct_fact_fields:
  - みなし再入国：1年（出国時手続のみ）
  - 通常再入国：最大5年
  - 期限内未帰国：永住資格喪失
  - 喪失後の再永住：通常永住申請（10年要件など最初から）
ai_inferred_fields:
  - 病気等のやむを得ない事情でも原則延長不可
needs_review_flags:
  - yamuoenai_jijou_official_exception
  - reentry_extension_from_abroad
  - special_permanent_resident_difference
related_links:
  - title: "ISA — 再入国"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-9.html"
    organization: "出入国在留管理庁"
    display_label: "再入国"
    locator: "永住者"
    relation: "official_reference"
evidence_points:
  - claim: "永住者が再入国許可期限内に帰国しなければ永住資格喪失。喪失後の再永住は通常永住申請（最初から）。"
    source_title: "ISA — 再入国"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-9.html"
    source_organization: "出入国在留管理庁"
    source_locator: "永住者"
    display_label: "永住者再入国期限"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住者は再入国期限超過で資格喪失。

## must_say

- みなし1年・通常5年
- 期限内未帰国で永住失効
- 喪失後は10年要件から

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
