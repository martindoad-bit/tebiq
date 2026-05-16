---
fact_id: kodo-senmon-shoku-1go-to-2go
title: 高度専門職 — 1号→2号 移行要件（3年継続活動）
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "高度1号→2号"
citation_summary: "高度専門職1号で3年以上継続して高度人材活動を行った者は、2号への変更申請が可能。2号は在留期間無期限、活動範囲も拡大される。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "高度人材 1号 2号 変更"
  - "高度2号 永住"
does_not_cover:
  - "1号申請時のポイント計算"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00121.html
    label: ISA — 高度人材
    accessed: "2026-05-17"
applies_to:
  - 高度専門職1号保持者
direct_fact_fields:
  - 1号→2号要件：3年以上の継続活動
  - 2号は在留期間無期限
  - 2号は複数活動可
  - 永住条件への影響：別ルート（80点1年/70点3年）
ai_inferred_fields:
  - 80点で1年継続の場合は永住申請が早道（実務）
needs_review_flags:
  - 2go_activity_scope_specifics
  - point_recheck_at_2go_application
  - 2go_card_validity_period_unique
related_links:
  - title: "ISA — 高度人材"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00121.html"
    organization: "出入国在留管理庁"
    display_label: "高度人材"
    locator: "1号→2号"
    relation: "official_reference"
evidence_points:
  - claim: "高度1号で3年以上継続活動した者は2号変更可。2号は在留期間無期限。"
    source_title: "ISA — 高度人材"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00121.html"
    source_organization: "出入国在留管理庁"
    source_locator: "3年"
    display_label: "高度1号→2号"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

高度1号→2号：3年継続活動で変更可。2号は無期限。

## must_say

- 3年継続
- 2号は無期限
- 80点なら永住1年ルートも

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
