---
fact_id: eijuu-zeikin-payment
title: 永住申請 — 税金未納/遅延納付は致命的（住民税5年分・国税5税目）
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住 税金未納"
citation_summary: "永住申請では住民税5年分・国税5税目の納税証明書が要求される。1年でも未納・遅延納付があると不許可リスクが高い。"
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
  - 住民税：直近5年分の課税/納税証明書
  - 国税：その3（源泉所得税、申告所得税、消費税、相続税、贈与税の5税目）
  - 遅延納付：通帳写し等で「遅延納付なし」を証明
  - 特別徴収でない期間：別途証明書類必要
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
  - claim: "永住申請には住民税5年分・国税5税目の納税証明書必要。遅延納付は致命的。"
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

永住：住民税5年・国税5税目・遅延納付致命。

## must_say

- 住民税5年分
- 国税5税目
- 遅延納付は致命的

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
