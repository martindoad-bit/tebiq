---
fact_id: zairyu-kikan-5years-default
title: 在留期間 — 資格別に定められた期間候補と個別指定
state: ai_verified   # Loop12 2026-05-18: narrowed to official period candidates only; removed practice guesses.
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留期間選択肢"
citation_summary: "在留期間は在留資格ごとの公式ページで候補期間が示され、実際に付与される期間は個別に指定される。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留期間 何年もらえる"
  - "5年ビザ"
does_not_cover:
  - "永住者（在留期間なし）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    label: ISA — 技人国
    accessed: "2026-05-17"
applies_to:
  - 就労資格保持者
direct_fact_fields:
  - 技術・人文知識・国際業務の公式ページでは在留期間として5年、3年、1年又は3月が掲げられている
  - 付与される在留期間は申請ごとに個別判断される
ai_inferred_fields: []
needs_review_flags:
  - decision_factors_official
related_links:
  - title: "ISA — 技人国"
    url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    organization: "出入国在留管理庁"
    display_label: "技人国"
    locator: "在留期間"
    relation: "official_reference"
evidence_points:
  - claim: "技術・人文知識・国際業務の在留期間は5年、3年、1年又は3月として掲げられている。実際の付与期間は申請ごとの判断であり、一定年数が自動的に付与されるものではない。"
    source_title: "ISA — 技人国"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留期間"
    display_label: "在留期間選択肢"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

技術・人文知識・国際業務など一部の就労資格では、公式ページ上の在留期間候補として5年、3年、1年、3月などが示される。どの期間になるかは個別判断であり、初回や更新時に特定年数が自動で出るとは言えない。

## common_user_phrases

- 在留期間 何年
- 5年ビザ
- 3年ビザ
- 1年しか出ない
- 3ヶ月ビザ
- 签证几年
- 为什么只给一年

## must_say

- 公式ページの期間候補と、実際に付与される期間は別問題
- 一定年数が自動的に出るとは言えない
- 短い期間が出た理由や次回の見通しは、個別事情を見ないと判断できない

## must_not_say

- 初回は必ず1年
- 安定すれば必ず3年や5年に伸びる
- 3か月が出たら必ず不許可寸前

## injection_format

### injection_certain_block

```text
在留期間は在留資格ごとの公式ページで候補期間が示されています。たとえば技術・人文知識・国際業務では5年、3年、1年又は3月が掲げられています。ただし、実際に何年が付与されるかは申請ごとの判断であり、特定の年数が自動的に出るとは言えません。短い期間が出た理由や次回の見通しは個別事情の確認が必要です。
```

### injection_needs_review_addendum

```text
在留期間が短くなった理由、次回長期化の見通し、3月付与の実務的意味は個別判断として扱う。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop12 | 実務推論を削除し、公式期間候補と個別判断だけの狭いruntime注入に変更。 | ai_extracted | ai_verified | loop12-promote |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
