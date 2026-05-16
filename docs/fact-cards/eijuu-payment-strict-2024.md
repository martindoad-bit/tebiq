---
fact_id: eijuu-payment-strict-2024
title: 永住者 — 2024年改正で公租公課未納時の取消強化
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住2024改正"
citation_summary: "2024年入管法改正により、永住許可取得後の公租公課（税・年金・健保）の故意未納・遅延に対して永住資格取消が新たな取消事由として追加された。了解書（2021年〜必須）の効力が強化された格好。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 取消 税金未納"
  - "永住者 義務"
does_not_cover:
  - "永住申請時の納税証明要件（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 永住資格保持者
direct_fact_fields:
  - 2024年改正：故意未納/遅延が取消事由として追加（概念的）
  - 了解書：2021年10月から必須
  - 対象：税・年金・健保
  - 取消前に意見聴取
ai_inferred_fields:
  - 「故意」と判断される基準は実務積上中
  - 1回の延滞で即取消にはならないと想定（要確認）
needs_review_flags:
  - koui_judgment_criteria_official
  - delay_threshold_practice_2026
  - 2024_amendment_effective_date_specific
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "了解書"
    relation: "official_reference"
evidence_points:
  - claim: "2024年入管法改正により、永住取得後の公租公課故意未納/遅延が取消事由として強化された。了解書は2021年から必須。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "了解書"
    display_label: "永住2024改正"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住：2024年改正で故意未納の取消事由化。

## must_say

- 2024年改正
- 故意未納は取消事由
- 了解書必須（2021〜）

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
