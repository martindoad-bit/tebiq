---
fact_id: ikusei-shuroh-overview
title: 育成就労（旧技能実習後継制度）— 2027年4月施行予定・3年で特技1号移行
state: ai_verified
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "育成就労制度"
citation_summary: "技能実習制度を廃止し2027年4月（予定）から施行される育成就労制度。受入分野は特定技能と整合、3年後に特技1号への移行を前提とする制度設計。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "技能実習 廃止"
  - "育成就労 いつ"
does_not_cover:
  - "現行技能実習の経過措置（別ガイドライン）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/faq/ikusei_qa_00002.html
    label: ISA — 育成就労Q&A
    accessed: "2026-05-17"
applies_to:
  - 受入機関と外国人候補者
direct_fact_fields:
  - 施行予定：2027年4月（公布日から3年以内）
  - 技能実習を廃止
  - 3年後に特技1号移行が前提
  - 転籍制限あり（1〜2年・分野別）
  - 日本語要件強化
ai_inferred_fields:
  - 2026年中は現行技能実習が引き続き運用
  - 受入分野は特技と整合
needs_review_flags:
  - exact_effective_date_2027
  - tenseki_period_finalized
  - japanese_requirement_level_by_field
related_links:
  - title: "ISA — 育成就労Q&A"
    url: "https://www.moj.go.jp/isa/applications/faq/ikusei_qa_00002.html"
    organization: "出入国在留管理庁"
    display_label: "育成就労Q&A"
    locator: "2027年"
    relation: "official_reference"
evidence_points:
  - claim: "育成就労は2027年4月（予定）施行。技能実習廃止、3年で特技1号移行が前提。"
    source_title: "ISA — 育成就労Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/faq/ikusei_qa_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2027年4月"
    display_label: "育成就労制度"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

育成就労：2027-04予定・技能実習廃止・3年で特技1号。

## must_say

- 2027年4月予定
- 技能実習廃止
- 特技1号への移行前提

## injection_format

### injection_certain_block

```
【育成就労制度／ 2026-05-17 公式】
・技能実習制度の見直し後の新制度として育成就労制度が予定されている
・施行前の制度情報なので、申請可否や細部は最新の公式情報で確認する
・現時点の在留手続は現行制度に従う
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
