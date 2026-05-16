---
fact_id: eijuu-zairyu-keizoku-renewal-during
title: 永住申請中 — 在留期限満了時は通常の更新申請も並行
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住申請中更新"
citation_summary: "永住申請の処理期間（4〜6か月）中に現在の在留期限が満了する場合は、通常の在留期間更新申請を並行して行う必要がある。特例期間制度の対象外。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住申請中 期限切れ"
  - "永住申請 更新 並行"
does_not_cover:
  - "特例期間制度（更新/変更のみ対象）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住
    accessed: "2026-05-17"
applies_to:
  - 永住申請中の中長期在留者
direct_fact_fields:
  - 永住申請中の特例期間：適用なし
  - 在留期間満了前：通常の更新申請を並行
  - 並行申請の手数料：永住1万円+更新6000円
  - 永住許可時：更新分は不要となる
ai_inferred_fields:
  - 入管窓口で並行申請の指示あり
needs_review_flags:
  - tetsuzuki_combined_specific_practice
  - kasenryu_for_dual_filing
  - permit_priority_during_dual
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "申請中"
    relation: "official_reference"
evidence_points:
  - claim: "永住申請中は特例期間制度の対象外。在留期限満了前に通常の更新申請を並行する必要がある。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請中"
    display_label: "永住申請中更新並行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住申請中は特例期間対象外・並行更新必要。

## must_say

- 特例期間対象外
- 通常更新と並行
- 永住許可時は更新不要

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
