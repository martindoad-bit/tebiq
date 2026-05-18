---
fact_id: keiei-kanri-2025-4-requirements
title: 経営・管理 2025改正 — 新基準の主要確認項目（要重写）
state: disabled
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "経営管理2025改正主要項目"
citation_summary: "2025年10月16日施行の経営・管理改正では、常勤職員、3000万円以上の資本金等、日本語能力、事業計画書の専門家評価、申請者の経営能力など複数の確認項目が導入・強化された。旧カードの「4要件」表現は不完全なため、runtime には使わない。"
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
  - 主要確認項目：常勤職員、3000万円以上の資本金等、日本語能力、事業計画書の専門家評価、申請者の経営能力など
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
  - claim: "2025年10月16日施行の経営・管理改正では、常勤職員、3000万円以上の資本金等、日本語能力、事業計画書の専門家評価、申請者の経営能力など複数の確認項目が導入・強化された。旧カードの4要件表現は不完全なため、runtime には使わない。"
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

経営・管理の2025年改正では複数の確認項目が導入・強化された。旧カードの「4要件」表現は不完全なため、このカードは runtime に使わず、個別項目カードまたは公式資料で確認する。

## common_user_phrases

- 経営管理 2025 改正
- 3000万 資本金
- 経営管理 日本語 B2
- 中小企業診断士 経営管理

## must_say

- 旧カードの「4要件」表現は不完全
- 主要確認項目は常勤職員、3000万円以上の資本金等、日本語能力、専門家評価、経営能力など
- 過渡期と個別適用は公式資料・専門家確認が必要

## must_not_say

- 「500万円資本でまだ申請できる」（新規申請は不可）

## qa_cases

**Q: 2026年に新規で経営管理を申請したい。資本金はいくら必要？**
A: 3000万円以上の資本金等だけで判断しないでください。常勤職員、日本語能力、事業計画書の専門家評価、申請者の経営能力なども確認対象です。

## injection_format

### injection_certain_block

```
【経営管理2025改正／ {{TODAY_ISO}} 要重写】
このカードは「4要件」表現が不完全なため runtime 使用不可。
個別項目カード（3000万円、過渡期、事務所等）または公式資料で確認。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop16 | FACT/DOMAIN 双方の再レビューで旧「4要件」フレームが不完全な候補カードと確認。個別項目カードと route gate に置換し、このカード自体は候補から外す。 | ai_extracted | disabled | loop16-reject |
| 2026-05-17 | Codex Loop11 | FACT review で「4要件」表現が不完全と確認。経営能力項目を含めた要重写カードに降温し、runtime 使用不可を明記。 | ai_extracted | ai_extracted | loop11-rewrite |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
