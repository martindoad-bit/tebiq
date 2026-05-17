---
fact_id: eijuu-renew-not-required
title: 永住者 — 永住資格自体に有効期限なし（在留カード7年とは別）
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住資格無期限"
citation_summary: "永住者の在留資格自体には有効期限なし。在留カードの物理的な有効期間（7年）の更新は必要だが、永住資格そのものの更新申請は不要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 更新"
  - "永住者 期限"
does_not_cover:
  - "在留カード有効期間更新（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
    label: ISA — 在留カード
    accessed: "2026-05-17"
applies_to:
  - 永住資格保持者
direct_fact_fields:
  - 永住資格：有効期限なし
  - 在留カード：7年（更新必要）
  - 更新申請：在留カードのみ
  - 失効事由：再入国期限超過、退去強制等
ai_inferred_fields:
  - 在留カード更新を忘れて期限超過すると永住資格喪失リスク（カード返納義務）
needs_review_flags:
  - card_expiry_then_status_loss_practice
  - special_permanent_resident_card_diff
  - reentry_period_during_card_renewal
related_links:
  - title: "ISA — 在留カード"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    organization: "出入国在留管理庁"
    display_label: "在留カード"
    locator: "7年"
    relation: "official_reference"
evidence_points:
  - claim: "永住資格は無期限。在留カードの有効期間（7年）更新は必要だが、永住資格そのものの更新申請は不要。"
    source_title: "ISA — 在留カード"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "7年"
    display_label: "永住資格無期限"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住資格自体は無期限・カードのみ7年更新。

## must_say

- 資格は無期限
- カードは7年更新
- カード期限切れは要警戒

## injection_format

### injection_certain_block

```text
- 永住者は在留期間更新の対象ではないが、在留カード自体には有効期間があり、永住者カードは更新手続が必要。
- 永住資格の有効期限と在留カードの有効期限を分けて確認する。
- 出典: ISA — 在留カード https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
