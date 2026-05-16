---
fact_id: kazoku-taizai-shotoku-280
title: 家族滞在 — 扶養者の所得（実務目安・年収280-300万円以上）
state: ai_extracted
risk_level: high
confidence: low
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "家滞 扶養所得"
citation_summary: "家族滞在COE申請で扶養能力の審査要素として、ISA公式に具体的な年収数値の記載はないが、実務上は年収280-300万円程度が目安とされる（家族構成により変動）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "家滞 年収 必要"
  - "家族 呼び寄せ 収入"
does_not_cover:
  - "高度人材の家族呼び寄せ（緩和あり）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/dependent.html
    label: ISA — 家族滞在
    accessed: "2026-05-17"
applies_to:
  - 家族呼び寄せ予定の在留者
direct_fact_fields:
  - 扶養能力：必要（法定要件）
  - 具体的な数値：ISA公式に記載なし
  - 実務目安：年収280-300万円程度
  - 家族構成（呼び寄せ人数）で変動
  - 預金通帳・住居資料も補強材料
ai_inferred_fields:
  - 高度人材は緩和傾向
  - 学生扶養者は実質厳しい
needs_review_flags:
  - jisshou_amount_2026
  - kazoku_kosei_specific_multiplier
  - kodo_jinzai_specific_relaxation
related_links:
  - title: "ISA — 家族滞在"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "家族滞在"
    locator: "扶養能力"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在COE申請の扶養能力審査について、ISA公式に具体的な年収数値の記載はないが実務目安は年収280-300万円程度（家族構成で変動）。"
    source_title: "ISA — 家族滞在"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "扶養能力"
    display_label: "家滞扶養所得目安"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

家滞扶養所得：公式数値なし・実務年収280-300万目安。

## must_say

- 公式数値なし
- 実務280-300万目安
- 家族構成で変動

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
