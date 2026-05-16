---
fact_id: zairyu-nintei-shomeisho-application-method
title: COE申請 — 申請人本人/雇用主スタッフ/弁護士/行政書士の選択
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "COE申請方法"
citation_summary: "COE申請は本人または家族（呼び寄せ側）、雇用主スタッフ、弁護士・行政書士などが代理可能。海外居住者本人は来日不可なので代理申請が一般的。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "COE 代理 誰"
  - "雇用主 COE 申請"
does_not_cover:
  - "申請取次資格の要件"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-3.html
    label: ISA — COE
    accessed: "2026-05-17"
applies_to:
  - COE申請関連の代理人
direct_fact_fields:
  - 本人または家族（呼び寄せ側日本在住者）
  - 雇用主スタッフ（登録された取次申請者）
  - 弁護士・行政書士（申請取次資格）
  - 海外居住者本人の単独申請は不可
  - 取次申請者は事前登録要
ai_inferred_fields:
  - 教育機関も学生のCOE取次可
needs_review_flags:
  - registration_procedure_for_tori-tsugi
  - online_for_tori-tsugi
  - faciliating_factors_for_speed
related_links:
  - title: "ISA — COE"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    organization: "出入国在留管理庁"
    display_label: "COE"
    locator: "申請者"
    relation: "official_reference"
evidence_points:
  - claim: "COE申請は本人または家族（呼び寄せ側）、雇用主スタッフ、弁護士・行政書士などが代理可。海外居住者本人の単独申請不可。"
    source_title: "ISA — COE"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請者"
    display_label: "COE申請方法"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

COE申請：本人不可（海外居住）・代理人多数。

## must_say

- 海外本人不可
- 家族・雇用主・専門家代理
- 取次資格要

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
