---
fact_id: shitsugyou-gijinkoku-3months
title: 技人国失業 — 3か月超で在留資格取消リスク（事由⑥）
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "失業3か月取消"
citation_summary: "技人国等の就労資格者が3か月以上活動を行っていない場合、在留資格取消事由⑥に該当しうる。ただし転職活動中等の「正当な理由」があれば対象外。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "失業 在留資格 取消"
  - "転職活動 3ヶ月"
does_not_cover:
  - "離職後の所属機関等届出14日（別カード）"
  - "失業給付（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    label: ISA — 在留資格取消制度
    accessed: "2026-05-17"
applies_to:
  - 就労在留資格保持者で失業中の者
direct_fact_fields:
  - 取消事由⑥：在留資格に係る活動を3か月以上行っていない場合
  - 正当な理由（病気、転職活動中等）は対象外
  - 取消前に意見聴取が必須
ai_inferred_fields:
  - 転職活動の証拠（求人応募記録等）の保持が実務上有利
  - 在留期間更新時の不利な扱いリスク
needs_review_flags:
  - transitional_period_during_job_search
  - evidence_preservation_practice
  - update_unfavourable_risk
related_links:
  - title: "ISA — 在留資格取消"
    url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    organization: "出入国在留管理庁"
    display_label: "取消制度"
    locator: "3か月"
    relation: "official_reference"
evidence_points:
  - claim: "活動継続3か月不実施は取消事由⑥に該当。正当な理由があれば対象外。"
    source_title: "ISA — 取消制度"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "3か月"
    display_label: "失業3か月取消"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

失業3か月超で取消事由⑥該当。正当理由で対象外。

## must_say

- 3か月超で事由⑥
- 転職活動中は正当理由
- 意見聴取前

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
