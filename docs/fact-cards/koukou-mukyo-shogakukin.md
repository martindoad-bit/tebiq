---
fact_id: koukou-mukyo-shogakukin
title: 高等学校等就学支援金 — 2026年新制度と外国籍生徒の手続
state: ai_verified
runtime_bucket: ANSWER_RUNTIME
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-18"
reviewer: Codex Knowledge Runtime Loop20
sprint: "knowledge-runtime-loop20"
citation_label: "高校就学支援金"
citation_summary: "文部科学省は、いわゆる高校無償化について、的確には授業料を支援する高等学校等就学支援金制度と説明している。2026年4月の新制度では所得制限が撤廃され、日本国籍以外の生徒や外国人学校の生徒向けの申請フローも案内されている。"
source_display_names:
  - "文部科学省"
applies_when:
  - "外国籍の高校生世帯が就学支援金を確認したい"
  - "高校の授業料支援・高校無償化の手続を確認したい"
  - "e-Shienや学校からの案内で何をすればよいか整理したい"
does_not_cover:
  - "個別学校・都道府県ごとの独自支援制度"
  - "高校生等奨学給付金など授業料以外の支援の個別要件"
  - "外国人学校が新制度対象かどうかの個別判定"
official_sources:
  - url: https://www.mext.go.jp/a_menu/shotou/mushouka/
    label: 文部科学省 — 高校生等への修学支援
    accessed: "2026-05-18"
applies_to:
  - 高等学校等に在籍・入学予定の生徒と保護者
  - 日本国籍以外の生徒を含む世帯
direct_fact_fields:
  - 文部科学省は、いわゆる高校無償化について、的確には授業料を支援する高等学校等就学支援金制度と説明している
  - 2026年4月新制度では所得制限が撤廃され、多くの生徒が授業料の支援を受けられるようになった
  - 授業料支援を受けるには申請手続が必要で、詳しくは学校からの案内に従う
  - 日本国籍以外の生徒、外国人学校の生徒向けのリーフレット・申請フローが案内されている
ai_inferred_fields: []
needs_review_flags:
  - id: foreign_school_eligibility
    reason: 外国人学校の個別対象可否は学校種別・制度区分・都道府県案内に従って確認する。
  - id: local_or_private_school_additions
    reason: 都道府県・学校法人の追加支援や授業料以外の給付金は別制度のため混同しない。
related_links:
  - title: "高校生等への修学支援"
    url: "https://www.mext.go.jp/a_menu/shotou/mushouka/"
    organization: "文部科学省"
    display_label: "高校生等への修学支援"
    locator: "高等学校等就学支援金制度"
    relation: "official_reference"
evidence_points:
  - claim: "文部科学省は、いわゆる高校無償化について、的確には授業料を支援する高等学校等就学支援金制度と説明している。"
    source_title: "高校生等への修学支援"
    source_url: "https://www.mext.go.jp/a_menu/shotou/mushouka/"
    source_organization: "文部科学省"
    source_locator: "ページ冒頭「高校無償化」説明"
    display_label: "高校無償化ではなく授業料支援"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "2026年4月の新制度では所得制限が撤廃され、授業料支援を受けるには申請手続が必要で、学校からの案内に従うことが案内されている。"
    source_title: "高校生等への修学支援"
    source_url: "https://www.mext.go.jp/a_menu/shotou/mushouka/"
    source_organization: "文部科学省"
    source_locator: "新制度・申請手続"
    display_label: "2026年新制度：所得制限撤廃・申請手続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "日本国籍以外の生徒、外国人学校の生徒向けのリーフレット・申請フローが案内されている。"
    source_title: "高校生等への修学支援"
    source_url: "https://www.mext.go.jp/a_menu/shotou/mushouka/"
    source_organization: "文部科学省"
    source_locator: "日本国籍以外の生徒・外国人学校の生徒向けリーフレット/フロー"
    display_label: "外国籍生徒向け案内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

文部科学省は、いわゆる「高校無償化」について、的確には授業料を支援する「高等学校等就学支援金」だと説明している。2026年4月の新制度では所得制限が撤廃され、多くの生徒が授業料の支援を受けられるようになった。

授業料支援を受けるには申請手続が必要で、詳しくは学校からの案内に従う。日本国籍以外の生徒や外国人学校の生徒向けの案内資料・申請フローも用意されている。

## must_say

- 「高校無償化」は正確には授業料支援制度で、制度名は高等学校等就学支援金。
- 2026年4月新制度では所得制限が撤廃された。
- 支援を受けるには申請手続が必要で、学校の案内に従う。
- 日本国籍以外の生徒・外国人学校の生徒向け案内がある。

## must_not_say

- 外国籍なら全員必ず対象。
- 申請しなくても自動で無料になる。
- 授業料以外の費用もすべて無料。
- 外国人学校も一律で対象、または一律で対象外。
- 旧制度の所得制限を2026年新制度の中心条件として説明する。

## common_user_phrases

- 高校無償化 外国人
- 高校就学支援金 外国籍
- e-Shien 申請
- 高校学费 日本
- 外国人学校 就学支援金
- 高中学费补助

## injection_format

### injection_certain_block

```text
【高等学校等就学支援金／{{TODAY_ISO}} 文科省】
・いわゆる「高校無償化」は、正確には授業料を支援する「高等学校等就学支援金」。
・2026年4月の新制度では所得制限が撤廃された。
・授業料支援を受けるには申請手続が必要で、詳しくは学校からの案内に従う。
・日本国籍以外の生徒、外国人学校の生徒向けのリーフレット・申請フローも案内されている。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop20 | 旧所得制限・自治体差異中心の曖昧カードを、2026年新制度（所得制限撤廃）と外国籍生徒向け手続案内に限定して runtime 昇格。 | ai_extracted | ai_verified | loop20-rewrite |
| 2026-05-18 | Codex Loop11 | 旧 clarinet URL と旧所得目安 locator を撤回し、official_sources と同じ文科省就学支援金ページへ同期。runtime/材料索引からは外す。 | ai_extracted | ai_extracted | loop11-source-sync |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
