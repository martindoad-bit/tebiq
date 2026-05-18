---
fact_id: yobi-yose-shinseki-houmon
title: 親族訪問 — 短期滞在で呼ぶ場合の書類
state: ai_verified   # Loop12 2026-05-18: narrow materials-only style runtime; visa-exempt inference removed.
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "親族短期招聘"
citation_summary: "海外の親族を短期滞在ビザで呼ぶ場合は、申請人側書類と招聘人側書類を在外公館へ提出する。招聘人側では招聘理由書、滞在予定表、身元保証書、住民票、在職証明、課税証明等が使われる。"
source_display_names:
  - "外務省"
applies_when:
  - "親 短期滞在 招聘"
  - "親族訪問 ビザ"
does_not_cover:
  - "ビザ免除対象国かどうかの判定"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mofa.go.jp/mofaj/toko/visa/nagare/tanki.html
    label: 外務省 — 短期滞在
    accessed: "2026-05-17"
applies_to:
  - 海外親族を呼び寄せる在留者
direct_fact_fields:
  - 招聘理由書（呼び寄せ側作成）
  - 滞在予定表
  - 身元保証書（呼び寄せ側）
  - 呼び寄せ側：在留カード写し、住民票、在職証明、課税証明
  - 招聘者：パスポート、写真、申請書（在外公館で）
ai_inferred_fields: []
needs_review_flags:
  - visa_exempt_country_2026_list
  - shinseki_proof_documents
  - latest_form_changes
related_links:
  - title: "外務省 — 短期滞在"
    url: "https://www.mofa.go.jp/mofaj/toko/visa/nagare/tanki.html"
    organization: "外務省"
    display_label: "短期滞在"
    locator: "親族訪問"
    relation: "official_reference"
evidence_points:
  - claim: "海外親族の短期滞在ビザでは、招聘理由書、滞在予定表、身元保証書、住民票、在職証明、課税証明等の招聘人側書類と、申請人側書類を在外公館へ提出する。"
    source_title: "外務省 — 短期滞在"
    source_url: "https://www.mofa.go.jp/mofaj/toko/visa/nagare/tanki.html"
    source_organization: "外務省"
    source_locator: "親族訪問"
    display_label: "親族短期招聘書類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

海外にいる親族を短期滞在で日本へ呼ぶ場合、在外公館向けに申請人側の書類と招聘人側の書類を準備する。招聘人側では招聘理由書、滞在予定表、身元保証書、住民票、在職証明、課税証明などが使われる。

## common_user_phrases

- 親を日本に呼ぶ
- 家族を短期で呼ぶ
- 親族訪問 ビザ
- 短期滞在 招聘
- 招聘理由書
- 身元保証書 短期滞在
- 亲属访日 材料

## must_say

- 申請人側書類と招聘人側書類を分けて準備する
- 招聘人側では招聘理由書、滞在予定表、身元保証書、住民票、在職証明、課税証明などを確認する
- ビザ免除対象かどうかは国籍・渡航目的・滞在期間で別途確認する

## must_not_say

- ビザ免除国なら書類は一切不要
- 招聘書類をそろえれば必ず入国できる
- 親族訪問なら誰でも短期滞在ビザが取れる

## injection_format

### injection_certain_block

```text
海外の親族を短期滞在で日本へ呼ぶ場合は、申請人側書類と招聘人側書類を分けて準備します。招聘人側では招聘理由書、滞在予定表、身元保証書、住民票、在職証明、課税証明などが使われます。ビザ免除対象かどうかは国籍・渡航目的・滞在期間で別途確認が必要で、書類がそろっても入国や査証発給が保証されるわけではありません。
```

### injection_needs_review_addendum

```text
国籍別のビザ免除対象、最新様式、親族関係証明の具体資料は在外公館・外務省ページで確認する。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop12 | ビザ免除に関する推論を削除し、招聘書類の材料確認に限定してruntime化。 | ai_extracted | ai_verified | loop12-promote |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
