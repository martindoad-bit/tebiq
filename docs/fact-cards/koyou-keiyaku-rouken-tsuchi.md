---
fact_id: koyou-keiyaku-rouken-tsuchi
title: 労働条件通知書 — 雇用契約時の書面交付義務
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "労働条件通知書"
citation_summary: "事業主は雇用契約締結時に労働条件通知書を書面（または電磁的方法）で交付する義務（労基法第15条）。賃金、労働時間、休日、契約期間、業務内容等を明示。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "雇用契約書"
  - "労働条件 書面"
does_not_cover:
  - "就業規則の作成義務"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html
    label: 厚労省 — 労働基準
    accessed: "2026-05-17"
applies_to:
  - 全事業主と労働者
direct_fact_fields:
  - 法的根拠：労基法第15条
  - 交付：書面または電磁的方法（労働者同意ある場合）
  - 明示事項：賃金、労働時間、休日、契約期間、業務内容、退職等
  - 違反：30万円以下罰金
  - 2024年4月：明示項目追加（業務変更範囲等）
ai_inferred_fields:
  - 技人国の在留資格判断資料としても重要
needs_review_flags:
  - 2024_added_items_specific
  - electronic_consent_method
  - foreign_language_obligation
related_links:
  - title: "厚労省 — 労働基準"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html"
    organization: "厚生労働省"
    display_label: "労働基準"
    locator: "労働条件通知書"
    relation: "official_reference"
evidence_points:
  - claim: "労基法第15条により事業主は雇用契約締結時に労働条件通知書を書面（同意あれば電磁的方法）で交付する義務。違反は30万円以下罰金。"
    source_title: "厚労省 — 労働基準"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html"
    source_organization: "厚生労働省"
    source_locator: "労基法15条"
    display_label: "労働条件通知書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

労働条件通知書：書面交付義務・2024-04明示項目追加。

## must_say

- 書面交付義務（労基法15条）
- 違反は30万円
- 2024-04明示項目追加

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
