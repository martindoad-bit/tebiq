---
fact_id: zairyu-irrelevent-jutsu
title: 在留資格変更 — 現在の在留資格の活動範囲外は変更許可が必要
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "業務範囲外転職変更"
citation_summary: "現在の在留資格で許可されている活動範囲を超える活動を行う場合は、在留資格変更許可申請が必要。許可前に範囲外の報酬活動を始めてよいとは扱わない。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "技人国 経営者 変更"
  - "業務範囲 転職"
does_not_cover:
  - "同一在留資格内の転職（届出のみ）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-1.html
    label: ISA — 在留資格変更
    accessed: "2026-05-17"
applies_to:
  - 業務範囲超の転職予定者
direct_fact_fields:
  - 現在の在留資格の活動範囲外：在留資格変更許可が必要
  - 許可前に範囲外の報酬活動を始める判断は不可
  - 同じ在留資格名でも職務内容が範囲内かは別途確認が必要
ai_inferred_fields:
  - 入管に判断を仰ぐべき境界事例多数
needs_review_flags:
  - boundary_case_practice
  - permission_period_during_transition
  - reverse_changes_practice
related_links:
  - title: "ISA — 在留資格変更"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    organization: "出入国在留管理庁"
    display_label: "在留資格変更"
    locator: "業務範囲"
    relation: "official_reference"
evidence_points:
  - claim: "現在の在留資格の活動範囲を超える活動を行う場合は、在留資格変更許可申請が必要。許可前に範囲外活動を始めてよいとは扱わない。"
    source_title: "ISA — 在留資格変更"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "業務範囲"
    display_label: "業務範囲外変更"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

現在の在留資格の活動範囲外に出る場合は、在留資格変更許可が必要。

## must_say

- 活動範囲外は変更許可が必要
- 許可前に範囲外の報酬活動を始めない
- 同じ在留資格名でも職務内容の範囲確認が必要

## injection_format

### injection_certain_block

```text
【在留資格変更と活動範囲／{{TODAY_ISO}} 公式】
現在の在留資格で認められている活動範囲を超える活動を行う場合は、在留資格変更許可申請が必要。
許可が出る前に、新しい活動範囲の報酬活動を開始してよいとは扱わない。
同じ在留資格名の転職でも、実際の職務内容が現在の資格範囲内かは別途確認する。
```

### injection_needs_review_addendum

```text
※ 同一資格内の転職、就労資格証明書、届出義務との関係は個別事情で確認。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
