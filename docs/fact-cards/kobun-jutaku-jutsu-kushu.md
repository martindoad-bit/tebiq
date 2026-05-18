---
fact_id: kobun-jutaku-jutsu-kushu
title: 公的住宅 — UR・公営住宅・公社住宅（外国人も入居可）
state: ai_verified   # Loop12 2026-05-18: public-housing support overview; individual eligibility withheld.
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "公的住宅外国人"
citation_summary: "外国人の住宅確保について、国や自治体には住宅確保要配慮者向けの支援制度や相談窓口がある。UR、公営住宅、公社住宅などは運営主体ごとに申込条件、収入基準、在留資格、住民登録要件が異なる。"
source_display_names:
  - "国土交通省"
applies_when:
  - "UR 外国人"
  - "公営住宅 外国人"
does_not_cover:
  - "個別自治体の公営住宅入居要件"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000055.html
    label: 国交省 — 住宅
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者
direct_fact_fields:
  - 住宅確保要配慮者向けの支援制度や相談窓口あり
  - UR、公営住宅、公社住宅などは運営主体ごとに条件が異なる
  - 収入、世帯、住民登録、在留資格などを確認する
ai_inferred_fields:
  - 公営住宅は自治体ごとに募集時期や収入基準が異なる
  - URはUR独自の申込資格を確認する
needs_review_flags:
  - UR_kasei_kijun_specific
  - public_housing_application_period
  - foreign_language_support_status
related_links:
  - title: "国交省 — 住宅"
    url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000055.html"
    organization: "国土交通省"
    display_label: "住宅"
    locator: "公的住宅"
    relation: "official_reference"
evidence_points:
  - claim: "外国人の住宅確保について、国や自治体には住宅確保要配慮者向けの支援制度や相談窓口がある。UR、公営住宅、公社住宅などは運営主体ごとに申込条件、収入基準、在留資格、住民登録要件が異なる。"
    source_title: "国交省 — 住宅"
    source_url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000055.html"
    source_organization: "国土交通省"
    source_locator: "公的住宅"
    display_label: "公的住宅外国人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

外国人の住宅確保について、国や自治体には住宅確保要配慮者向けの支援制度や相談窓口がある。UR、公営住宅、公社住宅などは運営主体ごとに申込条件、収入基準、在留資格、住民登録要件が異なる。

## common_user_phrases

- UR 外国人
- 公営住宅 外国人
- 外国人 公的住宅
- 租不起房 公営住宅
- 住宅相談 外国人
- 公社住宅 外国人

## must_say

- UR、公営住宅、公社住宅は運営主体ごとに条件が異なる
- 収入、世帯、住民登録、在留資格などを確認する
- 外国人なら必ず入れる／必ず入れないとは言わない

## must_not_say

- 外国人は公営住宅に入れない
- URなら在留資格を問わず入れる
- 公的住宅なら必ず安く借りられる

## injection_format

### injection_certain_block

```text
外国人の住宅確保について、国や自治体には住宅確保要配慮者向けの支援制度や相談窓口があります。UR、公営住宅、公社住宅などは運営主体ごとに申込条件、収入基準、在留資格、住民登録要件が異なります。「外国人なら必ず入れる／必ず入れない」とは言えません。
```

### injection_needs_review_addendum

```text
個別自治体の公営住宅条件、URの具体申込資格、収入基準、募集時期は運営主体の窓口確認へ回す。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop12 | 運営主体ごとの条件差に限定し、個別入居可否を除外してruntime化。 | ai_extracted | ai_verified | loop12-promote |
| 2026-05-18 | Codex Loop11 | official_sources と evidence/related URL を同一の国交省住宅セーフティネット系ページへ同期。 | ai_extracted | ai_extracted | loop11-source-sync |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
