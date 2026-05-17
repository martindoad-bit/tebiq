---
fact_id: koyou-keiyaku-rouken-tsuchi
title: 労働条件通知書 — 雇用契約時の書面交付義務
state: ai_verified   # LOOP3 2026-05-17: rewritten to labor-condition notification only; no visa-material overreach
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
  - url: https://www.mhlw.go.jp/bunya/roudoukijun/faq_kijyunhou_4.html
    label: 厚労省 — 労働基準法に関するQ&A（労働条件明示）
    accessed: "2026-05-17"
applies_to:
  - 全事業主と労働者
direct_fact_fields:
  - 法的根拠：労基法第15条
  - 使用者は労働契約締結時に労働条件を明示する義務
  - 賃金、労働時間、契約期間等の重要事項は書面等で明示
  - 2024年4月から就業場所・業務変更範囲等の明示項目が追加
ai_inferred_fields:
  - 在留申請資料として使う場合はISAの資格別チェックシート確認が必要
needs_review_flags:
  - 2024_added_items_specific
  - electronic_consent_method
  - foreign_language_obligation
related_links:
  - title: "厚労省 — 労働基準法に関するQ&A（労働条件明示）"
    url: "https://www.mhlw.go.jp/bunya/roudoukijun/faq_kijyunhou_4.html"
    organization: "厚生労働省"
    display_label: "労働基準"
    locator: "労働条件通知書"
    relation: "official_reference"
evidence_points:
  - claim: "労働基準法第15条により、使用者は労働契約締結時に労働条件を明示する義務があり、賃金・労働時間等の重要事項は書面等で明示する必要がある。"
    source_title: "厚労省 — 労働基準法に関するQ&A（労働条件明示）"
    source_url: "https://www.mhlw.go.jp/bunya/roudoukijun/faq_kijyunhou_4.html"
    source_organization: "厚生労働省"
    source_locator: "労基法15条"
    display_label: "労働条件通知書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

労働条件通知書：労働契約締結時の労働条件明示。

## must_say

- 書面交付義務（労基法15条）
- 重要事項は書面等で明示
- 2024-04明示項目追加

## injection_format

### injection_certain_block

```text
- 使用者は、労働契約を結ぶときに労働条件を明示する義務がある。
- 賃金、労働時間、契約期間、就業場所、業務内容など重要事項は、書面等で明示される。
- 雇用契約書と労働条件通知書は実務上近い内容を持つことがあるが、在留申請に何を出すべきかは資格別チェックシートで別途確認する。
- 出典: 厚生労働省「労働基準法に関するQ&A（労働条件明示）」 https://www.mhlw.go.jp/bunya/roudoukijun/faq_kijyunhou_4.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | 労働条件明示に範囲を限定しruntime昇格。 | ai_extracted | ai_verified | rewrite/promote |
