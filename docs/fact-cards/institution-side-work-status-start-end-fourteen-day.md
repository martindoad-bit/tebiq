---
fact_id: institution-side-work-status-start-end-fourteen-day
title: 所属機関による届出 — 対象就労資格等の受入開始・終了から14日以内
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 3
citation_label: "機関側届出：就労資格等の受入開始・終了"
citation_summary: "ISA 手続ページは、対象就労資格等の中長期在留者を受け入れる機関が、受入れ開始または終了から14日以内に届出を行うことになると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-046
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の17"
  source_locator: "所属機関による届出手続：就労資格を有する中長期在留者等に関する届出手続"
  claim_type: institution_notification
  applicable_statuses:
    - "教授"
    - "高度専門職"
    - "経営・管理"
    - "法律・会計業務"
    - "医療"
    - "研究"
    - "教育"
    - "技術・人文知識・国際業務"
    - "企業内転勤"
    - "介護"
    - "興行"
    - "技能"
    - "研修"
  application_type:
    - notification
  exclusion_scope:
    - "外国人本人による所属機関届出"
    - "外国人雇用状況届出の義務対象機関"
  deep_water_candidate: true
applies_when:
  - "用户或公司问公司侧是否也要向入管届出受入开始/结束"
does_not_cover:
  - "雇用状況届出との具体重複調整"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-institution-notification-page
    url: https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html
    title: 所属機関による届出手続
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 所属機関による届出
direct_fact_fields:
  - institution_side_work_status_start_end_14_days
ai_inferred_fields: []
needs_review_flags:
  - id: employment_status_notification_overlap
    reason: "The page excludes institutions obligated under the foreign employment status notification system; operational overlap needs careful routing."
evidence_points:
  - claim: "ISA explains that institutions accepting mid- to long-term residents with specified working statuses or Trainee status file notification within 14 days when acceptance starts or ends, excluding institutions obligated to file foreign employment status notifications under the labor policy law."
    source_title: "所属機関による届出手続"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1 就労資格を有する中長期在留者等に関する届出手続"
    display_label: "機関側届出：受入開始・終了から14日以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関による届出 — 対象就労資格等の受入開始・終了から14日以内

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

対象となる就労資格等の中長期在留者を受け入れている機関は、受入れを開始または終了した場合、14日以内に所属機関による届出を行うことになる。ただし、外国人雇用状況届出が義務付けられている機関は除かれる。

## exceptions_or_transition

- これは外国人本人の14日届出とは別の、機関側の届出。
- 外国人雇用状況届出との関係は確認が必要。

## common_user_phrases

- 会社側 入管 届出 14日
- 所属機関による届出 受入開始
- 所属機関による届出 受入終了
- 外国人雇用状況届出 入管 届出
- 会社が外国人を雇った 入管届出
- 退職 会社側 届出 入管

## must_say

- 機関側にも受入開始・終了の届出制度がある。
- 本人の所属機関届出とは別。
- 外国人雇用状況届出の対象機関は除外と説明されている。

## must_not_say

- 本人が届出すれば会社側は常に不要。
- 会社側届出に刑罰があると断定する。

## qa_cases

### QA-1

**user**: 技人国の社員を採用した会社側も入管に届出しますか？

**must_have**:

- 機関側の受入開始届出制度
- 14日以内
- 雇用状況届出との関係は確認

**must_not_have**:

- 本人だけでよいと断定

## injection_format

### injection_certain_block

```text

```

### injection_needs_review_addendum

```text

```

## changelog

| Date | Actor | Change | From | To | Notes |
|---|---|---|---|---|---|
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-046 |
