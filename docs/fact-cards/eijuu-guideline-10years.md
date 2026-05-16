---
fact_id: eijuu-guideline-10years
title: 永住ガイドライン — 原則10年継続在留（うち就労5年以上）
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住10年要件"
citation_summary: "永住の国益適合要件として、原則10年以上の継続在留＋うち5年以上は就労・居住資格が必要。配偶者は3年、定住者は5年、難民は5年、高度人材は1年/3年の短縮特例。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 10年"
  - "永住 短縮"
does_not_cover:
  - "永住申請書類詳細（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: ISA — 永住許可ガイドライン
    accessed: "2026-05-17"
applies_to:
  - 永住申請希望者
direct_fact_fields:
  - 原則：10年以上継続在留（うち就労・居住資格5年以上）
  - 配偶者短縮：実婚姻3年＋在留1年
  - 定住者：5年以上在留
  - 難民認定者：5年以上在留
  - 高度人材：70点で3年、80点で1年
  - 国益条件：刑事罰なし、納税・年金・保険料適正
ai_inferred_fields:
  - 「継続」は再入国許可で繋がる
needs_review_flags:
  - keizoku_definition_overseas_stay
  - tokutei_katsudo_inclusion_in_5years
  - 2024_revision_payment_obligation_strict
related_links:
  - title: "ISA — 永住ガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住ガイドライン"
    locator: "10年"
    relation: "official_reference"
evidence_points:
  - claim: "永住は原則10年継続在留（うち就労5年以上）。配偶者3年、定住者5年、難民5年、高度人材1年/3年の短縮特例。"
    source_title: "ISA — 永住ガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "10年"
    display_label: "永住10年要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住：10年（うち就労5年）。配偶者3年、定住5年、高度人材1/3年短縮。

## must_say

- 10年原則
- 各種短縮特例あり
- 納税・年金適正必須

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
