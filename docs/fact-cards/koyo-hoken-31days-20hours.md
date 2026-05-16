---
fact_id: koyo-hoken-31days-20hours
title: 雇用保険被保険者資格 — 31日以上雇用見込＋週20時間以上
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "雇用保険資格要件"
citation_summary: "雇用保険の被保険者となる要件は、31日以上連続雇用見込み（または期間定めなし、または更新条項あり）かつ週20時間以上の労働。事業主は資格取得届を翌月10日までにハローワークへ提出。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "雇用保険 加入条件"
  - "アルバイト 雇用保険"
does_not_cover:
  - "雇用保険給付（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000147331.html
    label: 厚労省 — 雇用保険加入手続
    accessed: "2026-05-17"
applies_to:
  - 雇用される労働者
direct_fact_fields:
  - 雇用見込み：31日以上連続 or 期間定めなし or 更新条項あり
  - 労働時間：週20時間以上
  - 事業主は翌月10日までにハローワークへ資格取得届提出
  - 労働者はマイナポータルで加入確認可
ai_inferred_fields:
  - 28時間以下の留学生アルバイトは要件外の場合あり
needs_review_flags:
  - student_part_time_exception_specifics
  - multiple_employer_main_employer_rule
related_links:
  - title: "厚労省 — 雇用保険"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000147331.html"
    organization: "厚生労働省"
    display_label: "雇用保険"
    locator: "31日・20時間"
    relation: "official_reference"
evidence_points:
  - claim: "雇用保険被保険者要件は31日以上連続雇用見込＋週20時間以上。事業主は翌月10日までに資格取得届提出。"
    source_title: "厚労省 — 雇用保険"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000147331.html"
    source_organization: "厚生労働省"
    source_locator: "31日・20時間・翌月10日"
    display_label: "雇用保険要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

雇用保険：31日連続+週20時間。

## must_say

- 31日連続+週20時間
- 事業主は翌月10日まで届出

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
