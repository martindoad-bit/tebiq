---
fact_id: keiei-kanri-2025-4-requirements
title: 経営・管理 2025改正 — 4新要件（常勤職員/3000万円資本/B2日本語/専門家評価）
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "経営管理2025改正4要件"
citation_summary: "2025年10月16日施行の経営・管理改正で、(1)常勤職員の雇用、(2)3000万円以上の資本金等、(3)日本語B2相当、(4)事業計画書の専門家評価が新要件として導入された。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户问经营管理签证最新要件"
  - "用户问3000万资本金是什么"
  - "申请人不会日语能否办经营管理"
does_not_cover:
  - "既存持有人过渡期具体取扱（別カード参照）"
  - "資本金カウント可能な資産範囲"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    label: ISA — 経営・管理改正
    accessed: "2026-05-17"
applies_to:
  - 経営・管理ビザの新規申請者
  - 既存保持者の更新申請者
direct_fact_fields:
  - 施行日：2025年10月16日
  - 要件1：常勤職員の雇用（日本人/特別永住者/別表第二在留資格者）
  - 要件2：3000万円以上の資本金等（法人は払込済資本、個人事業主は事業用財産総投下額）
  - 要件3：日本語B2相当以上（申請者または常勤職員のいずれか）— JLPT N2以上 / BJT 400点以上等
  - 要件4：事業計画書の専門家評価（中小企業診断士、公認会計士、税理士）
  - 過渡期：施行日から令和10年10月16日まで（3年間）既存保持者は柔軟判断
ai_inferred_fields:
  - 法別表第一の在留資格者のみで常勤職員要件は満たせない
  - 新規申請は施行日以降直ちに新基準適用（過渡期は更新のみ）
needs_review_flags:
  - shihon_count_eligible_assets
  - existing_holder_transition_practice
  - b2_jlpt_alternatives_complete_list
related_links:
  - title: "ISA — 経営・管理改正"
    url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 経営・管理改正"
    locator: "ページ内「4要件」"
    relation: "official_reference"
evidence_points:
  - claim: "2025年10月16日施行の経営・管理改正で、常勤職員雇用・3000万円以上資本金・日本語B2・専門家評価の4要件が導入。過渡期は3年間で既存保持者の更新時は柔軟判断。"
    source_title: "ISA — 経営・管理改正"
    source_url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「4つの新要件」「過渡期措置」"
    display_label: "経営管理2025改正4要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報。

## current_effective_fact

経営・管理は2025年10月16日改正で4要件追加。3年間の過渡期は既存保持者更新時のみ柔軟判断。

## common_user_phrases

- 経営管理 2025 改正
- 3000万 資本金
- 経営管理 日本語 B2
- 中小企業診断士 経営管理

## must_say

- 4要件全て満たす必要
- 過渡期は既存保持者の更新時のみ
- 新規申請は施行日以降直ちに新基準

## must_not_say

- 「500万円資本でまだ申請できる」（新規申請は不可）

## qa_cases

**Q: 2026年に新規で経営管理を申請したい。資本金はいくら必要？**
A: 2025年10月16日改正後の新基準が直ちに適用されるため、3000万円以上の資本金等が必要です。加えて常勤職員雇用、日本語B2、専門家評価の3要件も満たす必要があります。

## injection_format

### injection_certain_block

```
【経営管理2025改正／ {{TODAY_ISO}} 公式】
施行：2025-10-16
①常勤職員雇用（日本人等）
②資本金等3000万円以上
③日本語B2（申請者or常勤職員）
④事業計画書 専門家評価
過渡期：3年間（既存保持者更新のみ柔軟判断）
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
