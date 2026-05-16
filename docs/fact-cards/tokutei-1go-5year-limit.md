---
fact_id: tokutei-1go-5year-limit
title: 特定技能1号 — 通算5年上限ルール
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "特技1号 5年上限"
citation_summary: "特定技能1号の通算在留期間は5年。技能実習からの移行年数は通算に含まれない。5年経過後は2号への移行か出国が必要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特定技能 5年 上限"
  - "特技1号 何年まで"
does_not_cover:
  - "1号→2号移行の試験要件"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    label: ISA — 特定技能
    accessed: "2026-05-17"
applies_to:
  - 特定技能1号保持者
direct_fact_fields:
  - 通算上限：5年
  - 単位：1年/6か月/4か月（更新）
  - 技能実習期間：通算に含まれない
  - 5年経過後：2号移行 or 出国
  - 病気等での中断は通算カウント停止
ai_inferred_fields:
  - 2号移行できない分野では実質5年で出国必須
needs_review_flags:
  - byouki_chudan_specific_calculation
  - reentry_after_5year_period
  - 2go_unavailable_field_list
related_links:
  - title: "ISA — 特定技能"
    url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    organization: "出入国在留管理庁"
    display_label: "特技"
    locator: "通算5年"
    relation: "official_reference"
evidence_points:
  - claim: "特定技能1号の通算在留期間は5年。技能実習期間は通算に含まれない。5年経過後は2号移行か出国必要。"
    source_title: "ISA — 特技"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "通算5年"
    display_label: "特技1号5年上限"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

特技1号：通算5年上限・以降2号 or 出国。

## must_say

- 通算5年上限
- 技能実習期間は含まれず
- 2号移行 or 出国

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
