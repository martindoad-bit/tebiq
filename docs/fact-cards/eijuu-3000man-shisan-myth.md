---
fact_id: eijuu-3000man-shisan-myth
title: 永住申請 — 独立生計要件に公式の固定年収・資産額はない
state: ai_verified
risk_level: high
confidence: medium
source_quality: official
last_verified_at: '2026-05-17'
sprint: fact-window-bulk-1
citation_label: 永住 独立生計
citation_summary: >-
  永住の3要件のうち「独立の生計を営むに足りる資産又は技能」について、ISA公式ページには具体的な年収・資産額の目安記載はない。実務上の目安は弁護士・行政書士で確認要。
source_display_names:
  - 出入国在留管理庁
applies_when:
  - 永住 年収 ライン
  - 永住 独立生計
does_not_cover:
  - 実務上の年収目安（要専門家相談）
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: 'https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html'
    label: ISA — 永住申請
    accessed: '2026-05-17'
applies_to:
  - 永住申請者
direct_fact_fields:
  - 永住許可の基本要件には「独立の生計を営むに足りる資産又は技能」が含まれる
  - ISA 公式ページは一律の年収額・資産額を数値で示していない
ai_inferred_fields:
  - 実務目安：年収300万円以上が多い（要相談・確認）
  - 家族構成により基準は変動
needs_review_flags:
  - jisshou_practice_amount_2026
  - kazoku_kosei_henkou
  - jushishi_specific_threshold
related_links:
  - title: ISA — 永住
    url: 'https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html'
    organization: 出入国在留管理庁
    display_label: 永住
    locator: 独立生計
    relation: official_reference
evidence_points:
  - claim: 永住許可の基本要件には独立生計要件が含まれるが、ISA公式ページは一律の固定年収額・資産額を数値で示していない。
    source_title: ISA — 永住
    source_url: 'https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html'
    source_organization: 出入国在留管理庁
    source_locator: 独立生計
    display_label: 永住 独立生計目安なし
    support_level: direct
    user_visible: true
    needs_domain_review: false
reviewer: Loop8 FACT/DOMAIN intersect
controlled_alpha_eligible: false
---

## current_effective_fact

永住「独立生計」要件は公式に具体数値なし。

## must_say

- 法定要件
- 公式数値目安なし
- 専門家相談推奨

## injection_format

### injection_certain_block

```text
【永住 独立生計／{{TODAY_ISO}} 公式】
・永住許可の基本要件には「独立の生計を営むに足りる資産又は技能」がある。
・ISA 公式ページは、一律の年収額・資産額を数値で示していない。
・300万円/3000万円などを「公式の固定ライン」として断定しない。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
