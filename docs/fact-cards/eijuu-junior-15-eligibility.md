---
fact_id: eijuu-junior-15-eligibility
title: 永住申請 — 未成年（15歳未満）は親と同時申請が原則
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "未成年永住申請"
citation_summary: "永住申請で15歳未満は法定代理人（親）が申請。親が日本人/永住者または同時申請中の場合に多く認容。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "子供 永住申請"
  - "未成年 永住"
does_not_cover:
  - "永住者の子の在留資格（永住者の配偶者等）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 15歳未満の在留外国人
direct_fact_fields:
  - 15歳未満：法定代理人（親）申請
  - 16歳未満：写真不要
  - 親が日本人/永住者または同時申請中の場合に多く認容
  - 単独永住申請は実務上厳しい
ai_inferred_fields:
  - 学齢以上は学業継続性も考慮
needs_review_flags:
  - dokyu_dokushou_eligibility_age_criterion
  - 15-18_year_old_specific_practice
  - photo_required_age_change
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "16歳未満"
    relation: "official_reference"
evidence_points:
  - claim: "15歳未満の永住申請は法定代理人（親）が申請。16歳未満は写真不要。親が日本人/永住者または同時申請の場合に多く認容。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "16歳未満"
    display_label: "未成年永住申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

未成年永住申請：親と同時申請が原則。

## must_say

- 15歳未満は親申請
- 16歳未満は写真不要
- 同時申請が一般的

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
