---
fact_id: eijuu-zeikin-payment
title: 永住申請 — 税・納付状況の証明は重要
state: ai_verified
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住 税金未納"
citation_summary: "永住申請では住民税の課税・納税証明書や国税の納税証明書など、公的義務の履行状況を示す資料が求められる。未納・遅延納付の具体的影響は個別判断。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "住民税 滞納 永住"
  - "永住 国税 5税目"
does_not_cover:
  - "未納分の対処方法（実務）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住許可申請
    accessed: "2026-05-17"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 永住申請では住民税の課税証明書・納税証明書が求められる
  - 国税の納税証明書（その3）など、未納がないことを示す資料が求められる場合がある
  - 税・年金・保険など公的義務の履行状況は永住審査で重要
  - 未納・遅延納付の具体的影響は申請ルート・時系列・補正状況により異なる
ai_inferred_fields:
  - 未納完納後すぐの申請は厳しい（時系列上問題視される）
  - 配偶者枠は3年分
needs_review_flags:
  - completion_then_application_timing
  - special_collection_proof_method
  - haigusha_3years_specific_rule
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "5年・5税目"
    relation: "official_reference"
evidence_points:
  - claim: "永住申請では住民税の課税・納税証明書、国税の納税証明書など、公的義務の履行状況を示す資料が求められる。未納・遅延納付の具体的影響は個別判断。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "5年・5税目"
    display_label: "永住 税金"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住申請では税・公的義務の履行状況を示す資料が重要。

## must_say

- 住民税の課税・納税証明書
- 国税の納税証明書
- 未納・遅延納付の具体的影響は個別判断

## injection_format

### injection_certain_block

```text
【永住申請と税証明／{{TODAY_ISO}} 公式】
永住申請では、住民税の課税証明書・納税証明書、国税の納税証明書など、公的義務の履行状況を示す資料が求められる。
税・年金・保険などの公的義務は永住審査で重要な確認対象。
未納や遅延納付がある場合、その具体的影響は申請ルート、時系列、補正状況により異なるため、AIだけで「問題ない／必ず不許可」と断定しない。
```

### injection_needs_review_addendum

```text
※ 必要年数・税目・追納後の評価は申請ルート別に確認が必要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | Codex Loop11 | DOMAIN/AQL/QA review 后限定 promote。注入范围限于永住税证与公的义务重要性；不判断未纳/迟纳的个案影响。 | ai_extracted | ai_verified | loop11-promote |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
