---
fact_id: zairyu-card-reissue-14days
title: 在留カード再交付申請 — 紛失/盗難から14日以内・無料・即日交付
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留カード再交付"
citation_summary: "在留カードを紛失・盗難・滅失した中長期在留者は、その事実を知った日から14日以内に再交付申請が必要。手数料無料、原則即日交付。盗難時は警察届出受理番号が必要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留卡丢了"
  - "在留卡被偷了"
  - "在留卡损坏看不清了"
does_not_cover:
  - "有効期間更新（別カード）"
  - "新規交付（COE→上陸時）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html
    label: ISA — 在留カード再交付
    accessed: "2026-05-17"
applies_to:
  - 紛失/盗難/滅失で在留カードを失った中長期在留者
direct_fact_fields:
  - 申請期限：事実を知った日から14日以内（本邦外なら帰国後最初の入国日から14日）
  - 手数料：無料
  - 必要書類：再交付申請書、写真1葉（16歳以上）、紛失/盗難の場合は陳述書（警察届出受理番号必要）、パスポート
  - 漢字氏名併記希望時：申出書必要
  - 申請場所：住居地管轄地方入管
  - 処理：原則即日交付
ai_inferred_fields:
  - 期限超過は罰則対象（在留カード携帯義務違反と別）
  - 海外で紛失時は再入国時に申告
needs_review_flags:
  - penalty_for_delay_specifics
  - oversea_loss_procedure
  - photo_recent_validity
related_links:
  - title: "ISA — 在留カード再交付"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    organization: "出入国在留管理庁"
    display_label: "再交付"
    locator: "14日以内"
    relation: "official_reference"
evidence_points:
  - claim: "在留カード再交付申請は紛失等から14日以内・無料・原則即日交付。盗難時は警察届出受理番号が陳述書に必要。"
    source_title: "ISA — 在留カード再交付"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    source_organization: "出入国在留管理庁"
    source_locator: "14日以内・無料・即日"
    display_label: "再交付14日無料即日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

紛失/盗難から14日以内・無料・即日交付。盗難は警察届出受理番号必要。

## common_user_phrases

- 在留カード 紛失 再交付
- 在留カード 盗難
- 在留カード なくした

## must_say

- 14日以内
- 無料
- 警察届出（盗難時）

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
