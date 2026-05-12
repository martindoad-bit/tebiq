---
fact_id: student-institution-start-end-periodic-notification
title: 教育機関による届出 — 留学生の受入開始・終了と年2回の受入状況届出
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
citation_label: "教育機関側の留学生届出"
citation_summary: "ISA 手続ページとQ&Aは、教育機関が留学生の受入開始・終了時に14日以内の届出を行い、毎年5月1日・11月1日時点の受入状況も14日以内に届け出ると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-048
  authority_layer: L4 ISA Page / Q&A
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の17"
  source_locator: "所属機関による届出手続：留学生に関する届出手続; Q&A 所属機関による届出 Q1, Q4"
  claim_type: institution_notification
  applicable_statuses:
    - "留学"
  application_type:
    - notification
  exclusion_scope:
    - "学生本人による所属機関届出"
    - "留学以外の在留資格者の定期届出人数"
  deep_water_candidate: false
applies_when:
  - "学校侧问留学生入学、毕业、退学、定期届出"
does_not_cover:
  - "留学生本人の更新材料"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-institution-notification-page
    url: https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html
    title: 所属機関による届出手続
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-organization-notification-qa
    url: https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html
    title: 所属機関等に関する届出・所属機関による届出Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 所属機関による届出
direct_fact_fields:
  - education_institution_student_start_end_14_days
  - education_institution_periodic_may_november_14_days
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA explains that educational institutions accepting Student status mid- to long-term residents file notification within 14 days when acceptance starts or ends, and also file the acceptance status as of May 1 and November 1 within 14 days."
    source_title: "所属機関による届出手続"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2 留学生に関する届出手続"
    display_label: "教育機関側：受入開始・終了と年2回の受入状況届出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 教育機関による届出 — 留学生の受入開始・終了と年2回の受入状況届出

## current_date_logic

Checked against the current ISA procedure page and Q&A page on 2026-05-12.

## current_effective_fact

「留学」の中長期在留者を受け入れる教育機関は、受入れ開始または終了時に14日以内の届出を行う。加えて、毎年5月1日と11月1日時点の留学生受入状況についても、14日以内に届出を行う。

## exceptions_or_transition

- これは教育機関側の届出であり、留学生本人の届出や更新材料とは別。
- 定期届出は「留学」の在留資格を有する者のみを記載する説明がある。

## common_user_phrases

- 学校側 留学生 受入開始 届出
- 留学生 受入終了 届出 学校
- 5月1日 11月1日 留学生 届出
- 教育機関 所属機関による届出 14日
- 入学 編入 卒業 退学 受入れ届出
- 留学生 定期届出 14日以内

## must_say

- 教育機関側には受入開始・終了の届出がある。
- 5月1日・11月1日時点の受入状況も14日以内に届出する。
- 本人側手続とは区別する。

## must_not_say

- 学校側届出は入学時だけ。
- 5月1日・11月1日の定期届出と受入開始届出はどちらか一方だけでよい。

## qa_cases

### QA-1

**user**: 学校は留学生が入学した時だけ入管に届出すればいいですか？

**must_have**:

- 受入開始・終了
- 5月1日・11月1日の受入状況届出

**must_not_have**:

- 入学時だけでよい

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-048 |
