---
fact_id: ssw-acceptance-difficulty-one-month-inactivity-source
title: "特定技能 — 1か月以上活動できない事由は受入れ困難届出で確認する"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 4
citation_label: "特定技能: 1か月以上の活動未実施"
citation_summary: "ISA は、入国又は在留資格変更許可後に、生産ライン縮小、病気・けが、妊娠・出産・育児等により1か月以上活動できない事由が生じた所属機関を受入れ困難届出の対象としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-009
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の18第1項第4号 / 施行規則第19条の17第6項第1号"
  source_locator: "受入れ困難に係る届出 / 1か月以上活動できない事由"
  claim_type: notification_trigger
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - notification
  exclusion_scope:
    - "活動未実施期間の計算"
    - "休業の適法性"
    - "本人都合休業と会社都合休業の個別評価"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-acceptance-difficulty
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00190.html
    title: 特定技能所属機関による受入れ困難に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "休業・病気・育休等で特定技能外国人が1か月以上活動できない相談"
direct_fact_fields:
  - ssw_acceptance_difficulty_one_month_inactivity
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_one_month_inactivity_review
    reason: "活動できない期間、原因、許可後の時点を個別確認する必要がある。"
evidence_points:
  - claim: "ISA は、入国又は在留資格変更許可後に、生産ライン縮小、業務中の病気・けが、妊娠・出産・育児、私生活上の病気・けが等により1か月以上活動できない事由が生じた所属機関を受入れ困難届出の対象としている。"
    source_title: "特定技能所属機関による受入れ困難に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00190.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "特定技能: 1か月以上活動できない場合"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 1か月以上活動できない事由は受入れ困難届出で確認する

## current_date_logic

Checked against the ISA acceptance-difficulty notification page on 2026-05-13.

## current_effective_fact

入国又は在留資格変更許可後に、休業、病気・けが、妊娠・出産・育児等により1か月以上活動できない事由が生じた場合、受入れ困難届出の対象として確認する。

## exceptions_or_transition

- 活動未実施の起算日、理由、就労契約の扱いは個別に確認する。

## common_user_phrases

- 特定技能 1か月以上 活動できない 届出
- 特定技能 休業 1ヶ月 入管
- 特定技能 病気 1か月 働けない
- 特定技能 育休 受入れ困難
- 特定技能 活動未実施 1か月
- 特定技能员工休业一个月以上
- 特定技能 one month no activity notification

## must_say

- 1か月以上活動できない事由は受入れ困難届出で確認する。

## must_not_say

- 休業や病気で働けないだけなら入管届出とは関係ない。
- 1か月以上活動できなくても契約が残っていれば届出確認は不要。
- 1か月活動できないと在留資格が自動的に取り消される。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-009 |
