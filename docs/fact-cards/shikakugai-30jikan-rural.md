---
fact_id: shikakugai-30jikan-rural
title: 資格外活動 — 週28時間ルールと長期休業中の上限
state: ai_verified
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: '2026-05-17'
sprint: fact-window-bulk-1
citation_label: 資格外活動 週28時間
citation_summary: 留学生・家族滞在の包括的資格外活動許可は「週28時間以内」が上限。超過は資格取消・退去強制事由。雇用主の確認義務も発生する。
source_display_names:
  - 出入国在留管理庁
applies_when:
  - 留学生想做兩個兼職時間累計
  - 家族滞在配偶者打工时数管理
  - 用户问超28小时会怎样
does_not_cover:
  - 個別許可ケース（別カード）
  - 風俗営業の禁止（別カード）
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: 'https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html'
    label: ISA — 資格外活動
    accessed: '2026-05-17'
applies_to:
  - 留学・家族滞在保持者
direct_fact_fields:
  - 包括的資格外活動許可は週28時間以内
  - 留学生の長期休業中は1日8時間以内
  - 違反は在留資格取消・退去強制・刑事罰のリスクがある
ai_inferred_fields:
  - 複数アルバイト先の時間は合算（28時間は雇用先合計）
  - 雇用主には雇用時の許可確認義務がある（労働基準法/雇用対策法）
needs_review_flags:
  - multi_employer_aggregation_rule
  - employer_verification_obligation_source
  - long_break_period_definition
related_links:
  - title: ISA — 資格外活動
    url: 'https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html'
    organization: 出入国在留管理庁
    display_label: ISA — 資格外活動
    locator: ページ内「28時間」
    relation: official_reference
evidence_points:
  - claim: 包括的資格外活動許可は週28時間以内、留学生の長期休業中は1日8時間以内。違反は在留資格取消・退去強制・刑事罰のリスクがある。
    source_title: ISA — 資格外活動
    source_url: 'https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html'
    source_organization: 出入国在留管理庁
    source_locator: ページ内「28時間」「許可の証」
    display_label: 資格外活動 週28時間
    support_level: direct
    user_visible: true
    needs_domain_review: false
reviewer: Loop8 FACT/DOMAIN intersect
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報。

## current_effective_fact

週28時間ルールは留学・家族滞在共通。超過は取消・退去強制リスク。

## common_user_phrases

- 28時間 留学生
- 家族滞在 28時間
- 資格外活動 超過 取消
- バイト 28時間 計算

## must_say

- 週28時間上限
- 違反は取消・退去強制リスク
- 雇用先合計で28時間

## must_not_say

- 「複数雇用先ならそれぞれ28時間」（誤り）

## qa_cases

**Q: 留学生で2つアルバイトをしています。それぞれ20時間なので合計40時間でもいい？**
A: 包括的資格外活動許可は雇用先合計で週28時間以内です。超過は資格取消事由となり、退去強制の対象にもなり得ます。

## injection_format

### injection_certain_block

```text
【資格外活動 週28時間／{{TODAY_ISO}} 公式】
・包括的資格外活動許可は週28時間以内。
・留学生の長期休業中は1日8時間以内。
・複数雇用先がある場合も時間管理が必要。地方なら30時間などとは説明しない。
・違反は在留資格取消・退去強制・刑事罰のリスクがある。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
