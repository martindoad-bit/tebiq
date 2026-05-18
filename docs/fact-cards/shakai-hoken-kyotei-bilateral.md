---
fact_id: shakai-hoken-kyotei-bilateral
title: 社会保障協定 — 国別確認と年金期間通算
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "社会保障協定"
citation_summary: "日本は複数国と社会保障協定を締結しており、国によって二重加入防止や年金加入期間の通算の扱いが異なる。協定国数・対象制度・通算可否は日本年金機構の最新一覧で確認する。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "社会保障協定 年金"
  - "中国 年金 通算"
does_not_cover:
  - "脱退一時金詳細（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nenkin.go.jp/service/shaho-kyotei/shaho.html
    label: ISA — 永住（年金関連）
    accessed: "2026-05-17"
applies_to:
  - 協定締約国出身の在留者
direct_fact_fields:
  - 社会保障協定は二重加入防止や年金加入期間通算を目的とする
  - 対象制度と通算可否は国ごとに異なる
  - 協定国数・対象制度は日本年金機構の最新一覧で確認する
ai_inferred_fields:
  - 脱退一時金との関係は個別確認が必要
needs_review_flags:
  - latest_country_list_2026
  - dattai_ichijikin_optimal_strategy
  - bilateral_specific_provision_diff
related_links:
  - title: "年金機構"
    url: "https://www.nenkin.go.jp/service/shaho-kyotei/shaho.html"
    organization: "日本年金機構"
    display_label: "社会保障協定"
    locator: "23カ国"
    relation: "official_reference"
evidence_points:
  - claim: "社会保障協定は二重加入防止や年金加入期間通算を目的とする。対象制度と通算可否は国ごとに異なり、日本年金機構の最新一覧で確認する。"
    source_title: "年金機構"
    source_url: "https://www.nenkin.go.jp/service/shaho-kyotei/shaho.html"
    source_organization: "日本年金機構"
    source_locator: "23カ国"
    display_label: "社会保障協定"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

社会保障協定は二重加入防止や年金加入期間通算を目的とする。対象制度と通算可否は国ごとに異なり、日本年金機構の最新一覧で確認する。

## must_say

- 協定国数・対象制度は日本年金機構の最新一覧で確認する
- 通算可否は国ごとに異なる
- 脱退一時金との関係は個別確認が必要

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
