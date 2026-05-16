---
fact_id: eijuu-3000man-shisan-myth
title: 永住申請 — 「独立生計」要件の年収目安は公式記載なし
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住 独立生計"
citation_summary: "永住の3要件のうち「独立の生計を営むに足りる資産又は技能」について、ISA公式ページには具体的な年収・資産額の目安記載はない。実務上の目安は弁護士・行政書士で確認要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 年収 ライン"
  - "永住 独立生計"
does_not_cover:
  - "実務上の年収目安（要専門家相談）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 「独立の生計を営むに足りる資産又は技能」（法定要件）
  - 具体的な数値目安：ISA公式に記載なし
  - 家族（配偶者・親族）の資産も合算考慮可
  - 安定継続性が重要
ai_inferred_fields:
  - 実務目安：年収300万円以上が多い（要相談・確認）
  - 家族構成により基準は変動
needs_review_flags:
  - jisshou_practice_amount_2026
  - kazoku_kosei_henkou
  - jushishi_specific_threshold
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "独立生計"
    relation: "official_reference"
evidence_points:
  - claim: "永住の「独立生計」要件は法定だが、ISA公式に具体的な年収・資産額目安の記載はない。家族資産も合算考慮可、安定継続性が重要。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "独立生計"
    display_label: "永住 独立生計目安なし"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住「独立生計」要件は公式に具体数値なし。

## must_say

- 法定要件
- 公式数値目安なし
- 専門家相談推奨

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
