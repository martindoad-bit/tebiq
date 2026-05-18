---
fact_id: tokutei-katsudou-17go
title: 内定者のための特定活動 — 採用までの在留
state: ai_verified
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "特活17号"
citation_summary: "大学・専門学校等に在学中又は卒業後、企業から内定を受け、採用まで引き続き在留する場合の特定活動。卒業後の単なる就職活動継続とは別に扱う必要がある。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特活17号"
  - "内定 採用まで 特定活動"
does_not_cover:
  - "特活46号（接客等含む）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html
    label: ISA — 特定活動
    accessed: "2026-05-17"
applies_to:
  - 採用内定を受けた留学生等
direct_fact_fields:
  - 対象：大学・専門学校等に在学中又は卒業後で、企業から採用内定を受けた者
  - 趣旨：採用まで引き続き在留するための特定活動
ai_inferred_fields:
  - 在留期間、必要書類、就労可否は個別ページ・指定書で確認が必要
needs_review_flags:
  - shokusho_recommendation_format
  - extension_post_1year_routes
  - specific_documents_for_renewal
related_links:
  - title: "ISA — 特活"
    url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html"
    organization: "出入国在留管理庁"
    display_label: "特活"
    locator: "17号"
    relation: "official_reference"
evidence_points:
  - claim: "大学・専門学校等に在学中又は卒業後、企業から採用内定を受けた者が、採用まで引き続き在留するための特定活動がある。"
    source_title: "ISA — 特活"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html"
    source_organization: "出入国在留管理庁"
    source_locator: "17号"
    display_label: "特活17号"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

内定者のための特定活動：大学・専門学校等の在学中又は卒業後に就職先が内定した人が、企業に採用されるまで引き続き日本に滞在するための特定活動。卒業後の単なる就職活動継続とは分ける。

## common_user_phrases

- 内定 採用まで 特定活動
- 留学生 内定 特定活動
- 卒業後 内定 採用まで 在留
- 内定者 特定活動 アルバイト
- 特活17号

## must_say

- 採用内定後の在留
- 単なる就職活動継続とは別
- 就労可否・必要書類は指定書と入管で確認
- 資格外活動許可が必要な活動は別途許可を確認

## injection_format

### injection_certain_block

```text
- 出入国在留管理庁は、大学又は専門学校の在学中又は卒業後に就職先が内定した人が、企業に採用されるまで日本に滞在するための「内定者のための特定活動」を案内している。
- 対象は主に「留学」の在留資格で在留している人、または継続就職活動を目的とする「特定活動」で在留している人。採用時期までの滞在目的で、一定要件を満たす場合に在留資格変更が認められる。
- 要件には、内定後1年以内かつ卒業後1年6か月以内に採用されること、採用後の活動が技人国等の就労資格への変更を見込めること、在留状況に問題がないこと、内定先企業が定期連絡・内定取消時連絡を誓約すること等が含まれる。
- これは「内定後、採用まで」の制度であり、卒業後の単なる就職活動継続とは同じに扱わない。必要書類・在留期間・資格外活動許可の要否は、入管の該当ページと指定書で確認する。
- 出典: 出入国在留管理庁「大学又は専門学校の在学中又は卒業後に就職先が内定し採用までの滞在をご希望のみなさまへ」 https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html
```

### injection_needs_review_addendum

```text
※ 以下は確認待ち・個別判断のため断定しないこと：
・この制度を「特活17号」と呼ぶ番号体系のユーザー向け表示可否
・採用までの資格外活動許可、インターンシップ許可の個別可否
・内定取消、採用延期、卒業後1年6か月を超える場合の扱い
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop14 | FACT/DOMAIN再確認後、普通の就活継続ではなく「内定後、採用まで」の特定活動に口径を限定してruntime化。必要書類・就労可否・採用延期等は個別確認として注入から除外。 | ai_extracted | ai_verified | loop14-promote |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
