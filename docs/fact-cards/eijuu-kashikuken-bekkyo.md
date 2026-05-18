---
fact_id: eijuu-kashikuken-bekkyo
title: 永住申請 — 現在の在留期間と「最長の在留期間」要件
state: ai_verified
runtime_bucket: ANSWER_RUNTIME
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住直前在留資格"
citation_summary: "永住許可ガイドラインでは、現在有する在留資格について最長の在留期間をもって在留していることが求められる。3年/5年の実務上の扱いは時期・在留資格・個別事情により確認が必要で、このカードでは許可見込みを判断しない。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 在留期間 3年 5年"
  - "1年ビザ 永住"
does_not_cover:
  - "高度人材・配偶者の例外"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: ISA — 永住ガイドライン
    accessed: "2026-05-17"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 永住許可ガイドラインでは、現在有する在留資格について最長の在留期間をもって在留していることが求められる
  - 直近の在留期間が短い場合、永住申請の前提確認が必要
ai_inferred_fields:
  - 3年の在留期間がどの範囲で最長期間として扱われるか
  - 1年の在留期間がどの程度不利に扱われるか
  - 経過措置・運用変更の具体範囲
needs_review_flags:
  - 5year_visa_strict_application_status
  - 3year_visa_acceptable_practice
  - guideline_revision_history
related_links:
  - title: "ISA — 永住ガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住ガイドライン"
    locator: "在留期間"
    relation: "official_reference"
evidence_points:
  - claim: "永住許可ガイドラインでは、現在有する在留資格について最長の在留期間をもって在留していることが求められる。3年/5年の具体的な扱いはこのカードでは断定しない。"
    source_title: "ISA — 永住ガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留期間"
    display_label: "永住 現在の在留期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住許可ガイドラインでは、現在有する在留資格について最長の在留期間をもって在留していることが求められる。3年/5年や1年の具体的な扱いは個別確認が必要。

## must_say

- 「最長の在留期間」がガイドライン上の確認点
- 3年/5年の扱いを固定的に断定しない
- 1年だから必ず不許可、3年だから必ず可、とは言わない

## injection_format

### injection_certain_block

```text
【永住申請 現在の在留期間ファクト / {{TODAY_ISO}} 公式】
・永住許可ガイドラインでは、現在有する在留資格について「最長の在留期間をもって在留していること」が確認点として示されている。
・3年/5年の具体的な扱い、1年在留期間の評価、経過措置の適用範囲は個別確認が必要。
・「1年だから必ず不許可」「3年だから必ず可」「5年でなければ必ず不可」とは断定しない。
```

### injection_needs_review_addendum

```text
※ 在留資格ごとの最長期間、3年在留期間の扱い、配偶者・高度人材等の例外は個別確認。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop17 | 3年/5年の実務断定を削除し、公式ガイドライン上の「最長の在留期間」事実に限定。 | ai_extracted | ai_extracted | loop17-rewrite |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-18 | Codex Loop19 | 最長在留期間の窄事实として ANSWER_RUNTIME に昇格。 | ai_extracted | ai_verified | loop19-promote |
