---
fact_id: ryugaku-shikakugai-individual-permission
title: 留学生資格外活動 — 個別許可が必要なケース（インターン・通訳・起業準備）
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "留学生資格外活動 個別許可"
citation_summary: "留学生の包括許可（週28時間）と別に、長期インターン・語学教師・通訳・家庭教師・起業準備等は個別許可が必要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "留学生想做长期实习"
  - "留学生想兼职做翻译/中文家教"
  - "留学生想准备起业"
does_not_cover:
  - "週28時間以内の通常アルバイト（包括許可で可）"
  - "卒業後の就労ビザ変更"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html
    label: ISA — 留学生資格外活動
    accessed: "2026-05-17"
applies_to:
  - 留学資格保持者
direct_fact_fields:
  - 包括許可：週28時間以内（長期休業中1日8時間以内）の有償活動は申請書のみ
  - 個別許可必要①：卒業予定大学生・大学院生のインターンシップ
  - 個別許可必要②：語学教師、通訳、家庭教師等の職種
  - 個別許可必要③：起業準備活動
  - 個別許可必要④：稼働時間が客観確認できない個人事業
  - 法人設立や従業員雇用を伴う事業は「経営・管理」へ変更が必要
ai_inferred_fields:
  - 風俗営業は資格外活動の対象外（一般原則）
  - 28時間超は無条件で個別許可が必要というわけではないが、稼働時間が把握困難な業態が問題
needs_review_flags:
  - fugzoku_eigyo_exclusion_specific
  - long_break_8hours_calculation
  - intern_paid_vs_unpaid
related_links:
  - title: "ISA — 留学生資格外活動"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 留学生資格外活動"
    locator: "ページ内「個別許可」"
    relation: "official_reference"
evidence_points:
  - claim: "留学生は週28時間以内（長期休業中1日8時間以内）の包括許可とは別に、インターンシップ・語学教師・通訳・家庭教師・起業準備等は個別許可が必要。法人設立・従業員雇用を伴う事業は経営管理へ変更が必要。"
    source_title: "ISA — 留学生資格外活動"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「個別許可」"
    display_label: "留学生資格外活動 個別許可ケース"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報。

## current_effective_fact

留学生は週28時間包括許可と別に、長期インターン等は個別許可必須。

## common_user_phrases

- 留学生 インターン 許可
- 留学生 通訳 アルバイト
- 留学生 家庭教師
- 留学生 起業 準備

## must_say

- 包括許可：週28時間
- 個別許可：インターン/通訳/家教/起業準備
- 法人設立は経営管理へ変更

## must_not_say

- 「週28時間内ならどんな仕事もできる」（風俗営業や個別許可案件は別）

## qa_cases

**Q: 留学生で長期インターンをしたいです。**
A: 卒業予定の大学生・大学院生のインターンシップは個別許可が必要です。住居地を管轄する地方入管で申請してください。

## injection_format

### injection_certain_block

```
【留学生資格外活動／ {{TODAY_ISO}} 公式】
・包括許可：週28時間以内（休業中1日8時間）
・個別許可：インターン/通訳/家庭教師/起業準備等
・法人設立 → 経営管理へ変更必要
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
