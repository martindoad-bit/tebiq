---
fact_id: zairyu-card-validity-renewal
title: 在留カード有効期間更新申請 — 永住者/高度2号は満了2か月前から
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留カード有効期間更新"
citation_summary: "永住者・高度専門職2号の在留カードは有効期間満了の2か月前から満了日まで更新申請が必要。16歳誕生日が満了日の場合は誕生日の6か月前から。手数料無料・即日交付。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住者カード 7年で更新"
  - "高度2号 カード更新"
  - "16歳になる前にカード更新"
does_not_cover:
  - "永住資格自体の更新は不要（資格と物理カードは別）"
  - "紛失時の再交付（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
    label: ISA — 在留カード有効期間更新
    accessed: "2026-05-17"
applies_to:
  - 永住者、高度専門職2号、16歳誕生日が有効期限の中長期在留者
direct_fact_fields:
  - 永住者/高度2号：満了2か月前〜満了日まで申請
  - 16歳誕生日が有効期限：誕生日6か月前〜当日まで申請
  - 手数料：無料
  - 必要書類：申請書、写真（16歳以上）、現在の在留カード、旅券
  - 申請場所：住居地管轄地方入管
  - 処理：原則即日交付
ai_inferred_fields:
  - 期限超過は在留カード返納義務発生・罰則対象
needs_review_flags:
  - over_due_penalty_specifics
  - online_application_availability
  - photo_specifications
related_links:
  - title: "ISA — 在留カード有効期間更新"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    organization: "出入国在留管理庁"
    display_label: "有効期間更新"
    locator: "2か月前"
    relation: "official_reference"
evidence_points:
  - claim: "永住者・高度2号は満了2か月前から、16歳誕生日が満了日の者は誕生日6か月前から有効期間更新申請可。無料・即日交付。"
    source_title: "ISA — 在留カード有効期間更新"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2か月前・6か月前・無料"
    display_label: "カード有効期間更新時期"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住者カード更新は2か月前から・無料・即日。

## common_user_phrases

- 永住カード 更新 7年
- 在留カード 有効期間
- 16歳 在留カード

## must_say

- 永住/高度2号は2か月前から
- 16歳満了は6か月前から
- 無料・即日

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
