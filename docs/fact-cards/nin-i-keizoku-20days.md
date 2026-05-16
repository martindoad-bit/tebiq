---
fact_id: nin-i-keizoku-20days
title: 健康保険任意継続 — 退職翌日から20日以内・最大2年・保険料2倍
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "健保任意継続20日"
citation_summary: "退職前に2か月以上の被保険者期間がある場合、退職翌日から20日以内に申請すれば健康保険を最大2年間任意継続できる。保険料は退職時の2倍（上限あり）。"
source_display_names:
  - "全国健康保険協会"
applies_when:
  - "退職 健保 どうする"
  - "任意継続 国保 比較"
does_not_cover:
  - "国民健康保険切替（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.kyoukaikenpo.or.jp/benefit/voluntary_continuation/
    label: 協会けんぽ — 任意継続
    accessed: "2026-05-17"
applies_to:
  - 退職前に2か月以上被保険者期間あった者
direct_fact_fields:
  - 申請期限：退職翌日から20日以内（土日祝は翌営業日）
  - 加入期間：最大2年
  - 保険料：退職時控除額の2倍（標準報酬月額32万円上限）
  - 給付：在職中と同様
  - 失効：就職、保険料未納、後期高齢者該当、死亡、申出
ai_inferred_fields:
  - 任意継続より国保が安いケースもある（要試算）
needs_review_flags:
  - kokuho_vs_ninikeizoku_calculation_aid
  - 32man_upper_limit_2026_update
  - kumiai_kenpo_differences
related_links:
  - title: "協会けんぽ — 任意継続"
    url: "https://www.kyoukaikenpo.or.jp/benefit/voluntary_continuation/"
    organization: "全国健康保険協会"
    display_label: "任意継続"
    locator: "20日"
    relation: "official_reference"
evidence_points:
  - claim: "任意継続は退職翌日から20日以内に申請、最大2年、保険料は退職時の2倍（上限あり）。"
    source_title: "協会けんぽ — 任意継続"
    source_url: "https://www.kyoukaikenpo.or.jp/benefit/voluntary_continuation/"
    source_organization: "全国健康保険協会"
    source_locator: "20日・2年・2倍"
    display_label: "任意継続要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

任意継続：20日内申請・2年間・保険料2倍。

## must_say

- 20日以内（厳守）
- 2年間
- 保険料2倍

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
