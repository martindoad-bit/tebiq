---
fact_id: maina-hoken-2024-12
title: マイナ保険証 — 2024年12月2日以降の健康保険証として運用
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "マイナ保険証"
citation_summary: "2024年12月2日以降、従来の健康保険証は新規発行されず、マイナンバーカードを健康保険証として利用するマイナ保険証に移行。非所持者は資格確認証を交付。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "保険証 マイナンバー"
  - "マイナ保険証 切替"
does_not_cover:
  - "資格確認証の発行詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken07/index.html
    label: 厚労省 — 健康保険
    accessed: "2026-05-17"
applies_to:
  - 全ての健康保険被保険者
direct_fact_fields:
  - 施行日：2024年12月2日
  - 従来保険証：新規発行なし（既存は最長1年有効）
  - マイナ保険証：マイナンバーカードに紐付け
  - 非所持者：資格確認証を交付（無料）
  - 永住申請書類への対応も変化（カード参照）
ai_inferred_fields:
  - マイナ未取得でも資格確認証で医療受診可
needs_review_flags:
  - shikaku_kakunin_sho_validity_period
  - existing_hokensho_expiry_handling
  - oversea_use_of_maina_hoken
related_links:
  - title: "厚労省 — 健康保険"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken07/index.html"
    organization: "厚生労働省"
    display_label: "健康保険"
    locator: "マイナ保険証"
    relation: "official_reference"
evidence_points:
  - claim: "2024年12月2日以降、従来健康保険証は新規発行なし、マイナンバーカードがマイナ保険証として運用。非所持者は資格確認証交付。"
    source_title: "厚労省 — 健康保険"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken07/index.html"
    source_organization: "厚生労働省"
    source_locator: "2024年12月"
    display_label: "マイナ保険証移行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

2024-12-02以降マイナ保険証運用・資格確認証で代替。

## must_say

- 2024-12-02移行
- マイナカードに紐付け
- 非所持は資格確認証

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
