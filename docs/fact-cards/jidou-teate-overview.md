---
fact_id: jidou-teate-overview
title: 児童手当 — 中長期在留者対象・所得制限あり・2024年10月拡充
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "児童手当"
citation_summary: "0歳〜高校生年代の子を扶養する保護者に支給される手当。中長期在留者も対象。2024年10月から所得制限撤廃・対象年齢拡大・第3子以降増額。"
source_display_names:
  - "こども家庭庁"
applies_when:
  - "外国人 児童手当"
  - "子供 手当"
does_not_cover:
  - "出産一時金（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.cfa.go.jp/policies/kokoseido/jidouteate/
    label: こども家庭庁 — 児童手当
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者で子を扶養する者
direct_fact_fields:
  - 対象：0歳〜高校生年代
  - 中長期在留者対象
  - 2024年10月：所得制限撤廃・対象年齢拡大・第3子以降増額
  - 申請：住所地市区町村
  - 公金受取口座登録推奨
ai_inferred_fields:
  - 短期滞在は対象外
  - 親が海外にいて子のみ日本の場合は要確認
needs_review_flags:
  - kingaku_2026_per_child
  - tantei_taizai_exclusion_proof
  - kaigai_parent_japan_child_case
related_links:
  - title: "こども家庭庁 — 児童手当"
    url: "https://www.cfa.go.jp/policies/kokoseido/jidouteate/"
    organization: "こども家庭庁"
    display_label: "児童手当"
    locator: "2024年10月"
    relation: "official_reference"
evidence_points:
  - claim: "児童手当は0歳〜高校生年代の子を扶養する保護者に支給。中長期在留者対象。2024年10月から所得制限撤廃・対象年齢拡大・第3子増額。"
    source_title: "こども家庭庁 — 児童手当"
    source_url: "https://www.cfa.go.jp/policies/kokoseido/jidouteate/"
    source_organization: "こども家庭庁"
    source_locator: "2024年10月"
    display_label: "児童手当2024拡充"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

児童手当：高校生年代まで・2024年10月から所得制限撤廃。

## must_say

- 中長期在留者対象
- 2024年10月拡充
- 市区町村申請

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
